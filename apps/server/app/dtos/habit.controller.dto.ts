import z from "zod";

export const POSTHabitDTO = z.object({
  body : z.object({
    habitName: z.string(),
    categoryId: z.string().optional(),
    details: z.string().optional(),
  })
})

export const POSTAddContributionDTO = z.object({
  params: {
    id: z.string(),
  }
})

export const GEThabitsDTO = z.object({
  query : z.object({
    categoryId :z.string().optional()
  })
})

export const GETtoggleDTO = z.object({
  query : z.object({
    date: z.string()
  }),
})

export const GEThabitDTO =  z.object({
  params : z.object({
    id :z.string().optional()
  }),
  query : z.object({
    from :z.string().optional(),
  to: z.string().optional(),
  }).optional()
})

export type POSTHabitT = z.infer<typeof POSTHabitDTO>['body']
export type POSTAddContributionT = z.infer<typeof POSTAddContributionDTO>