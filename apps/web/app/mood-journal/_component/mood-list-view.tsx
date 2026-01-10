import { Card, CardContent } from "@/components/ui/card";
import React from "react";
import { useMoodJournal } from "../_context/mood-journal-context";
import { moodEmojis } from "../_utils";
import { BookHeart } from "lucide-react";
import MoodNewEntry from "./mood-new-entry";
import MoodIndividual from "./mood-individual";

function MoodListView() {
  const { data } = useMoodJournal();
  return (
    <>
      <MoodNewEntry />
      <div className='flex flex-col gap-8'>
        {data.map((entry, idx) => {
          const Icon = moodEmojis[entry.mood]?.icon;
          return <MoodIndividual key={idx} Icon={Icon} entry={entry} />;
        })}
      </div>

      {data.length === 0 && (
        <Card>
          <CardContent className='py-16 text-center'>
            <BookHeart className='mx-auto w-16 h-16 opacity-30' />
            <p className='mt-4 text-muted-foreground'>No journal entries yet</p>
          </CardContent>
        </Card>
      )}
    </>
  );
}

export default MoodListView;
