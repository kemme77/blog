import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Camera, MapPinned, Mountain, Route } from "lucide-react"

import travelPhoto from "@/images/EnkelTrick.png"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export const metadata = {
  title: "Travel | Kemme's Blog",
  description: "Short travel reports with photos and highlights.",
}

const trips = [
  {
    title: "Weekend escape",
    place: "Somewhere calm and scenic",
    text: "A short break with fresh air, a slower rhythm, and a few moments worth remembering.",
  },
  {
    title: "City trip",
    place: "A place full of movement and energy",
    text: "Food, walking routes, and the kind of impressions that only a city can create.",
  },
  {
    title: "Nature route",
    place: "Mountains, water, and open space",
    text: "One of those trips where the landscape becomes the main memory.",
  },
]

export default function TravelPage() {
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
          <div className="relative aspect-[16/10] w-full bg-(--earth-stone)">
            <Image
              src={travelPhoto}
              alt="Featured travel photo placeholder"
              fill
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
              Replace this image with one of your own travel photos whenever you are ready.
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
                A quick structure for short reports from future trips.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm leading-relaxed text-(--earth-muted)">
              <p>What I did.</p>
              <p>What stood out.</p>
              <p>What I would recommend.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-3 text-(--earth-forest)">
                <MapPinned className="size-5" />
                <CardTitle>Future posts</CardTitle>
              </div>
              <CardDescription>
                The travel page is ready for separate reports from each place.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      <Separator />

      <section className="grid gap-5 md:grid-cols-3">
        {trips.map((trip) => (
          <Card key={trip.title} className="h-full">
            <CardHeader>
              <div className="flex items-center gap-3 text-(--earth-forest)">
                <Mountain className="size-5" />
                <CardTitle>{trip.title}</CardTitle>
              </div>
              <CardDescription>{trip.place}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed text-(--earth-muted)">{trip.text}</p>
            </CardContent>
          </Card>
        ))}
      </section>
    </main>
  )
}