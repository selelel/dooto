"use client";
import { QueryKeys } from "@/constant/queryKeys";
import { normalizeDate } from "@/lib/utils";
import {
  useCreateHabit,
  useDeleteHabit,
  useGetHabits,
  useToggleHabitContribution,
  useUpdateHabit,
} from "@/modules/habit/hooks";
import { POSTHabitRequest, POSTHabitResponse } from "@/modules/habit/types";
import { useQueryClient } from "@tanstack/react-query";
import React, { createContext, useContext, useEffect, useState } from "react";
import { isCompletedToday } from "../_utils";
import { useHabitStore } from "@/modules/habit/store";
interface HabitContextValue {
  habitsData: POSTHabitResponse[] | undefined;
  handleCreateHabit: (d: POSTHabitRequest) => void;
  handleToggleHabit: (d: { habitId: string; date: string }) => void;
  totalHabits: number;
  completedTodayCount: number;
  completionPercent: number;
  today: string;
  handleDelete: (d: string) => void;
  handleUpdate: (d: Partial<POSTHabitRequest> & { habitId: string }) => void;
  getHabitById: (id: string) => POSTHabitResponse | undefined;
  isHabitsFetching: boolean;
  isCreatingHabit: boolean;
  isTogglingHabit: boolean;
  isDeletingHabit: boolean;
  isUpdatingHabit: boolean;
}

const HabitContext = createContext<HabitContextValue | null>(null);

export function HabitProvider({ children }: { children: React.ReactNode }) {
  const {
    setHabits,
    habitsData,
    toggleHabitContribution,
    getHabitById,
    updateHabit,
    deleteHabit,
    addHabit,
  } = useHabitStore();
  const { data: hbitsDt, isFetching: isHabitsFetching } = useGetHabits();
  const { mutate: createHabit, isPending: isCreatingHabit } = useCreateHabit();
  const { mutate: toggleHabit, isPending: isTogglingHabit } =
    useToggleHabitContribution();
  const { mutate: dltHbt, isPending: isDeletingHabit } = useDeleteHabit();
  const { mutate: updtHbt, isPending: isUpdatingHabit } = useUpdateHabit();
  const today = normalizeDate(new Date());

  useEffect(() => {
    if (hbitsDt) {
      setHabits(hbitsDt);
    }
  }, [hbitsDt, setHabits]);

  const totalHabits = habitsData?.length ?? 0;

  const completedTodayCount = habitsData?.filter(isCompletedToday).length ?? 0;

  const completionPercent =
    totalHabits === 0
      ? 0
      : Math.round((completedTodayCount / totalHabits) * 100);

  const handleToggleHabit = function ({
    habitId,
    date,
  }: {
    habitId: string;
    date: string;
  }) {
    const prev = getHabitById(habitId);
    if (!prev) return;

    const prevSnapshot: POSTHabitResponse = structuredClone(prev);
    toggleHabitContribution(habitId, date);
    toggleHabit(
      {
        habitId,
        date,
      },
      {
        onError: () => {
          updateHabit(prevSnapshot);
        },
      }
    );
  };

  const handleUpdate = function (
    body: Partial<POSTHabitRequest> & { habitId: string }
  ) {
    const prev = getHabitById(body.habitId);
    if (!prev) return;

    const prevSnapshot: POSTHabitResponse = structuredClone(prev);
    updateHabit({ id: body.habitId, ...body });
    updtHbt(body, {
      onError: () => {
        updateHabit(prevSnapshot);
      },
    });
  };

  const handleDelete = function (id: string) {
    const prev = getHabitById(id);
    if (!prev) return;

    const prevSnapshot: POSTHabitResponse = structuredClone(prev);
    deleteHabit(id);
    dltHbt(id, {
      onError: () => {
        addHabit(prevSnapshot);
      },
    });
  };

  const handleCreateHabit = function (payload: POSTHabitRequest) {
    createHabit(payload, {
      onSuccess: (d) => {
        addHabit(d);
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
        today,
        handleDelete,
        handleUpdate,
        getHabitById,
        isHabitsFetching,
        isCreatingHabit,
        isTogglingHabit,
        isDeletingHabit,
        isUpdatingHabit,
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
