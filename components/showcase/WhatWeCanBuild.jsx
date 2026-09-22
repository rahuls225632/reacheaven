"use client";

import { motion, useReducedMotion } from "motion/react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import Icon from "@/components/ui/Icon";
import { showcaseItems } from "@/data/showcase";

// AI neural-network style nodes (percentage positions on a 0-100 grid)
const NODES = [
  { x: 6, y: 18 },
  { x: 20, y: 10 },
  { x: 30, y: 26 },
  { x: 16, y: 38 },
  { x: 42, y: 14 },
  { x: 50, y: 32 },
  { x: 38, y: 48 },
  { x: 62, y: 20 },
  { x: 70, y: 40 },
  { x: 58, y: 54 },
  { x: 82, y: 24 },
  { x: 90, y: 48 },
  { x: 78, y: 62 },
  { x: 28, y: 62 },
  { x: 12, y: 74 },
  { x: 94, y: 72 },
];

const NODE_LINKS = [
  [0, 1], [1, 2], [2, 3], [0, 3], [1, 4], [4, 5], [2, 5],
  [5, 6], [3, 6], [4, 7], [7, 8], [5, 8], [8, 9], [6, 9],
  [7, 10], [10, 11], [8, 11], [11, 12], [9, 12], [3, 13],
  [6, 13], [13, 14], [11, 15], [12, 15],
];

export default function WhatWeCanBuild() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="solutions" className="relative overflow-hidden bg-mist py-24">
      {/* =========================================================
          BACKGROUND — royal + AI motif
      ========================================================== */}

      <div
        aria-hidden="true"
        className="
          absolute inset-0
          [background:radial-gradient(50%_40%_at_10%_0%,rgba(201,162,39,0.08),transparent_60%),radial-gradient(45%_40%_at_95%_100%,rgba(44,75,176,0.06),transparent_60%)]
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

      {!shouldReduceMotion && (
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.32]"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="buildNodeLine" x1="0" y1="0" x2="1" y2="1">
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
                key={`build-link-${i}`}
                x1={nA.x}
                y1={nA.y}
                x2={nB.x}
                y2={nB.y}
                stroke="url(#buildNodeLine)"
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

          {NODE_LINKS.map(([a, b], i) => {
            const nA = NODES[a];
            const nB = NODES[b];
            return (
              <motion.circle
                key={`build-flow-${i}`}
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
              key={`build-node-${i}`}
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

      {!shouldReduceMotion && (
        <motion.div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            -right-32
            top-0
            h-[24rem]
            w-[24rem]
            rounded-full
            bg-royal-500/[0.07]
            blur-[90px]
          "
          animate={{ x: [0, -25, 0], y: [0, 25, 0] }}
          transition={{ duration: 17, repeat: Infinity, ease: "easeInOut" }}
        />
      )}

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
          eyebrow="What We Can Build"
          title="From Business Websites to Complete Digital Platforms"
          description="Concept previews illustrating the range of what we build — not client work."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {showcaseItems.map((item, index) => (
            <Reveal key={item.title} delay={Math.min(index * 0.04, 0.3)}>
              <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_-16px_rgba(11,18,32,0.15)]">
                <span className="absolute right-4 top-4 rounded-full bg-navy-900 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-gold-300">
                  Concept
                </span>
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-royal-600/10 text-royal-600">
                  <Icon name={item.icon} className="h-5 w-5" aria-hidden="true" />
                </div>
                <h3 className="mt-5 font-display text-base font-semibold text-ink">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate">{item.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
