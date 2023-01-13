import { Regions } from "../../constants";
import { SummonerDTO } from "../../dtos";
import { lolEndpoints } from "../endpoints";
import { BaseApiLol } from "./base.lol";

export class SummonerApi extends BaseApiLol {
  public async getByName(region: Regions, summonerName: string) {
    const params = { summonerName };
    return this.request<SummonerDTO>(
      region,
      lolEndpoints.SummonerByName,
      params
    );
  }

  public async getByPUUID(region: Regions, encryptedPUUID: string) {
    const params = { encryptedPUUID };
    return this.request<SummonerDTO>(
      region,
      lolEndpoints.SummonerByPUUID,
      params
    );
  }

  public async getById(region: Regions, encryptedSummonerId: string) {
    const params = { encryptedSummonerId };
    return this.request<SummonerDTO>(
      region,
      lolEndpoints.SummonerByEncryptedSummonerID,
      params
    );
  }

  public static getProfileIconURL(profileIconId: number): string {
    return `https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/v1/profile-icons/${profileIconId}.jpg`;
  }
}
