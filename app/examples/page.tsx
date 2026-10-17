import type { Metadata } from "next";
import { ExamplesExplorer } from "@/components/ExamplesExplorer";
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
  const liveBits = bits.filter((b) => b.live).map(({ slug, title, way }) => ({ slug, title, way }));

  return (
    <main id="main">
      <PageHeader title={examplesPage.heading}>
        <p>{examplesPage.intro}</p>
      </PageHeader>
      <section className="mx-auto max-w-5xl px-6 py-10 sm:px-8 sm:py-12">
        <ExamplesExplorer examples={examples} liveBits={liveBits} initialWay={isWay(way) ? way : null} />
      </section>
    </main>
  );
}
