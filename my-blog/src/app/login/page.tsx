import Link from "next/link"
import { redirect } from "next/navigation"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { isAdminAuthenticated } from "@/lib/admin-auth"
import LoginForm from "@/components/LoginForm"

type SearchParams = Promise<{ returnTo?: string }>

export const dynamic = "force-dynamic"

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

  return (
    <main className="mx-auto flex w-full max-w-xl flex-col gap-8 px-6 pb-20 pt-14 md:px-10">
      <Card>
        <CardHeader>
          <Badge className="w-fit">Login</Badge>
          <CardTitle className="mt-4 text-3xl">Manage your posts</CardTitle>
          <CardDescription>
            Sign in once, then create, edit, and delete blog posts directly in your browser.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm returnTo={returnTo} />

          <Button asChild variant="ghost" className="mt-4 px-0 text-(--earth-muted) hover:bg-transparent hover:text-(--earth-ink)">
            <Link href="/">Back to home</Link>
          </Button>
        </CardContent>
      </Card>
    </main>
  )
}
