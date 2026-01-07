"use client";
import { QueryKeys } from "@/constant/queryKeys";
import {
  useCreateTimer,
  useDeleteTimer,
  useGetTimers,
  useRelapseTimer,
  useUpdateTimer,
} from "@/modules/timer/hooks";
import {
  POSTTimerRequest,
  POSTTimerResponse,
  UpdateTimerT,
} from "@/modules/timer/types";
import { useQueryClient } from "@tanstack/react-query";
import React, { createContext, useContext, useState } from "react";

interface TimerContextValue {
  data: POSTTimerResponse[];
  handleCreateTimer: (d: POSTTimerRequest) => void;
  handleRelapseTimer: (d: string) => void;
  handleDeleteTimer: (d: string) => void;
  handleUpdateTimer: (d: UpdateTimerT) => void;
}

const TimerContext = createContext<TimerContextValue | null>(null);

export function TimerProvider({ children }: { children: React.ReactNode }) {
  const queryClient = useQueryClient();
  const { data: timerData } = useGetTimers();
  const { mutate: relpaseTimer } = useRelapseTimer();
  const { mutate: deleteTimer } = useDeleteTimer();
  const { mutate: updateTimer } = useUpdateTimer();
  const { mutate: createTimer } = useCreateTimer();

  const onSuccessRefetch = {
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QueryKeys.TimerQueryKeys.parent("get-timers"),
      });
    },
  };

  const handleCreateTimer = (data: POSTTimerRequest) => {
    createTimer(data, onSuccessRefetch);
  };

  const handleDeleteTimer = (id: string) => {
    deleteTimer(id, onSuccessRefetch);
  };

  const handleUpdateTimer = (data: UpdateTimerT) => {
    updateTimer(data, onSuccessRefetch);
  };

  const handleRelapseTimer = (id: string) => {
    relpaseTimer(id, onSuccessRefetch);
  };

  return (
    <TimerContext.Provider
      value={{
        data: timerData || [],
        handleCreateTimer,
        handleRelapseTimer,
        handleDeleteTimer,
        handleUpdateTimer,
      }}
    >
      {children}
    </TimerContext.Provider>
  );
}

export function useTimer() {
  const context = useContext(TimerContext);
  if (!context) {
    throw new Error("useTimer must be used within a TimerProvider");
  }
  return context;
}
