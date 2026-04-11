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

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)

    setPending(true)
    setError(null)

    const result = await signIn("credentials", {
      username: String(formData.get("username") ?? ""),
      password: String(formData.get("password") ?? ""),
      redirect: false,
      callbackUrl: returnTo,
    })

    setPending(false)

    if (result?.error) {
      setError("Invalid credentials. Please try again.")
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
