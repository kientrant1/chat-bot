// This is middleware of NextJS
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getServerSession } from '@/functions/session'
import { checkDailyLimit } from '@/functions/rateLimit'
import logger from '@/utils/logger'
import { siteConfig } from '@/constants/siteConfig'
import { API_URL } from '@/constants/url'

const checkRateLimitChatRequest = async () => {
  try {
    // Get the user's session token
    const session = await getServerSession()
    // Check if user is authenticated
    if (!session || !session.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized. Please log in.' },
        { status: 401 }
      )
    }

    const userId = session.user?.id
    const { isValidRateLimit, remaining } = await checkDailyLimit(userId)

    if (!isValidRateLimit) {
      return NextResponse.json(
        {
          error: 'Daily request limit exceeded. Please try again tomorrow.',
          remainingRequests: remaining,
          limit: siteConfig.maxChatRequestPerDay,
        },
        { status: 429 }
      )
    }
    // Allow the request to proceed
    return NextResponse.next()
  } catch (error) {
    logger.error('Middleware rate limit error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function proxy(request: NextRequest) {
  // Only apply rate limiting to chat API endpoint
  if (request.nextUrl.pathname === API_URL.CHAT) {
    return await checkRateLimitChatRequest()
  }

  // For all other routes, continue normally
  return NextResponse.next()
}
