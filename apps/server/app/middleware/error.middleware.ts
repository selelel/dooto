import type { Request, Response, NextFunction } from 'express'
import { Prisma } from '../generated/prisma/client'
import { getPrismaError } from '../utils/error/get-prisma-error'


export function errorMiddleware(
  err: unknown,
  _: Request,
  res: Response,
  next: NextFunction
): Response {
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    const prismaError = getPrismaError(err)

    return res.status(prismaError.status).json({
      code: prismaError.code,
      name: prismaError.name,
      message: prismaError.message,
      metaData: prismaError.metaData,
    })
  }

  return res.status(500).json({
    name: 'InternalServerError',
    message: 'Something went wrong. Please try again later.',
  })
}
