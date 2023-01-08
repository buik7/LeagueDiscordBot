export type SummonerDTO = {
  /** Encrypted account ID */
  accountId: string;

  /** ID of the summoner icon associated with the summoner. */
  profileIconId: number;

  /** Date summoner was last modified specified as epoch milliseconds */
  revisionDate: number;

  /** Summoner name */
  name: string;

  /** Encrypted summoner ID */
  id: string;

  /** Encrypted puuid (unique globally) */
  puuid: string;

  /** Summoner level associated with the summoner */
  summonerLevel: number;
};
