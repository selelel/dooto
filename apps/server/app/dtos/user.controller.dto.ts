import z from "zod";

export const registerDTO = z.object({
  body: z.object({
    name: z.string().min(2),
    username: z.string().min(3),
    email: z.email(),
    password: z.string().min(6),
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
