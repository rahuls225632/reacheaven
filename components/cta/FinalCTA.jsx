import { ArrowRight, MessageCircle } from "lucide-react";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import { whatsappHref } from "@/lib/config";

export default function FinalCTA() {
  return (
    <section className="relative overflow-hidden bg-navy-950 py-24">
      <div
        aria-hidden="true"
        className="absolute inset-0 [background:radial-gradient(60%_60%_at_50%_100%,rgba(44,75,176,0.3),transparent_65%)]"
      />
      <Container className="relative text-center">
        <Reveal>
          <h2 className="mx-auto max-w-2xl text-balance font-display text-3xl font-semibold text-white sm:text-4xl">
            Have a Business Idea? Let&rsquo;s Build It.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/70">
            Tell us what you need. We&rsquo;ll understand your requirements,
            recommend the right solution and help you take the next step.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <Button href="/contact" variant="gold" size="lg" icon={ArrowRight}>
              Start Your Project
            </Button>
            <Button href={whatsappHref()} external variant="outline-dark" size="lg" icon={MessageCircle}>
              WhatsApp Us
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
