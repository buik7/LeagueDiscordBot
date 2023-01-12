import { EmbedBuilder } from "@discordjs/builders";
import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { DbGame } from "../../database/dtos/game/type";
import { rankGuildUserByBalance } from "../../database/dtos/user/controller";
import DiscordCommand from "../types/Command";

class RankBalCommand extends DiscordCommand {
  data = new SlashCommandBuilder()
    .setName("rankbal")
    .setDescription("List top 5 users with highest balance");

  async execute(interaction: ChatInputCommandInteraction) {
    const highestBalanceUsers = await rankGuildUserByBalance(
      interaction.guildId!
    );
    if (!highestBalanceUsers || highestBalanceUsers.length === 0) {
      await interaction.reply(
        "All users have zero balance. Use `daily` to get some gold!"
      );
      return;
    }

    let ranking = " ";
    const rankIcons = [":first_place:", ":second_place:", ":third_place:"];
    for (let i = 0; i < Math.min(highestBalanceUsers.length, 5); i++) {
      let user = highestBalanceUsers[i];
      const balanceString = (user.gameId as DbGame).balance.toLocaleString();
      if (i < 3) {
        ranking += `${rankIcons[i]} \`${balanceString}\` - ${user.tag}\n`;
      } else {
        ranking += `:small_blue_diamond: \`${balanceString}\` - ${user.tag}\n`;
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
