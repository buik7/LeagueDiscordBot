import { Types } from "mongoose";
import RiotInfo from "./model";
import { DbRiotInfo, DbRiotInfoDocument } from "./type";

export const createRiotInfo = async (
  dbRiotInfo: DbRiotInfo
): Promise<DbRiotInfoDocument | undefined> => {
  try {
    const riotInfo = new RiotInfo(dbRiotInfo);
    await riotInfo.save();
    return riotInfo;
  } catch (error) {
    console.error(error);
  }
};

export const findRiotInfoById = async (
  _id: Types.ObjectId
): Promise<DbRiotInfoDocument | undefined> => {
  try {
    return (await RiotInfo.findById(_id)) || undefined;
  } catch (error) {
    console.error(error);
  }
};

export const deleteRiotInfoById = async (
  _id: Types.ObjectId
): Promise<DbRiotInfoDocument | undefined> => {
  try {
    return (await RiotInfo.findByIdAndDelete(_id)) || undefined;
  } catch (error) {
    console.error(error);
  }
};
