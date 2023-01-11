import mongoose from "mongoose";
import { DbUser } from "./type";

const UserSchema = new mongoose.Schema<DbUser>({
  _id: {
    type: String,
    required: true,
  },
  tag: {
    type: String,
    required: true,
  },
  gameId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Game",
    required: true,
  },
  riotInfoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "RiotInfo",
  },
});

const User = mongoose.model<DbUser>("User", UserSchema);
export default User;
