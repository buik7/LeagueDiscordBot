import { Client } from "discord.js";
import { IntentOptions } from "./config/IntentOptions";
import { DISCORD_BOT_TOKEN } from "./config/secrets";
import CommandHandler from "./handlers/command";
import EventHandler from "./handlers/event";

class DiscordClient extends Client {
  commands: CommandHandler;
  events: EventHandler;

  constructor() {
    super({ intents: IntentOptions });

    this.events = new EventHandler(this);
    this.commands = new CommandHandler(this);

    this.login(DISCORD_BOT_TOKEN);
  }
}

export default DiscordClient;
