import React from "react";
import { MOOD } from "@/modules/mood-journal/types";
import { Laugh, Smile, Meh, Frown, Clock } from "lucide-react";
import {
  ICommand,
  TextAreaTextApi,
  TextState,
} from "@uiw/react-md-editor/commands";
import { Button } from "@/components/ui/button";
import { normalizeDate } from "@/lib/utils";

export const moodEmojis: Record<
  MOOD,
  {
    icon: React.ElementType;
    label: string;
    color: string;
    bg: string;
  }
> = {
  HAPPY: {
    icon: Laugh,
    label: "Happy",
    color: "text-success border-success",
    bg: "bg-success/10",
  },
  SAD: {
    icon: Frown,
    label: "Sad",
    color: "text-secondary border-secondary",
    bg: "bg-secondary/10",
  },
  ANGRY: {
    icon: Frown,
    label: "Angry",
    color: "text-destructive border-destructive",
    bg: "bg-destructive/10",
  },
  ANXIOUS: {
    icon: Meh,
    label: "Anxious",
    color: "text-secondary border-secondary",
    bg: "bg-secondary/10",
  },
  EXCITED: {
    icon: Smile,
    label: "Excited",
    color: "text-primary border-primary",
    bg: "bg-primary/10",
  },
  CALM: {
    icon: Smile,
    label: "Calm",
    color: "text-primary border-primary",
    bg: "bg-primary/10",
  },
};

export const insertTimestamp = (mood?: string): ICommand => {
  return {
    name: "Timestamp",
    keyCommand: "Timestamp",
    buttonProps: {
      "aria-label": "timestamp",
      title: "timestamp",
    },
    icon: (
      <Button asChild className='h-full p-2 text-xs cursor-pointer'>
        <div>Timestamp</div>
      </Button>
    ),
    execute: (state: TextState, api: TextAreaTextApi) => {
      const now = new Date();
      const timeString = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        month: "short",
        day: "numeric",
        year: "numeric",
      });

      const textToInsert = `\n ###### ${timeString}-${mood ? `${mood}` : ""} \n`;

      api.replaceSelection(textToInsert);

      const cursor = state.selection;
      api.setSelectionRange({
        start: cursor.start + textToInsert.length,
        end: cursor.start + textToInsert.length,
      });
    },
  };
};

export function getDayStreak(dates: string[]): number {
  if (dates.length === 0) return 0;

  const uniqueDates = Array.from(new Set(dates.map(normalizeDate))).sort(
    (a, b) => (a < b ? 1 : -1)
  );

  let streak = 0;
  let current = new Date();

  for (const date of uniqueDates) {
    const expected = normalizeDate(current);

    if (date === expected) {
      streak++;
      current.setDate(current.getDate() - 1);
    } else {
      break;
    }
  }

  return streak;
}

export function getCurrentStreak(dates: string[]): number {
  if (dates.length === 0) return 0;

  const uniqueDates = Array.from(new Set(dates.map(normalizeDate))).sort(
    (a, b) => (a < b ? 1 : -1)
  );

  let streak = 0;
  let cursor = new Date();

  for (const date of uniqueDates) {
    if (date === normalizeDate(cursor)) {
      streak++;
      cursor.setDate(cursor.getDate() - 1);
    } else {
      break;
    }
  }

  return streak;
}

export function getLongestStreak(dates: string[]): number {
  if (dates.length === 0) return 0;

  const sorted = Array.from(new Set(dates.map(normalizeDate))).sort(); // ascending

  let longest = 1;
  let current = 1;

  for (let i = 1; i < sorted.length; i++) {
    const prev = new Date(sorted[i - 1]!);
    const curr = new Date(sorted[i]!);

    prev.setDate(prev.getDate() + 1);

    if (prev.toISOString().split("T")[0] === curr.toISOString().split("T")[0]) {
      current++;
      longest = Math.max(longest, current);
    } else {
      current = 1;
    }
  }

  return longest;
}

export function getMostCommonMood(moods: MOOD[]): MOOD | null {
  if (moods.length === 0) return null;

  const count = new Map<MOOD, number>();

  for (const mood of moods) {
    count.set(mood, (count.get(mood) ?? 0) + 1);
  }

  let mostCommon: MOOD | null = null;
  let max = 0;

  for (const [mood, value] of count) {
    if (value > max) {
      max = value;
      mostCommon = mood;
    }
  }

  return mostCommon;
}
