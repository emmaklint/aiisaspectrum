import type { Metadata } from "next";
import { BitFrame } from "@/components/bits/BitFrame";
import { NoticeBit } from "@/components/bits/NoticeBit";
import { bits } from "@/content/bits";

const bit = bits.find((b) => b.slug === "the-task-you-keep-moving")!;

export const metadata: Metadata = { title: `${bit.title} · AI is a spectrum` };

export default function Page() {
  return (
    <BitFrame
      bit={bit}
      lede="Try it with an assistant that does what you say. Then with a planner that notices."
      wide
    >
      <NoticeBit />
    </BitFrame>
  );
}
