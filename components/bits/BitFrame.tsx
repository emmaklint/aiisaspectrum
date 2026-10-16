import Link from "next/link";
import { method, type Bit } from "@/content/bits";
import { examples } from "@/content/examples";
import { ways } from "@/content/ways";

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
      <p className="tag">
        <Link href="/bits" className="no-underline hover:text-ink">Bits</Link> · {ways[bit.way].label}
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
                <a href={e.href} target="_blank" rel="noreferrer" className="font-semibold text-ink underline decoration-crayon decoration-2 underline-offset-4">
                  {e.name}
                </a>
                <span className="text-ink-muted">. {e.idea}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-[0.9rem]">
            <Link href={`/examples?way=${bit.way}`} className="text-ink underline decoration-ink/40 underline-offset-4 hover:decoration-ink">
              See all examples
            </Link>
          </p>
        </section>
      )}

      <section className="mt-12 space-y-2 text-[0.88rem] leading-relaxed text-ink-quiet">
        <p>
          {method.short}{" "}
          <Link href="/about" className="text-ink underline decoration-ink/40 underline-offset-4">More about the method</Link>
        </p>
        <p>{method.noAi}</p>
      </section>
    </main>
  );
}
