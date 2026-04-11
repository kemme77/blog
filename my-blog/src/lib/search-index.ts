export type SearchItem = {
  id: string
  title: string
  href: string
  category: "Career" | "Hobbies" | "Travel"
  excerpt: string
  terms: string[]
}

import { blogPosts } from "@/lib/blog-posts"

export const searchItems: SearchItem[] = blogPosts.map((post) => ({
  id: post.id,
  title: post.title,
  href: `/${post.category.toLowerCase()}`,
  category: post.category,
  excerpt: post.summary,
  terms: [
    ...post.tags,
    post.slug,
    post.route ?? "",
    post.photoLabel ?? "",
    post.rating ? `rating ${post.rating}` : "",
  ].filter(Boolean),
}))

export function searchContent(query: string): SearchItem[] {
  const q = query.trim().toLowerCase()

  if (!q) {
    return []
  }

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