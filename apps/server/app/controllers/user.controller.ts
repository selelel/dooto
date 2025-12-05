import { Request, Response } from 'express';
import { UserService } from '../services/user.services';
import { logger } from '../utils/logger';

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    logger.info(`User registering with data: ${JSON.stringify(req.body)}`);
    const user = await UserService.register(req.body);
    logger.info(`User registered: ${user.id}`);
    const token = UserService.generateToken(user);
    res.status(201).json({ user, token });
  } catch (error: any) {
    const message = error?.message || "Internal Server Error";
    logger.info(`Error: ${message}`);
    res.status(500).json({ error: message });
  }
}