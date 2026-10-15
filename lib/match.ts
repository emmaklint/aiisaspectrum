import { concepts, type Concept } from "@/content/concepts";
import {
  dimensions,
  type DimensionId,
  type Selection,
} from "@/content/dimensions";

/**
 * Which sketch sits closest to a set of answers.
 *
 * Two deliberate choices here. First, option order counts: a dimension's
 * options run from one end of an idea to the other, so a neighbouring answer
 * is a near miss and the two ends are a full one.
 *
 * Second, "where should it live" outweighs everything else. It's the answer
 * that most changes what the thing physically *is*, and weighting it this
 * heavily means a visitor who asks for something in the room always gets
 * shown something in the room — rather than the chat window again, which
 * would rather undercut the point.
 */
const weights: Record<DimensionId, number> = {
  role: 1.2,
  autonomy: 0.9,
  visibility: 1,
  presence: 10,
};

function axisDistance(dimension: DimensionId, a: string, b: string): number {
  const options = dimensions.find((d) => d.id === dimension)!.options;
  const ia = options.findIndex((o) => o.id === a);
  const ib = options.findIndex((o) => o.id === b);
  if (ia < 0 || ib < 0) return 1;
  const span = options.length - 1;
  return span === 0 ? 0 : Math.abs(ia - ib) / span;
}

export function distance(selection: Selection, concept: Concept): number {
  return dimensions.reduce(
    (total, d) =>
      total +
      weights[d.id] * axisDistance(d.id, selection[d.id], concept.traits[d.id]),
    0,
  );
}

export type Match = {
  /** Nearest sketch to the answers given. */
  best: Concept;
  /** True when every one of the four answers lines up. */
  exact: boolean;
  /** Which answers the nearest sketch doesn't actually honour. */
  divergences: DimensionId[];
};

export function findMatch(selection: Selection): Match {
  const ranked = concepts
    .map((concept) => ({ concept, d: distance(selection, concept) }))
    .sort((a, b) => a.d - b.d);

  const best = ranked[0].concept;

  return {
    best,
    exact: dimensions.every((d) => best.traits[d.id] === selection[d.id]),
    divergences: dimensions
      .filter((d) => best.traits[d.id] !== selection[d.id])
      .map((d) => d.id),
  };
}
