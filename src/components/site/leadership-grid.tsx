"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import type { Leader } from "@/data/cms/types";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Leadership grid — founders + directors, animated on mount.
 *
 * The reveal is an unconditional mount fade (matches the hero blur-in
 * pattern already used in hero-video.tsx): it always resolves within
 * ~1s regardless of scroll position, so it's never a precondition for
 * reading the content. A leader with no portrait_url renders the
 * site's existing quiet "Photography" placeholder (.ue-photo) rather
 * than a broken image or a fabricated face.
 */
export function LeadershipGrid({ leaders }: { leaders: Leader[] }) {
  const prefersReduced = useReducedMotion();
  const noAnim = !!prefersReduced;

  return (
    <div className="ue-firm-leaders" role="list">
      {leaders.map((p, i) => (
        <motion.article
          key={p.id}
          role="listitem"
          className="ue-firm-leaders__card"
          initial={noAnim ? false : { opacity: 0, y: 18 }}
          animate={noAnim ? false : { opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: i * 0.1, ease: EASE }}
        >
          <div className="ue-firm-leaders__portrait">
            {p.portrait_url ? (
              <Image
                src={p.portrait_url}
                alt={p.name}
                fill
                sizes="(max-width: 720px) 100vw, 33vw"
                style={{ objectFit: "cover" }}
              />
            ) : (
              <div
                className="ue-photo ue-photo--4x5"
                style={{ position: "absolute", inset: 0, borderRadius: 0 }}
              />
            )}
          </div>
          <div className="ue-firm-leaders__body">
            <p className="ue-firm-leaders__role">{p.role}</p>
            <h3 className="ue-firm-leaders__name">{p.name}</h3>
            <ul className="ue-firm-leaders__meta">
              <li>{p.credential}</li>
              <li>{p.experience}</li>
            </ul>
            {p.bio && <p className="ue-firm-leaders__bio">{p.bio}</p>}
          </div>
        </motion.article>
      ))}
    </div>
  );
}
