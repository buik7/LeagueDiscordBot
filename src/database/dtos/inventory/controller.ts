import { Types } from "mongoose";
import { TftChampionDTO } from "../../../riot/dtos";
import Inventory from "./model";
import { DbInventoryChampion, DbInventoryDocument } from "./type";

export const createInventory = async (): Promise<
  DbInventoryDocument | undefined
> => {
  try {
    const inventory = new Inventory();
    await inventory.save();
    return inventory;
  } catch (error) {
    console.error(error);
  }
};

export const findInventoryById = async (
  _id: Types.ObjectId
): Promise<DbInventoryDocument | undefined> => {
  try {
    return (await Inventory.findById(_id)) || undefined;
  } catch (error) {
    console.error(error);
  }
};

export const tftToDbChampion = (
  champion: TftChampionDTO
): DbInventoryChampion => {
  return {
    name: champion.name,
    icon: champion.icon,
    cost: champion.cost,
    stats: {
      armor: champion.stats.armor,
      damage: champion.stats.damage,
      hp: champion.stats.hp,
      magicResist: champion.stats.magicResist,
    },
    ability: {
      name: champion.ability.name,
      desc: champion.ability.desc,
      icon: champion.ability.icon,
    },
  };
};
