import { revalidatePath } from "next/cache"
import { NextResponse } from "next/server"

import { isAdminAuthenticated } from "@/lib/admin-auth"
import { deletePost, getCategoryPath, type BlogCategory } from "@/lib/blog-posts"

function readCategory(value: string): BlogCategory {
  if (value === "Career" || value === "Hobbies" || value === "Travel") {
    return value
  }
  return "Career"
}

export async function POST(request: Request) {
  const authenticated = await isAdminAuthenticated()
  if (!authenticated) {
    return NextResponse.redirect(new URL("/login", request.url), { status: 303 })
  }

  const formData = await request.formData()
  const slug = String(formData.get("slug") ?? "").trim()
  const returnTo = String(formData.get("returnTo") ?? "").trim()
  const categoryRaw = String(formData.get("category") ?? "").trim()

  if (!slug) {
    return NextResponse.redirect(new URL("/", request.url), { status: 303 })
  }

  await deletePost(slug)

  revalidatePath("/")
  revalidatePath("/career")
  revalidatePath("/hobbies")
  revalidatePath("/travel")
  revalidatePath("/search")
  revalidatePath(`/blog/${slug}`)

  const fallback = categoryRaw ? getCategoryPath(readCategory(categoryRaw)) : "/"
  const destination = returnTo.startsWith("/") ? returnTo : fallback

  return NextResponse.redirect(new URL(destination, request.url), { status: 303 })
}
