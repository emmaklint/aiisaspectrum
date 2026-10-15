import { Explorer } from "@/components/Explorer";
import { Gallery } from "@/components/Gallery";
import { Hero } from "@/components/Hero";
import { closing, explore } from "@/content/copy";

export default function Page() {
  return (
    <main>
      <Hero />

      <section
        id="explore"
        className="mx-auto max-w-6xl scroll-mt-8 px-6 py-16 sm:px-8"
      >
        <h2 className="font-display text-[1.9rem] leading-tight sm:text-[2.6rem]">
          {explore.heading}
        </h2>
        <p className="mt-3 max-w-[48ch] leading-relaxed text-ink-muted">
          {explore.intro}
        </p>
        <Explorer />
      </section>

      <Gallery />

      <footer className="mx-auto max-w-6xl px-6 pb-20 pt-6 sm:px-8">
        <div className="border-t-2 border-crayon pt-12">
          <p className="max-w-[17ch] font-display text-[2rem] font-bold leading-[1.03] tracking-[-0.025em] sm:text-[3rem]">
            {closing.question}
          </p>
          <p className="mt-5 max-w-[44ch] text-[1.05rem] leading-relaxed text-ink-muted sm:text-[1.15rem]">
            {closing.second}
          </p>

          <p className="mt-10">
            <a
              href={closing.essay.href}
              className="group inline-flex flex-col gap-1 no-underline"
            >
              <span className="tag">
                {closing.essay.label}
              </span>
              <span className="font-display text-[1.2rem] font-semibold leading-snug text-ink underline decoration-crayon decoration-2 underline-offset-4 sm:text-[1.4rem]">
                {closing.essay.title}
              </span>
            </a>
          </p>

          <p className="mt-12 text-sm text-ink-quiet">
            A project from{" "}
            <a
              href={closing.credit.href}
              className="text-ink-muted underline decoration-crayon decoration-2 underline-offset-4"
            >
              {closing.credit.label}
            </a>
            .
          </p>
        </div>
      </footer>
    </main>
  );
}
