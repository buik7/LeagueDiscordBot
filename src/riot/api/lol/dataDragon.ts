import axios, { AxiosRequestConfig } from "axios";
import { DataDragonEnum, RealmServers } from "../../constants";
import {
  GameModesDataDragonDTO,
  GameTypesDataDragonDTO,
  MapsDataDragonDTO,
  QueuesDataDragonDTO,
  RealmDTO,
  RunesReforgedDTO,
} from "../../dtos";

const defaultLang = "en_US";

export class DataDragonService {
  private async request<T>(
    path: string,
    base: DataDragonEnum = DataDragonEnum.BASE
  ): Promise<T> {
    const options: AxiosRequestConfig = {
      url: `${base}/${path}`,
      method: "GET",
    };
    return (await axios(options)).data;
  }

  async getRealms(server: RealmServers): Promise<RealmDTO> {
    const path = `realms/${server}.json`;
    return this.request(path);
  }

  async getVersions(): Promise<string[]> {
    const path = "api/versions.json";
    return this.request(path);
  }

  async getLanguages(): Promise<string[]> {
    const path = "cdn/languages.json";
    return this.request(path);
  }

  /**
   * Runes reforged (perks)
   * Sample: https://ddragon.leagueoflegends.com/cdn/12.23.1/data/en_US/runesReforged.json
   */
  async getRunesReforged(): Promise<RunesReforgedDTO[]> {
    const version = (await this.getVersions())[0];
    const path = `cdn/${version}/data/${defaultLang}/runesReforged.json`;
    return this.request(path);
  }

  // Static data
  async getQueues(): Promise<QueuesDataDragonDTO[]> {
    const path = "docs/lol/queues.json";
    return this.request(path, DataDragonEnum.STATIC);
  }

  async getSeasons(): Promise<{ id: number; season: string }[]> {
    const path = "docs/lol/seasons.json";
    return this.request(path, DataDragonEnum.STATIC);
  }

  async getMaps(): Promise<MapsDataDragonDTO[]> {
    const path = "docs/lol/maps.json";
    return this.request(path, DataDragonEnum.STATIC);
  }

  async getGameModes(): Promise<GameModesDataDragonDTO[]> {
    const path = "docs/lol/gameModes.json";
    return this.request(path, DataDragonEnum.STATIC);
  }

  async getGameTypes(): Promise<GameTypesDataDragonDTO[]> {
    const path = "docs/lol/gameTypes.json";
    return this.request(path, DataDragonEnum.STATIC);
  }
}
