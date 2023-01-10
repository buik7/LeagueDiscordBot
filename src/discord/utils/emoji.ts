import { GuildEmoji } from "discord.js";

export const getEmojiEncoding = (emoji: GuildEmoji) => {
  return `<:${emoji.name}:${emoji.id}>`;
};
