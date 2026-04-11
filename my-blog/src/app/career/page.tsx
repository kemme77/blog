import Link from "next/link"
import { ArrowLeft, BriefcaseBusiness, Goal, Mountain, Sparkles } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export const metadata = {
  title: "Career | Kemme's Blog",
  description: "Career notes, goals, and future direction.",
}

const milestones = [
  {
    title: "Right now",
    text: "I am documenting what I am learning, what is working, and what I want to improve next.",
  },
  {
    title: "Next step",
    text: "I want to take on more responsibility, sharpen my skills, and work on projects that matter.",
  },
  {
    title: "Long term",
    text: "My goal is a role that combines growth, trust, and clear room to keep developing.",
  },
]

export default function CareerPage() {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 pb-20 pt-12 md:px-10">
      <section className="rounded-3xl border border-(--earth-border) bg-(--earth-panel) p-8 md:p-12">
        <div className="flex flex-wrap items-center gap-3">
          <Badge>Career</Badge>
          <Button asChild variant="ghost" className="px-0 text-(--earth-muted) hover:bg-transparent hover:text-(--earth-ink)">
            <Link href="/"><ArrowLeft className="size-4" />Back home</Link>
          </Button>
        </div>

        <h1 className="mt-5 max-w-3xl text-4xl font-semibold tracking-tight text-(--earth-ink) md:text-6xl">
          My career path and where I want to go next.
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-(--earth-muted) md:text-lg">
          This page is for the professional side of the blog: what I do today,
          what I want to learn, and which direction I would like to grow in later.
        </p>
      </section>

      <section className="grid gap-5 md:grid-cols-3">
        {milestones.map((item, index) => (
          <Card key={item.title} className="h-full">
            <CardHeader>
              <div className="flex items-center gap-3 text-(--earth-forest)">
                <div className="flex size-10 items-center justify-center rounded-xl bg-(--earth-stone)">
                  {index === 0 ? <BriefcaseBusiness className="size-5" /> : index === 1 ? <Goal className="size-5" /> : <Mountain className="size-5" />}
                </div>
                <CardTitle>{item.title}</CardTitle>
              </div>
              <CardDescription>{item.text}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </section>

      <Separator />

      <section className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
        <Card>
          <CardHeader>
            <CardTitle>What I care about</CardTitle>
            <CardDescription>
              The qualities and habits I want to keep building into my working life.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm leading-relaxed text-(--earth-muted)">
            <p>Learning consistently instead of staying in one comfort zone.</p>
            <p>Taking responsibility for work that has a clear outcome.</p>
            <p>Working in an environment with trust, structure, and room to improve.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3 text-(--earth-forest)">
              <Sparkles className="size-5" />
              <CardTitle>Future direction</CardTitle>
            </div>
            <CardDescription>
              A simple outline of where I would like this path to lead.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-sm leading-relaxed text-(--earth-muted)">
            <p>Develop a stronger professional profile with real experience and clearer goals.</p>
            <p>Find work that combines practical problem solving with long-term learning.</p>
            <p>Keep this space updated with new milestones, thoughts, and direction changes.</p>
          </CardContent>
        </Card>
      </section>
    </main>
  )
}