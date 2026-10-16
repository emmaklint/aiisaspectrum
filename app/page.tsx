import Link from "next/link";
import { home } from "@/content/copy";
import { site } from "@/content/site";

const doors = [
  { href: "/bits", ...home.bits, tone: "bg-crayon-pink" },
  { href: "/examples", ...home.examples, tone: "bg-paper" },
];

export default function Page() {
  return (
    <main id="main">
      <div className="mx-auto flex max-w-5xl flex-col px-6 py-20 sm:px-8 sm:py-28">
        <h1 className="text-[3.6rem] leading-[0.9] sm:text-[6rem] lg:text-[8rem]">
          {home.headline}
        </h1>
        <p className="mt-8 max-w-[34ch] text-[1.25rem] leading-snug sm:text-[1.5rem]">
          {home.belief}
        </p>

        <ul className="mt-14 grid gap-4 sm:grid-cols-2">
          {doors.map((door) => (
            <li key={door.href}>
              <Link
                href={door.href}
                className={`group flex h-full flex-col rounded-2xl border-[1.5px] border-ink p-6 no-underline sm:p-7 ${door.tone}`}
              >
                <span className="font-display text-[1.8rem] font-bold leading-none sm:text-[2.2rem]">
                  {door.title}{" "}
                  <span aria-hidden="true" className="inline-block transition-transform group-hover:translate-x-1">→</span>
                </span>
                <span className="mt-3 text-[1rem] leading-relaxed text-ink-muted">{door.body}</span>
              </Link>
            </li>
          ))}
        </ul>

        <p className="mt-16 text-[0.95rem]">
          <a href={site.essayUrl} className="text-ink underline decoration-crayon decoration-2 underline-offset-4">
            {site.essayLabel}
          </a>
        </p>
      </div>
    </main>
  );
}
