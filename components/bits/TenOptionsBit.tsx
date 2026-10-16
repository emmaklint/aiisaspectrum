"use client";

import { useEffect, useRef, useState } from "react";
import { nextHeadline, spread, toneFromMessage, toneLabels, type Headline, type Tone } from "@/lib/headlines";
import { Bubble, ChatInput, ModeToggle, QuietButton } from "./ui";

type Mode = "chat" | "spread";

export function TenOptionsBit() {
  const [mode, setMode] = useState<Mode>("chat");
  const [chosen, setChosen] = useState<string | null>(null);
  const [seen, setSeen] = useState<Set<string>>(new Set());
  const [effort, setEffort] = useState(0);

  // chat
  const [msgs, setMsgs] = useState<{ from: "ai" | "me"; text: string }[]>([
    { from: "ai", text: "I can write a headline for your clothes swap poster. Want one?" },
  ]);
  const [draft, setDraft] = useState("");
  const [tone, setTone] = useState<Tone | null>(null);
  const [lastOffer, setLastOffer] = useState<string | null>(null);
  const chatRef = useRef<HTMLDivElement>(null);

  // spread
  const [cards, setCards] = useState<Headline[]>([]);

  useEffect(() => {
    chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight });
  }, [msgs]);

  function start(m: Mode) {
    setMode(m);
    setChosen(null);
    setEffort(0);
    setTone(null);
    setLastOffer(null);
    setDraft("");
    setMsgs([{ from: "ai", text: "I can write a headline for your clothes swap poster. Want one?" }]);
    const first = spread(new Set(), null);
    setCards(m === "spread" ? first : []);
    setSeen(m === "spread" ? new Set(first.map((h) => h.text)) : new Set());
  }
  function send() {
    const text = draft.trim();
    if (!text) return;
    setDraft("");
    setEffort((n) => n + 1);
    setMsgs((m) => [...m, { from: "me", text }]);
    const t = text.toLowerCase();

    let reply: string;
    if (lastOffer && /\b(yes|perfect|love|great|that one|use (it|that)|good|nice|ok(ay)?|deal)\b/.test(t) && !/\b(no|not|another|more|different)\b/.test(t)) {
      setChosen(lastOffer);
      reply = `Great, “${lastOffer}” it is!`;
    } else {
      const asked = toneFromMessage(t) ?? tone;
      setTone(asked);
      const h = nextHeadline(seen, asked);
      if (!h) {
        reply = asked ? `That's all I have in a ${toneLabels[asked].toLowerCase()} style. Want to try another style?` : "I'm out of ideas!";
      } else {
        setSeen((s) => new Set(s).add(h.text));
        setLastOffer(h.text);
        const lead = ["How about", "What about", "Here's one", "Try this", "Maybe"][seen.size % 5];
        reply = `${lead}: “${h.text}”`;
      }
    }
    setTimeout(() => setMsgs((m) => [...m, { from: "ai", text: reply }]), 300);
  }

  function moreLike(h: Headline) {
    setEffort((n) => n + 1);
    const next = spread(seen, h.tone, [h]);
    setCards(next);
    setSeen((s) => new Set([...s, ...next.map((c) => c.text)]));
  }
  function shuffle() {
    setEffort((n) => n + 1);
    const next = spread(seen, null);
    setCards(next);
    setSeen((s) => new Set([...s, ...next.map((c) => c.text)]));
  }

  const asks = msgs.filter((m) => m.from === "me").length;

  return (
    <div className="space-y-6">
      <p className="font-display text-[1.15rem] font-semibold">Find a headline for the clothes swap poster that you actually like.</p>

      <ModeToggle
        label="How you get options"
        value={mode}
        onChange={start}
        modes={[
          { id: "chat", label: "Ask for one at a time" },
          { id: "spread", label: "See a spread" },
        ]}
      />

      <div className="flex flex-wrap items-center gap-4 rounded-xl bg-crayon-pink/70 p-4">
        <div className="flex aspect-[3/4] w-24 shrink-0 flex-col justify-center rounded-sm border-[1.5px] border-ink bg-crayon-pink p-2" aria-hidden="true">
          <span className="font-display text-[0.8rem] font-extrabold leading-tight">{chosen || "Your headline here"}</span>
          <span className="mt-1 text-[0.5rem]">Saturday 10–14</span>
        </div>
        <p className="min-w-0 flex-1 text-[0.95rem]">
          {chosen ? (
            <>
              <span className="font-semibold">“{chosen}”.</span> You saw {seen.size} options in {effort} {mode === "chat" ? "messages" : "clicks"}.
            </>
          ) : (
            `${seen.size} option${seen.size === 1 ? "" : "s"} seen so far.`
          )}
        </p>
      </div>

      {mode === "chat" ? (
        <div className="space-y-3">
          <div className="flex flex-col gap-3 rounded-xl border-[1.5px] border-ink bg-paper p-3">
            <div ref={chatRef} className="flex max-h-72 min-h-32 flex-col gap-2 overflow-y-auto" aria-live="polite">
              {msgs.map((m, i) => (
                <Bubble key={i} from={m.from}>{m.text}</Bubble>
              ))}
            </div>
            <ChatInput
              id="headline-chat"
              value={draft}
              onChange={setDraft}
              onSend={send}
              placeholder={lastOffer ? "Another? More playful? Or “yes”…" : "Yes please"}
            />
          </div>
          {asks >= 5 && !chosen && (
            <p className="font-display text-[1.2rem] font-semibold">
              {asks} messages, {seen.size} headlines, one at a time.{" "}
              <button type="button" onClick={() => start("spread")} className="underline decoration-crayon decoration-2 underline-offset-4">
                Try the spread
              </button>
            </p>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          <ul className="grid gap-2 sm:grid-cols-2" aria-live="polite">
            {cards.map((h) => (
              <li
                key={h.text}
                className={`flex flex-col gap-2 rounded-xl border-[1.5px] p-3 ${chosen === h.text ? "border-ink bg-crayon-pink" : "border-ink/25 bg-paper"}`}
              >
                <span className="tag">{toneLabels[h.tone]}</span>
                <span className="font-display text-[1.15rem] font-bold leading-tight">{h.text}</span>
                <span className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => { setChosen(h.text); setEffort((n) => n + 1); }}
                    className="rounded-full bg-ink px-3 py-1 text-[0.82rem] font-medium text-blush"
                  >
                    {chosen === h.text ? "Chosen" : "Use this"}
                  </button>
                  <button
                    type="button"
                    onClick={() => moreLike(h)}
                    className="rounded-full border-[1.5px] border-ink px-3 py-1 text-[0.82rem] font-medium hover:bg-wall"
                  >
                    More like this
                  </button>
                </span>
              </li>
            ))}
          </ul>
          <QuietButton onClick={shuffle}>Show ten others</QuietButton>
        </div>
      )}

      <QuietButton onClick={() => start(mode)}>Start over</QuietButton>
    </div>
  );
}
