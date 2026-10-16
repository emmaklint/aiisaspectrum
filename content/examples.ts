import type { Way } from "./ways";

/**
 * The collection. Add an entry and it appears on the examples page.
 * `ways` decides which filters it shows up under, and links it to any bit
 * that lets you feel the same way of interacting.
 */
export type Example = {
  name: string;
  /** One sentence on the interaction idea, not on the product. */
  idea: string;
  kind: "Product" | "Research" | "Idea";
  ways: Way[];
  href: string;
};

export const examples: Example[] = [
  {
    name: "Moonjar",
    idea: "Instead of a chat beside the work, you click on part of a generated product screenshot and ask for changes right there.",
    kind: "Product",
    ways: ["point"],
    href: "https://moonjar.ai/features",
  },
  {
    name: "DynaVis",
    idea: "Ask for a change to a chart and get a control, like a slider, so you can stop explaining and adjust it yourself.",
    kind: "Research",
    ways: ["adjust"],
    href: "https://www.microsoft.com/en-us/research/publication/dynavis-dynamically-synthesized-ui-widgets-for-visualization-editing/",
  },
  {
    name: "Misty",
    idea: "Drag part of one interface design onto another to show which qualities you want carried across.",
    kind: "Research",
    ways: ["demonstrate", "point"],
    href: "https://machinelearning.apple.com/research/interactive-prototyping",
  },
  {
    name: "Jelly",
    idea: "Describe what you are trying to do, and a small tool takes shape around the task and keeps changing as it does.",
    kind: "Research",
    ways: ["reshape"],
    href: "https://doi.org/10.1145/3706598.3713285",
  },
  {
    name: "Orality",
    idea: "Think out loud, and your thoughts land as clusters on a canvas you can rearrange by hand or by voice, instead of in a growing chat thread.",
    kind: "Research",
    ways: ["reshape", "stepIn"],
    href: "https://arxiv.org/abs/2603.02544",
  },
];
