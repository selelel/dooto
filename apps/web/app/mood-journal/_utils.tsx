import React from "react";
import { MOOD } from "@/modules/mood-journal/types";
import { Laugh, Smile, Meh, Frown, Clock } from "lucide-react";
import {
  ICommand,
  TextAreaTextApi,
  TextState,
} from "@uiw/react-md-editor/commands";
import { normalize } from "path";
import { Button } from "@/components/ui/button";

export const moodEmojis: Record<
  MOOD,
  {
    icon: React.ElementType;
    label: string;
    color: string;
    bg: string;
  }
> = {
  HAPPY: {
    icon: Laugh,
    label: "Happy",
    color: "text-success border-success",
    bg: "bg-success/10",
  },
  SAD: {
    icon: Frown,
    label: "Sad",
    color: "text-secondary border-secondary",
    bg: "bg-secondary/10",
  },
  ANGRY: {
    icon: Frown,
    label: "Angry",
    color: "text-destructive border-destructive",
    bg: "bg-destructive/10",
  },
  ANXIOUS: {
    icon: Meh,
    label: "Anxious",
    color: "text-secondary border-secondary",
    bg: "bg-secondary/10",
  },
  EXCITED: {
    icon: Smile,
    label: "Excited",
    color: "text-primary border-primary",
    bg: "bg-primary/10",
  },
  CALM: {
    icon: Smile,
    label: "Calm",
    color: "text-primary border-primary",
    bg: "bg-primary/10",
  },
};

export const insertTimestamp = (mood?: string): ICommand => {
  return {
    name: "Timestamp",
    keyCommand: "Timestamp",
    buttonProps: {
      "aria-label": "timestamp",
      title: "timestamp",
    },
    icon: (
      <Button asChild className='h-full p-2 text-xs cursor-pointer'>
        <div>Timestamp</div>
      </Button>
    ),
    execute: (state: TextState, api: TextAreaTextApi) => {
      const now = new Date();
      const timeString = now.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });

      const textToInsert = `\n ###### ${timeString}-${mood ? `${mood}` : ""} \n`;

      api.replaceSelection(textToInsert);

      const cursor = state.selection;
      api.setSelectionRange({
        start: cursor.start + textToInsert.length,
        end: cursor.start + textToInsert.length,
      });
    },
  };
};
