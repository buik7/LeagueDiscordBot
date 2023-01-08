export enum Queues {
  RANKED_SOLO_5x5 = "RANKED_SOLO_5x5",
  RANKED_FLEX_5x5 = "RANKED_FLEX_5x5",
  RANKED_TFT = "RANKED_TFT",
}

export type LeagueItemDTO = {};

export type LeagueListDTO = {
  leagueId: string;

  entries: LeagueItemDTO[];

  tier: string;

  name: string;

  queue: string;
};

export type MiniSeriesDTO = {
  losses: number;

  progress: string;

  target: number;

  wins: number;
};
