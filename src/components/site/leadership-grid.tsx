"use client";

import { motion, useReducedMotion } from "motion/react";
import type { Leader } from "@/data/cms/types";

const EASE = [0.16, 1, 0.3, 1] as const;

function getLeaderInitials(name: string) {
  const nameParts = name.trim().split(/\s+/).filter(Boolean);
  const firstInitial = nameParts[0]?.[0] ?? "";
  const lastInitial =
    nameParts.length > 1
      ? (nameParts.at(-1)?.[0] ?? "")
      : (nameParts[0]?.[1] ?? "");

  return `${firstInitial}${lastInitial}`.toUpperCase();
}

/**
 * Leadership grid — founders + directors, animated on mount.
 *
 * The reveal is an unconditional mount fade (matches the hero blur-in
 * pattern already used in hero-video.tsx): it always resolves within
 * ~1s regardless of scroll position, so it's never a precondition for
 * reading the content. Portraits display initials rather than photos.
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
          whileHover={noAnim ? undefined : { y: -4 }}
          transition={{ duration: 0.6, delay: i * 0.1, ease: EASE }}
        >
          <div className="ue-firm-leaders__portrait" aria-hidden="true">
            <span className="ue-firm-leaders__index">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="ue-firm-leaders__initials">
              {getLeaderInitials(p.name)}
            </span>
          </div>
          <div className="ue-firm-leaders__body">
            <p className="ue-firm-leaders__role">{p.role}</p>
            <h3 className="ue-firm-leaders__name">{p.name}</h3>
            <ul className="ue-firm-leaders__meta">
              <li>{p.credential}</li>
              <li>{p.experience}</li>
            </ul>
            {p.bio && <p className="ue-firm-leaders__bio">{p.bio}</p>}
            {p.responsibilities && p.responsibilities.length > 0 && (
              <div className="ue-firm-leaders__responsibilities">
                <p>Responsibilities</p>
                <ul>
                  {p.responsibilities.map((responsibility) => (
                    <li key={responsibility}>{responsibility}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </motion.article>
      ))}
    </div>
  );
}
