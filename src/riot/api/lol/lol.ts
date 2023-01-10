import { BaseApiLol } from "./base.lol";
import { LeagueAPI } from "./league";
import { SummonerApi } from "./summoner";
import { ChampionApi } from "./champion";
import { SpectatorApi } from "./spectator";

export class LolApi extends BaseApiLol {
  public readonly League = new LeagueAPI();
  public readonly Summoner = new SummonerApi();
  public readonly Champion = new ChampionApi();
  public readonly Spectator = new SpectatorApi();
}
