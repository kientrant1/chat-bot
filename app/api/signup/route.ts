import { NextRequest, NextResponse } from 'next/server'
import logger from '@/utils/logger'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcrypt'
import { createUserWithEmailAndPassword } from '@/lib/firebase'
import { siteConfig } from '@/constants/siteConfig'

const createFirebaseUser = async (
  email: string,
  name: string,
  password: string
) => {
  // Create user with Firebase Auth
  const user = await createUserWithEmailAndPassword(email, password, name)
  return user
}

const createPrismaUser = async (
  email: string,
  name: string,
  password: string
) => {
  // check if email taken
  const existing = await prisma.user.findUnique({
    where: { email },
  })

  if (existing) {
    throw new Error('Email is already in use')
  }

  // hash password
  const passwordHash = await bcrypt.hash(password, 12)

  // create user
  const user = await prisma.user.create({
    data: {
      name,
      email,
      passwordHash,
    },
    select: {
      id: true,
      email: true,
      name: true,
    },
  })

  return {
    uid: user.id,
    email: user.email,
    displayName: user.name,
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, password, confirmPassword, agreeToTerms } = body

    // Validate required fields
    if (!name || !email || !password || !confirmPassword) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    // Validate password confirmation
    if (password !== confirmPassword) {
      return NextResponse.json(
        { error: 'Passwords do not match' },
        { status: 400 }
      )
    }

    // Validate terms agreement
    if (!agreeToTerms) {
      return NextResponse.json(
        { error: 'You must agree to the terms and conditions' },
        { status: 400 }
      )
    }

    let user
    if (siteConfig.usePrismaAuth) {
      user = await createPrismaUser(email, name, password)
    } else {
      user = await createFirebaseUser(email, name, password)
    }

    return NextResponse.json(
      {
        message: 'User created successfully',
        user: {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
        },
      },
      { status: 201 }
    )
  } catch (error: unknown) {
    logger.error('Signup error:', error)

    // Handle Firebase Auth errors
    let errorMessage = 'An error occurred during signup'

    if (error && typeof error === 'object' && 'code' in error) {
      const firebaseError = error as { code: string; message?: string }
      switch (firebaseError.code) {
        case 'auth/email-already-in-use':
          errorMessage = 'An account with this email already exists'
          break
        case 'auth/weak-password':
          errorMessage = 'Password should be at least 6 characters'
          break
        case 'auth/invalid-email':
          errorMessage = 'Invalid email address'
          break
        default:
          errorMessage = firebaseError.message || errorMessage
      }
    }

    return NextResponse.json({ error: errorMessage }, { status: 400 })
  }
}
