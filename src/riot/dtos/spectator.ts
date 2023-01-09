import { GameModes, GameTypes } from "../constants";

export type CurrentGameInfo = {
  /** The ID of the game */
  gameId: number;

  /** The game type */
  gameType: GameTypes;

  /** The game start time represented in epoch milliseconds */
  gameStartTime: number;

  /** The ID of the map  */
  mapId: number;

  /** The amount of time in seconds that has passed since the game started */
  gameLength: number;

  /** The ID of the platform on which the game is being played */
  platformId: string;

  /** The game mode */
  gameMode: GameModes;

  /** Banned champion information */
  bannedChampions: BannedChampion[];

  /** The queue type. Reference: https://static.developer.riotgames.com/docs/lol/queues.json */
  gameQueueConfigId: number;

  /** The observer information */
  observers: Observer;

  /** The participant information */
  participants: CurrentGameParticipant[];
};

export type BannedChampion = {
  /** The turn during which the champion was banned */
  pickTurn: number;

  /** The ID of the banned champion */
  championId: number;

  /** The ID of the team that banned the champion  */
  teamId: number;
};

export type Observer = {
  /** Key used to decrypt the spectator grid game data for playback */
  encryptionKey: string;
};

export type CurrentGameParticipant = {
  /** The ID of the champion played by this participant */
  championId: number;

  /** Perks/Runes Reforged Information */
  perks: Perks;

  /** The ID of the profile icon used by this participant */
  profileIconId: number;

  /** Flag indicating whether or not this participant is a bot */
  bot: boolean;

  /** The team ID of this participant, indicating the participant's team */
  teamId: number;

  /** The summoner name of this participant */
  summonerName: string;

  /** The encrypted summoner ID of this participant */
  summonerId: string;

  /** The ID of the first summoner spell used by this participant */
  spell1Id: number;

  /** The ID of the second summoner spell used by this participant */
  spell2Id: number;

  gameCustomizationObjects: GameCustomizationObject[];
};

export type Perks = {
  /** IDs of the perks/runes assigned */
  perkIds: number[];

  /** Primary runes path */
  perkStyle: number;

  /** Secondary runes path */
  perkSubStyle: number;
};

export type GameCustomizationObject = {
  /** Category identifier for Game Customization */
  category: string;

  /** Game Customization content */
  content: string;
};
