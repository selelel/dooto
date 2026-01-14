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
  useCreateTask,
  useCreateTaskCollection,
  useDeleteTaskCollectionById,
  useGetTaskCollection,
} from "@/modules/tasks/hooks";
import {
  PATCHTasksCollectionRequestT,
  POSTTasksCollectionRequestT,
  POSTTasksCollectionResponseT,
  Task,
  TaskStatus,
} from "@/modules/tasks/types";
import { TaskCreateFormValues } from "../_component/task-create-dialog";
import { ROUTES_CLIENT } from "@/constant/http";
import { useRouter } from "next/navigation";
import { useTasksStore } from "@/modules/tasks/store";

interface TasksContextValue {
  tasksCollection: POSTTasksCollectionResponseT[];
  handleDeleteTaskCollection: (deleteTaskId: string) => void;
  handleCreateTaskCollection: (task: POSTTasksCollectionRequestT) => void;
  handleToggleStatus: (task: Task) => void;
  handleDeleteTask: (taskId: string) => void;
  handleCreateTask: (form: TaskCreateFormValues & { id: string }) => void;
  handlePatchTasks: (task: Partial<Task> & { taskId: string }) => void;
  handlePatchTaskCollection: (
    task: Partial<PATCHTasksCollectionRequestT> & { tasksId: string }
  ) => void;
  queryClient: ReturnType<typeof useQueryClient>;
  getTaskCollectionById: (
    tasksId: string
  ) => POSTTasksCollectionResponseT | undefined;
  getTaskById: (taskId: string) => Task | undefined;
  isCreatingTaskCollectionLoading: boolean;
  isPatchingTaskCollectionLoading: boolean;
  isCreatingTaskLoading: boolean;
  isPatchingTaskLoading: boolean;
  isDeletingTaskLoading: boolean;
  isDeletingTaskCollectionLoading: boolean;
  isTaskCollectionLoading: boolean;
}

const TasksContext = createContext<TasksContextValue | null>(null);

interface TasksProviderProps {
  children: ReactNode;
}

export function TasksProvider({ children }: TasksProviderProps) {
  const {
    tasksCollection,
    setTasksCollection,
    getTaskCollectionById,
    getTaskById,
    addTaskCollection,
    removeTasksCollectionById,
    updateTaskCollection,
    addTaskToCollection,
    removeTask,
    updateTask,
  } = useTasksStore();
  const router = useRouter();
  const queryClient = useQueryClient();
  const {
    mutate: createTaskCollection,
    isPending: isCreatingTaskCollectionLoading,
  } = useCreateTaskCollection();
  const {
    mutate: patchTaskCollection,
    isPending: isPatchingTaskCollectionLoading,
  } = usePatchTasksCollection();
  const { mutate: patchTask, isPending: isPatchingTaskLoading } =
    usePatchTask();
  const { mutate: deleteTask, isPending: isDeletingTaskLoading } =
    useDeleteTask();
  const { data: taskCollectionData, isLoading: isTaskCollectionLoading } =
    useGetTaskCollection();
  const { mutate: createTask, isPending: isCreatingTaskLoading } =
    useCreateTask();
  const {
    mutate: deleteTaskCollection,
    isPending: isDeletingTaskCollectionLoading,
  } = useDeleteTaskCollectionById();

  useEffect(() => {
    if (!!taskCollectionData) {
      setTasksCollection(taskCollectionData);
    }
  }, [taskCollectionData]);

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

  const handleDeleteTaskCollection = (deleteTaskId: string) => {
    const prev = getTaskCollectionById(deleteTaskId);

    if (!prev) return;
    const prevSnapshot: POSTTasksCollectionResponseT = structuredClone(prev);

    removeTasksCollectionById(deleteTaskId);
    deleteTaskCollection(deleteTaskId, {
      onError: () => {
        addTaskCollection(prevSnapshot);
      },
    });
  };
  const handleCreateTaskCollection = (data: POSTTasksCollectionRequestT) => {
    createTaskCollection(data, {
      onSuccess: (d) => {
        addTaskCollection(d!);
      },
    });
  };

  const handleToggleStatus = (task: Task) => {
    const nextStatus = getNextStatus(task.status);
    updateTask({ taskId: task.taskId, status: nextStatus });
    patchTask({ taskId: task.taskId, status: nextStatus });
  };

  const handlePatchTasks = (task: Partial<Task> & { taskId: string }) => {
    const prev = getTaskById(task.taskId);

    if (!prev) return;
    const prevSnapshot: Task = structuredClone(prev);

    patchTask(task, {
      onError: () => {
        updateTask(prevSnapshot);
      },
    });
  };

  const handleDeleteTask = (taskId: string) => {
    removeTask(taskId);
    deleteTask(taskId);
  };

  const handleCreateTask = (form: TaskCreateFormValues & { id: string }) => {
    createTask(
      {
        tasksId: form.id,
        status: TaskStatus.PENDING,
        taskName: form.taskName,
        due: form.due?.toISOString(),
        details: form.details ?? "",
      },
      {
        onSuccess: (d) => {
          addTaskToCollection(form.id, d!);
        },
      }
    );
  };

  const handlePatchTaskCollection = (
    d: Partial<PATCHTasksCollectionRequestT> & { tasksId: string }
  ) => {
    const prev = getTaskCollectionById(d.tasksId);

    if (!prev) return;
    const prevSnapshot: PATCHTasksCollectionRequestT = structuredClone(prev);
    updateTaskCollection(d);

    patchTaskCollection(d, {
      onError: () => {
        updateTaskCollection(prevSnapshot);
      },
    });
  };

  return (
    <TasksContext.Provider
      value={{
        tasksCollection,
        handleToggleStatus,
        handleDeleteTask,
        handleCreateTask,
        handlePatchTasks,
        handlePatchTaskCollection,
        queryClient,
        handleCreateTaskCollection,
        handleDeleteTaskCollection,
        getTaskCollectionById,
        getTaskById,
        isCreatingTaskCollectionLoading,
        isPatchingTaskCollectionLoading,
        isCreatingTaskLoading,
        isPatchingTaskLoading,
        isDeletingTaskLoading,
        isDeletingTaskCollectionLoading,
        isTaskCollectionLoading,
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
