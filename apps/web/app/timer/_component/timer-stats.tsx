import { Card, CardContent } from "@/components/ui/card";
import { Trophy } from "lucide-react";
import React from "react";
import { useTimer } from "../_context/timer-context";
import { getTimeSince, hoursToDay } from "../_utils";

function SkeletonTrophyCard() {
  return (
    <Card className='shadow-sm border-l-4 border-l-secondary'>
      <CardContent className='p-4 text-center'>
        <div className='mx-auto mb-3 h-8 w-8 rounded bg-gray-300 animate-pulse' />
        <div className='h-4 w-20 mx-auto rounded bg-gray-300 animate-pulse' />
      </CardContent>
    </Card>
  );
}

function TimerStats() {
  const { data, isFetching } = useTimer();

  if (isFetching) {
    return (
      <div className='grid grid-cols-3 gap-4 mb-8'>
        <Card className='shadow-sm border-l-4 border-l-primary'>
          <CardContent className='p-4 text-center'>
            <div className='h-8 w-12 mx-auto mb-3 rounded bg-gray-300 animate-pulse' />
            <div className='h-4 w-24 mx-auto rounded bg-gray-300 animate-pulse' />
          </CardContent>
        </Card>
        <Card className='shadow-sm border-l-4 border-l-success'>
          <CardContent className='p-4 text-center'>
            <div className='h-8 w-12 mx-auto mb-3 rounded bg-gray-300 animate-pulse' />
            <div className='h-4 w-24 mx-auto rounded bg-gray-300 animate-pulse' />
          </CardContent>
        </Card>
        <SkeletonTrophyCard />
      </div>
    );
  }

  const totalHoursData = data
    .map((d) => hoursToDay(getTimeSince(new Date(d.lastRelapseAt)).totalHours))
    .reduce((max, hours) => Math.max(max, hours), 0);

  return (
    <div className='grid grid-cols-3 gap-4 mb-8'>
      <Card className='shadow-sm border-l-4 border-l-primary'>
        <CardContent className='p-4 text-center'>
          <p className='text-3xl mb-1'>{data?.length}</p>
          <p className='text-sm text-muted-foreground'>Active Trackers</p>
        </CardContent>
      </Card>
      <Card className='shadow-sm border-l-4 border-l-success'>
        <CardContent className='p-4 text-center'>
          <p className='text-3xl mb-1'>{totalHoursData}</p>
          <p className='text-sm text-muted-foreground'>Longest Streak (Days)</p>
        </CardContent>
      </Card>
      <Card className='shadow-sm border-l-4 border-l-secondary'>
        <CardContent className='p-4 text-center'>
          <Trophy className='w-8 h-8 mx-auto mb-2 text-secondary' />
          <p className='text-sm text-muted-foreground'>Keep Going!</p>
        </CardContent>
      </Card>
    </div>
  );
}

export default TimerStats;
