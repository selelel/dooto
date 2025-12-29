import { QueryKeys } from "@/constant/queryKeys";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createTask, createTasksCollection, deleteTask, deleteTasksCollection, getTasksCollection, patchTask, patchTasksCollection } from "./actions";
import { PATCHTasksCollectionRequestT, POSTTaskRequest, POSTTasksCollectionRequestT, Task } from "./types";

export const useCreateTaskCollection = () => {
  return useMutation({
    mutationKey: QueryKeys.TasksQueryKeys.parent('create-task-collection'),
    mutationFn: (value: POSTTasksCollectionRequestT) => createTasksCollection(value),
  });
};

export const usePatchTasksCollection = () => {
   return useMutation({
    mutationKey: QueryKeys.TasksQueryKeys.item('patch-task-collection'),
    mutationFn: (payload: Partial<PATCHTasksCollectionRequestT> & {tasksId: string}) => patchTasksCollection(payload),
  });
};

export const useCreateTask = () => {
  return useMutation({
    mutationKey: QueryKeys.TasksQueryKeys.parent('create-task'),
    mutationFn: (value: POSTTaskRequest) => createTask(value),
  });
};


export const useGetTaskCollectionById = (id: string | null) => {
  return useMutation({
    mutationKey: QueryKeys.TasksQueryKeys.parent(['get-task-collection-by-id', id]),
    mutationFn: (id: string) => getTasksCollection(id),
  });
};

export const useDeleteTaskCollectionById = () => {
  return useMutation({
    mutationKey: QueryKeys.TasksQueryKeys.parent(['delete-task-collection-by-id']),
    mutationFn: (id: string) => deleteTasksCollection(id),
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
    mutationKey: QueryKeys.TasksQueryKeys.item('patch-task'),
    mutationFn: (payload: Partial<Task>) => patchTask(payload),
  });
};

export const useDeleteTask = () => {
   return useMutation({
    mutationKey: QueryKeys.TasksQueryKeys.item('delete-task'),
    mutationFn: (id: string) => deleteTask(id),
  });
};