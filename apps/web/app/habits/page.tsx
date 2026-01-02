"use client";
import { useState } from "react";
import { Target } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import HabitHeader from "./_component/habit-header";
import HabitStatus from "./_component/habit-status";
import HabitProgress from "./_component/habit-progress";
import HabitList from "./_component/habit-list";
import { HabitProvider, useHabits } from "./_context/habit-context";
import HabitCreate from "./_component/habit-create";

function HabitTracker() {
  const [habits] = useState([
    {
      id: 1,
      name: "Morning meditation",
      color: "bg-chart-2",
      streak: 12,
      completedToday: true,
      weekProgress: [true, true, true, true, true, true, true],
    },
    {
      id: 2,
      name: "Exercise 30 minutes",
      color: "bg-chart-1",
      streak: 5,
      completedToday: false,
      weekProgress: [true, true, false, true, true, false, false],
    },
    {
      id: 3,
      name: "Read for 20 minutes",
      color: "bg-chart-3",
      streak: 8,
      completedToday: true,
      weekProgress: [true, true, true, true, true, true, true],
    },
    {
      id: 4,
      name: "Drink 8 glasses of water",
      color: "bg-chart-3",
      streak: 15,
      completedToday: true,
      weekProgress: [true, true, true, true, true, true, true],
    },
    {
      id: 5,
      name: "Journal thoughts",
      color: "bg-chart-4",
      streak: 3,
      completedToday: false,
      weekProgress: [false, true, true, false, true, false, false],
    },
  ]);

  const { habitsData } = useHabits();
  console.log(habitsData);

  return (
    <div className='p-8 max-w-5xl mx-auto'>
      <HabitHeader />
      <HabitCreate />
      <HabitStatus />
      <HabitProgress />
      <HabitList />

      {habits.length === 0 && (
        <Card className='shadow-sm'>
          <CardContent className='py-16 text-center'>
            <Target className='w-16 h-16 text-muted-foreground/30 mx-auto mb-4' />
            <h3 className='text-xl mb-2'>No habits yet</h3>
            <p className='text-muted-foreground mb-6'>
              Start building positive habits today!
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default function CONTEXTED() {
  return (
    <HabitProvider>
      <HabitTracker />
    </HabitProvider>
  );
}
