/**
 * What AI can do, treated as a material. Each bit exposes one of these
 * through something other than a conversation, the way the bits in the
 * inspirational bits method expose one property of a technology.
 */
export const capabilities = {
  interpret: { label: "Interpret", note: "Makes sense of messy input, like a ramble or a vague request.", tone: "bg-spectrum-pink" },
  generate: { label: "Generate", note: "Makes new things: words, images, options.", tone: "bg-spectrum-rose" },
  transform: { label: "Transform", note: "Turns something into something else: shorter, bigger, another colour.", tone: "bg-spectrum-peach" },
  notice: { label: "Notice", note: "Reads patterns and context, and can speak up without being asked.", tone: "bg-spectrum-apricot" },
  act: { label: "Act", note: "Does a series of steps on its own.", tone: "bg-spectrum-burnt" },
} as const;
/* Each capability owns one stop on the spectrum, in this order. The colour
   only ever repeats the written label, it never replaces it. */

export type Capability = keyof typeof capabilities;
