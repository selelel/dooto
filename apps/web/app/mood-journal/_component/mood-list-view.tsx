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

      {data.length > 0 ? (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          {data.map((entry) => {
            const Icon = moodEmojis[entry.mood]?.icon;

            return <MoodIndividual key={entry.id} Icon={Icon} entry={entry} />;
          })}
        </div>
      ) : (
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
