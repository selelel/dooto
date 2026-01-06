"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetTimers } from "@/modules/timer/hooks";
import { RotateCcw, Trash2, Trophy } from "lucide-react";
import React from "react";
import { TimerProvider } from "./_context/timer-context";
import TimerStats from "./_component/timer-stats";
import TimerList from "./_component/timer-list";
import TimerCreate from "./_component/timer-create";

function TimerPage() {
  return (
    <div className='p-8 max-w-5xl mx-auto'>
      {/* Header */}
      <div className='mb-8'>
        <h1 className='text-4xl mb-2'>Since Timer ⏱️</h1>
        <p className='text-muted-foreground'>
          Track how long it's been since you last performed an action. Perfect
          for habit tracking and recovery journeys.
        </p>
      </div>
      {/* Stats */}
      <TimerStats />
      {/* Add New Timer */}
      <TimerCreate />
      {/* Timers Grid */}
      <TimerList />
      {/* Tips */}
      <div className='mt-8'>
        <Card className='shadow-sm bg-linear-to-br from-primary/5 to-transparent'>
          <CardHeader>
            <CardTitle className='text-lg'>How to Use Since Timers</CardTitle>
          </CardHeader>
          <CardContent className='space-y-2 text-sm text-muted-foreground'>
            <p>
              • <strong>Track Progress:</strong> Each timer shows how long it's
              been since you last performed an action
            </p>
            <p>
              • <strong>Reset When Needed:</strong> If you slip up, reset the
              timer and start fresh - no judgment
            </p>
            <p>
              • <strong>Celebrate Wins:</strong> Watch your streak grow and
              celebrate every milestone
            </p>
            <p>
              • <strong>Stay Motivated:</strong> Visual progress helps you stay
              committed to your goals
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default () => (
  <TimerProvider>
    <TimerPage />
  </TimerProvider>
);
