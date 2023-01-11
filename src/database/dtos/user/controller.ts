import { createDbGame } from "../game/controller";
import { DbGame } from "../game/type";
import User from "./model";
import { DbUserDocument, DbUserId, GamePopulatedDbUserDocument } from "./type";

export const createDbUser = async (
  _id: DbUserId,
  discordUserTag: string,
  initialBalance: number = 30
): Promise<DbUserDocument | undefined> => {
  try {
    const userGame = await createDbGame(initialBalance);
    if (!userGame) {
      throw new Error("Failed to create db game");
    }

    const user = new User({
      _id,
      tag: discordUserTag,
      gameId: userGame._id,
    });

    await user.save();
    return user;
  } catch (error) {
    console.log(error);
  }
};

export const findDbUserById = async (
  _id: DbUserId
): Promise<DbUserDocument | undefined> => {
  const user = await User.findById(_id);
  return user ? user : undefined;
};

export const findOneOrCreateDbUser = async (
  _id: DbUserId,
  discordUserTag: string
): Promise<
  | {
      user: DbUserDocument | undefined;
      created: boolean;
    }
  | undefined
> => {
  try {
    const user = await User.findById(_id);
    if (user) return { user, created: false };
    return {
      user: await createDbUser(_id, discordUserTag),
      created: true,
    };
  } catch (error) {
    console.error;
  }
};

export const updateUserBalance = async (
  _id: DbUserId,
  newBalance: number
): Promise<GamePopulatedDbUserDocument | undefined> => {
  try {
    const user = await User.findById(_id).populate<{ gameId: DbGame }>(
      "gameId"
    );
    if (!user) throw new Error("User not found");
    user.gameId.balance = newBalance;
    await user.save();
    return user;
  } catch (error) {
    console.log(error);
  }
};

export const populateUserGame = async (
  user: DbUserDocument
): Promise<GamePopulatedDbUserDocument> => {
  return await user.populate<{ gameId: DbGame }>("gameId");
};

/**
 * Extract `top` users with highest in specified discord guild. \
 * Users are returned in descending order of game balance
 * @param discordGuildId
 * @param top positive integer (default to 5 if not specified or `top <= 0`)
 */
export const rankGuildUserByBalance = async (
  discordGuildId: string,
  top: number = 5
): Promise<GamePopulatedDbUserDocument[] | undefined> => {
  try {
    if (top <= 0) top = 5;
    const users = await User.find({
      "_id.discordGuildId": discordGuildId,
    })
      .populate<{ gameId: DbGame }>("gameId")
      .sort({ "gameId.balance": -1 })
      .limit(top);
    if (!users) throw new Error("Failed to retrieve users");
    return users;
  } catch (error) {
    console.error(error);
  }
};

/**
 * Extract `top` users with highest in specified discord guild. \
 * Users are returned in descending order of game points
 * @param discordGuildId
 * @param top positive integer (default to 5 if not specified or `top <= 0`)
 */
export const rankGuildUserByPoints = async (
  discordGuildId: string,
  top: number = 5
): Promise<GamePopulatedDbUserDocument[] | undefined> => {
  try {
    if (top <= 0) top = 5;
    const users = await User.find({
      "_id.discordGuildId": discordGuildId,
    })
      .populate<{ gameId: DbGame }>("gameId")
      .sort({ "gameId.points": -1 })
      .limit(top);

    if (!users) throw new Error("Failed to retrieve users");
    return users;
  } catch (error) {
    console.error(error);
  }
};
