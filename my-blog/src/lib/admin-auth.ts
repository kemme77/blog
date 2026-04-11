import { getServerSession } from "next-auth/next"

import { authOptions } from "@/auth"

export async function isAdminAuthenticated(): Promise<boolean> {
  const session = await getServerSession(authOptions)
  return session?.user?.role === "ADMIN"
}
