"use client";

import { motion, useReducedMotion } from "motion/react";
import { FIRM, HERO, HERO_VIDEO, YEARS_IN_PRACTICE } from "@/data/firm";

/**
 * Home hero — tall rounded video card with overlaid title & subtitle.
 *
 *   ┌────────────────────────────────────┐
 *   │  [live-site badge]                 │
 *   │                                    │
 *   │          (video plays)             │
 *   │                                    │
 *   │  Design-build MEPF · since 1990    │
 *   │  Unique Engineers.    (animated)   │
 *   │  Engineered to specification.      │
 *   │  [UE · 1990 · MEPF …] mono row     │
 *   └────────────────────────────────────┘
 */
export function HeroVideo() {
  const prefersReduced = useReducedMotion();
  const noAnim = !!prefersReduced;

  const ease = [0.22, 1, 0.36, 1] as const;

  return (
    <section className="ue-hero-v2">
      <div className="ue-container">
        <motion.div
          className="ue-hero-v2__card"
          initial={noAnim ? false : { opacity: 0, scale: 0.98, y: 20 }}
          animate={noAnim ? false : { opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, ease }}
        >
          {HERO_VIDEO.src ? (
            <video
              className="ue-hero-v2__video"
              src={HERO_VIDEO.src}
              poster={HERO_VIDEO.poster || undefined}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
            />
          ) : (
            <HeroFallback />
          )}

          {/* Scrim — ensures overlay text reads against any frame */}
          <div className="ue-hero-v2__scrim" aria-hidden />

          {/* Live badge, top-right */}
          <div className="ue-hero-v2__badge" aria-hidden>
            <span className="ue-hero-v2__live" /> Live site —{" "}
            {YEARS_IN_PRACTICE}+ yrs
          </div>

          {/* Overlay caption — bottom-left, headline-as-video-credit */}
          <div className="ue-hero-v2__overlay">
            <motion.p
              className="ue-eyebrow ue-hero-v2__eyebrow"
              initial={noAnim ? false : { opacity: 0, y: 10 }}
              animate={noAnim ? false : { opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5, ease }}
            >
              Design-build MEPF · since {FIRM.foundedYear}
            </motion.p>

            <motion.h1
              className="ue-h1 ue-h1--huge ue-hero-v2__title"
              initial={
                noAnim ? false : { opacity: 0, y: 40, filter: "blur(10px)" }
              }
              animate={
                noAnim ? false : { opacity: 1, y: 0, filter: "blur(0px)" }
              }
              transition={{ duration: 1.1, delay: 0.6, ease }}
            >
              {HERO.title}
              <motion.span
                className="ue-hero-v2__dot"
                initial={noAnim ? false : { opacity: 0, scale: 0.2 }}
                animate={noAnim ? false : { opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1.2, ease }}
              >
                .
              </motion.span>
            </motion.h1>

            <motion.p
              className="ue-hero-v2__subtitle"
              initial={noAnim ? false : { opacity: 0, y: 20 }}
              animate={noAnim ? false : { opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 1.0, ease }}
            >
              {HERO.subtitle}
            </motion.p>

            <motion.div
              className="ue-hero-v2__meta"
              initial={noAnim ? false : { opacity: 0 }}
              animate={noAnim ? false : { opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.4, ease }}
              aria-hidden
            >
              <span>UE · {FIRM.foundedYear}</span>
              <span className="dot">·</span>
              <span>MEPF · IBMS · Civil</span>
              <span className="dot">·</span>
              <span>Gurugram</span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function HeroFallback() {
  return (
    <div className="ue-hero-v2__fallback">
      <svg
        viewBox="0 0 1200 800"
        preserveAspectRatio="xMidYMid slice"
        className="ue-hero-v2__fallback-svg"
      >
        <defs>
          <radialGradient id="ueHeroGlow" cx="70%" cy="30%" r="60%">
            <stop offset="0%" stopColor="rgba(59,111,224,0.28)" />
            <stop offset="100%" stopColor="rgba(59,111,224,0)" />
          </radialGradient>
        </defs>
        <rect width="1200" height="800" fill="url(#ueHeroGlow)" />
        <motion.g
          style={{ transformOrigin: "860px 340px" }}
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        >
          {[0, 60, 120, 180, 240, 300].map((a) => (
            <line
              key={a}
              x1={860}
              y1={340}
              x2={860 + 80 * Math.cos((a * Math.PI) / 180)}
              y2={340 + 80 * Math.sin((a * Math.PI) / 180)}
              stroke="rgba(255,255,255,0.16)"
              strokeWidth={1}
              strokeLinecap="round"
            />
          ))}
        </motion.g>
      </svg>
    </div>
  );
}
