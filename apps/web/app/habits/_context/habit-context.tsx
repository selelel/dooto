"use client";
import { QueryKeys } from "@/constant/queryKeys";
import { normalizeDate } from "@/lib/utils";
import {
  useCreateHabit,
  useGetHabits,
  useToggleHabitContribution,
} from "@/modules/habit/hooks";
import { POSTHabitRequest, POSTHabitResponse } from "@/modules/habit/types";
import { useQueryClient } from "@tanstack/react-query";
import React, { createContext, useContext, useState } from "react";
interface HabitContextValue {
  habitsData: POSTHabitResponse[] | undefined;
  handleCreateHabit: (d: POSTHabitRequest) => void;
  handleToggleHabit: (d: { habitId: string; date: string }) => void;
  totalHabits: number;
  completedTodayCount: number;
  completionPercent: number;
}

const HabitContext = createContext<HabitContextValue | null>(null);

export function HabitProvider({ children }: { children: React.ReactNode }) {
  const queryClient = useQueryClient();
  const { data: habitsData } = useGetHabits();
  const { mutate: createHabit } = useCreateHabit();
  const { mutate: toggleHabit } = useToggleHabitContribution();
  const today = normalizeDate(new Date());

  const totalHabits = habitsData?.length ?? 0;

  const isCompletedToday = (habit: any) =>
    habit.contributions.some(
      (c: any) => normalizeDate(c.date) === today && c.completed
    );

  const completedTodayCount = habitsData?.filter(isCompletedToday).length ?? 0;

  const completionPercent =
    totalHabits === 0
      ? 0
      : Math.round((completedTodayCount / totalHabits) * 100);

  const handleToggleHabit = function (payload: {
    habitId: string;
    date: string;
  }) {
    toggleHabit(payload, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: QueryKeys.HabitQueryKeys.parent("get-habits"),
        });
      },
    });
  };

  const handleCreateHabit = function (payload: POSTHabitRequest) {
    createHabit(payload, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: QueryKeys.HabitQueryKeys.parent("get-habits"),
        });
      },
    });
  };

  return (
    <HabitContext.Provider
      value={{
        habitsData,
        handleCreateHabit,
        handleToggleHabit,
        totalHabits,
        completedTodayCount,
        completionPercent,
      }}
    >
      {children}
    </HabitContext.Provider>
  );
}

export function useHabits() {
  const context = useContext(HabitContext);
  if (!context) {
    throw new Error("useHabits must be used within a HabitProvider");
  }
  return context;
}
