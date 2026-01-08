"use client";

import { useEffect, useState } from "react";
import {
  Smile,
  Meh,
  Frown,
  Laugh,
  Heart,
  Calendar as CalendarIcon,
  BookHeart,
  List,
  Calendar as CalendarViewIcon,
  Badge,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

import { MoodCalendar } from "./_component/mood-caledar";
import { MoodDialog } from "./_component/mood-dialog";
import {
  MoodJournalProvider,
  useMoodJournal,
} from "./_context/mood-journal-context";

import { POSTMoodJournalResponse } from "@/modules/mood-journal/types";

/* ---------------------------------- */
/* Types */
/* ---------------------------------- */

interface JournalEntry {
  id: number;
  date: string;
  mood: "great" | "good" | "okay" | "sad" | "stressed";
  entry: string;
  gratitude?: string;
}

/* ---------------------------------- */
/* Mood Config */
/* ---------------------------------- */

const moodEmojis = {
  great: {
    icon: Laugh,
    label: "Great",
    color: "text-success",
    bg: "bg-success/10",
  },
  good: {
    icon: Smile,
    label: "Good",
    color: "text-primary",
    bg: "bg-primary/10",
  },
  okay: {
    icon: Meh,
    label: "Okay",
    color: "text-accent-foreground",
    bg: "bg-accent/30",
  },
  sad: {
    icon: Frown,
    label: "Sad",
    color: "text-secondary",
    bg: "bg-secondary/10",
  },
  stressed: {
    icon: Frown,
    label: "Stressed",
    color: "text-destructive",
    bg: "bg-destructive/10",
  },
};

/* ---------------------------------- */
/* Main Component */
/* ---------------------------------- */

function MoodJournal() {
  const { data } = useMoodJournal();

  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [selectedMood, setSelectedMood] = useState<JournalEntry["mood"] | null>(
    null
  );
  const [journalText, setJournalText] = useState("");
  const [gratitudeText, setGratitudeText] = useState("");
  const [view, setView] = useState<"list" | "calendar">("list");
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // Dialog state
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<"view" | "edit" | "create">(
    "view"
  );
  const [selectedEntry, setSelectedEntry] = useState<JournalEntry | null>(null);
  const [selectedDate, setSelectedDate] = useState("");

  /* ---------------------------------- */
  /* Map API data -> UI entries */
  /* ---------------------------------- */

  useEffect(() => {
    if (!data) return;

    const mapped: JournalEntry[] = (data as POSTMoodJournalResponse[]).map(
      (item) => ({
        id: Number(item.id),
        date: item.date,
        mood: item.mood as JournalEntry["mood"],
        entry: item.note,
      })
    );

    setEntries(mapped);
  }, [data]);

  /* ---------------------------------- */
  /* Handlers */
  /* ---------------------------------- */

  const addEntry = () => {
    if (!selectedMood || !journalText.trim()) return;

    const today = new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    setEntries([
      {
        id: Date.now(),
        date: today,
        mood: selectedMood,
        entry: journalText,
        gratitude: gratitudeText || undefined,
      },
      ...entries,
    ]);

    setSelectedMood(null);
    setJournalText("");
    setGratitudeText("");
  };

  const handleDateClick = (entry: JournalEntry | null, date: string) => {
    setSelectedEntry(entry);
    setSelectedDate(date);
    setDialogMode(entry ? "view" : "create");
    setDialogOpen(true);
  };

  const handleEntryClick = (entry: JournalEntry) => {
    setSelectedEntry(entry);
    setSelectedDate(entry.date);
    setDialogMode("view");
    setDialogOpen(true);
  };

  const handleSaveEntry = (data: Partial<JournalEntry>) => {
    if (dialogMode === "create") {
      setEntries([
        {
          id: Date.now(),
          date: selectedDate,
          mood: data.mood!,
          entry: data.entry!,
          gratitude: data.gratitude,
        },
        ...entries,
      ]);
    } else {
      setEntries(
        entries.map((entry) =>
          entry.id === selectedEntry?.id ? { ...entry, ...data } : entry
        )
      );
    }
  };

  const handleDeleteEntry = (id: number) => {
    setEntries(entries.filter((e) => e.id !== id));
  };

  const moodCounts = entries.reduce(
    (acc, entry) => {
      acc[entry.mood] = (acc[entry.mood] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  const mostCommonMood = Object.entries(moodCounts).sort(
    (a, b) => b[1] - a[1]
  )[0]?.[0];

  /* ---------------------------------- */
  /* Render */
  /* ---------------------------------- */

  return (
    <div className='p-8 max-w-6xl mx-auto'>
      {/* Header */}
      <div className='mb-8 flex items-start justify-between'>
        <div>
          <h1 className='text-4xl mb-2'>Mood Journal 📔</h1>
          <p className='text-muted-foreground'>
            Reflect on your day and track your emotional well-being
          </p>
        </div>

        <div className='flex gap-2 bg-muted rounded-lg p-1'>
          <Button
            variant={view === "list" ? "default" : "ghost"}
            size='sm'
            onClick={() => setView("list")}
          >
            <List className='w-4 h-4 mr-2' />
            List
          </Button>
          <Button
            variant={view === "calendar" ? "default" : "ghost"}
            size='sm'
            onClick={() => setView("calendar")}
          >
            <CalendarViewIcon className='w-4 h-4 mr-2' />
            Calendar
          </Button>
        </div>
      </div>

      {view === "calendar" && (
        <MoodCalendar
          entries={entries}
          onDateClick={handleDateClick}
          currentMonth={currentMonth}
          onMonthChange={setCurrentMonth}
        />
      )}

      {view === "list" && (
        <>
          {/* New Entry */}
          <Card className='mb-8'>
            <CardHeader>
              <CardTitle>How are you feeling today?</CardTitle>
            </CardHeader>
            <CardContent className='space-y-6'>
              <div className='flex gap-3'>
                {(
                  Object.keys(moodEmojis) as Array<keyof typeof moodEmojis>
                ).map((mood) => {
                  const Icon = moodEmojis[mood].icon;
                  return (
                    <button
                      key={mood}
                      onClick={() => setSelectedMood(mood)}
                      className={`flex-1 p-4 rounded-xl border ${
                        selectedMood === mood
                          ? moodEmojis[mood].bg
                          : "border-border"
                      }`}
                    >
                      <Icon className='w-6 h-6 mx-auto' />
                      <p className='text-xs mt-1'>{moodEmojis[mood].label}</p>
                    </button>
                  );
                })}
              </div>

              <Textarea
                placeholder='Write your thoughts...'
                value={journalText}
                onChange={(e) => setJournalText(e.target.value)}
              />

              <Textarea
                placeholder='What are you grateful for?'
                value={gratitudeText}
                onChange={(e) => setGratitudeText(e.target.value)}
              />

              <Button onClick={addEntry} disabled={!selectedMood}>
                Save Entry
              </Button>
            </CardContent>
          </Card>

          {/* Entries */}
          {entries.map((entry, idx) => {
            const Icon = Laugh;
            return (
              <Card
                key={idx}
                className='mb-4 cursor-pointer'
                onClick={() => handleEntryClick(entry)}
              >
                <CardContent className='p-6'>
                  <div className='flex items-center gap-3'>
                    <Icon className='w-6 h-6' />
                    <div>
                      <p className='text-sm'>{entry.date}</p>
                      <Badge>{moodEmojis[entry.mood]?.label}</Badge>
                    </div>
                  </div>
                  <p className='mt-4 line-clamp-2'>{entry.entry}</p>
                </CardContent>
              </Card>
            );
          })}

          {entries.length === 0 && (
            <Card>
              <CardContent className='py-16 text-center'>
                <BookHeart className='mx-auto w-16 h-16 opacity-30' />
                <p className='mt-4 text-muted-foreground'>
                  No journal entries yet
                </p>
              </CardContent>
            </Card>
          )}
        </>
      )}

      <MoodDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        moodEntry={selectedEntry}
        mode={dialogMode}
        onSave={handleSaveEntry}
        onDelete={handleDeleteEntry}
      />
    </div>
  );
}

/* ---------------------------------- */
/* Provider Wrapper */
/* ---------------------------------- */

export default function CONTEXTED() {
  return (
    <MoodJournalProvider>
      <MoodJournal />
    </MoodJournalProvider>
  );
}
