import z from "zod";

export const POSTHabitDTO = z.object({
  habitName: z.string(),
  categoryId: z.string().optional(),
  details: z.string().optional(),
})

export const POSTAddContributionDTO = z.object({
  completed: z.boolean().optional(),
})


export type POSTHabitT = z.infer<typeof POSTHabitDTO>
export type POSTAddContributionT = z.infer<typeof POSTAddContributionDTO>