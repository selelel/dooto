import { useMutation, useQuery } from "@tanstack/react-query";
import { QueryKeys } from "@/constant/queryKeys";
import {
  createHabit,
  getHabits,
  toggleHabitContribution,
  getHabitContributions,
} from "@/modules/habit/actions";
import { POSTHabitRequest } from "./types";

export const useCreateHabit = () => {
  return useMutation({
    mutationKey: QueryKeys.HabitQueryKeys.parent("create-habit"),
    mutationFn: (payload: POSTHabitRequest) => createHabit(payload),
  });
};

export const useGetHabits = (categoryId?: string) => {
  return useQuery({
    queryKey: QueryKeys.HabitQueryKeys.parent("get-habits"),
    queryFn: () => getHabits(categoryId),
    enabled: true,
  });
};

export const useToggleHabitContribution = () => {
  return useMutation({
    mutationKey: QueryKeys.HabitQueryKeys.parent(
      "toggle-habit-contribution"
    ),
    mutationFn: (payload: {habitId: string
  date: string}) =>
      toggleHabitContribution(payload),
  });
};

export const useGetHabitContributions = (
  habitId: string,
  from?: string,
  to?: string
) => {
  return useQuery({
    queryKey: QueryKeys.HabitQueryKeys.parent([
      "get-habit-contributions",
      habitId,
      from,
      to,
    ]),
    queryFn: () =>
      getHabitContributions({ habitId, from, to }),
    enabled: Boolean(habitId),
  });
};
