"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import {
  motion,
  useMotionTemplate,
  useMotionValueEvent,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { ArrowUpRight } from "lucide-react";
import sectorsJson from "@/data/cms/sectors.json";
import type { Sector } from "@/data/cms/types";

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
export function SectorsScroll() {
  const sectors = useMemo(
    () =>
      (sectorsJson as Sector[])
        .filter((s) => s.published)
        .slice()
        .sort((a, b) => a.sort_order - b.sort_order),
    [],
  );

  const n = sectors.length;
  const [active, setActive] = useState(0);
  const outerRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);

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
    window.scrollTo({ top: start + v * scrollable, behavior: "smooth" });
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
                    <Slide key={s.id} sector={s} index={i} trackPos={trackPos} />
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
 * One sector slide. The image rides the track at full opacity, but
 * the text block crossfades on its distance from centre — so copy
 * from a neighbouring slide never bleeds half-clipped into the card
 * frame while a transition is in flight.
 */
function Slide({
  sector: s,
  index,
  trackPos,
}: {
  sector: Sector;
  index: number;
  trackPos: MotionValue<number>;
}) {
  // 1 at rest, → 0 by the transition midpoint.
  const contentOpacity = useTransform(trackPos, (v) =>
    Math.max(0, 1 - Math.abs(v - index) * 2),
  );
  const contentY = useTransform(trackPos, (v) =>
    Math.min(24, Math.abs(v - index) * 48),
  );

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
            <dt>Projects</dt>
            <dd>{s.projects_count_override ?? "—"}</dd>
          </div>
          <div>
            <dt>Cumulative revenue</dt>
            <dd>{s.revenue_cr_override ?? "—"}</dd>
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
