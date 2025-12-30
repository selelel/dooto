import { TaskService } from '../services/task.services';
import { logger } from '../utils/logger';
import { Request } from '../types/express';

export const POSTtask = async (req: Request, res: any) => {
  try {
    const tasks = await TaskService.createTask(req.body);
    res.status(201).json(tasks);
  } catch (error) {
    logger.error("Error:", error);
    res.status(500).json({ message: "Failed to create task" });
  }
};

export const PATCHtask = async (req: Request, res: any) => {
  try {
    const tasks = await TaskService.updateTask(req.body);

    res.status(201).json(tasks);
  } catch (error) {
    logger.error("Error:", error);
    res.status(500).json({ message: "Failed to update tasks" });
  }
};

export const DELETEtask = async (req: Request, res: any) => {
  try {
    const { id } = req.query
    logger.info(id)
    const tasks = await TaskService.deleteTask(String(id));
    res.status(201).json(tasks);
  } catch (error) {
    logger.info("Error:", error);
    res.status(500).json({ message: "Failed to delete tasks" });
  }
};
