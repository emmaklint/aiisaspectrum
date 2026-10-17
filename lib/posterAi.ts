/**
 * The poster playground's "AI".
 *
 * For now this is a handful of rules that understand simple requests like
 * "make the title a bit bigger" or "move the sticker left". It exposes one
 * function, `interpret`, so a real model can replace it later behind the
 * same shape: a message and the current poster in, a reply and changes out.
 */

export type ElId = "title" | "sub" | "date" | "badge";

export type El = {
  id: ElId;
  text: string;
  /** Centre position, in percent of the poster. */
  x: number;
  y: number;
  /** Font size, in percent of the poster's width. */
  size: number;
  color: string;
  hidden: boolean;
};

export const names: Record<ElId, string> = {
  title: "title",
  sub: "sizes line",
  date: "date",
  badge: "sticker",
};

export const palette: { name: string; value: string }[] = [
  { name: "black", value: "#1f1a17" },
  { name: "orange", value: "#d2652a" },
  { name: "pink", value: "#f4a7bb" },
  { name: "peach", value: "#f9be8c" },
  { name: "apricot", value: "#f39a5b" },
  { name: "white", value: "#fffdfb" },
];

export const startingPoster = (): El[] => [
  { id: "title", text: "Clothes swap", x: 50, y: 30, size: 13, color: "#1f1a17", hidden: false },
  { id: "sub", text: "Kids' sizes 80–140", x: 50, y: 48, size: 5, color: "#1f1a17", hidden: false },
  { id: "date", text: "Saturday 10–14", x: 50, y: 60, size: 5.5, color: "#1f1a17", hidden: false },
  { id: "badge", text: "Free!", x: 76, y: 80, size: 6, color: "#d2652a", hidden: false },
];

export type Action =
  | { kind: "size"; dir: 1 | -1; small: boolean }
  | { kind: "move"; dx: number; dy: number; x?: number; y?: number }
  | { kind: "color"; value: string }
  | { kind: "text"; text: string }
  | { kind: "hide" }
  | { kind: "show" };

export type Offer = { kind: "slider" | "swatches"; id: ElId };

export type Pending =
  | { waitingFor: "target"; action: Action }
  | { waitingFor: "action"; target: ElId }
  | null;

export type Result = {
  reply: string;
  /** The element to change, and its new state. */
  change?: { id: ElId; next: El };
  offer?: Offer;
  pending: Pending;
  undo?: boolean;
};

const clamp = (n: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, n));

export function parseTarget(msg: string): ElId | "selection" | null {
  const t = msg.toLowerCase();
  if (/\b(title|heading|headline|clothes swap)\b/.test(t)) return "title";
  if (/\b(sizes|sub ?title|subtitle|second line|kids)\b/.test(t)) return "sub";
  if (/\b(date|time|saturday|when)\b/.test(t)) return "date";
  if (/\b(badge|sticker|circle|free|dot|stamp)\b/.test(t)) return "badge";
  if (/\b(it|this|that|selected|the one)\b/.test(t)) return "selection";
  return null;
}

export function parseAction(msg: string): Action | null {
  const t = msg.toLowerCase();
  const quoted = msg.match(/["“'‘](.+?)["”'’]\s*$/) || msg.match(/["“](.+?)["”]/);
  const sayTo = msg.match(/\b(?:say|says|read|reads|rename(?: it)? to|text to|write)\s+(.+)$/i);
  if (quoted || sayTo) {
    const text = (quoted ? quoted[1] : sayTo![1]).replace(/["“”]/g, "").trim();
    if (text) return { kind: "text", text };
  }

  const small = /\b(a (little )?bit|slightly|a little|a tad|tiny bit|smidge)\b/.test(t);
  if (/\b(bigger|larger|increase|grow|huge|enlarge|bump up)\b/.test(t)) return { kind: "size", dir: 1, small };
  if (/\b(smaller|tinier|shrink|reduce|decrease)\b/.test(t)) return { kind: "size", dir: -1, small };

  if (/\b(remove|delete|hide|get rid)\b/.test(t)) return { kind: "hide" };
  if (/\b(bring (it )?back|show|restore|unhide)\b/.test(t)) return { kind: "show" };

  for (const c of [...palette].sort((a, b) => b.name.length - a.name.length)) {
    if (t.includes(c.name)) return { kind: "color", value: c.value };
  }
  if (/\b(red)\b/.test(t)) return { kind: "color", value: palette[1].value };
  if (/\b(yellow|beige)\b/.test(t)) return { kind: "color", value: palette[3].value };
  if (/\b(colou?r|blue|yellow|purple)\b/.test(t)) return { kind: "color", value: "" };

  const step = small ? 4 : 12;
  let dx = 0;
  let dy = 0;
  let x: number | undefined;
  let y: number | undefined;
  if (/\bleft\b/.test(t)) dx -= step;
  if (/\bright\b/.test(t)) dx += step;
  if (/\b(up|higher)\b/.test(t)) dy -= step;
  if (/\b(down|lower)\b/.test(t)) dy += step;
  if (/\b(cent(er|re)|middle)\b/.test(t)) x = 50;
  if (/\btop\b/.test(t)) y = 16;
  if (/\bbottom\b/.test(t)) y = 86;
  if (/\bcorner\b/.test(t)) { x = 80; y = 86; }
  if (dx || dy || x !== undefined || y !== undefined) return { kind: "move", dx, dy, x, y };

  return null;
}

function apply(el: El, action: Action): { next: El; reply: string } {
  switch (action.kind) {
    case "size": {
      const factor = action.small ? 0.1 : 0.25;
      const size = clamp(el.size * (1 + action.dir * factor), 2.5, 28);
      return { next: { ...el, size }, reply: action.dir > 0 ? "Bigger." : "Smaller." };
    }
    case "move":
      return {
        next: {
          ...el,
          x: clamp((action.x ?? el.x) + action.dx, 5, 95),
          y: clamp((action.y ?? el.y) + action.dy, 5, 95),
        },
        reply: "Moved.",
      };
    case "color":
      return { next: { ...el, color: action.value }, reply: "Done." };
    case "text":
      return { next: { ...el, text: action.text }, reply: "Changed." };
    case "hide":
      return { next: { ...el, hidden: true }, reply: `Removed the ${names[el.id]}. Say “bring it back” if you miss it.` };
    case "show":
      return { next: { ...el, hidden: false }, reply: "It's back." };
  }
}

/**
 * One turn of conversation. `selected` is whatever the person has pointed at;
 * `sizeTalk` counts how often each element has been resized by talking, so
 * the AI can offer a slider when the back-and-forth gets tedious.
 */
export function interpret(
  msg: string,
  poster: El[],
  selected: ElId | null,
  pending: Pending,
  sizeTalk: Record<ElId, number>,
  offered: Offer[],
): Result {
  const t = msg.toLowerCase().trim();
  if (/^(undo|go back|revert|oops)\b/.test(t)) return { reply: "Undone.", pending: null, undo: true };

  let action = parseAction(msg);
  const rawTarget = parseTarget(msg);
  let target: ElId | null = rawTarget === "selection" ? selected : rawTarget;
  if (!target && selected && action) target = selected;

  if (pending?.waitingFor === "target" && !action) action = pending.action;
  if (pending?.waitingFor === "action" && !target) target = pending.target;

  if (action?.kind === "color" && !action.value) {
    return {
      reply: `I only know the poster's colours: ${palette.map((c) => c.name).join(", ")}.`,
      pending: target ? { waitingFor: "action", target } : null,
    };
  }
  if (!action && !target) {
    return {
      reply: "I can resize, move, recolour, rewrite or remove things. Or click something first.",
      pending: null,
    };
  }
  if (!action && target) {
    return { reply: `What should I do with the ${names[target]}?`, pending: { waitingFor: "action", target } };
  }
  if (action && !target) {
    return {
      reply: "Which part? The title, the sizes line, the date or the sticker?",
      pending: { waitingFor: "target", action },
    };
  }

  const el = poster.find((e) => e.id === target)!;
  if (el.hidden && action!.kind !== "show") {
    return { reply: `The ${names[el.id]} is removed. Say “bring back the ${names[el.id]}” first.`, pending: null };
  }
  const { next, reply } = apply(el, action!);

  let offer: Offer | undefined;
  const has = (k: Offer["kind"]) => offered.some((o) => o.kind === k && o.id === el.id);
  if (action!.kind === "size" && sizeTalk[el.id] + 1 >= 2 && !has("slider")) offer = { kind: "slider", id: el.id };
  if (action!.kind === "color" && !has("swatches")) offer = { kind: "swatches", id: el.id };

  const extra =
    offer?.kind === "slider"
      ? " Here's a slider, so you don't have to keep explaining."
      : offer?.kind === "swatches"
        ? " Here are the colours, if you want to try others."
        : "";

  return { reply: reply + extra, change: { id: el.id, next }, offer, pending: null };
}
