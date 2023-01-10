import { Regions } from "../../constants";
import { CurrentGameInfo } from "../../dtos";
import { lolEndpoints } from "../endpoints";
import { BaseApiLol } from "./base.lol";

export class SpectatorApi extends BaseApiLol {
  /**
   * Get summoner active game
   * @param encryptedSummonerId
   * @param region
   */
  public async getSummonerActiveGame(
    region: Regions,
    encryptedSummonerId: string
  ) {
    const params = { encryptedSummonerId };
    try {
      return await this.request<CurrentGameInfo>(
        region,
        lolEndpoints.SpectatorSummoner,
        params
      );
    } catch (e) {
      return null; /* 404 NOT FOUND - SUMMONER NOT IN GAME */
    }
  }
}
