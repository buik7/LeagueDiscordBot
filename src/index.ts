import { Client, Events } from "discord.js";
import { IntentOptions } from "./config/IntentOptions";

const client = new Client({ intents: IntentOptions });

client.once(Events.ClientReady, (c) => {
  console.log(`Ready! Logged in as ${c.user.tag}`);
});

client.login(process.env.DISCORD_BOT_TOKEN);
