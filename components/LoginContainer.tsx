'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import LoginForm from '@/components/LoginForm'
import ClientGuard from '@/components/authen/ClientGuard'
import { signIn } from 'next-auth/react'
import logger from '@/utils/logger'
import { PAGE_URL } from '@/constants/url'

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
        router.push(PAGE_URL.HOME)
        router.refresh() // Refresh to update session state
      }
    } catch (error) {
      logger.error('Login error on client', { email: formData.email, error })
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'An error occurred during loginddd'
      throw new Error(errorMessage)
    }
  }

  const handleSocialLogin = (provider: 'google' | 'github') => {
    signIn(provider, { callbackUrl: PAGE_URL.HOME })
  }

  return (
    <ClientGuard requireAuth={false}>
      <LoginForm
        onSubmit={handleLogin}
        signUpLink={PAGE_URL.SIGN_UP}
        onSocialLogin={handleSocialLogin}
      />
    </ClientGuard>
  )
}
