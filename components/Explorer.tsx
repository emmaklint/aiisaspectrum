"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { explore } from "@/content/copy";
import {
  defaultSelection,
  dimensions,
  type DimensionId,
  type Selection,
} from "@/content/dimensions";
import { findMatch } from "@/lib/match";
import { selectionFromSearch, selectionToParams } from "@/lib/url";
import { ConceptPanel } from "./ConceptPanel";
import { DimensionControl } from "./DimensionControl";
import { Illustration } from "./Illustration";
import { ShareButton } from "./ShareButton";

export function Explorer() {
  const [selection, setSelection] = useState<Selection>(defaultSelection);
  const firstRender = useRef(true);
  const panel = useRef<HTMLDivElement>(null);

  // The URL is the only place answers are kept, so read it once on arrival.
  useEffect(() => {
    setSelection(selectionFromSearch(window.location.search));
  }, []);

  // ...and write back to it, without adding a history entry per click.
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    const params = selectionToParams(selection);
    window.history.replaceState(
      null,
      "",
      `?${params}${window.location.hash}`,
    );
  }, [selection]);

  const match = useMemo(() => findMatch(selection), [selection]);

  const set = useCallback((dimension: DimensionId, optionId: string) => {
    setSelection((prev) => ({ ...prev, [dimension]: optionId }));
  }, []);

  function surprise() {
    setSelection(
      Object.fromEntries(
        dimensions.map((d) => [
          d.id,
          d.options[Math.floor(Math.random() * d.options.length)].id,
        ]),
      ) as Selection,
    );
  }

  return (
    <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,21rem)_minmax(0,1fr)] lg:gap-12">
      {/* room under the questions for the sticky preview to sit over */}
      <div className="pb-4 lg:pb-0">
        <div className="space-y-7">
          {dimensions.map((dimension) => (
            <DimensionControl
              key={dimension.id}
              dimension={dimension}
              value={selection[dimension.id]}
              onChange={(optionId) => set(dimension.id, optionId)}
            />
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={surprise}
            className="rounded-full border border-rule bg-paper/60 px-4 py-2 text-sm text-ink-muted transition-colors hover:border-ink hover:text-ink"
          >
            Surprise me
          </button>
          <button
            type="button"
            onClick={() => setSelection(defaultSelection)}
            className="text-sm text-ink-quiet underline underline-offset-4 hover:text-ink"
          >
            Back to the chat window
          </button>
        </div>

        <p className="mt-8 max-w-prose border-t border-rule pt-5 text-[0.85rem] leading-relaxed text-ink-quiet">
          {explore.caveat}
        </p>

        {/* On a phone the sketch is a screen away, so the answer rides along
            at the bottom and updates as you tap. */}
        <div className="sticky bottom-4 z-20 mt-6 lg:hidden">
          <button
            type="button"
            onClick={() =>
              panel.current?.scrollIntoView({ block: "start" })
            }
            className="card flex w-full items-center gap-3 p-2 text-left shadow-[0_8px_28px_rgba(36,31,27,0.14)]"
          >
            <span
              className="w-14 shrink-0 rounded-lg p-1"
              style={{ background: `${match.best.accent}24` }}
            >
              <Illustration
                conceptId={match.best.id}
                accent={match.best.accent}
                label=""
                className="sketch-plain"
              />
            </span>
            <span className="min-w-0">
              <span className="block tag">
                Right now you&apos;d get
              </span>
              <span className="block truncate font-display text-[1rem] leading-tight">
                {match.best.name}
              </span>
            </span>
            <span className="ml-auto shrink-0 pr-1 text-[0.8rem] text-ink-quiet">
              See it ↓
            </span>
          </button>
        </div>
      </div>

      <div ref={panel} className="scroll-mt-6">
        <ConceptPanel
          concept={match.best}
          exact={match.exact}
          divergences={match.divergences}
          selection={selection}
        />

        {/* Screen readers get told what changed; everyone else can see it. */}
        <p aria-live="polite" className="sr-only">
          {match.exact
            ? `${explore.exactLabel}: ${match.best.name}. ${match.best.tagline}`
            : `${explore.nearLabel}: ${match.best.name}. ${match.best.tagline}`}
        </p>

        <div className="mt-7">
          <ShareButton selection={selection} />
        </div>
      </div>
    </div>
  );
}
