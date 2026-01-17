import { Request, Response } from 'express';
import { UserService } from '../services/user.services';
import { Request as CustomRequest} from '../types/express';
import { logger } from '../utils/logger';

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await UserService.register(req.body);
    res.status(201).json({ user });
  } catch (error: any) {
    let message = "Internal Server Error";

    if (error instanceof Error) {
      message = error.message;
    }

    res.status(500).json({ message });
  }
};

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
    if (!!err) { return next(err); }
    res.status(200).json({status: 'success'});
  });
  res.status(200).json({status: 'success'});
}

export const profile = (req: Request, res: Response) => {
  res.status(200).json({ user: req.user })
}

export const CreateCategory = async (_req: Request, res: Response) => {
  try {
    const req = _req as CustomRequest;
    const payload = {
      ...req.body,
      userId: req.user?.id,
    }
    console.log(payload)
    const user = await UserService.createCategory(payload);

    res.status(201).json({ user });
  } catch (error: any) {
    const message = error?.message || "Internal Server Error";
    logger.error(`Error: ${message}`);
    res.status(500).json({ error: message });
  }
}

export const GetCategory = async (_req: Request, res: Response) => {
  try {
    const req = _req as CustomRequest;
    const categories = await UserService.getAllCategory(req.user?.id!);

    res.status(201).json({ categories });
  } catch (error: any) {
    const message = error?.message || "Internal Server Error";
    logger.error(`Error: ${message}`);
    res.status(500).json({ error: message });
  }
}