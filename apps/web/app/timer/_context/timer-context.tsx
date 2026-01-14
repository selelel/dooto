"use client";

import React, { createContext, useContext, useEffect } from "react";
import {
  useCreateTimer,
  useDeleteTimer,
  useGetTimers,
  useRelapseTimer,
  useUpdateTimer,
} from "@/modules/timer/hooks";
import { useTimerStore } from "@/modules/timer/store";
import {
  POSTTimerRequest,
  POSTTimerResponse,
  UpdateTimerT,
} from "@/modules/timer/types";

interface TimerContextValue {
  data: POSTTimerResponse[];
  loading: boolean;
  handleCreateTimer: (data: POSTTimerRequest) => void;
  handleRelapseTimer: (id: string) => void;
  handleDeleteTimer: (id: string) => void;
  handleUpdateTimer: (data: UpdateTimerT) => void;
  isFetching: boolean;
  isCreating: boolean;
  isDeleting: boolean;
  isRelapsing: boolean;
}

const TimerContext = createContext<TimerContextValue | null>(null);

export function TimerProvider({ children }: { children: React.ReactNode }) {
  const {
    timers,
    setTimers,
    addTimer,
    removeTimer,
    getTimerById,
    updateTimer: updateTimerStore,
    relapseTimer: relapseTimerStore,
  } = useTimerStore();

  const { data: timerData, isFetching } = useGetTimers();
  const { mutate: createTimer, isPending: isCreating } = useCreateTimer();
  const { mutate: deleteTimer, isPending: isDeleting } = useDeleteTimer();
  const { mutate: updateTimer, isPending: isUpdating } = useUpdateTimer();
  const { mutate: relapseTimer, isPending: isRelapsing } = useRelapseTimer();

  useEffect(() => {
    if (timerData) {
      setTimers(timerData);
    }
  }, [timerData, setTimers]);

  const loading =
    isFetching || isCreating || isDeleting || isUpdating || isRelapsing;

  const handleCreateTimer = (data: POSTTimerRequest) => {
    createTimer(data, {
      onSuccess: (newTimer) => {
        addTimer(newTimer);
      },
    });
  };

  const handleDeleteTimer = (id: string) => {
    const prev = getTimerById(id);
    if (!prev) return;

    const prevSnapshot: POSTTimerResponse = structuredClone(prev);
    removeTimer(id);

    deleteTimer(id, {
      onError: () => {
        addTimer(prevSnapshot);
      },
    });
  };

  const handleUpdateTimer = (data: UpdateTimerT) => {
    const prev = getTimerById(data.id);
    if (!prev) return;

    const prevSnapshot: POSTTimerResponse = structuredClone(prev);
    updateTimerStore(data);

    updateTimer(data, {
      onError: () => {
        addTimer(prevSnapshot);
      },
    });
  };

  const handleRelapseTimer = (id: string) => {
    const prev = getTimerById(id);
    if (!prev) return;

    const prevSnapshot: POSTTimerResponse = structuredClone(prev);
    relapseTimerStore(id);

    relapseTimer(id, {
      onError: () => {
        updateTimerStore(prevSnapshot);
      },
    });
  };

  return (
    <TimerContext.Provider
      value={{
        data: timers,
        loading,
        handleCreateTimer,
        handleRelapseTimer,
        handleDeleteTimer,
        handleUpdateTimer,
        isCreating,
        isDeleting,
        isFetching,
        isRelapsing,
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
