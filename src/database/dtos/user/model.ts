import mongoose from "mongoose";
import { DbUser } from "./type";

const UserSchema = new mongoose.Schema<DbUser>({
  _id: {
    discordUserId: {
      type: String,
      required: true,
    },
    discordGuildId: {
      type: String,
      required: true,
    },
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
