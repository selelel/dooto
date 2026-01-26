"use client";

import { cn } from "@/lib/utils";

interface ContributionCellProps {
  completed: boolean;
  label: string;
}

export function ContributionCell({ completed, label }: ContributionCellProps) {
  return (
    <div
      role='checkbox'
      aria-checked={completed}
      tabIndex={0}
      aria-label={label}
      className={cn(
        "h-2 w-2 rounded-xs",
        "transition-colors",
        "focus:outline-none focus:ring-2 focus:ring-ring/50",
        "data-[state=on]:bg-success",
        "data-[state=off]:bg-muted",
        completed ? "bg-success" : "bg-muted",
      )}
    />
  );
}
