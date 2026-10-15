"use client";

import { useRef, useState } from "react";
import { demo } from "@/content/copy";
import { interactions } from "@/content/interactions";
import { Ask } from "./demos/Ask";
import { Choose } from "./demos/Choose";
import { Context } from "./demos/Context";
import { Proactive } from "./demos/Proactive";

const panels = {
  ask: Ask,
  choose: Choose,
  context: Context,
  proactive: Proactive,
};

/**
 * The centerpiece: one question, four interaction models.
 *
 * Built as a real tablist — one tab stop for the whole set, arrow keys to
 * move between them, Home and End for the ends.
 */
export function SpectrumDemo() {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  function select(index: number) {
    const next = (index + interactions.length) % interactions.length;
    setActive(next);
    tabs.current[next]?.focus();
  }

  function onKeyDown(event: React.KeyboardEvent) {
    const keys: Record<string, number> = {
      ArrowRight: active + 1,
      ArrowDown: active + 1,
      ArrowLeft: active - 1,
      ArrowUp: active - 1,
      Home: 0,
      End: interactions.length - 1,
    };
    if (event.key in keys) {
      event.preventDefault();
      select(keys[event.key]);
    }
  }

  const current = interactions[active];
  const Panel = panels[current.id];

  return (
    <div>
      <p className="font-display text-[1.3rem] font-semibold leading-snug sm:text-[1.6rem]">
        &ldquo;{demo.question}&rdquo;
      </p>

      <div
        role="tablist"
        aria-label="Four ways to interact"
        onKeyDown={onKeyDown}
        className="mt-6 grid grid-cols-2 border-[1.5px] border-ink sm:grid-cols-4"
      >
        {interactions.map((interaction, index) => {
          const selected = index === active;
          return (
            <button
              key={interaction.id}
              ref={(node) => {
                tabs.current[index] = node;
              }}
              role="tab"
              id={`tab-${interaction.id}`}
              aria-selected={selected}
              aria-controls={`panel-${interaction.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(index)}
              className={[
                "border-ink p-3 text-left transition-colors",
                // interior rules only, so the group reads as one object
                index % 2 === 1 ? "border-l-[1.5px]" : "",
                index < 2 ? "border-b-[1.5px] sm:border-b-0" : "",
                "sm:border-l-[1.5px] sm:first:border-l-0",
                selected
                  ? "bg-ink text-blush"
                  : "bg-paper/60 hover:bg-paper",
              ].join(" ")}
            >
              <span
                className={[
                  "block font-mono text-[0.62rem] uppercase tracking-[0.1em]",
                  selected ? "text-blush/70" : "text-ink-faint",
                ].join(" ")}
              >
                {interaction.label}
              </span>
              <span className="mt-1 block font-display text-[1.05rem] font-semibold leading-tight">
                {interaction.verb}
              </span>
            </button>
          );
        })}
      </div>

      <div
        role="tabpanel"
        id={`panel-${current.id}`}
        aria-labelledby={`tab-${current.id}`}
        tabIndex={0}
        className="mt-6"
      >
        <p className="text-[0.95rem] text-ink-muted">{current.note}</p>
        <div
          key={current.id}
          className="panel-enter mt-5 flex min-h-[20rem] items-center justify-center rounded-2xl border border-rule bg-wall/35 p-5 sm:p-8"
        >
          <Panel />
        </div>
      </div>

      <p className="mt-6 border-t border-ink pt-4 font-display text-[1.05rem] font-semibold sm:text-[1.2rem]">
        {demo.footnote}
      </p>
    </div>
  );
}
