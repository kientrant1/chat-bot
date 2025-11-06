import { siteConfig } from '@/constants/siteConfig'
import { initializeApp, type FirebaseApp, getApps } from 'firebase/app'
import {
  createUserWithEmailAndPassword as createUserWithEmailAndPwd,
  getAuth,
  signInWithEmailAndPassword as signInWithEmailAndPwd,
  updateProfile,
  type Auth,
} from 'firebase/auth'

const firebaseConfig = {
  apiKey: siteConfig.firebase.apiKey,
  authDomain: siteConfig.firebase.authDomain,
  projectId: siteConfig.firebase.projectId,
  appId: siteConfig.firebase.appId,
}

// Lazy initialization - only initialize when actually needed
const getFirebaseApp = () => {
  let app: FirebaseApp | undefined
  // Check if Firebase is already initialized
  if (getApps().length === 0) {
    app = initializeApp(firebaseConfig)
  } else {
    app = getApps()[0]
  }
  return app
}

const getFirebaseAuth = () => {
  return getAuth(getFirebaseApp())
}

export const createUserWithEmailAndPassword = async (
  email: string,
  password: string,
  name: string
) => {
  const authInstance = getFirebaseAuth()
  const userCredential = await createUserWithEmailAndPwd(
    authInstance,
    email,
    password
  )
  const user = userCredential.user

  // Update the user's display name
  await updateProfile(user, {
    displayName: name,
  })

  return user
}

export const signInWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  const authInstance = getFirebaseAuth()
  return await signInWithEmailAndPwd(authInstance, email, password)
}
