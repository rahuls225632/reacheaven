import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import FAQAccordion from "@/components/faq/FAQAccordion";
import { JsonLd, faqJsonLd } from "@/lib/seo";
import { faqs } from "@/data/faqs";

export default function FAQSection() {
  return (
    <section id="faq" className="bg-mist py-24">
      <Container className="max-w-3xl">
        <SectionHeading eyebrow="FAQ" title="Frequently Asked Questions" />
        <div className="mt-12">
          <FAQAccordion faqs={faqs} />
        </div>
      </Container>
      <JsonLd data={faqJsonLd(faqs)} />
    </section>
  );
}
