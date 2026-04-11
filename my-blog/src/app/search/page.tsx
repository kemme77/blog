import Link from "next/link"
import { ArrowLeft, Search, Sparkles } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { searchContent } from "@/lib/search-index"

export const metadata = {
  title: "Search | Kemme's Blog",
  description: "Search only blog posts from career, hobbies, and travel.",
}

type SearchParams = Promise<{ q?: string }> | { q?: string }

export default async function SearchPage({
  searchParams,
}: {
  searchParams: SearchParams
}) {
  const params = await Promise.resolve(searchParams)
  const query = (params.q ?? "").toString()
  const results = await searchContent(query)

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 pb-20 pt-12 md:px-10">
      <section className="rounded-3xl border border-(--earth-border) bg-(--earth-panel) p-8 md:p-12">
        <div className="flex flex-wrap items-center gap-3">
          <Badge>Global Search</Badge>
          <Button asChild variant="ghost" className="px-0 text-(--earth-muted) hover:bg-transparent hover:text-(--earth-ink)">
            <Link href="/"><ArrowLeft className="size-4" />Back home</Link>
          </Button>
        </div>

        <h1 className="mt-5 text-4xl font-semibold tracking-tight text-(--earth-ink) md:text-5xl">
          Search blog posts only.
        </h1>

        <form action="/search" method="GET" className="mt-6 flex w-full flex-col gap-3 sm:flex-row">
          <Input
            name="q"
            defaultValue={query}
            placeholder="Try: firefighting, goals, route, photos..."
            aria-label="Search blog content"
            className="h-10"
          />
          <Button type="submit" className="h-10 bg-(--earth-forest) text-white hover:bg-(--earth-forest)/90">
            <Search className="size-4" /> Search
          </Button>
        </form>

        {query ? (
          <p className="mt-4 text-sm text-(--earth-muted)">
            {results.length} result{results.length === 1 ? "" : "s"} for &quot;{query}&quot;
          </p>
        ) : (
          <p className="mt-4 text-sm text-(--earth-muted)">
            Enter a term to search in blog posts from Career, Hobbies, and Travel.
          </p>
        )}
      </section>

      {query && results.length === 0 ? (
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3 text-(--earth-forest)">
              <Sparkles className="size-5" />
              <CardTitle>No matches yet</CardTitle>
            </div>
            <CardDescription>
              Try broader terms like &quot;goals&quot;, &quot;fishing&quot;, &quot;route&quot;, or &quot;photos&quot;.
            </CardDescription>
          </CardHeader>
        </Card>
      ) : null}

      {results.length > 0 ? (
        <section className="grid gap-4">
          {results.map((result) => (
            <Link key={result.id} href={result.href} className="block">
              <Card className="transition-colors hover:bg-(--earth-stone)/30">
                <CardHeader>
                  <div className="flex items-center justify-between gap-3">
                    <CardTitle className="text-xl">{result.title}</CardTitle>
                    <Badge className="text-[11px]">{result.category}</Badge>
                  </div>
                  <CardDescription>{result.excerpt}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-(--earth-muted)">Open full post</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </section>
      ) : null}
    </main>
  )
}