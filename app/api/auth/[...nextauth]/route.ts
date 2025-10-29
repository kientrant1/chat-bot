import { siteConfig } from '@/constants/siteConfig'
import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: siteConfig.google.clientId,
      clientSecret: siteConfig.google.clientSecret,
    }),
    // ...add more providers here
  ],
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
