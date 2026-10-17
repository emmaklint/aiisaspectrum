"use client";

import { useEffect, useRef, useState } from "react";

type Style = "simpler" | "shorter" | "warmer";

/** The paragraph, with three prewritten rewrites for every sentence. */
const SENTENCES: { text: string; v: Record<Style, string> }[] = [
  { text: "It's 7:40 and nobody has shoes on yet.", v: { simpler: "It's 7:40 and nobody has shoes on.", shorter: "7:40. No shoes.", warmer: "It's 7:40 and, as usual, nobody has shoes on yet." } },
  { text: "Outside, the patio is wet, but the rain seems to be done.", v: { simpler: "The patio is wet, but the rain has stopped.", shorter: "Wet patio, rain over.", warmer: "The patio is still wet, but the rain seems to have given up." } },
  { text: "By the front door, the umbrella starts to glow slowly.", v: { simpler: "By the door, the umbrella glows.", shorter: "The umbrella glows.", warmer: "By the front door, the umbrella starts glowing softly, like it's waving at me." } },
  { text: "The information is shown in the location where the decision regarding the umbrella is being made by me.", v: { simpler: "The answer shows up right where I'm deciding.", shorter: "It tells me right where I decide.", warmer: "It nudges me right where I'm standing, deciding." } },
  { text: "I grab it, and we finally leave.", v: { simpler: "I grab it and we leave.", shorter: "We leave.", warmer: "I grab it, and we finally make it out the door." } },
];
const TARGET = 3;
const STOP = new Set(
  "the a an and but it its it's is are be to of in on at by for with this that sentence one about where which what make change fix feels feel off please can you could just bit more less little like too some line part paragraph".split(" "),
);

type Mode = "describe" | "point";
type Msg = { from: "ai" | "me"; text: string; quote?: string };
type Pending = { type: "which"; among: number[] | null; style: Style | null } | { type: "how"; i: number } | null;

const base = () => SENTENCES.map((s) => s.text);
const countWords = (t: string) => (t.trim().match(/\S+/g) || []).length;
const opening = (t: string) => t.split(" ").slice(0, 6).join(" ") + "…";

function styleOf(t: string): Style | null {
  t = t.toLowerCase();
  if (/short|cut|trim|concise|tight/.test(t)) return "shorter";
  if (/warm|friend|personal|human|cozy|cosy|fun/.test(t)) return "warmer";
  if (/simpl|clunk|awkward|clear|wordy|passive|weird|plain|easier|readab|rewrite|fix|better/.test(t)) return "simpler";
  return null;
}
function ordinal(t: string): number | null {
  t = t.toLowerCase();
  if (/second[- ]to[- ]last|second[- ]last|penultimate/.test(t)) return 3;
  const map: [RegExp, number][] = [
    [/\b(first|1st)\b/, 0], [/\b(second|2nd)\b/, 1], [/\b(third|3rd|middle)\b/, 2],
    [/\b(fourth|4th)\b/, 3], [/\b(fifth|5th|last|final)\b/, 4],
  ];
  for (const [r, i] of map) if (r.test(t)) return i;
  return null;
}
const stems = (t: string) =>
  (t.toLowerCase().match(/[a-zåäö']+/g) || []).filter((w) => w.length >= 4 && !STOP.has(w)).map((w) => w.slice(0, 5));

function locate(t: string, doc: string[], among: number[] | null): number[] {
  const o = ordinal(t);
  if (o !== null && (!among || among.includes(o))) return [o];
  const u = new Set(stems(t));
  if (!u.size) return [];
  const pool = among || doc.map((_, i) => i);
  let best = 0;
  let hits: number[] = [];
  for (const i of pool) {
    const score = stems(doc[i]).filter((s) => u.has(s)).length;
    if (score > best) { best = score; hits = [i]; } else if (score === best && score > 0) hits.push(i);
  }
  return hits;
}

export function PointBit() {
  const [mode, setMode] = useState<Mode>("describe");
  const [docs, setDocs] = useState({ describe: base(), point: base() });
  const [msgs, setMsgs] = useState<Msg[]>([{ from: "ai", text: "What should I change?" }]);
  const [pending, setPending] = useState<Pending>(null);
  const [sel, setSel] = useState<number | null>(null);
  const [draft, setDraft] = useState("");
  const [pointDraft, setPointDraft] = useState("");
  const [stats, setStats] = useState({
    describe: { words: 0, msgs: 0, used: false },
    point: { words: 0, clicks: 0, used: false },
  });
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight });
  }, [msgs]);

  const done = {
    describe: docs.describe[TARGET] !== SENTENCES[TARGET].text,
    point: docs.point[TARGET] !== SENTENCES[TARGET].text,
  };

  function rewrite(which: Mode, i: number, style: Style) {
    setDocs((d) => {
      const next = [...d[which]];
      next[i] = SENTENCES[i].v[style];
      return { ...d, [which]: next };
    });
    return SENTENCES[i].v[style];
  }

  function reply(t: string) {
    const doc = docs.describe;
    const ai = (m: Omit<Msg, "from">) => setMsgs((ms) => [...ms, { from: "ai", ...m }]);

    if (pending?.type === "how") {
      const result = rewrite("describe", pending.i, styleOf(t) || "simpler");
      ai({ text: "Done:", quote: result });
      setPending(null);
      return;
    }
    const among = pending?.type === "which" ? pending.among : null;
    const style = styleOf(t) || (pending?.type === "which" ? pending.style : null);
    const hits = locate(t, doc, among);

    if (hits.length === 1) {
      const i = hits[0];
      if (style) {
        ai({ text: "Done:", quote: rewrite("describe", i, style) });
        setPending(null);
      } else {
        setPending({ type: "how", i });
        ai({ text: "What should change?", quote: opening(doc[i]) });
      }
      return;
    }
    if (hits.length > 1) {
      setPending({ type: "which", among: hits, style });
      ai({ text: `Do you mean ${hits.map((i) => `“${opening(doc[i])}”`).join(" or ")}?` });
      return;
    }
    setPending({ type: "which", among: null, style });
    ai({ text: among ? "Still not sure. Quote a few words?" : "Which sentence? There are five." });
  }

  function send(e: React.FormEvent) {
    e.preventDefault();
    const t = draft.trim();
    if (!t) return;
    setDraft("");
    setStats((s) => ({ ...s, describe: { words: s.describe.words + countWords(t), msgs: s.describe.msgs + 1, used: true } }));
    setMsgs((ms) => [...ms, { from: "me", text: t }]);
    setTimeout(() => reply(t), 350);
  }

  function pick(i: number) {
    setSel(i);
    setStats((s) => ({ ...s, point: { ...s.point, clicks: s.point.clicks + 1, used: true } }));
  }
  function applyPoint(style: Style, typed?: string) {
    if (sel === null) return;
    rewrite("point", sel, style);
    setStats((s) => ({
      ...s,
      point: { ...s.point, clicks: s.point.clicks + (typed ? 0 : 1), words: s.point.words + (typed ? countWords(typed) : 0) },
    }));
    setSel(null);
  }

  function reset() {
    setMode("describe");
    setDocs({ describe: base(), point: base() });
    setMsgs([{ from: "ai", text: "What should I change?" }]);
    setPending(null);
    setSel(null);
    setStats({ describe: { words: 0, msgs: 0, used: false }, point: { words: 0, clicks: 0, used: false } });
  }

  const d = stats.describe;
  const p = stats.point;
  let verdict = "";
  if (done.describe && done.point) verdict = `Describing: ${d.words} words. Pointing: ${p.words}.`;
  else if (done.describe) verdict = "Now try “Point at it”.";
  else if (done.point) verdict = "Now try “Describe it”.";

  return (
    <div className="space-y-6">
      <p className="font-display text-[1.15rem] font-semibold">One sentence is clunky.</p>

      <div role="group" aria-label="Way of interacting" className="grid grid-cols-2 gap-1.5 rounded-full border-[1.5px] border-ink bg-paper p-1.5">
        {(["describe", "point"] as Mode[]).map((m) => (
          <button
            key={m}
            type="button"
            aria-pressed={mode === m}
            onClick={() => setMode(m)}
            className={`rounded-full px-4 py-2.5 text-[0.95rem] font-medium transition-colors ${mode === m ? "bg-ink text-blush" : "text-ink-muted hover:text-ink"}`}
          >
            {m === "describe" ? "Describe it" : "Point at it"}
          </button>
        ))}
      </div>

      <div className="rounded-md border border-rule bg-paper px-5 py-6 text-[1.2rem] leading-[1.65] shadow-[0_18px_40px_-28px_rgba(31,26,23,21,0.35)] sm:px-7 sm:text-[1.3rem]" aria-live="polite">
        <p>
          {docs[mode].map((text, i) => {
            const changed = text !== SENTENCES[i].text;
            const cls = [
              "rounded-sm transition-colors",
              changed ? "underline decoration-crayon decoration-2 underline-offset-4" : "",
              mode === "point" ? "cursor-pointer hover:bg-wall" : "",
              mode === "point" && sel === i ? "bg-crayon-pink" : "",
            ].join(" ");
            return mode === "point" ? (
              <span key={i}>
                <span
                  role="button"
                  tabIndex={0}
                  className={cls}
                  onClick={() => pick(i)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); pick(i); }
                  }}
                >
                  {text}
                </span>{" "}
              </span>
            ) : (
              <span key={i}><span className={cls}>{text}</span>{" "}</span>
            );
          })}
        </p>
      </div>

      {mode === "describe" ? (
        <div className="space-y-3">
          <div ref={chatRef} className="flex max-h-72 flex-col gap-2 overflow-y-auto py-1" aria-live="polite">
            {msgs.map((m, i) => (
              <div
                key={i}
                className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-[0.95rem] leading-snug ${m.from === "ai" ? "self-start rounded-bl-sm border border-rule bg-paper" : "self-end rounded-br-sm bg-ink text-blush"}`}
              >
                {m.quote && m.text === "What should change?" && <em className="block">“{m.quote}”</em>}
                {m.text}
                {m.quote && m.text !== "What should change?" && <em className="block">“{m.quote}”</em>}
              </div>
            ))}
          </div>
          <form onSubmit={send} className="flex gap-2" autoComplete="off">
            <input
              id="describe-input"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Tell the AI what to change"
              aria-label="Message to the AI"
              className="min-w-0 flex-1 rounded-full border-[1.5px] border-ink/30 bg-paper px-4 py-2.5 text-[1rem] focus:border-ink"
            />
            <button type="submit" className="rounded-full bg-crayon px-5 py-2.5 font-medium text-ink">Send</button>
          </form>
        </div>
      ) : sel === null ? (
        <p className="text-[0.95rem] text-ink-quiet">Click a sentence.</p>
      ) : (
        <div className="space-y-3 rounded-xl border-[1.5px] border-ink bg-paper p-4">
          <p className="text-[0.95rem] italic text-ink-muted">“{docs.point[sel]}”</p>
          <div className="flex flex-wrap gap-2">
            {(["simpler", "shorter", "warmer"] as Style[]).map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => applyPoint(s)}
                className="rounded-full border-[1.5px] border-ink bg-wall px-4 py-1.5 text-[0.9rem] font-medium capitalize hover:bg-crayon-pink"
              >
                {s}
              </button>
            ))}
          </div>
          <form
            className="flex gap-2"
            autoComplete="off"
            onSubmit={(e) => {
              e.preventDefault();
              const t = pointDraft.trim();
              if (!t) return;
              setPointDraft("");
              applyPoint(styleOf(t) || "simpler", t);
            }}
          >
            <input
              id="point-input"
              value={pointDraft}
              onChange={(e) => setPointDraft(e.target.value)}
              placeholder="Or say what feels off"
              aria-label="What feels off"
              className="min-w-0 flex-1 rounded-full border-[1.5px] border-ink/30 bg-blush px-4 py-2 text-[1rem] focus:border-ink"
            />
            <button type="submit" className="rounded-full bg-crayon px-5 py-2 font-medium text-ink">Apply</button>
          </form>
        </div>
      )}

      <div className="grid gap-px overflow-hidden rounded-xl border border-rule bg-rule sm:grid-cols-2" aria-live="polite">
        <div className="bg-paper px-4 py-3">
          <p className="tag">Describe it</p>
          <p className="mt-1 font-mono text-[0.9rem] tabular-nums">
            {d.used ? `${d.msgs} message${d.msgs === 1 ? "" : "s"} · ${d.words} words` : "Not tried yet"}
            {done.describe && <span className="text-moss"> · fixed</span>}
          </p>
        </div>
        <div className="bg-paper px-4 py-3">
          <p className="tag">Point at it</p>
          <p className="mt-1 font-mono text-[0.9rem] tabular-nums">
            {p.used ? `${p.clicks} click${p.clicks === 1 ? "" : "s"} · ${p.words} words` : "Not tried yet"}
            {done.point && <span className="text-moss"> · fixed</span>}
          </p>
        </div>
      </div>

      {verdict && <p className="font-display text-[1.3rem] font-semibold">{verdict}</p>}

      <button type="button" onClick={reset} className="rounded-full border-[1.5px] border-ink/30 px-4 py-2 text-[0.9rem] text-ink-muted hover:border-ink hover:text-ink">
        Start over
      </button>
    </div>
  );
}
