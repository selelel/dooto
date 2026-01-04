import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { normalizeDate } from "@/lib/utils";
import React from "react";
import { useHabits } from "../_context/habit-context";

function HabitProgress() {
  const { completedTodayCount, totalHabits, completionPercent } = useHabits();

  return (
    <Card className='mb-6 shadow-sm'>
      <CardHeader>
        <CardTitle>Today's Progress</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='space-y-2 mb-3'>
          <div className='flex justify-between text-sm'>
            <span>
              {completedTodayCount} of {totalHabits} completed
            </span>
            <span>{completionPercent}%</span>
          </div>
          <Progress value={completionPercent} className='h-3' />
        </div>
        <p className='text-sm text-muted-foreground'>
          {completionPercent === 100
            ? "🎉 Amazing! You've completed all your habits today!"
            : "Keep going! You're doing great!"}
        </p>
      </CardContent>
    </Card>
  );
}

export default HabitProgress;
