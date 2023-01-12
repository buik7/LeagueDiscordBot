import { TftChampionDTO } from "../../dtos";
import champions from "./static/tftchampions.json";

class ChampionTftApi {
  public static getChampions(): TftChampionDTO[] {
    return champions;
  }

  public static getRandomChampion(cost?: number): TftChampionDTO {
    if (!cost) return this.getRandomElementFromArray(champions);

    return this.getRandomElementFromArray(this.getChampionsWithCost(cost));
  }

  public static getChampionsWithCost(cost: number) {
    return champions.filter((c) => c.cost === cost);
  }

  public static mapChampionCostToColor(cost: number) {
    if (cost === 1) return 0x808080;
    if (cost === 2) return 0x11b288;
    if (cost === 3) return 0x207ac7;
    if (cost === 4) return 0xc440da;
    if (cost >= 5) return 0xffb93b;
    return 0x0099ff;
  }

  private static getRandomElementFromArray<T>(array: T[]): T {
    const index = Math.floor(Math.random() * array.length);
    return array[index];
  }
}

export default ChampionTftApi;
