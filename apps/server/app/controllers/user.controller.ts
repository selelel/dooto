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
    logger.error(`Error: ${message}`);
    res.status(500).json({ error: message });
  }
}

export const update = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await UserService.register(req.body);
    logger.info(`User registered: ${user.id}`);
    const token = UserService.generateToken(user);
    res.status(201).json({ user, token });
  } catch (error: any) {
    const message = error?.message || "Internal Server Error";
    logger.error(`Error: ${message}`);
    res.status(500).json({ error: message });
  }
}

export const logout = (req: Request, res: Response, next: any) =>  {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
}

export const profile = (req: Request, res: Response) => {
  res.status(200).json({ user: req.user })
}