import { modes } from "@/content/copy";
import { SectionHeading } from "./SectionHeading";

/**
 * A loose set, laid out loosely on purpose — staggered rather than gridded,
 * so it doesn't read as a finished taxonomy.
 */
const offsets = [
  "sm:translate-y-0",
  "sm:translate-y-3",
  "sm:-translate-y-2",
  "sm:translate-y-4",
  "sm:translate-y-1",
  "sm:-translate-y-3",
  "sm:translate-y-2",
  "sm:-translate-y-1",
  "sm:translate-y-5",
];

export function Modes() {
  return (
    <section className="bg-wall">
      <div className="mx-auto max-w-5xl px-6 py-20 sm:px-8 sm:py-24">
        <SectionHeading number={modes.number}>{modes.heading}</SectionHeading>

        <p className="mt-6 max-w-[54ch] text-[1.02rem] leading-relaxed text-ink-muted">
          {modes.body}
        </p>

        <ul className="mt-12 flex flex-wrap gap-3 sm:gap-4">
          {modes.list.map((mode, i) => (
            <li
              key={mode}
              className={`rounded-full border-[1.5px] border-ink bg-blush px-5 py-2.5 font-display text-[1.05rem] font-semibold sm:text-[1.2rem] ${offsets[i % offsets.length]}`}
            >
              {mode}
            </li>
          ))}
        </ul>

        <p className="mt-14 text-[0.85rem] text-ink-muted">
          Not a list of all of them. Just the ones that came to mind.
        </p>
      </div>
    </section>
  );
}
