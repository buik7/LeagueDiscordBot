import { Divisions, Queues, Regions, Tiers } from "../../constants";
import { LeagueEntryDTO, LeagueListDTO, SummonerLeagueDto } from "../../dtos";
import { lolEndpoints } from "../endpoints";
import { BaseApiLol } from "./base.lol";

export class LeagueAPI extends BaseApiLol {
  /**
   * Get summoner leagues
   * @param encryptedSummonerId Encrypted summoner ID. Max length 63 characters.
   * @param region
   */
  public async bySummoner(region: Regions, encryptedSummonerId: string) {
    const params = { encryptedSummonerId };
    return this.request<SummonerLeagueDto[]>(
      region,
      lolEndpoints.SummonerLeague,
      params
    );
  }

  /**
   * League entries
   * @param queue Note that the queue value must be a valid ranked queue.
   * @param tier
   * @param division
   * @param region
   * @param page defaults to 1
   */
  public async entries(
    queue: Queues,
    tier: Tiers,
    division: Divisions,
    region: Regions,
    page: number = 1
  ) {
    const params = { queue, tier, division };
    const queryParams = { page };
    return this.request<LeagueEntryDTO>(
      region,
      lolEndpoints.LeagueEntries,
      params,
      queryParams
    );
  }

  /**
   * Get challenger league by queue
   * @param queue Note that the queue value must be a valid ranked queue.
   * @param region
   */
  public async getChallengerLeaguesByQueue(queue: Queues, region: Regions) {
    const params = { queue };
    return this.request<LeagueListDTO>(
      region,
      lolEndpoints.ChallengerLeaguesByQueue,
      params
    );
  }
  /**
   * Get grandmaster league by queue
   * @param queue Note that the queue value must be a valid ranked queue.
   * @param region
   */
  public async getGrandMasterLeagueByQueue(queue: Queues, region: Regions) {
    const params = { queue };
    return this.request<LeagueListDTO>(
      region,
      lolEndpoints.GrandMasterLeaguesByQueue,
      params
    );
  }
  /**
   * Get master league by queue
   * @param queue Note that the queue value must be a valid ranked queue.
   * @param region
   */
  public async getMasterLeagueByQueue(queue: Queues, region: Regions) {
    const params = { queue };
    return this.request<LeagueListDTO>(
      region,
      lolEndpoints.MasterLeaguesByQueue,
      params
    );
  }
}
