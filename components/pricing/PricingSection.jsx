"use client";

import { motion, useReducedMotion } from "motion/react";
import { Check } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { pricingTiers, pricingNote } from "@/data/pricing";

// AI neural-network style nodes (percentage positions on a 0-100 grid)
const NODES = [
  { x: 6, y: 20 },
  { x: 18, y: 10 },
  { x: 30, y: 28 },
  { x: 14, y: 40 },
  { x: 44, y: 14 },
  { x: 52, y: 34 },
  { x: 38, y: 50 },
  { x: 66, y: 20 },
  { x: 74, y: 42 },
  { x: 60, y: 56 },
  { x: 86, y: 26 },
  { x: 92, y: 50 },
  { x: 80, y: 64 },
  { x: 26, y: 64 },
  { x: 10, y: 76 },
];

const NODE_LINKS = [
  [0, 1], [1, 2], [2, 3], [0, 3], [1, 4], [4, 5], [2, 5],
  [5, 6], [3, 6], [4, 7], [7, 8], [5, 8], [8, 9], [6, 9],
  [7, 10], [10, 11], [8, 11], [11, 12], [9, 12], [3, 13],
  [6, 13], [13, 14],
];

// Money symbols drifting softly upward in the background — the "paiso"
// touch that ties pricing to something visually relevant.
const CURRENCY = [
  { symbol: "₹", top: "18%", left: "10%", size: 22, delay: 0, duration: 9 },
  { symbol: "$", top: "68%", left: "6%", size: 18, delay: 1.4, duration: 10 },
  { symbol: "₹", top: "30%", left: "92%", size: 20, delay: 0.8, duration: 8.5 },
  { symbol: "€", top: "76%", left: "90%", size: 16, delay: 2, duration: 11 },
  { symbol: "$", top: "50%", left: "50%", size: 14, delay: 1.1, duration: 9.5 },
  { symbol: "₹", top: "8%", left: "48%", size: 16, delay: 0.5, duration: 10.5 },
];

export default function PricingSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="pricing" className="relative overflow-hidden bg-white py-24">
      {/* =========================================================
          BACKGROUND — royal + AI motif + drifting currency
      ========================================================== */}

      <div
        aria-hidden="true"
        className="
          absolute inset-0
          [background:radial-gradient(50%_40%_at_90%_0%,rgba(201,162,39,0.07),transparent_60%),radial-gradient(45%_40%_at_5%_100%,rgba(44,75,176,0.06),transparent_60%)]
        "
      />

      <div
        aria-hidden="true"
        className="
          absolute inset-0 opacity-[0.035]
          [background-image:linear-gradient(rgba(15,23,42,0.7)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.7)_1px,transparent_1px)]
          [background-size:56px_56px]
        "
      />

      {!shouldReduceMotion && (
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.28]"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="pricingNodeLine" x1="0" y1="0" x2="1" y2="1">
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
                key={`price-link-${i}`}
                x1={nA.x}
                y1={nA.y}
                x2={nB.x}
                y2={nB.y}
                stroke="url(#pricingNodeLine)"
                strokeWidth="0.15"
                initial={{ opacity: 0.1 }}
                animate={{ opacity: [0.1, 0.4, 0.1] }}
                transition={{
                  duration: 4.5 + (i % 5),
                  delay: i * 0.15,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            );
          })}

          {NODES.map((n, i) => (
            <motion.circle
              key={`price-node-${i}`}
              cx={n.x}
              cy={n.y}
              r="0.4"
              fill={i % 3 === 0 ? "#c9a227" : "#5f7ce0"}
              animate={{
                opacity: [0.3, 0.85, 0.3],
                r: [0.3, 0.55, 0.3],
              }}
              transition={{
                duration: 3.5 + (i % 4),
                delay: i * 0.2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </svg>
      )}

      {/* Drifting currency symbols — soft, gold, floating upward like value rising */}
      {!shouldReduceMotion &&
        CURRENCY.map((c, i) => (
          <motion.span
            key={`currency-${i}`}
            aria-hidden="true"
            className="pointer-events-none absolute select-none font-display font-semibold text-gold-400/20"
            style={{ top: c.top, left: c.left, fontSize: c.size }}
            animate={{
              y: [0, -22, 0],
              opacity: [0.15, 0.4, 0.15],
            }}
            transition={{
              duration: c.duration,
              delay: c.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {c.symbol}
          </motion.span>
        ))}

      <div
        aria-hidden="true"
        className="absolute left-6 top-6 h-10 w-10 border-l border-t border-gold-400/25 sm:left-10 sm:top-10"
      />
      <div
        aria-hidden="true"
        className="absolute right-6 top-6 h-10 w-10 border-r border-t border-gold-400/25 sm:right-10 sm:top-10"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-6 left-6 hidden h-10 w-10 border-b border-l border-gold-400/15 lg:block lg:left-10 lg:bottom-10"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-6 right-6 hidden h-10 w-10 border-b border-r border-gold-400/15 lg:block lg:right-10 lg:bottom-10"
      />

      {/* =========================================================
          CONTENT
      ========================================================== */}

      <Container className="relative">
        <SectionHeading
          eyebrow="Packages"
          title="Pricing Built Around Your Scope"
          description="A starting reference for planning — every project is scoped and quoted individually."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {pricingTiers.map((tier, index) => (
            <Reveal key={tier.name} delay={index * 0.08}>
              <div className="relative h-full">
                {/* Pulsing gold aura behind the highlighted plan */}
                {tier.highlighted && !shouldReduceMotion && (
                  <motion.div
                    aria-hidden="true"
                    className="absolute -inset-3 rounded-3xl bg-gold-400/20 blur-2xl"
                    animate={{
                      opacity: [0.35, 0.7, 0.35],
                      scale: [0.98, 1.03, 0.98],
                    }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  />
                )}

                {/* Rotating gold outline ring for the highlighted plan */}
                {tier.highlighted && !shouldReduceMotion && (
                  <motion.div
                    aria-hidden="true"
                    className="absolute -inset-[1.5px] rounded-2xl"
                    style={{
                      background:
                        "conic-gradient(from 0deg, transparent 0%, rgba(245,196,81,0.9) 10%, transparent 25%, transparent 60%, rgba(99,102,241,0.6) 75%, transparent 92%, transparent 100%)",
                      WebkitMask:
                        "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
                      WebkitMaskComposite: "xor",
                      maskComposite: "exclude",
                      padding: "1.5px",
                    }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  />
                )}

                <div
                  className={cn(
                    "relative flex h-full flex-col rounded-2xl border p-8",
                    tier.highlighted
                      ? "border-gold-400/40 bg-navy-950 text-white shadow-[0_30px_60px_-24px_rgba(11,18,32,0.4)]"
                      : "border-line bg-white text-ink"
                  )}
                >
                  {tier.highlighted ? (
                    <motion.span
                      className="mb-4 inline-flex w-fit items-center gap-1.5 rounded-full bg-gold-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-gold-300"
                      animate={
                        shouldReduceMotion
                          ? undefined
                          : { opacity: [0.85, 1, 0.85] }
                      }
                      transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-gold-300" />
                      Most Chosen
                    </motion.span>
                  ) : null}
                  <h3 className="font-display text-xl font-semibold">{tier.name}</h3>
                  <p className={cn("mt-1 text-sm", tier.highlighted ? "text-white/60" : "text-slate")}>
                    {tier.audience}
                  </p>
                  <p
                    className={cn(
                      "mt-5 font-display text-2xl font-bold tracking-tight",
                      tier.highlighted
                        ? "bg-gradient-to-r from-[#F5D77A] via-[#C9A227] to-[#F5D77A] bg-clip-text text-transparent"
                        : "text-ink"
                    )}
                  >
                    {tier.startingFrom}
                  </p>
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
              </div>
            </Reveal>
          ))}
        </div>

        <p className="mx-auto mt-8 max-w-xl text-center text-xs text-slate-soft">{pricingNote}</p>
      </Container>
    </section>
  );
}
