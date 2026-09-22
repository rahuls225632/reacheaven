"use client";

import { motion, useReducedMotion } from "motion/react";
import { Heart, MessageCircle, Send } from "lucide-react";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import InstagramIcon from "@/components/ui/InstagramIcon";
import { siteConfig, instagramUrl } from "@/lib/config";

const FLOATERS = [
  { Icon: Heart, top: "14%", left: "6%", duration: 6, delay: 0 },
  { Icon: MessageCircle, top: "70%", left: "10%", duration: 7, delay: 0.6 },
  { Icon: Send, top: "20%", left: "92%", duration: 6.5, delay: 1.1 },
  { Icon: Heart, top: "76%", left: "90%", duration: 5.5, delay: 0.3 },
];

// AI neural-network style nodes — royal/gold with a touch of Instagram magenta
const NODES = [
  { x: 6, y: 22, tone: "gold" },
  { x: 16, y: 8, tone: "royal" },
  { x: 26, y: 34, tone: "royal" },
  { x: 12, y: 48, tone: "magenta" },
  { x: 40, y: 14, tone: "gold" },
  { x: 48, y: 40, tone: "royal" },
  { x: 60, y: 10, tone: "royal" },
  { x: 68, y: 34, tone: "gold" },
  { x: 80, y: 18, tone: "magenta" },
  { x: 90, y: 42, tone: "royal" },
  { x: 96, y: 12, tone: "gold" },
  { x: 32, y: 62, tone: "royal" },
  { x: 72, y: 58, tone: "gold" },
];

const NODE_LINKS = [
  [0, 1], [1, 2], [0, 3], [2, 3], [2, 4], [4, 5], [5, 6],
  [6, 7], [7, 8], [8, 9], [9, 10], [5, 11], [7, 12], [11, 12],
];

const TONE_COLOR = {
  gold: "#f5c451",
  royal: "#818cf8",
  magenta: "#d62976",
};

export default function InstagramSection() {
  const shouldReduceMotion = useReducedMotion();
  const handle = siteConfig.social.instagram;

  return (
    <section className="relative overflow-hidden bg-navy-950 py-24">
      {/* Layered ambient glows for depth */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 [background:radial-gradient(50%_55%_at_50%_0%,rgba(44,75,176,0.16),transparent_60%),radial-gradient(40%_45%_at_100%_100%,rgba(214,41,118,0.1),transparent_60%),radial-gradient(35%_40%_at_0%_100%,rgba(201,162,39,0.08),transparent_60%)]"
      />

      {/* AI neural-network motif */}
      {!shouldReduceMotion && (
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.4]"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="instaNodeLine" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#f5c451" stopOpacity="0.55" />
              <stop offset="50%" stopColor="#d62976" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#818cf8" stopOpacity="0.55" />
            </linearGradient>
          </defs>

          {NODE_LINKS.map(([a, b], i) => {
            const nA = NODES[a];
            const nB = NODES[b];
            return (
              <motion.line
                key={`insta-link-${i}`}
                x1={nA.x}
                y1={nA.y}
                x2={nB.x}
                y2={nB.y}
                stroke="url(#instaNodeLine)"
                strokeWidth="0.15"
                initial={{ opacity: 0.1 }}
                animate={{ opacity: [0.1, 0.5, 0.1] }}
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
              key={`insta-node-${i}`}
              cx={n.x}
              cy={n.y}
              r="0.4"
              fill={TONE_COLOR[n.tone]}
              animate={{ opacity: [0.35, 0.9, 0.35], r: [0.3, 0.55, 0.3] }}
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

      {/* Drifting royal + magenta glow orbs */}
      {!shouldReduceMotion && (
        <>
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute -left-20 top-0 h-72 w-72 rounded-full bg-royal-500/[0.14] blur-[100px]"
            animate={{ x: [0, 20, 0], y: [0, 20, 0] }}
            transition={{ duration: 17, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-[#d62976]/[0.12] blur-[100px]"
            animate={{ x: [0, -20, 0], y: [0, -15, 0] }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          />
        </>
      )}

      <Container className="relative">
        <Reveal>
          <div className="relative mx-auto max-w-3xl overflow-hidden rounded-3xl border border-gold-300/20 bg-gradient-to-b from-white/[0.05] to-white/[0.015] p-10 text-center shadow-[0_40px_100px_-40px_rgba(0,0,0,0.75)] backdrop-blur-sm sm:p-14">
            {/* Top shimmer seam, matching site's signature gold line */}
            {!shouldReduceMotion && (
              <motion.div
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-300 to-transparent"
                animate={{ opacity: [0.3, 1, 0.3], x: ["-15%", "15%", "-15%"] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              />
            )}

            {/* Royal corner ornaments */}
            <div
              aria-hidden="true"
              className="absolute left-5 top-5 h-7 w-7 border-l border-t border-gold-300/25"
            />
            <div
              aria-hidden="true"
              className="absolute right-5 top-5 h-7 w-7 border-r border-t border-gold-300/25"
            />
            <div
              aria-hidden="true"
              className="absolute bottom-5 left-5 h-7 w-7 border-b border-l border-gold-300/25"
            />
            <div
              aria-hidden="true"
              className="absolute bottom-5 right-5 h-7 w-7 border-b border-r border-gold-300/25"
            />

            {/* Floating reaction icons */}
            {!shouldReduceMotion &&
              FLOATERS.map(({ Icon, top, left, duration, delay }, i) => (
                <motion.div
                  key={i}
                  aria-hidden="true"
                  className="pointer-events-none absolute text-white/10"
                  style={{ top, left }}
                  animate={{ y: [0, -14, 0], opacity: [0.15, 0.4, 0.15] }}
                  transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Icon className="h-7 w-7" />
                </motion.div>
              ))}

            {/* Icon badge with animated gradient ring */}
            <div className="relative mx-auto flex h-16 w-16 items-center justify-center">
              {!shouldReduceMotion && (
                <motion.span
                  aria-hidden="true"
                  className="absolute inset-0 rounded-2xl [background:conic-gradient(from_0deg,#feda75,#fa7e1e,#d62976,#962fbf,#4f5bd5,#feda75)]"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                />
              )}
              <span className="absolute inset-[2px] rounded-[14px] bg-navy-950" />
              <InstagramIcon className="relative z-10 h-7 w-7 text-white" />
            </div>

            <span className="mt-6 inline-flex items-center gap-2 rounded-full border border-gold-300/25 bg-gold-400/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-gold-300">
              @{handle}
            </span>

            <h2 className="mt-5 text-balance font-display text-3xl font-semibold text-white sm:text-4xl">
              See Our Work. Share Your Story.
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/70">
              We post our latest builds, behind-the-scenes and client wins on
              Instagram. Follow along, share your own story with us, and drop
              a comment if you&rsquo;d like our work!
            </p>

            <motion.a
              href={instagramUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="relative mt-8 inline-flex items-center gap-2 overflow-hidden rounded-full px-7 py-3.5 text-sm font-semibold text-white shadow-[0_8px_24px_-8px_rgba(214,41,118,0.55)] [background:linear-gradient(135deg,#feda75_0%,#fa7e1e_20%,#d62976_45%,#962fbf_70%,#4f5bd5_100%)]"
              whileHover={shouldReduceMotion ? undefined : { scale: 1.04 }}
              whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
            >
              <InstagramIcon className="h-4 w-4" />
              Follow @{handle} on Instagram
            </motion.a>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
