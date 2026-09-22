"use client";

import { motion, useReducedMotion } from "motion/react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import FAQAccordion from "@/components/faq/FAQAccordion";
import { JsonLd, faqJsonLd } from "@/lib/seo";
import { faqs } from "@/data/faqs";

// AI neural-network style nodes — kept sparse since this section is narrow
const NODES = [
  { x: 8, y: 20 },
  { x: 20, y: 10 },
  { x: 6, y: 45 },
  { x: 90, y: 15 },
  { x: 94, y: 42 },
  { x: 80, y: 10 },
  { x: 10, y: 75 },
  { x: 88, y: 78 },
  { x: 95, y: 60 },
];

const NODE_LINKS = [
  [0, 1], [0, 2], [1, 2], [3, 4], [3, 5], [4, 5],
  [0, 6], [4, 7], [7, 8], [4, 8],
];

export default function FAQSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="faq" className="relative overflow-hidden bg-mist py-24">
      {/* =========================================================
          BACKGROUND — subtle royal + AI motif (kept light for readability)
      ========================================================== */}

      <div
        aria-hidden="true"
        className="
          absolute inset-0
          [background:radial-gradient(40%_35%_at_100%_0%,rgba(44,75,176,0.06),transparent_60%),radial-gradient(40%_35%_at_0%_100%,rgba(201,162,39,0.07),transparent_60%)]
        "
      />

      {!shouldReduceMotion && (
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.22]"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="faqNodeLine" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#c9a227" stopOpacity="0.7" />
              <stop offset="50%" stopColor="#2c4bb0" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#c9a227" stopOpacity="0.7" />
            </linearGradient>
          </defs>

          {NODE_LINKS.map(([a, b], i) => {
            const nA = NODES[a];
            const nB = NODES[b];
            return (
              <motion.line
                key={`faq-link-${i}`}
                x1={nA.x}
                y1={nA.y}
                x2={nB.x}
                y2={nB.y}
                stroke="url(#faqNodeLine)"
                strokeWidth="0.15"
                initial={{ opacity: 0.1 }}
                animate={{ opacity: [0.1, 0.4, 0.1] }}
                transition={{
                  duration: 5 + (i % 4),
                  delay: i * 0.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            );
          })}

          {NODES.map((n, i) => (
            <motion.circle
              key={`faq-node-${i}`}
              cx={n.x}
              cy={n.y}
              r="0.45"
              fill={i % 3 === 0 ? "#c9a227" : "#5f7ce0"}
              animate={{
                opacity: [0.3, 0.85, 0.3],
                r: [0.35, 0.6, 0.35],
              }}
              transition={{
                duration: 3.5 + (i % 4),
                delay: i * 0.25,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </svg>
      )}

      {/* Soft drifting glows, kept to the edges so the accordion stays clean */}
      {!shouldReduceMotion && (
        <motion.div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            -right-24
            top-0
            h-[18rem]
            w-[18rem]
            rounded-full
            bg-royal-500/[0.06]
            blur-[80px]
          "
          animate={{ x: [0, -20, 0], y: [0, 20, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        />
      )}

      {!shouldReduceMotion && (
        <motion.div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            -left-24
            bottom-0
            h-[16rem]
            w-[16rem]
            rounded-full
            bg-gold-400/[0.07]
            blur-[80px]
          "
          animate={{ x: [0, 18, 0], y: [0, -18, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
      )}

      {/* =========================================================
          CONTENT
      ========================================================== */}

      <Container className="relative max-w-3xl">
        <Reveal>
          <SectionHeading eyebrow="FAQ" title="Frequently Asked Questions" />
        </Reveal>
        <div className="mt-12">
          <Reveal delay={0.1}>
            <FAQAccordion faqs={faqs} />
          </Reveal>
        </div>
      </Container>
      <JsonLd data={faqJsonLd(faqs)} />
    </section>
  );
}
