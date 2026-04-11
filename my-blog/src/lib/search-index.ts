export type SearchItem = {
  id: string
  title: string
  href: string
  category: "Career" | "Hobbies" | "Travel"
  excerpt: string
  terms: string[]
}

import { getAllPosts } from "@/lib/blog-posts"

export async function getSearchItems(): Promise<SearchItem[]> {
  const posts = await getAllPosts()

  return posts.map((post) => ({
    id: post.id,
    title: post.title,
    href: `/blog/${post.slug}`,
    category: post.category,
    excerpt: post.summary,
    terms: [
      ...post.tags,
      post.slug,
      post.route ?? "",
      post.photoLabel ?? "",
      post.rating ? `rating ${post.rating}` : "",
      post.createdAt,
      post.updatedAt,
    ].filter(Boolean),
  }))
}

export async function searchContent(query: string): Promise<SearchItem[]> {
  const q = query.trim().toLowerCase()

  if (!q) {
    return []
  }

  const searchItems = await getSearchItems()

  return searchItems
    .map((item) => {
      const haystack = [item.title, item.excerpt, ...item.terms].join(" ").toLowerCase()
      const score =
        (item.title.toLowerCase().includes(q) ? 6 : 0) +
        (item.excerpt.toLowerCase().includes(q) ? 3 : 0) +
        (item.terms.some((term) => term.toLowerCase().includes(q)) ? 2 : 0)

      return { item, score, matches: haystack.includes(q) }
    })
    .filter((entry) => entry.matches)
    .sort((a, b) => b.score - a.score)
    .map((entry) => entry.item)
}