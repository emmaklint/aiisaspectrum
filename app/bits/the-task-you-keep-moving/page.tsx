import type { Metadata } from "next";
import { BitFrame } from "@/components/bits/BitFrame";
import { NoticeBit } from "@/components/bits/NoticeBit";
import { bits } from "@/content/bits";
import { pageMetadata } from "@/lib/og";

const bit = bits.find((b) => b.slug === "the-task-you-keep-moving")!;

export const metadata: Metadata = pageMetadata(bit.title, bit.task, "/bits/the-task-you-keep-moving");

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
