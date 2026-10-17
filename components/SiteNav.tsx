"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { site } from "@/content/site";

const links = [
  { href: "/bits", label: "Bits" },
  { href: "/examples", label: "In the wild" },
];

/**
 * The wordmark: the name itself filled with the spectrum, pink on the first
 * letter to burnt orange on the last, outlined in ink so it reads on any
 * ground. The outline is what carries the contrast, not the fill.
 */
export function Wordmark({ className = "" }: { className?: string }) {
  return <span className={`wordmark ${className}`}>{site.title}</span>;
}

export function SiteNav() {
  const path = usePathname();
  const home = path === "/";

  return (
    <nav aria-label="Site" className="relative z-10 mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-x-6 gap-y-3 px-6 pt-5 sm:px-8">
      <Link
        href="/"
        aria-label="AI is a spectrum, home"
        className={`inline-flex min-h-11 items-center no-underline ${home ? "invisible max-sm:hidden" : ""}`}
      >
        <Wordmark className="text-[1.35rem] sm:text-[1.55rem]" />
      </Link>
      <ul className="flex flex-wrap items-center gap-1.5 text-[0.92rem]">
        {links.map((link) => {
          const active = path.startsWith(link.href);
          return (
            <li key={link.href}>
              <Link
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`inline-flex min-h-11 items-center rounded-full px-4 py-1.5 font-medium no-underline transition-colors ${
                  active ? "bg-ink text-blush" : "text-ink hover:bg-wall"
                }`}
              >
                {link.label}
              </Link>
            </li>
          );
        })}
        <li>
          <a href={site.essayUrl} className="inline-flex min-h-11 items-center rounded-full px-4 py-1.5 text-ink-muted no-underline hover:bg-wall hover:text-ink">
            Essay ↗
          </a>
        </li>
      </ul>
    </nav>
  );
}
