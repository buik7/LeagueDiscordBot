import mongoose from "mongoose";
import { DbInventory } from "./type";

const InventoryChampionType = {
  name: {
    type: String,
  },
  cost: {
    type: Number,
  },
  icon: {
    type: String,
  },
  stats: {
    armor: { type: Number },
    damage: { type: Number },
    hp: { type: Number },
    magicResist: { type: Number },
  },
  ability: {
    name: String,
    desc: String,
    icon: String,
  },
};

const MainChampionType = {
  ...InventoryChampionType,
  star: Number,
};

const InventorySchema = new mongoose.Schema<DbInventory>({
  champions: [
    {
      champion: InventoryChampionType,
      count: Number,
    },
  ],
  mainChampion: MainChampionType,
});

const Inventory = mongoose.model<DbInventory>("Inventory", InventorySchema);
export default Inventory;
