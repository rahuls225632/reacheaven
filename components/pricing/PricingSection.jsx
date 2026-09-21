import { Check } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { pricingTiers, pricingNote } from "@/data/pricing";

export default function PricingSection() {
  return (
    <section id="pricing" className="bg-white py-24">
      <Container>
        <SectionHeading
          eyebrow="Packages"
          title="Pricing Built Around Your Scope"
          description="A starting reference for planning — every project is scoped and quoted individually."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {pricingTiers.map((tier, index) => (
            <Reveal key={tier.name} delay={index * 0.08}>
              <div
                className={cn(
                  "flex h-full flex-col rounded-2xl border p-8",
                  tier.highlighted
                    ? "border-gold-400/40 bg-navy-950 text-white shadow-[0_30px_60px_-24px_rgba(11,18,32,0.4)]"
                    : "border-line bg-white text-ink"
                )}
              >
                {tier.highlighted ? (
                  <span className="mb-4 inline-block w-fit rounded-full bg-gold-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-gold-300">
                    Most Chosen
                  </span>
                ) : null}
                <h3 className="font-display text-xl font-semibold">{tier.name}</h3>
                <p className={cn("mt-1 text-sm", tier.highlighted ? "text-white/60" : "text-slate")}>
                  {tier.audience}
                </p>
                <p className="mt-5 font-display text-2xl font-semibold">{tier.startingFrom}</p>
                <p className={cn("mt-3 text-sm leading-relaxed", tier.highlighted ? "text-white/70" : "text-slate")}>
                  {tier.description}
                </p>

                <ul className="mt-6 flex-1 space-y-3 text-sm">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <Check
                        className={cn(
                          "mt-0.5 h-4 w-4 flex-shrink-0",
                          tier.highlighted ? "text-gold-400" : "text-royal-600"
                        )}
                      />
                      <span className={tier.highlighted ? "text-white/80" : "text-slate"}>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  href="/contact"
                  variant={tier.highlighted ? "gold" : "outline"}
                  className="mt-8 w-full"
                >
                  Get a Custom Quote
                </Button>
              </div>
            </Reveal>
          ))}
        </div>

        <p className="mx-auto mt-8 max-w-xl text-center text-xs text-slate-soft">{pricingNote}</p>
      </Container>
    </section>
  );
}
