// Import from prisma/generated if you custom 'output' path in schema.prisma
// otherwise, use below import
import { PrismaClient } from '@prisma/client'
// import { PrismaClient } from '@/prisma/generated/client'

const globalForPrisma = global as unknown as {
  prisma: PrismaClient | undefined
}

export const getPrisma = () => {
  return (
    globalForPrisma.prisma ??
    new PrismaClient({
      log: ['query', 'error', 'warn'],
    })
  )
}

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = getPrisma()
}
