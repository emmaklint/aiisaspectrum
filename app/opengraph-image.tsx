import { ogAlt, ogImage, ogSize } from "@/lib/og";
import { site } from "@/content/site";

const props = { title: site.title, subtitle: "Experiments, products and ideas for working with AI beyond the chat box." };

export const alt = ogAlt;
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return ogImage(props);
}
