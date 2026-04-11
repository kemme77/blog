import { NextResponse } from "next/server"

import {
  createSessionToken,
  getSessionCookieName,
  getSessionMaxAge,
  verifyCredentials,
} from "@/lib/admin-auth"

export async function POST(request: Request) {
  const formData = await request.formData()
  const username = String(formData.get("username") ?? "")
  const password = String(formData.get("password") ?? "")
  const returnTo = String(formData.get("returnTo") ?? "/")

  if (!verifyCredentials(username, password)) {
    return NextResponse.redirect(new URL("/login?error=1", request.url), 303)
  }

  const token = createSessionToken(username)
  const safeReturnTo = returnTo.startsWith("/") ? returnTo : "/"
  const response = NextResponse.redirect(new URL(safeReturnTo, request.url), 303)

  response.cookies.set(getSessionCookieName(), token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: getSessionMaxAge(),
  })

  return response
}
