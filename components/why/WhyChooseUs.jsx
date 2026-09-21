import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import IconCard from "@/components/ui/IconCard";
import { whyChooseUs } from "@/data/why-choose-us";

export default function WhyChooseUs() {
  return (
    <section className="bg-mist py-24">
      <Container>
        <SectionHeading eyebrow="Why Us" title="Why Businesses Choose Us" />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {whyChooseUs.map((item, index) => (
            <Reveal key={item.title} delay={Math.min(index * 0.05, 0.3)}>
              <IconCard icon={item.icon} title={item.title} description={item.description} className="bg-white" />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
