import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { useQueryClient } from "@tanstack/react-query";

import { QueryKeys } from "@/constant/queryKeys";
import { logger } from "@/lib/logger";
import {
  usePatchTasksCollection,
  usePatchTask,
  useDeleteTask,
  useGetTaskCollectionById,
  useCreateTask,
  useCreateTaskCollection,
  useDeleteTaskCollectionById,
} from "@/modules/tasks/hooks";
import {
  POSTTasksCollectionRequestT,
  POSTTasksCollectionResponseT,
  Task,
  TaskStatus,
} from "@/modules/tasks/types";
import { TaskCreateFormValues } from "../_component/task-create-dialog";
import { ROUTES_CLIENT } from "@/constant/http";
import { useRouter } from "next/navigation";

/* =======================
   Types
======================= */

interface TasksContextValue {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  taskCollectionData: POSTTasksCollectionResponseT;
  handleDeleteTaskCollection: (deleteTaskId: string) => void;
  handleCreateTaskCollection: (task: POSTTasksCollectionRequestT) => void;
  handleToggleStatus: (task: Task) => void;
  handleDeleteTask: (taskId: string) => void;
  handleCreateTask: (form: TaskCreateFormValues) => void;
  handlePatchTasks: (task: Partial<Task>) => void;
  patchTaskCollection: ReturnType<typeof usePatchTasksCollection>["mutate"];
  queryClient: ReturnType<typeof useQueryClient>;
  getTaskCollectionByIdError: any;
}

const TasksContext = createContext<TasksContextValue | null>(null);

/* =======================
   Provider
======================= */

interface TasksProviderProps {
  id: string | null;
  children: ReactNode;
}

export function TasksProvider({ id, children }: TasksProviderProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { mutate: createTaskCollection } = useCreateTaskCollection();
  const { mutate: patchTaskCollection } = usePatchTasksCollection();
  const { mutate: patchTask } = usePatchTask();
  const { mutate: deleteTask } = useDeleteTask();
  const {
    data,
    mutate: refetchTasks,
    error: getTaskCollectionByIdError,
  } = useGetTaskCollectionById(id);
  const { mutate: createTask } = useCreateTask();
  const { mutate: mutateDeleteCollection } = useDeleteTaskCollectionById();

  const [tasks, setTasks] = useState<Task[]>([]);

  /* =======================
     Effects
  ======================= */

  useEffect(() => {
    if (data?.data?.tasks) {
      setTasks(data.data.tasks);
    }
  }, [data]);

  useEffect(() => {
    if (id) {
      queryClient.invalidateQueries({
        queryKey: QueryKeys.TasksQueryKeys.parent("get-task-collection"),
      });
      refetchTasks(id);
    }
  }, [id, refetchTasks]);

  /* =======================
     Helpers
  ======================= */

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

  /* =======================
     Actions
  ======================= */

  const handleDeleteTaskCollection = (deleteTaskId: string) => {
    mutateDeleteCollection(deleteTaskId, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: QueryKeys.TasksQueryKeys.parent("get-task-collection"),
        });
        refetchTasks(deleteTaskId);
      },
    });
  };
  const handleCreateTaskCollection = (data: POSTTasksCollectionRequestT) => {
    createTaskCollection(data, {
      onSuccess: (d) => {
        queryClient.invalidateQueries({
          queryKey: QueryKeys.TasksQueryKeys.parent("get-task-collection"),
        });
        logger.trace("HandleCreateTaskCollection: ", d);
        router.push([ROUTES_CLIENT.PRIVATE.TASKS, d.data.tasksId].join("?id="));
      },
    });
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
      { taskId: task.taskId!, ...task },
      {
        onSuccess: () => {
          setTasks((prev) =>
            prev.map((t) => (t.taskId === task.taskId ? { ...t, ...task } : t))
          );
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
          queryClient.invalidateQueries({
            queryKey: QueryKeys.TasksQueryKeys.parent("get-task-collection"),
          });
          refetchTasks(id!);
        },
      }
    );
  };

  /* =======================
     Provider Value
  ======================= */

  return (
    <TasksContext.Provider
      value={{
        tasks,
        setTasks,
        taskCollectionData: data?.data,
        handleToggleStatus,
        handleDeleteTask,
        handleCreateTask,
        handlePatchTasks,
        patchTaskCollection,
        queryClient,
        handleCreateTaskCollection,
        handleDeleteTaskCollection,
        getTaskCollectionByIdError,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
}

/* =======================
   Consumer Hook
======================= */

export function useTasks() {
  const context = useContext(TasksContext);
  if (!context) {
    throw new Error("useTasks must be used within a TasksProvider");
  }
  return context;
}
