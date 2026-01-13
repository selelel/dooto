import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { NextRequest } from "next/server";
import { logger } from "./logger";
import https from "https";

const APIUrl = `${process.env.API_URL}`;

console.log(APIUrl)

export type RequestOptions<TParams = unknown> = {
  req?: NextRequest;
  params?: TParams;
  config?: AxiosRequestConfig;
  headers?: Record<string, string>;
};

export type ApiResponse<T> = AxiosResponse<T>;

const buildQueryParams = (req?: NextRequest, params?: unknown) => {
  const queryFromReq =
    req?.nextUrl?.searchParams
      ? Object.fromEntries(req.nextUrl.searchParams.entries())
      : {};

  return {
    ...queryFromReq,
    ...(params ?? {}),
  };
};

const httpsAgent = new https.Agent({
  rejectUnauthorized: false,  // disables SSL cert validation - ONLY FOR DEV / TESTING!
});

const get = async <TResponse = unknown, TParams = unknown>(
  endpoint: string,
  options: RequestOptions<TParams> = {}
): Promise<ApiResponse<TResponse>> => {
  const url = `${APIUrl}${endpoint}`;

  logger.info("GET:", url);

  return axios.get<TResponse>(url, {
    params: buildQueryParams(options.req, options.params),
    headers: options.headers,
    httpsAgent,
    withCredentials: true,  // <-- Added here
    ...options.config,
  });
};

const post = async <TResponse = unknown, TBody = unknown>(
  endpoint: string,
  body: TBody,
  options: RequestOptions = {}
): Promise<ApiResponse<TResponse>> => {
  const url = `${APIUrl}${endpoint}`;

  logger.info("POST:", url);
  logger.info("Body:", body);
  logger.info("Opts:", options);

  return axios.post<TResponse>(url, body, {
    headers: options.headers,
    params: options.params,
    httpsAgent,
    withCredentials: true,  // <-- Added here
    ...options.config,
  });
};

const patch = async <TResponse = unknown, TBody = unknown>(
  endpoint: string,
  body: TBody,
  options: RequestOptions = {}
): Promise<ApiResponse<TResponse>> => {
  const url = `${APIUrl}${endpoint}`;

  logger.info("PATCH:", url);
  logger.info("Body:", body);

  return axios.patch<TResponse>(url, body, {
    headers: options.headers,
    httpsAgent,
    withCredentials: true,  // <-- Added here
    ...options.config,
  });
};

const del = async <TResponse = unknown, TBody = unknown>(
  endpoint: string,
  body?: TBody,
  options: RequestOptions = {}
): Promise<ApiResponse<TResponse>> => {
  const url = `${APIUrl}${endpoint}`;

  logger.info("DELETE:", url);
  logger.info("Body:", body);
  logger.info("Opts:", options);

  return axios.delete<TResponse>(url, {
    headers: options.headers,
    data: body,
    params: options.params,
    httpsAgent,
    withCredentials: true,  // <-- Added here
    ...options.config,
  });
};

export const ServerApiClient = {
  get,
  post,
  patch,
  delete: del,
};
