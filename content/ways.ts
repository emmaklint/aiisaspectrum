/**
 * Ways of interacting. These tie the two halves of the site together:
 * every bit lets you feel one way, and every example is tagged with the
 * ways it uses. A loose set, not a taxonomy. Add to it freely.
 */
export const ways = {
  point: {
    label: "Point at it",
    note: "Show the AI where, instead of describing it.",
  },
  adjust: {
    label: "Adjust it yourself",
    note: "Get a control and do the fine-tuning by hand.",
  },
  demonstrate: {
    label: "Show by example",
    note: "Pick something up and show what you want carried across.",
  },
  reshape: {
    label: "The tool takes shape",
    note: "The interface itself forms around what you are doing.",
  },
  ambient: {
    label: "No question needed",
    note: "The answer shows up where the decision happens.",
  },
  stepIn: {
    label: "Step in halfway",
    note: "See what the AI is doing and take over one part.",
  },
} as const;

export type Way = keyof typeof ways;
