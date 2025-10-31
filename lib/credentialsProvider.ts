import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/lib/firebase'
import logger from '@/utils/logger'
import { siteConfig } from '@/constants/siteConfig'
import bcrypt from 'bcrypt'
import { prisma } from './prisma'

export const googleCredentialsProvider = GoogleProvider({
  clientId: siteConfig.auth.googleClientId,
  clientSecret: siteConfig.auth.googleClientSecret,
})

export const firebaseCredentialsProvider = CredentialsProvider({
  name: 'credentials',
  credentials: {
    email: { label: 'Email', type: 'email' },
    password: { label: 'Password', type: 'password' },
  },
  async authorize(credentials) {
    if (!credentials?.email || !credentials?.password) {
      return null
    }

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        credentials.email,
        credentials.password
      )
      const user = userCredential.user

      if (user) {
        logger.info('User signed in successfully via NextAuth', {
          uid: user.uid,
          email: user.email,
        })

        return {
          id: user.uid,
          email: user.email,
          name: user.displayName,
          image: user.photoURL,
        }
      }
      return null
    } catch (error: unknown) {
      logger.error('Firebase signin error in NextAuth', error)

      // Handle specific Firebase error codes
      if (error && typeof error === 'object' && 'code' in error) {
        switch (error.code) {
          case 'auth/user-not-found':
            throw new Error('No user found with this email address')
          case 'auth/wrong-password':
            throw new Error('Incorrect password')
          case 'auth/invalid-email':
            throw new Error('Invalid email address')
          case 'auth/user-disabled':
            throw new Error('This account has been disabled')
          case 'auth/too-many-requests':
            throw new Error('Too many failed attempts. Please try again later')
        }
      }

      throw new Error('Authentication failed')
    }
  },
})

export const prismaCredentialsProvider = CredentialsProvider({
  name: 'credentials',
  credentials: {
    email: { label: 'Email', type: 'email' },
    password: { label: 'Password', type: 'password' },
  },
  async authorize(credentials) {
    if (!credentials?.email || !credentials?.password) {
      return null
    }

    try {
      const user = await prisma.user.findUnique({
        where: { email: credentials.email },
      })

      if (!user) {
        throw new Error('No user with that email')
      }

      // compare password
      const validPassword = await bcrypt.compare(
        credentials.password,
        user.passwordHash ?? ''
      )

      if (!validPassword) {
        throw new Error('Incorrect credentials')
      }

      logger.info('User signed in successfully via NextAuth', {
        uid: user.id,
        email: user.email,
      })

      // 4. return a minimal user object
      return {
        id: user.id,
        email: user.email,
        name: user.name,
        image: '',
      }
    } catch (error: unknown) {
      logger.error('Prisma signin error in NextAuth', error)

      throw new Error('Authentication failed')
    }
  },
})
