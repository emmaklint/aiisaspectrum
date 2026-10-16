"use client";

import { useState } from "react";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Next week"];
const NOTICE_AT = 3;

type Task = {
  id: string;
  title: string;
  day: number;
  moves: number;
  /** "start" marks the first small step after breaking a task down. */
  tag?: "start" | "timebox" | "waiting";
  /** Set once the planner has helped, so it doesn't keep speaking up. */
  settled?: boolean;
};

const STEPS: Record<string, string[]> = {
  tax: ["Find last year's login", "Check the pre-filled numbers", "Press submit"],
  dentist: ["Find the clinic's number", "Check the calendar", "Book a time"],
  trousers: ["Check the kids' sizes", "Pick a shop", "Order them"],
  swap: ["Make the poster", "Ask two friends", "Sort the old clothes"],
  library: ["Gather the books", "Put them by the door", "Drop them off"],
  fridge: ["Throw out old stuff", "Wipe one shelf", "Do the rest"],
};

const start = (): Task[] => [
  { id: "tax", title: "Do the tax return", day: 0, moves: 0 },
  { id: "dentist", title: "Book the kids' dentist", day: 0, moves: 0 },
  { id: "trousers", title: "Buy rain trousers", day: 1, moves: 0 },
  { id: "swap", title: "Plan Saturday's clothes swap", day: 2, moves: 0 },
  { id: "library", title: "Return library books", day: 3, moves: 0 },
  { id: "fridge", title: "Clean the fridge", day: 4, moves: 0 },
];

type Mode = "assistant" | "planner";
const cheer = ["Done!", "All set!", "Sure thing!", "No problem!", "Easy!"];

export function NoticeBit() {
  const [mode, setMode] = useState<Mode>("assistant");
  const [tasks, setTasks] = useState<Task[]>(start);
  const [log, setLog] = useState<string[]>(["Hi! Tell me what to move and I'll take care of it."]);
  const [maybe, setMaybe] = useState<string[]>([]);
  const [asking, setAsking] = useState<string | null>(null);
  const [dragging, setDragging] = useState<string | null>(null);
  const [assistantMoves, setAssistantMoves] = useState(0);

  function moveTo(id: string, day: number) {
    const task = tasks.find((t) => t.id === id);
    if (!task || day === task.day) return;
    setTasks((ts) => ts.map((t) => (t.id === id ? { ...t, day, moves: t.moves + 1 } : t)));
    if (mode === "assistant") {
      setAssistantMoves((n) => n + 1);
      setLog((l) => [
        ...l,
        `${cheer[l.length % cheer.length]} I moved “${task.title}” to ${day === 5 ? "next week" : DAYS[day]}. Anything else?`,
      ]);
    }
  }
  const later = (t: Task) => moveTo(t.id, Math.min(5, t.day + 1));

  function breakDown(task: Task) {
    const steps = (STEPS[task.id] || ["First step", "Next step", "Last step"]).map((title, i) => ({
      id: `${task.id}-${i}`,
      title,
      day: i === 0 ? 0 : Math.min(4, i),
      moves: 0,
      tag: i === 0 ? ("start" as const) : undefined,
      settled: true,
    }));
    setTasks((ts) => ts.flatMap((t) => (t.id === task.id ? steps : [t])));
    setAsking(null);
  }
  function settle(task: Task, patch: Partial<Task>) {
    setTasks((ts) => ts.map((t) => (t.id === task.id ? { ...t, ...patch, settled: true } : t)));
    setAsking(null);
  }
  function letGo(task: Task) {
    setTasks((ts) => ts.filter((t) => t.id !== task.id));
    setMaybe((m) => [...m, task.title]);
    setAsking(null);
  }

  function reset(next: Mode = mode) {
    setMode(next);
    setTasks(start());
    setLog(["Hi! Tell me what to move and I'll take care of it."]);
    setMaybe([]);
    setAsking(null);
    setAssistantMoves(0);
  }

  const noticing = (t: Task) => mode === "planner" && !t.settled && t.moves >= NOTICE_AT;

  return (
    <div className="space-y-6">
      <p className="font-display text-[1.15rem] font-semibold">
        Pick a task you don't feel like doing. Keep pushing it to later.
      </p>

      <div role="group" aria-label="Which planner" className="grid grid-cols-2 gap-1.5 rounded-full border-[1.5px] border-ink bg-paper p-1.5">
        {(["assistant", "planner"] as Mode[]).map((m) => (
          <button
            key={m}
            type="button"
            aria-pressed={mode === m}
            onClick={() => reset(m)}
            className={`rounded-full px-3 py-2.5 text-[0.92rem] font-medium transition-colors ${mode === m ? "bg-ink text-blush" : "text-ink-muted hover:text-ink"}`}
          >
            {m === "assistant" ? "An assistant that does what you say" : "A planner that notices"}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
        {DAYS.map((day, d) => (
          <section
            key={day}
            aria-label={day}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => {
              if (dragging) moveTo(dragging, d);
              setDragging(null);
            }}
            className={`flex min-h-36 min-w-0 flex-col gap-2 rounded-xl p-2 ${d === 0 ? "bg-crayon-pink/60" : d === 5 ? "bg-wall/50" : "bg-paper"}`}
          >
            <h3 className="tag tag-dark px-1 pt-1">{d === 0 ? `${day} · today` : day}</h3>
            {tasks
              .filter((t) => t.day === d)
              .map((t) => (
                <article
                  key={t.id}
                  draggable
                  onDragStart={() => setDragging(t.id)}
                  onDragEnd={() => setDragging(null)}
                  className={`flex flex-col gap-2 rounded-lg border-[1.5px] bg-blush p-2.5 text-[0.88rem] leading-snug ${
                    noticing(t) ? "border-crayon" : "border-ink/25"
                  }`}
                  style={mode === "planner" && !t.settled ? { transform: `rotate(${Math.min(t.moves, 4) * (t.id.length % 2 ? 0.8 : -0.8)}deg)` } : undefined}
                >
                  <span className="font-medium">{t.title}</span>
                  {t.tag === "start" && <span className="tag text-moss">Start here</span>}
                  {t.tag === "timebox" && <span className="tag text-moss">15 minutes, then stop</span>}
                  {t.tag === "waiting" && <span className="tag">Waiting on something</span>}
                  {mode === "planner" && !t.settled && t.moves > 0 && (
                    <span aria-label={`Moved ${t.moves} times`} className="flex gap-1">
                      {Array.from({ length: Math.min(t.moves, 6) }).map((_, i) => (
                        <span key={i} className="h-1.5 w-1.5 rounded-full bg-crayon" />
                      ))}
                    </span>
                  )}

                  {noticing(t) ? (
                    <div className="space-y-2 border-t border-rule pt-2">
                      <p>You've moved this {t.moves === NOTICE_AT ? "three" : t.moves} times. Want to look at it another way?</p>
                      {asking === t.id ? (
                        <div className="flex flex-col gap-1.5">
                          <Chip onClick={() => breakDown(t)}>I don't know where to start</Chip>
                          <Chip onClick={() => settle(t, { day: 0, tag: "timebox" })}>It's boring</Chip>
                          <Chip onClick={() => settle(t, { day: 5, tag: "waiting" })}>I'm waiting on something</Chip>
                        </div>
                      ) : (
                        <div className="flex flex-col gap-1.5">
                          <Chip onClick={() => breakDown(t)}>Break it into steps</Chip>
                          <Chip onClick={() => setAsking(t.id)}>What's stopping me?</Chip>
                          <Chip onClick={() => letGo(t)}>Let it go for now</Chip>
                        </div>
                      )}
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => later(t)}
                      disabled={t.day === 5}
                      className="self-start rounded-full border border-ink/30 px-2.5 py-0.5 text-[0.8rem] text-ink-muted hover:border-ink hover:text-ink disabled:opacity-40"
                    >
                      Later →
                    </button>
                  )}
                </article>
              ))}
          </section>
        ))}
      </div>

      {maybe.length > 0 && (
        <p className="text-[0.9rem] text-ink-muted">
          <span className="tag mr-2">Maybe later</span>
          {maybe.join(", ")}
        </p>
      )}

      {mode === "assistant" ? (
        <div className="space-y-3">
          <div className="flex max-h-48 flex-col gap-2 overflow-y-auto rounded-xl border-[1.5px] border-ink bg-paper p-3" aria-live="polite">
            {log.map((m, i) => (
              <p key={i} className="max-w-[90%] self-start rounded-2xl rounded-bl-sm bg-blush px-3.5 py-2 text-[0.9rem] leading-snug">
                {m}
              </p>
            ))}
          </div>
          {assistantMoves >= 4 && (
            <p className="font-display text-[1.2rem] font-semibold">
              It never noticed.{" "}
              <button type="button" onClick={() => reset("planner")} className="underline decoration-crayon decoration-2 underline-offset-4">
                Try the planner that notices
              </button>
            </p>
          )}
        </div>
      ) : (
        <p className="text-[0.9rem] text-ink-quiet" aria-live="polite">
          {tasks.some((t) => noticing(t))
            ? "The planner noticed. Nobody asked it to."
            : "Drag a task, or press Later. In real life it might take six times. Here, three."}
        </p>
      )}

      <button
        type="button"
        onClick={() => reset()}
        className="rounded-full border-[1.5px] border-ink/30 px-4 py-2 text-[0.9rem] text-ink-muted hover:border-ink hover:text-ink"
      >
        Start over
      </button>
    </div>
  );
}

function Chip({ children, onClick }: { children: React.ReactNode; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-full border-[1.5px] border-ink bg-paper px-3 py-1 text-left text-[0.82rem] font-medium hover:bg-wall"
    >
      {children}
    </button>
  );
}
