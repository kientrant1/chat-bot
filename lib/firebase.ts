import { siteConfig } from '@/constants/siteConfig'
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: siteConfig.firebase.apiKey,
  authDomain: siteConfig.firebase.authDomain,
  projectId: siteConfig.firebase.projectId,
  appId: siteConfig.firebase.appId,
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
