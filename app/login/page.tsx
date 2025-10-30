'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import LoginForm from '@/components/LoginForm'
import ClientGuard from '@/components/authen/ClientGuard'
import { signIn } from 'next-auth/react'
import logger from '@/utils/logger'

export default function LoginPage() {
  const router = useRouter()

  const handleLogin = async (formData: {
    email: string
    password: string
    rememberMe: boolean
  }) => {
    try {
      const result = await signIn('credentials', {
        email: formData.email,
        password: formData.password,
        redirect: false,
      })

      if (result?.error) {
        logger.error('Login failed', {
          email: formData.email,
          error: result.error,
        })
        throw new Error(result.error)
      }

      if (result?.ok) {
        logger.info('Login successful via NextAuth', { email: formData.email })
        // Redirect to main chat page on success
        router.push('/')
        router.refresh() // Refresh to update session state
      }
    } catch (error) {
      logger.error('Login error on client', { email: formData.email, error })
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'An error occurred during login'
      throw new Error(errorMessage)
    }
  }

  const handleSocialLogin = (provider: 'google' | 'github') => {
    signIn(provider, { callbackUrl: '/' })
  }

  return (
    <ClientGuard requireAuth={false}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <LoginForm onSubmit={handleLogin} onSocialLogin={handleSocialLogin} />
        </div>
      </div>
    </ClientGuard>
  )
}
