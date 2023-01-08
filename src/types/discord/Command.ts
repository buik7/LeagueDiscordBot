import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import DiscordClient from "../../client";

abstract class DiscordCommand {
  readonly client: DiscordClient;

  constructor(client: DiscordClient) {
    this.client = client;
  }

  abstract data:
    | SlashCommandBuilder
    | Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup">;
  abstract execute(interaction: CommandInteraction): Promise<void>;
}

export default DiscordCommand;
