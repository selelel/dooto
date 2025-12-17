import { TaskService } from '../services/task.services';
import { Request } from '../types/express';
import { logger } from '../utils/logger';

export const POSTtasks = async (req: Request, res: any) => {
  try {
    const payload = {
      ...req.body,
      userId: req.user?.id,
    }

    const tasks = await TaskService.createTasksCollection(payload);

    res.status(201).json(tasks);
  } catch (error) {
    logger.info(error);
    res.status(500).json({ message: "Failed to create tasks collection" });
  }
};

export const GETtasksCollections = async (req: Request, res: any) => {
  try {
    const { id } = req.query;
    
    if (id) {
      const collection = await TaskService.getTaskCollectionById(String(id));

      if (!collection) {
        return res.status(404).json({ message: "Tasks collection not found" });
      }

      return res.status(200).json(collection);
    }

    const collections = await TaskService.getTaskCollections(req.user?.id ?? "");

    return res.status(200).json(collections);
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch tasks collection",
    });
  }
};

export const DELETEtasksCollection = async (req: Request, res: any) => {
  try {
    const { id } = req.params;
    const collection = await TaskService.deleteTaskCollectionById(String(id));

    res.status(200).json(collection);
  } catch (error) {
    return res.status(500).json({
      message: "Failed to delete tasks collection",
    });
  }
};

export const DELETEallTasks = async (req: Request, res: any) => {
  try {
    const { id } = req.params;
    const collection = await TaskService.deleteAllTasks(String(id));

    res.status(200).json(collection);
  } catch (error) {
    logger.info("Error: ",error);
    return res.status(500).json({
      message: "Failed to delete all tasks collection",
    });
  }
};

export const UPDATEtasksCollection = async (req: Request, res: any) => {
  try {
    const { id } = req.params;
    
    const collection = await TaskService.updateTaskCollectionById(String(id), req.body);
    if (!collection) {
      return res.status(404).json({ message: "Tasks collection not found" });
    }

    res.status(200).json(collection);
  } catch (error) {
    return res.status(500).json({
      message: "Failed to update tasks collection",
    });
  }
};

