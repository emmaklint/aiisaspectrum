import type { Metadata } from "next";
import { BitFrame } from "@/components/bits/BitFrame";
import { ThinkOutLoudBit } from "@/components/bits/ThinkOutLoudBit";
import { bits } from "@/content/bits";
import { pageMetadata } from "@/lib/og";

const bit = bits.find((b) => b.slug === "think-out-loud")!;

export const metadata: Metadata = pageMetadata(bit.title, bit.task, "/bits/think-out-loud");

export default function Page() {
  return (
    <BitFrame bit={bit} lede="Ramble, and see what the AI makes of it. Once as a chat reply, once laid out where you can move things." wide>
      <ThinkOutLoudBit />
    </BitFrame>
  );
}
