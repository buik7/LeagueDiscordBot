import { Divisions, Queues, Tiers } from "../constants";
import { MiniSeriesDTO } from "./miniseries";

export type LeagueItemDTO = {
  /** Is new to the division */
  freshBlood: boolean;

  /** Winning team on Summoner Rift.
   *  First placement on TFT.
   */
  wins: number;

  summonerName: string;

  miniSeries: MiniSeriesDTO;

  /** No longer actively plays */
  inactive: boolean;

  /** The player has played more than 100 games in the division */
  veteran: boolean;

  /** Winning streak of 3 or higher */
  hotStreak: boolean;

  rank: Divisions;

  leaguePoints: number;

  /** Losing team on Summoner Rift.
   *  Second through eighth placement in TFT
   */
  losses: number;

  /** Player's encrypted summnonerId */
  summonerId: string;
};

export type LeagueListDTO = {
  leagueId: string;

  entries: LeagueItemDTO[];

  tier: Tiers;

  name: string;

  queue: Queues;
};

export type SummonerLeagueDto = {
  queueType: string;
  summonerName: string;
  hotStreak: boolean;
  miniSeries?: MiniSeriesDTO;
  /**
   * Winning team on Summoners Rift. First placement in Teamfight Tactics.
   */
  wins: number;
  veteran: boolean;
  /**
   * Losing team on Summoners Rift. Second through eighth placement in Teamfight Tactics.
   */
  losses: number;
  rank: string;
  leagueId: string;
  inactive: boolean;
  freshBlood: boolean;
  tier: string;
  /**
   * Player's summonerId (Encrypted)
   */
  summonerId: string;
  leaguePoints: number;
};
