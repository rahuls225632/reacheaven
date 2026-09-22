"use client";

import { motion, useReducedMotion } from "motion/react";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import ContactForm from "@/components/contact/ContactForm";
import { siteConfig, mailHref, telHref } from "@/lib/config";

// AI neural-network style nodes (percentage positions on a 0-100 grid)
const NODES = [
  { x: 6, y: 16 },
  { x: 18, y: 8 },
  { x: 10, y: 32 },
  { x: 24, y: 42 },
  { x: 8, y: 58 },
  { x: 20, y: 72 },
  { x: 90, y: 12 },
  { x: 94, y: 34 },
  { x: 82, y: 50 },
  { x: 92, y: 66 },
  { x: 80, y: 82 },
];

const NODE_LINKS = [
  [0, 1], [0, 2], [1, 2], [2, 3], [2, 4], [4, 5], [3, 5],
  [6, 7], [6, 8], [7, 8], [8, 9], [8, 10], [9, 10],
];

export default function ContactSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="contact" className="relative overflow-hidden bg-mist py-24">
      {/* =========================================================
          BACKGROUND — royal + AI motif, kept to the edges
      ========================================================== */}

      <div
        aria-hidden="true"
        className="
          absolute inset-0
          [background:radial-gradient(40%_35%_at_100%_0%,rgba(201,162,39,0.07),transparent_60%),radial-gradient(40%_35%_at_0%_100%,rgba(44,75,176,0.06),transparent_60%)]
        "
      />

      {!shouldReduceMotion && (
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.24]"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="contactNodeLine" x1="0" y1="0" x2="1" y2="1">
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
                key={`contact-link-${i}`}
                x1={nA.x}
                y1={nA.y}
                x2={nB.x}
                y2={nB.y}
                stroke="url(#contactNodeLine)"
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
              key={`contact-node-${i}`}
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
                delay: i * 0.2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </svg>
      )}

      {/* Central signal line — connecting the info column to the form,
          like a message travelling across the section */}
      {!shouldReduceMotion && (
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 hidden h-full w-full opacity-40 lg:block"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <motion.line
            x1="38"
            y1="50"
            x2="62"
            y2="50"
            stroke="url(#contactNodeLine)"
            strokeWidth="0.12"
            strokeDasharray="1.5 2"
            animate={{ strokeDashoffset: [0, -14] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "linear" }}
          />
          <motion.circle
            r="0.6"
            fill="#c9a227"
            animate={{ cx: [38, 62, 38], opacity: [0, 1, 0] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </svg>
      )}

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
            bg-gold-400/[0.07]
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
            bg-royal-500/[0.06]
            blur-[80px]
          "
          animate={{ x: [0, 18, 0], y: [0, -18, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
      )}

      {/* =========================================================
          CONTENT
      ========================================================== */}

      <Container className="relative">
        <SectionHeading
          eyebrow="Contact"
          title="Let's Build Something That Moves Your Business Forward."
        />

        <div className="mt-14 grid gap-10 lg:grid-cols-[1fr_1.3fr]">
          <Reveal>
            <div className="space-y-6">
              <InfoRow icon={Mail} label="Email" value={siteConfig.email} href={mailHref()} />
              <InfoRow icon={Phone} label="Phone" value={siteConfig.phoneDisplay} href={telHref()} />
              <InfoRow icon={MapPin} label="Location" value={siteConfig.location} />
              <InfoRow icon={Clock} label="Business Hours" value={siteConfig.businessHours} />
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <ContactForm />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

function InfoRow({ icon: Icon, label, value, href }) {
  const shouldReduceMotion = useReducedMotion();

  const content = (
    <div className="flex items-start gap-3">
      <div className="relative flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-navy-900 text-gold-300">
        {!shouldReduceMotion && (
          <motion.span
            aria-hidden="true"
            className="absolute inset-0 -m-1 rounded-xl bg-gold-400/25 blur-sm"
            animate={{ opacity: [0.25, 0.6, 0.25], scale: [0.92, 1.08, 0.92] }}
            transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
          />
        )}
        <Icon className="relative h-4 w-4" />
      </div>
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-soft">{label}</p>
        <p className="mt-0.5 text-sm font-medium text-ink">{value}</p>
      </div>
    </div>
  );

  return href ? (
    <a href={href} className="block rounded-xl transition-colors hover:bg-white/60">
      {content}
    </a>
  ) : (
    content
  );
}
