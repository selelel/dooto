import { Button } from "@/components/ui/button";
import { Calendar, List } from "lucide-react";
import React, { useState } from "react";

function MoodHeader() {
  const [view, setView] = useState<"list" | "calendar">("list");
  return (
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
          <Calendar className='w-4 h-4 mr-2' />
          Calendar
        </Button>
      </div>
    </div>
  );
}

export default MoodHeader;
