import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import Icon from "@/components/ui/Icon";
import { technologyGroups } from "@/data/technology";

export default function TechStack() {
  return (
    <section className="bg-navy-950 py-20">
      <Container>
        <SectionHeading
          dark
          eyebrow="Technology"
          title="Technology That Powers Your Product"
          description="Modern, well-supported technology chosen for reliability — not novelty."
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {technologyGroups.map((group, index) => (
            <Reveal key={group.title} delay={Math.min(index * 0.05, 0.25)}>
              <div className="h-full rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-300">
                  {group.title}
                </h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item.name}
                      className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-white/80"
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
