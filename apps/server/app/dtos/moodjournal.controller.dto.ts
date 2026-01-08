import z from "zod";
import { DELETEtasksDTO } from "./tasks.controller.dto";

export const MoodEnum = z.enum(["HAPPY", "SAD", "ANGRY", "ANXIOUS", "EXCITED", "CALM"]);

export const POSTCreateMoodJournalDTO = z.object({
  body : z.object({
    note: z.string(),
    mood: MoodEnum,
    date: z.string()
  })
})

export const DateRangeDTO = z.object({
  query : z.object({
    from: z.string().optional(),
    to:z.string().optional(),
  })
})

export const IdParams = DELETEtasksDTO

export type POSTCreateMoodJournalT= z.infer<typeof POSTCreateMoodJournalDTO>['body']