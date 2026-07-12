"use client";

import { motion, useReducedMotion } from "motion/react";

const EASE = [0.16, 1, 0.3, 1] as const;

type Value = { title: string; body: string };

/**
 * Four core-value cards with a mount-triggered stagger fade — the same
 * unconditional entrance pattern as the home hero blur-in (hero-video.tsx):
 * it always resolves within ~1s of mount, so it is never a precondition
 * for reading the cards.
 */
export function FirmValuesCards({ values }: { values: Value[] }) {
  const prefersReduced = useReducedMotion();
  const noAnim = !!prefersReduced;

  return (
    <div className="ue-firm-values">
      {values.map((v, i) => (
        <motion.div
          key={v.title}
          className="ue-firm-values__card"
          initial={noAnim ? false : { opacity: 0, y: 14 }}
          animate={noAnim ? false : { opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: i * 0.08, ease: EASE }}
        >
          <h3 className="ue-firm-values__title">{v.title}</h3>
          <p className="ue-firm-values__body">{v.body}</p>
        </motion.div>
      ))}
    </div>
  );
}
