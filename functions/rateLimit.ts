import { siteConfig } from '@/constants/siteConfig'
import { prisma } from '@/lib/prisma'
import { calculateRemainingRequests, isNotRequestedToday } from '@/utils/chat'
import logger from '@/utils/logger'

// Maximum number of requests allowed per user per day
const MAX_REQUESTS_PER_DAY = siteConfig.maxChatRequestPerDay

/* TODO: Potential race condition between checking and resetting the counter.
If multiple requests arrive simultaneously on a new day, they could all read the old counter, all see that it's a new day, and all reset the counter to 0 before any increment happens.
This could allow users to exceed their daily limit.
Consider using a database transaction or atomic update to prevent this race condition.
*/
const resetLimitRateCounter = async (user: {
  lastRequestDate: Date | null
  id: string
  requestCount: number
}) => {
  // Check if it's a new day - reset counter
  if (isNotRequestedToday(user.lastRequestDate)) {
    await prisma.user.update({
      where: { id: user.id },
      data: {
        requestCount: 0,
        lastRequestDate: new Date(),
      },
    })
    return true
  }
  return false
}

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
    select: { id: true, requestCount: true, lastRequestDate: true },
  })

  if (!user) {
    throw new Error('User not found')
  }

  const remaining = calculateRemainingRequests(user.requestCount)

  const isResetLimitRateCounter = await resetLimitRateCounter(user)

  if (isResetLimitRateCounter) {
    return { isValidRateLimit: true, remaining: MAX_REQUESTS_PER_DAY }
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
    logger.error('User not found')
    return MAX_REQUESTS_PER_DAY
  }

  // If it's a new day, they have the full limit available
  if (isNotRequestedToday(user.lastRequestDate)) {
    return MAX_REQUESTS_PER_DAY
  }

  return calculateRemainingRequests(user.requestCount)
}

export { MAX_REQUESTS_PER_DAY }
