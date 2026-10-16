/**
 * The "Ten options" bit's generator: a fixed pool of poster headlines in four
 * tones. Asking in chat walks through them one at a time; the spread shows
 * many at once and leans towards the tone you point at.
 */

export type Tone = "plain" | "playful" | "warm" | "bold";

export const toneLabels: Record<Tone, string> = {
  plain: "Plain",
  playful: "Playful",
  warm: "Warm",
  bold: "Bold",
};

const pool: Record<Tone, string[]> = {
  plain: [
    "Kids' clothes swap",
    "Clothes swap on Saturday",
    "Bring clothes, take clothes",
    "Kids' clothes, free to swap",
    "Swap your outgrown kids' clothes",
    "Saturday swap: kids' sizes",
    "Free clothes swap for families",
    "Kids' clothes swap at the library",
  ],
  playful: [
    "Swap till you drop",
    "Too small? Swap it all",
    "Outgrown it? Trade it!",
    "The great sock shuffle",
    "Swap shop for small humans",
    "Tiny clothes, big swap",
    "Grow, swap, repeat",
    "Out with the small, in with the next",
  ],
  warm: [
    "Pass it on",
    "Clothes with a second childhood",
    "From our wardrobes to yours",
    "Give a jacket a new adventure",
    "Every sweater deserves another winter",
    "Share what they've outgrown",
    "Too small for one, just right for another",
    "Hand-me-downs for the whole street",
  ],
  bold: [
    "Free clothes. Saturday.",
    "Bring a bag. Leave a bag.",
    "Your kids grew. Their clothes didn't.",
    "Stop buying. Start swapping.",
    "Empty the wardrobe",
    "Nothing to buy",
    "Swap. Don't shop.",
    "Saturday. Free. Bring stuff.",
  ],
};

export type Headline = { text: string; tone: Tone };

const tones: Tone[] = ["plain", "playful", "warm", "bold"];

/** Every headline, with the tones interleaved so a run of them feels mixed. */
export const allHeadlines: Headline[] = Array.from({ length: 8 }).flatMap((_, i) =>
  tones.map((tone) => ({ text: pool[tone][(i * 3 + tones.indexOf(tone)) % 8], tone })),
);

export function toneFromMessage(msg: string): Tone | null {
  const t = msg.toLowerCase();
  if (/play|fun|funny|silly|pun|joke|cute/.test(t)) return "playful";
  if (/warm|cosy|cozy|kind|sweet|soft|friendly|heart/.test(t)) return "warm";
  if (/bold|short|punch|direct|loud|strong|snappy/.test(t)) return "bold";
  if (/plain|simple|clear|boring|straight|basic|informative/.test(t)) return "plain";
  return null;
}

/** The next headline for the chat: in the asked-for tone if any, never repeated. */
export function nextHeadline(seen: Set<string>, tone: Tone | null): Headline | null {
  return allHeadlines.find((h) => !seen.has(h.text) && (!tone || h.tone === tone)) || null;
}

/** A fresh spread of ten, leaning towards `tone` when given. */
export function spread(seen: Set<string>, tone: Tone | null, keep: Headline[] = []): Headline[] {
  const unseen = allHeadlines.filter((h) => !seen.has(h.text) && !keep.some((k) => k.text === h.text));
  const leaning = tone ? unseen.filter((h) => h.tone === tone).slice(0, 6) : [];
  const rest = unseen.filter((h) => !leaning.includes(h));
  const fresh = [...leaning, ...rest].slice(0, 10 - keep.length);
  const result = [...keep, ...fresh];
  // When the pool runs dry, fall back to ones seen before so the spread stays full.
  if (result.length < 10) {
    for (const h of allHeadlines) {
      if (result.length >= 10) break;
      if (!result.some((r) => r.text === h.text) && (!tone || h.tone === tone || result.length > 6)) result.push(h);
    }
  }
  return result;
}
