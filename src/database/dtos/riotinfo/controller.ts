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
