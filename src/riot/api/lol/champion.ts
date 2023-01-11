import { Regions } from "../../constants";
import { lolEndpoints } from "../endpoints";
import { BaseApiLol } from "./base.lol";
import {
  ChampionMasteryDTO,
  ChampionRotationDTO,
  ChampionScoreDTO,
} from "../../dtos";

export class ChampionApi extends BaseApiLol {
  public async getRotation(region: Regions) {
    return this.request<ChampionRotationDTO>(
      region,
      lolEndpoints.ChampionRotation
    );
  }

  public async getAllChampionMasteryBySummoner(
    region: Regions,
    encryptedSummonerId: string
  ) {
    const params = { encryptedSummonerId };
    return this.request<ChampionMasteryDTO[]>(
      region,
      lolEndpoints.ChampionMasteryBySummoner,
      params
    );
  }

  public async getChampionMasteryBySummoner(
    region: Regions,
    encryptedSummonerId: string,
    championId: number
  ) {
    const params = { encryptedSummonerId, championId };
    return this.request<ChampionMasteryDTO>(
      region,
      lolEndpoints.ChampionMasteryBySummonerChampion,
      params
    );
  }

  public async getChampionsScore(region: Regions, encryptedSummonerId: string) {
    const params = { encryptedSummonerId };
    return this.request<ChampionScoreDTO>(
      region,
      lolEndpoints.ChampionScore,
      params
    );
  }

  /** Get specified number of top champion mastery entries sorted by
   *  number of champion points descending
   */
  public async getTopChampionMasteryBySummoner(
    region: Regions,
    encryptedSummonerId: string,
    count: number
  ) {
    const params = { encryptedSummonerId };
    const queryParams = { count };
    return this.request<ChampionMasteryDTO[]>(
      region,
      lolEndpoints.TopChampionMasteryBySummoner,
      params,
      queryParams
    );
  }

  public getMasteryDiscordIcon(championLevel: number): string {
    switch (championLevel) {
      case 1:
        return "<:mastery1:1062478728829083689>";
      case 2:
        return "<:mastery2:1062478746243837982>";
      case 3:
        return "<:mastery3:1062479004470349834>";
      case 4:
        return "<:mastery4:1062479015165829181>";
      case 5:
        return "<:mastery5:1062479025332814014>";
      case 6:
        return "<:mastery6:1062479035990552706>";
      case 7:
        return "<:mastery7:1062479045763276890>";
      default:
        return "<:mastery1:1062478728829083689>";
    }
  }
}
