import { useMutation, useQuery } from "@tanstack/react-query";
import { QueryKeys } from "@/constant/queryKeys";
import { createTimer, getTimers } from "./actions";
import { POSTTimerRequest } from "./types";

export const useCreateTimer = () => {
  return useMutation({
    mutationKey: QueryKeys.HabitQueryKeys.parent("create-timer"),
    mutationFn: (payload: POSTTimerRequest) => createTimer(payload),
  });
};

export const useGetTimers = () => {
  return useQuery({
    queryKey: QueryKeys.TimerQueryKeys.parent("get-timers"),
    queryFn: () => getTimers()
  });
};