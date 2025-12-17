import z from "zod";

export const createTasksCollectionSchema = z.object({
  tasksName: z.string(),
  details: z.string(),
  due: z.date().optional(),
  task: z.any().optional(),
  userId: z.string(),
})

export type CreateTasksCollectionT = z.infer<typeof createTasksCollectionSchema>