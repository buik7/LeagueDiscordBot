import { EmbedBuilder } from "@discordjs/builders";
import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { getGameById } from "../../database/dtos/game/controller";
import { findDbUserById } from "../../database/dtos/user/controller";
import DiscordCommand from "../types/Command";
import { msToTime } from "../utils/date";

class GameInfoCommand extends DiscordCommand {
  data = new SlashCommandBuilder()
    .setName("gameinfo")
    .setDescription("View your account's balance, points and daily cooldown");

  async execute(interaction: ChatInputCommandInteraction) {
    const _id = {
      discordUserId: interaction.user.id,
      discordGuildId: interaction.guild!.id,
    };

    const user = await findDbUserById(_id);
    if (!user) {
      await interaction.reply(
        "You don't have an account yet. Please use **`/daily`** to create an account."
      );
      return;
    }

    const userGame = await getGameById(user.gameId);
    if (!userGame) {
      await this.displayError(interaction);
      return;
    }

    const now = new Date();
    let dailyCD = "None";
    if (userGame.dailyCooldown > now) {
      const waitingTime = userGame.dailyCooldown.getTime() - now.getTime();
      const { h, m, s } = msToTime(waitingTime);
      dailyCD = `${h} hours, ${m} minutes and ${s} seconds`;
    }

    const embed = new EmbedBuilder()
      .setTitle(`${interaction.user.username}'s profile`)
      .setColor(0x1abc9c)
      .addFields(
        {
          name: "Balance",
          value: userGame.balance.toLocaleString(),
          inline: true,
        },
        {
          name: "Points",
          value: userGame.points.toLocaleString(),
          inline: true,
        },
        {
          name: "Daily cooldown",
          value: dailyCD,
        }
      );

    await interaction.reply({ embeds: [embed] });
  }

  private async displayError(interaction: ChatInputCommandInteraction) {
    interaction.reply({
      content:
        "There was an error occured while execute this command. Please try again later",
      ephemeral: true,
    });
  }
}

export default GameInfoCommand;
