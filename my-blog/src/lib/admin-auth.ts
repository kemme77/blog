import { getServerSession } from "next-auth/next"

import { authOptions } from "@/auth"

export async function isAdminAuthenticated(): Promise<boolean> {
  try {
    const session = await getServerSession(authOptions)
    return session?.user?.role === "ADMIN"
  } catch (error) {
    console.error("[auth] Failed to resolve admin session:", error)
    return false
  }
}
