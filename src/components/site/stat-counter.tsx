"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

type StatItem = {
  n: string;
  unit?: string;
  l: string;
};

/**
 * Six-metric headline grid. A single intersection observer on the grid
 * wrapper fires all counters together — otherwise the top row would
 * start animating before the bottom row had even scrolled into view.
 *
 * Prefix ("₹") shares the number's font, size and colour — suffix units
 * ("Cr", "days") stay small and muted, matching typical financial setting.
 */
export function StatsGrid({ items, children }: { items: StatItem[]; children?: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });
  const prefersReduced = useReducedMotion();

  return (
    <div ref={ref} className="ue-overview__grid">
      {items.map((s) => (
        <StatCounter key={s.l} n={s.n} unit={s.unit} l={s.l} start={inView} reduce={!!prefersReduced} />
      ))}
      {children}
    </div>
  );
}

function StatCounter({
  n,
  unit,
  l,
  start,
  reduce,
}: StatItem & { start: boolean; reduce: boolean }) {
  const target = parseFloat(n.replace(/,/g, ""));
  // Always rest at the real value — this is what SSR/no-JS clients and
  // crawlers see permanently. useReducedMotion() returns null on the
  // server, so gating the initial state on `reduce` used to render the
  // literal string "0" for every visitor until client JS hydrated and
  // the element scrolled into view. The count-up below is a client-only
  // enhancement layered on top of an already-correct rest state.
  const [display, setDisplay] = useState(n);

  useEffect(() => {
    if (!start || reduce) return;
    const controls = animate(0, target, {
      duration: 0.9,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(Math.round(v).toLocaleString("en-IN")),
      onComplete: () => setDisplay(n),
    });
    return () => controls.stop();
  }, [start, reduce, target, n]);

  const hasRupee = unit?.startsWith("₹");
  const post = hasRupee ? unit!.slice(2).trim() : unit?.trim();

  return (
    <div className="ue-stat ue-overview__stat">
      <div className="n">
        {hasRupee && <span className="ue-overview__unit--pre">₹</span>}
        {display}
        {post && <span className="ue-overview__unit"> {post}</span>}
      </div>
      <div className="l">{l}</div>
    </div>
  );
}
