import Link from "next/link";
import { Search } from "lucide-react";

import Container from "./Container";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const navItems = [
  { label: "Career", href: "/career" },
  { label: "Hobbies", href: "/hobbies" },
  { label: "Travel", href: "/travel" },
  { label: "Profile", href: "/profile" },
];

const Header = () => {
  return (
    <header className="sticky top-0 z-50 border-b border-(--earth-border) bg-(--earth-bg)/95 backdrop-blur-sm">
      <Container className="flex min-h-18 flex-wrap items-center justify-between gap-3 py-3">
        <Button asChild variant="ghost" className="px-2 text-base font-semibold tracking-wide text-(--earth-ink)">
          <Link href="/">Kemme&apos;s Blog</Link>
        </Button>

        <div className="flex flex-1 flex-wrap items-center justify-end gap-2">
          <nav className="flex flex-wrap items-center justify-end gap-1">
            {navItems.map((item) => (
              <Button
                key={item.label}
                asChild
                variant="ghost"
                size="sm"
                className="rounded-full px-3 text-sm font-medium text-(--earth-muted) hover:bg-(--earth-stone) hover:text-(--earth-ink)"
              >
                <Link href={item.href}>{item.label}</Link>
              </Button>
            ))}
          </nav>

          <form action="/search" method="GET" className="flex w-full items-center gap-2 sm:w-auto sm:min-w-60 md:min-w-72">
            <Input
              name="q"
              placeholder="Search blog posts..."
              aria-label="Search blog posts"
            />
            <Button type="submit" size="sm" className="bg-(--earth-forest) text-white hover:bg-(--earth-forest)/90">
              <Search className="size-4" />
            </Button>
          </form>
        </div>
      </Container>
    </header>
  );
};

export default Header
