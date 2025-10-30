'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import SignUpForm from '@/components/SignUpForm'
import { SignUpFormData } from '@/types/user'
import logger from '@/utils/logger'
import { API_URL, PAGE_URL } from '@/constants/url'
import { signIn } from 'next-auth/react'

export default function SignUpContainer() {
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
    <SignUpForm onSubmit={handleSignUp} onSocialLogin={handleSocialLogin} />
  )
}
