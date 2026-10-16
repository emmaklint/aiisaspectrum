"use client";

import { useEffect, useRef, useState } from "react";
import { chatSummary, exampleRamble, groups, interpretRamble, type Group, type Thought } from "@/lib/ramble";
import { Bubble, ModeToggle, QuietButton } from "./ui";

type Mode = "chat" | "canvas";

/* The browser's own speech recognition, where it exists (Chrome, Safari). */
type Recognition = {
  lang: string;
  interimResults: boolean;
  continuous: boolean;
  onresult: (e: { results: ArrayLike<ArrayLike<{ transcript: string }>> }) => void;
  onend: () => void;
  start: () => void;
  stop: () => void;
};
function getRecognition(): Recognition | null {
  if (typeof window === "undefined") return null;
  const w = window as unknown as { SpeechRecognition?: new () => Recognition; webkitSpeechRecognition?: new () => Recognition };
  const R = w.SpeechRecognition || w.webkitSpeechRecognition;
  return R ? new R() : null;
}

export function ThinkOutLoudBit() {
  const [mode, setMode] = useState<Mode>("chat");
  const [draft, setDraft] = useState("");
  const [thoughts, setThoughts] = useState<Thought[]>([]);
  const [replies, setReplies] = useState<{ from: "ai" | "me"; text: string }[]>([]);
  const [round, setRound] = useState(0);
  const [dragging, setDragging] = useState<string | null>(null);
  const [canSpeak, setCanSpeak] = useState(false);
  const [listening, setListening] = useState(false);
  const rec = useRef<Recognition | null>(null);

  useEffect(() => setCanSpeak(!!getRecognition()), []);

  function speak() {
    if (listening) {
      rec.current?.stop();
      return;
    }
    const r = getRecognition();
    if (!r) return;
    r.lang = "en-US";
    r.interimResults = false;
    r.continuous = true;
    const before = draft ? draft.trim() + " " : "";
    let heard = "";
    r.onresult = (e) => {
      heard = Array.from(e.results).map((res) => res[0].transcript).join(" ");
      setDraft(before + heard);
    };
    r.onend = () => setListening(false);
    rec.current = r;
    try {
      r.start();
      setListening(true);
    } catch {
      setListening(false);
    }
  }

  function letItOut() {
    const text = draft.trim();
    if (!text) return;
    const next = round + 1;
    const fresh = interpretRamble(text, next, thoughts.length + round * 100);
    const all = [...thoughts, ...fresh];
    setThoughts(all);
    setRound(next);
    setReplies((r) => [...r, { from: "me", text }, { from: "ai", text: chatSummary(all) }]);
    setDraft("");
  }

  function reset(m: Mode = mode) {
    setMode(m);
    setThoughts([]);
    setReplies([]);
    setRound(0);
    setDraft("");
  }

  const move = (id: string, group: Group) => setThoughts((ts) => ts.map((t) => (t.id === id ? { ...t, group } : t)));
  const remove = (id: string) => setThoughts((ts) => ts.filter((t) => t.id !== id));
  const words = replies.filter((r) => r.from === "ai").reduce((n, r) => n + r.text.split(/\s+/).length, 0);

  return (
    <div className="space-y-6">
      <p className="font-display text-[1.15rem] font-semibold">Ramble about something on your mind. Don't tidy it up.</p>

      <ModeToggle
        label="How the AI answers"
        value={mode}
        onChange={(m) => reset(m)}
        modes={[
          { id: "chat", label: "It replies in chat" },
          { id: "canvas", label: "It lays it out" },
        ]}
      />

      <div className="space-y-2">
        <textarea
          id="ramble"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          rows={4}
          placeholder={round ? "Keep going. Add whatever comes next…" : "So the thing is…"}
          aria-label="Your ramble"
          className="w-full resize-y rounded-xl border-[1.5px] border-ink/30 bg-paper px-4 py-3 text-[1rem] leading-relaxed focus:border-ink"
        />
        <div className="flex flex-wrap items-center gap-2">
          <button type="button" onClick={letItOut} className="rounded-full bg-crayon px-5 py-2 font-medium">
            {round ? "Add more" : mode === "chat" ? "Send to the AI" : "Sort my thoughts"}
          </button>
          {canSpeak && (
            <button
              type="button"
              onClick={speak}
              aria-pressed={listening}
              className={`rounded-full border-[1.5px] border-ink px-4 py-2 text-[0.92rem] font-medium ${listening ? "bg-ink text-blush" : "bg-paper"}`}
            >
              {listening ? "Stop listening" : "Say it out loud"}
            </button>
          )}
          {!round && !draft && (
            <button type="button" onClick={() => setDraft(exampleRamble)} className="text-[0.9rem] underline decoration-crayon decoration-2 underline-offset-4">
              Use an example
            </button>
          )}
        </div>
      </div>

      {mode === "chat" ? (
        replies.length > 0 && (
          <div className="space-y-3">
            <div className="flex max-h-[28rem] flex-col gap-2 overflow-y-auto rounded-xl border-[1.5px] border-ink bg-paper p-3" aria-live="polite">
              {replies.map((r, i) => (
                <Bubble key={i} from={r.from}>{r.text}</Bubble>
              ))}
            </div>
            <p className="text-[0.9rem] text-ink-quiet">
              {words} words to read back. {round > 1 ? "Every time you add, the summary starts over." : "Now add a bit more and see what happens."}
            </p>
          </div>
        )
      ) : (
        thoughts.length > 0 && (
          <div className="space-y-3">
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3" aria-live="polite">
              {groups.map((g) => {
                const inGroup = thoughts.filter((t) => t.group === g.id);
                if (!inGroup.length && g.id === "other") return null;
                return (
                  <section
                    key={g.id}
                    aria-label={g.label}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => {
                      if (dragging) move(dragging, g.id);
                      setDragging(null);
                    }}
                    className={`flex min-h-28 min-w-0 flex-col gap-2 rounded-xl p-2.5 ${g.id === "todo" ? "bg-crayon-pink/60" : g.id === "worry" ? "bg-wall/70" : "bg-paper"}`}
                  >
                    <h3 className="tag tag-dark px-1">{g.label}</h3>
                    {inGroup.map((t) => (
                      <article
                        key={t.id}
                        draggable
                        onDragStart={() => setDragging(t.id)}
                        onDragEnd={() => setDragging(null)}
                        className="flex cursor-grab flex-col gap-1.5 rounded-lg border-[1.5px] border-ink/25 bg-blush p-2.5 text-[0.9rem] leading-snug active:cursor-grabbing"
                      >
                        <span>
                          {t.round === round && round > 1 && <span aria-label="new" className="mr-1.5 inline-block h-2 w-2 rounded-full bg-crayon align-middle" />}
                          {t.text}
                        </span>
                        <span className="flex items-center gap-2">
                          <label className="sr-only" htmlFor={`move-${t.id}`}>Move to group</label>
                          <select
                            id={`move-${t.id}`}
                            value={t.group}
                            onChange={(e) => move(t.id, e.target.value as Group)}
                            className="min-w-0 flex-1 rounded-full border border-ink/25 bg-paper px-2 py-0.5 text-[0.78rem] text-ink-muted"
                          >
                            {groups.map((o) => (
                              <option key={o.id} value={o.id}>{o.label}</option>
                            ))}
                          </select>
                          <button type="button" onClick={() => remove(t.id)} aria-label="Remove this thought" className="text-[0.85rem] text-ink-quiet hover:text-ink">
                            ✕
                          </button>
                        </span>
                      </article>
                    ))}
                  </section>
                );
              })}
            </div>
            <p className="text-[0.9rem] text-ink-quiet">
              {round > 1
                ? "New thoughts land where they belong. Nothing you already arranged moves."
                : "Drag a thought somewhere else if it's in the wrong place. Then add a bit more."}
            </p>
          </div>
        )
      )}

      {round > 0 && <QuietButton onClick={() => reset()}>Start over</QuietButton>}
    </div>
  );
}
