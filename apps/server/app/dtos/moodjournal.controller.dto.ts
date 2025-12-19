import z from "zod";

export const MoodEnum = z.enum(["HAPPY", "SAD", "ANGRY", "ANXIOUS", "EXCITED", "CALM"]);

export const POSTCreateMoodJournalDTO = z.object({
  note: z.string(),
  mood: MoodEnum,
  date: z.date()
})


export type POSTCreateMoodJournalT= z.infer<typeof POSTCreateMoodJournalDTO>