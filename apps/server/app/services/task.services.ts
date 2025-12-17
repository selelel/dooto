
import { CreateTasksCollectionT } from "../dtos/tasks.controller.dto";
import { prisma } from "../lib/prisma";

async function createTasksCollection(data: CreateTasksCollectionT): Promise<any> {
  const {userId,  tasksName, details, due} = data
  try {
    const tasks = await prisma.tasksCollection.create({
      data: {
        tasksName,
        details,
        due: due ?? new Date(),
        userId
      },
    });

    return tasks;
  } catch (error) {
    console.log(error)
  }
}

export const TaskService = {
  createTasksCollection
}