/** Small garment marks for the mockups. Line drawings, one weight. */

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function Frame({ children }: { children: React.ReactNode }) {
  return (
    <svg viewBox="0 0 48 48" className="h-full w-full" aria-hidden="true" focusable="false">
      <g {...stroke}>{children}</g>
    </svg>
  );
}

export const Tee = () => (
  <Frame>
    {/* short, wide sleeves */}
    <path d="M17 10 L8 15 l3 7 5-2 v18 h16 V20 l5 2 3-7 -9-5 z" />
    <path d="M17 10 q7 5 14 0" />
  </Frame>
);

export const Jumper = () => (
  <Frame>
    {/* long sleeves down the sides, longer body */}
    <path d="M17 10 h14 l9 5 -3 17 -6 -1 v11 H17 V31 l-6 1 -3 -17 z" />
    <path d="M18 10 q6 5 12 0" />
    <path d="M14 38 h20" />
  </Frame>
);

export const Raincoat = () => (
  <Frame>
    {/* the hood is what tells it apart from a jumper */}
    <path d="M18 13 a6 6 0 0 1 12 0" />
    <path d="M18 13 L9 18 l3 15 5 -1 v20 h14 V32 l5 1 3 -15 -9 -5 z" />
    <path d="M24 15 v37" />
  </Frame>
);

export const Boots = () => (
  <Frame>
    {/* wellies: shaft, then a foot turning out at the bottom */}
    <path d="M7 9 h9 v16 c0 4 2 6 5 7 l3 1 v4 H7 z" />
    <path d="M7 33 h17" />
    <path d="M26 9 h9 v16 c0 4 2 6 5 7 l3 1 v4 H26 z" />
    <path d="M26 33 h17" />
  </Frame>
);

export const Trousers = () => (
  <Frame>
    <path d="M15 8 h18 l2 32 h-7 l-4 -19 -4 19 h-7 z" />
    <path d="M15 13 h18" />
  </Frame>
);

export const Umbrella = () => (
  <Frame>
    <path d="M6 24 a18 18 0 0 1 36 0 z" />
    <path d="M6 24 q9 6 18 0 q9 6 18 0" />
    <path d="M24 24 v13 a5 5 0 0 1 -10 0" />
  </Frame>
);

export const glyphs = {
  tee: Tee,
  jumper: Jumper,
  raincoat: Raincoat,
  boots: Boots,
  trousers: Trousers,
  umbrella: Umbrella,
};

export type GlyphName = keyof typeof glyphs;
