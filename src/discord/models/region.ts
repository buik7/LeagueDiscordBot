import { regionProps } from "../../riot/constants";

export const getLeagueRegionDiscordChoices = () => {
  const choices = [];
  for (let region in regionProps) {
    choices.push({
      name: regionProps[region],
      value: region,
    });
  }
  return choices;
};
