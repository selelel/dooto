"use client";
import { useState } from "react";
import { Target } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import HabitHeader from "./_component/habit-header";
import HabitStatus from "./_component/habit-status";
import HabitProgress from "./_component/habit-progress";
import HabitList from "./_component/habit-list";
import { HabitProvider } from "./_context/habit-context";
import HabitCreate from "./_component/habit-create";

function HabitTracker() {
  return (
    <div className='p-8 max-w-5xl mx-auto'>
      <HabitHeader />
      <HabitCreate />
      <HabitStatus />
      <HabitProgress />
      <HabitList />
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
