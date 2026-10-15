/**
 * The collection. Four for now — add an entry and it appears on the page.
 */
export type Example = {
  name: string;
  /** One sentence on the interaction idea, not on the product. */
  idea: string;
  tag: string;
  href: string;
};

export const examples: Example[] = [
  {
    name: "Moonjar",
    idea: "Feedback for coding agents can live as comments attached directly to the thing being changed rather than in a separate chat.",
    tag: "Contextual interaction",
    href: "https://moonjar.ai/features",
  },
  {
    name: "DynaVis",
    idea: "Natural language can create interface controls that the user then manipulates directly.",
    tag: "Generated controls",
    href: "https://www.microsoft.com/en-us/research/publication/dynavis-dynamically-synthesized-ui-widgets-for-visualization-editing/",
  },
  {
    name: "Misty",
    idea: "Designers can select and drag parts of one interface onto another to communicate what qualities they want transferred.",
    tag: "Direct manipulation",
    href: "https://machinelearning.apple.com/research/interactive-prototyping",
  },
  {
    name: "Jelly",
    idea: "The AI can generate and reshape the interface itself around the task rather than only generating content inside a fixed UI.",
    tag: "Generative interface",
    href: "https://doi.org/10.1145/3706598.3713285",
  },
];
