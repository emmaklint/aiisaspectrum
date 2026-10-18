import { ogAlt, ogImage, ogSize } from "@/lib/og";
import { bitsPage } from "@/content/copy";

const props = { kicker: "AI is a spectrum", title: bitsPage.heading, subtitle: bitsPage.intro };

export const alt = ogAlt;
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return ogImage(props);
}
