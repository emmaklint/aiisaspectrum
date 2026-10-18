import { ogAlt, ogImage, ogSize } from "@/lib/og";
import { examplesPage } from "@/content/copy";

const props = { kicker: "AI is a spectrum", title: examplesPage.heading, subtitle: examplesPage.intro };

export const alt = ogAlt;
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return ogImage(props);
}
