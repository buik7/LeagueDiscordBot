import DiscordClient from "../../client";

abstract class DiscordEvent {
  readonly client: DiscordClient;
  abstract name: string;
  once: boolean = false;

  constructor(client: DiscordClient) {
    this.client = client;
  }

  abstract execute(...args: unknown[]): Promise<void>;
}

export default DiscordEvent;
