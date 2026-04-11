"use client"

import { useState, type FormEvent } from "react"
import { useRouter } from "next/navigation"
import { signIn } from "next-auth/react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

type LoginFormProps = {
  returnTo: string
}

export default function LoginForm({ returnTo }: LoginFormProps) {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [pending, setPending] = useState(false)

  async function getRateLimitStatus(): Promise<{ blocked: boolean; resetWaitSeconds: number } | null> {
    try {
      const rateLimitRes = await fetch("/api/auth/ratelimit-check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      })

      if (!rateLimitRes.ok) {
        return null
      }

      const data = await rateLimitRes.json()
      return {
        blocked: Boolean(data?.blocked),
        resetWaitSeconds: Number(data?.resetWaitSeconds ?? 0),
      }
    } catch {
      return null
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const username = String(formData.get("username") ?? "")

    setPending(true)
    setError(null)

    // Avoid calling next-auth endpoints when we already know this client is blocked.
    const preCheck = await getRateLimitStatus()
    if (preCheck?.blocked) {
      setPending(false)
      setError(
        `Too many login attempts. Please try again in ${preCheck.resetWaitSeconds} seconds.`
      )
      return
    }

    const result = await signIn("credentials", {
      username,
      password: String(formData.get("password") ?? ""),
      redirect: false,
      callbackUrl: returnTo,
    })

    setPending(false)

    if (result?.error) {
      // Re-check after a failed attempt so the UI can switch to the rate-limit message exactly when threshold is hit.
      const postCheck = await getRateLimitStatus()
      if (postCheck?.blocked) {
        setError(
          `Too many login attempts. Please try again in ${postCheck.resetWaitSeconds} seconds.`
        )
      } else {
        setError("Invalid credentials. Please try again.")
      }
      return
    }

    router.push(result?.url ?? returnTo)
    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="username" className="text-sm font-medium text-(--earth-ink)">Username</label>
        <Input id="username" name="username" required autoComplete="username" />
      </div>
      <div className="space-y-2">
        <label htmlFor="password" className="text-sm font-medium text-(--earth-ink)">Password</label>
        <Input id="password" name="password" type="password" required autoComplete="current-password" />
      </div>

      {error ? <p className="text-sm text-red-600">{error}</p> : null}

      <Button type="submit" className="w-full bg-(--earth-forest) text-white hover:bg-(--earth-forest)/90" disabled={pending}>
        {pending ? "Signing in..." : "Login"}
      </Button>
    </form>
  )
}
