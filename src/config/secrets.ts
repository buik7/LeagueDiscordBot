import dotenv from "dotenv";
dotenv.config();

export const DISCORD_BOT_TOKEN = process.env.DISCORD_BOT_TOKEN as string;
export const DISCORD_BOT_GUILD_ID = process.env.DISCORD_BOT_GUILD_ID as string;
export const DISCORD_BOT_CLIENT_ID = process.env
  .DISCORD_BOT_CLIENT_ID as string;
