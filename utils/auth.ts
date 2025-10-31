import { Session } from 'next-auth'
import { getServerSession as ServerSession } from 'next-auth/next'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

export const getServerSession = async (): Promise<Session | null> => {
  return await ServerSession(authOptions)
}
