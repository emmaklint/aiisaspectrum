/**
 * What AI can do, treated as a material. Each bit exposes one of these
 * through something other than a conversation, the way the bits in the
 * inspirational bits method expose one property of a technology.
 */
export const capabilities = {
  interpret: { label: "Interpret", note: "Makes sense of messy input." },
  generate: { label: "Generate", note: "Makes new things." },
  transform: { label: "Transform", note: "Turns one thing into another." },
  notice: { label: "Notice", note: "Reads context and patterns." },
  act: { label: "Act", note: "Does steps on its own." },
} as const;

export type Capability = keyof typeof capabilities;
