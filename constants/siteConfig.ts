export const siteConfig = {
  gemini: {
    apiKey: process.env.GEMINI_API_KEY!,
  },
} as const

export type SiteConfig = typeof siteConfig
