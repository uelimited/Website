"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowRight } from "lucide-react";

export type ExplorerService = {
  slug: string;
  num: string;
  name: string;
  blurb: string;
  tagline: string;
  hero_image_url: string | null;
  /** Live "N projects · ₹X Cr" proof line — omitted when the sample is too thin to be meaningful. */
  proof?: string | null;
  /** Flags the founding discipline (HVAC) for a quiet prominence cue. */
  founding?: boolean;
};

/**
 * Services index explorer — Apple-style interactive list.
 *
 * Left: the eight disciplines set in large display type, each with a
 * live ledger proof number where the sample size earns it. Hovering
 * (or focusing) a row previews it on the right — the image
 * crossfades with a gentle settle-scale, and the caption swaps to
 * that discipline's tagline. Clicking goes to the discipline page.
 *
 * The founding discipline (HVAC) opens active by default, so it's
 * the first thing visitors see previewed.
 *
 * Below the desktop breakpoint the preview pane disappears and each
 * row becomes a self-contained image card.
 */
export function ServicesExplorer({
  services,
}: {
  services: ExplorerService[];
}) {
  const foundingIndex = services.findIndex((s) => s.founding);
  const [active, setActive] = useState(foundingIndex >= 0 ? foundingIndex : 0);
  const prefersReduced = useReducedMotion();
  const current = services[active];

  return (
    <div className="ue-svcx">
      <ul className="ue-svcx__list">
        {services.map((s, i) => (
          <li key={s.slug}>
            <Link
              href={`/services/${s.slug}`}
              className="ue-svcx__row"
              data-active={active === i ? "" : undefined}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
            >
              {/* Mobile-only card image; hidden on desktop */}
              <span
                className="ue-svcx__row-media"
                aria-hidden
                style={{
                  backgroundImage: s.hero_image_url
                    ? `url(${s.hero_image_url})`
                    : undefined,
                }}
              />
              <span className="ue-svcx__row-num">{s.num}</span>
              <span className="ue-svcx__row-body">
                <span className="ue-svcx__row-name">
                  {s.name}
                  {s.founding && (
                    <span className="ue-chip ue-chip--accent">
                      Founding discipline · 1990
                    </span>
                  )}
                  <ArrowRight className="ue-svcx__row-arrow" aria-hidden />
                </span>
                {s.proof && (
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 12,
                      letterSpacing: "0.01em",
                      color: "var(--ink-500)",
                    }}
                  >
                    {s.proof}
                  </span>
                )}
                <span className="ue-svcx__row-tagline">{s.tagline}</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <div className="ue-svcx__preview" aria-hidden>
        <div className="ue-svcx__frame">
          <AnimatePresence initial={false}>
            <motion.div
              key={current.slug}
              className="ue-svcx__img"
              initial={
                prefersReduced ? { opacity: 0 } : { opacity: 0, scale: 1.06 }
              }
              animate={{
                opacity: 1,
                scale: 1,
                transition: {
                  opacity: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
                  scale: { duration: 1.1, ease: [0.22, 1, 0.36, 1] },
                },
              }}
              exit={{
                opacity: 0,
                transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
              }}
              style={{
                backgroundImage: current.hero_image_url
                  ? `url(${current.hero_image_url})`
                  : undefined,
              }}
            />
          </AnimatePresence>
          <div className="ue-svcx__frame-tint" />
          <AnimatePresence initial={false} mode="wait">
            <motion.div
              key={current.slug}
              className="ue-svcx__caption"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="ue-svcx__caption-tagline">{current.tagline}</p>
              <p className="ue-svcx__caption-blurb">
                {current.blurb}
                {current.proof && (
                  <>
                    {" "}
                    <span style={{ color: "rgba(255,255,255,0.95)" }}>
                      {current.proof}
                    </span>
                  </>
                )}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
