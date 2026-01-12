import StatusCard from "@/app/_component/status-card";
import { Award, CircleCheck, Flame, TrendingUp } from "lucide-react";
import React from "react";
import { useHabits } from "../_context/habit-context";

function HabitStatus() {
  const { habitsData, completedTodayCount, completionPercent } = useHabits();

  return (
    <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-6'>
      <StatusCard className='shadow-sm border-l-4 border-l-primary'>
        <div className='flex items-center gap-3'>
          <div className='w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center'>
            <CircleCheck className='w-5 h-5 text-primary' />
          </div>
          <div>
            <p className='text-2xl'>
              {completedTodayCount}/{habitsData?.length}
            </p>
            <p className='text-xs text-muted-foreground'>Today</p>
          </div>
        </div>
      </StatusCard>
      <StatusCard className='border-l-secondary'>
        <div className='flex items-center gap-3'>
          <div className='w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center'>
            <TrendingUp className='w-5 h-5 text-secondary' />
          </div>
          <div>
            <p className='text-2xl'>{completionPercent}%</p>
            <p className='text-xs text-muted-foreground'>Completion</p>
          </div>
        </div>
      </StatusCard>

      <StatusCard className='border-l-accent'>
        <div className='flex items-center gap-3'>
          <div className='w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center'>
            <Award className='w-5 h-5 text-accent-foreground' />
          </div>
          <div>
            <p className='text-2xl'>{habitsData?.length}</p>
            <p className='text-xs text-muted-foreground'>Total Habits</p>
          </div>
        </div>
      </StatusCard>
    </div>
  );
}

export default HabitStatus;
