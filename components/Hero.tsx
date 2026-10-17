import { hero } from "@/content/copy";
import { site } from "@/content/site";

/**
 * The one loud surface on the page: the full spectrum, pink to burnt
 * orange. Everything on it is off-black ink, which passes AA on every stop.
 */
export function Hero() {
  return (
    <header className="bg-spectrum">
      <div className="mx-auto max-w-5xl px-6 py-16 sm:px-8 sm:py-24">
        <h1 className="text-[3rem] leading-[0.95] sm:text-[5rem] lg:text-[6.5rem]">
          {hero.headline}
        </h1>

        <div className="mt-8 max-w-[48ch] space-y-4">
          <p className="text-[1.1rem] font-medium leading-relaxed text-ink sm:text-[1.25rem]">
            {hero.lead}
          </p>
          <p className="text-[1rem] leading-relaxed text-ink">{hero.sub}</p>
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">
          <a
            href="#spectrum"
            className="inline-flex min-h-11 items-center rounded-full bg-ink px-6 py-3 font-medium text-ground no-underline transition-opacity hover:opacity-90"
          >
            {hero.cta} ↓
          </a>
          <a
            href={site.essayUrl}
            className="inline-flex min-h-11 items-center text-[1rem] font-medium text-ink underline decoration-ink decoration-2 underline-offset-4"
          >
            {site.essayLabel}
          </a>
        </div>
      </div>
    </header>
  );
}
