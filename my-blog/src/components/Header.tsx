import Link from "next/link";

import Container from "./Container";
import { Button } from "./ui/button";

const navItems = [
  { label: "Career", href: "/career" },
  { label: "Hobbies", href: "/hobbies" },
  { label: "Travel", href: "/travel" },
  { label: "Profile", href: "/profile" },
];

const Header = () => {
  return (
    <header className="sticky top-0 z-50 border-b border-(--earth-border) bg-(--earth-bg)/95 backdrop-blur-sm">
      <Container className="flex min-h-18 items-center justify-between gap-4 py-3">
        <Button asChild variant="ghost" className="px-2 text-base font-semibold tracking-wide text-(--earth-ink)">
          <Link href="/">Kemme&apos;s Blog</Link>
        </Button>
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
      </Container>
    </header>
  );
};

export default Header
