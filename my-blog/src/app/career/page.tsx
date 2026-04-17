import Link from "next/link"
import { ArrowLeft, BriefcaseBusiness, CalendarDays, Goal, Mountain } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { isAdminAuthenticated } from "@/lib/admin-auth"
import { getPostsByCategory } from "@/lib/blog-posts"

export const dynamic = "force-dynamic"

export const metadata = {
  title: "Career | Kemme's Blog",
  description: "Career notes, goals, and future direction.",
}

const milestones = [
  {
    title: "Current status",
    text: "I am focused on learning consistency, practical delivery, and clear communication.",
  },
  {
    title: "Near-term target",
    text: "Take on stronger project ownership and improve decision-making in daily work.",
  },
  {
    title: "Long-term direction",
    text: "Build toward a trusted role with growth potential and meaningful responsibility.",
  },
]

export default async function CareerPage() {
  const isAuthenticated = await isAdminAuthenticated()
  const posts = await getPostsByCategory("Career")

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 pb-20 pt-12 md:px-10">
      <section className="rounded-3xl border border-(--earth-border) bg-(--earth-panel) p-8 md:p-12">
        <div className="flex flex-wrap items-center gap-3">
          <Badge>Career</Badge>
          <Button asChild variant="ghost" className="px-0 text-(--earth-muted) hover:bg-transparent hover:text-(--earth-ink)">
            <Link href="/"><ArrowLeft className="size-4" />Back home</Link>
          </Button>
        </div>

        <h1 className="mt-5 max-w-3xl text-4xl font-semibold tracking-tight text-(--earth-ink) md:text-6xl">
          My career path and where I want to go next.
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-(--earth-muted) md:text-lg">
          This page is for the professional side of the blog: what I do today,
          what I want to learn, and which direction I would like to grow in later.
        </p>
      </section>

      <section className="grid gap-5 md:grid-cols-3">
        {milestones.map((item, index) => (
          <Card key={item.title} className="h-full">
            <CardHeader>
              <div className="flex items-center gap-3 text-(--earth-forest)">
                <div className="flex size-10 items-center justify-center rounded-xl bg-(--earth-stone)">
                  {index === 0 ? <BriefcaseBusiness className="size-5" /> : index === 1 ? <Goal className="size-5" /> : <Mountain className="size-5" />}
                </div>
                <CardTitle>{item.title}</CardTitle>
              </div>
              <CardDescription>{item.text}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </section>

      <Separator />

      <section className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-3xl font-semibold tracking-tight text-(--earth-ink)">Career blog updates</h2>
          {isAuthenticated ? (
            <Button asChild size="sm" className="bg-(--earth-forest) text-white hover:bg-(--earth-forest)/90">
              <Link href="/create?category=Career">Create post</Link>
            </Button>
          ) : null}
        </div>
        <p className="text-sm text-(--earth-muted)">
          Short updates about progress, goals, and changes in direction.
        </p>

        <div className="grid gap-4">
          {posts.map((post) => (
            <Link key={post.id} href={`/blog/${post.slug}`} className="block">
              <Card className="transition-colors hover:bg-(--earth-stone)/30">
                <CardHeader>
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <CardTitle className="text-xl">{post.title}</CardTitle>
                    <Badge className="text-[11px]">Career Post</Badge>
                  </div>
                  <CardDescription>{post.summary}</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-wrap items-center gap-3 text-sm text-(--earth-muted)">
                  <span className="inline-flex items-center gap-1"><CalendarDays className="size-4" />Created: {post.createdAt}</span>
                  <span className="rounded-full border border-(--earth-border) px-2 py-0.5">Updated: {post.updatedAt}</span>
                  <span className="rounded-full border border-(--earth-border) px-2 py-0.5">{post.tags.join(" • ")}</span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
        <Card>
          <CardHeader>
            <CardTitle>What I care about</CardTitle>
            <CardDescription>
              The qualities and habits I want to keep building into my working life.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm leading-relaxed text-(--earth-muted)">
            <p>Learning consistently instead of staying in one comfort zone.</p>
            <p>Taking responsibility for work that has a clear outcome.</p>
            <p>Working in an environment with trust, structure, and room to improve.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Future direction</CardTitle>
            <CardDescription>
              A simple outline of where I would like this path to lead.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-sm leading-relaxed text-(--earth-muted)">
            <p>Develop a stronger professional profile with real experience and clearer goals.</p>
            <p>Find work that combines practical problem solving with long-term learning.</p>
            <p>Keep this space updated with new milestones, thoughts, and direction changes.</p>
          </CardContent>
        </Card>
      </section>
    </main>
  )
}