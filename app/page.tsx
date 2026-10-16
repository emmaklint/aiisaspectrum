import { Closing } from "@/components/Closing";
import { Doors } from "@/components/Doors";
import { Hero } from "@/components/Hero";
import { SectionHeading } from "@/components/SectionHeading";
import { SpectrumDemo } from "@/components/SpectrumDemo";
import { demo } from "@/content/copy";

export default function Page() {
  return (
    <>
      <Hero />
      <main id="main">
        <section
          id="spectrum"
          className="mx-auto max-w-5xl scroll-mt-4 px-6 py-20 sm:px-8 sm:py-24"
        >
          <SectionHeading number={demo.number}>{demo.heading}</SectionHeading>
          <p className="mt-6 max-w-[48ch] text-[1.02rem] leading-relaxed text-ink-muted">
            {demo.intro}
          </p>
          <div className="mt-10">
            <SpectrumDemo />
          </div>
        </section>

        <Doors />
        <Closing />
      </main>
    </>
  );
}
