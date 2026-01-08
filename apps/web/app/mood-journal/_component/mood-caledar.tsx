import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";
interface JournalEntry {
  id: number;
  date: string;
  mood: "great" | "good" | "okay" | "sad" | "stressed";
  entry: string;
  gratitude?: string;
}

interface MoodCalendarProps {
  entries: JournalEntry[];
  onDateClick: (entry: JournalEntry | null, dateString: string) => void;
  currentMonth: Date;
  onMonthChange: (date: Date) => void;
}

const moodEmojis = {
  great: {
    emoji: "😄",
    color: "bg-success/20 hover:bg-success/30 border-success/30",
    label: "Great",
  },
  good: {
    emoji: "😊",
    color: "bg-primary/20 hover:bg-primary/30 border-primary/30",
    label: "Good",
  },
  okay: {
    emoji: "😐",
    color: "bg-accent/30 hover:bg-accent/40 border-accent/40",
    label: "Okay",
  },
  sad: {
    emoji: "😔",
    color: "bg-secondary/20 hover:bg-secondary/30 border-secondary/30",
    label: "Sad",
  },
  stressed: {
    emoji: "😰",
    color: "bg-destructive/20 hover:bg-destructive/30 border-destructive/30",
    label: "Stressed",
  },
};

export function MoodCalendar({
  entries,
  onDateClick,
  currentMonth,
  onMonthChange,
}: MoodCalendarProps) {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // Get the first day of the month
  const firstDay = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth(),
    1
  );
  const lastDay = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth() + 1,
    0
  );

  // Get the starting day of the week (0-6)
  const startingDayOfWeek = firstDay.getDay();

  // Calculate days to display
  const daysInMonth = lastDay.getDate();
  const days: (number | null)[] = [];

  // Add empty cells for days before the first of the month
  for (let i = 0; i < startingDayOfWeek; i++) {
    days.push(null);
  }

  // Add all days of the month
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  // Create a map of dates to entries for quick lookup
  const entryMap = new Map<string, JournalEntry>();
  entries.forEach((entry) => {
    const entryDate = new Date(entry.date);
    const key = `${entryDate.getFullYear()}-${entryDate.getMonth()}-${entryDate.getDate()}`;
    entryMap.set(key, entry);
  });

  const getEntryForDay = (day: number): JournalEntry | null => {
    const key = `${currentMonth.getFullYear()}-${currentMonth.getMonth()}-${day}`;
    return entryMap.get(key) || null;
  };

  const formatDateString = (day: number): string => {
    const date = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day
    );
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const isToday = (day: number): boolean => {
    const today = new Date();
    return (
      day === today.getDate() &&
      currentMonth.getMonth() === today.getMonth() &&
      currentMonth.getFullYear() === today.getFullYear()
    );
  };

  const handlePrevMonth = () => {
    const newDate = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() - 1,
      1
    );
    onMonthChange(newDate);
  };

  const handleNextMonth = () => {
    const newDate = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() + 1,
      1
    );
    onMonthChange(newDate);
  };

  const handleToday = () => {
    onMonthChange(new Date());
  };

  return (
    <div className='space-y-4'>
      {/* Calendar Header */}
      <div className='flex items-center justify-between'>
        <div>
          <h2 className='text-2xl font-semibold'>
            {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
          </h2>
        </div>
        <div className='flex items-center gap-2'>
          <Button
            variant='outline'
            size='sm'
            onClick={handleToday}
            className='text-xs'
          >
            Today
          </Button>
          <Button variant='outline' size='sm' onClick={handlePrevMonth}>
            <ChevronLeft className='w-4 h-4' />
          </Button>
          <Button variant='outline' size='sm' onClick={handleNextMonth}>
            <ChevronRight className='w-4 h-4' />
          </Button>
        </div>
      </div>

      {/* Calendar Grid */}
      <Card className='p-4 shadow-sm'>
        {/* Day Names */}
        <div className='grid grid-cols-7 gap-2 mb-2'>
          {dayNames.map((day) => (
            <div
              key={day}
              className='text-center text-xs font-medium text-muted-foreground py-2'
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Days */}
        <div className='grid grid-cols-7 gap-2'>
          {days.map((day, index) => {
            if (day === null) {
              return <div key={`empty-${index}`} className='aspect-square' />;
            }

            const entry = getEntryForDay(day);
            const today = isToday(day);

            return (
              <button
                key={day}
                onClick={() => onDateClick(entry, formatDateString(day))}
                className={`
                  aspect-square rounded-lg border-2 transition-all relative
                  flex flex-col items-center justify-center
                  ${
                    entry
                      ? moodEmojis[entry.mood].color
                      : "border-border hover:bg-muted/50 hover:border-muted-foreground/20"
                  }
                  ${today ? "ring-2 ring-primary ring-offset-2" : ""}
                `}
              >
                {/* Day Number */}
                <span
                  className={`text-sm font-medium ${today ? "font-bold" : ""}`}
                >
                  {day}
                </span>

                {/* Mood Emoji */}
                {entry && (
                  <span className='text-2xl mt-1'>
                    {moodEmojis[entry.mood].emoji}
                  </span>
                )}

                {/* Today Indicator */}
                {today && !entry && (
                  <div className='absolute bottom-1 w-1.5 h-1.5 rounded-full bg-primary' />
                )}
              </button>
            );
          })}
        </div>
      </Card>

      {/* Legend */}
      <div className='flex items-center justify-center gap-4 flex-wrap text-xs'>
        <div className='flex items-center gap-2'>
          <span className='text-lg'>{moodEmojis.great.emoji}</span>
          <span className='text-muted-foreground'>
            {moodEmojis.great.label}
          </span>
        </div>
        <div className='flex items-center gap-2'>
          <span className='text-lg'>{moodEmojis.good.emoji}</span>
          <span className='text-muted-foreground'>{moodEmojis.good.label}</span>
        </div>
        <div className='flex items-center gap-2'>
          <span className='text-lg'>{moodEmojis.okay.emoji}</span>
          <span className='text-muted-foreground'>{moodEmojis.okay.label}</span>
        </div>
        <div className='flex items-center gap-2'>
          <span className='text-lg'>{moodEmojis.sad.emoji}</span>
          <span className='text-muted-foreground'>{moodEmojis.sad.label}</span>
        </div>
        <div className='flex items-center gap-2'>
          <span className='text-lg'>{moodEmojis.stressed.emoji}</span>
          <span className='text-muted-foreground'>
            {moodEmojis.stressed.label}
          </span>
        </div>
      </div>
    </div>
  );
}
