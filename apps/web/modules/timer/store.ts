import { create } from "zustand";
import {
  POSTTimerResponse,
  UpdateTimerT,
} from "@/modules/timer/types";

interface TimerState {
  timers: POSTTimerResponse[];

  setTimers: (timers: POSTTimerResponse[]) => void;
  addTimer: (timer: POSTTimerResponse) => void;
  updateTimer: (data: UpdateTimerT) => void;
  removeTimer: (id: string) => void;
  relapseTimer: (id: string) => void;

  getTimerById: (id: string) => POSTTimerResponse | undefined;
}

export const useTimerStore = create<TimerState>((set, get) => ({
  timers: [],

  setTimers: (timers) => set({ timers }),

  addTimer: (timer) =>
    set((state) => ({
      timers: [...state.timers, timer],
    })),

  updateTimer: (data) =>
    set((state) => ({
      timers: state.timers.map((timer) =>
        timer.id === data.id ? { ...timer, ...data } : timer
      ),
    })),

  removeTimer: (id) =>
    set((state) => ({
      timers: state.timers.filter((timer) => timer.id !== id),
    })),

  relapseTimer: (id) =>
    set((state) => ({
      timers: state.timers.map((timer) =>
        timer.id === id
          ? {
              ...timer,
              relapsesCount: timer.relapsesCount + 1,
              lastRelapseAt: new Date().toISOString(),
            }
          : timer
      ),
    })),

  getTimerById: (id) => {
    return get().timers.find((timer) => timer.id === id);
  },
}));
