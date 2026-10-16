/**
 * The collection. Add an entry and it appears on the page.
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
  {
    name: "Textoshop",
    idea: "Text can be edited with drawing-software tools: a tone brush, a smudge tool, layers, and boolean operations to merge passages.",
    tag: "Direct manipulation",
    href: "https://doi.org/10.1145/3706598.3713862",
  },
  {
    name: "Toyteller",
    idea: "Moving characters around like toys can steer a story, which helps express intentions that are hard to put into words.",
    tag: "Demonstration",
    href: "https://arxiv.org/abs/2501.13284",
  },
  {
    name: "Code Shaping",
    idea: "Programmers can sketch arrows and rough charts directly on top of their code, and the AI turns the sketch into code changes.",
    tag: "Sketching",
    href: "https://doi.org/10.1145/3706598.3713822",
  },
  {
    name: "DirectGPT",
    idea: "Selecting the object you mean, instead of describing where it is, makes edits to text, code and images faster and needs shorter prompts.",
    tag: "Direct manipulation",
    href: "https://doi.org/10.1145/3613904.3642462",
  },
  {
    name: "Circle to Search",
    idea: "Circling, highlighting or tapping something on screen is the whole question, without leaving the app.",
    tag: "Pointing",
    href: "https://www.search.google/ways-to-search/circle-to-search/",
  },
  {
    name: "Clean Up",
    idea: "Tapping or brushing over an object removes it from a photo, and the AI can highlight things you might want gone.",
    tag: "Pointing",
    href: "https://support.apple.com/guide/iphone/clean-up-extend-and-reframe-photos-xy0grrlxue5w/ios",
  },
  {
    name: "Descript",
    idea: "Video and audio can be edited by editing the transcript: delete a word and it disappears from the recording.",
    tag: "Transformed material",
    href: "https://help.descript.com/hc/en-us/articles/15726742913933",
  },
  {
    name: "Math Notes",
    idea: "A handwritten equation gets its answer in your own handwriting, and tapping a number turns it into a slider.",
    tag: "Generated controls",
    href: "https://support.apple.com/guide/iphone/solve-math-with-math-notes-iph46efa613a/ios",
  },
  {
    name: "Session Players",
    idea: "An AI musician plays along with your song, and you steer its performance with complexity and intensity sliders.",
    tag: "Steering",
    href: "https://support.apple.com/en-us/guide/logicpro-ipad/lpip6efdfca1/2.0/ipados/17.0",
  },
  {
    name: "PromptPaint",
    idea: "Prompts can be mixed like paint and applied to different parts of a canvas, the way you layer colors.",
    tag: "Steering",
    href: "https://doi.org/10.1145/3586183.3606777",
  },
  {
    name: "Krea Realtime",
    idea: "The image updates live as you draw and move things on a canvas, with no send button.",
    tag: "Live feedback",
    href: "https://www.krea.ai/realtime",
  },
  {
    name: "Patchview",
    idea: "Generated story elements are pulled toward concepts like magnets, and you correct the AI by dragging things where they belong.",
    tag: "Direct manipulation",
    href: "https://doi.org/10.1145/3654777.3676352",
  },
  {
    name: "Best Take",
    idea: "In a group photo you tap each face and pick the expression you like, and the AI merges your choices.",
    tag: "Choosing",
    href: "https://blog.google/products/photos/how-google-photos-best-take-works/",
  },
  {
    name: "Luminate",
    idea: "The AI lays out many responses along dimensions it generates, so you explore a space of options instead of asking one question at a time.",
    tag: "Choosing",
    href: "https://doi.org/10.1145/3613904.3642400",
  },
  {
    name: "WaitGPT",
    idea: "While an AI analyzes data, each step shows up visually so you can check and change a single step without starting over.",
    tag: "Stepping in",
    href: "https://arxiv.org/abs/2408.01703",
  },
  {
    name: "Satori",
    idea: "During a physical task in AR, the assistant offers help on its own, based on what you seem to know and what is around you.",
    tag: "Contextual interaction",
    href: "https://doi.org/10.1145/3706598.3714188",
  },
  {
    name: "Magic Cue",
    idea: "When someone asks for an address in a message, the answer appears as a suggestion right where you reply.",
    tag: "Contextual interaction",
    href: "https://store.google.com/magazine/magic-cue",
  },
  {
    name: "Endel",
    idea: "Sound keeps adapting to the time of day, weather and heart rate, and you never talk to it.",
    tag: "Ambient",
    href: "https://endel.io/",
  },
  {
    name: "mymind",
    idea: "Everything you save gets sorted and tagged for you, so there are no folders and you find things by what you remember.",
    tag: "Ambient",
    href: "https://mymind.com/",
  },
];
