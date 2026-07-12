"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import type { Office } from "@/data/cms/types";

const EASE = [0.16, 1, 0.3, 1] as const;
const NEIGHBOURS = ["Bangladesh", "Nepal", "Maldives"];

/**
 * State-centroid coordinates lifted directly from /public/india.svg's own
 * <g id="label_points"> group (viewBox 0 0 1000 1000), converted to a
 * 0–100% stage so office markers land on the correct state without any
 * external lat/lng projection. Only the states Unique Engineers has an
 * office in are needed here.
 */
const OFFICE_STATE_POSITION: Record<string, { x: number; y: number }> = {
  Haryana: { x: 32.3, y: 30.52 },
  Gujarat: { x: 19.92, y: 48.1 },
  Maharashtra: { x: 30.57, y: 59.79 },
  Telangana: { x: 39.67, y: 64.19 },
  Karnataka: { x: 30.21, y: 72.81 },
  "West Bengal": { x: 63.71, y: 48.58 },
};

/**
 * Pan-India presence — the india.svg outline as a backdrop (the same
 * proven <Image> technique already used in contact-cta.tsx) with real
 * office markers overlaid at their state's centroid, plus a chip cloud
 * of every state the ledger shows an executed project in. All text
 * content (office names, cities, states executed) renders in normal
 * flow at full opacity; only the marker dots pulse/scale in as
 * decoration.
 */
export function FirmPresenceMap({
  offices,
  statesExecuted,
}: {
  offices: Office[];
  statesExecuted: string[];
}) {
  const prefersReduced = useReducedMotion();
  const noAnim = !!prefersReduced;

  const markers = offices
    .map((o) => {
      const pos = o.state ? OFFICE_STATE_POSITION[o.state] : undefined;
      return pos ? { office: o, pos } : null;
    })
    .filter((m): m is { office: Office; pos: { x: number; y: number } } => Boolean(m));

  return (
    <div className="ue-firm-map__layout">
      <div className="ue-firm-map__stage">
        <Image
          src="/india.svg"
          alt="Map of India — Unique Engineers' area of operation"
          width={1000}
          height={1000}
          className="ue-firm-map__svg"
          priority={false}
          unoptimized
        />
        <ul className="ue-firm-map__markers" aria-label="Office locations">
          {markers.map(({ office, pos }, i) => (
            <li
              key={office.id}
              className="ue-firm-map__marker"
              data-hq={office.is_hq ? "true" : undefined}
              style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
            >
              <motion.span
                className="ue-firm-map__marker-dot"
                aria-hidden="true"
                initial={noAnim ? false : { scale: 0.4 }}
                whileInView={noAnim ? undefined : { scale: 1 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: EASE }}
              >
                {office.is_hq && <span className="ue-firm-map__marker-pulse" aria-hidden="true" />}
              </motion.span>
              <span className="ue-firm-map__marker-label">
                {office.city}
                {office.is_hq && <span className="ue-firm-map__marker-tag">HQ</span>}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="ue-firm-map__side">
        <ul className="ue-firm-map__offices">
          {offices.map((o) => (
            <li key={o.id} className="ue-firm-map__office">
              <span className="ue-firm-map__office-kind">
                {o.is_hq ? "Headquarters" : "Regional office"}
              </span>
              <span className="ue-firm-map__office-city">{o.city}</span>
              {o.state && <span className="ue-firm-map__office-state">{o.state}</span>}
              {o.phone && <span className="ue-firm-map__office-phone">{o.phone}</span>}
            </li>
          ))}
        </ul>

        <div className="ue-firm-map__states">
          <p className="ue-firm-map__states-label">States executed · {statesExecuted.length}</p>
          <div className="ue-firm-map__chips">
            {statesExecuted.map((s) => (
              <span key={s} className="ue-chip ue-firm-map__chip">
                {s}
              </span>
            ))}
          </div>
        </div>

        <div className="ue-firm-map__states">
          <p className="ue-firm-map__states-label">Beyond India</p>
          <div className="ue-firm-map__chips">
            {NEIGHBOURS.map((n) => (
              <span key={n} className="ue-chip ue-firm-map__chip ue-firm-map__chip--accent">
                {n}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
