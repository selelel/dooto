import { Card, CardContent } from "@/components/ui/card";
import React from "react";
import { useMoodJournal } from "../_context/mood-journal-context";
import { moodEmojis } from "../_utils";
import { BookHeart, Calendar } from "lucide-react";
import { MoodCalendarComponent } from "./mood-calendar-component";

function MoodCalendar() {
  return (
    <div className='space-y-6'>
      <MoodCalendarComponent />
      <Card className='shadow-sm bg-linear-to-br from-primary/5 to-transparent border-primary/20'>
        <CardContent className='p-6'>
          <div className='flex items-start gap-3'>
            <div className='w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0'>
              <Calendar className='w-5 h-5 text-primary' />
            </div>
            <div className='space-y-1'>
              <p className='font-medium'>Using Calendar View</p>
              <p className='text-sm text-muted-foreground'>
                Click on any day to view or create a mood entry. Days with
                entries show mood emojis. Today's date is highlighted with a
                ring.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default MoodCalendar;
