import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import IconCard from "@/components/ui/IconCard";
import Button from "@/components/ui/Button";
import { services } from "@/data/services";

export default function ServicesSection() {
  return (
    <section id="services" className="bg-white py-24">
      <Container>
        <SectionHeading
          eyebrow="Services"
          title="What We Build For Your Business"
          description="From your first website to a complete internal system — services scoped around what your business actually needs."
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <Reveal key={service.title} delay={Math.min(index * 0.05, 0.3)}>
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

        <div className="mt-12 text-center">
          <Button href="/contact" variant="primary" size="lg">
            Get a Free Consultation
          </Button>
        </div>
      </Container>
    </section>
  );
}
