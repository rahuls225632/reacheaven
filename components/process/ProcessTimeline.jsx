"use client";

import { motion, useReducedMotion } from "motion/react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
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
          eyebrow="Our Process"
          title="From Idea to Launch"
          description="A clear, six-step process so you always know what happens next."
        />

        <div className="relative mt-16">
          {/* Static track line */}
          <div
            aria-hidden="true"
            className="absolute left-4 top-0 hidden h-full w-px bg-line lg:left-1/2 lg:block"
          />

          {/* Animated gold line that grows as you scroll through the timeline */}
          {!shouldReduceMotion && (
            <motion.div
              aria-hidden="true"
              className="
                absolute left-4 top-0 hidden w-px origin-top
                bg-gradient-to-b from-gold-400 via-gold-500 to-royal-500
                lg:left-1/2 lg:block
              "
              style={{ height: "100%" }}
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
            />
          )}

          <ol className="space-y-10 lg:space-y-16">
            {processSteps.map((step, index) => {
              const isEven = index % 2 === 1;
              return (
                <li key={step.number} className="relative lg:grid lg:grid-cols-2 lg:gap-12">
                  <Reveal
                    className={
                      isEven
                        ? "lg:col-start-2"
                        : "lg:col-start-1 lg:row-start-1 lg:text-right"
                    }
                  >
                    <div className="flex items-start gap-4 lg:block">
                      <span className="font-display text-3xl font-bold text-royal-600/20 lg:hidden">
                        {step.number}
                      </span>
                      <div>
                        <motion.span
                          className="
                            hidden
                            bg-gradient-to-r from-gold-300 via-gold-500 to-gold-300
                            bg-clip-text
                            font-display text-4xl font-bold text-transparent
                            opacity-40
                            lg:inline-block
                          "
                          style={{ backgroundSize: "200% auto" }}
                          animate={
                            shouldReduceMotion
                              ? undefined
                              : { backgroundPosition: ["0% center", "200% center"] }
                          }
                          transition={{
                            duration: 6,
                            repeat: Infinity,
                            ease: "linear",
                            delay: index * 0.2,
                          }}
                        >
                          {step.number}
                        </motion.span>
                        <h3 className="mt-1 font-display text-xl font-semibold text-ink">
                          {step.title}
                        </h3>
                        <p className="mt-2 max-w-sm text-sm leading-relaxed text-slate lg:ml-auto">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </Reveal>

                  {/* Marker dot with pulsing royal-gold glow */}
                  <span
                    aria-hidden="true"
                    className="
                      absolute left-4 top-1.5 hidden h-3 w-3 -translate-x-1/2
                      lg:left-1/2 lg:block
                    "
                  >
                    {!shouldReduceMotion && (
                      <motion.span
                        aria-hidden="true"
                        className="absolute inset-0 -m-1.5 rounded-full bg-gold-400/30 blur-sm"
                        animate={{
                          opacity: [0.3, 0.9, 0.3],
                          scale: [0.9, 1.4, 0.9],
                        }}
                        transition={{
                          duration: 2.4,
                          delay: index * 0.25,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />
                    )}
                    <span className="relative block h-3 w-3 rounded-full border-2 border-gold-500 bg-white" />
                  </span>
                </li>
              );
            })}
          </ol>
        </div>
      </Container>
    </section>
  );
}
