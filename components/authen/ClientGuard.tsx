'use client'

import React from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { ComponentProps } from '@/types/component'
import logger from '../../utils/logger'
import { PAGE_URL } from '@/constants/url'

interface ClientGuardProps extends ComponentProps {
  fallbackComponent?: React.ReactNode
  requireAuth?: boolean
  redirectTo?: string
}

export default function ClientGuard({
  children,
  fallbackComponent,
  requireAuth = true,
  redirectTo,
}: ClientGuardProps) {
  const { data: session, status } = useSession()
  const router = useRouter()

  // Show loading state while checking authentication
  if (status === 'loading') {
    return (
      fallbackComponent || (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
          <div className="flex flex-col items-center space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="text-gray-600 dark:text-gray-400">Loading...</p>
          </div>
        </div>
      )
    )
  }

  // For pages that require authentication
  if (requireAuth) {
    if (status === 'unauthenticated') {
      logger.info('User not authenticated, redirecting to login')
      router.push(redirectTo || PAGE_URL.LOGIN)
      return
    }

    if (status === 'authenticated' && session) {
      return <>{children}</>
    }
  }

  // For pages that should redirect authenticated users (like login/signup)
  if (!requireAuth) {
    if (status === 'authenticated') {
      logger.info('User already authenticated, redirecting to home page')
      router.push(redirectTo || PAGE_URL.HOME)
      return
    }

    return <>{children}</>
  }

  return <>{fallbackComponent}</>
}
