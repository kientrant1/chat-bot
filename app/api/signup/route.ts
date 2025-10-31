import { NextRequest, NextResponse } from 'next/server'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { auth } from '@/lib/firebase'
import logger from '@/utils/logger'

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

    // Create user with Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    )

    const user = userCredential.user

    // Update the user's display name
    await updateProfile(user, {
      displayName: name,
    })

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
