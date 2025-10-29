'use client'

import React from 'react'
import LoginForm from '@/components/LoginForm'

export default function LoginPage() {
  const handleLogin = async (formData: {
    email: string
    password: string
    rememberMe: boolean
  }) => {
    // TODO: Implement actual authentication logic here
    console.log('Login attempt:', formData)

    // Redirect to main chat page on success
    window.location.href = '/'
  }

  const handleSocialLogin = (provider: 'google' | 'github') => {
    // TODO: Implement social login
    console.log(`Login with ${provider}`)
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <LoginForm onSubmit={handleLogin} onSocialLogin={handleSocialLogin} />
      </div>
    </div>
  )
}
