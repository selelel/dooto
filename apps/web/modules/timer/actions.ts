import axios from "axios";
import { ENDPOINT } from "@/constant/http";
import { normalizeAxiosError } from "@/lib/utils";
import { POSTTimerRequest, POSTTimerResponse } from "./types";

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