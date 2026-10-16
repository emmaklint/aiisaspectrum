/**
 * The "Step in halfway" bit's agent: packing for a cabin weekend in late
 * October, one step at a time. One step is a plausible mistake (swimsuits,
 * because there's a lake) and the next step depends on it, so stepping in
 * early changes what the AI does afterwards.
 */

export type Item = { id: string; name: string; byYou?: boolean };

export type Step = {
  id: string;
  /** What the AI says it's doing. */
  note: string;
  items: Item[];
  /** Only runs if this item is still on the list. */
  needs?: string;
  /** What it says instead when the item it needs is gone. */
  skipNote?: string;
};

export const trip = "A weekend at a cabin in late October, two adults and two kids (3 and 6).";

export const steps: Step[] = [
  { id: "forecast", note: "Checking the forecast: 3°C and rain on Saturday.", items: [] },
  {
    id: "layers",
    note: "It'll be cold, so warm layers for everyone.",
    items: [
      { id: "wool", name: "Wool base layers ×4" },
      { id: "fleece", name: "Fleece jackets ×4" },
    ],
  },
  {
    id: "rain",
    note: "Rain on Saturday, so rain gear.",
    items: [
      { id: "raintrousers", name: "Rain trousers for the kids ×2" },
      { id: "rainjackets", name: "Rain jackets ×4" },
      { id: "boots", name: "Rubber boots ×4" },
    ],
  },
  {
    id: "lake",
    note: "The cabin is by a lake, so swimwear.",
    items: [{ id: "swimsuits", name: "Swimsuits ×4" }],
  },
  {
    id: "towels",
    note: "Towels for after swimming.",
    items: [{ id: "beachtowels", name: "Beach towels ×4" }],
    needs: "swimsuits",
    skipNote: "No swimming, so I'm skipping beach towels.",
  },
  {
    id: "sleep",
    note: "Sleep stuff for the kids.",
    items: [
      { id: "pyjamas", name: "Pyjamas ×2" },
      { id: "teddy", name: "Favourite teddy" },
    ],
  },
  {
    id: "drive",
    note: "It's a long drive, so food for the car.",
    items: [
      { id: "snacks", name: "Snacks" },
      { id: "water", name: "Water bottles ×4" },
    ],
  },
  {
    id: "evening",
    note: "Dark by five, so things for the evenings.",
    items: [
      { id: "torch", name: "Torch" },
      { id: "game", name: "Board game" },
    ],
  },
];

/** What a chat assistant hands back in one go: every step, no stepping in. */
export function fullList(): Item[] {
  return steps.flatMap((s) => s.items);
}

export function listText(items: Item[]): string {
  return items.map((i) => `• ${i.name}`).join("\n");
}

/** Understands "remove the swimsuits", "no towels", "add sunscreen". */
export function chatEdit(msg: string, items: Item[]): { items: Item[]; reply: string } {
  const t = msg.toLowerCase();
  const add = msg.match(/\badd\s+(.+)$/i);
  if (add) {
    const name = add[1].replace(/[.!]$/, "").trim();
    const nice = name[0].toUpperCase() + name.slice(1);
    return { items: [...items, { id: `you-${Date.now()}`, name: nice, byYou: true }], reply: `Added ${name}. Here's the updated list:` };
  }
  if (/\b(remove|no|don't|dont|skip|without|take out|drop|not)\b/.test(t)) {
    const words = t.match(/[a-zåäö]{4,}/g) || [];
    const hit = items.filter((i) => words.some((w) => i.name.toLowerCase().includes(w.slice(0, 5))));
    if (hit.length) {
      let next = items.filter((i) => !hit.includes(i));
      const removed = hit.map((h) => h.name.replace(/\s×\d+$/, "").toLowerCase());
      if (hit.some((h) => h.id === "swimsuits") && next.some((i) => i.id === "beachtowels")) {
        next = next.filter((i) => i.id !== "beachtowels");
        removed.push("beach towels");
      }
      return { items: next, reply: `Got it, I removed ${removed.join(" and ")}. Here's the updated list:` };
    }
    return { items, reply: "I'm not sure which item you mean. Could you say its name?" };
  }
  return { items, reply: "I can remove or add things. Try “remove the swimsuits” or “add sunscreen”." };
}
