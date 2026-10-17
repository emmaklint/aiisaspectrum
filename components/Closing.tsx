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
          className="bg-warm inline-flex min-h-11 items-center rounded-full border-[1.5px] border-ink px-6 py-3 font-medium text-ink no-underline transition-[filter] hover:brightness-105"
        >
          {site.essayLabel} →
        </a>
      </p>

      <p className="mt-16 border-t border-rule pt-5 text-[0.9rem] leading-relaxed text-ink-muted">
        Made by{" "}
        <a
          href={site.author.url}
          className="text-link underline decoration-2 underline-offset-4"
        >
          {site.author.name}
        </a>
        . {site.author.role}
      </p>
    </footer>
  );
}
