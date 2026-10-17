import { glyphs } from "./glyphs";

/** Already decided, already laid out. You only intervene if it's wrong. */
export function Proactive() {
  const Raincoat = glyphs.raincoat;
  const Boots = glyphs.boots;

  return (
    <div className="mx-auto w-full max-w-sm">
      <div className="overflow-hidden rounded-xl border-[1.5px] border-ink bg-paper">
        <div className="bg-warm px-5 py-3">
          <p className="tag tag-dark">This morning</p>
          <p className="mt-0.5 font-display text-[1.3rem] font-bold leading-tight text-ink">
            9°C, rain after 14:00
          </p>
        </div>

        <div className="flex items-center gap-4 px-5 py-5">
          <span aria-hidden="true" className="flex gap-1 text-ink">
            <span className="h-12 w-12">
              <Raincoat />
            </span>
            <span className="h-12 w-12">
              <Boots />
            </span>
          </span>
          <p className="font-display text-[1.05rem] font-semibold leading-snug">
            Rain jackets
            <br />+ waterproof shoes
          </p>
        </div>

        <div className="flex items-center justify-between border-t border-rule px-5 py-3">
          <span className="tag">Ready before you woke up</span>
          <span className="text-[0.82rem] text-link underline decoration-2 underline-offset-4">
            Change
          </span>
        </div>
      </div>
      <p className="mt-3 text-center text-[0.8rem] text-ink-quiet">
        The decision is made. Your move is only to disagree.
      </p>
    </div>
  );
}
