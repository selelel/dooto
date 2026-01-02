import { Card, CardContent } from "@/components/ui/card";
import { Contribution } from "@/modules/habit/types";
import { CircleCheck } from "lucide-react";
import React from "react";

interface HabitItemProps {
  name: string;
  color: string;
  contributions: Contribution[];
}

function HabitItem({ name, color, contributions }: HabitItemProps) {
  const normalize = (d: string) => d.split("T")[0];

  // Monday of current week
  const startOfWeek = (() => {
    const now = new Date();
    const day = now.getDay(); // Sun = 0
    const diff = now.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(now.getFullYear(), now.getMonth(), diff);
  })();

  // Array of week dates (normalized)
  const weekDates = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date(startOfWeek);
    d.setDate(startOfWeek.getDate() + i);
    return normalize(d.toISOString());
  });

  const weekCompleted = weekDates.map((date) =>
    contributions.some((c) => normalize(c.date) === date && c.completed)
  );

  const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return (
    <Card>
      <CardContent className='p-6'>
        <h3 className='mb-4'>{name}</h3>

        <div className='flex gap-2 mb-2 text-xs text-muted-foreground'>
          {weekDays.map((day, i) => (
            <div key={i} className='flex-1 text-center'>
              {day}
            </div>
          ))}
        </div>

        <div className='flex gap-2'>
          {weekCompleted.map((completed, index) => (
            <div key={index} className='flex-1'>
              <div
                className={`h-12 rounded-lg flex items-center justify-center ${
                  completed ? color : "bg-muted"
                }`}
              >
                {completed && <CircleCheck className='w-4 h-4 text-white' />}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default HabitItem;
