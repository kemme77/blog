"use client"

import { Button } from "@/components/ui/button"

type DeletePostFormProps = {
  slug: string
  category?: "Career" | "Hobbies" | "Travel"
  returnTo?: string
  buttonLabel?: string
}

export default function DeletePostForm({
  slug,
  category,
  returnTo,
  buttonLabel = "Delete post",
}: DeletePostFormProps) {
  return (
    <form
      action="/api/posts/delete"
      method="POST"
      onSubmit={(event) => {
        const confirmed = window.confirm("Are you sure you want to delete this post? This action cannot be undone.")
        if (!confirmed) {
          event.preventDefault()
        }
      }}
    >
      <input type="hidden" name="slug" value={slug} />
      {category ? <input type="hidden" name="category" value={category} /> : null}
      {returnTo ? <input type="hidden" name="returnTo" value={returnTo} /> : null}
      <Button type="submit" variant="destructive">{buttonLabel}</Button>
    </form>
  )
}
