import { Interaction } from "discord.js";
import DiscordEvent from "../types/Event";

class InteractionCreateEvent extends DiscordEvent {
  name = "interactionCreate";

  async execute(interaction: Interaction) {
    if (!interaction.isChatInputCommand()) return;
    const command = this.client.commands.get(interaction.commandName);

    if (!command) {
      console.error(
        `No command matching ${interaction.commandName} was found.`
      );
      return;
    }

    try {
      await command.execute(interaction);
    } catch (error) {
      console.error(error);
      await interaction.reply({
        content: "There was an error executing this command!",
        ephemeral: true,
      });
    }
  }
}

export default InteractionCreateEvent;
