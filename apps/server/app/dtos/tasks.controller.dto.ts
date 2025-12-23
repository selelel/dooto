import z from "zod";

export const POSTtasksDTO = z.object({
  body : z.object({
    tasksName: z.string(),
    details: z.string(),
    due: z.string().optional(),
    task: z.any().optional(),
  })
})

export const DELETEtasksDTO = z.object({
  params : z.object({
    id: z.string(),
  })
})

export const GETtasksDTO = z.object({
  query : z.object({
    id: z.string().optional(),
  })
})

export const PATCHtasksDTO = z.object({
  body : z.object({
    tasksName: z.string().optional(),
    details: z.string().optional(),
    due: z.string().optional().optional(),
  }),
  params : z.object({
    id: z.string(),
  })
})

export const POSTtaskDTO = z.object({
  body : z.object({
    taskName: z.string(),
    details: z.string(),
    due: z.string().optional(),
    tasksId: z.string(),
    task: z.any().optional(),
    subclassId: z.string().optional(),
    status: z.enum(['DONE', 'IN_PROGRESS', 'PENDING']),
  })
})

export const PATCHtaskDTO = z.object({
  body : z.object({
    taskId: z.string(),
    tasksId: z.string().optional(),
    tasksName: z.string().optional(),
    details: z.string().optional(),
    due: z.string().optional(),
    task: z.any().optional(),
    subclassId: z.string().optional(),
    status: z.enum(['DONE', 'IN_PROGRESS', 'PENDING']).optional(),
  })
});

export type POSTtasksT = z.infer<typeof POSTtasksDTO>['body']
