import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { shallow } from "zustand/shallow";
import { CircleCheck, Circle } from "lucide-react";
import React, { useEffect, useState } from "react";
import { completedToday, computeStreak } from "../habits/_utils";
import { normalizeDate } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { ROUTES_CLIENT } from "@/constant/http";
import { useHabits } from "../habits/_context/habit-context";
import { useHabitStore } from "@/modules/habit/store";

export default function DashboardHabitList() {
  const { habitsData: data } = useHabits();
  const habitsData = data || [];
  const navigate = useRouter();
  return (
    <Card className='shadow-sm'>
      <CardHeader>
        <CardTitle>Daily Habits</CardTitle>
      </CardHeader>
      <CardContent className='space-y-4'>
        {habitsData.map((habit) => (
          <DashboardHabitItem key={habit.id} id={habit.id} />
        ))}

        <Button
          onClick={() => {
            navigate.push(ROUTES_CLIENT.PRIVATE.HABITS);
          }}
          variant='outline'
          className='w-full mt-4'
        >
          View All Habits
        </Button>
      </CardContent>
    </Card>
  );
}

const DashboardHabitItem = ({ id }: { id: string }) => {
  const { handleToggleHabit } = useHabits();
  const habitData = useHabitStore((s) => s.habitsData.find((h) => h.id === id));
  const todayStatus = !!completedToday(habitData!);

  const streak = React.useMemo(
    () => computeStreak(habitData?.contributions ?? []),
    [habitData?.contributions]
  );

  return (
    <div className='flex items-center justify-between p-4 rounded-xl border'>
      <div>
        <p className='font-medium'>{habitData?.habitName}</p>
        {streak > 2 && <span>{streak} day streak</span>}
      </div>

      <div
        onClick={() =>
          handleToggleHabit({
            habitId: id,
            date: normalizeDate(new Date()),
          })
        }
        className={`w-10 h-10 rounded-lg flex items-center justify-center cursor-pointer ${
          todayStatus ? "bg-success" : "bg-muted"
        }`}
      >
        {todayStatus ? <CircleCheck /> : <Circle />}
      </div>
    </div>
  );
};
