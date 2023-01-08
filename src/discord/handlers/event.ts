import { Collection } from "discord.js";
import path from "path";
import DiscordClient from "../client";
import DiscordEvent from "../types/Event";
import { readAllFilesInDirectory } from "../utils/readFiles";

class EventHandler extends Collection<string, DiscordEvent> {
  readonly client: DiscordClient;

  constructor(client: DiscordClient) {
    super();
    this.client = client;
    this.init();
  }

  private getEventFiles() {
    const eventPath = path.join(__dirname, "..", "events");
    return readAllFilesInDirectory(eventPath);
  }

  private init() {
    this.getEventFiles().forEach((file) => {
      const eventClass = require(file).default;
      const event: DiscordEvent = new eventClass(this.client);
      this.set(event.name, event);
      if (event.once) {
        this.client.once(event.name, (...args) => event.execute(...args));
      } else {
        this.client.on(event.name, (...args) => event.execute(...args));
      }
    });
  }
}

export default EventHandler;
