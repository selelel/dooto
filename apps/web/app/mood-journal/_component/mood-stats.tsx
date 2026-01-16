import { Card, CardContent } from "@/components/ui/card";
import { CalendarIcon, Heart, Smile } from "lucide-react";
import React, { use } from "react";
import { useMoodJournal } from "../_context/mood-journal-context";
import StatusCard from "@/app/_component/status-card";
import {
  getCurrentStreak,
  getDayStreak,
  getLongestStreak,
  getMostCommonMood,
  moodEmojis,
} from "../_utils";

function MoodStats() {
  const { data } = useMoodJournal();

  const dates = React.useMemo(() => data.map((e) => e.date), [data]);
  const currentStreak = React.useMemo(() => getCurrentStreak(dates), [dates]);
  const longestStreak = React.useMemo(() => getLongestStreak(dates), [dates]);
  const displayStreak = currentStreak === 0 ? longestStreak : currentStreak;

  const mostCommonMood = React.useMemo(
    () => getMostCommonMood(data.map((e) => e.mood)),
    [data]
  );

  const Icon = moodEmojis[mostCommonMood ?? "HAPPY"].icon;

  return (
    <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-8'>
      <StatusCard className='border-l-primary'>
        <div className='flex items-center gap-3'>
          <div className='w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center'>
            <CalendarIcon className='w-5 h-5 text-primary' />
          </div>
          <div>
            <p className='text-2xl'>{data.length}</p>
            <p className='text-xs text-muted-foreground'>Total Entries</p>
          </div>
        </div>
      </StatusCard>

      {/* Day Streak */}
      <StatusCard className='border-l-success'>
        <div className='flex items-center gap-3'>
          <div className='w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center'>
            <Heart className='w-5 h-5 text-success' />
          </div>
          <div>
            <p className='text-2xl'>{displayStreak}</p>
            <p className='text-xs text-muted-foreground'>
              {currentStreak === 0 ? "Longest Streak" : "Current Streak"}
            </p>
          </div>
        </div>
      </StatusCard>

      {/* Most Common Mood */}
      <StatusCard className='border-l-secondary'>
        <div className='flex items-center gap-3'>
          <div className='w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center'>
            <Icon className={"w-5 h-5 text-secondary"} />
          </div>
          <div>
            <p className='text-2xl capitalize'>{mostCommonMood ?? "N/A"}</p>
            <p className='text-xs text-muted-foreground'>Most Common</p>
          </div>
        </div>
      </StatusCard>
    </div>
  );
}

export default MoodStats;
