"use client";
import { QueryKeys } from "@/constant/queryKeys";
import { useCreateTimer, useGetTimers } from "@/modules/timer/hooks";
import { POSTTimerRequest, POSTTimerResponse } from "@/modules/timer/types";
import { useQueryClient } from "@tanstack/react-query";
import React, { createContext, useContext, useState } from "react";

interface TimerContextValue {
  data: POSTTimerResponse[];
  handleCreateTimer: (d: POSTTimerRequest) => void;
}

const TimerContext = createContext<TimerContextValue | null>(null);

export function TimerProvider({ children }: { children: React.ReactNode }) {
  const queryClient = useQueryClient();
  const { data: timerData } = useGetTimers();
  const { mutate: createTimer } = useCreateTimer();

  const handleCreateTimer = (data: POSTTimerRequest) => {
    createTimer(data, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: QueryKeys.TimerQueryKeys.parent("get-timers"),
        });
      },
    });
  };

  return (
    <TimerContext.Provider
      value={{
        data: timerData || [],
        handleCreateTimer,
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
