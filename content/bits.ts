import type { Capability } from "./capabilities";
import type { Way } from "./ways";

/**
 * Inspirational bits: small, working things that each expose one thing AI
 * can do (its capability) through a way of interacting that isn't a chat.
 * A bit with `live: false` is listed as on its way. A live bit needs a page
 * at app/bits/<slug>/page.tsx.
 */
export type Bit = {
  slug: string;
  title: string;
  /** What you do, in one line. */
  task: string;
  capability: Capability;
  /** How you interact. Links the bit to examples that work the same way. */
  way: Way;
  live: boolean;
};

export const bits: Bit[] = [
  {
    slug: "the-task-you-keep-moving",
    title: "The task you keep moving",
    task: "Keep putting something off, and see who notices.",
    capability: "notice",
    way: "notice",
    live: true,
  },
  {
    slug: "poster-playground",
    title: "Poster playground",
    task: "Make a poster yours. Talk to it, point at it, drag it around.",
    capability: "transform",
    way: "mix",
    live: true,
  },
  {
    slug: "point-dont-describe",
    title: "Point, don't describe",
    task: "Fix one clunky sentence.",
    capability: "transform",
    way: "point",
    live: true,
  },
  {
    slug: "think-out-loud",
    title: "Think out loud",
    task: "Ramble, and watch your thoughts land as clusters you can move.",
    capability: "interpret",
    way: "reshape",
    live: true,
  },
  {
    slug: "ten-options",
    title: "Ten options, not one answer",
    task: "Pick from a spread instead of asking again and again.",
    capability: "generate",
    way: "choose",
    live: true,
  },
  {
    slug: "step-in-halfway",
    title: "Step in halfway",
    task: "Watch the AI work on a plan, and take over one part.",
    capability: "act",
    way: "stepIn",
    live: true,
  },
];

/** The method note shown at the foot of every bit. */
export const method = {
  short:
    "An inspirational bit is a small, working thing that lets you feel one property of a technology instead of reading about it (Sundström et al. 2011, Klint 2018).",
  noAi: "There’s no real AI here yet. The replies follow simple rules, so the only thing that changes is how you interact.",
};
