import {
  defaultSelection,
  dimensions,
  type Selection,
} from "@/content/dimensions";

/**
 * The visitor's answers live in the URL and nowhere else — no storage, no
 * cookies, nothing to clear. Sharing a link shares the exploration.
 */

export function selectionToParams(selection: Selection): string {
  const params = new URLSearchParams();
  for (const d of dimensions) params.set(d.id, selection[d.id]);
  return params.toString();
}

export function selectionFromSearch(search: string): Selection {
  const params = new URLSearchParams(search);
  const next = { ...defaultSelection };
  for (const d of dimensions) {
    const value = params.get(d.id);
    if (value && d.options.some((o) => o.id === value)) {
      next[d.id] = value;
    }
  }
  return next;
}

export function shareUrl(selection: Selection): string {
  const base =
    typeof window === "undefined"
      ? "https://aiisaspectrum.com/"
      : window.location.origin + window.location.pathname;
  return `${base}?${selectionToParams(selection)}`;
}
