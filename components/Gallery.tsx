import { concepts } from "@/content/concepts";
import { reflect } from "@/content/copy";
import { Illustration } from "./Illustration";

/**
 * All eight together. The point of seeing them in a row is that no ordering
 * suggests itself — there's no primitive end and no advanced end.
 */
export function Gallery() {
  return (
    <section className="bg-wall" id="reflect">
      <div className="mx-auto max-w-6xl px-6 py-20 sm:px-8">
      <h2 className="font-display text-[1.9rem] leading-tight sm:text-[2.6rem]">
        {reflect.heading}
      </h2>
      <div className="mt-4 max-w-[54ch] space-y-3 leading-relaxed text-ink-muted">
        {reflect.body.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>

      <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {concepts.map((concept) => (
          <li key={concept.id} className="card overflow-hidden">
            <div
              className="border-b border-rule p-3"
              style={{ background: `${concept.accent}14` }}
            >
              <Illustration
                conceptId={concept.id}
                accent={concept.accent}
                label={`${concept.name}: ${concept.tagline}`}
                className="sketch-plain"
              />
            </div>
            <div className="p-4">
              <h3 className="font-display text-[1.08rem] leading-tight">
                {concept.name}
              </h3>
              <p className="mt-1.5 text-[0.85rem] leading-snug text-ink-quiet">
                {concept.tagline}
              </p>
            </div>
          </li>
        ))}
      </ul>

      <p className="mt-10 max-w-[58ch] border-t border-ink/20 pt-5 text-[0.9rem] leading-relaxed text-ink-muted">
        {reflect.footnote}
      </p>
      </div>
    </section>
  );
}
