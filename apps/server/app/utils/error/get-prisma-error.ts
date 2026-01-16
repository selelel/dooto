import { Prisma } from '../../generated/prisma/client'
import { PRISMA_ERROR_CODES } from './prisma-error-codes'

export function getPrismaError(
  err: Prisma.PrismaClientKnownRequestError
) {
  const mapped =
    PRISMA_ERROR_CODES[
      err.code as keyof typeof PRISMA_ERROR_CODES
    ]

  return {
    code: err.code,
    name: mapped?.name ?? 'UnknownPrismaError',
    status: mapped?.status ?? 500,
    message: mapped?.message ?? 'A database error occurred.',
    metaData: err.meta,
  }
}
