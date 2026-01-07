import { useMutation, useQuery } from "@tanstack/react-query";
import { QueryKeys } from "@/constant/queryKeys";
import { createTimer, deleteTimer, getTimer, getTimers, relapse, updateTimer } from "./actions";
import { POSTTimerRequest, UpdateTimerT } from "./types";

export const useCreateTimer = () => {
  return useMutation({
    mutationKey: QueryKeys.TimerQueryKeys.parent("create-timer"),
    mutationFn: (payload: POSTTimerRequest) => createTimer(payload),
  });
};

export const useGetTimers = () => {
  return useQuery({
    queryKey: QueryKeys.TimerQueryKeys.parent("get-timers"),
    queryFn: () => getTimers()
  });
};

export const useDeleteTimer = () => {
  return useMutation({
    mutationKey: QueryKeys.TimerQueryKeys.parent("delete-timer"),
    mutationFn: (id: string) => deleteTimer(id),
  });
};

export const useUpdateTimer = () => {
  return useMutation({
    mutationKey: QueryKeys.TimerQueryKeys.parent("patch-timer"),
    mutationFn: (data: UpdateTimerT) => updateTimer(data),
  });
};

export const useGetTimer = (id: string) => {
  return useQuery({
    queryKey: QueryKeys.TimerQueryKeys.parent("get-timer"),
    queryFn: () => getTimer(id)
  });
};

export const useRelapseTimer = () => {
  return useMutation({
    mutationKey: QueryKeys.TimerQueryKeys.parent("relapse-timer"),
    mutationFn: (id:string) => relapse(id),
  });
};