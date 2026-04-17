/**
 * Simple in-memory rate limiter for login attempts
 * Tracks failed login attempts per client key (IP/global)
 */

interface RateLimitEntry {
  attempts: number
  resetTime: number
}

type HeaderSource =
  | Headers
  | Request
  | { headers?: Headers | Record<string, string | string[] | undefined> }
  | Record<string, string | string[] | undefined>

function isHeaderRecord(value: unknown): value is Record<string, string | string[] | undefined> {
  return typeof value === "object" && value !== null && !(value instanceof Headers)
}

const attemptMap = new Map<string, RateLimitEntry>()

const LIMIT = 10 // max attempts
const WINDOW = 60 * 1000 // 1 minute in ms

/**
 * Check if a login attempt should be allowed
 * Throws error if rate limit exceeded
 */
export function checkRateLimit(
  ipAddress: string = "0.0.0.0"
): void {
  const key = ipAddress
  const now = Date.now()
  const entry = attemptMap.get(key)

  if (entry) {
    // Reset if window has passed
    if (now > entry.resetTime) {
      attemptMap.delete(key)
      return
    }

    // Check if limit exceeded
    if (entry.attempts >= LIMIT) {
      const waitSeconds = Math.ceil((entry.resetTime - now) / 1000)
      throw new Error(
        `Too many login attempts. Please try again in ${waitSeconds} seconds.`
      )
    }
  }
}

/**
 * Record a failed login attempt
 */
export function recordFailedAttempt(
  ipAddress: string = "0.0.0.0"
): void {
  const key = ipAddress
  const now = Date.now()
  const entry = attemptMap.get(key)

  if (!entry || now > entry.resetTime) {
    attemptMap.set(key, { attempts: 1, resetTime: now + WINDOW })
    return
  }

  entry.attempts++
}

/**
 * Reset rate limit for a client key (e.g., on successful login)
 */
export function resetRateLimit(ipAddress: string = "0.0.0.0"): void {
  const key = ipAddress
  attemptMap.delete(key)
}

/**
 * Get current rate limit status for a client key
 * Returns remaining attempts and wait time (in seconds)
 */
export function getRateLimitStatus(
  ipAddress: string = "0.0.0.0"
): { blocked: boolean; remaining: number; resetWaitSeconds: number } {
  const key = ipAddress
  const now = Date.now()
  const entry = attemptMap.get(key)

  if (!entry) {
    return { blocked: false, remaining: LIMIT, resetWaitSeconds: 0 }
  }

  // Reset if window has passed
  if (now > entry.resetTime) {
    attemptMap.delete(key)
    return { blocked: false, remaining: LIMIT, resetWaitSeconds: 0 }
  }

  const blocked = entry.attempts >= LIMIT
  const remaining = Math.max(0, LIMIT - entry.attempts)
  const resetWaitSeconds = Math.ceil((entry.resetTime - now) / 1000)

  return { blocked, remaining, resetWaitSeconds }
}

/**
 * Try to extract client IP from various headers
 */
function readHeaderValue(source: HeaderSource, key: string): string | undefined {
  if (source instanceof Request) {
    return source.headers.get(key) ?? undefined
  }

  if (source instanceof Headers) {
    return source.get(key) ?? undefined
  }

  const candidateHeaders = "headers" in source ? source.headers : source
  if (!candidateHeaders) {
    return undefined
  }

  if (candidateHeaders instanceof Headers) {
    return candidateHeaders.get(key) ?? undefined
  }

  if (!isHeaderRecord(candidateHeaders)) {
    return undefined
  }

  const raw = candidateHeaders[key] ?? candidateHeaders[key.toLowerCase()]
  if (!raw) {
    return undefined
  }

  return Array.isArray(raw) ? raw[0] : raw
}

export function getClientIp(input?: HeaderSource): string {
  if (!input) {
    return "0.0.0.0"
  }

  const forwardedFor = readHeaderValue(input, "x-forwarded-for")
  if (forwardedFor) {
    const firstForwarded = forwardedFor.split(",")[0]?.trim()
    if (firstForwarded) {
      return firstForwarded
    }
  }

  const realIp = readHeaderValue(input, "x-real-ip")?.trim()
  if (realIp) {
    return realIp
  }

  const vercelForwarded = readHeaderValue(input, "x-vercel-forwarded-for")?.trim()
  if (vercelForwarded) {
    return vercelForwarded
  }

  return "0.0.0.0"
}

