import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { shallow } from "zustand/shallow";
import { CircleCheck, Circle, Flame } from "lucide-react";
import React, { useEffect, useState } from "react";
import { completedToday, computeStreak } from "../habits/_utils";
import { normalizeDate } from "@/lib/utils";
import { useRouter } from "next/navigation";

import { Skeleton } from "@/components/ui/skeleton";
import { ROUTES_CLIENT } from "@/constant/http";
import { useHabits } from "../habits/_context/habit-context";
import { useHabitStore } from "@/modules/habit/store";

export default function DashboardHabitList() {
  const { habitsData, isHabitsFetching } = useHabits();
  const navigate = useRouter();

  return (
    <Card className='shadow-sm'>
      <CardHeader>
        <CardTitle>Daily Habits</CardTitle>
      </CardHeader>

      <CardContent className='space-y-4'>
        {isHabitsFetching ? (
          <>
            {Array.from({ length: 3 }).map((_, i) => (
              <DashboardHabitSkeletonItem key={i} />
            ))}
          </>
        ) : (
          habitsData?.map((habit) => (
            <DashboardHabitItem key={habit.id} id={habit.id} />
          ))
        )}

        <Button
          onClick={() => navigate.push(ROUTES_CLIENT.PRIVATE.HABITS)}
          variant='outline'
          className='w-full mt-4'
          disabled={isHabitsFetching}
        >
          View All Habits
        </Button>
      </CardContent>
    </Card>
  );
}

const DashboardHabitSkeletonItem = () => {
  return (
    <div className='flex items-center justify-between p-4 rounded-xl border'>
      <div className='flex flex-col gap-2'>
        <Skeleton className='bg-success/70  h-4 w-32' />
        <Skeleton className='bg-success/70  h-3 w-20' />
      </div>
      <Skeleton className='bg-success/70 h-10 w-10 rounded-lg' />
    </div>
  );
};

const DashboardHabitItem = ({ id }: { id: string }) => {
  const { handleToggleHabit } = useHabits();
  const habitData = useHabitStore((s) => s.habitsData.find((h) => h.id === id));
  const todayStatus = !!completedToday(habitData!);

  const streak = React.useMemo(
    () => computeStreak(habitData?.contributions ?? []),
    [habitData?.contributions]
  );

  return (
    <div
      key={id}
      className='flex items-center justify-between p-4 rounded-xl bg-linear-to-r from-muted/50 to-transparent border border-border'
    >
      <div className='flex items-center gap-3'>
        <div className={`w-3 h-3 rounded-full`} />
        <div>
          <p className='font-medium'>{habitData?.habitName}</p>
          {streak > 2 && (
            <div className='flex items-center gap-2 mt-1'>
              <Flame className='w-4 h-4 text-orange-500' />
              <span className='text-sm text-muted-foreground'>
                {streak} day streak
              </span>
            </div>
          )}
        </div>
      </div>
      <div
        onClick={() => {
          handleToggleHabit({ habitId: id, date: normalizeDate(new Date()) });
        }}
        className={`cursor-pointer hover:scale-105 duration-200 hover:opacity-90 w-10 h-10 rounded-lg flex items-center justify-center ${
          todayStatus
            ? "bg-success text-success-foreground"
            : "bg-muted text-muted-foreground"
        }`}
      >
        {todayStatus ? (
          <CircleCheck className='w-5 h-5' />
        ) : (
          <Circle className='w-5 h-5' />
        )}
      </div>
    </div>
  );
};
