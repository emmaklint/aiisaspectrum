import type { Metadata } from "next";
import { BitFrame } from "@/components/bits/BitFrame";
import { TenOptionsBit } from "@/components/bits/TenOptionsBit";
import { bits } from "@/content/bits";

const bit = bits.find((b) => b.slug === "ten-options")!;

export const metadata: Metadata = { title: `${bit.title} · AI is a spectrum` };

export default function Page() {
  return (
    <BitFrame bit={bit} lede="Get headline ideas one at a time, then as a spread you can steer." wide>
      <TenOptionsBit />
    </BitFrame>
  );
}
