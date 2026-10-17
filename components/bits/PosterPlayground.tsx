"use client";

import { useEffect, useRef, useState } from "react";
import {
  interpret,
  names,
  palette,
  startingPoster,
  type El,
  type ElId,
  type Offer,
  type Pending,
} from "@/lib/posterAi";

type Habit = "talked" | "pointed" | "dragged" | "adjusted" | "tapped";
const habitLabels: Record<Habit, string> = {
  talked: "Talked",
  pointed: "Pointed",
  dragged: "Dragged",
  adjusted: "Used the AI's controls",
  tapped: "Used the toolbar",
};
const habitNudge: Record<Habit, string> = {
  talked: "You mostly talked. Try clicking something first, then talking.",
  pointed: "You pointed a lot. Now try asking for something without saying where.",
  dragged: "You mostly dragged. Try asking for the same thing in words.",
  adjusted: "You leaned on the controls. Notice when they showed up.",
  tapped: "You mostly tapped buttons. Try just saying what you want.",
};

type Msg = { from: "ai" | "me"; text: string };
const zeroHabits = (): Record<Habit, number> => ({ talked: 0, pointed: 0, dragged: 0, adjusted: 0, tapped: 0 });
const zeroTalk = (): Record<ElId, number> => ({ title: 0, sub: 0, date: 0, badge: 0 });
const cap = (s: string) => s[0].toUpperCase() + s.slice(1);

export function PosterPlayground() {
  const [poster, setPoster] = useState<El[]>(startingPoster);
  const [selected, setSelected] = useState<ElId | null>(null);
  const [msgs, setMsgs] = useState<Msg[]>([{ from: "ai", text: "Tell me what to change. Or click something first." }]);
  const [draft, setDraft] = useState("");
  const [pending, setPending] = useState<Pending>(null);
  const [offered, setOffered] = useState<Offer[]>([]);
  const [sizeTalk, setSizeTalk] = useState(zeroTalk);
  const [habits, setHabits] = useState(zeroHabits);
  const [toolbar, setToolbar] = useState<"none" | "colour" | "text">("none");
  const [textDraft, setTextDraft] = useState("");

  const history = useRef<El[][]>([]);
  const posterRef = useRef<HTMLDivElement>(null);
  const chatRef = useRef<HTMLDivElement>(null);
  const drag = useRef<{ id: ElId; px: number; py: number; ox: number; oy: number; w: number; h: number; moved: boolean } | null>(null);
  const sliderTouched = useRef(false);

  useEffect(() => {
    chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight });
  }, [msgs]);

  const bump = (h: Habit) => setHabits((s) => ({ ...s, [h]: s[h] + 1 }));
  const snapshot = () => {
    history.current.push(poster.map((e) => ({ ...e })));
    if (history.current.length > 60) history.current.shift();
  };
  const update = (id: ElId, patch: Partial<El>) =>
    setPoster((p) => p.map((e) => (e.id === id ? { ...e, ...patch } : e)));
  const commit = (id: ElId, patch: Partial<El>) => {
    snapshot();
    update(id, patch);
  };
  const undo = () => {
    const prev = history.current.pop();
    if (prev) setPoster(prev);
  };

  function select(id: ElId | null) {
    if (id && id !== selected) bump("pointed");
    setSelected(id);
    setToolbar("none");
  }

  // ---- talking ------------------------------------------------------------
  function send(e: React.FormEvent) {
    e.preventDefault();
    const text = draft.trim();
    if (!text) return;
    setDraft("");
    bump("talked");
    setMsgs((m) => [...m, { from: "me", text }]);
    const result = interpret(text, poster, selected, pending, sizeTalk, offered);
    setTimeout(() => {
      if (result.undo) undo();
      if (result.change) {
        commit(result.change.id, result.change.next);
        if (result.change.next.size !== poster.find((p) => p.id === result.change!.id)!.size) {
          setSizeTalk((s) => ({ ...s, [result.change!.id]: s[result.change!.id] + 1 }));
        }
      }
      if (result.offer) setOffered((o) => [...o, result.offer!]);
      setPending(result.pending);
      setMsgs((m) => [...m, { from: "ai", text: result.reply }]);
    }, 300);
  }

  // ---- dragging -----------------------------------------------------------
  function onPointerDown(e: React.PointerEvent, el: El) {
    e.stopPropagation();
    const rect = posterRef.current!.getBoundingClientRect();
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    drag.current = { id: el.id, px: e.clientX, py: e.clientY, ox: el.x, oy: el.y, w: rect.width, h: rect.height, moved: false };
    select(el.id);
  }
  function onPointerMove(e: React.PointerEvent) {
    const d = drag.current;
    if (!d) return;
    if (!d.moved) {
      if (Math.hypot(e.clientX - d.px, e.clientY - d.py) < 4) return;
      d.moved = true;
      snapshot();
    }
    update(d.id, {
      x: Math.min(95, Math.max(5, d.ox + ((e.clientX - d.px) / d.w) * 100)),
      y: Math.min(95, Math.max(5, d.oy + ((e.clientY - d.py) / d.h) * 100)),
    });
  }
  function onPointerUp() {
    if (drag.current?.moved) bump("dragged");
    drag.current = null;
  }
  function onKeyDown(e: React.KeyboardEvent, el: El) {
    const moves: Record<string, [number, number]> = { ArrowLeft: [-2, 0], ArrowRight: [2, 0], ArrowUp: [0, -2], ArrowDown: [0, 2] };
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      select(el.id);
    } else if (moves[e.key]) {
      e.preventDefault();
      const [dx, dy] = moves[e.key];
      commit(el.id, { x: Math.min(95, Math.max(5, el.x + dx)), y: Math.min(95, Math.max(5, el.y + dy)) });
      bump("dragged");
    } else if (e.key === "Escape") {
      select(null);
    }
  }

  function reset() {
    setPoster(startingPoster());
    setSelected(null);
    setMsgs([{ from: "ai", text: "Tell me what to change. Or click something first." }]);
    setPending(null);
    setOffered([]);
    setSizeTalk(zeroTalk());
    setHabits(zeroHabits());
    setToolbar("none");
    history.current = [];
  }

  const sel = selected ? poster.find((e) => e.id === selected)! : null;
  const total = Object.values(habits).reduce((a, b) => a + b, 0);
  const maxHabit = Math.max(1, ...Object.values(habits));
  const top = (Object.keys(habits) as Habit[]).reduce((a, b) => (habits[b] > habits[a] ? b : a), "talked" as Habit);
  const hidden = poster.filter((e) => e.hidden);

  return (
    <div className="space-y-6">
      <p className="font-display text-[1.15rem] font-semibold">
        Make the poster yours. Talk, click, drag, whatever you reach for.
      </p>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        {/* The poster */}
        <div className="space-y-3">
          <div
            ref={posterRef}
            onPointerDown={() => select(null)}
            className="relative aspect-[3/4] w-full select-none overflow-hidden rounded-md border-[1.5px] border-ink bg-crayon-pink"
            style={{ containerType: "inline-size" }}
            aria-label="Poster. Click a part to select it, drag to move it, or use arrow keys."
          >
            {poster.map((el) =>
              el.hidden ? null : (
                <div
                  key={el.id}
                  role="button"
                  tabIndex={0}
                  aria-label={cap(names[el.id])}
                  aria-pressed={selected === el.id}
                  onPointerDown={(e) => onPointerDown(e, el)}
                  onPointerMove={onPointerMove}
                  onPointerUp={onPointerUp}
                  onPointerCancel={onPointerUp}
                  onKeyDown={(e) => onKeyDown(e, el)}
                  className={`absolute cursor-grab touch-none whitespace-nowrap font-display leading-none active:cursor-grabbing ${
                    el.id === "title" ? "font-extrabold tracking-tight" : "font-semibold"
                  } ${el.id === "badge" ? "flex aspect-square items-center justify-center rounded-full p-[0.7em]" : ""}`}
                  style={{
                    left: `${el.x}%`,
                    top: `${el.y}%`,
                    fontSize: `${el.size}cqw`,
                    transform: `translate(-50%, -50%)${el.id === "badge" ? " rotate(-8deg)" : ""}`,
                    color: el.id === "badge" ? "#1f1a17" : el.color,
                    background: el.id === "badge" ? el.color : undefined,
                    outline: selected === el.id ? "2px dashed #1f1a17" : undefined,
                    outlineOffset: "0.25em",
                  }}
                >
                  {el.text}
                </div>
              ),
            )}
          </div>

          {/* What you can do with the selected part, without talking */}
          {sel ? (
            <div className="space-y-3 rounded-xl border-[1.5px] border-ink bg-paper p-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="tag mr-1">{cap(names[sel.id])}</span>
                {[
                  { label: "Bigger", run: () => commit(sel.id, { size: Math.min(28, sel.size * 1.15) }) },
                  { label: "Smaller", run: () => commit(sel.id, { size: Math.max(2.5, sel.size * 0.87) }) },
                  { label: "Colour", run: () => setToolbar(toolbar === "colour" ? "none" : "colour"), noCount: true },
                  { label: "Edit text", run: () => { setTextDraft(sel.text); setToolbar(toolbar === "text" ? "none" : "text"); }, noCount: true },
                  { label: "Remove", run: () => { commit(sel.id, { hidden: true }); setSelected(null); } },
                ].map((b) => (
                  <button
                    key={b.label}
                    type="button"
                    onClick={() => {
                      b.run();
                      if (!b.noCount) bump("tapped");
                    }}
                    className="rounded-full border-[1.5px] border-ink bg-blush px-3 py-1 text-[0.85rem] font-medium hover:bg-wall"
                  >
                    {b.label}
                  </button>
                ))}
              </div>
              {toolbar === "colour" && (
                <Swatches value={sel.color} onPick={(v) => { commit(sel.id, { color: v }); bump("tapped"); }} />
              )}
              {toolbar === "text" && (
                <form
                  className="flex gap-2"
                  autoComplete="off"
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (textDraft.trim()) {
                      commit(sel.id, { text: textDraft.trim() });
                      bump("tapped");
                    }
                    setToolbar("none");
                  }}
                >
                  <input
                    id="poster-text"
                    value={textDraft}
                    onChange={(e) => setTextDraft(e.target.value)}
                    aria-label={`Text for the ${names[sel.id]}`}
                    className="min-w-0 flex-1 rounded-full border-[1.5px] border-ink/30 bg-blush px-3 py-1.5 text-[1rem] focus:border-ink"
                  />
                  <button type="submit" className="rounded-full bg-crayon px-4 py-1.5 text-[0.9rem] font-medium">Save</button>
                </form>
              )}
            </div>
          ) : (
            <p className="text-[0.9rem] text-ink-quiet">
              Click a part to select it. Drag to move it.
              {hidden.length > 0 && ` Removed: ${hidden.map((h) => names[h.id]).join(", ")}.`}
            </p>
          )}

          <div className="flex flex-wrap gap-2">
            <button type="button" onClick={undo} className="rounded-full border-[1.5px] border-ink/30 px-4 py-1.5 text-[0.85rem] text-ink-muted hover:border-ink hover:text-ink">
              Undo
            </button>
            <button type="button" onClick={reset} className="rounded-full border-[1.5px] border-ink/30 px-4 py-1.5 text-[0.85rem] text-ink-muted hover:border-ink hover:text-ink">
              Start over
            </button>
          </div>
        </div>

        {/* Talking, and the controls the AI hands you */}
        <div className="flex min-w-0 flex-col gap-4">
          <div className="flex flex-col gap-3 rounded-xl border-[1.5px] border-ink bg-paper p-3">
            <div ref={chatRef} className="flex max-h-64 min-h-32 flex-col gap-2 overflow-y-auto" aria-live="polite">
              {msgs.map((m, i) => (
                <div
                  key={i}
                  className={`max-w-[88%] rounded-2xl px-3.5 py-2 text-[0.92rem] leading-snug ${
                    m.from === "ai" ? "self-start rounded-bl-sm bg-blush" : "self-end rounded-br-sm bg-ink text-blush"
                  }`}
                >
                  {m.text}
                </div>
              ))}
            </div>
            <form onSubmit={send} className="flex gap-2" autoComplete="off">
              <input
                id="poster-chat"
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder={sel ? `Say what to do with the ${names[sel.id]}` : "Make the title bigger…"}
                aria-label="Message to the AI"
                className="min-w-0 flex-1 rounded-full border-[1.5px] border-ink/30 bg-blush px-4 py-2 text-[1rem] focus:border-ink"
              />
              <button type="submit" className="rounded-full bg-crayon px-4 py-2 font-medium">Send</button>
            </form>
          </div>

          {offered.length > 0 && (
            <div className="space-y-3 rounded-xl border-[1.5px] border-dashed border-ink p-3">
              <p className="tag">Controls the AI made for you</p>
              {offered.map((o) => {
                const el = poster.find((e) => e.id === o.id)!;
                return o.kind === "slider" ? (
                  <label key={`${o.kind}-${o.id}`} className="block text-[0.88rem]">
                    <span className="font-medium">{cap(names[o.id])} size</span>
                    <input
                      id={`slider-${o.id}`}
                      type="range"
                      min={2.5}
                      max={28}
                      step={0.25}
                      value={el.size}
                      onPointerDown={() => { snapshot(); sliderTouched.current = true; }}
                      onPointerUp={() => { if (sliderTouched.current) bump("adjusted"); sliderTouched.current = false; }}
                      onKeyDown={() => snapshot()}
                      onKeyUp={() => bump("adjusted")}
                      onChange={(e) => update(o.id, { size: Number(e.target.value) })}
                      className="mt-1 block w-full accent-[#d2652a]"
                    />
                  </label>
                ) : (
                  <div key={`${o.kind}-${o.id}`} className="text-[0.88rem]">
                    <span className="font-medium">{cap(names[o.id])} colour</span>
                    <Swatches value={el.color} onPick={(v) => { commit(o.id, { color: v }); bump("adjusted"); }} />
                  </div>
                );
              })}
            </div>
          )}

          <div className="rounded-xl bg-wall/60 p-4" aria-live="polite">
            <p className="tag tag-dark">How you played</p>
            <ul className="mt-3 space-y-1.5">
              {(Object.keys(habits) as Habit[]).map((h) => (
                <li key={h} className="grid grid-cols-[10.5rem_1fr_1.5rem] items-center gap-2 text-[0.85rem]">
                  <span>{habitLabels[h]}</span>
                  <span className="h-2.5 overflow-hidden rounded-full bg-paper">
                    <span className="block h-full rounded-full bg-crayon transition-[width]" style={{ width: `${(habits[h] / maxHabit) * 100}%` }} />
                  </span>
                  <span className="text-right font-mono tabular-nums">{habits[h]}</span>
                </li>
              ))}
            </ul>
            {total >= 6 && <p className="mt-3 text-[0.95rem] font-medium">{habitNudge[top]}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

function Swatches({ value, onPick }: { value: string; onPick: (v: string) => void }) {
  return (
    <div className="mt-1.5 flex flex-wrap gap-2">
      {palette.map((c) => (
        <button
          key={c.value}
          type="button"
          aria-label={c.name}
          aria-pressed={value === c.value}
          onClick={() => onPick(c.value)}
          className={`h-7 w-7 rounded-full border-[1.5px] border-ink ${value === c.value ? "ring-2 ring-ink ring-offset-2 ring-offset-paper" : ""}`}
          style={{ background: c.value }}
        />
      ))}
    </div>
  );
}
