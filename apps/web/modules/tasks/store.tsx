import { create } from "zustand";
import { POSTTasksCollectionResponseT, Task } from "@/modules/tasks/types";

interface TasksState {
  tasksCollection: POSTTasksCollectionResponseT[]; // all collections
  setTasksCollection: (collections: POSTTasksCollectionResponseT[]) => void;
  addTaskCollection: (collection: POSTTasksCollectionResponseT) => void;
  updateTaskCollection: (
    updatedCollection: Partial<POSTTasksCollectionResponseT> & {
      tasksId: string;
    }
  ) => void;

  addTaskToCollection: (tasksId: string, task: Task) => void;
  updateTask: (task: Partial<Task> & { taskId: string }) => void;
  removeTask: (taskId: string) => void;

  removeTasksCollectionById: (tasksId: string) => void;
}

export const useTasksStore = create<
  TasksState & {
    getTaskCollectionById: (
      tasksId: string
    ) => POSTTasksCollectionResponseT | undefined;
    getTaskById: (taskId: string) => Task | undefined;
  }
>((set, get) => ({
  tasksCollection: [],

  setTasksCollection: (collections) => set({ tasksCollection: collections }),

  addTaskCollection: (collection) =>
    set((state) => ({
      tasksCollection: [...state.tasksCollection, collection],
    })),

  updateTaskCollection: (updatedCollection) =>
    set((state) => ({
      tasksCollection: state.tasksCollection.map((collection) =>
        collection.tasksId === updatedCollection.tasksId
          ? { ...collection, ...updatedCollection }
          : collection
      ),
    })),

  addTaskToCollection: (tasksId, task) =>
    set((state) => ({
      tasksCollection: state.tasksCollection.map((collection) =>
        collection.tasksId === tasksId
          ? { ...collection, tasks: [...collection.tasks, task] }
          : collection
      ),
    })),

  updateTask: (task) =>
    set((state) => ({
      tasksCollection: state.tasksCollection.map((collection) => ({
        ...collection,
        tasks: collection.tasks.map((t) =>
          t.taskId === task.taskId ? { ...t, ...task } : t
        ),
      })),
    })),

  removeTask: (taskId) =>
    set((state) => ({
      tasksCollection: state.tasksCollection.map((collection) => ({
        ...collection,
        tasks: collection.tasks.filter((t) => t.taskId !== taskId),
      })),
    })),

  removeTasksCollectionById: (tasksId) =>
    set((state) => ({
      tasksCollection: state.tasksCollection.filter(
        (collection) => collection.tasksId !== tasksId
      ),
    })),

  getTaskCollectionById: (tasksId) => {
    const { tasksCollection } = get();
    return tasksCollection.find((collection) => collection.tasksId === tasksId);
  },

  getTaskById: (taskId) => {
    const { tasksCollection } = get();
    for (const collection of tasksCollection) {
      const task = collection.tasks.find((t) => t.taskId === taskId);
      if (task) return task;
    }
    return undefined;
  },
}));
