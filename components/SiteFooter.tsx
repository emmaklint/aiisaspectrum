import { about } from "@/content/copy";
import { contactHref, site } from "@/content/site";

/** The shared footer, which is also the About section (#about). */
export function SiteFooter() {
  const link = "text-link underline decoration-2 underline-offset-4";
  return (
    <footer id="about" className="mt-8 bg-wall/60 scroll-mt-4">
      <div className="mx-auto grid max-w-5xl gap-10 px-6 py-14 sm:px-8 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
        <section className="space-y-4">
          <h2 className="text-[1.6rem] leading-none">About</h2>
          {about.body.map((p) => (
            <p key={p} className="max-w-[52ch] text-[0.98rem] leading-relaxed">{p}</p>
          ))}
          <p className="max-w-[52ch] text-[0.98rem] leading-relaxed text-ink-muted">{about.who}</p>
          <div className="rounded-lg border-[1.5px] border-ink/20 bg-surface/70 px-5 py-4">
            <h3 className="text-[1.15rem] leading-tight">Questions or ideas?</h3>
            <p className="mt-1.5 max-w-[48ch] text-[0.95rem] leading-relaxed">
              Ask me anything, suggest an improvement, or tell me about an example I'm missing.{" "}
              <a href={contactHref()} className={link}>{site.author.email}</a>
            </p>
          </div>
          <p className="flex flex-wrap gap-x-5 gap-y-2 text-[0.95rem] font-medium">
            <a href={site.essayUrl} className={link}>{site.essayLabel}</a>
            <a href={about.newsletterUrl} className={link}>The newsletter</a>
            <a href={site.author.url} className={link}>emmaklint.com</a>
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-[1.6rem] leading-none">{about.methodHeading}</h2>
          {about.method.map((p) => (
            <p key={p} className="text-[0.95rem] leading-relaxed text-ink-muted">{p}</p>
          ))}
          <ul className="space-y-1.5 pt-1 text-[0.8rem] leading-relaxed text-ink-quiet">
            {about.references.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>
        </section>
      </div>
    </footer>
  );
}
