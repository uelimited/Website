"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import Image from "next/image";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
} from "motion/react";
import {
  SERVICE_LONG_LABEL,
  type CapProject,
  type ServiceKey,
} from "@/data/capability/types";

const DWELL = 5200;

/**
 * Screen gallery. One large frame, with the list of screens under it.
 * It advances on its own while on screen; choosing a screen stops it.
 */
export function CapGallery({
  items,
}: {
  items: { src: string; title: string; place: string }[];
}) {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(true);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-20% 0px -20% 0px" });
  const reduce = useReducedMotion();
  const run = playing && inView && !reduce;

  useEffect(() => {
    if (!run) return;
    const t = window.setTimeout(
      () => setActive((a) => (a + 1) % items.length),
      DWELL,
    );
    return () => window.clearTimeout(t);
  }, [run, active, items.length]);

  return (
    <div ref={ref}>
      <div className="ue-cap-gallery__stage" data-reveal="">
        {items.map((it, i) => (
          <div
            key={it.src}
            className="ue-cap-gallery__img"
            style={{
              opacity: active === i ? 1 : 0,
              transition: "opacity 0.7s cubic-bezier(0.22,1,0.36,1)",
            }}
            aria-hidden={active !== i}
          >
            <Image
              src={it.src}
              alt={active === i ? `${it.title}, ${it.place}` : ""}
              width={1600}
              height={900}
              sizes="(max-width:1300px) 94vw, 1180px"
              priority={false}
            />
          </div>
        ))}
      </div>
      <div className="ue-cap-gallery__list" role="tablist" aria-label="Screens">
        {items.map((it, i) => (
          <button
            key={it.src}
            type="button"
            role="tab"
            aria-selected={active === i}
            className="ue-cap-gallery__btn"
            data-active={active === i ? "" : undefined}
            data-playing={run ? "" : undefined}
            style={{ ["--dwell" as string]: `${DWELL}ms` } as CSSProperties}
            onClick={() => {
              setActive(i);
              setPlaying(false);
            }}
          >
            <span className="ue-cap-gallery__bar" aria-hidden>
              <i key={run && active === i ? `run-${active}` : "idle"} />
            </span>
            <span className="ue-cap-gallery__title">{it.title}</span>
            <span className="ue-cap-gallery__place">{it.place}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

/**
 * One service across the project library. Each row is that service's
 * column from a project's scope of work slide. Filter by industry.
 */
export function CapLedger({
  service,
  groups,
}: {
  service: ServiceKey;
  groups: { label: string; projects: CapProject[] }[];
}) {
  const [filter, setFilter] = useState<string | null>(null);
  const shown = useMemo(
    () => (filter ? groups.filter((g) => g.label === filter) : groups),
    [filter, groups],
  );
  return (
    <div>
      <div
        className="ue-cap-ledger__filters"
        role="group"
        aria-label="Industry"
      >
        <button
          type="button"
          className="ue-cap-key"
          aria-pressed={filter === null}
          data-active={filter === null ? "" : undefined}
          onClick={() => setFilter(null)}
        >
          All projects
        </button>
        {groups.map((g) => (
          <button
            key={g.label}
            type="button"
            className="ue-cap-key"
            aria-pressed={filter === g.label}
            data-active={filter === g.label ? "" : undefined}
            onClick={() => setFilter(g.label)}
          >
            {g.label}
            <span className="ue-cap-key__pct">{g.projects.length}</span>
          </button>
        ))}
      </div>
      <AnimatePresence mode="popLayout" initial={false}>
        {shown.map((g) => (
          <motion.div
            key={g.label}
            layout
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <h3 className="ue-cap-ledger__group">{g.label}</h3>
            {g.projects.map((p) => {
              const s = p.split?.find((x) => x.service === service);
              if (!s) return null;
              const place = p.facts.find((f) => f.label === "Location")?.value;
              const name = p.short || p.name;
              return (
                <div key={p.id} className="ue-cap-ledger__row">
                  <div>
                    {p.href ? (
                      <Link href={p.href} className="ue-cap-ledger__name">
                        {name}
                      </Link>
                    ) : (
                      <span className="ue-cap-ledger__name">{name}</span>
                    )}
                    {place && (
                      <span className="ue-cap-ledger__place">{place}</span>
                    )}
                  </div>
                  <p className="ue-cap-ledger__text">{s.text}</p>
                  <div className="ue-cap-ledger__share">
                    {s.pct !== undefined && (
                      <span className="ue-cap-ledger__meter" aria-hidden>
                        <i style={{ width: `${Math.min(100, s.pct)}%` }} />
                      </span>
                    )}
                    {s.share}
                  </div>
                </div>
              );
            })}
          </motion.div>
        ))}
      </AnimatePresence>
      <p className="ue-cap-note">
        {SERVICE_LONG_LABEL[service]} scope as stated for each project. Shares
        marked illustrative show scope, not contract value, quantities or
        progress.
      </p>
    </div>
  );
}
