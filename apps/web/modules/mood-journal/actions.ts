import axios from "axios";
import { ENDPOINT } from "@/constant/http";
import { normalizeAxiosError } from "@/lib/utils";
import { POSTTimerRequest, POSTTimerResponse, UpdateTimerT } from "./types";
import { logger } from "@/lib/logger";

/* =========================
   Create Habit
========================= */

export const createTimer = async (
  payload: POSTTimerRequest
): Promise<POSTTimerResponse> => {
  try {
    const response = await axios.post<POSTTimerResponse>(
      ENDPOINT.TIMER.timer,
      payload
    );

    return response.data;
  } catch (error) {
    throw normalizeAxiosError(error);
  }
};

export const getTimers = async (): Promise<POSTTimerResponse[]> => {
  try {
    const response = await axios.get<POSTTimerResponse[]>(
      ENDPOINT.TIMER.timer,
    );

    return response.data;
  } catch (error) {
    throw normalizeAxiosError(error);
  }
};

export const deleteTimer = async (id: string): Promise<POSTTimerResponse> => {
  try {
    const response = await axios.delete<POSTTimerResponse>(
      `${ENDPOINT.TIMER.timer}/${id}`,
    );

    return response.data;
  } catch (error) {
    throw normalizeAxiosError(error);
  }
};

export const updateTimer = async (data: UpdateTimerT ): Promise<POSTTimerResponse> => {
  try {
    const {id, ...payload} = data
    const response = await axios.patch<POSTTimerResponse>(
      `${ENDPOINT.TIMER.timer}/${data.id}`,
      payload
    );

    return response.data;
  } catch (error) {
    throw normalizeAxiosError(error);
  }
};

export const getTimer = async (id: string): Promise<POSTTimerResponse> => {
  try {
    const response = await axios.get<POSTTimerResponse>(
      `${ENDPOINT.TIMER.timer}/${id}`,
    );

    return response.data;
  } catch (error) {
    throw normalizeAxiosError(error);
  }
};

export const relapse = async (id: string): Promise<POSTTimerResponse> => {
  try {
    const response = await axios.post<POSTTimerResponse>(
      `${ENDPOINT.TIMER.timer}/${id}`,
    );

    return response.data;
  } catch (error) {
    throw normalizeAxiosError(error);
  }
};