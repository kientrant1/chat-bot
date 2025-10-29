import { getServerSession } from 'next-auth/next'
import { redirect } from 'next/navigation'
import { ReactNode } from 'react'
import { PAGE_URL } from '@/constants/url'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import logger from '../../utils/logger'

interface WithGuardProps {
  children: ReactNode
  redirectTo?: string
}

// Handles authentication guard for server components
export default async function ServerGuard({
  children,
  redirectTo,
}: WithGuardProps) {
  const session = await getServerSession(authOptions)

  if (!session) {
    logger.info('Server-side: User not authenticated, redirecting to login')
    redirect(redirectTo || PAGE_URL.LOGIN)
  }

  return <>{children}</>
}

// Higher-order component version for server components
export function withServerGuard<P extends object>(
  Component: React.ComponentType<P>,
  options: {
    redirectTo?: string
    fallbackComponent?: ReactNode
  } = {}
) {
  return async function WithServerGuardComponent(props: P) {
    return (
      <ServerGuard {...options}>
        <Component {...props} />
      </ServerGuard>
    )
  }
}
