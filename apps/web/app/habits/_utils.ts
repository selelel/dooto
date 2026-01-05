import { normalizeDate } from "@/lib/utils";
import { Contribution, POSTHabitResponse } from "@/modules/habit/types";

const today = normalizeDate(new Date());

  const startOfWeek = (() => {
    const now = new Date();
    const day = now.getDay(); // Sunday = 0
    const diff = now.getDate() - day + (day === 0 ? -6 : 1); // adjust for Monday start
    return new Date(now.getFullYear(), now.getMonth(), diff);
  })();

export const weekDates = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date(startOfWeek);
    d.setDate(startOfWeek.getDate() + i);
    return normalizeDate(d);
  });

export const weekCompleted = (d: POSTHabitResponse) =>
    weekDates.map((date) =>
      d.contributions.some((c) => normalizeDate(c.date) === date && c.completed)
    );

export const weekCompletedCount = (d: POSTHabitResponse) => {
  const weekSet = new Set(weekDates);
  let count = 0;

  for (const c of d.contributions) {
    const normalized = normalizeDate(c.date);

    if (weekSet.has(normalized) && c.completed) {
      count++;
    }
  }

  return count;
};

export const weekCompletionRate = (d: POSTHabitResponse) => {
  const completed = weekCompletedCount(d);
  const total = weekDates.length;

  return total === 0 ? 0 : Math.round((completed / total) * 100);
};


export    const completedToday = (d: POSTHabitResponse) =>
    d.contributions.some((c) => normalizeDate(c.date) === today && c.completed);
  

export function computeStreak(contributions: Contribution[]): number {
  if (!contributions?.length) return 0;

  const completedDays = new Set(
    contributions
      .filter((c) => c.completed)
      .map((c) => new Date(c.date).toISOString().split("T")[0])
  );

  let streak = 0;
  const cursor = new Date(); // start from today

  while (true) {
    const day = cursor.toISOString().split("T")[0];

    if (!completedDays.has(day)) break;

    streak++;
    cursor.setDate(cursor.getDate() - 1);
  }

  return streak;
}

export interface WeeklyCompletionResult {
  total: number;
  completed: number;
  percentage: number;
}
