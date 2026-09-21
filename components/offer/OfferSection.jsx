import { CheckCircle2 } from "lucide-react";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";

const included = [
  "Bug fixes",
  "Minor UI corrections",
  "Basic content updates",
  "Performance monitoring",
  "Technical assistance",
  "Deployment support",
  "Small adjustments",
];

export default function OfferSection() {
  return (
    <section className="relative overflow-hidden bg-navy-950 py-24">
      <div
        aria-hidden="true"
        className="absolute inset-0 [background:radial-gradient(50%_60%_at_50%_0%,rgba(201,162,39,0.12),transparent_65%)]"
      />
      <Container className="relative">
        <Reveal>
          <div className="mx-auto max-w-3xl rounded-3xl border border-gold-300/20 bg-white/[0.02] p-10 text-center shadow-[0_40px_100px_-40px_rgba(0,0,0,0.6)] sm:p-14">
            <span className="inline-flex items-center gap-2 rounded-full border border-gold-300/30 bg-gold-400/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-gold-300">
              Build With Confidence
            </span>
            <h2 className="mt-5 text-balance font-display text-3xl font-semibold text-white sm:text-4xl">
              Your Website. Delivered. Supported for 3 Months.
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/70">
              Every website project includes 3 months of{" "}
              <span className="font-semibold text-gold-200">FREE</span>{" "}
              post-launch support and maintenance.
            </p>

            <ul className="mx-auto mt-8 grid max-w-lg grid-cols-1 gap-3 text-left sm:grid-cols-2">
              {included.map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-white/80">
                  <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-gold-400" />
                  {item}
                </li>
              ))}
            </ul>

            <p className="mx-auto mt-8 max-w-lg text-xs leading-relaxed text-white/45">
              Major new features, redesigns, third-party integrations and
              substantial development work are quoted separately.
            </p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
