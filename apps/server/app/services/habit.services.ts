import { prisma } from "../lib/prisma";
import { logger } from "../utils/logger";
import { POSTAddContributionT, POSTHabitT } from "../dtos";
import { Habit, HabitContribution } from "../generated/prisma/client";
import { HabitContributionWhereInput } from "../generated/prisma/models";

async function createHabit(data: POSTHabitT & { userId: string }): Promise<Habit> {
  const { userId, habitName, details, categoryId } = data;

  try {
    // If categoryId is provided, validate it exists
    if (categoryId) {
      const category = await prisma.category.findUnique({
        where: { id: categoryId },
      });

      if (!category) {
        throw new Error(`Category with ID ${categoryId} not found`);
      }
      // Optionally, also verify category.userId === userId, to ensure ownership
      if (category.userId !== userId) {
        throw new Error(`Category does not belong to the user`);
      }
    }

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

async function getHabitById(id:string): Promise<Habit | null> {
  try {
    const habit = await prisma.habit.findUnique({
      where: {
        id
      },
      include: {
        contributions: {
          orderBy: { date: 'asc' },
        },
        category: true,
      },
    });

    return habit;
  } catch (error) {
    logger.error("Error getting habit by id:", error);
    throw error;
  }
}

async function getHabits(
  userId: string,
  dateRange?: { from?: string; to?: string },
  categoryId? : string
): Promise<Habit[]> {
  const contributionDateWhere: HabitContributionWhereInput | undefined =
    dateRange?.from || dateRange?.to
      ? {
          date: {
            ...(dateRange?.from && { gte: new Date(dateRange.from) }),
            ...(dateRange?.to && { lte: new Date(dateRange.to) }),
          },
        }
      : undefined;

  try {
    const habit = await prisma.habit.findMany({
      where: {
        userId,
        ...(contributionDateWhere && {
          contributions: {
            some: contributionDateWhere,
          },
        }),
        ...(categoryId && {
          categoryId,
        }),
      },
      include: {
        contributions: {
          ...(contributionDateWhere && {
            where: contributionDateWhere,
          }),
          orderBy: { date: 'asc' },
        },
        category: true,
      },
    });

    return habit;
  } catch (error) {
    logger.error("Error getting habits:", error);
    throw error;
  }
}


async function addContribution(data: POSTAddContributionT & { date?: string; habitId: string }): Promise<HabitContribution | null> {
  const { habitId, completed = true } = data;
  const inputDate = data.date || new Date();

  const contributionDate = new Date(inputDate);
  contributionDate.setUTCHours(0, 0, 0, 0);

  try {
    if (completed === false) {
      const contribution = await prisma.habitContribution.delete({
        where: {
          habitId_date: {
            habitId,
            date: contributionDate,
          },
        },
      });
      return contribution;
    }

    const contribution = await prisma.habitContribution.upsert({
      where: {
        habitId_date: {
          habitId,
          date: contributionDate,
        },
      },
      update: {
        completed,
      },
      create: {
        habitId,
        date: contributionDate,
        completed,
        createdAt: new Date(),
      },
    });

    return contribution;
  } catch (error) {
    logger.error("Error adding contribution:", error);
    throw error;
  }
}


export const HabitService = {
  createHabit,
  getHabitById,
  getHabits,
  addContribution
};