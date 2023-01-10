export interface IEndpoint {
  path: string;
  version: number;
  prefix: string;
}

export interface IEndpoints {
  [key: string]: IEndpoint;
}

export const lolEndpoints: IEndpoints = {
  /* https://developer.riotgames.com/apis#champion-mastery-v4/ */
  ChampionMasteryBySummoner: {
    path: "champion-masteries/by-summoner/$(encryptedSummonerId)",
    prefix: "champion-mastery",
    version: 4,
  },
  ChampionMasteryBySummonerChampion: {
    path: "champion-masteries/by-summoner/$(encryptedSummonerId)/by-champion/$(championId)",
    prefix: "champion-mastery",
    version: 4,
  },
  TopChampionMasteryBySummoner: {
    path: "champion-masteries/by-summoner/$(encryptedSummonerId)/top",
    prefix: "champion-mastery",
    version: 4,
  },
  ChampionScore: {
    path: "scores/by-summoner/$(encryptedSummonerId)",
    prefix: "champion-mastery",
    version: 4,
  },

  /* https://developer.riotgames.com/apis#champion-v3 */
  ChampionRotation: {
    path: "champion-rotations",
    prefix: "platform",
    version: 3,
  },

  /* https://developer.riotgames.com/apis#league-v4 */
  ChallengerLeaguesByQueue: {
    path: "challengerleagues/by-queue/$(queue)",
    prefix: "league",
    version: 4,
  },
  GrandMasterLeaguesByQueue: {
    path: "grandmasterleagues/by-queue/$(queue)",
    prefix: "league",
    version: 4,
  },
  MasterLeaguesByQueue: {
    path: "masterleagues/by-queue/$(queue)",
    prefix: "league",
    version: 4,
  },
  LeagueEntries: {
    path: "entries/$(queue)/$(tier)/$(division)",
    prefix: "league",
    version: 4,
  },
  SummonerLeague: {
    path: "entries/by-summoner/$(encryptedSummonerId)",
    prefix: "league",
    version: 4,
  },

  /* https://developer.riotgames.com/apis#spectator-v4 */
  SpectatorFeaturedGames: {
    path: "featured-games",
    prefix: "spectator",
    version: 4,
  },
  SpectatorSummoner: {
    path: "active-games/by-summoner/$(encryptedSummonerId)",
    prefix: "spectator",
    version: 4,
  },

  /* https://developer.riotgames.com/apis#summoner-v4/ */
  SummonerByName: {
    path: "/summoners/by-name/$(summonerName)",
    prefix: "summoner",
    version: 4,
  },
  SummonerByPUUID: {
    path: "/summoners/by-puuid/$(encryptedPUUID)",
    prefix: "summoner",
    version: 4,
  },
  SummonerByEncryptedSummonerID: {
    path: "/summoners/$(encryptedSummonerId)",
    prefix: "summoner",
    version: 4,
  },
};

export const tftEndpoints = {
  LeagueMaster: {
    path: "master",
    prefix: "league",
    version: 1,
  },

  LeagueGrandMaster: {
    path: "grandmaster",
    prefix: "league",
    version: 1,
  },

  LeagueChallenger: {
    path: "challenger",
    prefix: "league",
    version: 1,
  },

  LeagueBySummoner: {
    path: "entries/by-summoner/$(encryptedSummonerId)",
    prefix: "league",
    version: 1,
  },
};
