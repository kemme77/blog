import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, CalendarDays, Camera, MapPinned, Route, Star } from "lucide-react"

import travelPhoto from "@/images/EnkelTrick.png"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { isAdminAuthenticated } from "@/lib/admin-auth"
import { getPostsByCategory } from "@/lib/blog-posts"

export const dynamic = "force-dynamic"

export const metadata = {
  title: "Travel | Kemme's Blog",
  description: "Short travel reports with photos and highlights.",
}

const upcomingTrips = [
  { destination: "Northern coastline", focus: "Sea route and sunset spots", period: "Summer 2026" },
  { destination: "Mountain region", focus: "Hiking trail and photo points", period: "Autumn 2026" },
]

export default async function TravelPage() {
  const isAuthenticated = await isAdminAuthenticated()
  const posts = await getPostsByCategory("Travel")

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 pb-20 pt-12 md:px-10">
      <section className="rounded-3xl border border-(--earth-border) bg-(--earth-panel) p-8 md:p-12">
        <div className="flex flex-wrap items-center gap-3">
          <Badge>Travel</Badge>
          <Button asChild variant="ghost" className="px-0 text-(--earth-muted) hover:bg-transparent hover:text-(--earth-ink)">
            <Link href="/"><ArrowLeft className="size-4" />Back home</Link>
          </Button>
        </div>

        <h1 className="mt-5 max-w-3xl text-4xl font-semibold tracking-tight text-(--earth-ink) md:text-6xl">
          Small travel stories with photos and memories.
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-(--earth-muted) md:text-lg">
          This page is built for short travel reports, image highlights, and the places I want to remember.
        </p>
      </section>

      <section className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
        <Card className="overflow-hidden">
          <div className="relative aspect-16/10 w-full bg-(--earth-stone)">
            <Image
              src={travelPhoto}
              alt="Featured travel photo placeholder"
              fill
              sizes="(max-width: 1024px) 100vw, 70vw"
              className="object-cover"
              priority
            />
          </div>
          <CardContent className="pt-5">
            <div className="flex items-center gap-2 text-(--earth-forest)">
              <Camera className="size-4" />
              <p className="text-sm font-semibold uppercase tracking-[0.18em]">Featured photo</p>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-(--earth-muted)">
              Replace this with your own travel photo highlights anytime.
            </p>
          </CardContent>
        </Card>

        <div className="grid gap-5">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3 text-(--earth-forest)">
                <Route className="size-5" />
                <CardTitle>Travel notes</CardTitle>
              </div>
              <CardDescription>
                  Blog-post format: short story, route, rating, and selected photos.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm leading-relaxed text-(--earth-muted)">
                <p>Where I went and what the route looked like.</p>
                <p>How I would rate the experience.</p>
                <p>What I would recommend for a next visit.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-3 text-(--earth-forest)">
                <MapPinned className="size-5" />
                <CardTitle>Outlook: upcoming trips</CardTitle>
              </div>
              <CardDescription>The next destinations already planned.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-(--earth-muted)">
              {upcomingTrips.map((trip) => (
                <div key={trip.destination} className="rounded-xl border border-(--earth-border) px-3 py-2">
                  <p className="font-semibold text-(--earth-ink)">{trip.destination}</p>
                  <p>{trip.focus}</p>
                  <p className="text-xs uppercase tracking-wide">{trip.period}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </section>

      <Separator />

      <section className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-3xl font-semibold tracking-tight text-(--earth-ink)">Travel blog posts</h2>
          {isAuthenticated ? (
            <Button asChild size="sm" className="bg-(--earth-forest) text-white hover:bg-(--earth-forest)/90">
              <Link href="/create?category=Travel">Create post</Link>
            </Button>
          ) : null}
        </div>
        <p className="text-sm text-(--earth-muted)">
          Each entry includes a route, rating, and photo context.
        </p>

        <div className="grid gap-4 md:grid-cols-2">
          {posts.map((post) => (
            <Link key={post.id} href={`/blog/${post.slug}`} className="block">
              <Card className="h-full overflow-hidden transition-colors hover:bg-(--earth-stone)/30">
                <div className="relative aspect-16/10 w-full bg-(--earth-stone)">
                  <Image
                    src={travelPhoto}
                    alt={post.photoLabel ?? "Travel image"}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
              <CardHeader>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <CardTitle className="text-xl">{post.title}</CardTitle>
                  <Badge className="text-[11px]">Travel Post</Badge>
                </div>
                <CardDescription>{post.summary}</CardDescription>
              </CardHeader>
                <CardContent className="space-y-2 text-sm text-(--earth-muted)">
                  <p className="inline-flex items-center gap-1"><CalendarDays className="size-4" />Created: {post.createdAt}</p>
                  <p className="rounded-full border border-(--earth-border) px-2 py-0.5">Updated: {post.updatedAt}</p>
                  <p className="inline-flex items-center gap-1"><Route className="size-4" />{post.route}</p>
                  <p className="inline-flex items-center gap-1"><Star className="size-4" />Rating: {post.rating}/5</p>
                  <p className="rounded-full border border-(--earth-border) px-2 py-0.5">{post.tags.join(" • ")}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}