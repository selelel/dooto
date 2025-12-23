import { QueryKeys } from "@/constant/queryKeys";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createTasksCollection, getTasksCollection, patchTask } from "./actions";
import { POSTTasksCollectionRequestT, Task } from "./types";

export const useCreateTaskCollection = () => {
  return useMutation({
    mutationKey: QueryKeys.TasksQueryKeys.parent('create-task-collection'),
    mutationFn: (value: POSTTasksCollectionRequestT) => createTasksCollection(value),
  });
};

export const useGetTaskCollectionById = () => {
  return useMutation({
    mutationKey: QueryKeys.TasksQueryKeys.parent('get-task-collection-by-id'),
    mutationFn: (id?: string) => getTasksCollection(id),
  });
};

export const useGetTaskCollection = () => {
  return useQuery({
    queryKey: QueryKeys.TasksQueryKeys.parent('get-task-collection'),
    queryFn: () =>  getTasksCollection(),
  });
};

export const usePatchTask = () => {
   return useMutation({
    mutationKey: QueryKeys.TasksQueryKeys.item('patch-task-collection'),
    mutationFn: (payload: Partial<Task>) => patchTask(payload),
  });
};