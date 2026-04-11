import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { ArrowLeft, CalendarDays, Route, Star, Tag } from "lucide-react"

import travelPhoto from "@/images/EnkelTrick.png"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { getCategoryPath, getPostBySlug } from "@/lib/blog-posts"

type Params = Promise<{ slug: string }> | { slug: string }

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const resolved = await Promise.resolve(params)
  const post = await getPostBySlug(resolved.slug)

  if (!post) {
    return {
      title: "Post not found | Kemme's Blog",
    }
  }

  return {
    title: `${post.title} | Kemme's Blog`,
    description: post.summary,
  }
}

export default async function BlogPostPage({ params }: { params: Params }) {
  const resolved = await Promise.resolve(params)
  const post = await getPostBySlug(resolved.slug)

  if (!post) {
    notFound()
  }

  const categoryPath = getCategoryPath(post.category)

  return (
    <main className="mx-auto flex w-full max-w-4xl flex-col gap-8 px-6 pb-20 pt-12 md:px-10">
      <section className="rounded-3xl border border-(--earth-border) bg-(--earth-panel) p-8 md:p-12">
        <div className="flex flex-wrap items-center gap-3">
          <Badge>{post.category} Post</Badge>
          <Button asChild variant="ghost" className="px-0 text-(--earth-muted) hover:bg-transparent hover:text-(--earth-ink)">
            <Link href={categoryPath}><ArrowLeft className="size-4" />Back to {post.category}</Link>
          </Button>
        </div>

        <h1 className="mt-5 text-4xl leading-tight font-semibold tracking-tight text-(--earth-ink) md:text-5xl">
          {post.title}
        </h1>
        <p className="mt-5 text-base leading-relaxed text-(--earth-muted) md:text-lg">{post.summary}</p>

        <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-(--earth-muted)">
          <span className="inline-flex items-center gap-1"><CalendarDays className="size-4" />Created: {post.createdAt}</span>
          <span className="rounded-full border border-(--earth-border) px-2 py-0.5">Updated: {post.updatedAt}</span>
          <span className="inline-flex items-center gap-1"><Tag className="size-4" />{post.tags.join(" • ")}</span>
          {post.route ? <span className="inline-flex items-center gap-1"><Route className="size-4" />{post.route}</span> : null}
          {post.rating ? <span className="inline-flex items-center gap-1"><Star className="size-4" />{post.rating}/5</span> : null}
        </div>
      </section>

      {post.category === "Travel" ? (
        <Card className="overflow-hidden">
          <div className="relative aspect-video w-full bg-(--earth-stone)">
            <Image src={travelPhoto} alt={post.photoLabel ?? "Travel post image"} fill className="object-cover" />
          </div>
          <CardHeader>
            <CardTitle>{post.photoLabel ?? "Photo highlight"}</CardTitle>
            <CardDescription>
              This visual can be replaced with the real image for this specific trip post.
            </CardDescription>
          </CardHeader>
        </Card>
      ) : null}

      <Separator />

      <article className="space-y-4 rounded-2xl border border-(--earth-border) bg-(--earth-panel) p-6 md:p-8">
        {post.content.map((paragraph, index) => (
          <p key={index} className="leading-relaxed text-(--earth-muted)">
            {paragraph}
          </p>
        ))}
      </article>
    </main>
  )
}