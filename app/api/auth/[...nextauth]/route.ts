import { siteConfig } from '@/constants/siteConfig'
import { PAGE_URL } from '@/constants/url'
import { prisma } from '@/lib/prisma'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import NextAuth, { NextAuthOptions } from 'next-auth'
import {
  firebaseCredentialsProvider,
  googleCredentialsProvider,
  prismaCredentialsProvider,
} from '@/lib/credentialsProvider'

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  // Configure one or more authentication providers
  providers: [
    googleCredentialsProvider,
    process.env.USE_PRISMA_AUTH === 'true'
      ? prismaCredentialsProvider
      : firebaseCredentialsProvider,
    // ...add more providers here
  ],
  // NextAuth.js will generate a secret when NODEV_ENV is 'development'
  secret: siteConfig.auth.nextAuthSecret,
  session: { strategy: 'jwt' },
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
