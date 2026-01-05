"use client";
import { Card, CardContent } from "@/components/ui/card";
import { cn, normalizeDate } from "@/lib/utils";
import { Contribution, POSTHabitResponse } from "@/modules/habit/types";
import { Flame } from "lucide-react";
import React, { useState } from "react";
import Habit from "./habit-day";
import { useHabits } from "../_context/habit-context";
import HabitEditDialog from "./habit-edit-dialog";
import {
  completedToday as completedTodayFn,
  computeStreak,
  weekCompleted,
  weekDates,
} from "../_utils";

function HabitItem({ habit }: { habit: POSTHabitResponse }) {
  const [openEdit, setOpenEdit] = useState(false);
  const { handleToggleHabit } = useHabits();
  const completedToday = completedTodayFn(habit);
  const jsDay = new Date().getDay();

  const completedColor = "bg-success";

  const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return (
    <>
      <HabitEditDialog
        habitData={habit}
        open={openEdit}
        onOpenChange={setOpenEdit}
      />
      <Card
        key={habit.id}
        className='shadow-sm hover:shadow-md transition-shadow'
      >
        <CardContent className='p-6'>
          <div className='flex items-start justify-between mb-4'>
            <div className='flex items-start gap-3 flex-1'>
              <div
                className={`w-4 h-4 rounded-full ${completedToday ? completedColor : "bg-muted-foreground/30"} mt-1`}
              />
              <div
                onClick={() => {
                  setOpenEdit(true);
                }}
                className='flex-1 cursor-pointer'
              >
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
            {weekCompleted(habit).map((d, index) => {
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
    </>
  );
}

export default HabitItem;
