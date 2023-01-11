import mongoose from "mongoose";
import { DbGame } from "./type";

const GameSchema = new mongoose.Schema<DbGame>({
  balance: {
    default: 30,
    type: Number,
  },
  points: {
    default: 0,
    type: Number,
  },
  dailyCooldown: {
    type: Date,
    default: new Date(),
  },
  inventoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Inventory",
  },
});

const Game = mongoose.model<DbGame>("Game", GameSchema);
export default Game;
