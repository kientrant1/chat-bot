export const siteConfig = {
  gemini: {
    apiKey: process.env.GEMINI_API_KEY!,
  },
  auth: {
    googleClientId: process.env.GOOGLE_CLIENT_ID!,
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    nextAuthSecret: process.env.NEXTAUTH_SECRET!,
  },
} as const

export type SiteConfig = typeof siteConfig
