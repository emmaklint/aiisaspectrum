/**
 * What AI can do, treated as a material. Each bit exposes one of these
 * through something other than a conversation, the way the bits in the
 * inspirational bits method expose one property of a technology.
 */
export const capabilities = {
  interpret: { label: "Interpret", note: "Makes sense of messy input, like a ramble or a vague request." },
  generate: { label: "Generate", note: "Makes new things: words, images, options." },
  transform: { label: "Transform", note: "Turns something into something else: shorter, bigger, another colour." },
  notice: { label: "Notice", note: "Reads patterns and context, and can speak up without being asked." },
  act: { label: "Act", note: "Does a series of steps on its own." },
} as const;

export type Capability = keyof typeof capabilities;
