import { demo } from "@/content/copy";

/** The familiar one: you type the question, you read the answer. */
export function Ask() {
  return (
    <div className="mx-auto w-full max-w-md">
      <div className="rounded-xl border-[1.5px] border-ink bg-paper">
        <div className="space-y-3 p-4 sm:p-5">
          <p className="ml-auto w-fit max-w-[80%] rounded-2xl rounded-br-sm bg-ink px-3.5 py-2 text-[0.9rem] text-blush">
            {demo.question}
          </p>
          <div className="w-fit max-w-[88%] rounded-2xl rounded-bl-sm border border-rule bg-blush px-3.5 py-2.5 text-[0.9rem] leading-relaxed">
            <p>
              It&apos;s 9°C this morning with rain expected after 14:00. I&apos;d
              go with a warm layer and a waterproof jacket — and wellies if
              they&apos;ll be outside at pickup.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 border-t border-rule px-4 py-3">
          <span className="flex-1 text-[0.85rem] text-ink-faint">
            Ask a follow-up…
          </span>
          <span
            aria-hidden="true"
            className="grid h-7 w-7 place-items-center rounded-full bg-ink text-[0.8rem] text-blush"
          >
            ↑
          </span>
        </div>
      </div>
      <p className="mt-3 text-center text-[0.8rem] text-ink-quiet">
        Everything happens in the thread. You read it, then you go and do it.
      </p>
    </div>
  );
}
