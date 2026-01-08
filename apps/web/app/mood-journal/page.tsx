"use client";
import { useState } from "react";
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

interface JournalEntry {
  id: number;
  date: string;
  mood: "great" | "good" | "okay" | "sad" | "stressed";
  entry: string;
  gratitude?: string;
}

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

export default function MoodJournal() {
  const [entries, setEntries] = useState<JournalEntry[]>([
    {
      id: 1,
      date: "January 8, 2026",
      mood: "great",
      entry:
        "Had an amazing day! Completed all my tasks and felt very productive. The weather was beautiful.",
      gratitude: "Grateful for my supportive team and good health.",
    },
    {
      id: 2,
      date: "January 7, 2026",
      mood: "good",
      entry:
        "Solid day overall. Morning meditation helped me start the day with clarity.",
      gratitude: "Thankful for quiet mornings.",
    },
    {
      id: 3,
      date: "January 6, 2026",
      mood: "okay",
      entry:
        "A bit of a challenging day with some unexpected issues, but managed to handle them.",
    },
    {
      id: 4,
      date: "January 5, 2026",
      mood: "good",
      entry:
        "Made good progress on my projects. Feeling accomplished and motivated.",
      gratitude: "Grateful for new opportunities.",
    },
    {
      id: 5,
      date: "January 4, 2026",
      mood: "stressed",
      entry:
        "Busy day with tight deadlines. Felt a bit overwhelmed but pushed through.",
    },
    {
      id: 6,
      date: "January 3, 2026",
      mood: "great",
      entry: "Wonderful start to the new year! Spent quality time with family.",
      gratitude: "Thankful for family and friends.",
    },
    {
      id: 7,
      date: "January 2, 2026",
      mood: "good",
      entry: "Relaxing day, enjoyed some downtime and reflection.",
      gratitude: "Grateful for moments of peace.",
    },
    {
      id: 8,
      date: "January 1, 2026",
      mood: "great",
      entry:
        "New Year's Day! Feeling optimistic and excited about the year ahead.",
      gratitude: "Thankful for new beginnings and possibilities.",
    },
    {
      id: 9,
      date: "December 31, 2025",
      mood: "good",
      entry: "Reflected on the past year. So much growth and learning.",
      gratitude: "Grateful for all the experiences, both good and challenging.",
    },
    {
      id: 10,
      date: "December 30, 2025",
      mood: "okay",
      entry: "Preparing for the new year. Mixed feelings but hopeful.",
    },
    {
      id: 11,
      date: "December 28, 2025",
      mood: "good",
      entry: "Great holiday time with loved ones. Feeling recharged.",
      gratitude: "Thankful for meaningful connections.",
    },
    {
      id: 12,
      date: "December 27, 2025",
      mood: "sad",
      entry: "Missing some people today. It's okay to feel this way sometimes.",
    },
    {
      id: 13,
      date: "December 25, 2025",
      mood: "great",
      entry: "Beautiful holiday celebration! So much joy and laughter.",
      gratitude: "Grateful for love, warmth, and togetherness.",
    },
  ]);

  const [selectedMood, setSelectedMood] = useState<
    (typeof entries)[0]["mood"] | null
  >(null);
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
  const [selectedDate, setSelectedDate] = useState<string>("");

  const addEntry = () => {
    if (selectedMood && journalText.trim()) {
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
    }
  };

  const handleDateClick = (entry: JournalEntry | null, dateString: string) => {
    if (entry) {
      // Existing entry - open in view mode
      setSelectedEntry(entry);
      setSelectedDate(dateString);
      setDialogMode("view");
      setDialogOpen(true);
    } else {
      // No entry - open in create mode
      setSelectedEntry(null);
      setSelectedDate(dateString);
      setDialogMode("create");
      setDialogOpen(true);
    }
  };

  const handleEntryClick = (entry: JournalEntry) => {
    setSelectedEntry(entry);
    setSelectedDate(entry.date);
    setDialogMode("view");
    setDialogOpen(true);
  };

  const handleSaveEntry = (data: Partial<JournalEntry>) => {
    if (dialogMode === "create") {
      // Create new entry
      const newEntry: JournalEntry = {
        id: Date.now(),
        date: selectedDate,
        mood: data.mood!,
        entry: data.entry!,
        gratitude: data.gratitude,
      };
      setEntries([newEntry, ...entries]);
    } else {
      // Update existing entry
      setEntries(
        entries.map((entry) =>
          entry.id === selectedEntry?.id ? { ...entry, ...data } : entry
        )
      );
    }
  };

  const handleDeleteEntry = (id: number) => {
    setEntries(entries.filter((entry) => entry.id !== id));
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

        {/* View Toggle */}
        <div className='flex items-center gap-2 bg-muted rounded-lg p-1'>
          <Button
            variant={view === "list" ? "default" : "ghost"}
            size='sm'
            onClick={() => setView("list")}
            className={view === "list" ? "bg-background shadow-sm" : ""}
          >
            <List className='w-4 h-4 mr-2' />
            List
          </Button>
          <Button
            variant={view === "calendar" ? "default" : "ghost"}
            size='sm'
            onClick={() => setView("calendar")}
            className={view === "calendar" ? "bg-background shadow-sm" : ""}
          >
            <CalendarViewIcon className='w-4 h-4 mr-2' />
            Calendar
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-8'>
        <Card className='shadow-sm border-l-4 border-l-primary'>
          <CardContent className='p-4'>
            <div className='flex items-center gap-3'>
              <div className='w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center'>
                <CalendarIcon className='w-5 h-5 text-primary' />
              </div>
              <div>
                <p className='text-2xl'>{entries.length}</p>
                <p className='text-xs text-muted-foreground'>Total Entries</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className='shadow-sm border-l-4 border-l-success'>
          <CardContent className='p-4'>
            <div className='flex items-center gap-3'>
              <div className='w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center'>
                <Heart className='w-5 h-5 text-success' />
              </div>
              <div>
                <p className='text-2xl'>7</p>
                <p className='text-xs text-muted-foreground'>Day Streak</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className='shadow-sm border-l-4 border-l-secondary'>
          <CardContent className='p-4'>
            <div className='flex items-center gap-3'>
              <div className='w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center'>
                <Smile className='w-5 h-5 text-secondary' />
              </div>
              <div>
                <p className='text-2xl capitalize'>{mostCommonMood || "N/A"}</p>
                <p className='text-xs text-muted-foreground'>Most Common</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Calendar View */}
      {view === "calendar" && (
        <div className='space-y-6'>
          <MoodCalendar
            entries={entries}
            onDateClick={handleDateClick}
            currentMonth={currentMonth}
            onMonthChange={setCurrentMonth}
          />

          {/* Calendar Info Card */}
          <Card className='shadow-sm bg-gradient-to-br from-primary/5 to-transparent border-primary/20'>
            <CardContent className='p-6'>
              <div className='flex items-start gap-3'>
                <div className='w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0'>
                  <CalendarViewIcon className='w-5 h-5 text-primary' />
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
      )}

      {/* List View */}
      {view === "list" && (
        <>
          {/* New Entry */}
          <Card className='mb-8 shadow-sm border-primary/20'>
            <CardHeader>
              <CardTitle>How are you feeling today?</CardTitle>
            </CardHeader>
            <CardContent className='space-y-6'>
              {/* Mood Selector */}
              <div>
                <label className='text-sm mb-3 block'>Select your mood</label>
                <div className='flex gap-3'>
                  {(
                    Object.keys(moodEmojis) as Array<keyof typeof moodEmojis>
                  ).map((mood) => {
                    const MoodIcon = moodEmojis[mood].icon;
                    return (
                      <button
                        key={mood}
                        onClick={() => setSelectedMood(mood)}
                        className={`flex-1 p-4 rounded-xl border-2 transition-all ${
                          selectedMood === mood
                            ? `${moodEmojis[mood].bg} border-current ${moodEmojis[mood].color}`
                            : "border-border hover:bg-muted/50"
                        }`}
                      >
                        <MoodIcon
                          className={`w-8 h-8 mx-auto mb-2 ${
                            selectedMood === mood
                              ? moodEmojis[mood].color
                              : "text-muted-foreground"
                          }`}
                        />
                        <p className='text-xs'>{moodEmojis[mood].label}</p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Journal Entry */}
              <div>
                <label className='text-sm mb-2 block'>
                  What's on your mind?
                </label>
                <Textarea
                  placeholder="Write about your day, your thoughts, or anything you'd like to remember..."
                  value={journalText}
                  onChange={(e) => setJournalText(e.target.value)}
                  rows={4}
                  className='resize-none'
                />
              </div>

              {/* Gratitude */}
              <div>
                <label className='text-sm mb-2 block'>
                  What are you grateful for? (Optional)
                </label>
                <Textarea
                  placeholder="List 1-3 things you're grateful for today..."
                  value={gratitudeText}
                  onChange={(e) => setGratitudeText(e.target.value)}
                  rows={2}
                  className='resize-none'
                />
              </div>

              <Button
                onClick={addEntry}
                disabled={!selectedMood || !journalText.trim()}
                className='w-full bg-primary hover:bg-primary/90'
              >
                Save Entry
              </Button>
            </CardContent>
          </Card>

          {/* Previous Entries */}
          <div className='space-y-4'>
            <h2 className='text-2xl mb-4'>Previous Entries</h2>

            {entries.map((entry) => {
              const MoodIcon = moodEmojis[entry.mood].icon;
              return (
                <Card
                  key={entry.id}
                  className='shadow-sm hover:shadow-md transition-shadow cursor-pointer'
                  onClick={() => handleEntryClick(entry)}
                >
                  <CardContent className='p-6'>
                    <div className='flex items-start justify-between mb-4'>
                      <div className='flex items-center gap-3'>
                        <div
                          className={`p-3 rounded-xl ${moodEmojis[entry.mood].bg}`}
                        >
                          <MoodIcon
                            className={`w-6 h-6 ${moodEmojis[entry.mood].color}`}
                          />
                        </div>
                        <div>
                          <p className='text-sm text-muted-foreground'>
                            {entry.date}
                          </p>
                          <Badge
                            className={`mt-1 ${moodEmojis[entry.mood].bg} ${moodEmojis[entry.mood].color}`}
                          >
                            {moodEmojis[entry.mood].label}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <div className='space-y-3'>
                      <p className='text-foreground leading-relaxed line-clamp-2'>
                        {entry.entry}
                      </p>

                      {entry.gratitude && (
                        <div className='p-4 rounded-lg bg-gradient-to-br from-accent/20 to-transparent border border-accent/30'>
                          <p className='text-sm mb-1 flex items-center gap-2'>
                            <Heart className='w-4 h-4 text-success' />
                            <span className='text-muted-foreground'>
                              Grateful for:
                            </span>
                          </p>
                          <p className='text-sm line-clamp-1'>
                            {entry.gratitude}
                          </p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Empty State */}
          {entries.length === 0 && (
            <Card className='shadow-sm'>
              <CardContent className='py-16 text-center'>
                <BookHeart className='w-16 h-16 text-muted-foreground/30 mx-auto mb-4' />
                <h3 className='text-xl mb-2'>No journal entries yet</h3>
                <p className='text-muted-foreground mb-6'>
                  Start journaling to track your mood and reflect on your days
                </p>
              </CardContent>
            </Card>
          )}
        </>
      )}

      {/* Mood Dialog */}
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
