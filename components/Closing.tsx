import { closing } from "@/content/copy";
import { site } from "@/content/site";
import { SectionHeading } from "./SectionHeading";

export function Closing() {
  return (
    <section className="mx-auto max-w-5xl px-6 pb-20 sm:px-8 sm:pb-24">
      <SectionHeading number={closing.number}>{closing.heading}</SectionHeading>

      <div className="mt-6 max-w-[56ch] space-y-4 text-[1.02rem] leading-relaxed text-ink-muted">
        {closing.body.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>

      <p className="mt-10">
        <a
          href={site.essayUrl}
          className="inline-block rounded-full bg-crayon px-6 py-3 font-medium text-ink no-underline transition-opacity hover:opacity-85"
        >
          {site.essayLabel} →
        </a>
      </p>
    </section>
  );
}
