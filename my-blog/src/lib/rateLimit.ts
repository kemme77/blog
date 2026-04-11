/**
 * Simple in-memory rate limiter for login attempts
 * Tracks failed login attempts per client key (IP/global)
 */

interface RateLimitEntry {
  attempts: number
  resetTime: number
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
export function getClientIp(credentials?: any): string {
  // Fallback to a generic identifier
  // In a real app, you'd extract this from request headers via middleware
  return credentials?.ip || "0.0.0.0"
}

