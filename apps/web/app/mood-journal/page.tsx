"use client";
import {
  MoodJournalProvider,
  useMoodJournal,
} from "./_context/mood-journal-context";
import MoodHeader from "./_component/mood-header";
import MoodListView from "./_component/mood-list-view";
import MoodStats from "./_component/mood-stats";
import MoodCalendar from "./_component/mood-calendar";

function MoodJournal() {
  const { view } = useMoodJournal();

  return (
    <div className='p-8 max-w-6xl mx-auto'>
      <MoodHeader />
      <MoodStats />
      {view === "list" && <MoodListView />}
      {view === "calendar" && <MoodCalendar />}
    </div>
  );
}

export default function CONTEXTED() {
  return (
    <MoodJournalProvider>
      <MoodJournal />
    </MoodJournalProvider>
  );
}
