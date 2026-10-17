"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { Bit } from "@/content/bits";
import type { Example } from "@/content/examples";
import { ways, type Way } from "@/content/ways";

/** Short column names, so every way fits across the overview. */
const short: Partial<Record<Way, string>> = {
  point: "Point",
  adjust: "Adjust",
  demonstrate: "Show",
  choose: "Choose",
  reshape: "Reshape",
  stepIn: "Step in",
  notice: "Notice",
  ambient: "Ambient",
  mix: "Mix",
};

type Kind = "All" | Example["kind"];
type Sort = "az" | "way";

/**
 * Overview first, zoom and filter, details on demand (Shneiderman 1996).
 * Every example is one row; the ways are columns of dots, and the column
 * headers are the filters. A row opens to show the description and link.
 */
export function ExamplesExplorer({
  examples,
  liveBits,
  initialWay,
}: {
  examples: Example[];
  liveBits: Pick<Bit, "slug" | "title" | "way">[];
  initialWay: Way | null;
}) {
  const cols = (Object.keys(short) as Way[]).filter((w) => examples.some((e) => e.ways.includes(w)));
  const [way, setWay] = useState<Way | null>(initialWay);
  const [kind, setKind] = useState<Kind>("All");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<Sort>("az");
  const [open, setOpen] = useState<string | null>(null);

  const shown = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = examples.filter(
      (e) =>
        (!way || e.ways.includes(way)) &&
        (kind === "All" || e.kind === kind) &&
        (!q || `${e.name} ${e.idea}`.toLowerCase().includes(q)),
    );
    return [...list].sort((a, b) =>
      sort === "way"
        ? cols.indexOf(a.ways[0]) - cols.indexOf(b.ways[0]) || a.name.localeCompare(b.name)
        : a.name.localeCompare(b.name),
    );
  }, [examples, way, kind, query, sort, cols]);

  const count = (w: Way) =>
    examples.filter((e) => e.ways.includes(w) && (kind === "All" || e.kind === kind)).length;
  const max = Math.max(...cols.map(count), 1);

  function pickWay(w: Way | null) {
    const next = w === null || way === w ? null : w;
    setWay(next);
    try {
      const url = new URL(window.location.href);
      if (next) url.searchParams.set("way", next);
      else url.searchParams.delete("way");
      window.history.replaceState(null, "", url);
    } catch {}
  }

  const grid = "grid grid-cols-[minmax(0,1fr)_auto] md:grid-cols-[minmax(10rem,14rem)_5.5rem_repeat(var(--cols),minmax(0,1fr))]";
  const style = { "--cols": cols.length } as React.CSSProperties;
  const bit = (w: Way) => liveBits.find((b) => b.way === w);

  return (
    <div className="space-y-5">
      {/* Controls */}
      <div className="flex flex-wrap items-center gap-3">
        <label className="relative min-w-0 flex-1 basis-56">
          <span className="sr-only">Search examples</span>
          <input
            id="examples-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search"
            className="w-full rounded-full border-[1.5px] border-ink/30 bg-paper px-4 py-2 text-[0.95rem] focus:border-ink"
          />
        </label>
        <div role="group" aria-label="Kind" className="flex rounded-full border-[1.5px] border-ink bg-paper p-1">
          {(["All", "Product", "Research"] as Kind[]).map((k) => (
            <button
              key={k}
              type="button"
              aria-pressed={kind === k}
              onClick={() => setKind(k)}
              className={`rounded-full px-3 py-1 text-[0.85rem] font-medium ${kind === k ? "bg-ink text-blush" : "text-ink-muted hover:text-ink"}`}
            >
              {k}
            </button>
          ))}
        </div>
        <label className="flex items-center gap-2 text-[0.85rem] text-ink-muted">
          Sort
          <select
            id="examples-sort"
            value={sort}
            onChange={(e) => setSort(e.target.value as Sort)}
            className="rounded-full border-[1.5px] border-ink/30 bg-paper px-3 py-1.5 text-[0.85rem] text-ink"
          >
            <option value="az">A to Z</option>
            <option value="way">By way</option>
          </select>
        </label>
      </div>

      {/* Mobile filters: the columns don't fit, so the ways become chips */}
      <div className="flex flex-wrap gap-1.5 md:hidden" role="group" aria-label="Filter by way of interacting">
        {cols.map((w) => (
          <button
            key={w}
            type="button"
            aria-pressed={way === w}
            onClick={() => pickWay(w)}
            className={`rounded-full border-[1.5px] border-ink px-3 py-1 text-[0.82rem] font-medium ${way === w ? "bg-ink text-blush" : "bg-paper"}`}
          >
            {short[w]} <span className="opacity-60">{count(w)}</span>
          </button>
        ))}
      </div>

      <div className="overflow-hidden rounded-xl border-[1.5px] border-ink bg-paper">
        {/* Column headers: overview and filter in one */}
        <div className={`${grid} hidden items-end border-b-[1.5px] border-ink bg-wall/50 md:grid`} style={style}>
          <div className="px-4 py-3 text-[0.8rem] text-ink-muted">
            {shown.length} of {examples.length}
            {(way || kind !== "All" || query) && (
              <button
                type="button"
                onClick={() => { setKind("All"); setQuery(""); pickWay(null); }}
                className="ml-2 underline decoration-crayon decoration-2 underline-offset-4"
              >
                Clear
              </button>
            )}
          </div>
          <div className="px-2 py-3 text-[0.75rem] text-ink-quiet">Kind</div>
          {cols.map((w) => (
            <button
              key={w}
              type="button"
              aria-pressed={way === w}
              title={ways[w].note}
              onClick={() => pickWay(w)}
              className={`group flex flex-col items-center gap-1.5 px-1 pb-2.5 pt-3 transition-colors ${way === w ? "bg-ink text-blush" : "hover:bg-wall"}`}
            >
              <span className="flex h-8 w-full items-end justify-center" aria-hidden="true">
                <span
                  className={`w-3 rounded-t-sm ${way === w ? "bg-crayon-pink" : "bg-crayon"}`}
                  style={{ height: `${Math.max(12, (count(w) / max) * 100)}%` }}
                />
              </span>
              <span className="text-[0.78rem] font-medium leading-none">{short[w]}</span>
              <span className={`font-mono text-[0.7rem] tabular-nums ${way === w ? "text-blush/70" : "text-ink-quiet"}`}>{count(w)}</span>
            </button>
          ))}
        </div>

        {/* Rows */}
        <ul>
          {shown.map((e) => {
            const isOpen = open === e.name;
            const related = e.ways.map(bit).find(Boolean);
            return (
              <li key={e.name} className="border-b border-rule last:border-b-0">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? null : e.name)}
                  className={`${grid} w-full items-center text-left transition-colors hover:bg-wall/40 ${isOpen ? "bg-wall/40" : ""}`}
                  style={style}
                >
                  <span className="flex min-w-0 items-center gap-2 px-4 py-2.5">
                    <span aria-hidden="true" className={`text-[0.7rem] text-ink-quiet transition-transform ${isOpen ? "rotate-90" : ""}`}>▶</span>
                    <span className="truncate font-display text-[1.02rem] font-bold">{e.name}</span>
                  </span>
                  <span className="px-2 text-right text-[0.78rem] text-ink-muted md:text-left">
                    {e.kind}
                  </span>
                  {cols.map((w) => (
                    <span key={w} className={`hidden h-full items-center justify-center md:flex ${way === w ? "bg-ink/5" : ""}`}>
                      {e.ways.includes(w) && (
                        <span aria-label={short[w]} className={`h-3 w-3 rounded-full ${e.ways[0] === w ? "bg-crayon" : "bg-crayon-pink"}`} />
                      )}
                    </span>
                  ))}
                  <span className="col-span-2 flex flex-wrap gap-1 px-4 pb-2.5 md:hidden">
                    {e.ways.map((w) => (
                      <span key={w} className="rounded-full bg-wall px-2 py-0.5 text-[0.72rem]">{short[w]}</span>
                    ))}
                  </span>
                </button>
                {isOpen && (
                  <div className="space-y-3 bg-wall/40 px-4 pb-4 pl-10">
                    <p className="max-w-[62ch] text-[0.95rem] leading-relaxed">{e.idea}</p>
                    <p className="flex flex-wrap gap-x-5 gap-y-1 text-[0.88rem] font-medium">
                      <a href={e.href} target="_blank" rel="noreferrer" className="underline decoration-crayon decoration-2 underline-offset-4">
                        {new URL(e.href).hostname.replace(/^www\./, "")} ↗
                      </a>
                      {related && (
                        <Link href={`/bits/${related.slug}`} className="underline decoration-ink/40 underline-offset-4">
                          Feel it in a bit: {related.title}
                        </Link>
                      )}
                    </p>
                  </div>
                )}
              </li>
            );
          })}
          {shown.length === 0 && (
            <li className="px-4 py-8 text-center text-[0.95rem] text-ink-muted">Nothing matches. Try clearing a filter.</li>
          )}
        </ul>
      </div>

      <p className="text-[0.82rem] text-ink-quiet">
        <span className="mr-1 inline-block h-2.5 w-2.5 rounded-full bg-crayon align-middle" /> main way of interacting
        <span className="ml-4 mr-1 inline-block h-2.5 w-2.5 rounded-full bg-crayon-pink align-middle" /> also uses
      </p>
    </div>
  );
}
