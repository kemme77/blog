import { revalidatePath } from "next/cache"
import Link from "next/link"
import { redirect } from "next/navigation"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { isAdminAuthenticated } from "@/lib/admin-auth"
import { createPost, type BlogCategory } from "@/lib/blog-posts"

type SearchParams = Promise<{ category?: string }>

export const metadata = {
  title: "Create Post | Kemme's Blog",
  description: "Create a new blog post directly on the website.",
}

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

async function createPostAction(formData: FormData) {
  "use server"

  const authenticated = await isAdminAuthenticated()
  if (!authenticated) {
    redirect("/login?returnTo=/create")
  }

  const slug = await createPost({
    title: String(formData.get("title") ?? ""),
    category: readCategory(formData.get("category")),
    summary: String(formData.get("summary") ?? ""),
    content: parseContent(String(formData.get("content") ?? "")),
    tags: parseList(String(formData.get("tags") ?? "")),
    route: String(formData.get("route") ?? "") || undefined,
    rating: formData.get("rating") ? Number(formData.get("rating")) : undefined,
    photoLabel: String(formData.get("photoLabel") ?? "") || undefined,
  })

  revalidatePath("/")
  revalidatePath("/career")
  revalidatePath("/hobbies")
  revalidatePath("/travel")
  revalidatePath("/search")

  redirect(`/blog/${slug}`)
}

export default async function CreatePage({ searchParams }: { searchParams?: SearchParams }) {
  const authenticated = await isAdminAuthenticated()
  if (!authenticated) {
    redirect("/login?returnTo=/create")
  }

  const params = (await searchParams) ?? {}
  const defaultCategory =
    params.category === "Career" || params.category === "Hobbies" || params.category === "Travel"
      ? params.category
      : "Career"

  return (
    <main className="mx-auto flex w-full max-w-4xl flex-col gap-8 px-6 pb-20 pt-12 md:px-10">
      <Card>
        <CardHeader>
          <Badge className="w-fit">Create</Badge>
          <CardTitle className="mt-3 text-3xl">Create new blog post</CardTitle>
          <CardDescription>
            Write once and publish directly to your blog pages.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={createPostAction} className="grid gap-3 md:grid-cols-2">
            <Input name="title" placeholder="Post title" required />
            <select name="category" defaultValue={defaultCategory} className="h-9 rounded-md border border-(--earth-border) bg-(--earth-panel) px-3 text-sm text-(--earth-ink)">
              <option>Career</option>
              <option>Hobbies</option>
              <option>Travel</option>
            </select>
            <Input name="summary" placeholder="Short summary" className="md:col-span-2" required />
            <Textarea name="content" placeholder="One paragraph per line" className="md:col-span-2" required />
            <Input name="tags" placeholder="tags, comma, separated" className="md:col-span-2" required />
            <Input name="route" placeholder="Route (optional, mostly travel)" />
            <Input name="rating" type="number" min="0" max="5" step="0.1" placeholder="Rating 0-5 (optional)" />
            <Input name="photoLabel" placeholder="Photo label (optional)" className="md:col-span-2" />
            <Button type="submit" className="md:col-span-2 bg-(--earth-forest) text-white hover:bg-(--earth-forest)/90">Create post</Button>
          </form>

          <Button asChild variant="ghost" className="mt-4 px-0 text-(--earth-muted) hover:bg-transparent hover:text-(--earth-ink)">
            <Link href="/">Back to home</Link>
          </Button>
        </CardContent>
      </Card>
    </main>
  )
}
