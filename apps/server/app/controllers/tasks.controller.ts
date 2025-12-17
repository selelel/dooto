import { TaskService } from '../services/task.services';
import { Request } from '../types/express';
import { logger } from '../utils/logger';

export const POSTtask = async (req: Request, res: any)=> {
      const tasks = TaskService.createTasksCollection({...req.body, userId: req.user?.id})
      logger.info(tasks)
      res.status(201).json({ helloWorld: "Hello World" });
  }

  