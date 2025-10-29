import { getServerSession } from 'next-auth/next'
import { redirect } from 'next/navigation'
import { ReactNode } from 'react'
import { PAGE_URL } from '@/constants/url'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import logger from '../../utils/logger'

interface WithGuardProps {
  children: ReactNode
  requireAuth?: boolean
  fallbackComponent?: ReactNode
  redirectTo?: string
}

// Handles authentication guard for server components
export default async function ServerGuard({
  children,
  requireAuth = true,
  fallbackComponent,
  redirectTo,
}: WithGuardProps) {
  const session = await getServerSession(authOptions)

  // For pages that require authentication
  if (requireAuth) {
    if (!session) {
      logger.info('Server-side: User not authenticated, redirecting to login')
      redirect(redirectTo || PAGE_URL.LOGIN)
    }

    return <>{children}</>
  }

  // For pages that should redirect authenticated users (like login/signup)
  if (!requireAuth) {
    if (session) {
      logger.info(
        'Server-side: User already authenticated, redirecting to home'
      )
      redirect(redirectTo || PAGE_URL.HOME)
    }

    return <>{children}</>
  }

  // Fallback case
  if (fallbackComponent) {
    return <>{fallbackComponent}</>
  }

  return <>{children}</>
}

// Higher-order component version for server components
export function withServerGuard<P extends object>(
  Component: React.ComponentType<P>,
  options: {
    requireAuth?: boolean
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
