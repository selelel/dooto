import { Request, Response } from 'express';
import { BadHabitTimerService } from '../services/badhabit.services';
import { logger } from '../utils/logger';
import { Request as CustomRequest } from '../types/express';

export const CreateBadHabitTimer = async (_req: Request, res: Response): Promise<void> => {
  try {
    const req = _req as CustomRequest;
    const payload = {
      ...req.body,
      userId: req.user!.id,
    };
    const badHabitTimer = await BadHabitTimerService.createBadHabitTimer(payload);
    res.status(201).json(badHabitTimer);
  } catch (error) {
    logger.error('Error creating bad habit timer:', error);
    res.status(500).json({ message: error instanceof Error ? error.message : 'Failed to create bad habit timer' });
  }
};

export const PatchBadHabitTimer = async (_req: Request, res: Response): Promise<void> => {
  try {
    const req = _req as CustomRequest;
    const { id } = req.params;
    const userId = req.user!.id;
    const body = req.body

    const updatedTimer = await BadHabitTimerService.updateBadHabitTimer(id!, userId, body);
    res.status(200).json(updatedTimer);
  } catch (error) {
    logger.error('Error recording relapse:', error);
    res.status(500).json({ message: error instanceof Error ? error.message : 'Failed to record relapse' });
  }
};

export const ToggleBadHabitTimerRelapse = async (_req: Request, res: Response): Promise<void> => {
  try {
    const req = _req as CustomRequest;
    const { id } = req.params;
    const userId = req.user!.id;

    const updatedTimer = await BadHabitTimerService.recordRelapse(id!, userId);
    res.status(200).json(updatedTimer);
  } catch (error) {
    logger.error('Error recording relapse:', error);
    res.status(500).json({ message: error instanceof Error ? error.message : 'Failed to record relapse' });
  }
};

export const GetAllBadHabitTimers = async (_req: Request, res: Response): Promise<void> => {
  try {
    const req = _req as CustomRequest;
    const userId = req.user!.id;

    const timers = await BadHabitTimerService.getAllBadHabitTimers(userId);
    res.status(200).json(timers);
  } catch (error) {
    logger.error('Error fetching bad habit timers:', error);
    res.status(500).json({ message: error instanceof Error ? error.message : 'Failed to fetch bad habit timers' });
  }
};

export const GetBadHabitTimerById = async (_req: Request, res: Response): Promise<void> => {
  try {
    const req = _req as CustomRequest;
    const { id } = req.params;
    const userId = req.user!.id;

    const timer = await BadHabitTimerService.getBadHabitTimerById(id!, userId);
    if (!timer) res.status(404).json({ message: 'Bad habit timer not found' });

    res.status(200).json(timer);
  } catch (error) {
    logger.error('Error fetching bad habit timer:', error);
    res.status(500).json({ message: error instanceof Error ? error.message : 'Failed to fetch bad habit timer' });
  }
};

export const DeleteBadHabitTimerById = async (_req: Request, res: Response): Promise<void> => {
  try {
    const req = _req as CustomRequest;
    const { id } = req.params;
    const userId = req.user!.id;

    await BadHabitTimerService.deleteBadHabitTimer(id!, userId);

    res.status(204).json({ message: 'Bad habit timer deleted successfully' });
  } catch (error) {
    logger.error('Error deleting bad habit timer:', error);
    res.status(500).json({ message: error instanceof Error ? error.message : 'Failed to delete bad habit timer' });
  }
};

