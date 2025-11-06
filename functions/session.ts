import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { getServerSession as getNextServerSession } from 'next-auth/next'

export const getServerSession = async () => {
  return await getNextServerSession(authOptions)
}
