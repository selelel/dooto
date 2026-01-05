import axios, { AxiosError } from "axios";
import { ENDPOINT } from "@/constant/http";
import {
  POSTHabitRequest,
  POSTHabitResponse,
} from "@/modules/habit/types";
import { normalizeAxiosError } from "@/lib/utils";
import { logger } from "@/lib/logger";

/* =========================
   Create Habit
========================= */

export const createHabit = async (
  payload: POSTHabitRequest
): Promise<POSTHabitResponse> => {
  try {
    const response = await axios.post<POSTHabitResponse>(
      ENDPOINT.HABIT.habit,
      payload
    );

    return response.data;
  } catch (error) {
    throw normalizeAxiosError(error);
  }
};

export const getHabits = async (categoryId?: string): Promise<POSTHabitResponse[]> => {
  try {
    const response = await axios.get<POSTHabitResponse[]>(
      ENDPOINT.HABIT.habit,
      {
        params: {categoryId},
      }
    );

    return response.data;
  } catch (error) {
    throw normalizeAxiosError(error);
  }
};


export const toggleHabitContribution = async ({habitId, date}: {habitId: string
  date: string}): Promise<POSTHabitResponse> => {
  try {
    const response = await axios.post<POSTHabitResponse>(
      ENDPOINT.HABIT.contribution, undefined, {params: {habitId, date}}
    );

    return response.data;
  } catch (error) {
    logger.trace(error)
    throw normalizeAxiosError(error);
  }
};

export const getHabitContributions = async (params: {
  habitId: string;
  from?: string;
  to?: string;
}): Promise<POSTHabitResponse> => {
  try {
    const { habitId, from, to } = params;

    const queryParams: Record<string, string> = {};
    queryParams.id = habitId
    if (from) queryParams.from = from;
    if (to) queryParams.to = to;

    const response = await axios.get<POSTHabitResponse>(
      ENDPOINT.HABIT.habit,
      {
        params: queryParams,
      }
    );

    return response.data;
  } catch (error) {
    throw normalizeAxiosError(error);
  }
};

export const deleteHabit = async (id:string): Promise<POSTHabitResponse> => {
  try {

    const params: Record<string, string> = {};
    params.id = id

    const response = await axios.delete<POSTHabitResponse>(
      ENDPOINT.HABIT.habit,
      {
        params,
      }
    );

    return response.data;
  } catch (error) {
    logger.trace(normalizeAxiosError(error))
    throw normalizeAxiosError(error);
  }
};

export const updateHabit = async (data: Partial<POSTHabitRequest> & {habitId: string}): Promise<POSTHabitResponse> => {
  try {
    const response = await axios.patch<POSTHabitResponse>(
      ENDPOINT.HABIT.habit,
      data
    );

    return response.data;
  } catch (error) {
    logger.trace(normalizeAxiosError(error))
    throw normalizeAxiosError(error);
  }
};
