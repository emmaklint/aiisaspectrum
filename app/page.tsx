import Link from "next/link";
import { home } from "@/content/copy";

const doors = [
  { href: "/bits", ...home.bits },
  { href: "/examples", ...home.examples },
];

export default function Page() {
  return (
    <main id="main">
      {/* The heading sits on a soft wash of the palette with a paper-like grain. */}
      <section className="relative isolate -mt-16 overflow-hidden pb-16 pt-28 sm:pb-24 sm:pt-36">
        <div aria-hidden="true" className="hero-wash absolute inset-0 -z-10" />
        <div aria-hidden="true" className="hero-grain absolute inset-0 -z-10" />
        <div className="mx-auto max-w-5xl px-6 sm:px-8">
          <h1 className="text-center text-[clamp(3.6rem,15vw,10.5rem)] leading-[0.86] tracking-[-0.045em] text-balance">
            {home.headline}
          </h1>
          <p className="mx-auto mt-8 max-w-[40ch] text-center text-[1.3rem] leading-snug text-balance sm:mt-10 sm:text-[1.6rem]">
            {home.belief}
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-6 pb-16 sm:px-8">
      <ul className="mt-6 grid gap-x-10 gap-y-8 sm:mt-10 sm:grid-cols-2">
        {doors.map((door) => (
          <li key={door.href}>
            <Link href={door.href} className="group block border-t-[3px] border-ink pt-4 no-underline">
              <span className="flex items-baseline justify-between gap-4 font-display text-[2.6rem] font-bold leading-none tracking-tight sm:text-[3.4rem]">
                {door.title}
                <span aria-hidden="true" className="text-crayon transition-transform group-hover:translate-x-1.5">→</span>
              </span>
              <span className="mt-3 block max-w-[36ch] text-[1rem] leading-relaxed text-ink-muted">{door.body}</span>
            </Link>
          </li>
        ))}
      </ul>
      </div>
    </main>
  );
}
