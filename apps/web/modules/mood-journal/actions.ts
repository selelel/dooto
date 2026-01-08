import axios from "axios";
import { ENDPOINT } from "@/constant/http";
import { normalizeAxiosError } from "@/lib/utils";
import { logger } from "@/lib/logger";
import { PATCHMoodJournal, POSTMoodJournalRequest, POSTMoodJournalResponse } from "./types";

/* =========================
   Create Habit
========================= */

export const createMoodJournal = async (
  payload: POSTMoodJournalRequest
): Promise<POSTMoodJournalResponse> => {
  try {
    const response = await axios.post<POSTMoodJournalResponse>(
      ENDPOINT.MOOD.mood,
      payload
    );

    return response.data;
  } catch (error) {
    throw normalizeAxiosError(error);
  }
};

export const getMoodJournals = async (): Promise<POSTMoodJournalResponse[]> => {
  try {
    const response = await axios.get<POSTMoodJournalResponse[]>(
      ENDPOINT.MOOD.mood,
    );

    return response.data;
  } catch (error) {
    throw normalizeAxiosError(error);
  }
};

export const deleteMoodJournal = async (id: string): Promise<POSTMoodJournalResponse> => {
  try {
    const response = await axios.delete<POSTMoodJournalResponse>(
      `${ENDPOINT.MOOD.mood}/${id}`,
    );

    return response.data;
  } catch (error) {
    throw normalizeAxiosError(error);
  }
};

export const updateMoodJournal = async (data: PATCHMoodJournal ): Promise<POSTMoodJournalResponse> => {
  try {
    const {id, ...payload} = data
    const response = await axios.patch<POSTMoodJournalResponse>(
      `${ENDPOINT.MOOD.mood}/${id}`,
      payload
    );

    return response.data;
  } catch (error) {
    throw normalizeAxiosError(error);
  }
};

export const getMoodJournal = async (id: string): Promise<POSTMoodJournalResponse> => {
  try {
    const response = await axios.get<POSTMoodJournalResponse>(
      `${ENDPOINT.TIMER.timer}/${id}`,
    );

    return response.data;
  } catch (error) {
    throw normalizeAxiosError(error);
  }
};