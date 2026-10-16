import { redirect } from "next/navigation";

/** About now lives in the shared footer on every page. */
export default function AboutPage() {
  redirect("/#about");
}
