import { RegionGroups, Regions } from "../../constants";
import { BaseApi } from "../base";
import { BaseApiGames } from "../game";

export class BaseApiTft extends BaseApi<RegionGroups | Regions> {
  protected readonly game = BaseApiGames.TFT;
}
