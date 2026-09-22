import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import Icon from "@/components/ui/Icon";
import { technologyGroups } from "@/data/technology";

export default function TechStack() {
  return (
    <section className="relative overflow-hidden bg-navy-950 py-20">
      {/* Ambient depth glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 left-1/4 h-80 w-80 rounded-full bg-royal-500/10 blur-[100px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 right-1/4 h-80 w-80 rounded-full bg-gold-400/10 blur-[100px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.04),transparent_60%)]"
      />

      <Container className="relative">
        <SectionHeading
          dark
          eyebrow="Technology"
          title="Technology That Powers Your Product"
          description="Modern, well-supported technology chosen for reliability — not novelty."
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {technologyGroups.map((group, index) => (
            <Reveal key={group.title} delay={Math.min(index * 0.05, 0.25)}>
              <div className="group h-full rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.015] p-6 shadow-[0_20px_45px_-28px_rgba(0,0,0,0.85)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-gold-400/25 hover:shadow-[0_24px_50px_-24px_rgba(201,162,39,0.25)]">
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-gold-400" aria-hidden="true" />
                  <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-300">
                    {group.title}
                  </h3>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item.name}
                      className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-sm text-white/80 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] transition-colors duration-200 group-hover:border-white/15 hover:!border-gold-400/40 hover:!bg-gold-400/10 hover:!text-white"
                    >
                      <Icon name={item.icon} className="h-3.5 w-3.5 text-gold-300" aria-hidden="true" />
                      {item.name}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
