import { createHmac, timingSafeEqual } from "node:crypto"

import { cookies } from "next/headers"

const COOKIE_NAME = "blog-admin-session"
const SESSION_TTL_SECONDS = 60 * 60 * 8

function getSecret(): string {
  return process.env.BLOG_ADMIN_SECRET ?? "dev-secret-change-me"
}

function getAdminUsername(): string {
  return process.env.BLOG_ADMIN_USERNAME ?? "admin"
}

function getAdminPassword(): string {
  return process.env.BLOG_ADMIN_PASSWORD ?? "admin123"
}

function sign(value: string): string {
  return createHmac("sha256", getSecret()).update(value).digest("hex")
}

function safeEquals(a: string, b: string): boolean {
  const aBuf = Buffer.from(a)
  const bBuf = Buffer.from(b)

  if (aBuf.length !== bBuf.length) {
    return false
  }

  return timingSafeEqual(aBuf, bBuf)
}

export function verifyCredentials(username: string, password: string): boolean {
  return safeEquals(username, getAdminUsername()) && safeEquals(password, getAdminPassword())
}

export function createSessionToken(username: string): string {
  const expiresAt = Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS
  const payload = `${username}|${expiresAt}`
  const signature = sign(payload)
  return `${payload}|${signature}`
}

export function verifySessionToken(token: string): boolean {
  const parts = token.split("|")
  if (parts.length !== 3) {
    return false
  }

  const [username, expiresAtRaw, signature] = parts
  const payload = `${username}|${expiresAtRaw}`
  const expectedSig = sign(payload)

  if (!safeEquals(signature, expectedSig)) {
    return false
  }

  const expiresAt = Number(expiresAtRaw)
  if (Number.isNaN(expiresAt) || expiresAt < Math.floor(Date.now() / 1000)) {
    return false
  }

  return safeEquals(username, getAdminUsername())
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const store = await cookies()
  const token = store.get(COOKIE_NAME)?.value
  if (!token) {
    return false
  }
  return verifySessionToken(token)
}

export function getSessionCookieName(): string {
  return COOKIE_NAME
}

export function getSessionMaxAge(): number {
  return SESSION_TTL_SECONDS
}
