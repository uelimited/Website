"use client";

import { motion, useTransform, type MotionValue } from "motion/react";

type Props = {
  images: string[];
  label: string;
  progress: MotionValue<number>;
};

/**
 * Vertical image stack that scrolls within the card. The card acts
 * as a fixed-size viewport; the track inside stacks N images, each
 * sized to fill the card. As the service's local scroll progress
 * advances 0 → 1, the track translates upward so each image takes
 * its turn in view.
 */
export function ServiceImageStack({ images, label, progress }: Props) {
  const count = Math.max(1, images.length);
  const endPct = count > 1 ? -((count - 1) / count) * 100 : 0;
  const y = useTransform(progress, [0, 1], ["0%", `${endPct}%`]);

  return (
    <div className="ue-svc-images">
      <motion.div
        className="ue-svc-images__track"
        style={{ y, height: `${count * 100}%` }}
      >
        {images.map((src, i) => (
          <div
            key={src}
            className="ue-svc-images__slide"
            style={{ height: `${100 / count}%` }}
          >
            <img
              src={src}
              alt={`${label} — ${i + 1}`}
              loading="lazy"
              draggable={false}
            />
            <div className="ue-svc-images__tint" aria-hidden />
          </div>
        ))}
      </motion.div>
    </div>
  );
}
