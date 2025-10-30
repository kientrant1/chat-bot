'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import SignUpForm from '@/components/SignUpForm'
import { SignUpFormData } from '@/types/user'
import logger from '@/utils/logger'
import { API_URL, PAGE_URL } from '@/constants/url'
import { signIn } from 'next-auth/react'

export default function SignUpPage() {
  const router = useRouter()

  const handleSignUp = async (formData: SignUpFormData) => {
    try {
      const response = await fetch(API_URL.SIGN_UP, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Signup failed')
      }

      logger.info('User created successfully', { uid: data.user.uid })

      // Redirect to main chat page on success
      router.push(PAGE_URL.LOGIN)
    } catch (error) {
      logger.error('Signup error:', error)
      // You might want to show this error to the user via a toast or error state
      throw error
    }
  }

  const handleSocialLogin = (provider: 'google' | 'github') => {
    logger.info('Social sign up initiated', { provider })
    signIn(provider, { callbackUrl: '/' })
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <SignUpForm onSubmit={handleSignUp} onSocialLogin={handleSocialLogin} />
      </div>
    </div>
  )
}
