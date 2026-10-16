"use client";

import { useEffect, useRef, useState } from "react";
import { chatEdit, fullList, listText, steps, trip, type Item } from "@/lib/packing";
import { Bubble, ChatInput, ModeToggle, QuietButton } from "./ui";

type Mode = "chat" | "visible";
type LogLine = { id: string; text: string; kind: "step" | "skip" | "you" | "done" };
const STEP_MS = 1500;

export function StepInBit() {
  const [mode, setMode] = useState<Mode>("chat");

  // chat
  const [msgs, setMsgs] = useState<{ from: "ai" | "me"; text: string }[]>([
    { from: "ai", text: "Tell me about your trip and I'll pack for you." },
  ]);
  const [draft, setDraft] = useState(trip);
  const [chatItems, setChatItems] = useState<Item[]>([]);
  const [working, setWorking] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);

  // visible
  const [list, setList] = useState<Item[]>([]);
  const [log, setLog] = useState<LogLine[]>([]);
  const [idx, setIdx] = useState(0);
  const [running, setRunning] = useState(false);
  const [started, setStarted] = useState(false);
  const [tookOver, setTookOver] = useState(false);
  const [askTowels, setAskTowels] = useState(false);
  const [addDraft, setAddDraft] = useState("");
  const listRef = useRef<Item[]>([]);
  listRef.current = list;

  useEffect(() => {
    chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight });
  }, [msgs, working]);

  // The agent's loop: one step at a time, reading the list as it is now.
  useEffect(() => {
    if (!running || mode !== "visible") return;
    if (idx >= steps.length) {
      setRunning(false);
      setLog((l) => [...l, { id: "done", text: `Done. ${listRef.current.length} things packed.`, kind: "done" }]);
      return;
    }
    const timer = setTimeout(() => {
      const step = steps[idx];
      if (step.needs && !listRef.current.some((i) => i.id === step.needs)) {
        setLog((l) => [...l, { id: step.id, text: step.skipNote || "Skipping this.", kind: "skip" }]);
      } else {
        setList((items) => [...items, ...step.items]);
        setLog((l) => [...l, { id: step.id, text: step.note, kind: "step" }]);
      }
      setIdx((i) => i + 1);
    }, STEP_MS);
    return () => clearTimeout(timer);
  }, [running, idx, mode]);

  function reset(m: Mode = mode) {
    setMode(m);
    setMsgs([{ from: "ai", text: "Tell me about your trip and I'll pack for you." }]);
    setDraft(trip);
    setChatItems([]);
    setWorking(false);
    setList([]);
    setLog([]);
    setIdx(0);
    setRunning(false);
    setStarted(false);
    setTookOver(false);
    setAskTowels(false);
    setAddDraft("");
  }

  // ---- chat --------------------------------------------------------------
  function send() {
    const text = draft.trim();
    if (!text || working) return;
    setDraft("");
    setMsgs((m) => [...m, { from: "me", text }]);
    if (!chatItems.length) {
      setWorking(true);
      setTimeout(() => {
        const items = fullList();
        setChatItems(items);
        setWorking(false);
        setMsgs((m) => [...m, { from: "ai", text: `Here's your packing list:\n\n${listText(items)}\n\nHave a lovely trip! Let me know if you want to change anything.` }]);
      }, 2600);
      return;
    }
    const { items, reply } = chatEdit(text, chatItems);
    setChatItems(items);
    setTimeout(() => setMsgs((m) => [...m, { from: "ai", text: `${reply}\n\n${listText(items)}` }]), 400);
  }

  // ---- visible -----------------------------------------------------------
  function remove(item: Item) {
    const next = list.filter((i) => i.id !== item.id);
    setList(next);
    setLog((l) => [...l, { id: `rm-${item.id}-${l.length}`, text: `You took out ${item.name.replace(/\s×\d+$/, "").toLowerCase()}.`, kind: "you" }]);
    if (item.id === "swimsuits") {
      if (next.some((i) => i.id === "beachtowels")) setAskTowels(true);
      else if (idx <= steps.findIndex((s) => s.id === "towels"))
        setLog((l) => [...l, { id: "noted", text: "Noted, no swimming. I'll adjust what comes next.", kind: "skip" }]);
    }
  }
  function add(e: React.FormEvent) {
    e.preventDefault();
    const name = addDraft.trim();
    if (!name) return;
    setList((l) => [...l, { id: `you-${l.length}-${name}`, name: name[0].toUpperCase() + name.slice(1), byYou: true }]);
    setLog((l) => [...l, { id: `add-${l.length}`, text: `You added ${name.toLowerCase()}.`, kind: "you" }]);
    setAddDraft("");
  }

  const chatWords = msgs.filter((m) => m.from === "ai").reduce((n, m) => n + m.text.split(/\s+/).length, 0);
  const finished = idx >= steps.length || tookOver;

  return (
    <div className="space-y-6">
      <p className="font-display text-[1.15rem] font-semibold">Let the AI pack for a cabin weekend. It will get one thing wrong.</p>

      <ModeToggle
        label="How the AI works"
        value={mode}
        onChange={(m) => reset(m)}
        modes={[
          { id: "chat", label: "It works, then reports back" },
          { id: "visible", label: "You see it work" },
        ]}
      />

      {mode === "chat" ? (
        <div className="space-y-3">
          <div className="flex flex-col gap-3 rounded-xl border-[1.5px] border-ink bg-paper p-3">
            <div ref={chatRef} className="flex max-h-[26rem] min-h-32 flex-col gap-2 overflow-y-auto" aria-live="polite">
              {msgs.map((m, i) => (
                <Bubble key={i} from={m.from}>{m.text}</Bubble>
              ))}
              {working && <Bubble from="ai">Working on it…</Bubble>}
            </div>
            <ChatInput
              id="pack-chat"
              value={draft}
              onChange={setDraft}
              onSend={send}
              placeholder={chatItems.length ? "Ask to remove or add something" : "Describe your trip"}
            />
          </div>
          {chatItems.length > 0 && (
            <p className="text-[0.9rem] text-ink-quiet">
              {chatWords} words to read so far. Spot the mistake, then fix it in words. Every fix sends the whole list back.
            </p>
          )}
        </div>
      ) : (
        <div className="grid gap-4 lg:grid-cols-2">
          <section className="flex min-w-0 flex-col gap-3 rounded-xl border-[1.5px] border-ink bg-paper p-4" aria-label="What the AI is doing">
            <p className="text-[0.9rem] text-ink-muted">{trip}</p>
            {!started ? (
              <button
                type="button"
                onClick={() => { setStarted(true); setRunning(true); }}
                className="self-start rounded-full bg-crayon px-5 py-2 font-medium"
              >
                Start packing
              </button>
            ) : (
              <>
                <ol className="space-y-1.5 text-[0.9rem]" aria-live="polite">
                  {log.map((l) => (
                    <li
                      key={l.id}
                      className={l.kind === "you" ? "font-medium" : l.kind === "skip" ? "text-moss" : l.kind === "done" ? "font-semibold" : "text-ink-muted"}
                    >
                      {l.kind === "you" ? "You: " : ""}
                      {l.text}
                    </li>
                  ))}
                  {running && <li className="animate-pulse text-ink-quiet">Thinking about the next thing…</li>}
                </ol>
                {askTowels && (
                  <div className="space-y-2 rounded-lg bg-crayon-pink/60 p-3 text-[0.9rem]">
                    <p>You took out the swimsuits. Should the beach towels go too?</p>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setList((l) => l.filter((i) => i.id !== "beachtowels"));
                          setLog((l) => [...l, { id: "rm-towels-ai", text: "Took out the beach towels too.", kind: "skip" }]);
                          setAskTowels(false);
                        }}
                        className="rounded-full bg-ink px-3 py-1 text-[0.82rem] font-medium text-blush"
                      >
                        Yes, take them out
                      </button>
                      <button type="button" onClick={() => setAskTowels(false)} className="rounded-full border-[1.5px] border-ink px-3 py-1 text-[0.82rem] font-medium">
                        Keep them
                      </button>
                    </div>
                  </div>
                )}
                {!finished && (
                  <div className="flex flex-wrap gap-2">
                    <button type="button" onClick={() => setRunning((r) => !r)} className="rounded-full border-[1.5px] border-ink px-4 py-1.5 text-[0.85rem] font-medium">
                      {running ? "Pause" : "Resume"}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setRunning(false);
                        setTookOver(true);
                        setLog((l) => [...l, { id: "over", text: "Okay, it's yours. I'll stop here.", kind: "done" }]);
                      }}
                      className="rounded-full border-[1.5px] border-ink/30 px-4 py-1.5 text-[0.85rem] text-ink-muted hover:border-ink hover:text-ink"
                    >
                      Stop and take over
                    </button>
                  </div>
                )}
              </>
            )}
          </section>

          <section className="flex min-w-0 flex-col gap-3 rounded-xl bg-crayon-pink/50 p-4" aria-label="Packing list">
            <h3 className="tag tag-dark">Packing list · {list.length}</h3>
            {list.length === 0 ? (
              <p className="text-[0.9rem] text-ink-quiet">Things appear here as the AI packs. Take out anything that's wrong.</p>
            ) : (
              <ul className="space-y-1.5">
                {list.map((i) => (
                  <li key={i.id} className="flex items-center justify-between gap-2 rounded-lg bg-blush px-3 py-1.5 text-[0.9rem]">
                    <span>
                      {i.name}
                      {i.byYou && <span className="tag ml-2">Added by you</span>}
                    </span>
                    <button type="button" onClick={() => remove(i)} aria-label={`Take out ${i.name}`} className="text-ink-quiet hover:text-ink">
                      ✕
                    </button>
                  </li>
                ))}
              </ul>
            )}
            {started && (
              <form onSubmit={add} className="flex gap-2" autoComplete="off">
                <input
                  id="pack-add"
                  value={addDraft}
                  onChange={(e) => setAddDraft(e.target.value)}
                  placeholder="Add something"
                  aria-label="Add something to the list"
                  className="min-w-0 flex-1 rounded-full border-[1.5px] border-ink/30 bg-blush px-3 py-1.5 text-[0.95rem] focus:border-ink"
                />
                <button type="submit" className="rounded-full bg-ink px-4 py-1.5 text-[0.85rem] font-medium text-blush">Add</button>
              </form>
            )}
          </section>
        </div>
      )}

      <QuietButton onClick={() => reset()}>Start over</QuietButton>
    </div>
  );
}
