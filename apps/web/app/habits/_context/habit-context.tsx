"use client";
import { QueryKeys } from "@/constant/queryKeys";
import { useCreateHabit, useGetHabits } from "@/modules/habit/hooks";
import { POSTHabitRequest, POSTHabitResponse } from "@/modules/habit/types";
import { useQueryClient } from "@tanstack/react-query";
import React, { createContext, useContext, useState } from "react";
interface HabitContextValue {
  habitsData: POSTHabitResponse[] | undefined;
  handleCreateHabit: (d: POSTHabitRequest) => void;
}

const HabitContext = createContext<HabitContextValue | null>(null);

export function HabitProvider({ children }: { children: React.ReactNode }) {
  const queryClient = useQueryClient();
  const { data: habitsData } = useGetHabits();
  const { mutate: createHabit } = useCreateHabit();

  const handleCreateHabit = function (payload: POSTHabitRequest) {
    createHabit(payload, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: QueryKeys.HabitQueryKeys.parent(["get-habits"]),
        });
      },
    });
  };

  return (
    <HabitContext.Provider value={{ habitsData, handleCreateHabit }}>
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
