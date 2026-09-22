"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { Mail, Phone, MapPin, Sparkles } from "lucide-react";
import Container from "@/components/ui/Container";
import Logo from "@/components/ui/Logo";
import { footerColumns } from "@/data/nav";
import { services } from "@/data/services";
import { siteConfig, mailHref, telHref } from "@/lib/config";

// AI neural-network style nodes (percentage positions on a 0-100 grid)
const NODES = [
  { x: 4, y: 20 },
  { x: 14, y: 8 },
  { x: 24, y: 30 },
  { x: 10, y: 46 },
  { x: 38, y: 14 },
  { x: 46, y: 36 },
  { x: 58, y: 10 },
  { x: 66, y: 32 },
  { x: 78, y: 18 },
  { x: 88, y: 40 },
  { x: 96, y: 14 },
  { x: 30, y: 60 },
  { x: 70, y: 55 },
];

const NODE_LINKS = [
  [0, 1], [1, 2], [0, 3], [2, 3], [2, 4], [4, 5], [5, 6],
  [6, 7], [7, 8], [8, 9], [9, 10], [5, 11], [7, 12], [11, 12],
];

export default function Footer() {
  const shouldReduceMotion = useReducedMotion();
  const year = new Date().getFullYear();
  const serviceLinks = services
    .filter((service) => service.slug)
    .map((service) => ({ label: service.title, href: `/services/${service.slug}` }));
  const columns = [
    footerColumns.find((column) => column.title === "Company"),
    { title: "Services", links: serviceLinks },
    footerColumns.find((column) => column.title === "Resources"),
  ];

  return (
    <footer className="relative overflow-hidden border-t border-line-dark bg-navy-950 text-white/70">
      {/* Top shimmer line — royal seam between page and footer */}
      {!shouldReduceMotion && (
        <motion.div
          aria-hidden="true"
          className="
            absolute
            inset-x-0
            top-0
            h-px
            bg-gradient-to-r
            from-transparent
            via-gold-300
            to-transparent
          "
          animate={{ opacity: [0.3, 1, 0.3], x: ["-15%", "15%", "-15%"] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
      )}

      {/* Royal corner ornaments */}
      <div
        aria-hidden="true"
        className="absolute left-6 top-6 h-8 w-8 border-l border-t border-gold-300/20 sm:left-10 sm:top-8"
      />
      <div
        aria-hidden="true"
        className="absolute right-6 top-6 h-8 w-8 border-r border-t border-gold-300/20 sm:right-10 sm:top-8"
      />

      {/* =========================================================
          BACKGROUND — royal + AI motif (dark)
      ========================================================== */}

      <div
        aria-hidden="true"
        className="
          absolute inset-0
          [background:radial-gradient(45%_50%_at_15%_0%,rgba(44,75,176,0.18),transparent_60%),radial-gradient(35%_35%_at_100%_100%,rgba(201,162,39,0.1),transparent_60%)]
        "
      />

      {!shouldReduceMotion && (
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.35]"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="footerNodeLine" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#f5c451" stopOpacity="0.6" />
              <stop offset="50%" stopColor="#818cf8" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#f5c451" stopOpacity="0.6" />
            </linearGradient>
          </defs>

          {NODE_LINKS.map(([a, b], i) => {
            const nA = NODES[a];
            const nB = NODES[b];
            return (
              <motion.line
                key={`footer-link-${i}`}
                x1={nA.x}
                y1={nA.y}
                x2={nB.x}
                y2={nB.y}
                stroke="url(#footerNodeLine)"
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
              key={`footer-node-${i}`}
              cx={n.x}
              cy={n.y}
              r="0.4"
              fill={i % 3 === 0 ? "#f5c451" : "#a5b4fc"}
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
            -left-24
            top-0
            h-[20rem]
            w-[20rem]
            rounded-full
            bg-royal-500/[0.12]
            blur-[90px]
          "
          animate={{ x: [0, 20, 0], y: [0, 20, 0] }}
          transition={{ duration: 17, repeat: Infinity, ease: "easeInOut" }}
        />
      )}

      {!shouldReduceMotion && (
        <motion.div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            -right-24
            bottom-0
            h-[18rem]
            w-[18rem]
            rounded-full
            bg-gold-400/[0.08]
            blur-[90px]
          "
          animate={{ x: [0, -20, 0], y: [0, -15, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
      )}

      {/* =========================================================
          CONTENT
      ========================================================== */}

      <Container className="relative grid gap-12 py-16 lg:grid-cols-[1.4fr_2fr]">
        <div className="relative lg:pr-12">
          {/* Vertical gold divider — visible on large screens only */}
          <span
            aria-hidden="true"
            className="absolute -right-6 top-0 hidden h-full w-px bg-gradient-to-b from-transparent via-gold-300/25 to-transparent lg:block"
          />

          <Link href="/" className="inline-flex items-center">
            <Logo height={48} />
          </Link>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/60">
            {siteConfig.description}
          </p>
          <div className="mt-6 space-y-2 text-sm">
            <a href={mailHref()} className="flex items-center gap-2 hover:text-gold-300">
              <Mail className="h-4 w-4" /> {siteConfig.email}
            </a>
            <a href={telHref()} className="flex items-center gap-2 hover:text-gold-300">
              <Phone className="h-4 w-4" /> {siteConfig.phoneDisplay}
            </a>
            {/* <span className="flex items-center gap-2">
              <MapPin className="h-4 w-4" /> {siteConfig.location}
            </span> */}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
          {columns.map((column) => (
            <div key={column.title}>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-white">
                {column.title}
              </h3>
              <span
                aria-hidden="true"
                className="mt-2 block h-px w-6 bg-gradient-to-r from-gold-300 to-transparent"
              />
              <ul className="mt-4 space-y-3 text-sm">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="hover:text-gold-300">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>

      <div className="relative border-t border-line-dark">
        <Container className="flex flex-col items-center justify-between gap-4 py-6 text-xs text-white/50 sm:flex-row">
          <p className="flex items-center gap-2">
            © {year} {siteConfig.businessName}. All rights reserved.
          </p>

          <div className="flex flex-col items-center gap-4 sm:flex-row">
            {/* Redesigned developer credit — a small glowing gold badge */}
            <span
              className="
                group
                relative
                inline-flex
                items-center
                gap-1.5
                overflow-hidden
                rounded-full
                border
                border-gold-300/20
                bg-white/[0.04]
                px-3
                py-1.5
                text-white/60
              "
            >
              {!shouldReduceMotion && (
                <motion.span
                  aria-hidden="true"
                  className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-gold-200/15 to-transparent"
                  animate={{ x: ["-100%", "200%"] }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    repeatDelay: 3,
                    ease: "easeInOut",
                  }}
                />
              )}
              <Sparkles className="relative z-10 h-3 w-3 flex-shrink-0 text-gold-300" />
              <span className="relative z-10 whitespace-nowrap">
  Developed by{" "}
  <motion.span
    className="font-display text-sm font-bold tracking-wider"
    style={{
      backgroundImage:
        "linear-gradient(to right, #fff6d8, #f5c451, #c9a227, #f5c451, #fff6d8)",
      backgroundSize: "200% auto",
      WebkitBackgroundClip: "text",
      backgroundClip: "text",
      WebkitTextFillColor: "transparent",
      color: "transparent",
      textShadow: "0 0 10px rgba(245,196,81,0.55), 0 0 22px rgba(245,196,81,0.25)",
    }}
    animate={
      shouldReduceMotion
        ? undefined
        : { backgroundPosition: ["0% center", "200% center"] }
    }
    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
  >
    Shyam &amp; Rahul
  </motion.span>
</span>
            </span>

            <span
              aria-hidden="true"
              className="hidden h-1.5 w-1.5 rotate-45 bg-gold-300/40 sm:block"
            />

            <div className="flex gap-4">
              <Link href="/privacy-policy" className="hover:text-gold-300">
                Privacy Policy
              </Link>
              <Link href="/terms-and-conditions" className="hover:text-gold-300">
                Terms &amp; Conditions
              </Link>
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
}
