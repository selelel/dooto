import { BadHabitTimer } from '../generated/prisma/client';
import { prisma } from '../lib/prisma';  // adjust import path as needed

interface CreateBadHabitTimerInput {
  userId: string;
  habitName: string;
  details?: string | null;
}

async function createBadHabitTimer(data: CreateBadHabitTimerInput & {userId: string;}): Promise<BadHabitTimer> {
  const { userId, habitName, details } = data;

  return prisma.badHabitTimer.create({
    data: {
      userId,
      habitName,
      details: details ?? null,
      longestStreakSeconds: 0,
      relapsesCount: 0,
    },
  });
}

async function getBadHabitTimerById(id: string, userId: string): Promise<BadHabitTimer | null> {
  return prisma.badHabitTimer.findFirst({
    where: { id, userId },
  });
}

async function getAllBadHabitTimers(userId: string): Promise<(BadHabitTimer)[]> {
  const timers = await prisma.badHabitTimer.findMany({
    where: { userId },
    orderBy: { createdAt: 'asc' },
  });
  return timers
}

async function recordRelapse(timerId: string, userId: string): Promise<BadHabitTimer> {
  const timer = await prisma.badHabitTimer.findFirst({
    where: { id: timerId, userId },
  });

  if (!timer) throw new Error('BadHabitTimer not found');

  const now = new Date();
  const baseTime = timer.lastRelapseAt?.getTime() ?? timer.createdAt.getTime();
  const currentStreakSeconds = Math.floor((now.getTime() - baseTime) / 1000);

  const longestStreakSeconds = Math.max(timer.longestStreakSeconds, currentStreakSeconds);

  return prisma.badHabitTimer.update({
    where: { id: timerId },
    data: {
      lastRelapseAt: now,
      longestStreakSeconds,
      relapsesCount: { increment: 1 },
    },
  });
}

async function updateBadHabitTimer(
  timerId: string,
  userId: string,
  data: Partial<Omit<CreateBadHabitTimerInput, 'userId'>>
): Promise<BadHabitTimer> {
  return prisma.badHabitTimer.updateMany({
    where: { id: timerId, userId },
    data,
  }).then(res => {
    if (res.count === 0) throw new Error('BadHabitTimer not found or no permission');
    return prisma.badHabitTimer.findUnique({ where: { id: timerId } }) as Promise<BadHabitTimer>;
  });
}

async function deleteBadHabitTimer(timerId: string, userId: string): Promise<void> {
  const deleted = await prisma.badHabitTimer.deleteMany({
    where: { id: timerId, userId },
  });

  if (deleted.count === 0) throw new Error('BadHabitTimer not found or no permission');
}

export const BadHabitTimerService = {
  createBadHabitTimer,
  getBadHabitTimerById,
  getAllBadHabitTimers,
  recordRelapse,
  updateBadHabitTimer,
  deleteBadHabitTimer,
};