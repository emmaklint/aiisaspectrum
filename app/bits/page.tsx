import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { bits } from "@/content/bits";
import { bitsPage } from "@/content/copy";
import { capabilities } from "@/content/capabilities";

export const metadata: Metadata = { title: "Bits · AI is a spectrum" };

export default function BitsPage() {
  return (
    <main id="main">
      <PageHeader title={bitsPage.heading}>
        <p>{bitsPage.intro}</p>
      </PageHeader>

      <section className="mx-auto max-w-5xl px-6 py-12 sm:px-8 sm:py-16">
        <ul className="grid gap-5 sm:grid-cols-2">
          {bits.map((bit) => {
            const body = (
              <>
                <span className="tag">{capabilities[bit.capability].label}{bit.live ? "" : " · On the way"}</span>
                <span className="mt-3 font-display text-[1.6rem] font-bold leading-tight">{bit.title}</span>
                <span className="mt-2 text-[0.98rem] leading-relaxed text-ink-muted">{bit.task}</span>
                {bit.live && (
                  <span className="mt-6 font-medium">
                    Try it{" "}
                    <span aria-hidden="true" className="inline-block transition-transform group-hover:translate-x-1">→</span>
                  </span>
                )}
              </>
            );
            return (
              <li key={bit.slug}>
                {bit.live ? (
                  <Link
                    href={`/bits/${bit.slug}`}
                    className="group flex h-full flex-col rounded-xl border-[1.5px] border-ink bg-paper p-6 no-underline transition-colors hover:bg-wall/40"
                  >
                    {body}
                  </Link>
                ) : (
                  <div className="flex h-full flex-col rounded-xl border-[1.5px] border-dashed border-ink/40 p-6 text-ink/80">
                    {body}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
        <p className="mt-10 text-[0.9rem] text-ink-quiet">
          <Link href="/about" className="text-ink underline decoration-crayon decoration-2 underline-offset-4">About the method</Link>
        </p>
      </section>
    </main>
  );
}
