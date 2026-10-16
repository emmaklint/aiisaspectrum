"use client";

/** Small pieces shared by the bits, so they look and behave alike. */

export function ModeToggle<T extends string>({
  label,
  modes,
  value,
  onChange,
}: {
  label: string;
  modes: { id: T; label: string }[];
  value: T;
  onChange: (id: T) => void;
}) {
  return (
    <div role="group" aria-label={label} className="grid grid-cols-2 gap-1.5 rounded-full border-[1.5px] border-ink bg-paper p-1.5">
      {modes.map((m) => (
        <button
          key={m.id}
          type="button"
          aria-pressed={value === m.id}
          onClick={() => onChange(m.id)}
          className={`rounded-full px-3 py-2.5 text-[0.92rem] font-medium transition-colors ${value === m.id ? "bg-ink text-blush" : "text-ink-muted hover:text-ink"}`}
        >
          {m.label}
        </button>
      ))}
    </div>
  );
}

export function Chip({
  children,
  onClick,
  active = false,
  disabled = false,
}: {
  children: React.ReactNode;
  onClick: () => void;
  active?: boolean;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-pressed={active}
      className={`rounded-full border-[1.5px] border-ink px-3 py-1 text-left text-[0.85rem] font-medium transition-colors disabled:opacity-40 ${active ? "bg-ink text-blush" : "bg-paper hover:bg-wall"}`}
    >
      {children}
    </button>
  );
}

export function QuietButton({ children, onClick }: { children: React.ReactNode; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-full border-[1.5px] border-ink/30 px-4 py-2 text-[0.9rem] text-ink-muted hover:border-ink hover:text-ink"
    >
      {children}
    </button>
  );
}

export function Bubble({ from, children }: { from: "ai" | "me"; children: React.ReactNode }) {
  return (
    <div
      className={`max-w-[88%] whitespace-pre-line rounded-2xl px-3.5 py-2 text-[0.92rem] leading-snug ${
        from === "ai" ? "self-start rounded-bl-sm bg-blush" : "self-end rounded-br-sm bg-ink text-blush"
      }`}
    >
      {children}
    </div>
  );
}

export function ChatInput({
  id,
  value,
  onChange,
  onSend,
  placeholder,
}: {
  id: string;
  value: string;
  onChange: (v: string) => void;
  onSend: () => void;
  placeholder: string;
}) {
  return (
    <form
      className="flex gap-2"
      autoComplete="off"
      onSubmit={(e) => {
        e.preventDefault();
        onSend();
      }}
    >
      <input
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label="Message to the AI"
        className="min-w-0 flex-1 rounded-full border-[1.5px] border-ink/30 bg-blush px-4 py-2 text-[1rem] focus:border-ink"
      />
      <button type="submit" className="rounded-full bg-crayon px-4 py-2 font-medium">
        Send
      </button>
    </form>
  );
}
