/**
 * One line drawing per concept, all on the same 360×230 stage so they swap
 * without the layout jumping.
 *
 * Each drawing inherits its accent from `currentColor` — the colour is set
 * once, on the wrapper in Illustration.tsx — and uses the shared stroke
 * classes defined in app/globals.css.
 */

type Sketch = () => React.JSX.Element;

/* ---- the chat window ------------------------------------------------ */

const Chat: Sketch = () => (
  <>
    {/* the phone */}
    <rect className="ink" x="118" y="20" width="124" height="190" rx="16" />
    <rect className="ink-thin" x="128" y="36" width="104" height="158" rx="8" />
    <line className="ink-thin" x1="166" y1="28" x2="194" y2="28" />

    {/* what it said, at length */}
    <rect className="wash" x="136" y="46" width="78" height="44" rx="10" />
    <line className="ink-thin" x1="145" y1="60" x2="203" y2="60" />
    <line className="ink-thin" x1="145" y1="70" x2="203" y2="70" />
    <line className="ink-thin" x1="145" y1="80" x2="182" y2="80" />

    {/* what you asked */}
    <rect className="stroke-accent" x="156" y="102" width="68" height="26" rx="10" />
    <line className="ink-thin" x1="166" y1="115" x2="212" y2="115" />

    <rect className="wash" x="136" y="140" width="86" height="46" rx="10" />
    <line className="ink-thin" x1="145" y1="155" x2="211" y2="155" />
    <line className="ink-thin" x1="145" y1="165" x2="211" y2="165" />
    <line className="ink-thin" x1="145" y1="175" x2="190" y2="175" />

    {/* and the job it handed back to you */}
    <path
      className="ink-thin"
      strokeDasharray="4 5"
      d="M248 116 C 272 116, 276 128, 290 132"
    />
    <path
      className="ink"
      d="M286 150 l14 -10 h20 l14 10 -10 10 -4 -3 v30 h-20 v-30 l-4 3 z"
    />
    <text className="label" x="278" y="202">
      still yours
    </text>
    <text className="label" x="312" y="138" style={{ fontSize: 18 }}>
      ?
    </text>
  </>
);

/* ---- the morning board ---------------------------------------------- */

const Board: Sketch = () => (
  <>
    <rect className="ink" x="22" y="18" width="316" height="178" rx="12" />

    {/* the day, drawn as a line you can push around */}
    <path className="ink-thin" d="M42 92 H 318" strokeDasharray="2 6" />
    <path
      className="stroke-accent"
      d="M42 86 C 96 86, 118 54, 178 52 C 238 50, 262 78, 318 94"
    />
    {/* rain, hatched over the afternoon */}
    <g className="ink-thin">
      <line x1="262" y1="60" x2="256" y2="76" />
      <line x1="276" y1="58" x2="270" y2="74" />
      <line x1="290" y1="62" x2="284" y2="78" />
      <line x1="304" y1="68" x2="298" y2="84" />
    </g>
    <circle className="fill-accent" cx="248" cy="62" r="7" />
    <path className="ink" d="M232 78 h 32 M234 74 l -5 4 5 4 M262 74 l 5 4 -5 4" />

    {/* today, in chips */}
    <rect className="ink-thin" x="42" y="110" width="58" height="18" rx="9" />
    <rect className="ink-thin" x="108" y="110" width="76" height="18" rx="9" />
    <rect className="ink-thin" x="192" y="110" width="62" height="18" rx="9" />

    {/* two ways it could go */}
    <rect className="ink-thin" x="42" y="140" width="88" height="44" rx="8" />
    <path className="ink" d="M58 154 l10 -6 h14 l10 6 -7 7 -3 -2 v17 h-14 v-17 l-3 2 z" />
    <rect className="wash" x="100" y="150" width="20" height="26" rx="4" />

    <rect className="ink-thin" x="142" y="140" width="88" height="44" rx="8" />
    <path className="ink-thin" d="M158 154 l10 -6 h14 l10 6 -7 7 -3 -2 v17 h-14 v-17 l-3 2 z" />
    <rect className="ink-thin" x="200" y="150" width="20" height="26" rx="4" />

    {/* your hand on it */}
    <path className="ink" d="M268 150 l0 34 8 -9 6 13 7 -4 -6 -12 11 -1 z" />
  </>
);

/* ---- the what-if dial ------------------------------------------------ */

const WhatIf: Sketch = () => (
  <>
    {[26, 134, 242].map((x, i) => (
      <g key={x}>
        <rect className="ink-thin" x={x} y="16" width="92" height="98" rx="8" />
        <path
          className={i === 1 ? "stroke-accent" : "ink"}
          d={`M${x + 26} 46 l12 -8 h16 l12 8 -8 8 -4 -3 v24 h-16 v-24 l-4 3 z`}
        />
        {i > 0 && <rect className="wash" x={x + 24} y="84" width="44" height="18" rx="5" />}
        {i > 1 && <rect className="ink-thin" x={x + 10} y="84" width="12" height="18" rx="4" />}
      </g>
    ))}

    {/* the judgement call, made visible */}
    <path className="ink" d="M112 192 A 68 68 0 0 1 248 192" />
    <g className="ink-thin">
      <line x1="116" y1="176" x2="108" y2="172" />
      <line x1="180" y1="126" x2="180" y2="118" />
      <line x1="244" y1="176" x2="252" y2="172" />
    </g>
    <line className="stroke-accent" x1="180" y1="192" x2="146" y2="152" />
    <circle className="fill-accent" cx="180" cy="192" r="8" />
    <text className="label" x="74" y="212">
      risk it
    </text>
    <text className="label" x="250" y="212">
      don&apos;t
    </text>
  </>
);

/* ---- the counter oracle ---------------------------------------------- */

const Counter: Sketch = () => (
  <>
    {/* the one sentence it chose to say */}
    <path className="wash" d="M44 28 h190 a12 12 0 0 1 12 12 v38 a12 12 0 0 1 -12 12 h-150 l-18 16 v-16 h-22 a12 12 0 0 1 -12 -12 v-38 a12 12 0 0 1 12 -12 z" />
    <line className="ink-thin" x1="60" y1="50" x2="222" y2="50" />
    <line className="ink-thin" x1="60" y1="64" x2="186" y2="64" />

    {/* counter */}
    <line className="ink" x1="8" y1="186" x2="352" y2="186" />

    {/* kettle, mid-fill */}
    <path className="ink" d="M58 186 L64 146 h42 l6 40 z" />
    <line className="ink" x1="62" y1="146" x2="108" y2="146" />
    <path className="ink" d="M72 144 q13 -20 26 0" />
    <circle className="ink" cx="85" cy="131" r="3.5" />
    <path className="ink" d="M108 154 L132 140 L130 152 L110 162 z" />
    {/* and a mug, because you were doing something else */}
    <path className="ink-thin" d="M146 168 h24 v18 h-24 z" />
    <path className="ink-thin" d="M170 172 q9 5 0 10" />

    {/* the thing on the counter */}
    <rect className="ink" x="246" y="130" width="54" height="56" rx="10" />
    <ellipse className="ink-thin" cx="273" cy="130" rx="27" ry="7" />
    <g className="ink-thin">
      <line x1="258" y1="150" x2="288" y2="150" />
      <line x1="258" y1="160" x2="288" y2="160" />
      <line x1="258" y1="170" x2="288" y2="170" />
    </g>
    <g className="stroke-accent" strokeWidth="2">
      <path d="M238 144 q-10 14 0 28" opacity="0.9" />
      <path d="M228 136 q-16 22 0 44" opacity="0.55" />
      <path d="M218 128 q-22 30 0 60" opacity="0.28" />
    </g>
    <text className="label" x="246" y="208">
      unasked
    </text>
  </>
);

/* ---- the second opinion ---------------------------------------------- */

const Margin: Sketch = () => (
  <>
    {/* the jacket already in your hand */}
    <path className="ink" d="M92 50 a9 9 0 1 1 9 9 v8" />
    <path className="ink" d="M101 68 L58 98 h86 z" />
    <path className="ink" d="M62 98 v70 h78 v-70" />
    <line className="ink-thin" x1="101" y1="98" x2="101" y2="168" />
    <path className="ink" d="M44 176 l0 30 7 -8 5 11 7 -3 -5 -11 10 -1 z" />

    {/* the one fact you were missing */}
    <rect className="ink" x="206" y="66" width="130" height="80" rx="8" />
    <path className="ink-thin" d="M220 128 H 324" strokeDasharray="2 5" />
    <path className="stroke-accent" d="M220 96 C 250 90, 262 100, 282 112 C 298 122, 310 126, 324 124" />
    <circle className="fill-accent" cx="282" cy="112" r="5" />
    <text className="label" x="258" y="140">
      pickup, 4pm
    </text>
    <line className="ink-thin" x1="190" y1="160" x2="350" y2="160" />
    <text className="label" x="206" y="180">
      it doesn&apos;t argue
    </text>
  </>
);

/* ---- already laid out ------------------------------------------------ */

const LaidOut: Sketch = () => (
  <>
    {/* chair */}
    <rect className="ink" x="78" y="28" width="118" height="92" rx="6" />
    <path className="ink" d="M70 120 h134 v14 h-134 z" />
    <line className="ink" x1="80" y1="134" x2="80" y2="198" />
    <line className="ink" x1="194" y1="134" x2="194" y2="198" />

    {/* two sets of clothes, already over the back */}
    <path className="wash" d="M88 22 q24 -10 48 0 v62 q-24 10 -48 0 z" />
    <path className="ink-thin" d="M88 22 q24 -10 48 0 v62 q-24 10 -48 0 z" />
    <path className="wash" d="M146 26 q22 -9 44 0 v54 q-22 9 -44 0 z" />
    <path className="ink-thin" d="M146 26 q22 -9 44 0 v54 q-22 9 -44 0 z" />

    {/* the receipt, which you can ignore */}
    <path className="ink" d="M234 92 h100 v96 h-100 z" />
    <g>
      <path className="stroke-accent" d="M246 114 l5 5 9 -11" />
      <line className="ink-thin" x1="268" y1="116" x2="322" y2="116" />
      <path className="stroke-accent" d="M246 140 l5 5 9 -11" />
      <line className="ink-thin" x1="268" y1="142" x2="322" y2="142" />
      <path className="stroke-accent" d="M246 166 l5 5 9 -11" />
      <line className="ink-thin" x1="268" y1="168" x2="310" y2="168" />
    </g>
    <text className="label" x="238" y="206">
      what&apos;d change its mind
    </text>
  </>
);

/* ---- the standing rule ----------------------------------------------- */

const Rule: Sketch = () => (
  <>
    <g transform="rotate(-3 108 92)">
      <rect className="ink" x="24" y="40" width="168" height="104" rx="4" />
      <line className="ink-thin" x1="24" y1="60" x2="192" y2="60" />
      <text className="label" x="40" y="88" style={{ fontSize: 13 }}>
        under 8° → wool
      </text>
      <text className="label" x="40" y="114" style={{ fontSize: 13 }}>
        rain at 4 → boots
      </text>
      <text className="label" x="40" y="54">
        written in September
      </text>
    </g>

    <path
      className="stroke-accent"
      strokeDasharray="5 6"
      d="M200 118 C 232 134, 238 150, 244 168"
    />
    <path className="stroke-accent" d="M238 158 l6 12 10 -7" />

    {/* by the door, without anybody opening anything */}
    <path className="ink-thin" d="M268 20 v180" />
    <path className="ink" d="M268 196 h74" />
    <path className="ink" d="M282 196 v-26 a10 10 0 0 1 10 -10 h4 a10 10 0 0 1 10 10 v26" />
    <path className="wash" d="M282 196 v-26 a10 10 0 0 1 10 -10 h4 a10 10 0 0 1 10 10 v26 z" />
    <path className="ink" d="M312 196 v-26 a10 10 0 0 1 10 -10 h4 a10 10 0 0 1 10 10 v26" />
    <path className="wash" d="M312 196 v-26 a10 10 0 0 1 10 -10 h4 a10 10 0 0 1 10 10 v26 z" />
    <text className="label" x="268" y="216">
      no app opened
    </text>
  </>
);

/* ---- the umbrella ---------------------------------------------------- */

const Umbrella: Sketch = () => (
  <>
    {/* a hallway you walk past without stopping */}
    <line className="ink-thin" x1="18" y1="196" x2="342" y2="196" />
    <rect className="ink-thin" x="52" y="24" width="96" height="172" rx="2" />
    <circle className="ink-thin" cx="134" cy="116" r="4" />

    {/* the stand, where it always is */}
    <path className="ink" d="M206 142 v50 a10 10 0 0 0 10 10 h42 a10 10 0 0 0 10 -10 v-50" />
    <ellipse className="ink" cx="237" cy="142" rx="31" ry="9" />

    {/* the umbrella: handle up, tip in the stand */}
    <path className="ink" d="M237 60 v-12 a11 11 0 0 0 -22 0" />
    <line className="ink" x1="237" y1="60" x2="237" y2="94" />
    <path className="wash" d="M237 92 C 250 108, 253 130, 249 154 L 225 154 C 221 130, 224 108, 237 92 z" />
    <path className="ink" d="M237 92 C 250 108, 253 130, 249 154 L 225 154 C 221 130, 224 108, 237 92 z" />
    <path className="ink-thin" d="M237 96 v58 M231 100 q4 26 2 54 M243 100 q-4 26 -2 54" />

    {/* and the single bit of information it carries */}
    <circle className="wash" cx="226" cy="44" r="22" />
    <g className="stroke-accent" strokeWidth="2.2">
      <path d="M226 16 v-9" opacity="0.85" />
      <path d="M248 25 l7 -6" opacity="0.6" />
      <path d="M204 25 l-7 -6" opacity="0.6" />
    </g>

    <text className="label" x="172" y="220">
      no interface
    </text>
  </>
);

export const sketches: Record<string, Sketch> = {
  chat: Chat,
  board: Board,
  "what-if": WhatIf,
  counter: Counter,
  margin: Margin,
  "laid-out": LaidOut,
  rule: Rule,
  umbrella: Umbrella,
};
