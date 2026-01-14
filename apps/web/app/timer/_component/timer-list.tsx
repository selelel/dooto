import React from "react";
import { useTimer } from "../_context/timer-context";
import Timer from "./timer";

function TimerSkeleton() {
  return (
    <div className='shadow-md bg-success/50 border border-success rounded-xl p-4 animate-pulse h-81.5' />
  );
}

function TimerList() {
  const { data, isFetching, isCreating } = useTimer();

  if (isFetching) {
    return (
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        {[...Array(2)].map((_, i) => (
          <TimerSkeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
      {data.map((d) => (
        <Timer key={d.id} data={d} />
      ))}
      {isCreating && <TimerSkeleton />}
    </div>
  );
}

export default TimerList;
