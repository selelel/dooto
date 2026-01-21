import { Button } from "@/components/ui/button";
import { Calendar, List } from "lucide-react";
import React from "react";
import { useMoodJournal } from "../_context/mood-journal-context";
import { useWindowSize } from "@/lib/hooks/useWindowSize";
import { cn } from "@/lib/utils";

function MoodHeader() {
  const { width } = useWindowSize();
  const isDesktop = width >= 1024;
  const { view, setView } = useMoodJournal();

  return (
    <div
      className={cn(
        "w-full mb-8 space-y-6 flex flex-col",
        isDesktop && "flex-row justify-between items-center space-y-0",
      )}
    >
      <div>
        <h1 className='text-3xl md:text-4xl mb-2'>Mood Journal 📔</h1>
        <p className='text-muted-foreground text-sm md:text-base'>
          Reflect on your day and track your emotional well-being
        </p>
      </div>

      <div className='grid grid-cols-2 gap-2 bg-muted rounded-lg p-1 w-full md:w-fit'>
        <Button
          variant={view === "list" ? "default" : "ghost"}
          size='sm'
          className='w-full'
          onClick={() => setView("list")}
        >
          <List className='w-4 h-4 mr-2' />
          List
        </Button>

        <Button
          variant={view === "calendar" ? "default" : "ghost"}
          size='sm'
          className='w-full'
          onClick={() => setView("calendar")}
        >
          <Calendar className='w-4 h-4 mr-2' />
          Calendar
        </Button>
      </div>
    </div>
  );
}

export default MoodHeader;
