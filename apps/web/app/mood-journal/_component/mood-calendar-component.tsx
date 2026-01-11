import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MOOD, POSTMoodJournalResponse } from "@/modules/mood-journal/types";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useMoodJournal } from "../_context/mood-journal-context";
import { moodEmojis } from "../_utils";
import { Fragment, useState } from "react";
import MoodDialogView from "./mood-dialog-view";
import MoodDialogCreate from "./mood-dialog-create";
import { se } from "date-fns/locale";

export function MoodCalendarComponent() {
  const { currentMonth, setCurrentMonth, data } = useMoodJournal();
  const [open, onOpenChange] = useState(false);
  const [selectedEntry, setSelectedEntry] =
    useState<POSTMoodJournalResponse | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
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
  const entryMap = new Map<string, POSTMoodJournalResponse>();
  data.forEach((entry) => {
    const entryDate = new Date(entry.date);
    const key = `${entryDate.getFullYear()}-${entryDate.getMonth()}-${entryDate.getDate()}`;
    entryMap.set(key, entry);
  });

  const getEntryForDay = (day: number): POSTMoodJournalResponse | null => {
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
    setCurrentMonth(newDate);
  };

  const handleNextMonth = () => {
    const newDate = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() + 1,
      1
    );
    setCurrentMonth(newDate);
  };

  const handleToday = () => {
    setCurrentMonth(new Date());
  };

  const handleDateClick = (
    entry: POSTMoodJournalResponse | null,
    dateString: string
  ) => {
    setSelectedDate(new Date(dateString));
    if (entry) {
      setSelectedEntry(entry);
      onOpenChange(true);
    } else {
      setSelectedEntry(null);
      onOpenChange(true);
    }
  };

  const isFutureDay = (day: number): boolean => {
    const cellDate = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day
    );

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return cellDate > today;
  };

  return (
    <>
      {!!selectedEntry && (
        <MoodDialogView
          open={!!selectedEntry && open}
          onOpenChange={onOpenChange}
          data={selectedEntry!}
        />
      )}

      <MoodDialogCreate
        open={open && !selectedEntry}
        onOpenChange={onOpenChange}
        date={selectedDate!}
      />
      <div className='space-y-4'>
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

        <Card className='p-4 shadow-sm'>
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

          <div className='grid grid-cols-7 gap-2'>
            {days.map((day, index) => {
              if (day === null) {
                return <div key={`empty-${index}`} className='aspect-square' />;
              }

              const entry = getEntryForDay(day);
              const today = isToday(day);
              const Icon = !!entry ? moodEmojis[entry!.mood].icon : Fragment;

              return (
                <button
                  key={day}
                  disabled={isFutureDay(day)}
                  onClick={() => handleDateClick(entry, formatDateString(day))}
                  className={`
                  aspect-square rounded-lg border-2 transition-all relative
                  flex flex-col items-center justify-center hover:scale-105 duration-200 cursor-pointer
                  ${
                    entry
                      ? moodEmojis[entry.mood].color
                      : isFutureDay(day)
                        ? "bg-muted-foreground/10"
                        : "border-border hover:bg-muted/50 hover:border-muted-foreground/20"
                  }
                  ${today ? "ring-2 ring-offset-2" : ""}
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
                      <Icon />
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
        <div className='flex items-center justify-center gap-4 flex-wrap text-xs'>
          {Object.entries(moodEmojis).map(
            ([mood, { icon: Icon, label, color }]) => (
              <div key={mood} className={"flex items-center gap-2 " + color}>
                <Icon />
                <span>{label}</span>
              </div>
            )
          )}
        </div>
      </div>
    </>
  );
}
