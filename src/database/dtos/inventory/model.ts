import mongoose from "mongoose";
import { DbInventory } from "./type";

const InventoryChampionType = {
  name: {
    type: String,
    required: true,
  },
  count: {
    type: Number,
    required: true,
  },
  cost: {
    type: Number,
    required: true,
  },
  icon: {
    type: String,
  },
  stats: {
    armor: { type: Number, default: 0 },
    damage: { type: Number, default: 0 },
    hp: { type: Number, default: 0 },
    magicResist: { type: Number, default: 0 },
  },
  ability: {
    name: String,
    desc: String,
    icon: String,
  },
};

const InventorySchema = new mongoose.Schema<DbInventory>({
  champions: [InventoryChampionType],
  mainChampion: InventoryChampionType,
});

const Inventory = mongoose.model<DbInventory>("Inventory", InventorySchema);
export default Inventory;
