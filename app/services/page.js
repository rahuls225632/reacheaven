import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import IconCard from "@/components/ui/IconCard";
import Button from "@/components/ui/Button";
import { JsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { services } from "@/data/services";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Software & Website Development Services",
  description:
    "Business websites, e-commerce stores, web applications, UI/UX design, maintenance and AI integration — software development services scoped around your business.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <section className="bg-navy-950 py-20">
        <Container className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-gold-300">
            Services
          </span>
          <h1 className="mx-auto mt-5 max-w-2xl text-balance font-display text-3xl font-semibold text-white sm:text-4xl">
            Software Development Services Built Around Your Business
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/70">
            From a first business website to a complete internal platform —
            every engagement starts with your goals, not a fixed template.
          </p>
        </Container>
      </section>

      <section className="bg-white py-24">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <Reveal key={service.title} delay={Math.min(index * 0.04, 0.3)}>
                <IconCard icon={service.icon} title={service.title} description={service.shortDescription}>
                  <Link
                    href={service.slug ? `/services/${service.slug}` : "/contact"}
                    className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-royal-600 hover:text-royal-500"
                  >
                    {service.slug ? "Learn more" : "Talk to us"}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </IconCard>
              </Reveal>
            ))}
          </div>

          <div className="mt-14 text-center">
            <Button href="/contact" size="lg">
              Request a Quote
            </Button>
          </div>
        </Container>
      </section>

      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
        ])}
      />
    </>
  );
}
