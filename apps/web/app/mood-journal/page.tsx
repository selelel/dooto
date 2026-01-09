"use client";

import { useEffect, useState } from "react";
import {
  Smile,
  Meh,
  Frown,
  Laugh,
  Heart,
  BookHeart,
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
import MoodHeader from "./_component/mood-header";
import { moodEmojis } from "./_utils";
import MoodListView from "./_component/mood-list-view";

/* ---------------------------------- */
/* Types */
/* ---------------------------------- */

/* ---------------------------------- */
/* Mood Config */
/* ---------------------------------- */

/* ---------------------------------- */
/* Main Component */
/* ---------------------------------- */

function MoodJournal() {
  /* ---------------------------------- */
  /* Map API data -> UI entries */
  /* ---------------------------------- */

  /* ---------------------------------- */
  /* Handlers */
  /* ---------------------------------- */

  /* ---------------------------------- */
  /* Render */
  /* ---------------------------------- */

  return (
    <div className='p-8 max-w-6xl mx-auto'>
      {/* Header */}
      <MoodHeader />

      {/* {true && (
        <MoodCalendar
          entries={entries}
          onDateClick={handleDateClick}
          currentMonth={currentMonth}
          onMonthChange={setCurrentMonth}
        />
      )} */}

      {true && <MoodListView />}

      {/* <MoodDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        moodEntry={selectedEntry}
        mode={dialogMode}
        onSave={handleSaveEntry}
        onDelete={handleDeleteEntry}
      /> */}
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
