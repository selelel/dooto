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
      d.contributions?.some((c) => normalizeDate(c.date) === date && c.completed)
    );

export const weekCompletedCount = (d: POSTHabitResponse) => {
  const weekSet = new Set(weekDates);
  let count = 0;

  for (const c of (d.contributions || [])) {
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


export const completedToday = (d: POSTHabitResponse) =>
  d.contributions?.some(
    (c) => normalizeDate(c.date) === today && c.completed
  ) || false;
  

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

export function getLongestStreakFromDates(contributions: {
  date: string;
}[]): number {
  if (!contributions || contributions.length === 0) return 0;

  // Unique completed days
  const days = Array.from(
    new Set(contributions.map(c => normalizeDate(c.date)))
  )
    .map(d => new Date(d))
    .sort((a, b) => a.getTime() - b.getTime());

  let longest = 1;
  let current = 1;

  for (let i = 1; i < days.length; i++) {
    const prev = days[i - 1];
    const curr = days[i];

    if (!prev || !curr) continue;

    const diffInDays =
      (curr.getTime() - prev.getTime()) / (1000 * 60 * 60 * 24);

    if (diffInDays === 1) {
      current++;
    } else {
      longest = Math.max(longest, current);
      current = 1;
    }
  }

  return Math.max(longest, current);
}

export const isCompletedToday = (habit: any) =>
    habit.contributions?.some(
      (c: any) => normalizeDate(c.date) === today && c.completed
    );


export interface WeeklyCompletionResult {
  total: number;
  completed: number;
  percentage: number;
}

export const annualDates = (() => {
  const dates: string[] = []
  const now = new Date()
  const start = new Date(now.getFullYear(), 0, 1)
  const end = new Date(now.getFullYear(), now.getMonth(), now.getDate())

  const cursor = new Date(start)

  while (cursor <= end) {
    dates.push(normalizeDate(cursor))
    cursor.setDate(cursor.getDate() + 1)
  }

  return dates
})()

export const annualCompleted = (d: POSTHabitResponse) =>
  annualDates.map(
    (date) =>
      d.contributions?.some(
        (c) => normalizeDate(c.date) === date && c.completed
      ) || false
  )

export const annualCompletedCount = (d: POSTHabitResponse) => {
  const dateSet = new Set(annualDates)
  let count = 0

  for (const c of d.contributions || []) {
    const normalized = normalizeDate(c.date)

    if (dateSet.has(normalized) && c.completed) {
      count++
    }
  }

  return count
}

export const annualCompletionRate = (d: POSTHabitResponse) => {
  const completed = annualCompletedCount(d)
  const total = annualDates.length

  return total === 0 ? 0 : Math.round((completed / total) * 100)
}

export const annualCompletionMap = (d: POSTHabitResponse) =>
  annualDates.map((date) => ({
    date,
    completed:
      d.contributions?.some(
        (c) => normalizeDate(c.date) === date && c.completed
      ) || false,
  }))

export const annualWeeks = (() => {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 1); // Jan 1
  const end = new Date(now.getFullYear(), 11, 31); // Dec 31

  const dates: string[] = [];
  const cursor = new Date(start);

  while (cursor <= end) {
    dates.push(normalizeDate(cursor));
    cursor.setDate(cursor.getDate() + 1);
  }

  const dayOfWeek = dates[0] ? new Date(dates[0]).getDay() : 0;
  const paddingStart = dayOfWeek === 0 ? 6 : dayOfWeek - 1;

  for (let i = 0; i < paddingStart; i++) {
    dates.unshift(""); 
  }

  while (dates.length % 7 !== 0) {
    dates.push(""); 
  }

  const weeks: string[][] = [];
  for (let i = 0; i < dates.length; i += 7) {
    weeks.push(dates.slice(i, i + 7));
  }

  return weeks;
})();

export interface AnnualCompletionResult {
  total: number
  completed: number
  percentage: number
}

export const annualSummary = (
  d: POSTHabitResponse
): AnnualCompletionResult => ({
  total: annualDates.length,
  completed: annualCompletedCount(d),
  percentage: annualCompletionRate(d),
})

