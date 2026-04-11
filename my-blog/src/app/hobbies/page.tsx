import Link from "next/link"
import { ArrowLeft, Fish, FlameKindling, Gamepad2, ShieldAlert } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata = {
  title: "Hobbies | Kemme's Blog",
  description: "Hobbies, side activities, and what I enjoy doing besides work.",
}

const hobbies = [
  {
    title: "Fire brigade",
    icon: FlameKindling,
    text: "A meaningful activity that combines responsibility, teamwork, and being there when it matters.",
  },
  {
    title: "Fishing",
    icon: Fish,
    text: "A calm balance to daily life, with patience, quiet moments, and time outdoors.",
  },
  {
    title: "Rainbow Six",
    icon: Gamepad2,
    text: "A game I enjoy for its tactics, teamwork, and the challenge of staying sharp.",
  },
]

export default function HobbiesPage() {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 pb-20 pt-12 md:px-10">
      <section className="rounded-3xl border border-(--earth-border) bg-(--earth-panel) p-8 md:p-12">
        <div className="flex flex-wrap items-center gap-3">
          <Badge>Hobbies</Badge>
          <Button asChild variant="ghost" className="px-0 text-(--earth-muted) hover:bg-transparent hover:text-(--earth-ink)">
            <Link href="/"><ArrowLeft className="size-4" />Back home</Link>
          </Button>
        </div>

        <h1 className="mt-5 max-w-3xl text-4xl font-semibold tracking-tight text-(--earth-ink) md:text-6xl">
          The things I enjoy outside of work.
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-(--earth-muted) md:text-lg">
          This page covers the activities that keep me grounded, active, and entertained.
        </p>
      </section>

      <section className="grid gap-5 md:grid-cols-3">
        {hobbies.map((hobby) => (
          <Card key={hobby.title} className="h-full">
            <CardHeader>
              <div className="flex items-center gap-3 text-(--earth-forest)">
                <div className="flex size-10 items-center justify-center rounded-xl bg-(--earth-stone)">
                  <hobby.icon className="size-5" />
                </div>
                <CardTitle>{hobby.title}</CardTitle>
              </div>
              <CardDescription>{hobby.text}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </section>

      <section className="grid gap-5 lg:grid-cols-[1fr_0.9fr]">
        <Card>
          <CardHeader>
            <CardTitle>What fills my free time</CardTitle>
            <CardDescription>
              A quick overview of the activities I want to write about here.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm leading-relaxed text-(--earth-muted)">
            <p>Fire brigade moments, training, and the teamwork that comes with it.</p>
            <p>Fishing trips, quiet mornings, and the patience that the hobby teaches.</p>
            <p>Rainbow Six sessions, strategies, and the fun of playing with a focused team.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3 text-(--earth-forest)">
              <ShieldAlert className="size-5" />
              <CardTitle>Why I like them</CardTitle>
            </div>
            <CardDescription>
              Different hobbies, but each one gives me something useful.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-sm leading-relaxed text-(--earth-muted)">
            <p>They balance focus and relaxation.</p>
            <p>They give me stories worth sharing.</p>
            <p>They help me keep a healthy mix of energy, discipline, and downtime.</p>
          </CardContent>
        </Card>
      </section>
    </main>
  )
}