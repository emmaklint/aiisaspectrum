import { closing } from "@/content/copy";
import { site } from "@/content/site";
import { SectionHeading } from "./SectionHeading";

export function Closing() {
  return (
    <footer className="mx-auto max-w-5xl px-6 pb-20 sm:px-8 sm:pb-24">
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

      <p className="mt-16 border-t border-rule pt-5 text-[0.88rem] leading-relaxed text-ink-quiet">
        Made by{" "}
        <a
          href={site.author.url}
          className="text-ink underline decoration-crayon decoration-2 underline-offset-4"
        >
          {site.author.name}
        </a>
        . {site.author.role}
      </p>
    </footer>
  );
}
