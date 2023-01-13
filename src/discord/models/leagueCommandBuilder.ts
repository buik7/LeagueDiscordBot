import { SlashCommandBuilder } from "discord.js";
import { getLeagueRegionDiscordChoices } from "./region";

interface CommandOption {
  description?: string;
  required?: boolean;
}

interface CommandOptions {
  region?: CommandOption;
  summonerName?: CommandOption;
  discordUser?: CommandOption;
}

const defaultDescriptions = {
  region: "Summoner's region",
  summonerName: "Summoner's name",
  discordUser: "Tag a discord user",
};

interface BuildCommandParam {
  name: string;
  description: string;
  options: CommandOptions;
}

export enum LeagueOptionName {
  region = "region",
  summonerName = "summoner_name",
  discordUser = "discord_user",
}

export const buildCommand = ({
  name,
  description,
  options,
}: BuildCommandParam) => {
  const command = new SlashCommandBuilder()
    .setName(name)
    .setDescription(description);

  if (options.region) {
    const regionDescription =
      options.region.description || defaultDescriptions.summonerName;
    command.addStringOption((option) => {
      option
        .setName(LeagueOptionName.region)
        .setDescription(regionDescription)
        .addChoices(...getLeagueRegionDiscordChoices());

      if (options.region && options.region.required) option.setRequired(true);
      return option;
    });
  }

  if (options.summonerName) {
    const summonerNameDescription =
      options.summonerName.description || defaultDescriptions.summonerName;
    command.addStringOption((option) => {
      option
        .setName(LeagueOptionName.summonerName)
        .setDescription(summonerNameDescription);
      if (options.summonerName && options.summonerName.required)
        option.setRequired(true);
      return option;
    });
  }

  if (options.discordUser) {
    const discordUserDescription =
      options.discordUser.description || defaultDescriptions.summonerName;
    command.addStringOption((option) => {
      option
        .setName(LeagueOptionName.discordUser)
        .setDescription(discordUserDescription);
      if (options.discordUser && options.discordUser.required)
        option.setRequired(true);
      return option;
    });
  }

  return command;
};
