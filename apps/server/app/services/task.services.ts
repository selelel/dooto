
import { TasksCollection } from "@prisma/client";
import { POSTtasksT } from "../dtos/tasks.controller.dto";
import { prisma } from "../lib/prisma";
import { logger } from "../utils/logger";
import { Task } from "../generated/prisma/client";

async function createTasksCollection(data: POSTtasksT): Promise<TasksCollection> {
  const { userId, tasksName, details, due } = data;
  try {
    const tasks = await prisma.tasksCollection.create({
      data: {
        tasksName,
        details,
        due: due ?? new Date(),
        userId: userId,
      },
    });

    return tasks;
  } catch (error) {
    logger.error(error)
    throw error;
  }
}

async function getTaskCollections(userId: string): Promise<TasksCollection[]> {
  try {
    const tasks = await prisma.tasksCollection.findMany({
      where: {
        userId: userId,
      },
      include: {
        tasks: true,
      },
    });

    return tasks;
  } catch (error) {
    logger.info(error)
    console.log(error)
    throw error;
  }
}

async function getTaskCollectionById(id: string): Promise<TasksCollection | null> {
  try {
    const tasks = await prisma.tasksCollection.findUnique({
      where: {
        tasksId: id,
      },
      include: {
        tasks: true,
      },
    });

    return tasks;
  } catch (error) {
    logger.error(error)
    console.log(error)
    throw error;
  }
}

async function deleteTaskCollectionById(id: string): Promise<TasksCollection | null> {
  try {
    const tasks = await prisma.tasksCollection.delete({
      where: {
        tasksId: id,
      },
    });

    return tasks;
  } catch (error) {
    logger.error("Error deleting task collection:", error);
    throw error;
  }
}   

async function updateTaskCollectionById(id: string, data: Partial<TasksCollection>): Promise<TasksCollection | null> {
  try {
    const tasks = await prisma.tasksCollection.update({
      where: {
        tasksId: id,
      },
      data: data,
    });

    return tasks;
  } catch (error) {
    logger.error("Error updating task collection:", error);
    throw error;
  }
}


async function createTask(data: Task): Promise<Task> {
  try {
    const task = await prisma.task.create({
      data: {
        ...data,
        due: data.due ?? new Date(),
        subClassId: data.subClassId,
        },
    });

    return task;
  } catch (error) {
    throw error;
  }
}

async function getTaskById(id: string): Promise<Task | null> {  
  try {
    const task = await prisma.task.findUnique({
      where: {
        taskId: id,
      },
    });

    return task;
  } catch (error) {
    throw error;
  }
}

async function updateTask(data: Partial<Task> & { taskId: string }): Promise<Task> {
  try {

    const existingTask = await getTaskById(data.taskId)

    if (!existingTask) {
      logger.error(`Task with id ${data.taskId} not found`);
    }

    const task = await prisma.task.update({
      where: { taskId: data.taskId },
      data,
    });
    return task;
  } catch (error) {
    throw error;
  }
}

async function deleteTask(id: string): Promise<Task> {
  try {
    const existingTask = await getTaskById(id)

    if (!existingTask) {
      logger.error(`Task with id ${id} not found`);
    }
    const task = await prisma.task.delete({
      where: {
        taskId: id,
      },
    });

    return task;
  } catch (error) {
    logger.error(error)
    throw error;
  }
}

async function deleteAllTasks(tasksId: string): Promise<Task[] | null> {
  try {
    const tasks = await prisma.task.findMany({
      where: { tasksId },
    });

    if (tasks.length === 0) return null;

    await prisma.task.deleteMany({
      where: { tasksId },
    });

    return tasks;
  } catch (error) {
    logger.error(error);
    throw error;
  }
}



export const TaskService = {
  createTasksCollection,
  getTaskCollectionById,
  getTaskCollections,
  deleteTaskCollectionById,
  updateTaskCollectionById,


  createTask,
  getTaskById,
  updateTask,
  deleteTask,
  deleteAllTasks,
};