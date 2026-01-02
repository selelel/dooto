import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import React from "react";

function HabitProgress() {
  return (
    <Card className='mb-6 shadow-sm'>
      <CardHeader>
        <CardTitle>Today's Progress</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='space-y-2 mb-3'>
          <div className='flex justify-between text-sm'>
            <span>1 of 3 completed</span>
            <span>{50}%</span>
          </div>
          <Progress value={50} className='h-3' />
        </div>
        <p className='text-sm text-muted-foreground'>
          {1 === 1
            ? "🎉 Amazing! You've completed all your habits today!"
            : "Keep going! You're doing great!"}
        </p>
      </CardContent>
    </Card>
  );
}

export default HabitProgress;
