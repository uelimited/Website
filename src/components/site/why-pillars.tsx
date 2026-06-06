"use client";

import { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { PILLARS } from "@/data/firm";

/**
 * "Why Unique" — pinned split layout.
 *
 * Outer wrapper is `N * 100vh` tall. Left pane shows the currently
 * active pillar's title, lead and metric list (crossfaded on change).
 * Right pane is a vertical list of all pillars — each item has a
 * scroll-linked fill that grows across its segment so there's
 * continuous feedback as the user scrolls, even between active-state
 * changes. A small hysteresis keeps the active index from flickering
 * at segment boundaries.
 */
export function WhyPillars() {
  const n = PILLARS.length;
  const [active, setActive] = useState(0);
  const outerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: outerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const scaled = v * n;
    const guard = 0.08;
    setActive((prev) => {
      if (scaled > prev + 1 - guard) return Math.min(n - 1, Math.floor(scaled));
      if (scaled < prev + guard) return Math.max(0, Math.floor(scaled));
      return prev;
    });
  });

  const jumpTo = (i: number) => {
    const el = outerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const start = window.scrollY + rect.top;
    const scrollable = el.scrollHeight - window.innerHeight;
    // Land slightly inside the segment so the active state resolves to i.
    const target = start + ((i + 0.25) / n) * scrollable;
    window.scrollTo({ top: target, behavior: "smooth" });
  };

  const current = PILLARS[active];

  return (
    <section className="ue-why">
      <div ref={outerRef} className="ue-why__outer">
        <div className="ue-why__pin">
          <div className="ue-container">
            <div className="ue-why__head">
              <p className="ue-eyebrow">Why Unique</p>
              <h2 className="ue-h2 ue-why__title">Four pillars of practice.</h2>
              <p className="ue-why__kicker">
                A single delivery standard, measured by what is verified — not
                what is claimed.
              </p>
            </div>

            <div className="ue-why__layout">
              <aside className="ue-why__list" aria-label="Pillars">
                {PILLARS.map((p, i) => (
                  <ListItem
                    key={p.num}
                    index={i}
                    total={n}
                    num={p.num}
                    title={p.title}
                    active={active === i}
                    progress={scrollYProgress}
                    onClick={() => jumpTo(i)}
                  />
                ))}
              </aside>

              <div className="ue-why__content">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={current.num}
                    className="ue-why__content-inner"
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <span className="ue-why__content-num">
                      {current.num} / 04
                    </span>
                    <p className="ue-why__content-lead">{current.lead}</p>
                    <ul className="ue-why__content-points">
                      {current.points.map((pt) => (
                        <li key={pt.l}>
                          <div className="k">{pt.k}</div>
                          <div className="l">{pt.l}</div>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile: static stack — sticky scroll isn't useful below the
          breakpoint, so render every pillar in document flow. */}
      <div className="ue-why__mobile">
        {PILLARS.map((p) => (
          <article key={p.num} className="ue-why__mobile-card">
            <span className="ue-why__content-num">{p.num} / 04</span>
            <h3 className="ue-why__content-title">{p.title}</h3>
            <p className="ue-why__content-lead">{p.lead}</p>
            <ul className="ue-why__content-points">
              {p.points.map((pt) => (
                <li key={pt.l}>
                  <div className="k">{pt.k}</div>
                  <div className="l">{pt.l}</div>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}

function ListItem({
  index,
  total,
  num,
  title,
  active,
  progress,
  onClick,
}: {
  index: number;
  total: number;
  num: string;
  title: string;
  active: boolean;
  progress: MotionValue<number>;
  onClick: () => void;
}) {
  // Fill grows 0 → 1 as scroll crosses this item's segment. Items
  // past the active one read 1; items before read 0.
  const fill = useTransform(progress, (v) => {
    const scaled = v * total;
    if (scaled <= index) return 0;
    if (scaled >= index + 1) return 1;
    return scaled - index;
  });
  return (
    <button
      type="button"
      onClick={onClick}
      className="ue-why__list-item"
      data-active={active ? "" : undefined}
    >
      <span className="ue-why__list-track" aria-hidden>
        <motion.span className="ue-why__list-fill" style={{ scaleY: fill }} />
      </span>
      <span className="ue-why__list-body">
        <span className="num">{num}</span>
        <span className="title">{title}</span>
      </span>
    </button>
  );
}
