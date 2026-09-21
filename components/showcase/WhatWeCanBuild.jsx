import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import Icon from "@/components/ui/Icon";
import { showcaseItems } from "@/data/showcase";

export default function WhatWeCanBuild() {
  return (
    <section id="solutions" className="bg-mist py-24">
      <Container>
        <SectionHeading
          eyebrow="What We Can Build"
          title="From Business Websites to Complete Digital Platforms"
          description="Concept previews illustrating the range of what we build — not client work."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {showcaseItems.map((item, index) => (
            <Reveal key={item.title} delay={Math.min(index * 0.04, 0.3)}>
              <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_-16px_rgba(11,18,32,0.15)]">
                <span className="absolute right-4 top-4 rounded-full bg-navy-900 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-gold-300">
                  Concept
                </span>
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-royal-600/10 text-royal-600">
                  <Icon name={item.icon} className="h-5 w-5" aria-hidden="true" />
                </div>
                <h3 className="mt-5 font-display text-base font-semibold text-ink">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate">{item.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
