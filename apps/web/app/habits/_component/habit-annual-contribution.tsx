"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useHabits } from "../_context/habit-context";
import { annualCompletionMap, annualWeeks } from "../_utils";
import { ContributionCell } from "./habit-annual-contribution-cell";

export function ContributionGrid({ id }: { id: string }) {
  const { getHabitById } = useHabits();
  const habitData = getHabitById(id);

  if (!habitData) return null;

  const completionMap = new Map(
    annualCompletionMap(habitData).map((d) => [d.date, d.completed]),
  );

  return (
    <Card className='gap-3'>
      <CardHeader>
        <CardTitle>Annual Contributions</CardTitle>
      </CardHeader>

      <CardContent className='max-w-full!'>
        <div className='flex gap-1'>
          {annualWeeks.map((week, i) => (
            <div key={i} className='flex flex-col gap-0.5'>
              {week.map((date, idx) => {
                const completed = completionMap.get(date) ?? false;
                return (
                  <Tooltip key={idx}>
                    <TooltipTrigger>
                      <ContributionCell
                        completed={completed}
                        label={`${completed ? "Completed" : "Not completed"} on ${date}`}
                      />
                    </TooltipTrigger>
                    <TooltipContent>
                      {completed ? "Completed" : "Not completed"} on {date}
                    </TooltipContent>
                  </Tooltip>
                );
              })}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
