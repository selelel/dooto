import React, { useEffect, useMemo } from "react";
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

import { cn, normalizeDate } from "@/lib/utils";
import { insertTimestamp, moodEmojis } from "../_utils";
import { MoodEntryFormValues, moodEntrySchema, MOODS } from "./mood-new-entry";
import { useMoodJournal } from "../_context/mood-journal-context";

type MoodDialogViewProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  date: Date;
};

export default function MoodDialogCreate({
  open,
  onOpenChange,
  date,
}: MoodDialogViewProps) {
  const timeString = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const { handleCreateMoodJournal } = useMoodJournal();
  const form = useForm<MoodEntryFormValues>({
    resolver: zodResolver(moodEntrySchema),
    mode: "onChange",
    defaultValues: {
      note: `\n ###### ${timeString} \n`,
    },
  });

  const mood = form.watch("mood");

  const onSubmit = (values: MoodEntryFormValues) => {
    handleCreateMoodJournal({
      mood: values.mood,
      note: values.note,
      date: normalizeDate(date),
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Dialog open={open} onOpenChange={onOpenChange}>
          <DialogContent className='sm:max-w-3xl'>
            <DialogHeader>
              <DialogTitle className='text-xl'>
                How are you feeling?
              </DialogTitle>
              <p className='text-sm text-muted-foreground'>
                Capture your mood and thoughts for{" "}
                <span className='font-medium'>
                  {format(date, "MMMM d, yyyy")}
                </span>
              </p>
            </DialogHeader>

            <FormField
              name='mood'
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select your mood</FormLabel>
                  <FormDescription className='text-xs'>
                    Choose the option that best matches how you feel right now.
                  </FormDescription>
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
                              "flex-1 p-4 rounded-xl border transition cursor-pointer duration-200 hover:scale-105",
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
            <FormField
              name='note'
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Journal notes</FormLabel>
                  <FormDescription className='text-xs'>
                    Write freely — thoughts, events, or anything that stood out
                    today.
                  </FormDescription>
                  <FormControl>
                    <Editor
                      commands={[...getCommands(), insertTimestamp(mood)]}
                      {...field}
                      value={field.value}
                      onChange={(val) => field.onChange(val || "")}
                      height={300}
                    />
                  </FormControl>
                  <FormMessage className='mt-2' />
                </FormItem>
              )}
            />

            <DialogFooter className='gap-2'>
              <Button
                disabled={!form.formState.isValid}
                className={cn(
                  "w-full",
                  !form.formState.isValid && "opacity-50 cursor-not-allowed"
                )}
                type='submit'
              >
                Save journal entry
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </form>
    </Form>
  );
}
