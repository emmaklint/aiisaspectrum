import { examples as copy } from "@/content/copy";
import { examples } from "@/content/examples";
import { SectionHeading } from "./SectionHeading";

export function Examples() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-20 sm:px-8 sm:py-24">
      <SectionHeading number={copy.number}>{copy.heading}</SectionHeading>

      <ul className="mt-10 grid gap-5 sm:grid-cols-2">
        {examples.map((example) => (
          <li key={example.name}>
            <a
              href={example.href}
              target="_blank"
              rel="noreferrer"
              className="group flex h-full flex-col rounded-xl border-[1.5px] border-ink bg-paper p-5 no-underline transition-colors hover:bg-wall/40 sm:p-6"
            >
              <span className="tag">{example.tag}</span>
              <span className="mt-3 font-display text-[1.35rem] font-bold leading-tight">
                {example.name}
              </span>
              <span className="mt-2 text-[0.95rem] leading-relaxed text-ink-muted">
                {example.idea}
              </span>
              <span className="mt-5 inline-flex items-center gap-1.5 text-[0.82rem] text-ink-quiet">
                <span className="underline decoration-crayon decoration-2 underline-offset-4">
                  {new URL(example.href).hostname.replace(/^www\./, "")}
                </span>
                <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">
                  ↗
                </span>
                <span className="sr-only">(opens in a new tab)</span>
              </span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
