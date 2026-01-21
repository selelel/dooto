"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { insertTimestamp, moodEmojis } from "../_utils";
import { cn, normalizeDate } from "@/lib/utils";
import { useMoodJournal } from "../_context/mood-journal-context";
import Editor from "@/components/ui/editor";
import { getCommands } from "@uiw/react-md-editor";

export const MOODS = [
  "HAPPY",
  "SAD",
  "ANGRY",
  "ANXIOUS",
  "EXCITED",
  "CALM",
] as const;

export type MOOD = (typeof MOODS)[number];

export const moodEntrySchema = z.object({
  mood: z.enum(MOODS),
  note: z.string().min(1, "Please write something"),
});

export type MoodEntryFormValues = z.infer<typeof moodEntrySchema>;

function MoodNewEntry() {
  const timeString = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const { data, handleCreateMoodJournal, handleUpdateMoodJournal } =
    useMoodJournal();
  const toUpdateRef = React.useRef<string | null>(null);

  const form = useForm<MoodEntryFormValues>({
    resolver: zodResolver(moodEntrySchema),
    mode: "onChange",
    defaultValues: {
      note: `\n ###### ${timeString} \n`,
    },
  });

  const mood = form.watch("mood");

  useEffect(() => {
    if (!data.length) return;

    const latestEntry = data[0]!;
    const moodDate = normalizeDate(new Date(latestEntry.date));
    const today = normalizeDate(new Date());

    if (moodDate === today) {
      toUpdateRef.current = latestEntry.id;
      form.reset({
        mood: latestEntry.mood,
        note: latestEntry.note,
      });
    }
  }, [data, form]);

  const onSubmit = (values: MoodEntryFormValues) => {
    if (toUpdateRef.current) {
      handleUpdateMoodJournal({
        id: toUpdateRef.current,
        mood: values.mood,
        note: values.note,
      });
      return;
    }
    handleCreateMoodJournal({
      mood: values.mood,
      note: values.note,
      date: normalizeDate(new Date()),
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card className='mb-8'>
          <CardHeader>
            <CardTitle>How are you feeling today?</CardTitle>
          </CardHeader>

          <CardContent className='space-y-6'>
            <FormField
              name='mood'
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select your mood</FormLabel>
                  <FormControl>
                    <div className='grid grid-cols-1 sm:grid-cols-3 md:grid-cols-6 gap-3'>
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
                                : "border-border",
                            )}
                          >
                            <Icon
                              className={cn(
                                "w-6 h-6 mx-auto",
                                isSelected && config.color,
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
                  <FormLabel>Notes</FormLabel>
                  <FormDescription className='text-xs'>
                    Write anything you’re feeling or want to remember.
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

            <Button
              disabled={!form.formState.isValid}
              className={cn(
                "w-full cursor-pointer",
                !form.formState.isValid && "opacity-50 cursor-not-allowed",
              )}
              type='submit'
            >
              {toUpdateRef.current ? "Update Entry" : "Save Entry"}
            </Button>
          </CardContent>
        </Card>
      </form>
    </Form>
  );
}

export default MoodNewEntry;
