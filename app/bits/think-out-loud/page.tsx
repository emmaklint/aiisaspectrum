import type { Metadata } from "next";
import { BitFrame } from "@/components/bits/BitFrame";
import { ThinkOutLoudBit } from "@/components/bits/ThinkOutLoudBit";
import { bits } from "@/content/bits";

const bit = bits.find((b) => b.slug === "think-out-loud")!;

export const metadata: Metadata = { title: `${bit.title} · AI is a spectrum` };

export default function Page() {
  return (
    <BitFrame bit={bit} lede="Ramble, and see what the AI makes of it. Once as a chat reply, once laid out where you can move things." wide>
      <ThinkOutLoudBit />
    </BitFrame>
  );
}
