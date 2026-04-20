import { prisma } from "@/lib/prisma"

export type BlogCategory = "Career" | "Hobbies" | "Travel"

export type BlogPost = {
  id: string
  title: string
  slug: string
  category: BlogCategory
  summary: string
  content: string[]
  tags: string[]
  route?: string
  rating?: number
  photoLabel?: string
  createdAt: string
  updatedAt: string
}

type PostInput = {
  title: string
  category: BlogCategory
  summary: string
  content: string[]
  tags: string[]
  route?: string
  rating?: number
  photoLabel?: string
}

function toDateString(value: Date): string {
  return value.toISOString().slice(0, 10)
}

function normalizeSlug(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
}

function toStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) {
    return []
  }

  return value
    .map((item) => String(item).trim())
    .filter(Boolean)
}

function mapDbPost(post: {
  id: string
  title: string
  slug: string
  category: BlogCategory
  summary: string
  content: unknown
  tags: unknown
  route: string | null
  rating: number | null
  photoLabel: string | null
  createdAt: Date
  updatedAt: Date
}): BlogPost {
  return {
    id: post.id,
    title: post.title,
    slug: post.slug,
    category: post.category,
    summary: post.summary,
    content: toStringArray(post.content),
    tags: toStringArray(post.tags),
    route: post.route ?? undefined,
    rating: post.rating ?? undefined,
    photoLabel: post.photoLabel ?? undefined,
    createdAt: toDateString(post.createdAt),
    updatedAt: toDateString(post.updatedAt),
  }
}

export async function getAllPosts(): Promise<BlogPost[]> {
  try {
    const posts = await prisma.blogPost.findMany({
      orderBy: {
        updatedAt: "desc",
      },
    })

    return posts.map((post: Parameters<typeof mapDbPost>[0]) => mapDbPost(post))
  } catch (error) {
    console.error("[posts] Failed to load all posts:", error)
    return []
  }
}

export async function getPostsByCategory(category: BlogCategory): Promise<BlogPost[]> {
  try {
    const posts = await prisma.blogPost.findMany({
      where: {
        category,
      },
      orderBy: {
        updatedAt: "desc",
      },
    })

    return posts.map((post: Parameters<typeof mapDbPost>[0]) => mapDbPost(post))
  } catch (error) {
    console.error(`[posts] Failed to load category ${category}:`, error)
    return []
  }
}

export async function getPostBySlug(slug: string): Promise<BlogPost | undefined> {
  try {
    const post = await prisma.blogPost.findUnique({
      where: {
        slug,
      },
    })

    if (!post) {
      return undefined
    }

    return mapDbPost(post)
  } catch (error) {
    console.error(`[posts] Failed to load slug ${slug}:`, error)
    return undefined
  }
}

export async function createPost(input: PostInput): Promise<string> {
  const slug = normalizeSlug(input.title)
  if (!slug) {
    throw new Error("Title cannot be empty")
  }

  const existing = await prisma.blogPost.findUnique({ where: { slug } })
  if (existing) {
    throw new Error("A post with this title/slug already exists")
  }

  await prisma.blogPost.create({
    data: {
      title: input.title,
      slug,
      category: input.category,
      summary: input.summary,
      content: input.content,
      tags: input.tags,
      route: input.route,
      rating: input.rating,
      photoLabel: input.photoLabel,
    },
  })

  return slug
}

export async function updatePost(previousSlug: string, input: PostInput): Promise<string> {
  const existing = await prisma.blogPost.findUnique({ where: { slug: previousSlug } })
  if (!existing) {
    throw new Error("Post not found")
  }

  const nextSlug = normalizeSlug(input.title)
  if (!nextSlug) {
    throw new Error("Title cannot be empty")
  }

  if (nextSlug !== previousSlug) {
    const duplicate = await prisma.blogPost.findUnique({ where: { slug: nextSlug } })
    if (duplicate) {
      throw new Error("Another post with this title/slug already exists")
    }
  }

  await prisma.blogPost.update({
    where: {
      slug: previousSlug,
    },
    data: {
      title: input.title,
      slug: nextSlug,
      category: input.category,
      summary: input.summary,
      content: input.content,
      tags: input.tags,
      route: input.route,
      rating: input.rating,
      photoLabel: input.photoLabel,
    },
  })

  return nextSlug
}

export async function deletePost(slug: string): Promise<void> {
  const existing = await prisma.blogPost.findUnique({ where: { slug } })
  if (!existing) {
    throw new Error("Post not found")
  }

  await prisma.blogPost.delete({
    where: {
      slug,
    },
  })
}

export function getCategoryPath(category: BlogCategory): string {
  return `/${category.toLowerCase()}`
}
