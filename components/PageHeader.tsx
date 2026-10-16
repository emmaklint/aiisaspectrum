/** The plain header used on every page except the home page. */
export function PageHeader({
  eyebrow,
  title,
  children,
}: {
  eyebrow?: string;
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <header className="mx-auto max-w-5xl px-6 pt-14 sm:px-8 sm:pt-20">
      {eyebrow && <p className="tag">{eyebrow}</p>}
      <h1 className="mt-2 text-[2.6rem] leading-[0.95] text-balance sm:text-[4rem]">{title}</h1>
      {children && (
        <div className="mt-5 max-w-[52ch] text-[1.05rem] leading-relaxed text-ink-muted">{children}</div>
      )}
    </header>
  );
}
