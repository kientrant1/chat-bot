'use client'

import { SessionProvider } from 'next-auth/react'
import { ComponentProps } from '@/types/component'

const AuthProvider = ({ children }: ComponentProps) => {
  return <SessionProvider>{children}</SessionProvider>
}

export default AuthProvider
