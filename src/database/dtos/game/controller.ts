import { Types } from "mongoose";
import Game from "./model";
import { DbGameDocument } from "./type";

export const createDbGame = async (
  initialBalance?: number
): Promise<DbGameDocument | undefined> => {
  try {
    let balance;
    if (!initialBalance || initialBalance < 0) {
      balance = undefined; // let mongoose use default value
    }
    const dbGame = new Game({ balance });
    await dbGame.save();
    return dbGame;
  } catch (error) {
    console.error(error);
  }
};

export const getGameById = async (
  _id: Types.ObjectId
): Promise<DbGameDocument | undefined> => {
  try {
    const game = await Game.findById(_id);
    return game ? game : undefined;
  } catch (error) {
    console.error(error);
  }
};
