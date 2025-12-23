// serverApiClient.ts

import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { NextRequest } from "next/server";
import { PREFIX } from "@/constant/api";
import { logger } from "./logger";

const APIUrl = `${process.env.API_URL}${PREFIX}`;

/* ---------------------------------- */
/* Types                              */
/* ---------------------------------- */

export type RequestOptions<TParams = unknown> = {
  req?: NextRequest;
  params?: TParams;
  config?: AxiosRequestConfig;
  headers?: Record<string, string>;
};

export type ApiResponse<T> = AxiosResponse<T>;

/* ---------------------------------- */
/* Helpers                            */
/* ---------------------------------- */

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

/* ---------------------------------- */
/* HTTP Methods                       */
/* ---------------------------------- */

const get = async <TResponse = unknown, TParams = unknown>(
  endpoint: string,
  options: RequestOptions<TParams> = {}
): Promise<ApiResponse<TResponse>> => {
  const url = `${APIUrl}${endpoint}`;

  logger.info("GET:", url);

  return axios.get<TResponse>(url, {
    params: buildQueryParams(options.req, options.params),
    headers: options.headers,
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
  // ! REMOVE WHEN DEPLOYED
  logger.info("Body:", body);

  return axios.post<TResponse>(url, body, {
    headers: options.headers,
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

  return axios.delete<TResponse>(url, {
    headers: options.headers,
    data: body,
    ...options.config,
  });
};

/* ---------------------------------- */
/* Export                            */
/* ---------------------------------- */

export const ServerApiClient = {
  get,
  post,
  patch,
  delete: del,
};
