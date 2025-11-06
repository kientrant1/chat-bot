import { siteConfig } from '@/constants/siteConfig'
import { prisma } from '@/lib/prisma'

// Maximum number of requests allowed per user per day
const MAX_REQUESTS_PER_DAY = siteConfig.maxChatRequestPerDay

/**
 * Check if user has exceeded their daily request limit
 * If a new day has started, reset the counter
 * @param userId - The user's ID
 * @returns true if user can make a request, false if limit exceeded
 */
export async function checkDailyLimit(
  userId: string
): Promise<{ isValidRateLimit: boolean; remaining: number }> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { requestCount: true, lastRequestDate: true },
  })

  if (!user) {
    throw new Error('User not found')
  }

  const remaining = Math.max(0, MAX_REQUESTS_PER_DAY - user.requestCount)

  const today = new Date()
  today.setHours(0, 0, 0, 0) // Reset to start of day

  const lastRequestDate = user.lastRequestDate
    ? new Date(user.lastRequestDate)
    : null
  lastRequestDate?.setHours(0, 0, 0, 0)

  // Check if it's a new day - reset counter
  if (!lastRequestDate || lastRequestDate.getTime() !== today.getTime()) {
    await prisma.user.update({
      where: { id: userId },
      data: {
        requestCount: 0,
        lastRequestDate: new Date(),
      },
    })
    return {
      isValidRateLimit: true,
      remaining: MAX_REQUESTS_PER_DAY,
    }
  }

  // Check if user has exceeded daily limit
  return {
    isValidRateLimit: user.requestCount < MAX_REQUESTS_PER_DAY,
    remaining,
  }
}

/**
 * Increment the user's request counter
 * @param userId - The user's ID
 */
export async function incrementRequestCount(userId: string): Promise<void> {
  await prisma.user.update({
    where: { id: userId },
    data: {
      requestCount: { increment: 1 },
      lastRequestDate: new Date(),
    },
  })
}

/**
 * Get the remaining requests for a user today
 * @param userId - The user's ID
 * @returns The number of requests remaining
 */
export async function getRemainingRequests(userId: string): Promise<number> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { requestCount: true, lastRequestDate: true },
  })

  if (!user) {
    return MAX_REQUESTS_PER_DAY
  }

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const lastRequestDate = user.lastRequestDate
    ? new Date(user.lastRequestDate)
    : null
  lastRequestDate?.setHours(0, 0, 0, 0)

  // If it's a new day, they have the full limit available
  if (!lastRequestDate || lastRequestDate.getTime() !== today.getTime()) {
    return MAX_REQUESTS_PER_DAY
  }

  return Math.max(0, MAX_REQUESTS_PER_DAY - user.requestCount)
}

export { MAX_REQUESTS_PER_DAY }
