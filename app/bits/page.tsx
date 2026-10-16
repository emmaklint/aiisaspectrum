import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { bits } from "@/content/bits";
import { bitsPage } from "@/content/copy";
import { capabilities, type Capability } from "@/content/capabilities";

export const metadata: Metadata = { title: "Bits · AI is a spectrum" };

export default function BitsPage() {
  const order = Object.keys(capabilities) as Capability[];

  return (
    <main id="main">
      <PageHeader title={bitsPage.heading}>
        <p>{bitsPage.intro}</p>
      </PageHeader>

      <div className="mx-auto max-w-5xl space-y-12 px-6 py-12 sm:px-8 sm:py-16">
        {order.map((cap) => {
          const inCap = bits.filter((b) => b.capability === cap);
          if (!inCap.length) return null;
          return (
            <section key={cap} className="grid gap-5 border-t-2 border-ink pt-5 md:grid-cols-[14rem_minmax(0,1fr)]">
              <div>
                <h2 className="text-[1.8rem] leading-none">{capabilities[cap].label}</h2>
                <p className="mt-2 text-[0.98rem] leading-snug text-ink-muted">{capabilities[cap].note}</p>
              </div>
              <ul className="grid gap-4 sm:grid-cols-2">
                {inCap.map((bit) => (
                  <li key={bit.slug}>
                    {bit.live ? (
                      <Link
                        href={`/bits/${bit.slug}`}
                        className="group flex h-full flex-col rounded-xl border-[1.5px] border-ink bg-paper p-5 no-underline transition-colors hover:bg-wall/40"
                      >
                        <span className="font-display text-[1.4rem] font-bold leading-tight">{bit.title}</span>
                        <span className="mt-2 text-[0.95rem] leading-relaxed text-ink-muted">{bit.task}</span>
                        <span className="mt-5 font-medium">
                          Try it{" "}
                          <span aria-hidden="true" className="inline-block transition-transform group-hover:translate-x-1">→</span>
                        </span>
                      </Link>
                    ) : (
                      <div className="flex h-full flex-col rounded-xl border-[1.5px] border-dashed border-ink/40 p-5 text-ink/80">
                        <span className="tag">On the way</span>
                        <span className="mt-2 font-display text-[1.4rem] font-bold leading-tight">{bit.title}</span>
                        <span className="mt-2 text-[0.95rem] leading-relaxed text-ink-muted">{bit.task}</span>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </section>
          );
        })}

        <p className="text-[0.9rem] text-ink-quiet">
          <Link href="/about" className="text-ink underline decoration-crayon decoration-2 underline-offset-4">About the method</Link>
        </p>
      </div>
    </main>
  );
}
