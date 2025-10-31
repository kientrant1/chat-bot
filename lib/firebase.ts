import { siteConfig } from '@/constants/siteConfig'
import { initializeApp } from 'firebase/app'
import {
  createUserWithEmailAndPassword as createUserWithEmailAndPwd,
  getAuth,
  signInWithEmailAndPassword as signInWithEmailAndPwd,
  updateProfile,
} from 'firebase/auth'

const firebaseConfig = {
  apiKey: siteConfig.firebase.apiKey,
  authDomain: siteConfig.firebase.authDomain,
  projectId: siteConfig.firebase.projectId,
  appId: siteConfig.firebase.appId,
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

export const createUserWithEmailAndPassword = async (
  email: string,
  password: string,
  name: string
) => {
  const userCredential = await createUserWithEmailAndPwd(auth, email, password)
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
  return await signInWithEmailAndPwd(auth, email, password)
}
