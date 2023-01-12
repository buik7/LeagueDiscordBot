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

/** \
 * Return all guild users in descending order of game balance
 * @param discordGuildId
 */
export const rankGuildUserByBalance = async (
  discordGuildId: string
): Promise<GamePopulatedDbUserDocument[] | undefined> => {
  try {
    const users = await User.find({
      "_id.discordGuildId": discordGuildId,
    }).populate<{ gameId: DbGame }>("gameId");

    users.sort((a, b) => b.gameId.balance - a.gameId.balance);
    return users;
  } catch (error) {
    console.error(error);
  }
};

/**
 * Return all guild users in descending order of game points
 * @param discordGuildId
 */
export const rankGuildUserByPoints = async (
  discordGuildId: string
): Promise<GamePopulatedDbUserDocument[] | undefined> => {
  try {
    const users = await User.find({
      "_id.discordGuildId": discordGuildId,
    }).populate<{ gameId: DbGame }>("gameId");

    users.sort((a, b) => b.gameId.points - a.gameId.points);
    return users;
  } catch (error) {
    console.error(error);
  }
};
