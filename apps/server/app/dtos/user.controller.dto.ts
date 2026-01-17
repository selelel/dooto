import z from "zod";

export const registerDTO = z.object({
  body: z.object({
    name: z.string().min(2),
    username: z.string().min(3),
    email: z.email(),
    password: z.string().min(6),
  }),
})

export const patchDTO = z.object({
  body: z.object({
    name: z.string().min(2).optional(),
    username: z.string().min(3).optional(),
    email: z.email().optional(),
    password: z.string().min(6).optional(),
  }),
})

export const signinDTO = z.object({
  body: z.object({
    email: z.email(),
    password: z.string(),
  }),
})

export const updateUserDTO = z.object({
  body: z.object({
    name: z.string().min(2),
    username: z.string().min(3),
    email: z.email(),
  }),
})

export const POSTCreateCategoryDTO = z.object({
  body: z.object({
     category: z.string()
  }),
})

export type POSTCreateUserT = z.infer<typeof registerDTO>['body']
export type POSTCreateCategoryT = z.infer<typeof POSTCreateCategoryDTO>