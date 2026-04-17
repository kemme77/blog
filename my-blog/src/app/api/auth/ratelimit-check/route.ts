import { NextRequest, NextResponse } from "next/server"

import { getClientIp, getRateLimitStatus } from "@/lib/rateLimit"

/**
 * Check rate limit status for a given username
 * Used by the login form to show friendly error messages
 */
export async function POST(request: NextRequest) {
  try {
    const ipAddress = getClientIp(request)
    const status = getRateLimitStatus(ipAddress)

    return NextResponse.json(status)
  } catch (error) {
    console.error("[ratelimit-check]", error)
    return NextResponse.json(
      { error: "Failed to check rate limit" },
      { status: 500 }
    )
  }
}
