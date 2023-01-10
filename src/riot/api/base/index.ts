import { RegionGroups } from "../../constants";
import { IEndpoint } from "../endpoints";
import { BaseApiGames, BaseConstants } from "../game";
import { IParams } from "./util";
import axios, { AxiosRequestConfig } from "axios";
import { RIOT_API_KEY } from "../../config";

export class BaseApi<Region extends string> {
  protected readonly game: BaseApiGames = BaseApiGames.LOL;
  private readonly baseUrl = BaseConstants.BASE_URL;
  constructor() {}

  private getBaseUrl() {
    return this.baseUrl.replace(":game", this.game);
  }

  private getApiUrl(endpoint: IEndpoint, params: IParams) {
    const { prefix, version, path } = endpoint;
    const basePath = `${prefix}/v${version}/${path}`;

    const re = /\$\(([^\)]+)?\)/g;
    let base = `${this.getBaseUrl()}/${basePath}`;

    let match;

    while ((match = re.exec(base))) {
      const [key, paramKey] = match;
      const value = encodeURI(String(params[paramKey]));
      base = base.replace(key, value);
      re.lastIndex = 0;
    }

    return base;
  }

  protected async request<T>(
    region: Region | RegionGroups,
    endpoint: IEndpoint,
    params?: IParams,
    queryParams?: any
  ): Promise<T> {
    params = params || {};
    params.region = region.toLowerCase();

    const url = this.getApiUrl(endpoint, params);
    const options: AxiosRequestConfig = {
      url,
      method: "GET",
      headers: {
        Origin: null,
        "X-Riot-Token": RIOT_API_KEY,
      },
      params: queryParams,
    };

    return axios(options);
  }
}
