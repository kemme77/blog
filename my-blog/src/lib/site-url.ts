const DEFAULT_SITE_URL = "https://blog-chi-silk-91.vercel.app"

function trimSlash(value: string): string {
  return value.replace(/\/+$/, "")
}

export function resolveSiteUrl(): string {
  const candidates = [
    process.env.NEXT_PUBLIC_SITE_URL,
    process.env.NEXTAUTH_URL,
    process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined,
  ]

  for (const value of candidates) {
    const nextValue = value?.trim()
    if (!nextValue) {
      continue
    }

    try {
      const parsed = new URL(nextValue)
      return trimSlash(parsed.toString())
    } catch {
      // Ignore invalid values and continue to the next candidate.
    }
  }

  return DEFAULT_SITE_URL
}

export function resolveMetadataBase(): URL {
  return new URL(resolveSiteUrl())
}