"use client";

import type { Concept } from "@/content/concepts";
import { explore } from "@/content/copy";
import {
  optionLabel,
  type DimensionId,
  type Selection,
} from "@/content/dimensions";
import { Illustration } from "./Illustration";

/**
 * The sketch that sits closest to the answers given, plus — when it isn't an
 * exact match — a plain statement of where it differs. Saying "nothing drawn
 * here does that yet" is more honest than quietly rounding.
 */
export function ConceptPanel({
  concept,
  exact,
  divergences,
  selection,
}: {
  concept: Concept;
  exact: boolean;
  divergences: DimensionId[];
  selection: Selection;
}) {
  return (
    <article
      key={concept.id}
      className="card sketch-enter overflow-hidden"
      aria-labelledby="concept-name"
    >
      <div className="grid gap-0 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
        <div
          className="flex items-center justify-center border-b border-rule p-4 sm:p-6 lg:border-b-0 lg:border-r"
          style={{ background: `${concept.accent}1c` }}
        >
          <Illustration
            conceptId={concept.id}
            accent={concept.accent}
            label={`${concept.name}: ${concept.tagline}`}
            className="mx-auto max-w-[27rem]"
          />
        </div>

        <div className="p-5 sm:p-8">
          <p className="tag">
            {exact ? explore.exactLabel : explore.nearLabel}
          </p>

          <h3
            id="concept-name"
            className="mt-2 font-display text-[1.7rem] leading-tight sm:text-[2.1rem]"
          >
            {concept.name}
          </h3>
          <p className="mt-1.5 text-[1.02rem] leading-snug text-ink-muted">
            {concept.tagline}
          </p>

          {!exact && divergences.length > 0 && (
            <p className="mt-4 text-[0.8rem] leading-relaxed text-ink-quiet">
              Nothing drawn here is{" "}
              {divergences.map((id, i) => (
                <span key={id}>
                  {i > 0 && (i === divergences.length - 1 ? " and " : ", ")}
                  <span className="text-ink-muted">
                    &ldquo;{optionLabel(id, selection[id]).toLowerCase()}&rdquo;
                  </span>
                </span>
              ))}
              . This is the nearest.
            </p>
          )}

          <dl className="mt-5 space-y-4">
            <div>
              <dt className="tag">
                {explore.experienceLabel}
              </dt>
              <dd className="mt-1.5 leading-relaxed text-ink">
                {concept.experience}
              </dd>
            </div>
            <div>
              <dt className="tag">
                {explore.machineryLabel}
              </dt>
              <dd className="mt-1.5 leading-relaxed text-ink-muted">
                {concept.machinery}
              </dd>
            </div>
          </dl>

          <p className="mt-5 border-t border-rule pt-4 text-[0.85rem] leading-relaxed text-ink-quiet">
            <span className="tag">
              {explore.noteLabel}:
            </span>{" "}
            {concept.honestNote}
          </p>
        </div>
      </div>
    </article>
  );
}
