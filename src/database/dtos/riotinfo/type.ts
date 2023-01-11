import { HydratedDocument } from "mongoose";
import { Regions } from "../../../riot/constants";

export interface DbRiotInfo {
  summonerName: string;
  puuid: string;
  encryptedSummonerId: string;
  region: Regions;
  profileIconId: number;
}

export type DbRiotInfoDocument = HydratedDocument<DbRiotInfo>;
