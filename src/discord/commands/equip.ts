import { EmbedBuilder } from "@discordjs/builders";
import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { findGameById } from "../../database/dtos/game/controller";
import { findInventoryById } from "../../database/dtos/inventory/controller";
import { findDbUserById } from "../../database/dtos/user/controller";
import ChampionTftApi from "../../riot/api/tft/champion";
import DiscordCommand from "../types/Command";

class EquipCommand extends DiscordCommand {
  data = new SlashCommandBuilder()
    .setName("equip")
    .setDescription("Set a champion to be your main fighter")
    .addStringOption((option) =>
      option
        .setName("champion")
        .setDescription("The name of the champion in your inventory")
        .setRequired(true)
    );

  async execute(interaction: ChatInputCommandInteraction) {
    const _id = {
      discordUserId: interaction.user.id,
      discordGuildId: interaction.guild!.id,
    };
    const user = await findDbUserById(_id);

    if (!user) {
      await interaction.reply(
        "You do not have an account. Use `/daily` to create one"
      );
      return;
    }

    const userGame = await findGameById(user.gameId);
    if (!userGame) {
      await this.displayError(interaction);
      return;
    }

    if (!userGame.inventoryId) {
      await this.displayEmptyInventoryError(interaction);
      return;
    }

    const userInventory = await findInventoryById(userGame.inventoryId);
    if (!userInventory) {
      await this.displayError(interaction);
      return;
    }
    if (userInventory.champions.length === 0) {
      await this.displayEmptyInventoryError(interaction);
      return;
    }

    const champion = interaction.options.getString("champion");
    if (!champion) {
      await interaction.reply("Please enter a valid champion name!");
      return;
    }

    const selectedChampion = userInventory.champions.find(
      (c) => c.champion.name.toLowerCase() === champion.toLowerCase().trim()
    );
    if (!selectedChampion) {
      await interaction.reply(
        "This champion does not exists in your inventory. Use `/inventory` to see all your champions"
      );
      return;
    }

    const mainChampionStar = ChampionTftApi.getChampionStar(
      selectedChampion.count
    );
    userInventory.mainChampion = {
      ...selectedChampion.champion,
      star: mainChampionStar,
    };
    await userInventory.save();

    const championProps = selectedChampion.champion;

    let starString = "";
    for (let i = 0; i < mainChampionStar; i++) {
      starString += " :star:";
    }
    let mainChampionArmor = championProps.stats.armor * mainChampionStar;
    let mainChampionMR = championProps.stats.magicResist * mainChampionStar;
    let physicalReduction =
      ChampionTftApi.getPhysicalDamageReduction(mainChampionArmor);
    let magicReduction = ChampionTftApi.getMagicDamageReduction(mainChampionMR);

    let description = `
        ${starString}\n
        **Damage**: ${championProps.stats.damage * mainChampionStar}
        **HP**: ${championProps.stats.hp * mainChampionStar}
        **Armor**: ${
          championProps.stats.armor * mainChampionStar
        } (${physicalReduction}% physical damage reduction)
        **Magic Resist**: ${
          championProps.stats.magicResist * mainChampionStar
        } (${magicReduction}% magic damage reduction)
        **Ability**: ${championProps.ability.name}
    `;

    const embed = new EmbedBuilder()
      .setTitle(`${championProps.name} is now your main fighter!`)
      .setColor(ChampionTftApi.mapChampionCostToColor(championProps.cost))
      .setThumbnail(championProps.icon)
      .setDescription(description)
      .setImage(championProps.ability.icon);

    await interaction.reply({ embeds: [embed] });
  }

  private async displayEmptyInventoryError(
    interaction: ChatInputCommandInteraction
  ) {
    interaction.reply(
      "You do not have any champions in your inventory. Use `/shop` to buy some!"
    );
  }

  private async displayError(interaction: ChatInputCommandInteraction) {
    interaction.reply({
      content:
        "There was an error occured while execute this command. Please try again later",
      ephemeral: true,
    });
  }
}

export default EquipCommand;
