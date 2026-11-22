"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  motion,
  useMotionTemplate,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { ArrowUpRight } from "lucide-react";
import type { Sector } from "@/data/cms/types";
import type { LedgerStats } from "@/lib/cms";

/**
 * Home sectors carousel — vertical-scroll-driven horizontal slide.
 *
 * The card frame is pinned at the centre of the viewport. As the
 * user scrolls down, an internal track of slides translates
 * horizontally — each slide carries one sector's hero image, name,
 * description, and stats. The frame doesn't move; only the contents
 * slide through it.
 *
 * Mirrors the cadence and a11y of <ServicesScroll />: tabs at the
 * top jump to any sector; the active state flips at midpoints with a
 * hysteresis band so jitter can't toggle rapidly. Per-segment
 * smoothstep gives each slide a brief "dwell" at rest.
 */
export function SectorsScroll({
  sectors,
  sectorStats,
}: {
  sectors: Sector[];
  sectorStats: Record<string, LedgerStats>;
}) {
  const n = sectors.length;
  const [active, setActive] = useState(0);
  const outerRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const prefersReduced = !!useReducedMotion();

  // Keep the active tab visible in the horizontal tab strip.
  useEffect(() => {
    const tabs = tabsRef.current;
    if (!tabs) return;
    const btn = tabs.querySelectorAll<HTMLButtonElement>(".ue-sec-tab")[active];
    if (!btn) return;
    const tabsRect = tabs.getBoundingClientRect();
    const btnRect = btn.getBoundingClientRect();
    if (btnRect.left < tabsRect.left || btnRect.right > tabsRect.right) {
      const centerOffset =
        btnRect.left - tabsRect.left - (tabsRect.width - btnRect.width) / 2;
      tabs.scrollTo({
        left: tabs.scrollLeft + centerOffset,
        behavior: "smooth",
      });
    }
  }, [active]);

  const { scrollYProgress } = useScroll({
    target: outerRef,
    offset: ["start start", "end end"],
  });

  // Horizontal track position (0..n-1). Per-segment dwell + smoothstep
  // so each slide settles briefly before sliding to the next.
  const trackPos = useTransform(scrollYProgress, (v) => {
    if (n <= 1) return 0;
    const scaled = v * (n - 1);
    const idx = Math.min(n - 2, Math.max(0, Math.floor(scaled)));
    const localP = scaled - idx;
    const dwellIn = 0.12;
    const dwellOut = 0.88;
    let eased: number;
    if (localP <= dwellIn) {
      eased = 0;
    } else if (localP >= dwellOut) {
      eased = 1;
    } else {
      const t = (localP - dwellIn) / (dwellOut - dwellIn);
      eased = t * t * (3 - 2 * t);
    }
    return idx + eased;
  });
  const trackPct = useTransform(trackPos, (v) => -v * 100);
  const trackTransform = useMotionTemplate`translate3d(${trackPct}%, 0, 0)`;

  // Progress bar — clean 0..100% across the section.
  const progressPct = useTransform(scrollYProgress, (v) => `${v * 100}%`);

  // Active sector — flips at the midpoint between slides with a
  // hysteresis band so scroll jitter can't toggle state rapidly.
  // 0.48 keeps the tab underline in step with the visible slide
  // (the content crossfade below also pivots at the midpoint).
  useMotionValueEvent(trackPos, "change", (v) => {
    const candidate = Math.min(n - 1, Math.max(0, Math.round(v)));
    setActive((prev) => {
      if (candidate !== prev && Math.abs(v - candidate) < 0.48) {
        return candidate;
      }
      return prev;
    });
  });

  const jumpTo = (i: number) => {
    const el = outerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const start = window.scrollY + rect.top;
    const scrollable = el.scrollHeight - window.innerHeight;
    const denom = Math.max(1, n - 1);
    const v = i === 0 ? 0.02 : i === n - 1 ? 0.98 : i / denom;
    window.scrollTo({
      top: start + v * scrollable,
      behavior: prefersReduced ? "auto" : "smooth",
    });
  };

  return (
    <section className="ue-sec-scroll">
      <div ref={outerRef} className="ue-sec-scroll__outer">
        <div className="ue-sec-scroll__pin">
          <div className="ue-container">
            <div className="ue-sec-scroll__head">
              <p className="ue-eyebrow">Sectors</p>
              <h2 className="ue-h2 ue-sec-scroll__title">
                Nine verticals. One engineering practice.
              </h2>
            </div>

            <nav
              ref={tabsRef}
              className="ue-sec-scroll__tabs"
              aria-label="Sectors"
            >
              {sectors.map((s, i) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => jumpTo(i)}
                  className="ue-sec-tab"
                  data-active={active === i ? "" : undefined}
                >
                  <span className="num">{String(i + 1).padStart(2, "0")}</span>
                  <span className="name">{s.name}</span>
                </button>
              ))}
            </nav>

            {/* The card frame — never moves. Its contents slide. */}
            <div className="ue-sec-scroll__card">
              <div className="ue-sec-scroll__viewport">
                <motion.div
                  className="ue-sec-scroll__track"
                  style={{ transform: trackTransform }}
                >
                  {sectors.map((s, i) => (
                    <Slide
                      key={s.id}
                      sector={s}
                      stats={sectorStats[s.id]}
                      index={i}
                      trackPos={trackPos}
                      prefersReduced={prefersReduced}
                    />
                  ))}
                </motion.div>
              </div>
            </div>

            {/* Bottom progress + small index label */}
            <div className="ue-sec-scroll__progress" aria-hidden>
              <motion.div
                className="ue-sec-scroll__progress-bar"
                style={{ width: progressPct }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * One sector slide. The image rides the track at full opacity. The
 * text block is visible by default — every slide's copy resolves to
 * opacity 1 at rest (whether it's the active slide or parked
 * off-frame, which is also the value on first paint before any
 * scroll has happened). Only the pair of slides actively crossing
 * the frame mid-transition dip briefly as a layered enhancement —
 * never a gate on the base content, so SSR/no-JS/crawler/reduced-
 * motion clients always render full copy at full opacity.
 */
function Slide({
  sector: s,
  stats,
  index,
  trackPos,
  prefersReduced,
}: {
  sector: Sector;
  stats: LedgerStats;
  index: number;
  trackPos: MotionValue<number>;
  prefersReduced: boolean;
}) {
  const contentOpacity = useTransform(trackPos, (v) => {
    if (prefersReduced) return 1;
    const distance = Math.abs(v - index);
    if (distance >= 1) return 1;
    // Gentle bump-down that returns to 1 at both ends of the
    // transition (distance 0 and distance 1) — never a hard cut to 0.
    return 1 - Math.sin(distance * Math.PI) * 0.55;
  });
  const contentY = useTransform(trackPos, (v) => {
    if (prefersReduced) return 0;
    return Math.min(24, Math.abs(v - index) * 48);
  });

  return (
    <div className="ue-sec-scroll__slide">
      <div
        className="ue-sec-scroll__bg"
        style={{
          backgroundImage: s.hero_image_url
            ? `url(${s.hero_image_url})`
            : undefined,
        }}
      />
      <div className="ue-sec-scroll__tint" aria-hidden />
      <motion.div
        className="ue-sec-scroll__content"
        style={{ opacity: contentOpacity, y: contentY }}
      >
        <div className="ue-sec-scroll__meta">
          {String(s.sort_order).padStart(2, "0")} ·{" "}
          {s.deep_page ? "Deep capability" : "Active sector"}
        </div>
        <h3 className="ue-sec-scroll__name">{s.name}</h3>
        <p className="ue-sec-scroll__desc">{s.short_description}</p>
        <dl className="ue-sec-scroll__stats">
          <div>
            <dt>Projects in the track record</dt>
            <dd>{stats.count}</dd>
          </div>
          <div>
            <dt>Cumulative contract value</dt>
            <dd>{stats.total_display}</dd>
          </div>
        </dl>
        <Link href={`/sectors/${s.slug}`} className="ue-sec-scroll__cta">
          Explore sector
          <ArrowUpRight className="size-4" aria-hidden />
        </Link>
      </motion.div>
    </div>
  );
}
