import Link from "next/link"
import { ArrowLeft, BadgeCheck, HeartHandshake, MapPin, UserRound } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export const metadata = {
  title: "Profile | Kemme's Blog",
  description: "Short profile, interests, and personal details.",
}

const facts = [
  { label: "Name", value: "Kemme" },
  { label: "Interests", value: "Career growth, hobbies, travel, and technology" },
  { label: "Location", value: "To be added" },
  { label: "Mindset", value: "Stay curious, stay practical, keep improving" },
]

export default function ProfilePage() {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 pb-20 pt-12 md:px-10">
      <section className="rounded-3xl border border-(--earth-border) bg-(--earth-panel) p-8 md:p-12">
        <div className="flex flex-wrap items-center gap-3">
          <Badge>Profile</Badge>
          <Button asChild variant="ghost" className="px-0 text-(--earth-muted) hover:bg-transparent hover:text-(--earth-ink)">
            <Link href="/"><ArrowLeft className="size-4" />Back home</Link>
          </Button>
        </div>

        <h1 className="mt-5 max-w-3xl text-4xl font-semibold tracking-tight text-(--earth-ink) md:text-6xl">
          A short introduction about me.
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-(--earth-muted) md:text-lg">
          This page gives visitors a quick overview of who I am and what I care about.
        </p>
      </section>

      <section className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3 text-(--earth-forest)">
              <UserRound className="size-5" />
              <CardTitle>About me</CardTitle>
            </div>
            <CardDescription>
              A short and simple profile for the front page and personal stories.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-sm leading-relaxed text-(--earth-muted)">
            <p>I like clear structure, useful projects, and content that feels personal.</p>
            <p>I enjoy topics that mix real-life experience with learning and reflection.</p>
            <p>This blog is meant to stay honest, calm, and easy to browse.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3 text-(--earth-forest)">
              <HeartHandshake className="size-5" />
              <CardTitle>Interests and values</CardTitle>
            </div>
            <CardDescription>
              A compact list of what matters most to me.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3 md:grid-cols-2">
            {facts.map((fact) => (
              <div key={fact.label} className="rounded-2xl border border-(--earth-border) bg-(--earth-stone)/40 p-4">
                <div className="mb-2 flex items-center gap-2 text-(--earth-forest)">
                  <BadgeCheck className="size-4" />
                  <p className="text-sm font-semibold text-(--earth-ink)">{fact.label}</p>
                </div>
                <p className="text-sm leading-relaxed text-(--earth-muted)">{fact.value}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      <Separator />

      <Card>
        <CardHeader>
          <div className="flex items-center gap-3 text-(--earth-forest)">
            <MapPin className="size-5" />
            <CardTitle>What visitors should expect</CardTitle>
          </div>
          <CardDescription>
            Short stories, honest updates, and a consistent visual style.
          </CardDescription>
        </CardHeader>
      </Card>
    </main>
  )
}