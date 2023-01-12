import { HydratedDocument, Types } from "mongoose";

export interface DbGame {
  _id: Types.ObjectId;
  balance: number;
  points: number;
  dailyCooldown: Date;
  inventoryId: Types.ObjectId;
}

export type DbGameDocument = HydratedDocument<DbGame>;
