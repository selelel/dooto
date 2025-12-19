import z from "zod";

export const POSTCreateBadHabitDTO = z.object({
  body : z.object({
    habitName: z.string(),
    details: z.string().optional(),
  })
})

export type POSTCreateBadHabitT= z.infer<typeof POSTCreateBadHabitDTO>