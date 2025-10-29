export const siteConfig = {
  gemini: {
    apiKey: process.env.GEMINI_API_KEY!,
  },
  google: {
    clientId: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
  },
} as const

export type SiteConfig = typeof siteConfig
