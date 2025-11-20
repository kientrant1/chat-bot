export const siteConfig = {
  isDev: process.env.NODE_ENV === 'development',
  nextAppUrl: process.env.NEXT_PUBLIC_APP_URL ?? '',
  maxChatRequestPerDay: 50,
  geminiModelName: 'gemini-2.5-flash',
  usePrismaAuth: process.env.USE_PRISMA_AUTH === 'true',
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
  supabase: {
    serverUrl: process.env.SUPABASE_URL || '',
    anonKey: process.env.SUPABASE_ANON_KEY || '',
  },
} as const

export type SiteConfig = typeof siteConfig
