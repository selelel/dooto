import z from "zod";

export const POSTHabitDTO = z.object({
  body : z.object({
    habitName: z.string(),
    categoryId: z.string().optional(),
    details: z.string().optional(),
  })
})

export const POSTAddContributionDTO = z.object({
  body : z.object({
    completed: z.boolean().optional(),
  }),
  params: {
    id: z.string(),
  }
})

export const GEThabitDTO = z.object({
  query : z.object({
    from: z.string().optional(),
    to : z.string().optional(),
    categoryId :z.boolean().optional()
  })
})

export type POSTHabitT = z.infer<typeof POSTHabitDTO>['body']
export type POSTAddContributionT = z.infer<typeof POSTAddContributionDTO>['body']