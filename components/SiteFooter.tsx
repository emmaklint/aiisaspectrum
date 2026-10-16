import { site } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="mx-auto max-w-5xl px-6 pb-16 sm:px-8">
      <p className="border-t border-rule pt-5 text-[0.88rem] leading-relaxed text-ink-quiet">
        Made by{" "}
        <a
          href={site.author.url}
          className="text-ink underline decoration-crayon decoration-2 underline-offset-4"
        >
          {site.author.name}
        </a>
        . {site.author.role}
      </p>
    </footer>
  );
}
