# AI Is a Spectrum

A small, shareable thought experiment about the many shapes a human–machine
interaction can take, built around one ordinary morning: working out what the
kids should wear.

Next.js (App Router), React, TypeScript, Tailwind. No backend, no database, no
API calls, no analytics. The visitor's answers live in the URL and nowhere
else, so a link is the whole share mechanism.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build
npm run lint    # tsc --noEmit
```

## Editing the content

Everything writable is in `content/`, separate from the components:

| File | What's in it |
| --- | --- |
| `content/copy.ts` | All the prose — hero, scenario, section headings, closing, essay link. |
| `content/dimensions.ts` | The four questions and their answers. Option `id`s appear in share URLs, so renaming one breaks old links. |
| `content/concepts.ts` | The eight sketches: traits, what the person experiences, what the machine does, and the honest caveat. |

Adding a sketch means adding an entry to `content/concepts.ts`, drawing it in
`components/illustrations/sketches.tsx` on the same 360×230 stage, and
registering it in the `sketches` map at the bottom of that file.

## How the matching works

`lib/match.ts` scores every sketch against the four answers and shows the
nearest. Option order counts — a neighbouring answer is a near miss, the two
ends are a full one — and *presence* ("where should it live") is weighted
heavily enough to act as a filter, so asking for something in the room always
returns something in the room. When the nearest sketch doesn't honour every
answer, the panel says which ones it misses rather than quietly rounding.

Every one of the 36 combinations resolves to a sketch, and each of the eight is
an exact match for exactly one combination.

## Design

Type and colour come from [emmaklint.com](https://emmaklint.com): Bricolage
Grotesque for display, Azeret Mono for the small labels, system sans for
reading, and the crayon palette — blush ground, olive, moss, wall pink and
crayon orange. The tokens are declared once in `app/globals.css` under
`@theme`.

## Notes

- The holding page this replaced is kept at `public/coming-soon.html`.
- `public/og.svg` is the source for `public/og.png`; regeneration steps are in
  a comment at the top of the SVG.
