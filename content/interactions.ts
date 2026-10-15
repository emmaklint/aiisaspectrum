/**
 * The four interaction models shown side by side in the centerpiece.
 *
 * `id` picks the mockup component in components/demos. Order is the order
 * of the tabs; nothing else depends on it.
 */
export type Interaction = {
  id: "ask" | "choose" | "context" | "proactive";
  /** The tab: what the person does. */
  verb: string;
  /** The label for the interaction model itself. */
  label: string;
  /** One line on what that means, in plain words. */
  note: string;
};

export const interactions: Interaction[] = [
  {
    id: "ask",
    verb: "Ask",
    label: "Conversation",
    note: "You describe what you want in language.",
  },
  {
    id: "choose",
    verb: "Choose",
    label: "Curation",
    note: "The AI creates possibilities, you choose.",
  },
  {
    id: "context",
    verb: "Context",
    label: "Ambient",
    note: "The information appears where the decision happens.",
  },
  {
    id: "proactive",
    verb: "Act for me",
    label: "Proactive",
    note: "The AI acts before you ask.",
  },
];
