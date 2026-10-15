"use client";

import { useState } from "react";
import { glyphs, type GlyphName } from "./glyphs";

/** The AI lays out a few options; picking one is the whole interaction. */
const options: { id: string; title: string; note: string; items: GlyphName[] }[] =
  [
    {
      id: "layers",
      title: "Layered",
      note: "Warm start, easy to shed",
      items: ["jumper", "trousers", "tee"],
    },
    {
      id: "waterproof",
      title: "Rain-ready",
      note: "For the walk home at four",
      items: ["raincoat", "boots", "trousers"],
    },
    {
      id: "light",
      title: "Light, plus a spare",
      note: "If they run warm",
      items: ["tee", "jumper", "umbrella"],
    },
  ];

export function Choose() {
  const [picked, setPicked] = useState<string | null>(null);

  return (
    <div className="w-full">
      <div className="grid gap-3 sm:grid-cols-3">
        {options.map((option) => {
          const active = picked === option.id;
          return (
            <button
              key={option.id}
              type="button"
              aria-pressed={active}
              onClick={() => setPicked(active ? null : option.id)}
              className={[
                "rounded-xl border-[1.5px] p-4 text-left transition-colors",
                active
                  ? "border-ink bg-paper"
                  : "border-ink/25 bg-paper/70 hover:border-ink",
              ].join(" ")}
            >
              <div className="flex h-12 items-end gap-2 text-ink">
                {option.items.map((name) => {
                  const Glyph = glyphs[name];
                  return (
                    <span key={name} className="h-11 w-11">
                      <Glyph />
                    </span>
                  );
                })}
              </div>
              <p className="mt-3 flex items-center gap-1.5 font-display text-[1rem] font-semibold leading-tight">
                {option.title}
                {active && (
                  <span className="text-moss" aria-hidden="true">
                    ✓
                  </span>
                )}
              </p>
              <p className="mt-1 text-[0.82rem] leading-snug text-ink-quiet">
                {option.note}
              </p>
            </button>
          );
        })}
      </div>
      <p
        aria-live="polite"
        className="mt-3 text-center text-[0.8rem] text-ink-quiet"
      >
        {picked
          ? "Picked. No sentence needed — the choice was the message."
          : "Three ways the morning could go. Pick one."}
      </p>
    </div>
  );
}
