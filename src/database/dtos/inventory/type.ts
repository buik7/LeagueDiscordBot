import { HydratedDocument, Types } from "mongoose";

export interface DbInventoryChampion {
  name: string;
  icon: string;
  cost: number;
  stats: {
    armor: number;
    damage: number;
    hp: number;
    magicResist: number;
  };
  ability: {
    name: string;
    desc: string;
    icon: string;
  };
}

export interface DbInventory {
  _id: Types.ObjectId;
  champions: {
    champion: DbInventoryChampion;
    count: number;
  }[];
  mainChampion: DbInventoryChampion;
}

export type DbInventoryDocument = HydratedDocument<DbInventory>;
