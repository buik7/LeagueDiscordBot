import { ActivityType } from "discord.js";
import DiscordEvent from "../types/discord/Event";

class ReadyEvent extends DiscordEvent {
  name = "ready";
  once = true;

  async execute() {
    // this.client.commands.deployCommands();
    this.client.user?.setPresence({
      status: "online",
      activities: [
        {
          name: "League of Legends",
          type: ActivityType.Playing,
        },
      ],
    });
    console.log("Ready! Logged in as " + this.client.user?.tag);
  }
}

export default ReadyEvent;
