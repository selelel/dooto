import { HabitService } from '../services/habit.services';
import { Request } from '../types/express';
import { logger } from '../utils/logger';

export const POSThabit = async (req: Request, res: any) => {
  try {
    const payload = {
      ...req.body,
      userId: req.user?.id,
    }
    const habit = await HabitService.createHabit(payload);
    res.status(201).json(habit);
  } catch (error) {
    logger.error("Error:", error);
    res.status(500).json({ message: error instanceof Error ? error.message : "Failed to create habit" });
  }
};

export const GEThabit = async (req: Request, res: any) => {
  try {
    const { id } = req.params;
    const habit = await HabitService.getHabitById(id!);
    if (!habit) {
      return res.status(404).json({ message: "Habit not found" });
    }
    res.status(200).json(habit);
  } catch (error) {
    logger.error("Error:", error);
    res.status(500).json({ message: "Failed to get habit" });
  }
};

export const GEThabits = async (req: Request, res: any) => {
  try {
    const {from, to, categoryId} = req.query;
    const dateRange = !!from || !!to ? {from: from as string, to: to as string} : undefined;
    const _categoryId = categoryId ? categoryId as string : undefined;
    const habit = await HabitService.getHabits(req.user?.id!, dateRange, _categoryId);
    if (!habit) {
      return res.status(404).json({ message: "Habit not found" });
    }
    res.status(200).json(habit);
  } catch (error) {
    logger.error("Error:", error);
    res.status(500).json({ message: "Failed to get habit" });
  }
};


export const ToggleContribution = async (req: Request, res: any) => {
  try {
    const { id } = req.params;
    const date = req.query.date as string;
    const payload = {
      habitId: id!,
      date: date,
      completed: req.body.completed ?? true,
    }
    const habit = await HabitService.addContribution(payload);
    res.status(201).json(habit);
  } catch (error) {
    logger.error("Error:", error);
    res.status(500).json({ message: "Failed to create habit" });
  }
};