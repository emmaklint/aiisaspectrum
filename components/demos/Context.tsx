import { glyphs, type GlyphName } from "./glyphs";

/**
 * The hooks by the door. Nothing is asked and nothing is said — today's
 * weather just makes two of the five things easier to see.
 */
const rail: { name: GlyphName; label: string; surfaced: boolean }[] = [
  { name: "tee", label: "T-shirt", surfaced: false },
  { name: "raincoat", label: "Rain jacket", surfaced: true },
  { name: "jumper", label: "Jumper", surfaced: false },
  { name: "boots", label: "Wellies", surfaced: true },
  { name: "umbrella", label: "Umbrella", surfaced: false },
];

export function Context() {
  return (
    <div className="mx-auto w-full max-w-lg">
      <div className="rounded-xl border-[1.5px] border-ink bg-paper p-5">
        <p className="tag">By the door · 07:12</p>

        {/* the rail itself */}
        <div className="mt-4 border-t-2 border-ink pt-1">
          <ul className="flex items-start justify-between gap-1">
            {rail.map((item) => (
              <li
                key={item.name}
                className="flex flex-1 flex-col items-center text-center"
              >
                <span aria-hidden="true" className="block h-3 w-px bg-ink/40" />
                <span
                  className={[
                    "mt-1 grid h-16 w-16 place-items-center rounded-lg p-2 transition-colors",
                    item.surfaced
                      ? "bg-olive/35 text-ink"
                      : "text-ink/25",
                  ].join(" ")}
                >
                  {(() => {
                    const Glyph = glyphs[item.name];
                    return <Glyph />;
                  })()}
                </span>
                <span
                  className={[
                    "mt-1.5 text-[0.72rem] leading-tight",
                    item.surfaced ? "text-ink" : "text-ink-faint",
                  ].join(" ")}
                >
                  {item.label}
                  {item.surfaced && <span className="sr-only"> — surfaced for today</span>}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <p className="mt-4 border-t border-rule pt-3 text-[0.82rem] text-ink-muted">
          9° · rain from 14:00
        </p>
      </div>
      <p className="mt-3 text-center text-[0.8rem] text-ink-quiet">
        No prompt, no answer. Two of the five are simply easier to see.
      </p>
    </div>
  );
}
