# NextAuth with Prisma Setup Guide

We'll cover:

- Install and init Prisma
- Create the Prisma schema for NextAuth
- Migrate the DB
- Configure NextAuth to use Prisma
- Use Prisma Studio (the UI)

I'll assume you're using:

- Next.js 13+ (App Router or Pages Router both work)
- Node + TypeScript
- A SQL database (SQLite for local dev, easy to demo)

If any of that is different, you can still follow along — you'll just swap the DB URL.

## 1. Install dependencies

In your Next.js project root:

```bash
yarn install prisma --save-dev
yarn install @prisma/client
yarn install next-auth @next-auth/prisma-adapter
```

What these do:

- `prisma` = CLI + schema tooling
- `@prisma/client` = the actual query client
- `next-auth` = auth framework
- `@next-auth/prisma-adapter` = tells NextAuth how to store users/sessions in your DB via Prisma

## 2. Initialize Prisma

```bash
# Add `"prisma": "prisma"` to package.json file and run:
yarn prisma init
```

That will do two things:

- Create a new folder `prisma/` with `schema.prisma`
- Create `.env` with `DATABASE_URL`

For local dev you can keep it super simple and use SQLite:

In `.env`:

```
# Use this if prisma/schema.prisma config `provider = "sqlite"`
DATABASE_URL="file:./dev.db"

# Use this if `provider = "postgresql"`
# Value should be generated and copied from https://console.prisma.io/
DATABASE_URL="prisma+postgres://accelerate.prisma-data.net/..."
```

And in `prisma/schema.prisma`, make sure the top matches SQLite:

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

## 3. Add the NextAuth models to Prisma

Replace the rest of `schema.prisma` with these models. These are the canonical models that `@next-auth/prisma-adapter` expects:

```prisma
model Account {
  id                String  @id @default(cuid())
  userId            String
  type              String
  provider          String
  providerAccountId String
  refresh_token     String?  @db.Text
  access_token      String?  @db.Text
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String?  @db.Text
  session_state     String?

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, providerAccountId])
}

model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model User {
  id            String    @id @default(cuid())
  name          String?
  email         String?   @unique
  emailVerified DateTime?
  image         String?

  // relations
  accounts Account[]
  sessions Session[]
}

model VerificationToken {
  identifier String
  token      String   @unique
  expires    DateTime

  @@unique([identifier, token])
}
```

Why this matters:

- `User` holds… your users.
- `Account` links OAuth providers (Google, GitHub, etc.).
- `Session` is for database sessions (if you use JWT sessions you'll hit this less, but keep it).
- `VerificationToken` is for passwordless / email magic links.

## 4. Push schema → create the database tables

Now generate the tables in your dev DB and generate the Prisma Client:

```bash
yarn prisma migrate dev --name init_auth
```

That will:

- Create `dev.db` (if SQLite)
- Create all 4 tables
- Create `node_modules/@prisma/client` types

After that, you can already open the UI (Prisma Studio) and see/add users manually. We'll do that in step 6.

## 5. Add a Prisma Client helper (avoid "hot reload" issues)

In `lib/prisma.ts` (or `src/lib/prisma.ts` depending on your setup), add:

```typescript
import { PrismaClient } from '@prisma/client'

const globalForPrisma = global as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ['query', 'error', 'warn'],
  })

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}
```

Reason: Next.js (especially dev mode + app router) can re-import files, so we keep a single PrismaClient instead of creating 10 and getting warnings.

## 6. Configure NextAuth to use Prisma + the adapter

### If you're using App Router (`/app/api/auth/[...nextauth]/route.ts`):

Create the file:
`app/api/auth/[...nextauth]/route.ts`

```typescript
import NextAuth from 'next-auth'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { prisma } from '@/lib/prisma'

// Example providers (GitHub + Email); add whatever you use
import GitHubProvider from 'next-auth/providers/github'
import EmailProvider from 'next-auth/providers/email'

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID ?? '',
      clientSecret: process.env.GITHUB_SECRET ?? '',
    }),
    EmailProvider({
      server: process.env.EMAIL_SERVER ?? '',
      from: process.env.EMAIL_FROM ?? '',
    }),
  ],
  session: {
    strategy: 'database', // or "jwt"
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
```

Notes:

- You can remove providers you don't want and add Google/etc.
- If you prefer stateless JWT sessions, set `strategy: "jwt"` and Prisma will still be used for users/accounts but not sessions storage.
- Don't forget to add env vars in `.env` for your providers.

### If you're using Pages Router (`/pages/api/auth/[...nextauth].ts`):

```typescript
import NextAuth from 'next-auth'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { prisma } from '@/lib/prisma'

import GitHubProvider from 'next-auth/providers/github'
import EmailProvider from 'next-auth/providers/email'

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID ?? '',
      clientSecret: process.env.GITHUB_SECRET ?? '',
    }),
    EmailProvider({
      server: process.env.EMAIL_SERVER ?? '',
      from: process.env.EMAIL_FROM ?? '',
    }),
  ],
  session: {
    strategy: 'database', // or "jwt"
  },
})
```

## 7. (This is the "UI" part) Use Prisma Studio to view/edit users

Prisma Studio = a browser UI for your DB. You can add users, inspect sessions, etc.

Run:

```bash
yarn prisma studio
```

What you'll get:

- A web UI with tables: User, Account, Session, VerificationToken
- You can:
  - Create a new user row manually (good for seeding an admin)
  - Inspect which OAuth accounts are linked to which user
  - Delete bad sessions

This is super handy for debugging NextAuth because you can log in with (say) GitHub, then immediately open Studio and see:

- did a User row get created?
- did an Account row get linked with that provider?
- did a Session row get issued?

That confirms the integration is working.

## 8. (Optional but important) How to read the session in your app

### Some Other Command on Prisma

```bash
# Reset DB
yarn prisma migrate reset

# Deploy DB Changes (no need)
yarn prisma migrate deploy
```

### App Router server component / server action:

```typescript
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { getServerSession } from 'next-auth'

export async function getUser() {
  const session = await getServerSession(authOptions)
  return session?.user
}
```

### Client component:

```typescript
"use client";

import { SessionProvider, useSession } from "next-auth/react";

export function AuthWrapper({ children }: { children: React.ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
}

export function UserInfo() {
  const { data: session } = useSession();
  return <pre>{JSON.stringify(session, null, 2)}</pre>;
}
```

Now your frontend can know who's logged in.
