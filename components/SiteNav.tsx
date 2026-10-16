"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { site } from "@/content/site";

const links = [
  { href: "/bits", label: "Bits" },
  { href: "/examples", label: "In the wild" },
];

/** The spectrum itself, as the site's mark: the crayon colours side by side. */
export function SpectrumMark({ className = "" }: { className?: string }) {
  return (
    <span aria-hidden="true" className={`inline-flex overflow-hidden rounded-[3px] ${className}`}>
      <span className="w-[0.5em] bg-crayon" />
      <span className="w-[0.5em] bg-crayon-pink" />
      <span className="w-[0.5em] bg-olive" />
      <span className="w-[0.5em] bg-moss" />
    </span>
  );
}

export function SiteNav() {
  const path = usePathname();
  const home = path === "/";

  return (
    <nav aria-label="Site" className="relative z-10 mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-x-6 gap-y-3 px-6 pt-5 sm:px-8">
      <Link
        href="/"
        aria-label="AI is a spectrum, home"
        className={`flex items-center gap-2 font-display text-[1.05rem] font-bold tracking-tight no-underline ${home ? "invisible" : ""}`}
      >
        <SpectrumMark className="h-[1.1em]" />
        {site.title}
      </Link>
      <ul className="flex flex-wrap items-center gap-1.5 text-[0.92rem]">
        {links.map((link) => {
          const active = path.startsWith(link.href);
          return (
            <li key={link.href}>
              <Link
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`rounded-full px-3.5 py-1.5 font-medium no-underline transition-colors ${
                  active ? "bg-ink text-blush" : "text-ink hover:bg-wall"
                }`}
              >
                {link.label}
              </Link>
            </li>
          );
        })}
        <li>
          <a href={site.essayUrl} className="rounded-full px-3.5 py-1.5 text-ink-muted no-underline hover:bg-wall hover:text-ink">
            Essay ↗
          </a>
        </li>
      </ul>
    </nav>
  );
}
