import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { processSteps } from "@/data/process";

export default function ProcessTimeline() {
  return (
    <section id="process" className="bg-white py-24">
      <Container>
        <SectionHeading
          eyebrow="Our Process"
          title="From Idea to Launch"
          description="A clear, six-step process so you always know what happens next."
        />

        <div className="relative mt-16">
          <div
            aria-hidden="true"
            className="absolute left-4 top-0 hidden h-full w-px bg-line lg:left-1/2 lg:block"
          />
          <ol className="space-y-10 lg:space-y-16">
            {processSteps.map((step, index) => {
              const isEven = index % 2 === 1;
              return (
                <li key={step.number} className="relative lg:grid lg:grid-cols-2 lg:gap-12">
                  <Reveal
                    className={
                      isEven
                        ? "lg:col-start-2"
                        : "lg:col-start-1 lg:row-start-1 lg:text-right"
                    }
                  >
                    <div className="flex items-start gap-4 lg:block">
                      <span className="font-display text-3xl font-bold text-royal-600/20 lg:hidden">
                        {step.number}
                      </span>
                      <div>
                        <span className="hidden font-display text-4xl font-bold text-royal-600/15 lg:inline-block">
                          {step.number}
                        </span>
                        <h3 className="mt-1 font-display text-xl font-semibold text-ink">
                          {step.title}
                        </h3>
                        <p className="mt-2 max-w-sm text-sm leading-relaxed text-slate lg:ml-auto">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                  <span
                    aria-hidden="true"
                    className="absolute left-4 top-1.5 hidden h-3 w-3 -translate-x-1/2 rounded-full border-2 border-gold-500 bg-white lg:left-1/2 lg:block"
                  />
                </li>
              );
            })}
          </ol>
        </div>
      </Container>
    </section>
  );
}
