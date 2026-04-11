import Link from "next/link"
import { redirect } from "next/navigation"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { isAdminAuthenticated } from "@/lib/admin-auth"

type SearchParams = Promise<{ error?: string; returnTo?: string }>

export const metadata = {
  title: "Login | Kemme's Blog",
  description: "Login to manage blog posts directly on the website.",
}

export default async function LoginPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams
  const returnTo = params.returnTo?.startsWith("/") ? params.returnTo : "/"

  const authenticated = await isAdminAuthenticated()
  if (authenticated) {
    redirect(returnTo)
  }

  const hasError = params.error === "1"

  return (
    <main className="mx-auto flex w-full max-w-xl flex-col gap-8 px-6 pb-20 pt-14 md:px-10">
      <Card>
        <CardHeader>
          <Badge className="w-fit">Admin Login</Badge>
          <CardTitle className="mt-4 text-3xl">Manage your posts</CardTitle>
          <CardDescription>
            Sign in once, then create, edit, and delete blog posts directly in your browser.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action="/api/auth/login" method="POST" className="space-y-4">
            <input type="hidden" name="returnTo" value={returnTo} />
            <div className="space-y-2">
              <label htmlFor="username" className="text-sm font-medium text-(--earth-ink)">Username</label>
              <Input id="username" name="username" required />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-(--earth-ink)">Password</label>
              <Input id="password" name="password" type="password" required />
            </div>

            {hasError ? (
              <p className="text-sm text-red-600">Invalid credentials. Please try again.</p>
            ) : null}

            <Button type="submit" className="w-full bg-(--earth-forest) text-white hover:bg-(--earth-forest)/90">
              Login
            </Button>
          </form>

          <Button asChild variant="ghost" className="mt-4 px-0 text-(--earth-muted) hover:bg-transparent hover:text-(--earth-ink)">
            <Link href="/">Back to home</Link>
          </Button>
        </CardContent>
      </Card>
    </main>
  )
}
