/**
 * The four questions a visitor can answer.
 *
 * These are exploratory dimensions, not a validated taxonomy. Each one is
 * phrased in the UI as a plain question with plain answers; the drier design
 * vocabulary lives in `technicalLabel` and is always shown as secondary.
 *
 * Options are ordered. The explorer treats that order as a scale when it
 * works out which concept sits closest to a visitor's answers, so keep each
 * list running from one end of the idea to the other.
 */

export type DimensionId = "role" | "autonomy" | "visibility" | "presence";

export type DimensionOption = {
  /** Stable id. It goes in the URL, so changing one breaks old share links. */
  id: string;
  /** The answer, in the visitor's own words. */
  label: string;
  /** A few words of gloss, shown under the chosen answer. Keep it tiny. */
  blurb: string;
};

export type Dimension = {
  id: DimensionId;
  /** Short name for the control. */
  name: string;
  /** The question itself. */
  question: string;
  /** The design-vocabulary name for this dimension. Secondary, always. */
  technicalLabel: string;
  options: DimensionOption[];
};

export const dimensions: Dimension[] = [
  {
    id: "role",
    name: "The work",
    question: "Do you want it to do the thing, or think with you?",
    technicalLabel: "Role",
    options: [
      {
        id: "for",
        label: "Do it for me",
        blurb: "It takes the task off your hands.",
      },
      {
        id: "with",
        label: "Think it through with me",
        blurb: "You're still the one deciding.",
      },
    ],
  },
  {
    id: "autonomy",
    name: "The how",
    question: "Should it follow your steps, or work out its own?",
    technicalLabel: "Autonomy",
    options: [
      {
        id: "prescribed",
        label: "Follow the steps I set",
        blurb: "The same way every time.",
      },
      {
        id: "open",
        label: "Work out its own way",
        blurb: "You give the goal, not the method.",
      },
    ],
  },
  {
    id: "visibility",
    name: "The workings",
    question: "How much of its thinking do you want to see?",
    technicalLabel: "Visibility",
    options: [
      {
        id: "opaque",
        label: "Just the answer",
        blurb: "Trust it or don't.",
      },
      {
        id: "glass",
        label: "Show me why",
        blurb: "You can see what it assumed.",
      },
      {
        id: "editable",
        label: "Let me change the inputs",
        blurb: "And move them around.",
      },
    ],
  },
  {
    id: "presence",
    name: "The place",
    question: "Where should it live?",
    technicalLabel: "Presence",
    options: [
      {
        id: "onscreen",
        label: "Somewhere I open",
        blurb: "A thing you go to.",
      },
      {
        id: "ambient",
        label: "Around in the room",
        blurb: "It speaks up mid-something-else.",
      },
      {
        id: "invisible",
        label: "Inside an ordinary object",
        blurb: "No interface at all.",
      },
    ],
  },
];

/** Convenience lookup: dimensions.byId.role.options, etc. */
export const dimensionById = Object.fromEntries(
  dimensions.map((d) => [d.id, d]),
) as Record<DimensionId, Dimension>;

/** A full set of answers — one option id per dimension. */
export type Selection = Record<DimensionId, string>;

export const defaultSelection: Selection = {
  role: "with",
  autonomy: "prescribed",
  visibility: "opaque",
  presence: "onscreen",
};

export function optionLabel(dimension: DimensionId, optionId: string): string {
  const option = dimensionById[dimension].options.find((o) => o.id === optionId);
  return option ? option.label : optionId;
}
