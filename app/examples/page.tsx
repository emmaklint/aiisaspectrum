import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { bits } from "@/content/bits";
import { examplesPage } from "@/content/copy";
import { examples } from "@/content/examples";
import { ways, type Way } from "@/content/ways";

export const metadata: Metadata = { title: "Examples · AI is a spectrum" };

const isWay = (w: unknown): w is Way => typeof w === "string" && w in ways;

export default async function ExamplesPage({
  searchParams,
}: {
  searchParams: Promise<{ way?: string }>;
}) {
  const { way } = await searchParams;
  const active = isWay(way) ? way : null;
  const shown = active ? examples.filter((e) => e.ways.includes(active)) : examples;
  const usedWays = (Object.keys(ways) as Way[]).filter((w) => examples.some((e) => e.ways.includes(w)));
  const liveBit = (w: Way) => bits.find((b) => b.live && b.way === w);

  const chip = (selected: boolean) =>
    `rounded-full border-[1.5px] border-ink px-4 py-1.5 text-[0.9rem] font-medium no-underline transition-colors ${selected ? "bg-ink text-blush" : "bg-paper text-ink hover:bg-wall"}`;

  return (
    <main id="main">
      <PageHeader title={examplesPage.heading}>
        <p>{examplesPage.intro}</p>
      </PageHeader>

      <section className="mx-auto max-w-5xl px-6 py-12 sm:px-8 sm:py-16">
        <nav aria-label="Filter by way of interacting" className="flex flex-wrap gap-2">
          <Link href="/examples" className={chip(!active)} aria-current={!active ? "page" : undefined}>
            All
          </Link>
          {usedWays.map((w) => (
            <Link key={w} href={`/examples?way=${w}`} className={chip(active === w)} aria-current={active === w ? "page" : undefined}>
              {ways[w].label}
            </Link>
          ))}
        </nav>

        {active && (
          <p className="mt-5 text-[0.98rem] text-ink-muted">
            {ways[active].note}
            {liveBit(active) && (
              <>
                {" "}
                <Link href={`/bits/${liveBit(active)!.slug}`} className="font-medium text-ink underline decoration-crayon decoration-2 underline-offset-4">
                  Feel it in a bit →
                </Link>
              </>
            )}
          </p>
        )}

        <ul className="mt-8 grid gap-5 sm:grid-cols-2">
          {shown.map((example) => (
            <li key={example.name}>
              <a
                href={example.href}
                target="_blank"
                rel="noreferrer"
                className="group flex h-full flex-col rounded-xl border-[1.5px] border-ink bg-paper p-5 no-underline transition-colors hover:bg-wall/40 sm:p-6"
              >
                <span className="tag">
                  {example.kind} · {example.ways.map((w) => ways[w].label).join(", ")}
                </span>
                <span className="mt-3 font-display text-[1.35rem] font-bold leading-tight">{example.name}</span>
                <span className="mt-2 text-[0.95rem] leading-relaxed text-ink-muted">{example.idea}</span>
                <span className="mt-5 inline-flex items-center gap-1.5 text-[0.82rem] text-ink-quiet">
                  <span className="underline decoration-crayon decoration-2 underline-offset-4">
                    {new URL(example.href).hostname.replace(/^www\./, "")}
                  </span>
                  <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">↗</span>
                  <span className="sr-only">(opens in a new tab)</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
