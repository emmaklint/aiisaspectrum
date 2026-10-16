# AI is a spectrum

A companion site to the essay: chat is one way to interact with AI, not the
only one. Version 0.1 — a landing section, one interactive example, four
real projects, and a note that it will grow.

Next.js (App Router), React, TypeScript, Tailwind. No backend, database, CMS,
auth, analytics or AI API calls. All data is static objects in `content/`.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build
npm run lint    # tsc --noEmit
```

## Editing

| File | What's in it |
| --- | --- |
| `content/site.ts` | Title, description, author — and `essayUrl`, which every "Read the essay" link uses. Replace it in one place when the essay is live. |
| `content/copy.ts` | All section prose, including the loose list of interaction modes. |
| `content/capabilities.ts` | What AI can do, as a material: interpret, generate, transform, notice, act. Every bit exposes one. |
| `content/ways.ts` | Ways of interacting. They tag the examples and tie each bit to them. |
| `content/bits.ts` | The bits, live and on the way, plus the method note shown under each bit. |
| `content/examples.ts` | The collection. Add an entry, tag it with `ways`, and a card appears. |

## Pages

- `/` home: the title, one line on what the site believes, and two doors, Bits and In the wild.
- `/bits` and `/bits/<slug>`: one page per live bit, framed by `components/bits/BitFrame.tsx`, which also lists the examples that share the bit's way of interacting.
- `/examples` ("In the wild"): the collection, filterable by way (`/examples?way=point`).
- About lives in the shared footer (`#about`) on every page; `/about` redirects there.

Adding a bit: an entry in `content/bits.ts` with `live: true`, a component in `components/bits/`, and a page at `app/bits/<slug>/page.tsx`.

Adding an example is one object in `content/examples.ts` — the card pulls its
own link hostname, so there's nothing else to fill in.


## Structure

- `components/bits/` — the bits and the frame around them.

## Design

Type and colour come from [emmaklint.com](https://emmaklint.com): Bricolage
Grotesque for display, Azeret Mono for small labels, system sans for reading,
and the crayon palette — blush ground, olive, wall pink and crayon orange.
Tokens are declared once in `app/globals.css` under `@theme`.

Reduced motion is respected globally.

## Notes

- The earlier holding page is kept at `public/coming-soon.html`.
- `vercel.json` declares the framework. The Vercel project was imported when
  this repo was a single static `index.html`, and without that declaration it
  publishes `public/` as the site root and `/` returns 404.
- `public/og.svg` is the source for `public/og.png`; both still carry the
  holding page's artwork and need redoing.
