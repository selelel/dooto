import { Request, Response } from 'express';
import { Request as CustomRequest } from '../types/express';
import { MoodJournalService } from '../services/moodjournal.services';

export const CreateMoodJournal = async (_req: Request, res: Response): Promise<void> => {
  try {
    const req = _req as CustomRequest;
    const payload = {
      ...req.body,
      userId: req.user!.id,
    };

    const moodJournal = await MoodJournalService.createMoodJournal(payload);
    res.status(201).json(moodJournal);
  } catch (error) {
    res.status(500).json({ message: error instanceof Error ? error.message : 'Failed to create mood journal' });
  }
};

export const GetAllMoodJournals = async (_req: Request, res: Response): Promise<void> => {
  try {
    const req = _req as CustomRequest;
    const userId = req.user!.id;
    const { from, to } = req.query;
    const dateRange = { from: from as string, to: to as string };

    const journals = await MoodJournalService.getMoodJournalsByUser(userId, dateRange);
    
    res.status(200).json(journals);
  } catch (error) {
    res.status(500).json({ message: error instanceof Error ? error.message : 'Failed to fetch mood journals' });
  }
};

export const GetMoodJournal = async (_req: Request, res: Response): Promise<void> => {
  try {
    const req = _req as CustomRequest;
    const userId = req.user!.id;
    const { id } = req.params;

    let journals = await MoodJournalService.getMoodJournalById(id!, userId);

    res.status(200).json(journals);

  } catch (error) {
    res.status(500).json({
      message: error instanceof Error ? error.message : 'Failed to fetch mood journals',
    });
  }
};

export const UpdateMoodJournal = async (_req: Request, res: Response): Promise<void> => {
  try {
    const req = _req as CustomRequest;
    const { id } = req.params;
    const userId = req.user!.id;
    
    const moodjournal = await MoodJournalService.updateMoodJournal({
      id,
      userId,
      ...req.body
    });
    if (!moodjournal) res.status(404).json({ message: 'Mood journal not found' });

    res.status(200).json(moodjournal);
  } catch (error) {
    res.status(500).json({ message: error instanceof Error ? error.message : 'Failed to update mood journal' });
  }
};

export const DeleteMoodJournal = async (_req: Request, res: Response): Promise<void> => {
  try {
    const req = _req as CustomRequest;
    const { id } = req.params;
    const userId = req.user!.id;

    await MoodJournalService.deleteMoodJournal(id!, userId);

    res.status(204).json({ message: 'Mood journal deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error instanceof Error ? error.message : 'Failed to delete mood journal' });
  }
};