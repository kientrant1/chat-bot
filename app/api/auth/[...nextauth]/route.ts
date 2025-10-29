import { siteConfig } from '@/constants/siteConfig'
import { PAGE_URL } from '@/constants/url'
import NextAuth, { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: siteConfig.auth.googleClientId,
      clientSecret: siteConfig.auth.googleClientSecret,
    }),
    // ...add more providers here
  ],
  // NextAuth.js will generate a secret when NODEV_ENV is 'development'
  secret: siteConfig.auth.nextAuthSecret,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string
      }
      return session
    },
  },
  pages: {
    signIn: PAGE_URL.LOGIN,
    error: PAGE_URL.LOGIN,
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
