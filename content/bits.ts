import type { Way } from "./ways";

/**
 * Inspirational bits: small, working things that let you feel one property
 * of AI interaction. A bit with `live: false` is listed as on its way.
 * A live bit needs a page at app/bits/<slug>/page.tsx.
 */
export type Bit = {
  slug: string;
  title: string;
  /** The task, in one line. */
  task: string;
  /** The two ways you try it. */
  versus: [string, string];
  way: Way;
  live: boolean;
};

export const bits: Bit[] = [
  {
    slug: "point-dont-describe",
    title: "Point, don't describe",
    task: "Fix one clunky sentence.",
    versus: ["Describe which one", "Point at it"],
    way: "point",
    live: true,
  },
  {
    slug: "ask-once-then-adjust",
    title: "Ask once, then adjust",
    task: "Get a bar in a chart to the right width.",
    versus: ["Keep typing “a bit wider”", "Get a slider"],
    way: "adjust",
    live: false,
  },
  {
    slug: "every-morning",
    title: "The same question every morning",
    task: "Get the kids out the door five mornings in a row.",
    versus: ["Ask every day", "Let the answer show up by the door"],
    way: "ambient",
    live: false,
  },
  {
    slug: "step-in-halfway",
    title: "Step in halfway",
    task: "Fix one wrong item in a plan the AI is making.",
    versus: ["Explain it in chat", "Edit that item yourself"],
    way: "stepIn",
    live: false,
  },
];

/** The method note shown at the foot of every bit. */
export const method = {
  short:
    "An inspirational bit is a small, working thing that lets you feel one property of a technology instead of reading about it (Sundström et al. 2011, Klint 2018).",
  noAi: "There’s no real AI here. The replies are prewritten, so the only thing that changes is how you interact.",
};
