import { create } from "zustand";
import {
  PATCHMoodJournal,
  POSTMoodJournalResponse,
} from "@/modules/mood-journal/types";

interface MoodJournalState {
  journals: POSTMoodJournalResponse[];
  setJournals: (data: POSTMoodJournalResponse[]) => void;
  addJournal: (data: POSTMoodJournalResponse) => void;
  updateJournal: (data: PATCHMoodJournal) => void;
  removeJournal: (id: string) => void;
  getJournalById: (id: string) => POSTMoodJournalResponse | undefined;
  getJournalsByDate: (date: string) => POSTMoodJournalResponse[];
}

export const useMoodJournalStore = create<MoodJournalState>((set, get) => ({
  journals: [],

  setJournals: (data) => set({ journals: data }),

  addJournal: (data) =>
    set((state) => ({
      journals: [data, ...state.journals],
    })),

  updateJournal: (data) =>
    set((state) => ({
      journals: state.journals.map((journal) =>
        journal.id === data.id ? { ...journal, ...data } : journal
      ),
    })),

  removeJournal: (id) =>
    set((state) => ({
      journals: state.journals.filter((journal) => journal.id !== id),
    })),

  getJournalById: (id) =>
    get().journals.find((journal) => journal.id === id),

  getJournalsByDate: (date) =>
    get().journals.filter((journal) => journal.date === date),
}));
