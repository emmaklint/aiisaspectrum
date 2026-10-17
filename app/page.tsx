import Link from "next/link";
import { home } from "@/content/copy";

const doors = [
  { href: "/bits", ...home.bits, tone: "bg-crayon-pink" },
  { href: "/examples", ...home.examples, tone: "bg-paper" },
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
      <ul className="-mt-6 grid gap-4 sm:mt-0 sm:grid-cols-2 sm:gap-6">
        {doors.map((door) => (
          <li key={door.href}>
            <Link
              href={door.href}
              className={`group flex h-full flex-col justify-between gap-10 rounded-2xl border-[1.5px] border-ink p-6 no-underline shadow-[0_6px_0_0_#231815] transition-[transform,box-shadow] duration-150 hover:-translate-y-1 hover:shadow-[0_10px_0_0_#231815] active:translate-y-0.5 active:shadow-[0_2px_0_0_#231815] sm:p-8 ${door.tone}`}
            >
              <span className="block max-w-[34ch] text-[1.02rem] leading-relaxed">{door.body}</span>
              <span className="flex items-end justify-between gap-4 font-display text-[2.6rem] font-bold leading-none tracking-tight sm:text-[3.2rem]">
                {door.title}
                <span
                  aria-hidden="true"
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-ink text-[1.4rem] text-blush transition-transform group-hover:translate-x-1"
                >
                  →
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
      </div>
    </main>
  );
}
