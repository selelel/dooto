import { QueryKeys } from "@/constant/queryKeys";
import { logger } from "@/lib/logger";
import {
  usePatchTasksCollection,
  usePatchTask,
  useDeleteTask,
  useGetTaskCollectionById,
  useCreateTask,
} from "@/modules/tasks/hooks";
import { Task, TaskStatus } from "@/modules/tasks/types";
import { useQueryClient } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { TaskCreateFormValues } from "../_component/task-create-dialog";

export default function useTasksList(id: string | null) {
  const queryClient = useQueryClient();
  const { mutate: patchTaskCollection } = usePatchTasksCollection();
  const { mutate: patchTask } = usePatchTask();
  const { mutate: deleteTask } = useDeleteTask();
  const { data, mutate: refetchTasks } = useGetTaskCollectionById(id);
  const { mutate: createTask } = useCreateTask();

  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    if (data?.data?.tasks) {
      setTasks(data.data.tasks);
    }
  }, [data]);

  useEffect(() => {
    if (id) {
      refetchTasks(id);
    }
  }, [id, refetchTasks]);

  const getNextStatus = (status: TaskStatus): TaskStatus => {
    switch (status) {
      case TaskStatus.PENDING:
        return TaskStatus.IN_PROGRESS;
      case TaskStatus.IN_PROGRESS:
        return TaskStatus.DONE;
      case TaskStatus.DONE:
        return TaskStatus.PENDING;
      default:
        return TaskStatus.PENDING;
    }
  };

  const handleToggleStatus = (task: Task) => {
    const nextStatus = getNextStatus(task.status);

    setTasks((prev) =>
      prev.map((t) =>
        t.taskId === task.taskId ? { ...t, status: nextStatus } : t
      )
    );

    patchTask(
      { taskId: task.taskId, status: nextStatus },
      {
        onSuccess: () => {
          if (
            nextStatus === TaskStatus.PENDING ||
            nextStatus === TaskStatus.DONE
          ) {
            queryClient.invalidateQueries({
              queryKey: QueryKeys.TasksQueryKeys.parent("get-task-collection"),
            });
          }
        },
        onError: (err) => {
          logger.error(err);
          queryClient.invalidateQueries({
            queryKey: QueryKeys.TasksQueryKeys.parent(
              "get-task-collection-by-id"
            ),
          });
        },
      }
    );
  };

  const handlePatchTasks = (task: Partial<Task>) => {
    patchTask(
      { taskId: task.taskId, ...task },
      {
        onSuccess: () => {
          refetchTasks(task.tasksId!);
          queryClient.invalidateQueries({
            queryKey: QueryKeys.TasksQueryKeys.parent([
              "get-task-collection-by-id",
              task.tasksId,
            ]),
          });
        },
        onError: (err) => {
          logger.error(err);
          queryClient.invalidateQueries({
            queryKey: QueryKeys.TasksQueryKeys.parent(
              "get-task-collection-by-id"
            ),
          });
        },
      }
    );
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks((prev) => prev.filter((t) => t.taskId !== taskId));

    deleteTask(taskId, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: QueryKeys.TasksQueryKeys.parent("get-task-collection"),
        });
      },
    });
  };

  const handleCreateTask = (form: TaskCreateFormValues) => {
    createTask(
      {
        tasksId: id || "",
        status: TaskStatus.PENDING,
        taskName: form.taskName,
        due: form.due?.toISOString(),
        details: form.details ?? "",
      },
      {
        onSuccess: () => {
          refetchTasks(id!);
        },
      }
    );
  };

  return {
    setTasks,
    tasks,
    taskCollectionData: data?.data,
    handleToggleStatus,
    handleDeleteTask,
    handleCreateTask,
    patchTaskCollection,
    handlePatchTasks,
    queryClient,
  };
}
