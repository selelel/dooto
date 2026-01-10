import { Card, CardContent } from "@/components/ui/card";
import { normalizeDate } from "@/lib/utils";
import { moodEmojis } from "../_utils";
import { POSTMoodJournalResponse } from "@/modules/mood-journal/types";
import { Badge } from "@/components/ui/badge";
import Markdown from "@/components/ui/markdown";
import MoodDialogView from "./mood-dialog-view";
import { useState } from "react";

function MoodIndividual({
  Icon,
  entry,
}: {
  Icon: React.ElementType;
  entry: POSTMoodJournalResponse;
}) {
  const [open, onOpenChange] = useState(false);
  return (
    <>
      <MoodDialogView data={entry} open={open} onOpenChange={onOpenChange} />
      <Card
        onClick={() => {
          onOpenChange(true);
        }}
        key={entry.id}
        className='shadow-sm hover:shadow-md transition-shadow cursor-pointer'
      >
        <CardContent>
          <div className='flex items-start justify-between mb-4'>
            <div className='flex items-center gap-3'>
              <div
                className={`p-3 rounded-xl ${moodEmojis[entry.mood].bg} ${moodEmojis[entry.mood].color}`}
              >
                <Icon className={`w-6 h-6`} />
              </div>
              <div>
                <p className='text-sm text-muted-foreground'>
                  {new Date(normalizeDate(entry.date)).toLocaleDateString(
                    "en-US",
                    {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    }
                  )}
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
            <Markdown>{entry.note}</Markdown>
          </div>
        </CardContent>
      </Card>
    </>
  );
}

export default MoodIndividual;
