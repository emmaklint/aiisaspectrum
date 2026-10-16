import Link from "next/link";
import { doors } from "@/content/copy";
import { bits } from "@/content/bits";
import { examples } from "@/content/examples";
import { SectionHeading } from "./SectionHeading";

export function Doors() {
  const liveBits = bits.filter((b) => b.live).length;
  const cards = [
    { href: "/bits", ...doors.bits, count: `${liveBits} live, more on the way`, tone: "bg-crayon-pink" },
    { href: "/examples", ...doors.examples, count: `${examples.length} so far`, tone: "bg-wall" },
  ];

  return (
    <section className="mx-auto max-w-5xl px-6 py-20 sm:px-8 sm:py-24">
      <SectionHeading number={doors.number}>{doors.heading}</SectionHeading>
      <ul className="mt-10 grid gap-5 sm:grid-cols-2">
        {cards.map((card) => (
          <li key={card.href}>
            <Link
              href={card.href}
              className={`group flex h-full flex-col rounded-xl border-[1.5px] border-ink p-6 no-underline ${card.tone}`}
            >
              <span className="tag tag-dark">{card.count}</span>
              <span className="mt-3 font-display text-[2rem] font-bold leading-none">{card.title}</span>
              <span className="mt-3 max-w-[38ch] text-[0.98rem] leading-relaxed">{card.body}</span>
              <span className="mt-6 font-medium">
                {card.cta}{" "}
                <span aria-hidden="true" className="inline-block transition-transform group-hover:translate-x-1">→</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
