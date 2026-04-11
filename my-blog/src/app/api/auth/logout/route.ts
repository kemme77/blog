import { NextResponse } from "next/server"

import { getSessionCookieName } from "@/lib/admin-auth"

export async function POST(request: Request) {
  const response = NextResponse.redirect(new URL("/", request.url), 303)
  response.cookies.set(getSessionCookieName(), "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  })
  return response
}
