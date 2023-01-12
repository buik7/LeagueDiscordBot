import { EmbedBuilder } from "@discordjs/builders";
import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import DiscordCommand from "../types/Command";
import { findDbUserById } from "../../database/dtos/user/controller";
import { findGameById } from "../../database/dtos/game/controller";
import { DbInventoryDocument } from "../../database/dtos/inventory";
import {
  createInventory,
  findInventoryById,
  tftToDbChampion,
} from "../../database/dtos/inventory/controller";
import ChampionTftApi from "../../riot/api/tft/champion";

class ShopCommand extends DiscordCommand {
  championPrices = [50, 100, 200, 400, 800];

  data = new SlashCommandBuilder()
    .setName("shop")
    .setDescription("Buy champions to increase your power!")
    .addIntegerOption((option) =>
      option
        .setName("cost")
        .setDescription("Champion tier (1, 2, 3, 4, 5)")
        .addChoices(
          { name: `1-cost (Price: ${this.championPrices[0]} gold)`, value: 1 },
          { name: `2-cost (Price: ${this.championPrices[1]} gold)`, value: 2 },
          { name: `3-cost (Price: ${this.championPrices[2]} gold)`, value: 3 },
          { name: `4-cost (Price: ${this.championPrices[3]} gold)`, value: 4 },
          { name: `5-cost (Price: ${this.championPrices[4]} gold)`, value: 5 }
        )
    )
    .addIntegerOption((option) =>
      option
        .setName("num-champions")
        .setDescription("Number of champions to buy (min: 1, max: 10)")
        .setMinValue(1)
        .setMaxValue(10)
    );

  async execute(interaction: ChatInputCommandInteraction) {
    const cost = interaction.options.getInteger("cost");

    if (!cost) {
      const embed = this.getShopDescriptionEmbed();
      await interaction.reply({ embeds: [embed] });
      return;
    }

    const _id = {
      discordUserId: interaction.user.id,
      discordGuildId: interaction.guild!.id,
    };

    const user = await findDbUserById(_id);

    if (!user) {
      await interaction.reply(
        "Welcome to Mercenary Shop. Please use **`/daily`** to create an account before shopping!"
      );
      return;
    }

    const userGame = await findGameById(user.gameId);
    if (!userGame) {
      await this.displayError(interaction);
      return;
    }

    const championPrice = this.championPrices[cost - 1];
    const numChampions = interaction.options.getInteger("num-champions") || 1;
    const totalPrice = numChampions * championPrice;
    if (userGame.balance < championPrice * numChampions) {
      await interaction.reply(
        `You don't have enough gold to buy ${numChampions} ${cost}-cost champion(s). (Price: ${totalPrice}, Current balance: ${userGame.balance})`
      );
      return;
    }

    let userInventory: DbInventoryDocument | undefined;

    if (!userGame.inventoryId) {
      userInventory = await createInventory();
      if (userInventory) {
        userGame.inventoryId = userInventory._id;
        await userGame.save();
      }
    } else {
      userInventory = await findInventoryById(userGame.inventoryId);
    }

    if (!userInventory) {
      await this.displayError(interaction);
      return;
    }

    const { pointsGained, boughtChampions, boughtChampionCount } =
      this.shopChampions(cost, userInventory, numChampions);

    if (boughtChampionCount === 0) {
      await interaction.reply(
        `You have had all ${cost}-cost champion in your inventory. Please choose another champion tier cost`
      );
      return;
    }

    // Save data
    userGame.points += pointsGained;
    userGame.balance -= boughtChampionCount * championPrice;
    await Promise.all([userGame.save(), userInventory.save()]);

    // Render output
    const newTwoStarChampions = [];
    const newThreeStarChampions = [];
    let description = "";
    if (boughtChampionCount < numChampions) {
      description +=
        `Only ${boughtChampionCount} ${cost}-cost champions are added to your inventory.` +
        ` You now have all ${cost}-cost champions. Congrats!\n`;
    }
    description += "**Bought champions:**\n";
    for (let championName in boughtChampions) {
      const boughtChampion = boughtChampions[championName];
      description += `${championName} (x${boughtChampion.count})\n`;
      if (boughtChampion.newStar === 2) {
        newTwoStarChampions.push(championName);
      } else if (boughtChampion.newStar === 3) {
        newThreeStarChampions.push(championName);
      }
    }

    if (newTwoStarChampions.length > 0) {
      description += `\n**New 2-star champions:** `;
      for (let twoStarChamp of newTwoStarChampions) {
        description += `${twoStarChamp} `;
      }
      description += "\n";
    }

    if (newThreeStarChampions.length > 0) {
      description += `**New 3-star champions:** `;
      for (let threeStarChamp of newThreeStarChampions) {
        description += `${threeStarChamp} `;
      }
      description += "\n";
    }

    const embed = new EmbedBuilder()
      .setColor(ChampionTftApi.mapChampionCostToColor(cost))
      .setTitle(
        `${boughtChampionCount} ${cost}-cost champion(s) have been added to your inventory.`
      )
      .setAuthor({ name: interaction.user.tag })
      .setDescription(description)
      .addFields(
        {
          name: "Number of champions",
          value: boughtChampionCount.toString(),
          inline: true,
        },
        {
          name: "Price",
          value: (boughtChampionCount * championPrice).toLocaleString(),
          inline: true,
        },
        {
          name: "New balance",
          value: userGame.balance.toLocaleString(),
          inline: true,
        },
        {
          name: "Points gained",
          value: pointsGained.toLocaleString(),
          inline: true,
        },
        {
          name: "Points",
          value: userGame.points.toLocaleString(),
          inline: true,
        }
      );

    await interaction.reply({ embeds: [embed] });
  }

  private shopChampions(
    cost: number,
    userInventory: DbInventoryDocument,
    requiredNumberOfChampions: number
  ) {
    const availableChampions = ChampionTftApi.getChampionsWithCost(cost);

    const getRandomChampionIndex = () =>
      Math.floor(Math.random() * availableChampions.length);

    const getInventoryChampionIndex = (championName: string) =>
      userInventory.champions.findIndex(
        (c) => c.champion.name === championName
      );

    const boughtChampions: BoughtChampions = {};
    let boughtChampionCount = 0;
    let pointsGained = 0;

    while (
      boughtChampionCount < requiredNumberOfChampions &&
      availableChampions.length > 0
    ) {
      const championIndex = getRandomChampionIndex();
      const champion = availableChampions[championIndex];
      const inventoryChampionIndex = getInventoryChampionIndex(champion.name);

      if (inventoryChampionIndex === -1) {
        userInventory.champions.push({
          champion: tftToDbChampion(champion),
          count: 1,
        });
        boughtChampions[champion.name] = { count: 1, newStar: 1 };
        pointsGained += champion.cost;
        boughtChampionCount++;
        continue;
      }

      const inventoryChampion = userInventory.champions[inventoryChampionIndex];

      if (inventoryChampion.count >= 9) {
        availableChampions.splice(championIndex, 1);
        continue;
      }

      boughtChampionCount++;
      inventoryChampion.count++;
      if (!boughtChampions[champion.name]) {
        boughtChampions[champion.name] = { count: 1, newStar: 1 };
      } else {
        boughtChampions[champion.name].count++;
      }

      pointsGained += champion.cost;
      if (inventoryChampion.count === 9) {
        pointsGained += 50 * champion.cost;
        boughtChampions[champion.name].newStar = 3;
      } else if (
        inventoryChampion.count === 3 ||
        inventoryChampion.count === 6
      ) {
        pointsGained += 5 * champion.cost;
        boughtChampions[champion.name].newStar = 2;
      }
    }

    return {
      boughtChampions,
      pointsGained,
      boughtChampionCount,
    };
  }

  private getShopDescriptionEmbed() {
    return new EmbedBuilder()
      .setColor(0x2ecc71)
      .setTitle("Welcome to Mercenary Shop")
      .setDescription(shopDescription)
      .addFields([
        {
          name: "1-cost tier",
          value: `Price: ${this.championPrices[0]} :coin:`,
          inline: true,
        },
        {
          name: "2-cost tier",
          value: `Price: ${this.championPrices[1]} :coin:`,
          inline: true,
        },
        {
          name: "3-cost tier",
          value: `Price: ${this.championPrices[2]} :coin:`,
          inline: true,
        },
        {
          name: "4-cost tier",
          value: `Price: ${this.championPrices[3]} :coin:`,
          inline: true,
        },
        {
          name: "5-cost tier",
          value: `Price: ${this.championPrices[4]} :coin:`,
          inline: true,
        },
      ]);
  }

  private async displayError(interaction: ChatInputCommandInteraction) {
    interaction.reply({
      content:
        "There was an error occured while execute this command. Please try again later",
      ephemeral: true,
    });
  }
}

interface BoughtChampion {
  count: number;
  newStar: 1 | 2 | 3;
}

interface BoughtChampions {
  [key: string]: BoughtChampion;
}

const shopDescription = `Use **\`/shop <champion_cost> <num_champions>\`** to buy champions. Examples: \n \`/shop 2\` to buy one 2-cost champion. \n \`/shop 2 5\` to buy five 2-cost champions.\n If you have 3 copies of a champion in your inventory, it will upgrade to a higher star and earn you additional points.`;

export default ShopCommand;
