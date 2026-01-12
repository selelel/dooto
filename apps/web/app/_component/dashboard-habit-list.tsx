import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  useGetHabits,
  useToggleHabitContribution,
} from "@/modules/habit/hooks";
import { Flame, CircleCheck, Circle } from "lucide-react";
import React from "react";
import { completedToday, computeStreak } from "../habits/_utils";
import { POSTHabitResponse } from "@/modules/habit/types";
import { useQueryClient } from "@tanstack/react-query";
import { normalizeDate } from "@/lib/utils";
import { QueryKeys } from "@/constant/queryKeys";
import { useRouter } from "next/navigation";
import { ROUTES_CLIENT } from "@/constant/http";

function DashboardHabitList() {
  const { data } = useGetHabits();
  const habitsData = data || [];
  const navigate = useRouter();
  return (
    <Card className='shadow-sm'>
      <CardHeader>
        <CardTitle>Daily Habits</CardTitle>
      </CardHeader>
      <CardContent className='space-y-4'>
        {habitsData.map((habit) => (
          <DashboardHabitItem key={habit.id} data={habit} />
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

const DashboardHabitItem = ({ data }: { data: POSTHabitResponse }) => {
  const queryClient = useQueryClient();
  const { mutate: toggleHabit } = useToggleHabitContribution();
  const streak = computeStreak(data.contributions);
  const todayStatus = completedToday(data);

  const handleToggleHabit = function () {
    toggleHabit(
      { habitId: data.id, date: normalizeDate(new Date()) },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: QueryKeys.HabitQueryKeys.parent("get-habits"),
          });
        },
      }
    );
  };

  return (
    <div
      key={data.id}
      className='flex items-center justify-between p-4 rounded-xl bg-linear-to-r from-muted/50 to-transparent border border-border'
    >
      <div className='flex items-center gap-3'>
        <div className={`w-3 h-3 rounded-full`} />
        <div>
          <p className='font-medium'>{data.habitName}</p>
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
          handleToggleHabit();
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

export default DashboardHabitList;
