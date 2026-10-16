/**
 * The "Think out loud" bit's interpreter. A few rules that split a messy
 * ramble into thoughts and sort each one into a group. A real model would do
 * this far better; the bit is about what happens to the result, not how
 * clever the sorting is.
 */

export type Group = "todo" | "worry" | "question" | "idea" | "other";

export const groups: { id: Group; label: string }[] = [
  { id: "todo", label: "Things to do" },
  { id: "worry", label: "Worries" },
  { id: "question", label: "Open questions" },
  { id: "idea", label: "Ideas" },
  { id: "other", label: "Other thoughts" },
];

export type Thought = { id: string; text: string; group: Group; round: number };

export const exampleRamble =
  "Okay so the clothes swap is on Saturday and I still need to make the poster. Um, I'm a bit worried nobody will come. Maybe we could have coffee and buns so it feels more like hanging out. I need to ask the library if we can borrow tables. What do we do with the clothes nobody takes? Oh and I have to sort the kids' old clothes, there's like three bags. It would be fun if the kids could swap toys too. I'm not sure the room is big enough. Should there be a limit on how much people take?";

const FILLERS = /^(?:(?:okay|ok|so|um+|uh+|like|well|oh|and|but|yeah|right|anyway|i mean|you know)[,.]?\s+)+/i;

export function splitThoughts(ramble: string): string[] {
  return ramble
    .replace(/\s+/g, " ")
    .split(/(?<=[.!?])\s+|\n+|\s+(?:oh and|also|and also|and then)\s+/i)
    .map((s) => s.trim().replace(FILLERS, "").replace(/\s*,\s*$/, ""))
    .map((s) => s.replace(/\blike\s+(?=\d|three|two|four|a few)/i, ""))
    .filter((s) => s.split(" ").length >= 3)
    .map((s) => s[0].toUpperCase() + s.slice(1));
}

export function classify(text: string): Group {
  const t = text.toLowerCase();
  if (/\?\s*$/.test(t) || /^(how|what|should|do we|do i|can|will|who|when|where|is it|why|are we)\b/.test(t)) return "question";
  if (/worr|scared|afraid|stress|what if|not sure|nervous|anxious|nobody will|no one will|too much|might not|won't come/.test(t)) return "worry";
  if (/\b(maybe|could|what about|how about|idea|would be (fun|nice|cool|great))\b/.test(t)) return "idea";
  if (/\b(need to|have to|must|remember to|gotta|got to|should|buy|book|ask|make|print|send|bring|call|email|sort|fix|pick up|put up|still need)\b/.test(t)) return "todo";
  return "other";
}

export function interpretRamble(ramble: string, round: number, startId = 0): Thought[] {
  return splitThoughts(ramble).map((text, i) => ({
    id: `t${startId + i}`,
    text: text.replace(/[.!]$/, ""),
    group: classify(text),
    round,
  }));
}

/** What a chat assistant does with the same ramble: a polite wall of text. */
export function chatSummary(thoughts: Thought[]): string {
  const of = (g: Group) => thoughts.filter((t) => t.group === g).map((t) => t.text.replace(/\bI'm\b/g, "you're").replace(/\bI\b/g, "you").replace(/\bmy\b/gi, "your"));
  const lower = (s: string) => s[0].toLowerCase() + s.slice(1);
  const list = (xs: string[]) => xs.map(lower).join("; ");
  const parts = ["Sounds like you have a lot going on! Here's a summary of what you shared."];
  if (of("todo").length) parts.push(`Things you mentioned needing to do: ${list(of("todo"))}.`);
  if (of("worry").length) parts.push(`You also shared some concerns: ${list(of("worry"))}. These are completely understandable feelings when organising something like this.`);
  if (of("idea").length) parts.push(`You had some great ideas: ${list(of("idea"))}.`);
  if (of("question").length) parts.push(`Some open questions to consider: ${list(of("question"))}.`);
  if (of("other").length) parts.push(`Other things you mentioned: ${list(of("other"))}.`);
  parts.push("Would you like me to help you prioritise these, make a checklist, or explore any of them further?");
  return parts.join("\n\n");
}
