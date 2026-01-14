import { create } from "zustand";
import { POSTHabitResponse, POSTHabitRequest } from "@/modules/habit/types";
import { normalizeDate } from "@/lib/utils";
import { isCompletedToday } from "@/app/habits/_utils";

interface HabitStore {
  habitsData: POSTHabitResponse[];
  totalHabits: number;
  completedTodayCount: number;
  completionPercent: number;
  today: string;
  isLoading: boolean;
  error?: unknown;
  setHabits: (habits: POSTHabitResponse[]) => void;
  addHabit: (habit: POSTHabitResponse) => void;
  updateHabit: (updatedHabit: Partial<POSTHabitResponse> & { id: string }) => void;
  deleteHabit: (id: string) => void;
  toggleHabitContribution: (habitId: string, date: string) => void;
  getHabitById: (id: string) => POSTHabitResponse | undefined;
}

export const useHabitStore = create<HabitStore>((set, get) => {
  const today = normalizeDate(new Date());
  function updateStats(habits: POSTHabitResponse[]) {
    const totalHabits = habits.length;
    const completedTodayCount = habits.filter(isCompletedToday).length;
    const completionPercent =
      totalHabits === 0 ? 0 : Math.round((completedTodayCount / totalHabits) * 100);

    set({ totalHabits, completedTodayCount, completionPercent });
  }

  return {
    habitsData: [],
    totalHabits: 0,
    completedTodayCount: 0,
    completionPercent: 0,
    today,
    isLoading: false,
    error: undefined,

    setHabits: (habits) => {
      set({ habitsData: habits });
      updateStats(habits);
    },

    addHabit: (habit) => {
      const current = get().habitsData;
      const updated = [...current, habit];
      set({ habitsData: updated });
      updateStats(updated);
    },

    updateHabit: (updatedHabit) => {
      const current = get().habitsData;
      const updated = current.map((h) =>
        h.id === updatedHabit.id ? { ...h, ...updatedHabit } : h
      );
      set({ habitsData: updated });
      updateStats(updated);
    },

    deleteHabit: (id) => {
      const current = get().habitsData;
      const updated = current.filter((h) => h.id !== id);
      set({ habitsData: updated });
      updateStats(updated);
    },

    toggleHabitContribution: (habitId, date) => {
  const { habitsData } = get();
  const updated = habitsData.map((habit) => {
    if (habit.id !== habitId) return habit;

    const existing = habit.contributions?.find((c) => c.date === date);
    let newContributions = habit.contributions ? [...habit.contributions] : [];

    if (existing) {
      newContributions = habit.contributions.map((c) =>
        c.date === date ? { ...c, completed: !c.completed } : c
      );
    } else {
      newContributions = [
        ...newContributions,
        {
          habitId,
          date,
          completed: true,
          createdAt: new Date().toISOString(),
        },
      ];
    }

    return { ...habit, contributions: newContributions };
  });

  set({ habitsData: updated });
  updateStats(updated);
},
    getHabitById: (id) => {
      const current = get().habitsData;
      return current.find((h) => h.id === id);
    },
  };
});
