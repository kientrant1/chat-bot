'use client'

import React from 'react'
import SignUpForm from '@/components/SignUpForm'

export default function SignUpPage() {
  const handleSignUp = async (formData: {
    name: string
    email: string
    password: string
    confirmPassword: string
    agreeToTerms: boolean
  }) => {
    // TODO: Implement actual registration logic here
    console.log('Sign up attempt:', formData)

    // Redirect to main chat page on success
    window.location.href = '/'
  }

  const handleSocialLogin = (provider: 'google' | 'github') => {
    // TODO: Implement social login
    console.log(`Sign up with ${provider}`)
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <SignUpForm onSubmit={handleSignUp} onSocialLogin={handleSocialLogin} />
      </div>
    </div>
  )
}
