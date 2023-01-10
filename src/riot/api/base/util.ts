import { AxiosRequestConfig } from "axios";

export interface IParams {
  [key: string]: string | number;
}

export interface IBaseApiParams {
  /** If api response is 429 (rate limits) try reattempt after needed time (default true) */
  rateLimitRetry?: boolean;

  /** Number of time to retry after rate limit response */
  rateLimitRetryAttempts?: number;
}

export function waiter(ms: number) {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}

export function getUrlFromOptions(options: AxiosRequestConfig): string {
  let uri = options.url;
  if (!uri) throw new Error("Url not found");
  if (options.params) {
    uri += "?";
    uri += new URLSearchParams(options.params).toString();
  }
  return uri;
}
