import type { Metadata } from "next";
import { BitFrame } from "@/components/bits/BitFrame";
import { StepInBit } from "@/components/bits/StepInBit";
import { bits } from "@/content/bits";
import { pageMetadata } from "@/lib/og";

const bit = bits.find((b) => b.slug === "step-in-halfway")!;

export const metadata: Metadata = pageMetadata(bit.title, bit.task, "/bits/step-in-halfway");

export default function Page() {
  return (
    <BitFrame bit={bit} lede="Hand over a task. Once you only see the result, once you see it work and can step in." wide>
      <StepInBit />
    </BitFrame>
  );
}
