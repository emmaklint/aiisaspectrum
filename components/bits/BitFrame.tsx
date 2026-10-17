import Link from "next/link";
import { method, type Bit } from "@/content/bits";
import { examples } from "@/content/examples";
import { capabilities } from "@/content/capabilities";

/**
 * The shared frame around every bit: title and task on top, the bit in the
 * middle, and underneath, the method and the examples that interact the
 * same way. That last part is what ties the bits to the collection.
 */
export function BitFrame({
  bit,
  lede,
  wide = false,
  children,
}: {
  bit: Bit;
  lede: string;
  /** Use the full page width, for bits that need room side by side. */
  wide?: boolean;
  children: React.ReactNode;
}) {
  const related = examples.filter((e) => e.ways.includes(bit.way));

  return (
    <main id="main" className={`mx-auto ${wide ? "max-w-5xl" : "max-w-3xl"} px-6 py-14 sm:px-8 sm:py-20`}>
      <Link
        href="/bits"
        className="inline-flex items-center gap-1.5 rounded-full border-[1.5px] border-ink/30 px-3.5 py-1 text-[0.88rem] font-medium no-underline hover:border-ink"
      >
        <span aria-hidden="true">←</span> All bits
      </Link>
      <p className="mt-6 text-[0.92rem]">
        <span className={`tag tag-dark mr-2 inline-block rounded px-2 py-1 align-middle ${capabilities[bit.capability].tone}`}>
          {capabilities[bit.capability].label}
        </span>
        <span className="text-ink-muted">{capabilities[bit.capability].note}</span>
      </p>
      <h1 className="mt-2 text-[2.6rem] leading-[0.95] text-balance sm:text-[3.6rem]">{bit.title}</h1>
      <p className="mt-5 max-w-[48ch] text-[1.1rem] leading-relaxed">{lede}</p>

      <div className="mt-10">{children}</div>

      {related.length > 0 && (
        <section className="mt-16 border-t-2 border-ink pt-5">
          <h2 className="text-[1.4rem] leading-tight">Where people already do this</h2>
          <ul className="mt-4 space-y-3">
            {related.map((e) => (
              <li key={e.name} className="text-[0.98rem] leading-relaxed">
                <a href={e.href} target="_blank" rel="noreferrer" className="font-semibold text-link underline decoration-2 underline-offset-4">
                  {e.name}
                </a>
                <span className="text-ink-muted">. {e.idea}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-[0.9rem]">
            <Link href={`/examples?way=${bit.way}`} className="text-ink underline decoration-ink/40 underline-offset-4 hover:decoration-ink">
              See more in the wild
            </Link>
          </p>
        </section>
      )}

      <section className="mt-12 space-y-2 text-[0.88rem] leading-relaxed text-ink-quiet">
        <p>
          {method.short}{" "}
          <a href="#about" className="text-ink underline decoration-ink/40 underline-offset-4">More about the method</a>
        </p>
        <p>{method.noAi}</p>
      </section>
      <p className="mt-10">
        <Link href="/bits" className="font-medium text-link underline decoration-2 underline-offset-4">
          ← Back to all bits
        </Link>
      </p>
    </main>
  );
}
