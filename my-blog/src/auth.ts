import NextAuth, { type NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { compare } from "bcryptjs"

import { prisma } from "@/lib/prisma"

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

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  secret: process.env.BLOG_ADMIN_SECRET,
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const username = String(credentials?.username ?? "").trim()
        const password = String(credentials?.password ?? "")

        if (!username || !password) {
          return null
        }

        const adminUsername = getAdminUsername()
        const adminPasswordHash = getAdminPasswordHash()

        // Only one role/user exists: admin from environment variables.
        if (username !== adminUsername) {
          return null
        }

        const passwordMatches = await compare(password, adminPasswordHash)
        if (!passwordMatches) {
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

        return {
          id: user.id,
          name: user.name ?? user.username,
          email: user.email,
          image: user.image,
          username: user.username,
          role: user.role,
        } as any
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
        session.user.role = token.role as any
      }
      return session
    },
  },
}

const authHandler = NextAuth(authOptions)

export default authHandler
