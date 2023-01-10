import { BaseApiTft } from "./base.tft";
import { LeagueTFTApi } from "./league";

export class TFTApi extends BaseApiTft {
  public readonly League = new LeagueTFTApi();
}
