import Image from "next/image";
import { siteConfig } from "@/lib/config";
import { cn } from "@/lib/cn";

// Source lockup is 997x665 (trimmed from public/images/logo.jpg) on a solid
// black canvas, which blends into the dark navbar/footer without a wrapper.
const ASPECT_RATIO = 1300 / 245;

export default function Logo({ height = 70, className }) {
  const width = Math.round(height * ASPECT_RATIO);

  return (
    <Image
      src="/images/logo46.jpg"
      alt={`${siteConfig.shortName} logo`}
      width={width}
      height={height}
      className={cn("flex-shrink-0 object-contain", className)}
      priority
    />
  );
}
