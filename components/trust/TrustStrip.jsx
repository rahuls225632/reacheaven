import Container from "@/components/ui/Container";
import Icon from "@/components/ui/Icon";
import { trustPoints } from "@/data/trust";

export default function TrustStrip() {
  return (
    <section className="border-b border-line bg-mist">
      <Container className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6 py-8 text-center">
        {trustPoints.map((point) => (
          <div key={point.label} className="flex items-center gap-2 text-sm font-medium text-slate">
            <Icon name={point.icon} className="h-4 w-4 text-royal-600" aria-hidden="true" />
            {point.label}
          </div>
        ))}
      </Container>
    </section>
  );
}
