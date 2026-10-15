/** Numbered section rule — the notebook detail that ties the page together. */
export function SectionHeading({
  number,
  children,
}: {
  number: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-baseline gap-4 border-t-2 border-ink pt-4">
      <span className="tag shrink-0 pt-1">{number}</span>
      <h2 className="text-[1.8rem] leading-[1.05] sm:text-[2.6rem]">
        {children}
      </h2>
    </div>
  );
}
