import React, { useMemo } from "react";
import { format } from "date-fns";
import { Calendar, BookHeart, Edit2, Trash2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { getCommands } from "@uiw/react-md-editor";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Markdown from "@/components/ui/markdown";
import Editor from "@/components/ui/editor";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { cn } from "@/lib/utils";
import { insertTimestamp, moodEmojis } from "../_utils";
import { POSTMoodJournalResponse } from "@/modules/mood-journal/types";
import { MoodEntryFormValues, moodEntrySchema, MOODS } from "./mood-new-entry";
import { useMoodJournal } from "../_context/mood-journal-context";

type MoodDialogViewProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  data: POSTMoodJournalResponse;
};

export default function MoodDialogView({
  open,
  onOpenChange,
  data,
}: MoodDialogViewProps) {
  const { handleUpdateMoodJournal } = useMoodJournal();
  const [mode, setMode] = React.useState<"view" | "edit">("view");

  const MoodIcon = React.useMemo(() => moodEmojis[data.mood].icon, [data.mood]);

  const timeString = React.useMemo(
    () => format(new Date(), "MMM d, yyyy • HH:mm"),
    []
  );

  const curr: POSTMoodJournalResponse = useMemo(() => data, [data]);

  const form = useForm<MoodEntryFormValues>({
    resolver: zodResolver(moodEntrySchema),
    mode: "onChange",
    defaultValues: {
      mood: curr.mood,
      note: `${curr.note}\n ###### ${timeString} - ${curr.mood}\n`,
    },
  });

  const handleSubmit = (values: MoodEntryFormValues) => {
    handleUpdateMoodJournal({
      id: data.id,
      mood: values.mood,
      note: values.note,
    });
    setMode("view");
  };

  const VIEW = () => (
    <>
      <DialogHeader>
        <div className='flex items-start justify-between gap-4 mb-4'>
          <div className='flex items-start gap-3 flex-1'>
            <div
              className={cn(
                "p-3 rounded-xl border",
                moodEmojis[data.mood].bg,
                moodEmojis[data.mood].color
              )}
            >
              <MoodIcon className='w-7 h-7' />
            </div>

            <div className='flex-1'>
              <DialogTitle className='text-xl mb-2'>
                Feeling {moodEmojis[data.mood].label}
              </DialogTitle>

              <div className='flex items-center gap-2 text-sm text-muted-foreground'>
                <Calendar className='w-4 h-4' />
                <span>{format(new Date(data.date), "EEEE, MMMM d, yyyy")}</span>
              </div>
            </div>
          </div>
        </div>
      </DialogHeader>

      <div className='space-y-6'>
        <div className='flex items-center gap-2 mb-3'>
          <BookHeart className='w-4 h-4 text-muted-foreground' />
          <p className='text-sm font-medium'>Journal Entry</p>
        </div>

        <Markdown>{data.note}</Markdown>
      </div>
    </>
  );

  const EDIT = () => (
    <>
      <DialogHeader>
        <DialogTitle className='text-xl mb-2'>Edit Journal Entry</DialogTitle>
        <p className='text-sm text-muted-foreground'>
          Update your journal entry
        </p>
      </DialogHeader>

      <Form {...form}>
        <form
          id='mood-edit-form'
          onSubmit={form.handleSubmit(handleSubmit)}
          className='space-y-6'
        >
          {/* Mood Selector */}
          <FormField
            name='mood'
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Select your mood</FormLabel>
                <FormControl>
                  <div className='flex gap-3'>
                    {MOODS.map((mood) => {
                      const config = moodEmojis[mood];
                      const Icon = config.icon;
                      const isSelected = field.value === mood;

                      return (
                        <button
                          key={mood}
                          type='button'
                          onClick={() => field.onChange(mood)}
                          className={cn(
                            "flex-1 p-4 rounded-xl border transition duration-200 hover:scale-105",
                            isSelected
                              ? cn(config.bg, "border-2", config.color)
                              : "border-border"
                          )}
                        >
                          <Icon
                            className={cn(
                              "w-6 h-6 mx-auto",
                              isSelected && config.color
                            )}
                          />
                          <p className='text-xs mt-1'>{config.label}</p>
                        </button>
                      );
                    })}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Notes */}
          <FormField
            name='note'
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Notes</FormLabel>
                <FormDescription className='text-xs'>
                  Write anything you’re feeling or want to remember.
                </FormDescription>
                <FormControl>
                  <Editor
                    {...field}
                    height={300}
                    value={field.value}
                    onChange={(val) => field.onChange(val || "")}
                    commands={[
                      ...getCommands(),
                      insertTimestamp(form.getValues("mood")),
                    ]}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </>
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-3xl'>
        {mode === "view" && <VIEW />}
        {mode === "edit" && <EDIT />}

        <DialogFooter className='gap-2'>
          {mode === "view" && (
            <>
              <Button
                variant='outline'
                className='flex-1'
                onClick={() => setMode("edit")}
              >
                <Edit2 className='w-4 h-4 mr-2' />
                Edit Entry
              </Button>

              <Button variant='destructive'>
                <Trash2 className='w-4 h-4' />
              </Button>
            </>
          )}

          {mode === "edit" && (
            <>
              <Button
                type='button'
                variant='outline'
                onClick={() => setMode("view")}
              >
                Cancel
              </Button>

              <Button
                type='submit'
                form='mood-edit-form'
                disabled={!form.formState.isValid}
              >
                Save Changes
              </Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
