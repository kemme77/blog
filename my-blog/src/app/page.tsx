import Link from "next/link";

import { ArrowRight, BriefcaseBusiness, Camera, UserRound, Waves } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 pb-20 pt-12 md:px-10">
      <section className="rounded-3xl border border-(--earth-border) bg-(--earth-panel) p-8 md:p-12">
        <Badge className="mb-5">Personal Blog</Badge>
        <h1 className="max-w-3xl text-4xl leading-tight font-semibold tracking-tight text-(--earth-ink) md:text-6xl">
          A personal blog about career, hobbies, travel, and who I am.
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-(--earth-muted) md:text-lg">
          This space is designed as a clean, nature-toned blog with separate
          pages for every topic, plus a short profile about me.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button asChild className="bg-(--earth-forest) text-white hover:bg-(--earth-forest)/90">
            <Link href="/career">Start with Career <ArrowRight className="size-4" /></Link>
          </Button>
          <Button asChild variant="outline" className="border-(--earth-border) bg-transparent hover:bg-(--earth-stone)">
            <Link href="/travel">See Travel Stories</Link>
          </Button>
        </div>
      </section>

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {pages.map((page) => (
          <Card key={page.title} className="h-full">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex size-11 items-center justify-center rounded-xl bg-(--earth-stone) text-(--earth-forest)">
                  <page.icon className="size-5" />
                </div>
                <CardTitle>{page.title}</CardTitle>
              </div>
              <CardDescription>{page.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed text-(--earth-muted)">{page.preview}</p>
            </CardContent>
            <CardFooter>
              <Button asChild variant="ghost" className="px-0 text-(--earth-forest) hover:bg-transparent hover:text-(--earth-ink)">
                <Link href={page.href}>Open page <ArrowRight className="size-4" /></Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </section>

      <Separator />

      <section className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
        <Card>
          <CardHeader>
            <CardTitle>What you&apos;ll find here</CardTitle>
            <CardDescription>
              Clear, focused content with room for updates, photos, and longer notes.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm leading-relaxed text-(--earth-muted)">
            <p>Career posts can capture where I am today and where I want to go next.</p>
            <p>Hobbies can cover firefighting, fishing, Rainbow Six, and whatever else keeps me busy.</p>
            <p>Travel will hold short stories and photo-based memories from different trips.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick profile</CardTitle>
            <CardDescription>A short snapshot for visitors landing on the blog.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-(--earth-muted)">
            <p><span className="font-semibold text-(--earth-ink)">Name:</span> Kemme</p>
            <p><span className="font-semibold text-(--earth-ink)">Focus:</span> Career, hobbies, and travel</p>
            <p><span className="font-semibold text-(--earth-ink)">Style:</span> Earth tones, calm layout, strong contrast</p>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}

const pages = [
  {
    title: "Career",
    href: "/career",
    description: "Where I am in my career and where I want to go later.",
    preview:
      "A place for progress updates, future goals, and the path I want to build over time.",
    icon: BriefcaseBusiness,
  },
  {
    title: "Hobbies",
    href: "/hobbies",
    description: "What I do besides work and what keeps me energized.",
    preview:
      "Fire brigade, fishing, Rainbow Six, and the things I like to spend my time on.",
    icon: Waves,
  },
  {
    title: "Travel",
    href: "/travel",
    description: "Small trip reports with photos and highlights.",
    preview:
      "Short stories from trips, places I liked, and photo moments I want to remember.",
    icon: Camera,
  },
  {
    title: "Profile",
    href: "/profile",
    description: "A short intro about me and my interests.",
    preview:
      "The essential details for new visitors: who I am, what I care about, and what matters to me.",
    icon: UserRound,
  },
]
