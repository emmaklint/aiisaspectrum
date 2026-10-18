import type { Metadata } from "next";
import { BitFrame } from "@/components/bits/BitFrame";
import { PointBit } from "@/components/bits/PointBit";
import { bits } from "@/content/bits";
import { pageMetadata } from "@/lib/og";

const bit = bits.find((b) => b.slug === "point-dont-describe")!;

export const metadata: Metadata = pageMetadata(bit.title, bit.task, "/bits/point-dont-describe");

export default function Page() {
  return (
    <BitFrame bit={bit} lede="Fix one sentence twice. Once by describing it, once by pointing at it.">
      <PointBit />
    </BitFrame>
  );
}
