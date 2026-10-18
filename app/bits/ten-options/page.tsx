import type { Metadata } from "next";
import { BitFrame } from "@/components/bits/BitFrame";
import { TenOptionsBit } from "@/components/bits/TenOptionsBit";
import { bits } from "@/content/bits";
import { pageMetadata } from "@/lib/og";

const bit = bits.find((b) => b.slug === "ten-options")!;

export const metadata: Metadata = pageMetadata(bit.title, bit.task, "/bits/ten-options");

export default function Page() {
  return (
    <BitFrame bit={bit} lede="Get headline ideas one at a time, then as a spread you can steer." wide>
      <TenOptionsBit />
    </BitFrame>
  );
}
