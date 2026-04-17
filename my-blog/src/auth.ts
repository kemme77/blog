import NextAuth, { type NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { compare } from "bcryptjs"
import { type UserRole } from "@prisma/client"

import { prisma } from "@/lib/prisma"
import {
  checkRateLimit,
  recordFailedAttempt,
  resetRateLimit,
  getClientIp,
} from "@/lib/rateLimit"

function getAdminUsername(): string {
  const username = process.env.BLOG_ADMIN_USERNAME?.trim()
  if (!username) {
    throw new Error("Missing BLOG_ADMIN_USERNAME")
  }
  return username
}

function getAdminPasswordHash(): string {
  const passwordHash = process.env.BLOG_ADMIN_PASSWORD_HASH?.trim().replace(/\\\$/g, "$")
  if (!passwordHash) {
    throw new Error("Missing BLOG_ADMIN_PASSWORD_HASH")
  }
  return passwordHash
}

function getAuthSecret(): string {
  const secret =
    process.env.NEXTAUTH_SECRET?.trim() ||
    process.env.AUTH_SECRET?.trim() ||
    process.env.BLOG_ADMIN_SECRET?.trim()

  if (!secret) {
    throw new Error("Missing NEXTAUTH_SECRET (or AUTH_SECRET / BLOG_ADMIN_SECRET fallback)")
  }

  return secret
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 24 hours
  },
  secret: getAuthSecret(),
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, request) {
        const username = String(credentials?.username ?? "").trim()
        const password = String(credentials?.password ?? "")
        const ipAddress = getClientIp(request)

        if (!username || !password) {
          if (username) {
            recordFailedAttempt(ipAddress)
          }
          return null
        }

        // Check rate limit before validating credentials
        try {
          checkRateLimit(ipAddress)
        } catch (error) {
          console.warn(
            `[rate-limit] ${username}@${ipAddress}: ${(error as Error).message}`
          )
          return null
        }

        const adminUsername = getAdminUsername()
        const adminPasswordHash = getAdminPasswordHash()

        // Only one role/user exists: admin from environment variables.
        if (username !== adminUsername) {
          recordFailedAttempt(ipAddress)
          return null
        }

        const passwordMatches = await compare(password, adminPasswordHash)
        if (!passwordMatches) {
          recordFailedAttempt(ipAddress)
          return null
        }

        let user = await prisma.user.findUnique({
          where: { username: adminUsername },
        })

        if (!user) {
          user = await prisma.user.create({
            data: {
              username: adminUsername,
              passwordHash: adminPasswordHash,
              role: "ADMIN",
              name: "Admin",
            },
          })
        } else if (
          user.passwordHash !== adminPasswordHash ||
          user.role !== "ADMIN" ||
          user.name !== "Admin"
        ) {
          user = await prisma.user.update({
            where: { id: user.id },
            data: {
              passwordHash: adminPasswordHash,
              role: "ADMIN",
              name: "Admin",
            },
          })
        }

        if (!user?.passwordHash) {
          return null
        }

        // Rate limit check passed, reset counter on successful login
        resetRateLimit(ipAddress)

        return {
          id: user.id,
          name: user.name ?? user.username,
          email: user.email,
          image: user.image,
          username: user.username,
          role: user.role,
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.username = user.username
        token.role = user.role
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
        session.user.username = token.username as string
        session.user.role = (token.role as UserRole | undefined) ?? "ADMIN"
      }
      return session
    },
  },
}

const authHandler = NextAuth(authOptions)

export default authHandler
