export type BlogCategory = "Career" | "Hobbies" | "Travel"

export type BlogPost = {
  id: string
  title: string
  slug: string
  category: BlogCategory
  date: string
  summary: string
  tags: string[]
  route?: string
  rating?: number
  photoLabel?: string
}

export const blogPosts: BlogPost[] = [
  {
    id: "career-update-1",
    title: "Current role and what I am improving",
    slug: "current-role-and-growth",
    category: "Career",
    date: "2026-03-18",
    summary:
      "A snapshot of my current career status, recent learning progress, and skills I am building next.",
    tags: ["career", "learning", "progress"],
  },
  {
    id: "career-update-2",
    title: "Where I want to be in the next years",
    slug: "future-career-direction",
    category: "Career",
    date: "2026-02-01",
    summary:
      "A practical outline of my long-term direction, responsibilities I want to take, and goals I am aiming for.",
    tags: ["career", "goals", "future"],
  },
  {
    id: "hobby-update-1",
    title: "Fire brigade: teamwork under pressure",
    slug: "fire-brigade-teamwork",
    category: "Hobbies",
    date: "2026-03-11",
    summary:
      "What I learn from drills and operations, and why this activity means more than just a hobby.",
    tags: ["fire brigade", "teamwork", "responsibility"],
  },
  {
    id: "hobby-update-2",
    title: "Fishing mornings and mental reset",
    slug: "fishing-mental-reset",
    category: "Hobbies",
    date: "2026-02-22",
    summary:
      "How fishing helps me disconnect, stay patient, and return with a clear head.",
    tags: ["fishing", "outdoors", "calm"],
  },
  {
    id: "hobby-update-3",
    title: "Rainbow Six sessions with focus",
    slug: "rainbow-six-focus",
    category: "Hobbies",
    date: "2026-01-30",
    summary:
      "Tactical gameplay, communication, and what makes a good team round after round.",
    tags: ["rainbow six", "gaming", "strategy"],
  },
  {
    id: "travel-post-1",
    title: "Weekend trip: lakeside route",
    slug: "weekend-lakeside-route",
    category: "Travel",
    date: "2026-03-02",
    summary:
      "A short trip report with a calm route, great viewpoints, and practical notes for the next visit.",
    tags: ["travel", "weekend", "nature"],
    route: "Start town -> Forest line -> Lakeside -> Old bridge -> Return",
    rating: 4.5,
    photoLabel: "Lakeside viewpoint",
  },
  {
    id: "travel-post-2",
    title: "City break with food and photos",
    slug: "city-break-food-and-photos",
    category: "Travel",
    date: "2026-01-19",
    summary:
      "A compact city report covering route planning, food spots, and photo-friendly streets.",
    tags: ["city", "food", "photos"],
    route: "Station -> Old town -> River walk -> Market hall -> Museum quarter",
    rating: 4.2,
    photoLabel: "Historic city center",
  },
]

export function getPostsByCategory(category: BlogCategory): BlogPost[] {
  return blogPosts
    .filter((post) => post.category === category)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}