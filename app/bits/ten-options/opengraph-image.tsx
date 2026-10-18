import { bitOgImage, ogAlt, ogSize } from "@/lib/og";

export const alt = ogAlt;
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return bitOgImage("ten-options");
}
