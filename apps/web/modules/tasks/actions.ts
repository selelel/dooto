import { ENDPOINT } from "@/constant/http";
import axios from "axios";
import { POSTTasksCollectionRequestT, Task } from "./types";
import { logger } from "@/lib/logger";

export const createTasksCollection = async (payload: POSTTasksCollectionRequestT) => {
  try {
    const endpoint = ENDPOINT.TASKS.tasks_collection;
    const response = await axios.post(endpoint, payload);

    return response;
  } catch (e:any) {
    throw e;
  }
};

export const getTasksCollection = async (id?: string) => {
  try {
    const endpoint = ENDPOINT.TASKS.tasks_collection;
    const response = await axios.get(endpoint, {params: id});

    return response;
  } catch (e:any) {
    logger.trace(e)
    throw e;
  }
};

export const patchTask = async (payload: Partial<Task>) => {
  try {
    logger.trace("patchTask");
    const endpoint = ENDPOINT.TASKS.task;
    const response = await axios.patch(endpoint, payload);

    return response;
  } catch (e: any) {
    logger.trace(e);
    throw e;
  }
};
