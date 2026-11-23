"use client";

import { useId, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import {
  SERVICE_LABEL,
  SERVICE_LONG_LABEL,
  type CapProject,
  type CapScope,
  type ServiceKey,
} from "@/data/capability/types";
import { CapStats } from "./cap-motion";

/**
 * One shade per service, blue through grey. Order and labels carry
 * the meaning; the shades never rely on a red and green pair.
 */
const SEG: Record<ServiceKey, string> = {
  hvac: "var(--accent-700)",
  electrical: "var(--accent-500)",
  phe: "var(--accent-300)",
  fire: "var(--ink-700)",
  bms: "var(--ink-400)",
  civil: "var(--ink-300)",
};

const pad = (n: number) => String(n).padStart(2, "0");

function statusOf(p: CapProject) {
  return p.facts.find((f) => f.label === "Status")?.value;
}

function ScopeSplit({
  project,
  focus,
}: {
  project: CapProject;
  focus?: ServiceKey;
}) {
  const split = project.split!;
  const first =
    (focus && split.find((s) => s.service === focus && s.included !== false)) ||
    split.find((s) => s.included !== false) ||
    split[0];
  const [sel, setSel] = useState<ServiceKey>(first.service);
  const current: CapScope = split.find((s) => s.service === sel) || first;
  const bar = split.filter((s) => (s.pct ?? 0) > 0);

  return (
    <div className="ue-cap-split">
      <div className="ue-cap-split__head">
        <h4>Scope of work by service</h4>
        <span>Select a service</span>
      </div>
      {bar.length > 1 && (
        <div className="ue-cap-split__bar" aria-hidden>
          {bar.map((s) => (
            <button
              key={s.service}
              type="button"
              tabIndex={-1}
              className="ue-cap-split__seg"
              data-active={sel === s.service ? "" : undefined}
              style={{
                flexGrow: s.pct,
                flexBasis: 0,
                ["--seg" as string]: SEG[s.service],
              }}
              onClick={() => setSel(s.service)}
              onMouseEnter={() => setSel(s.service)}
            />
          ))}
        </div>
      )}
      <div className="ue-cap-split__keys" role="tablist">
        {split.map((s) => (
          <button
            key={s.service}
            type="button"
            role="tab"
            aria-selected={sel === s.service}
            className="ue-cap-key"
            data-active={sel === s.service ? "" : undefined}
            data-off={s.included === false ? "" : undefined}
            style={{ ["--seg" as string]: SEG[s.service] }}
            onClick={() => setSel(s.service)}
          >
            {s.pct !== undefined && s.pct > 0 && bar.length > 1 && (
              <span className="ue-cap-key__dot" aria-hidden />
            )}
            {SERVICE_LABEL[s.service]}
            {s.pct !== undefined && (
              <span className="ue-cap-key__pct">{s.pct}%</span>
            )}
          </button>
        ))}
      </div>
      <div
        className="ue-cap-split__detail"
        key={`${project.id}-${current.service}`}
        role="tabpanel"
      >
        <div className="ue-cap-split__share">
          {SERVICE_LONG_LABEL[current.service]}
          <small>{current.share}</small>
        </div>
        <p className="ue-cap-split__text">{current.text}</p>
      </div>
      {project.splitNote && (
        <p className="ue-cap-split__note">{project.splitNote}</p>
      )}
    </div>
  );
}

/**
 * Project showcase. Tabs pick a project; the panel carries the facts,
 * scope, highlights and the scope of work by service from the deck's
 * project, scope split and scope of work slides.
 */
export function CapShowcase({
  projects,
  focus,
  hideHead,
  hideMedia,
}: {
  projects: CapProject[];
  focus?: ServiceKey;
  /** On a project's own page the name and link are already on the page. */
  hideHead?: boolean;
  /** Leave the photograph out, where the page already shows it. */
  hideMedia?: boolean;
}) {
  const [active, setActive] = useState(0);
  const uid = useId();
  const p = projects[active];
  const status = useMemo(() => statusOf(p), [p]);

  return (
    <div className="ue-cap-show">
      {projects.length > 1 && (
        <div className="ue-cap-tabs" role="tablist" aria-label="Projects">
          {projects.map((x, i) => (
            <button
              key={x.id}
              type="button"
              role="tab"
              aria-selected={active === i}
              className="ue-cap-tab"
              data-active={active === i ? "" : undefined}
              onClick={() => setActive(i)}
              onKeyDown={(e) => {
                if (e.key === "ArrowRight")
                  setActive((active + 1) % projects.length);
                if (e.key === "ArrowLeft")
                  setActive((active - 1 + projects.length) % projects.length);
              }}
            >
              <span className="ue-cap-tab__num">{pad(i + 1)}</span>
              <span className="ue-cap-tab__name">{x.short || x.name}</span>
              {active === i && (
                <motion.span
                  layoutId={`cap-show-line-${uid}`}
                  className="ue-cap-tab__line"
                  transition={{ type: "spring", stiffness: 420, damping: 38 }}
                />
              )}
            </button>
          ))}
        </div>
      )}

      <div className="ue-cap-show__panel" key={p.id} role="tabpanel">
        <div
          className="ue-cap-show__top"
          data-wide={hideMedia ? "" : undefined}
          data-plain={hideHead ? "" : undefined}
        >
          {!hideMedia && (
            <div className="ue-cap-show__media">
              {p.image && (
                <Image
                  src={p.image}
                  alt={p.imageAlt || p.name}
                  fill
                  sizes="(max-width:960px) 100vw, 600px"
                />
              )}
              {status && <span className="ue-cap-show__status">{status}</span>}
            </div>
          )}
          <div>
            {!hideHead && <h3 className="ue-cap-show__name">{p.name}</h3>}
            {!hideHead && p.lede && (
              <p className="ue-cap-show__lede">{p.lede}</p>
            )}
            <dl className="ue-cap-facts">
              {p.facts.map((f) => (
                <div key={f.label} className="ue-cap-fact">
                  <dt>{f.label}</dt>
                  <dd>
                    {f.value}
                    {f.note && <small>{f.note}</small>}
                  </dd>
                </div>
              ))}
            </dl>
            {p.scope && <p className="ue-cap-show__scope">{p.scope}</p>}
            {p.href && !hideHead && (
              <Link href={p.href} className="ue-inner-link ue-cap-show__link">
                View the case study <ArrowRight size={16} aria-hidden />
              </Link>
            )}
          </div>
        </div>

        {p.stats && p.stats.length > 0 && (
          <div className="ue-cap-show__stats">
            <CapStats items={p.stats} variant="compact" />
          </div>
        )}

        {p.highlights.length > 0 && (
          <div className="ue-cap-highlights">
            {p.highlights.map((h, i) => (
              <article key={h.title || i} className="ue-cap-card">
                <span className="ue-cap-card__meta">{pad(i + 1)}</span>
                {h.title && <h4 className="ue-cap-card__title">{h.title}</h4>}
                <p className="ue-cap-card__text">{h.text}</p>
              </article>
            ))}
          </div>
        )}

        {p.split && p.split.length > 0 && (
          <ScopeSplit project={p} focus={focus} />
        )}

        {p.note && <p className="ue-cap-show__note">{p.note}</p>}
      </div>
    </div>
  );
}
