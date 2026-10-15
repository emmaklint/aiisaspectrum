"use client";

import { useEffect, useState } from "react";
import type { Selection } from "@/content/dimensions";
import { shareUrl } from "@/lib/url";

/** Copies the current exploration as a link. No storage, just the URL. */
export function ShareButton({ selection }: { selection: Selection }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), 2400);
    return () => window.clearTimeout(timer);
  }, [copied]);

  async function copy() {
    const url = shareUrl(selection);
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
    } catch {
      // Clipboard blocked (http, or permission denied) — put the link where
      // it can at least be copied by hand.
      window.prompt("Copy this link", url);
    }
  }

  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        onClick={copy}
        className="rounded-full border-[1.5px] border-crayon bg-crayon px-4 py-2 text-sm font-medium text-ink transition-opacity hover:opacity-85"
      >
        Copy a link to this morning
      </button>
      <span
        aria-live="polite"
        className="text-sm text-ink-quiet"
      >
        {copied ? "Copied." : ""}
      </span>
    </div>
  );
}
