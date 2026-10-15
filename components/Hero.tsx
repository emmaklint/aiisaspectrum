import { hero } from "@/content/copy";
import { site } from "@/content/site";

export function Hero() {
  return (
    <header className="bg-olive">
      <div className="mx-auto max-w-5xl px-6 py-16 sm:px-8 sm:py-24">
        <h1 className="text-[3rem] leading-[0.95] sm:text-[5rem] lg:text-[6.5rem]">
          {hero.headline}
        </h1>

        <div className="mt-8 max-w-[48ch] space-y-4">
          <p className="text-[1.05rem] leading-relaxed text-ink sm:text-[1.2rem]">
            {hero.lead}
          </p>
          <p className="text-[0.98rem] leading-relaxed text-ink-muted">
            {hero.sub}
          </p>
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">
          <a
            href="#spectrum"
            className="rounded-full bg-ink px-6 py-3 font-medium text-blush no-underline transition-opacity hover:opacity-85"
          >
            {hero.cta} ↓
          </a>
          <a
            href={site.essayUrl}
            className="text-[0.92rem] text-ink underline decoration-ink/40 underline-offset-4 hover:decoration-ink"
          >
            {site.essayLabel}
          </a>
        </div>
      </div>
    </header>
  );
}
