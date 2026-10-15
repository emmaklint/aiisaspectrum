import { sketches } from "./illustrations/sketches";

/**
 * Stage for the concept drawings. The accent colour is set here, once, and
 * the drawing picks it up through currentColor.
 */
export function Illustration({
  conceptId,
  accent,
  label,
  className = "",
}: {
  conceptId: string;
  accent: string;
  label: string;
  className?: string;
}) {
  const Sketch = sketches[conceptId];
  if (!Sketch) return null;

  // An empty label means the drawing is decoration beside text that already
  // says the same thing, so it's hidden rather than given an empty name.
  const described = label.length > 0;

  return (
    <svg
      className={`sketch ${className}`}
      viewBox="0 0 360 230"
      role={described ? "img" : undefined}
      aria-label={described ? label : undefined}
      aria-hidden={described ? undefined : true}
      focusable="false"
      style={{ color: accent }}
    >
      <Sketch />
    </svg>
  );
}
