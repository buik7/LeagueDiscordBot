import { HydratedDocument, PopulatedDoc, Types } from "mongoose";
import { DbGame } from "../game/type";
import { DbRiotInfo } from "../riotinfo/type";

export interface DbUserId {
  discordUserId: string;
  discordGuildId: string;
}

export interface DbUser {
  _id: DbUserId;
  tag: string;
  gameId: Types.ObjectId;
  riotInfoId: Types.ObjectId;
}

export interface GamePopulatedDbUser extends Omit<DbUser, "gameId"> {
  gameId: PopulatedDoc<DbGame>;
}

export interface RiotInfoPopulatedDbUser extends Omit<DbUser, "riotInfoId"> {
  riotInfoId: PopulatedDoc<DbRiotInfo>;
}

export type DbUserDocument = HydratedDocument<DbUser>;
export type GamePopulatedDbUserDocument = HydratedDocument<GamePopulatedDbUser>;
export type RiotInfoPopulatedDbUserDocument =
  HydratedDocument<RiotInfoPopulatedDbUser>;
