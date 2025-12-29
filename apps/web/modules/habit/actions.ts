import axios, { AxiosError } from "axios";
import { ENDPOINT } from "@/constant/http";
import {
  POSTHabitRequest,
  POSTHabitResponse,
} from "@/modules/habit/types";
import { normalizeAxiosError } from "@/lib/utils";

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


export const toggleHabitContribution = async (
  habitId: string
): Promise<POSTHabitResponse> => {
  try {
    const response = await axios.post<POSTHabitResponse>(
      ENDPOINT.HABIT.habit, {id: habitId}
    );

    return response.data;
  } catch (error) {
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
