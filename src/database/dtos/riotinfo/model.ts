import mongoose from "mongoose";
import { DbRiotInfo } from "./type";

const RiotInfoSchema = new mongoose.Schema<DbRiotInfo>({
  summonerName: String,
  puuid: String,
  encryptedSummonerId: String,
  region: String,
  profileIconId: Number,
});

const RiotInfo = mongoose.model<DbRiotInfo>("RiotInfo", RiotInfoSchema);
export default RiotInfo;
