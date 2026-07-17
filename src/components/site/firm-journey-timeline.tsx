"use client";

import { useRef, useState } from "react";
import { motion, useReducedMotion, useScroll } from "motion/react";
import type { JourneyMilestone } from "@/data/cms/types";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Firm journey timeline — the /firm centerpiece scrollytelling moment.
 *
 * All ten milestones render in normal document flow at full opacity —
 * nothing is gated behind a viewport trigger. The signature motion is a
 * scroll-driven fill on the connecting rail (permitted per the v2 build
 * spec's animation principle) plus a per-item accent state that lights
 * up the year/dot as the reader scrolls past — decoration only, never a
 * precondition for reading the milestone text.
 */
export function FirmJourneyTimeline({
  milestones,
}: {
  milestones: JourneyMilestone[];
}) {
  const railRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: railRef,
    offset: ["start 0.75", "end 0.4"],
  });

  return (
    <section
      className="ue-firm-timeline"
      aria-labelledby="firm-timeline-heading"
    >
      <div className="ue-container">
        <header className="ue-firm-timeline__head">
          <p className="ue-eyebrow">The journey</p>
          <h2
            id="firm-timeline-heading"
            className="ue-h2 ue-firm-timeline__title"
          >
            Thirty-five years, ten inflection points.
          </h2>
          <p className="ue-firm-timeline__kicker">
            From a specialist HVAC contractor in 1990 to a multi-discipline EPC
            firm executing data centre and semiconductor mandates today.
          </p>
        </header>

        <div className="ue-firm-timeline__rail" ref={railRef}>
          <div className="ue-firm-timeline__track" aria-hidden="true">
            <motion.div
              className="ue-firm-timeline__fill"
              style={{ scaleY: prefersReduced ? 1 : scrollYProgress }}
            />
          </div>
          <ol className="ue-firm-timeline__list">
            {milestones.map((m, i) => (
              <TimelineItem
                key={m.id}
                milestone={m}
                index={i}
                reduced={!!prefersReduced}
              />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

function TimelineItem({
  milestone,
  index,
  reduced,
}: {
  milestone: JourneyMilestone;
  index: number;
  reduced: boolean;
}) {
  const [active, setActive] = useState(false);

  return (
    <motion.li
      className="ue-firm-timeline__item"
      data-active={active ? "true" : undefined}
      initial={reduced ? false : { y: 22 }}
      whileInView={reduced ? undefined : { y: 0 }}
      viewport={{ once: true, margin: "-12% 0px -12% 0px" }}
      onViewportEnter={() => setActive(true)}
      transition={{
        duration: 0.5,
        ease: EASE,
        delay: Math.min(index, 4) * 0.03,
      }}
    >
      <span className="ue-firm-timeline__dot" aria-hidden="true" />
      <div className="ue-firm-timeline__year">{milestone.year}</div>
      <div className="ue-firm-timeline__body">
        <p className="ue-firm-timeline__label">{milestone.title}</p>
        <p className="ue-firm-timeline__desc">{milestone.description}</p>
      </div>
    </motion.li>
  );
}
