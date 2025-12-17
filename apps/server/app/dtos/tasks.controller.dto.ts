import z from "zod";

export const POSTtasksDTO = z.object({
  tasksName: z.string(),
  details: z.string(),
  due: z.date().optional(),
  task: z.any().optional(),
  userId: z.string(),
})

export const PATCHtasksDTO = z.object({
  tasksName: z.string().optional(),
  details: z.string().optional(),
  due: z.date().optional().optional(),
})

export const POSTtaskDTO = z.object({
  taskName: z.string(),
  details: z.string(),
  due: z.date().optional(),
  tasksId: z.string(),
  task: z.any().optional(),
  subclassId: z.string().optional(),
  status: z.enum(['DONE', 'IN_PROGRESS', 'PENDING']),
})

export const PATCHtaskDTO = z.object({
  taskId: z.string(),
  tasksId: z.string(),
  tasksName: z.string().optional(),
  details: z.string().optional(),
  due: z.date().optional(),
  task: z.any().optional(),
  subclassId: z.string().optional(),
  status: z.enum(['DONE', 'IN_PROGRESS', 'PENDING']).optional(),
});

export const DELETEtaskDTO = z.object({
  id: z.string(),
});

export type POSTtasksT = z.infer<typeof POSTtasksDTO>
