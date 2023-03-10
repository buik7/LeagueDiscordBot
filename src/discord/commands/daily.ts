import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { findGameById } from "../../database/dtos/game/controller";
import { findOneOrCreateDbUser } from "../../database/dtos/user/controller";
import DiscordCommand from "../types/Command";
import { msToTime } from "../utils/date";

class DailyCommand extends DiscordCommand {
  data = new SlashCommandBuilder()
    .setName("daily")
    .setDescription("Get your daily gold once every 6 hours.");

  async execute(interaction: ChatInputCommandInteraction) {
    const _id = {
      discordUserId: interaction.user.id,
      discordGuildId: interaction.guild!.id,
    };

    const result = await findOneOrCreateDbUser(_id, interaction.user.tag);
    if (!result || !result.user) {
      await this.displayError(interaction);
      return;
    }

    const { user, created } = result;
    if (created) {
      await interaction.reply(
        "Your new account was created with an initial balance of 30!"
      );
      return;
    }

    const userGame = await findGameById(user.gameId);
    if (!userGame) {
      await this.displayError(interaction);
      return;
    }

    const now = new Date();
    if (userGame.dailyCooldown > now) {
      const waitingTime = userGame.dailyCooldown.getTime() - now.getTime();
      const { h, m, s } = msToTime(waitingTime);
      await interaction.reply(
        `You must wait **${h} hours, ${m} minutes and ${s} seconds** for your next daily`
      );
      return;
    }

    const newDailyCooldown = now.getTime() + 1000 * 60 * 60 * 6; // next 6 hours
    userGame.balance += 30;
    userGame.dailyCooldown = new Date(newDailyCooldown);
    await userGame.save();
    await interaction.reply(
      `30 gold was added to your account. New balance: ${userGame.balance.toLocaleString()}`
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

export default DailyCommand;
