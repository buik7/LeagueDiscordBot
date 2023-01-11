import { HydratedDocument, Types } from "mongoose";

export interface DbUser {
  _id: string;
  tag: string;
  gameId: Types.ObjectId;
  riotInfoId: Types.ObjectId;
}

export type DbUserDocument = HydratedDocument<DbUser>;
