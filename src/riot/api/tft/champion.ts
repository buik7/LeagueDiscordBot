import { TftChampionDTO } from "../../dtos";
import champions from "./static/tftchampions.json";

class ChampionTftApi {
  public static getChampions(): TftChampionDTO[] {
    return champions;
  }

  public static getRandomChampion(): TftChampionDTO {
    const index = Math.floor(Math.random() * champions.length);
    return champions[index];
  }

  public static mapChampionCostToColor(cost: number) {
    if (cost === 1) return 0x808080;
    if (cost === 2) return 0x11b288;
    if (cost === 3) return 0x207ac7;
    if (cost === 4) return 0xc440da;
    if (cost >= 5) return 0xffb93b;
    return 0x0099ff;
  }
}

export default ChampionTftApi;
