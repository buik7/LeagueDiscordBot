import { ActionRowBuilder, EmbedBuilder } from "@discordjs/builders";
import {
  ButtonBuilder,
  ButtonInteraction,
  ButtonStyle,
  ChatInputCommandInteraction,
  SlashCommandBuilder,
} from "discord.js";
import { findGameById } from "../../database/dtos/game/controller";
import { DbInventory } from "../../database/dtos/inventory";
import { findInventoryById } from "../../database/dtos/inventory/controller";
import { findDbUserById } from "../../database/dtos/user/controller";
import DiscordCommand from "../types/Command";

enum ButtonIds {
  prev_page = "prev_page",
  next_page = "next_page",
}

class InventoryCommand extends DiscordCommand {
  data = new SlashCommandBuilder()
    .setName("inventory")
    .setDescription("List all champions in your inventory");

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

    const itemsPerPage = 10;
    const champions = userInventory.champions;
    const championCount = champions.length;
    const totalPages = Math.ceil(championCount / itemsPerPage);
    let currentPage = 1;

    const buttonActionRows =
      new ActionRowBuilder<ButtonBuilder>().addComponents(
        new ButtonBuilder()
          .setCustomId(ButtonIds.prev_page)
          .setStyle(ButtonStyle.Secondary)
          .setLabel("Prev")
          .setDisabled(true),
        new ButtonBuilder()
          .setCustomId(ButtonIds.next_page)
          .setStyle(ButtonStyle.Secondary)
          .setLabel("Next")
          .setDisabled(currentPage === totalPages)
      );

    const inventoryEmbed = await interaction.reply({
      embeds: [
        this.renderEmbed(interaction, currentPage, itemsPerPage, champions),
      ],
      components: [buttonActionRows],
      fetchReply: true,
    });

    const collector = inventoryEmbed.createMessageComponentCollector({
      filter: (i) =>
        i.user.id === interaction.user.id &&
        i.message.id === inventoryEmbed.id &&
        (i.customId === ButtonIds.next_page ||
          i.customId === ButtonIds.prev_page),
      time: 100000,
    });

    collector.on("collect", async (buttonInteraction: ButtonInteraction) => {
      if (!buttonInteraction.deferred) {
        await buttonInteraction.deferUpdate();
      }
      if (buttonInteraction.customId === ButtonIds.prev_page) currentPage--;
      if (buttonInteraction.customId === ButtonIds.next_page) currentPage++;
      buttonActionRows.components[0].setDisabled(currentPage === 1);
      buttonActionRows.components[1].setDisabled(currentPage === totalPages);
      await interaction.editReply({
        embeds: [
          this.renderEmbed(interaction, currentPage, itemsPerPage, champions),
        ],
        components: [buttonActionRows],
      });
    });

    collector.on("end", async () => {
      buttonActionRows.components[0].setDisabled(true);
      buttonActionRows.components[1].setDisabled(true);
      await interaction.editReply({
        embeds: [
          this.renderEmbed(interaction, currentPage, itemsPerPage, champions),
        ],
        components: [buttonActionRows],
      });
    });
  }

  private renderEmbed(
    interaction: ChatInputCommandInteraction,
    currentPage: number,
    itemsPerPage: number,
    champions: DbInventory["champions"]
  ) {
    const championCount = champions.length;

    let totalCount = 0;
    let threeStarCount = 0;
    let twoStarCount = 0;
    let oneStarCount = 0;

    for (let { count } of champions) {
      threeStarCount += Math.floor(count / 9);
      twoStarCount += Math.floor((count % 9) / 3);
      oneStarCount += count % 3;
      totalCount += count;
    }

    const totalPages = Math.ceil(championCount / itemsPerPage);
    return new EmbedBuilder()
      .setColor(0xe74c3c)
      .setTitle(
        `${interaction.user.username}'s inventory \n` +
          `(Includes ${totalCount} copies of ${championCount} different champions)`
      )
      .addFields(
        {
          name: ":star: :star: :star:",
          value: threeStarCount.toString(),
          inline: true,
        },
        {
          name: ":star: :star:",
          value: twoStarCount.toString(),
          inline: true,
        },
        {
          name: ":star:",
          value: oneStarCount.toString(),
          inline: true,
        }
      )

      .setDescription(
        this.renderEmbedContent(currentPage, itemsPerPage, champions)
      )
      .setFooter({ text: `Page ${currentPage} of ${totalPages}` });
  }

  private renderEmbedContent(
    currentPage: number,
    itemsPerPage: number,
    champions: DbInventory["champions"]
  ) {
    let startIndex = (currentPage - 1) * itemsPerPage;
    let endIndex = Math.min(startIndex + itemsPerPage, champions.length);
    let pageChampions = champions.slice(startIndex, endIndex);

    let content = "";
    for (let { champion, count } of pageChampions) {
      if (champion.cost >= 5) {
        content += `**${champion.name}** x${count}\n`;
      } else {
        content += `${champion.name} x${count}\n`;
      }
    }
    return content;
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

export default InventoryCommand;
