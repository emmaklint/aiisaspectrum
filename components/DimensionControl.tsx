"use client";

import type { Dimension } from "@/content/dimensions";

/**
 * One question, answered with a radio group.
 *
 * Native radios are doing the work: arrow keys move between answers, the
 * group takes one tab stop, and the label is what gets clicked. The pill is
 * a styled label over a visually hidden input.
 */
export function DimensionControl({
  dimension,
  value,
  onChange,
}: {
  dimension: Dimension;
  value: string;
  onChange: (optionId: string) => void;
}) {
  const chosen = dimension.options.find((o) => o.id === value);

  return (
    <fieldset className="border-0 p-0">
      <legend className="mb-3 flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <span className="font-display text-[1.05rem] font-semibold leading-snug text-ink sm:text-[1.12rem]">
          {dimension.question}
        </span>
        <span className="tag">
          {dimension.technicalLabel}
        </span>
      </legend>

      <div className="flex flex-wrap gap-2">
        {dimension.options.map((option) => {
          const active = option.id === value;
          return (
            <label
              key={option.id}
              className={[
                "cursor-pointer select-none rounded-full border-[1.5px] px-4 py-2 text-sm transition-colors",
                // the input itself is visually hidden, so the pill has to
                // carry the focus ring for it
                "has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-[3px] has-[:focus-visible]:outline-ink",
                active
                  ? "border-moss bg-moss font-medium text-blush"
                  : "border-ink/25 bg-paper text-ink-muted hover:border-ink hover:text-ink",
              ].join(" ")}
            >
              <input
                type="radio"
                name={dimension.id}
                value={option.id}
                checked={active}
                onChange={() => onChange(option.id)}
                className="sr-only"
              />
              {option.label}
            </label>
          );
        })}
      </div>

      {chosen && (
        <p className="mt-2.5 text-sm leading-relaxed text-ink-quiet">
          {chosen.blurb}
        </p>
      )}
    </fieldset>
  );
}
