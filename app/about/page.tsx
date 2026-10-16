import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { about } from "@/content/copy";
import { site } from "@/content/site";

export const metadata: Metadata = { title: "About · AI is a spectrum" };

export default function AboutPage() {
  return (
    <main id="main">
      <PageHeader title={about.heading} />
      <section className="mx-auto max-w-5xl px-6 py-12 sm:px-8 sm:py-16">
        <div className="max-w-[60ch] space-y-4 text-[1.05rem] leading-relaxed">
          {about.body.map((p) => (
            <p key={p}>{p}</p>
          ))}
          <p>
            <a href={site.essayUrl} className="font-medium underline decoration-crayon decoration-2 underline-offset-4">
              {site.essayLabel} →
            </a>
          </p>
        </div>

        <h2 className="mt-14 border-t-2 border-ink pt-4 text-[1.8rem] leading-tight">{about.methodHeading}</h2>
        <div className="mt-5 max-w-[60ch] space-y-4 text-[1.02rem] leading-relaxed text-ink-muted">
          {about.method.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>

        <h3 className="tag mt-10">References</h3>
        <ul className="mt-3 max-w-[70ch] space-y-2 text-[0.88rem] leading-relaxed text-ink-quiet">
          {about.references.map((r) => (
            <li key={r}>{r}</li>
          ))}
        </ul>
      </section>
    </main>
  );
}
