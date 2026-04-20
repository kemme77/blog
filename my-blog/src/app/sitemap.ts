import type { MetadataRoute } from "next"

import { getAllPosts } from "@/lib/blog-posts"
import { resolveSiteUrl } from "@/lib/site-url"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = resolveSiteUrl()
  const now = new Date()

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/career`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/hobbies`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/travel`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/profile`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
  ]

  const posts = await getAllPosts()
  const postRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(`${post.updatedAt}T00:00:00.000Z`),
    changeFrequency: "monthly",
    priority: 0.7,
  }))

  return [...staticRoutes, ...postRoutes]
}
