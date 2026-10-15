import type { Selection } from "./dimensions";

/**
 * Eight sketches of the same morning.
 *
 * These are illustrative concepts, deliberately few. They are not an attempt
 * to cover every combination of answers — the explorer shows whichever sits
 * closest to what a visitor picked, and says so.
 *
 * To add one: write it here, then add a matching illustration in
 * components/illustrations and register it in components/Illustration.tsx.
 */

export type Concept = {
  id: string;
  /** What it is, named like an object rather than a feature. */
  name: string;
  /** One line, said quickly. */
  tagline: string;
  /** Where the traits put it. Used to find the closest concept. */
  traits: Selection;
  /** 6:30am, from the person's point of view. Two or three sentences. */
  experience: string;
  /** What the software is actually doing underneath. */
  machinery: string;
  /**
   * The honest caveat. Several of these would work fine without any AI at
   * all, and saying so is part of the point.
   */
  honestNote: string;
  /** Palette accent, from the crayon colours used across emmaklint.com. */
  accent: string;
};

export const concepts: Concept[] = [
  {
    id: "chat",
    name: "The Chat Window",
    tagline: "You ask. It answers. You still have to decide.",
    traits: {
      role: "with",
      autonomy: "prescribed",
      visibility: "opaque",
      presence: "onscreen",
    },
    experience:
      "You type what's the weather today. A paragraph comes back: 4°C, rain after two. Then you go and find the waterproofs yourself.",
    machinery:
      "Looks up a forecast, writes it as a sentence. Doesn't know whose morning this is or what's in the wash.",
    honestNote: "The one everyone pictures. Notice how much work it hands back.",
    accent: "#3E7C8C",
  },
  {
    id: "board",
    name: "The Morning Board",
    tagline: "Everything on one surface, and your hands on it.",
    traits: {
      role: "with",
      autonomy: "prescribed",
      visibility: "editable",
      presence: "onscreen",
    },
    experience:
      "One screen by the kettle: the day as a line, today's plans on it, two outfits underneath. Drag pickup an hour later and the outfits change.",
    machinery:
      "Holds the forecast, the calendar and the clean laundry in one place, and recalculates as you move things.",
    honestNote: "The hard part is knowing what's in the laundry basket, not predicting anything.",
    accent: "#5E6B2A",
  },
  {
    id: "what-if",
    name: "The What-If Dial",
    tagline: "Not an answer. A set of answers you can push around.",
    traits: {
      role: "with",
      autonomy: "open",
      visibility: "editable",
      presence: "onscreen",
    },
    experience:
      "Three mornings side by side, and a dial marked how much do you mind being wrong. Turn it and they all gain a layer.",
    machinery:
      "Works out its own route to a goal you set, and puts the judgement call in your hands instead of making it quietly.",
    honestNote: "At 6:30 with one shoe on, you may not want to think about trade-offs.",
    accent: "#D98A2B",
  },
  {
    id: "counter",
    name: "The Counter Oracle",
    tagline: "It speaks first, from somewhere near the toaster.",
    traits: {
      role: "for",
      autonomy: "open",
      visibility: "opaque",
      presence: "ambient",
    },
    experience:
      "You're filling the kettle and something says: colder than yesterday, wet by home time — long sleeves and boots. You didn't ask.",
    machinery:
      "Decided this was a moment worth speaking into, and compressed everything it knew to one sentence.",
    honestNote: "One sentence is a gift. The same thing twice is a nag. That's a design problem, not a model one.",
    accent: "#E0602F",
  },
  {
    id: "margin",
    name: "The Second Opinion",
    tagline: "You've already chosen. It just mentions one thing.",
    traits: {
      role: "with",
      autonomy: "open",
      visibility: "glass",
      presence: "ambient",
    },
    experience:
      "You've got the thin jacket in your hand. The shelf display doesn't argue — it just shows the afternoon dipping, and pickup is at four.",
    machinery:
      "Stays out of the decision and offers the one fact you were most likely missing, with the reading behind it.",
    honestNote: "Choosing which single fact matters is the interesting part.",
    accent: "#7A6CA8",
  },
  {
    id: "laid-out",
    name: "Already Laid Out",
    tagline: "You wake up and it's done, with a note explaining itself.",
    traits: {
      role: "for",
      autonomy: "open",
      visibility: "glass",
      presence: "ambient",
    },
    experience:
      "Two sets of clothes over the chair, and a card: wet from 2pm, PE today, green jumper's in the wash. Nothing to open.",
    machinery:
      "Read the forecast, the calendar and the laundry overnight, picked an outfit, and wrote down what would change its mind.",
    honestNote: "The receipt is what makes it trustable. Someone still carries it upstairs.",
    accent: "#98A55A",
  },
  {
    id: "rule",
    name: "The Standing Rule",
    tagline: "You wrote it once in September. It's been running since.",
    traits: {
      role: "for",
      autonomy: "prescribed",
      visibility: "editable",
      presence: "invisible",
    },
    experience:
      "No app. Months ago you wrote: under eight degrees, wool; raining at pickup, boots. This morning both are by the door.",
    machinery:
      "Runs the rule you wrote against today's numbers and keeps a log. Nothing is being inferred about you.",
    honestNote: "A plain if-then would do this. How many AI features are really just this?",
    accent: "#A33B5E",
  },
  {
    id: "umbrella",
    name: "The Umbrella That Knows",
    tagline: "No screen, no voice. The handle is just glowing.",
    traits: {
      role: "for",
      autonomy: "prescribed",
      visibility: "opaque",
      presence: "invisible",
    },
    experience:
      "The umbrella's in the stand where it always is. This morning the handle has a faint light in it. You pick it up on the way past.",
    machinery:
      "One bit of information — rain, or not — moved into an object you already walk past.",
    honestNote: "Genuinely not AI: a forecast and a bulb. It marks the far end, where the interaction disappears.",
    accent: "#F28C86",
  },
];

export const conceptById = Object.fromEntries(
  concepts.map((c) => [c.id, c]),
) as Record<string, Concept>;
