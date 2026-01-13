import { prisma } from "../lib/prisma";
import { logger } from "../utils/logger";
import { POSTHabitT } from "../dtos";
import { Habit, HabitContribution } from "../generated/prisma/client";

async function createHabit(data: POSTHabitT & { categoryId?: string, userId: string }): Promise<Habit> {
  const { userId, habitName, details, categoryId } = data;

  try {

    // Check if habit with the same name exists for the user
    const existingHabit = await prisma.habit.findFirst({
      where: { userId, habitName },
    });

    if (existingHabit) {
      throw new Error(`Habit with name "${habitName}" already exists for this user.`);
    }

    // Create the habit
    const habit = await prisma.habit.create({
      data: {
        habitName,
        details: details ?? null,
        userId,
        categoryId: categoryId ?? null,
      },
    });

    return habit;
  } catch (error) {
    throw error;
  }
}

async function getHabitById(
  id: string,
  dateRange?: { from?: string; to?: string }
): Promise<Habit | null> {
  const contributionWhere =
    dateRange?.from || dateRange?.to
      ? {
          date: {
            ...(dateRange.from && { gte: new Date(dateRange.from) }),
            ...(dateRange.to && { lte: new Date(dateRange.to) }),
          },
        }
      : undefined;

  try {
    return await prisma.habit.findUnique({
      where: { id },
      include: {
        contributions: {
          ...(contributionWhere && { where: contributionWhere }),
          orderBy: { date: 'asc' },
        },
        category: true,
      },
    });
  } catch (error) {
    logger.error("Error getting habit by id:", error);
    throw error;
  }
}

async function getHabits(
  userId: string,
  // dateRange: { from?: string; to?: string } | any,
  categoryId? : string
): Promise<Habit[]> {
  // const contributionDateWhere: HabitContributionWhereInput | undefined =
  //   dateRange?.from || dateRange?.to
  //     ? {
  //         date: {
  //           ...(!!dateRange?.from && { gte: new Date(dateRange.from) }),
  //           ...(!!dateRange?.to && { lte: new Date(dateRange.to) }),
  //         },
  //       }
  //     : undefined;

  try {

    return await prisma.habit.findMany({
      where: {
        userId,
        ...(categoryId && {
          categoryId,
        }),
      },
      include: {
        contributions: {
          orderBy: { date: 'asc' },
        },
        category: true
      },
    });
  } catch (error) {
    logger.error("Error getting habits:", error);
    throw error;
  }
}


async function addContribution(data: {
  date?: string | undefined;
  habitId: string;
}): Promise<HabitContribution> {
  const { habitId } = data;

  const contributionDate = data.date
    ? new Date(data.date)
    : new Date();

  contributionDate.setUTCHours(0, 0, 0, 0);

  try {
    // 1️⃣ Check if contribution already exists
    const existing = await prisma.habitContribution.findUnique({
      where: {
        habitId_date: {
          habitId,
          date: contributionDate,
        },
      },
    });

    // 2️⃣ If exists → delete (toggle OFF)
    if (existing) {
      await prisma.habitContribution.delete({
        where: {
          habitId_date: {
            habitId,
            date: contributionDate,
          },
        },
      });

      existing.completed = false

      return existing;
    }

    // 3️⃣ If not exists → create (toggle ON)
    return await prisma.habitContribution.create({
      data: {
        habitId,
        date: contributionDate,
        completed: true,
        createdAt: new Date(),
      },
    });
  } catch (error) {
    logger.error("Error toggling contribution:", error);
    throw error;
  }
}

async function deleteHabit(
  habitId: string,
): Promise<Habit> {
  try {
    return await prisma.habit.delete({where: {id: habitId}});
  } catch (error) {
    logger.error("Error getting habits:", error);
    throw error;
  }
}

async function patchHabit(
  data: Partial<POSTHabitT> & {
    habitId: string;
    userId: string;
  }
): Promise<Habit> {
  const { habitId, habitName, details, categoryId } = data;

  try {
    const habit = await prisma.habit.findUnique({
      where: { id: habitId },
    });

    if (!habit) {
      throw new Error("Habit not found");
    }

    const updatedHabit = await prisma.habit.update({
      where: { id: habitId },
      data: {
        ...(habitName !== undefined && { habitName }),
        ...(details !== undefined && { details }),
        ...(categoryId !== undefined && { categoryId }),
      },
    });

    return updatedHabit;
  } catch (error) {
    throw error;
  }
}

export const HabitService = {
  createHabit,
  getHabitById,
  getHabits,
  addContribution,
  deleteHabit,
  patchHabit
};