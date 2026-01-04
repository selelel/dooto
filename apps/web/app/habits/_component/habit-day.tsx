"use client";
import { cn } from "@/lib/utils";
import { CircleCheck } from "lucide-react";
import React, { useState } from "react";

function Habit({
  onClick,
  completed,
  completedColor,
  className,
  disabled,
}: {
  onClick: () => void;
  completed: boolean;
  completedColor: string;
  className?: string;
  disabled: boolean;
}) {
  const [completed_, setCompleted] = useState(completed);

  return (
    <div
      aria-disabled={disabled}
      onClick={() => {
        if (!disabled) {
          setCompleted((prev) => !prev);
          onClick();
        }
      }}
      className='flex-1 hover:opacity-70'
    >
      <div
        className={cn(
          `h-12 rounded-lg flex items-center justify-center ${
            completed_
              ? completedColor
              : "bg-muted active:bg-muted-foreground/20"
          }`,
          className
        )}
      >
        {completed_ && <CircleCheck className='w-4 h-4 text-white' />}
      </div>
    </div>
  );
}

export default Habit;
