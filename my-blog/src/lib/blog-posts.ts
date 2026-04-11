import path from "node:path"
import { readdir, readFile, stat } from "node:fs/promises"

export type BlogCategory = "Career" | "Hobbies" | "Travel"

type BlogPostFile = {
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
}

export type BlogPost = BlogPostFile & {
  createdAt: string
  updatedAt: string
}

const POSTS_DIR = path.join(process.cwd(), "src/content/posts")

function toDateString(value: Date): string {
  return value.toISOString().slice(0, 10)
}

async function readPost(fileName: string): Promise<BlogPost> {
  const filePath = path.join(POSTS_DIR, fileName)
  const [raw, fileStats] = await Promise.all([readFile(filePath, "utf-8"), stat(filePath)])

  const post = JSON.parse(raw) as BlogPostFile
  const createdAt = toDateString(fileStats.birthtime)
  const updatedAt = toDateString(fileStats.mtime)

  return {
    ...post,
    createdAt,
    updatedAt,
  }
}

export async function getAllPosts(): Promise<BlogPost[]> {
  const files = await readdir(POSTS_DIR)
  const postFiles = files.filter((file) => file.endsWith(".json"))
  const posts = await Promise.all(postFiles.map((file) => readPost(file)))

  return posts.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
}

export async function getPostsByCategory(category: BlogCategory): Promise<BlogPost[]> {
  const posts = await getAllPosts()
  return posts.filter((post) => post.category === category)
}

export async function getPostBySlug(slug: string): Promise<BlogPost | undefined> {
  const posts = await getAllPosts()
  return posts.find((post) => post.slug === slug)
}

export function getCategoryPath(category: BlogCategory): string {
  return `/${category.toLowerCase()}`
}