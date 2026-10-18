import type { Metadata } from "next";
import { BitFrame } from "@/components/bits/BitFrame";
import { PosterPlayground } from "@/components/bits/PosterPlayground";
import { bits } from "@/content/bits";
import { pageMetadata } from "@/lib/og";

const bit = bits.find((b) => b.slug === "poster-playground")!;

export const metadata: Metadata = pageMetadata(bit.title, bit.task, "/bits/poster-playground");

export default function Page() {
  return (
    <BitFrame bit={bit} lede="No task, no right answer. Change things however you like, and see how you actually do it." wide>
      <PosterPlayground />
    </BitFrame>
  );
}
