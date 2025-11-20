import { Session } from 'next-auth'
import { getServerSession as ServerSession } from 'next-auth/next'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { NextRequest, NextResponse } from 'next/server'
import logger from './logger'

export const getServerSession = async (): Promise<Session | null> => {
  return await ServerSession(authOptions)
}

/**
 * Wrapper function for API routes that require authentication
 * @param handler - The API route handler function
 * @returns A wrapped handler that validates authentication before executing
 *
 * @example
 * export const POST = withAuth(async (request: NextRequest, session: Session) => {
 *   // Your authenticated route logic here
 *   const userId = session.user.id
 *   return NextResponse.json({ success: true })
 * })
 */
export function withAuth<T extends unknown[]>(
  handler: (
    request: NextRequest,
    session: Session,
    ...args: T
  ) => Promise<NextResponse>
) {
  return async (request: NextRequest, ...args: T): Promise<NextResponse> => {
    try {
      const session = await getServerSession()

      if (!session || !session.user) {
        return NextResponse.json(
          { error: 'Unauthorized. Please sign in to continue.' },
          { status: 401 }
        )
      }

      return await handler(request, session, ...args)
    } catch (error) {
      logger.error('Authentication error:', error)
      return NextResponse.json(
        { error: 'Authentication failed' },
        { status: 500 }
      )
    }
  }
}
