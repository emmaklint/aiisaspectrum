# Curating examples

How new entries get into `content/examples.ts`. A weekly scheduled task reads
this file, looks for candidates, and opens a pull request. Nothing reaches the
site until Emma merges it. Edit this file to change what the task looks for.

## What belongs

An example shows a way to work with AI that is **not typing into a chat box**.
The interaction is the point, not the product.

Every entry must pass all of these:

1. **Not chat.** Taking chat away would break the idea. A chat window with
   extra buttons, a voice assistant that is spoken chat, or an agent you
   instruct in a text box does not count.
2. **Real and checkable.** Either a shipped product with an official page, or
   research with a paper. No concept videos, social media demos or waitlists.
3. **Adds something.** It is not the same idea as an entry already on the
   list. Prefer candidates for ways that have few examples so far.
4. **Explainable in one sentence** by someone who has never seen it.

## Sources

- **Research:** peer-reviewed HCI venues first (CHI, UIST, CSCW, DIS, IUI,
  TOCHI and similar). Link the DOI as `https://doi.org/...`.
- **Preprints** (arXiv and similar) are allowed only when clearly strong, and
  must be flagged as preprints in the pull request.
- **Products:** link the maker's own feature page, help article or docs. Not
  news coverage, reviews or blog posts about it.
- Open the link and check the interaction is actually described there.

## Writing the entry

Match the existing entries.

- `name`: the product or project name.
- `gist`: a few words on what you do with it. Starts with a verb where it can.
- `idea`: one sentence on the interaction idea, not on the product or company.
- `kind`: `Product`, `Research` or `Idea`.
- `ways`: one or two keys from `content/ways.ts`. Don't invent new keys. If
  nothing fits, say so in the pull request and suggest a new way there.
- Plain, concrete words. No hype ("revolutionary", "seamless", "powerful").
  Never use em dashes.

## Each run

- Add at most three entries. Zero is a fine result.
- Skip anything already in `content/examples.ts`, and anything proposed in an
  earlier pull request with the `example-candidates` label, merged or closed.
  A closed pull request means no.
- In the pull request, give each entry a short note: why it passes the four
  checks, the source type, and any doubt. List near misses in one line each
  so they are not proposed again.
