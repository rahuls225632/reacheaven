"use client";

import { motion, useReducedMotion } from "motion/react";
import { ChevronRight } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import Icon from "@/components/ui/Icon";
import { processSteps } from "@/data/process";

// AI neural-network style nodes (percentage positions on a 0-100 grid)
const NODES = [
  { x: 6, y: 12 },
  { x: 16, y: 26 },
  { x: 30, y: 8 },
  { x: 12, y: 42 },
  { x: 38, y: 30 },
  { x: 24, y: 54 },
  { x: 48, y: 14 },
  { x: 62, y: 34 },
  { x: 50, y: 50 },
  { x: 70, y: 12 },
  { x: 84, y: 30 },
  { x: 78, y: 52 },
  { x: 92, y: 46 },
  { x: 8, y: 70 },
  { x: 22, y: 82 },
  { x: 40, y: 68 },
  { x: 60, y: 78 },
  { x: 86, y: 70 },
  { x: 94, y: 86 },
];

const NODE_LINKS = [
  [0, 1], [1, 2], [1, 3], [1, 4], [2, 4], [3, 5], [4, 5],
  [4, 6], [6, 7], [4, 8], [7, 8], [6, 9], [9, 10], [7, 10],
  [10, 11], [8, 11], [10, 12], [11, 12], [3, 13], [5, 13],
  [5, 15], [13, 14], [14, 15], [15, 16], [8, 16], [16, 17],
  [11, 17], [17, 18],
];

// Per-step accent palette — soft tinted card + matching icon badge.
const STEP_STYLES = {
  emerald: {
    card: "border-emerald-100 bg-emerald-50/70",
    label: "text-emerald-600",
    icon: "bg-emerald-500 text-white shadow-emerald-500/30",
    glow: "bg-emerald-400/25",
  },
  sky: {
    card: "border-sky-100 bg-sky-50/70",
    label: "text-sky-600",
    icon: "bg-sky-500 text-white shadow-sky-500/30",
    glow: "bg-sky-400/25",
  },
  amber: {
    card: "border-amber-100 bg-amber-50/70",
    label: "text-amber-600",
    icon: "bg-amber-500 text-white shadow-amber-500/30",
    glow: "bg-amber-400/25",
  },
  teal: {
    card: "border-teal-100 bg-teal-50/70",
    label: "text-teal-600",
    icon: "bg-teal-500 text-white shadow-teal-500/30",
    glow: "bg-teal-400/25",
  },
};

export default function ProcessTimeline() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="process" className="relative overflow-hidden bg-white py-24">
      {/* =========================================================
          BACKGROUND — royal + AI motif
      ========================================================== */}

      <div
        aria-hidden="true"
        className="
          absolute inset-0
          [background:radial-gradient(45%_35%_at_10%_0%,rgba(201,162,39,0.07),transparent_60%),radial-gradient(50%_40%_at_95%_100%,rgba(44,75,176,0.06),transparent_60%)]
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
          className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.3]"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="processNodeLine" x1="0" y1="0" x2="1" y2="1">
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
                key={`proc-link-${i}`}
                x1={nA.x}
                y1={nA.y}
                x2={nB.x}
                y2={nB.y}
                stroke="url(#processNodeLine)"
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

          {/* Data-flow pulses travelling along the connections */}
          {NODE_LINKS.map(([a, b], i) => {
            const nA = NODES[a];
            const nB = NODES[b];
            return (
              <motion.circle
                key={`proc-flow-${i}`}
                r="0.45"
                fill={i % 2 === 0 ? "#c9a227" : "#5f7ce0"}
                animate={{
                  cx: [nA.x, nB.x, nA.x],
                  cy: [nA.y, nB.y, nA.y],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 3.8 + (i % 4),
                  delay: i * 0.3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            );
          })}

          {NODES.map((n, i) => (
            <motion.circle
              key={`proc-node-${i}`}
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

      {!shouldReduceMotion && (
        <motion.div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            -left-32
            top-1/4
            h-[24rem]
            w-[24rem]
            rounded-full
            bg-gold-400/[0.07]
            blur-[90px]
          "
          animate={{ x: [0, 20, 0], y: [0, -25, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        />
      )}

      {!shouldReduceMotion && (
        <motion.div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            -right-32
            bottom-0
            h-[24rem]
            w-[24rem]
            rounded-full
            bg-royal-500/[0.06]
            blur-[90px]
          "
          animate={{ x: [0, -20, 0], y: [0, 20, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
      )}

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
          eyebrow="Simple Process"
          title="4 Easy Steps to Your Website"
          description="From your first message to a live website in just a few days."
        />

        <div className="relative mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {processSteps.map((step, index) => {
            const style = STEP_STYLES[step.color] || STEP_STYLES.sky;
            const isLast = index === processSteps.length - 1;

            return (
              <Reveal key={step.number} delay={Math.min(index * 0.12, 0.4)} className="relative">
                <div
                  className={`group relative h-full rounded-2xl border p-6 text-center transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_-18px_rgba(11,18,32,0.25)] ${style.card}`}
                >
                  <span
                    className={`text-xs font-bold uppercase tracking-[0.2em] ${style.label}`}
                  >
                    Step {step.number}
                  </span>

                  <div className="relative mx-auto mt-4 flex h-14 w-14 items-center justify-center">
                    {!shouldReduceMotion && (
                      <motion.span
                        aria-hidden="true"
                        className={`absolute inset-0 rounded-full ${style.glow} blur-md`}
                        animate={{ scale: [0.9, 1.25, 0.9], opacity: [0.5, 0.9, 0.5] }}
                        transition={{
                          duration: 3,
                          delay: index * 0.3,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />
                    )}
                    <motion.div
                      initial={shouldReduceMotion ? undefined : { scale: 0.7, opacity: 0 }}
                      whileInView={shouldReduceMotion ? undefined : { scale: 1, opacity: 1 }}
                      viewport={{ once: true, amount: 0.6 }}
                      transition={{
                        duration: 0.45,
                        delay: index * 0.12 + 0.1,
                        ease: [0.34, 1.56, 0.64, 1],
                      }}
                      className={`relative flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-transform duration-300 group-hover:scale-105 ${style.icon}`}
                    >
                      <Icon name={step.icon} className="h-6 w-6" aria-hidden="true" />
                    </motion.div>
                  </div>

                  <h3 className="mt-5 font-display text-lg font-semibold text-ink">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate">
                    {step.description}
                  </p>
                </div>

                {!isLast && (
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute top-1/2 -right-4 z-10 hidden -translate-y-1/2 items-center justify-center lg:-right-7 lg:flex"
                  >
                    <span className="flex h-7 w-7 items-center justify-center rounded-full border border-line bg-white text-slate-soft shadow-sm">
                      <ChevronRight className="h-4 w-4" />
                    </span>
                  </div>
                )}
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
