import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { POSTHabitResponse } from "@/modules/habit/types";
import { Flame, CircleCheck, Circle } from "lucide-react";
import React from "react";

function HabitItem({ habit }: { habit: POSTHabitResponse }) {
  // normalizeDate utility to get yyyy-mm-dd string
  const normalizeDate = (d: string | Date | undefined) => {
    if (!d) return "";

    const date = typeof d === "string" ? new Date(d) : d;

    return new Intl.DateTimeFormat("en-CA", {
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    }).format(date);
  };
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
  const lastContributionDate = normalizeDate(habit.contributions.at(-1)?.date);
  const completedToday = habit.contributions.some(
    (c) => normalizeDate(c.date) === today && c.completed
  );

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
              {false && (
                <div className='flex items-center gap-2'>
                  <Flame className='w-4 h-4 text-orange-500' />
                  <span className='text-sm text-muted-foreground'>
                    {0} day streak
                  </span>
                </div>
              )}
            </div>
          </div>
          <Button
            size='lg'
            className={
              lastContributionDate === today
                ? "bg-success hover:bg-success/90"
                : "bg-muted hover:bg-muted/80 text-muted-foreground"
            }
          >
            {completedToday ? (
              <>
                <CircleCheck className='w-5 h-5 mr-2' />
                Done
              </>
            ) : (
              <>
                <Circle className='w-5 h-5 mr-2' />
                Mark Done
              </>
            )}
          </Button>
        </div>

        {/* Weekdays labels */}
        <div className='flex gap-2 mb-2 text-xs text-muted-foreground'>
          {weekDays.map((day, i) => {
            const jsDay = new Date().getDay(); // 0 (Sun) - 6 (Sat)
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
          {weekCompleted.map((completed, index) => (
            <div key={index} className='flex-1'>
              <div
                className={`h-12 rounded-lg flex items-center justify-center ${
                  completed ? completedColor : "bg-muted"
                }`}
              >
                {completed && <CircleCheck className='w-4 h-4 text-white' />}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default HabitItem;
