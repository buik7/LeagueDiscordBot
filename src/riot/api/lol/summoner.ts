import { Regions } from "../../constants";
import { SummonerDTO } from "../../dtos";
import { lolEndpoints } from "../endpoints";
import { BaseApiLol } from "./base.lol";

export class SummonerApi extends BaseApiLol {
  public async getByName(summonerName: string, region: Regions) {
    const params = { summonerName };
    return this.request<SummonerDTO>(
      region,
      lolEndpoints.SummonerByName,
      params
    );
  }

  public async getByPUUID(encryptedPUUID: string, region: Regions) {
    const params = { encryptedPUUID };
    return this.request<SummonerDTO>(
      region,
      lolEndpoints.SummonerByPUUID,
      params
    );
  }

  public async getById(encryptedSummonerId: string, region: Regions) {
    const params = { encryptedSummonerId };
    return this.request<SummonerDTO>(
      region,
      lolEndpoints.SummonerByEncryptedSummonerID,
      params
    );
  }
}
