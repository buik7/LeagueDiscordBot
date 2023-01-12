import { EmbedBuilder } from "@discordjs/builders";
import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { DbGame } from "../../database/dtos/game/type";
import { rankGuildUserByPoints } from "../../database/dtos/user/controller";
import DiscordCommand from "../types/Command";

class RankBalCommand extends DiscordCommand {
  data = new SlashCommandBuilder()
    .setName("rankpoint")
    .setDescription("List top 5 users with highest points");

  async execute(interaction: ChatInputCommandInteraction) {
    const highestPointUsers = await rankGuildUserByPoints(interaction.guildId!);
    if (!highestPointUsers || highestPointUsers.length === 0) {
      await interaction.reply(
        "All users have 0 point! Buy champions with `/shop` to earn points"
      );
      return;
    }

    let ranking = " ";
    const rankIcons = [":first_place:", ":second_place:", ":third_place:"];
    for (let i = 0; i < Math.min(highestPointUsers.length, 5); i++) {
      let user = highestPointUsers[i];
      const pointString = (user.gameId as DbGame).points.toLocaleString();
      if (i < 3) {
        ranking += `${rankIcons[i]} \`${pointString}\` - ${user.tag}\n`;
      } else {
        ranking += `:small_blue_diamond: \`${pointString}\` - ${user.tag}\n`;
      }
    }

    const embed = new EmbedBuilder()
      .setColor(0x2ecc71)
      .setTitle("Balance leaderboard")
      .setDescription(ranking);

    await interaction.reply({ embeds: [embed] });
  }
}

export default RankBalCommand;
