'use client'

import React, { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { ComponentProps } from '@/types/component'
import logger from '../../utils/logger'
import { PAGE_URL } from '@/constants/url'

interface ClientGuardProps extends ComponentProps {
  requireAuth?: boolean
  redirectTo?: string
}

export default function ClientGuard({
  children,
  redirectTo,
}: ClientGuardProps) {
  const { status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'loading') {
      return
    }

    if (status === 'unauthenticated') {
      logger.info('User not authenticated, redirecting to login')
      router.replace(redirectTo || PAGE_URL.LOGIN)
      return
    }

    logger.info('User authenticated, redirecting to home page')
    router.replace(redirectTo || PAGE_URL.HOME)
  }, [status, router, redirectTo])

  // Show loading state while checking authentication
  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    )
  }

  //Authenticated -> render protected content
  return <>{children}</>
}
