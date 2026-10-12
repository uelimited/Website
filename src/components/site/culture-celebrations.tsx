"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowRight } from "lucide-react";

type Celebration = {
  title: string;
  body: string;
  image: string;
  imageAlt: string;
};

export function CultureCelebrations({
  celebrations,
}: {
  celebrations: Celebration[];
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();
  const activeCelebration = celebrations[activeIndex];

  if (!activeCelebration) return null;

  return (
    <div className="ue-culture-celebrations">
      <ul className="ue-culture-celebrations__list">
        {celebrations.map((celebration, index) => (
          <li key={celebration.title}>
            <button
              type="button"
              className="ue-culture-celebration-item"
              data-active={activeIndex === index ? "" : undefined}
              aria-pressed={activeIndex === index}
              aria-controls="culture-celebration-preview"
              onMouseEnter={() => setActiveIndex(index)}
              onFocus={() => setActiveIndex(index)}
              onClick={() => setActiveIndex(index)}
            >
              <span
                className="ue-culture-celebration-item__media"
                aria-hidden="true"
                style={{ backgroundImage: `url(${celebration.image})` }}
              />
              <span className="ue-culture-celebration-no">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="ue-culture-celebration-item__body">
                <span className="ue-culture-celebration-item__title">
                  {celebration.title}
                  <ArrowRight aria-hidden="true" />
                </span>
                <span className="ue-culture-celebration-item__description">
                  {celebration.body}
                </span>
              </span>
            </button>
          </li>
        ))}
      </ul>

      <div
        id="culture-celebration-preview"
        className="ue-culture-celebrations__preview"
        aria-hidden="true"
      >
        <div className="ue-culture-celebrations__frame">
          <AnimatePresence initial={false}>
            <motion.div
              key={activeCelebration.image}
              className="ue-culture-celebrations__image"
              initial={
                prefersReducedMotion
                  ? { opacity: 0 }
                  : { opacity: 0, scale: 1.05 }
              }
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              style={{
                backgroundImage: `url(${activeCelebration.image})`,
              }}
            />
          </AnimatePresence>
          <div className="ue-culture-celebrations__tint" />
          <AnimatePresence initial={false} mode="wait">
            <motion.div
              key={activeCelebration.title}
              className="ue-culture-celebrations__caption"
              initial={
                prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 8 }
              }
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.25 }}
            >
              <p>{activeCelebration.title}</p>
              <span>{activeCelebration.imageAlt}</span>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
