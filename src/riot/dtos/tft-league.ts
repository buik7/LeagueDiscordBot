import { Divisions, Queues, Tiers } from "../constants";
import { MiniSeriesDTO } from "./miniseries";

interface BasedEntryDTO {
  summonerId: string;
  summonerName: string;
  wins: number;
  losses: number;
  queueType: Queues;
}

interface LeagueEntryTurboDTO extends BasedEntryDTO {
  queueType: Queues.RANKED_TFT_TURBO;
  ratedTier: "ORANGE" | "PURPLE" | "GREEN" | "BLUE" | "GRAY";
  ratedRating: number;
}

interface OtherEntryDTO extends BasedEntryDTO {
  leagueId: string;
  tier: Tiers;
  rank: Divisions;
  leaguePoints: number;
  hotstreak: boolean;
  veteran: boolean;
  freshBlood: boolean;
  inactive: boolean;
  miniSeries: MiniSeriesDTO;
}

export type LeagueEntryDTO = LeagueEntryTurboDTO | OtherEntryDTO;
