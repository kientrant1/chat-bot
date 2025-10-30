export const siteConfig = {
  gemini: {
    apiKey: process.env.GEMINI_API_KEY!,
  },
  auth: {
    googleClientId: process.env.GOOGLE_CLIENT_ID!,
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    nextAuthSecret: process.env.NEXTAUTH_SECRET!,
  },
  firebase: {
    apiKey: process.env.FIREBASE_API_KEY!,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN!,
    projectId: process.env.FIREBASE_PROJECT_ID!,
    appId: process.env.FIREBASE_APP_ID!,
  },
} as const

export type SiteConfig = typeof siteConfig
