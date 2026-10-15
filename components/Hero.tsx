import { hero, scenario, site } from "@/content/copy";

/**
 * The first screen. One question, and a small visual joke: the chat bubble
 * everybody pictures, sitting among the other shapes it could have been.
 */
export function Hero() {
  return (
    <header>
      <div className="bg-olive">
      <div className="mx-auto max-w-6xl px-6 py-16 sm:px-8 sm:py-20">
      <p className="tag tag-dark">
        {site.title} · {hero.kicker}
      </p>

      <h1 className="mt-5 max-w-[19ch] text-[2.4rem] leading-[1.0] sm:text-[3.5rem] lg:text-[4.2rem]">
        {hero.question}
      </h1>

      <div className="mt-8 grid gap-8 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end">
        <div className="max-w-[40ch] space-y-3 text-[1.05rem] leading-relaxed text-ink-muted sm:text-[1.15rem]">
          {hero.body.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>

        <ShapeRow />
      </div>

      </div>
      </div>

      {/* the scenario everything else hangs off */}
      <div className="mx-auto max-w-6xl px-6 pt-14 sm:px-8">
        <p className="tag">
          {hero.cue}
        </p>
        <p className="mt-4 font-display text-[1.55rem] font-semibold leading-snug sm:text-[2.1rem]">
          It&apos;s <span className="text-moss">{scenario.time}</span>.{" "}
          <span className="text-ink-muted">{scenario.line}</span>
        </p>
        <p className="mt-3 max-w-[48ch] leading-relaxed text-ink-quiet">
          {scenario.body}
        </p>
      </div>
    </header>
  );
}

/** The familiar shape, and four it isn't. */
function ShapeRow() {
  return (
    <svg
      viewBox="0 0 320 110"
      className="sketch w-full max-w-[20rem] sm:w-[20rem]"
      role="img"
      aria-label="A chat bubble beside four other shapes: a speaker, a panel, a card and a glowing handle."
      focusable="false"
    >
      {/* the one everyone pictures */}
      <g className="drift">
        <path
          className="ink"
          d="M12 22 h74 a10 10 0 0 1 10 10 v34 a10 10 0 0 1 -10 10 h-50 l-14 13 v-13 h-10 a10 10 0 0 1 -10 -10 v-34 a10 10 0 0 1 10 -10 z"
          fill="#fbf7ef"
        />
        <line className="ink-thin" x1="24" y1="42" x2="84" y2="42" />
        <line className="ink-thin" x1="24" y1="56" x2="70" y2="56" />
      </g>

      <text className="label" x="118" y="56" style={{ fontSize: 15 }}>
        or
      </text>

      {/* the others, lighter, waiting */}
      <g opacity="0.72">
        <rect className="ink-thin" x="150" y="36" width="30" height="40" rx="7" />
        <line className="ink-thin" x1="157" y1="50" x2="173" y2="50" />
        <line className="ink-thin" x1="157" y1="60" x2="173" y2="60" />

        <rect className="ink-thin" x="192" y="30" width="48" height="52" rx="5" />
        <path className="ink-thin" d="M200 62 C 212 50, 220 66, 232 52" />

        <path className="ink-thin" d="M252 34 h32 v48 h-32 z" />
        <path className="ink-thin" d="M259 50 l4 4 7 -8" />
        <line className="ink-thin" x1="259" y1="64" x2="277" y2="64" />

        <path className="ink-thin" d="M306 82 v-30 a7 7 0 0 0 -14 0" />
        <circle cx="299" cy="48" r="13" fill="#C9A227" opacity="0.22" />
      </g>
    </svg>
  );
}
