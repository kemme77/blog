import Image from "next/image"
import Link from "next/link"
import { notFound, redirect } from "next/navigation"
import type { Metadata } from "next"
import { ArrowLeft, CalendarDays, Route, Star, Tag } from "lucide-react"
import { revalidatePath } from "next/cache"

import travelPhoto from "@/images/EnkelTrick.png"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import DeletePostForm from "@/components/DeletePostForm"
import { isAdminAuthenticated } from "@/lib/admin-auth"
import { getCategoryPath, getPostBySlug, type BlogCategory, updatePost } from "@/lib/blog-posts"

type Params = Promise<{ slug: string }>

function parseList(raw: string): string[] {
  return raw
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean)
}

function parseContent(raw: string): string[] {
  return raw
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
}

function readCategory(value: FormDataEntryValue | null): BlogCategory {
  const category = String(value ?? "")
  if (category === "Career" || category === "Hobbies" || category === "Travel") {
    return category
  }
  return "Career"
}

async function updatePostAction(formData: FormData) {
  "use server"

  const authenticated = await isAdminAuthenticated()
  if (!authenticated) {
    redirect("/login")
  }

  const previousSlug = String(formData.get("previousSlug") ?? "")

  await updatePost(previousSlug, {
    title: String(formData.get("title") ?? ""),
    category: readCategory(formData.get("category")),
    summary: String(formData.get("summary") ?? ""),
    content: parseContent(String(formData.get("content") ?? "")),
    tags: parseList(String(formData.get("tags") ?? "")),
    route: String(formData.get("route") ?? "") || undefined,
    rating: formData.get("rating") ? Number(formData.get("rating")) : undefined,
    photoLabel: String(formData.get("photoLabel") ?? "") || undefined,
  })

  const updated = await getPostBySlug(previousSlug)
  const slug = updated?.slug ?? previousSlug

  revalidatePath("/")
  revalidatePath("/career")
  revalidatePath("/hobbies")
  revalidatePath("/travel")
  revalidatePath("/search")
  revalidatePath(`/blog/${previousSlug}`)
  if (slug !== previousSlug) {
    revalidatePath(`/blog/${slug}`)
  }

  redirect(`/blog/${slug}`)
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const resolved = await params
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
  const resolved = await params
  const post = await getPostBySlug(resolved.slug)
  const isAuthenticated = await isAdminAuthenticated()

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

      {isAuthenticated ? (
        <section className="rounded-2xl border border-(--earth-border) bg-(--earth-panel) p-6 md:p-8">
          <h2 className="text-2xl font-semibold text-(--earth-ink)">Edit this post</h2>
          <p className="mt-2 text-sm text-(--earth-muted)">Changes are saved directly to your database.</p>

          <form action={updatePostAction} className="mt-5 grid gap-3 md:grid-cols-2">
            <input type="hidden" name="previousSlug" value={post.slug} />
            <Input name="title" defaultValue={post.title} required />
            <select name="category" defaultValue={post.category} className="h-9 rounded-md border border-(--earth-border) bg-(--earth-panel) px-3 text-sm text-(--earth-ink)">
              <option>Career</option>
              <option>Hobbies</option>
              <option>Travel</option>
            </select>
            <Input name="summary" defaultValue={post.summary} className="md:col-span-2" required />
            <Textarea name="content" defaultValue={post.content.join("\n")} className="md:col-span-2" required />
            <Input name="tags" defaultValue={post.tags.join(", ")} className="md:col-span-2" required />
            <Input name="route" defaultValue={post.route ?? ""} placeholder="Route (optional)" />
            <Input name="rating" type="number" min="0" max="5" step="0.1" defaultValue={post.rating ?? ""} placeholder="Rating (optional)" />
            <Input name="photoLabel" defaultValue={post.photoLabel ?? ""} className="md:col-span-2" placeholder="Photo label (optional)" />
            <Button type="submit" className="md:col-span-2 bg-(--earth-forest) text-white hover:bg-(--earth-forest)/90">Save changes</Button>
          </form>

          <div className="mt-4">
            <DeletePostForm slug={post.slug} category={post.category} returnTo={categoryPath} />
          </div>
        </section>
      ) : null}
    </main>
  )
}