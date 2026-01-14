import { ENDPOINT } from "@/constant/http";
import axios from "axios";
import { PATCHTasksCollectionRequestT, POSTTaskRequest, POSTTasksCollectionRequestT, POSTTasksCollectionResponseT, Task } from "./types";
import { logger } from "@/lib/logger";

export const createTasksCollection = async (payload: POSTTasksCollectionRequestT): Promise<POSTTasksCollectionResponseT | undefined> => {
  try {
    const endpoint = ENDPOINT.TASKS.tasks_collection;
    const response = await axios.post(endpoint, payload);

    return response.data;
  } catch (e:any) {
    throw e;
  }
};

export const getTasksCollection = async (id?: string): Promise<POSTTasksCollectionResponseT[] | undefined> => {
  
  try {
    const endpoint = ENDPOINT.TASKS.tasks_collection;
    const params = id ? { id } : {};
    const response = await axios.get(endpoint, {params});
    return response.data;
  } catch (e:any) {
    logger.trace(e)
    throw e;
  }
};

export const deleteTasksCollection = async (id?: string) => {
  try {
    const endpoint = ENDPOINT.TASKS.tasks_collection;
    const params = id ? { id } : {};
    const response = await axios.delete(endpoint, {params});

    return response;
  } catch (e:any) {
    logger.trace(e)
    throw e;
  }
};

export const createTask= async (payload: POSTTaskRequest): Promise<Task > => {
  try {
    const endpoint = ENDPOINT.TASKS.task;
    const response = await axios.post(endpoint, payload);

    return response.data;
  } catch (e:any) {
    throw e;
  }
};

export const patchTasksCollection = async (payload: Partial<PATCHTasksCollectionRequestT> & {tasksId: string}): Promise<POSTTasksCollectionResponseT | undefined> => {
  try {
    const endpoint = ENDPOINT.TASKS.tasks_collection;
    const response = await axios.patch(endpoint, payload);

    return response.data;
  } catch (e: any) {
    logger.trace(e);
    throw e;
  }
};

export const patchTask = async (payload: Partial<Task>) => {
  try {
    const endpoint = ENDPOINT.TASKS.task;
    logger.trace("patchTask", payload);
    const response = await axios.patch(endpoint, payload);
    return response;
  } catch (e: any) {
    logger.trace(e);
    throw e;
  }
};

export const deleteTask = async (id: string) => {
  try {
    const endpoint = ENDPOINT.TASKS.task;
    const response = await axios.delete(endpoint, {params: {id}});

    return response;
  } catch (e: any) {
    logger.trace(e);
    throw e;
  }
};
