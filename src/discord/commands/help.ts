import { EmbedBuilder } from "@discordjs/builders";
import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import DiscordCommand from "../types/Command";

class HelpCommand extends DiscordCommand {
  data = new SlashCommandBuilder()
    .setName("help")
    .setDescription("List all available commands");

  async execute(interaction: CommandInteraction) {
    const commands = {
      "/roll <multiplier>": "Roll a champion",
      "/daily": "Get 30 gold. This command can be run every 6 hours.",
      "/shop": "View shop information",
      "/shop <x>": "Buy a random x-cost champion",
      "/info": "View account information",
      "/inventory": "List all champions in inventory",
      "/equip <champion>": "Set a champion in inventory to be the main fighter",
      "/fight <@user>":
        "Fight another user. Make sure both users have equipped their fighter",
      "/rank": "Rank users by points",
      "/rankbal": "Rank users by balance",
    };

    let description = "";
    for (let [cmdName, cmdDesc] of Object.entries(commands)) {
      description += `\`${cmdName}\` : ${cmdDesc} \n`;
    }

    const embed = new EmbedBuilder()
      .setTitle("Available commands")
      .setDescription(description);

    await interaction.reply({ embeds: [embed] });
  }
}

export default HelpCommand;
