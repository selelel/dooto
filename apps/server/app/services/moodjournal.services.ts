import { POSTCreateMoodJournalT } from '../dtos/moodjournal.controller.dto';
import { MoodJournal } from '../generated/prisma/client';
import { prisma } from '../lib/prisma';  // adjust import path as needed

async function createMoodJournal(data: POSTCreateMoodJournalT & { userId: string } ): Promise<MoodJournal> {
    const { userId, note, mood, date } = data;
    const normalizedDate = new Date(date);
normalizedDate.setHours(0, 0, 0, 0);


  return prisma.moodJournal.create({
      data: {
        userId,
        note,
        mood,
        date: normalizedDate,
      },
    });
  }

async function getMoodJournalsByUser(
  userId: string,
  dateRange?: { from?: string; to?: string }
) {
  const dateFilter: { gte?: Date; lte?: Date } = {};

  if (dateRange?.from) {
    const fromDate = new Date(dateRange.from);
    if (!isNaN(fromDate.getTime())) {
      dateFilter.gte = fromDate;
    }
  }

  if (dateRange?.to) {
    const toDate = new Date(dateRange.to);
    if (!isNaN(toDate.getTime())) {
      dateFilter.lte = toDate;
    }
  }

  const whereCondition: any = { userId };

  if (Object.keys(dateFilter).length > 0) {
    whereCondition.date = dateFilter;
  }

  return prisma.moodJournal.findMany({
    where: whereCondition,
    orderBy: { date: 'desc' },
  });
}
async function getMoodJournalById(id: string, userId: string) {
    return prisma.moodJournal.findFirst({
      where: {
        id,
        userId,
      },
    });
  }

async function updateMoodJournal({
  id,
  userId,
  note,
  mood,
}: Partial<POSTCreateMoodJournalT> & {
  id: string;
  userId: string;
}) {
  const data: Record<string, unknown> = {};

  if (note !== undefined) data.note = note;
  if (mood !== undefined) data.mood = mood;

  return prisma.moodJournal.update({
    where: {
      id,
      userId,
    },
    data,
  });
}

async function deleteMoodJournal(id: string, userId: string) {
    return prisma.moodJournal.deleteMany({
      where: {
        id,
        userId,
      },
    });
  }


export const MoodJournalService = {
  createMoodJournal,
  getMoodJournalsByUser,
  getMoodJournalById,
  updateMoodJournal,
  deleteMoodJournal,
};