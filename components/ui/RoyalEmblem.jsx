"use client";

import { motion, useReducedMotion } from "motion/react";

/**
 * RoyalEmblem
 * -----------
 * A classic, ornate rotating medallion — ticks, a fleur-de-lis compass,
 * and a diamond ring — meant to sit as a large, faint background accent.
 * Purely decorative (aria-hidden). Drop it behind content in any section
 * for a consistent "royal crest" motif instead of a tech/AI look.
 *
 * Usage:
 *   <div className="relative">
 *     <RoyalEmblem className="absolute -right-40 -top-40 opacity-[0.08]" size={640} />
 *     ...your content...
 *   </div>
 *
 * Props:
 *   size      – px width/height of the emblem (default 560)
 *   reverse   – spins counter-clockwise instead of clockwise
 *   duration  – seconds per full rotation (default 90 — slow & stately)
 *   className – position it (absolute/-right-.., opacity, etc.)
 */
export default function RoyalEmblem({
  size = 560,
  reverse = false,
  duration = 90,
  className = "",
}) {
  const shouldReduceMotion = useReducedMotion();
  const rotate = reverse ? [360, 0] : [0, 360];

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none select-none ${className}`}
      style={{ width: size, height: size }}
    >
      <motion.svg
        viewBox="0 0 200 200"
        width="100%"
        height="100%"
        animate={shouldReduceMotion ? undefined : { rotate }}
        transition={{ duration, repeat: Infinity, ease: "linear" }}
      >
        <defs>
          <linearGradient id="emblemGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f5c451" />
            <stop offset="50%" stopColor="#c9a227" />
            <stop offset="100%" stopColor="#f5c451" />
          </linearGradient>
        </defs>

        {/* Outer clock-style ticks */}
        {Array.from({ length: 36 }).map((_, i) => {
          const angle = (i * 360) / 36;
          const isMajor = i % 3 === 0;
          return (
            <line
              key={`tick-${i}`}
              x1="100"
              y1={isMajor ? "6" : "10"}
              x2="100"
              y2="16"
              stroke="url(#emblemGold)"
              strokeWidth={isMajor ? 1.4 : 0.7}
              strokeLinecap="round"
              opacity={isMajor ? 0.85 : 0.45}
              transform={`rotate(${angle} 100 100)`}
            />
          );
        })}

        {/* Outer ring */}
        <circle
          cx="100"
          cy="100"
          r="88"
          fill="none"
          stroke="url(#emblemGold)"
          strokeWidth="0.6"
          opacity="0.5"
        />

        {/* Diamond ring */}
        {Array.from({ length: 16 }).map((_, i) => {
          const angle = (i * 360) / 16;
          return (
            <rect
              key={`diamond-${i}`}
              x="97"
              y="26"
              width="6"
              height="6"
              fill="url(#emblemGold)"
              opacity="0.55"
              transform={`rotate(${angle} 100 100) rotate(45 100 29)`}
            />
          );
        })}

        {/* Inner ring */}
        <circle
          cx="100"
          cy="100"
          r="60"
          fill="none"
          stroke="url(#emblemGold)"
          strokeWidth="0.5"
          opacity="0.4"
        />

        {/* Fleur-de-lis compass points (N, E, S, W) */}
        {[0, 90, 180, 270].map((angle) => (
          <g
            key={`fleur-${angle}`}
            transform={`rotate(${angle} 100 100)`}
            opacity="0.75"
          >
            <path
              d="M100 34
                 C 96 42, 96 48, 100 52
                 C 104 48, 104 42, 100 34 Z"
              fill="url(#emblemGold)"
            />
            <path
              d="M100 44
                 C 94 46, 90 42, 90 36
                 C 96 36, 100 39, 100 44 Z"
              fill="url(#emblemGold)"
            />
            <path
              d="M100 44
                 C 106 46, 110 42, 110 36
                 C 104 36, 100 39, 100 44 Z"
              fill="url(#emblemGold)"
            />
          </g>
        ))}

        {/* Secondary points (NE, SE, SW, NW) — smaller diamonds */}
        {[45, 135, 225, 315].map((angle) => (
          <rect
            key={`sec-${angle}`}
            x="97"
            y="52"
            width="6"
            height="6"
            fill="url(#emblemGold)"
            opacity="0.45"
            transform={`rotate(${angle} 100 100) rotate(45 100 55)`}
          />
        ))}

        {/* Center seal */}
        <circle
          cx="100"
          cy="100"
          r="14"
          fill="none"
          stroke="url(#emblemGold)"
          strokeWidth="0.8"
          opacity="0.7"
        />
        <circle cx="100" cy="100" r="3" fill="url(#emblemGold)" opacity="0.8" />
      </motion.svg>
    </div>
  );
}
