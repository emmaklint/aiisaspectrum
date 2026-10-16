import Link from "next/link";
import { site } from "@/content/site";

const links = [
  { href: "/bits", label: "Bits" },
  { href: "/examples", label: "Examples" },
  { href: "/about", label: "About" },
];

export function SiteNav() {
  return (
    <nav aria-label="Site" className="border-b border-rule bg-blush">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-x-6 gap-y-2 px-6 py-4 sm:px-8">
        <Link href="/" className="font-display text-[1.1rem] font-bold tracking-tight no-underline">
          {site.title}
        </Link>
        <ul className="flex flex-wrap items-center gap-x-5 gap-y-1 text-[0.92rem]">
          {links.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="text-ink no-underline hover:underline hover:decoration-crayon hover:decoration-2 hover:underline-offset-4">
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <a href={site.essayUrl} className="text-ink-muted no-underline hover:text-ink">
              Essay ↗
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
