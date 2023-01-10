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
}
