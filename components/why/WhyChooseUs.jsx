"use client";

import { motion, useReducedMotion } from "motion/react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import IconCard from "@/components/ui/IconCard";
import { whyChooseUs } from "@/data/why-choose-us";

// AI neural-network style nodes (percentage positions on a 0-100 grid)
const NODES = [
  { x: 6, y: 15 },
  { x: 18, y: 8 },
  { x: 28, y: 24 },
  { x: 14, y: 34 },
  { x: 40, y: 12 },
  { x: 48, y: 30 },
  { x: 36, y: 46 },
  { x: 60, y: 18 },
  { x: 68, y: 38 },
  { x: 56, y: 52 },
  { x: 80, y: 22 },
  { x: 88, y: 46 },
  { x: 76, y: 60 },
  { x: 26, y: 58 },
  { x: 10, y: 68 },
  { x: 92, y: 70 },
  { x: 84, y: 84 },
  { x: 64, y: 78 },
];

const NODE_LINKS = [
  [0, 1], [1, 2], [2, 3], [0, 3], [1, 4], [4, 5], [2, 5],
  [5, 6], [3, 6], [4, 7], [7, 8], [5, 8], [8, 9], [6, 9],
  [7, 10], [10, 11], [8, 11], [11, 12], [9, 12], [3, 13],
  [6, 13], [13, 9], [13, 14], [11, 15], [15, 16], [12, 16],
  [16, 17], [9, 17],
];

export default function WhyChooseUs() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-mist py-24">
      {/* =========================================================
          BACKGROUND — royal + AI motif
      ========================================================== */}

      <div
        aria-hidden="true"
        className="
          absolute inset-0
          [background:radial-gradient(50%_40%_at_90%_0%,rgba(44,75,176,0.06),transparent_60%),radial-gradient(45%_40%_at_0%_100%,rgba(201,162,39,0.08),transparent_60%)]
        "
      />

      <div
        aria-hidden="true"
        className="
          absolute inset-0 opacity-[0.04]
          [background-image:linear-gradient(rgba(15,23,42,0.7)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.7)_1px,transparent_1px)]
          [background-size:56px_56px]
        "
      />

      {/* AI neural-network layer */}
      {!shouldReduceMotion && (
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.32]"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="whyNodeLine" x1="0" y1="0" x2="1" y2="1">
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
                key={`why-link-${i}`}
                x1={nA.x}
                y1={nA.y}
                x2={nB.x}
                y2={nB.y}
                stroke="url(#whyNodeLine)"
                strokeWidth="0.15"
                initial={{ opacity: 0.1 }}
                animate={{ opacity: [0.1, 0.45, 0.1] }}
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
                key={`why-flow-${i}`}
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
              key={`why-node-${i}`}
              cx={n.x}
              cy={n.y}
              r="0.4"
              fill={i % 3 === 0 ? "#c9a227" : "#5f7ce0"}
              animate={{
                opacity: [0.35, 0.9, 0.35],
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

      {/* Drifting royal-blue glow */}
      {!shouldReduceMotion && (
        <motion.div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            -right-32
            -top-32
            h-[26rem]
            w-[26rem]
            rounded-full
            bg-royal-500/[0.07]
            blur-[90px]
          "
          animate={{ x: [0, -30, 0], y: [0, 25, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
      )}

      {/* Drifting gold glow */}
      {!shouldReduceMotion && (
        <motion.div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            -left-32
            bottom-0
            h-[22rem]
            w-[22rem]
            rounded-full
            bg-gold-400/[0.08]
            blur-[90px]
          "
          animate={{ x: [0, 25, 0], y: [0, -20, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
      )}

      {/* Royal corner ornaments */}
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
