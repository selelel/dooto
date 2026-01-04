import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn, normalizeDate } from "@/lib/utils";
import { Contribution, POSTHabitResponse } from "@/modules/habit/types";
import { Flame, CircleCheck, Circle } from "lucide-react";
import React from "react";
import Habit from "./habit-day";
import { useHabits } from "../_context/habit-context";

function HabitItem({ habit }: { habit: POSTHabitResponse }) {
  const { handleToggleHabit } = useHabits();
  const jsDay = new Date().getDay();

  // Use a color for completed days — example: green
  const completedColor = "bg-success";

  const startOfWeek = (() => {
    const now = new Date();
    const day = now.getDay(); // Sunday = 0
    const diff = now.getDate() - day + (day === 0 ? -6 : 1); // adjust for Monday start
    return new Date(now.getFullYear(), now.getMonth(), diff);
  })();

  // Array of week dates normalized
  const weekDates = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date(startOfWeek);
    d.setDate(startOfWeek.getDate() + i);
    return normalizeDate(d);
  });

  // Which days in week are completed
  const weekCompleted = weekDates.map((date) =>
    habit.contributions.some(
      (c) => normalizeDate(c.date) === date && c.completed
    )
  );

  const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const today = normalizeDate(new Date());

  return (
    <Card
      key={habit.id}
      className='shadow-sm hover:shadow-md transition-shadow'
    >
      <CardContent className='p-6'>
        <div className='flex items-start justify-between mb-4'>
          <div className='flex items-start gap-3 flex-1'>
            <div className={`w-4 h-4 rounded-full ${completedColor} mt-1`} />
            <div className='flex-1'>
              <div className='flex flex-col'>
                <h3 className='text-lg leading-tight'>{habit.habitName}</h3>
                {habit.details && (
                  <p className='text-xs mb-1 text-muted-foreground'>
                    {habit.details}
                  </p>
                )}
              </div>
              {computeStreak(habit.contributions) >= 2 && (
                <div className='flex items-center gap-2'>
                  <Flame className='w-4 h-4 text-orange-500' />
                  <span className='text-sm text-muted-foreground'>
                    {computeStreak(habit.contributions)} day streak
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className='flex gap-2 mb-2 text-xs text-muted-foreground'>
          {weekDays.map((day, i) => {
            const todayIndex = jsDay === 0 ? 6 : jsDay - 1;
            return (
              <div
                key={i}
                className={cn(
                  "flex-1 text-center",
                  i === todayIndex
                    ? "text-red-500 font-semibold"
                    : "text-muted-foreground"
                )}
              >
                {day}
              </div>
            );
          })}
        </div>

        {/* Week Progress */}
        <div className='flex gap-2'>
          {weekCompleted.map((d, index) => {
            const todayIndex = jsDay === 0 ? 6 : jsDay - 1;
            return (
              <Habit
                onClick={() => {
                  handleToggleHabit({
                    habitId: habit.id,
                    date: weekDates[index]!,
                  });
                }}
                className={cn(
                  index >= todayIndex + 1 ? "bg-muted-foreground/10" : "",
                  todayIndex === index ? "border-2 border-red-300" : ""
                )}
                key={index}
                completed={d}
                completedColor={completedColor}
                disabled={index >= new Date().getDay()}
              />
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

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

export default HabitItem;
