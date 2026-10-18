import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import type { Metadata } from "next";
import { site } from "@/content/site";
import { bits } from "@/content/bits";
import { capabilities, type Capability } from "@/content/capabilities";

/**
 * Social preview images (Open Graph), drawn from the design system: off-white
 * ground, the spectrum band, Bricolage Grotesque in off-black. Every page gets
 * one through an opengraph-image.tsx next to it, which calls ogImage().
 */
export const ogSize = { width: 1200, height: 630 };
export const ogAlt = "AI is a spectrum";

const ink = "#1f1a17";
const muted = "#5c524d";
const ground = "#fff8f3";
const spectrum = "linear-gradient(90deg, #f4a7bb 0%, #f6ae9e 25%, #f9be8c 50%, #f39a5b 75%, #d2652a 100%)";
const stop: Record<Capability, string> = {
  interpret: "#f4a7bb",
  generate: "#f6ae9e",
  transform: "#f9be8c",
  notice: "#f39a5b",
  act: "#d2652a",
};

const font = (file: string) => readFile(join(process.cwd(), "assets/fonts", file));

export async function ogImage({
  kicker,
  title,
  subtitle,
  capability,
}: {
  kicker?: string;
  title: string;
  subtitle?: string;
  capability?: Capability;
}) {
  const [display, displayMedium, mono] = await Promise.all([
    font("bricolage-grotesque-latin-800-normal.woff"),
    font("bricolage-grotesque-latin-500-normal.woff"),
    font("azeret-mono-latin-500-normal.woff"),
  ]);
  const long = title.length > 22;

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", background: ground, color: ink }}>
        <div style={{ display: "flex", height: 28, background: spectrum }} />
        <div style={{ display: "flex", flexDirection: "column", flex: 1, padding: "64px 80px 56px", justifyContent: "space-between" }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {kicker && (
              <div style={{ display: "flex", alignItems: "center", gap: 18, fontFamily: "Azeret Mono", fontSize: 26, color: ink }}>
                {capability && (
                  <div style={{ display: "flex", padding: "6px 14px", borderRadius: 6, background: stop[capability] }}>
                    {capabilities[capability].label}
                  </div>
                )}
                {!capability && <div style={{ display: "flex" }}>{kicker}</div>}
              </div>
            )}
            <div
              style={{
                display: "flex",
                marginTop: kicker ? 28 : 0,
                fontFamily: "Bricolage",
                fontWeight: 800,
                fontSize: long ? 92 : 124,
                lineHeight: 0.95,
                letterSpacing: "-0.02em",
                maxWidth: 1000,
              }}
            >
              {title}
            </div>
            {subtitle && (
              <div style={{ display: "flex", marginTop: 30, fontFamily: "Bricolage", fontWeight: 500, fontSize: 38, lineHeight: 1.25, color: muted, maxWidth: 940 }}>
                {subtitle}
              </div>
            )}
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "Azeret Mono", fontSize: 24, color: muted }}>
            <div style={{ display: "flex" }}>aiisaspectrum.com</div>
            <div style={{ display: "flex" }}>{site.author.name}</div>
          </div>
        </div>
      </div>
    ),
    {
      ...ogSize,
      fonts: [
        { name: "Bricolage", data: display, weight: 800, style: "normal" },
        { name: "Bricolage", data: displayMedium, weight: 500, style: "normal" },
        { name: "Azeret Mono", data: mono, weight: 500, style: "normal" },
      ],
    },
  );
}

/** The preview image for a bit, by slug. */
export function bitOgImage(slug: string) {
  const bit = bits.find((b) => b.slug === slug)!;
  return ogImage({ kicker: capabilities[bit.capability].label, capability: bit.capability, title: bit.title, subtitle: bit.task });
}

/**
 * Title and description for a page, repeated into Open Graph. Next replaces
 * (doesn't merge) openGraph from the layout, so every page sets its own.
 */
export function pageMetadata(title: string, description: string, path: string): Metadata {
  const full = `${title} · ${site.title}`;
  return {
    title: full,
    description,
    alternates: { canonical: path },
    openGraph: { type: "website", siteName: site.title, url: path, title: full, description },
    twitter: { card: "summary_large_image", title: full, description },
  };
}
