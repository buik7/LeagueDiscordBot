import { Collection, REST, Routes } from "discord.js";
import path from "path";
import DiscordClient from "../client";
import {
  DISCORD_BOT_CLIENT_ID,
  DISCORD_BOT_GUILD_ID,
  DISCORD_BOT_TOKEN,
} from "../config/secrets";
import DiscordCommand from "../types/Command";
import { readAllFilesInDirectory } from "../utils/readFiles";

class CommandHandler extends Collection<string, DiscordCommand> {
  client: DiscordClient;

  constructor(client: DiscordClient) {
    super();
    this.client = client;
    this.init();
  }

  private getCommandFiles() {
    const commandPath = path.join(__dirname, "..", "commands");
    return readAllFilesInDirectory(commandPath);
  }

  private init() {
    this.getCommandFiles().forEach((file) => {
      const commandClass = require(file).default;
      const command: DiscordCommand = new commandClass(this.client);
      this.set(command.data.name, command);
    });
  }

  deployCommands() {
    const commands = this.map((c) => c.data.toJSON());
    const rest = new REST({ version: "10" }).setToken(DISCORD_BOT_TOKEN);
    rest
      .put(
        Routes.applicationGuildCommands(
          DISCORD_BOT_CLIENT_ID,
          DISCORD_BOT_GUILD_ID
        ),
        { body: commands }
      )
      .then(() => console.log("Successfully registered application commands"))
      .catch(console.error);
  }
}

export default CommandHandler;
