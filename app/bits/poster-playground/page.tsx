import type { Metadata } from "next";
import { BitFrame } from "@/components/bits/BitFrame";
import { PosterPlayground } from "@/components/bits/PosterPlayground";
import { bits } from "@/content/bits";

const bit = bits.find((b) => b.slug === "poster-playground")!;

export const metadata: Metadata = { title: `${bit.title} · AI is a spectrum` };

export default function Page() {
  return (
    <BitFrame bit={bit} lede="No task, no right answer. Change things however you like, and see how you actually do it." wide>
      <PosterPlayground />
    </BitFrame>
  );
}
