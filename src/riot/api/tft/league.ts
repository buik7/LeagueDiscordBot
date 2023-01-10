import { Regions } from "../../constants";
import { LeagueEntryDTO, LeagueListDTO } from "../../dtos";
import { tftEndpoints } from "../endpoints";
import { BaseApiTft } from "./base.tft";

export class LeagueTFTApi extends BaseApiTft {
  /**
   * Get league entries for a given summoner ID
   * @param encryptedSummonerId
   * @param region
   */
  public async getSummonerEntries(
    encryptedSummonerId: string,
    region: Regions
  ) {
    const params = { encryptedSummonerId };
    return this.request<LeagueEntryDTO[]>(
      region,
      tftEndpoints.LeagueBySummoner,
      params
    );
  }
  /**
   * Get the master league
   * @param region
   */
  public async getMasterLeague(region: Regions) {
    return this.request<LeagueListDTO>(region, tftEndpoints.LeagueMaster);
  }
  /**
   * Get the grandmaster league
   * @param region
   */
  public async getGrandMasterLeague(region: Regions) {
    return this.request<LeagueListDTO>(region, tftEndpoints.LeagueGrandMaster);
  }
  /**
   * Get the challenger league
   * @param region
   */
  public async getChallengerLeague(region: Regions) {
    return this.request<LeagueListDTO>(region, tftEndpoints.LeagueChallenger);
  }
}
