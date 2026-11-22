"use client";

import { useId, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { CapSheet } from "@/data/capability/types";
import { CapStats } from "./cap-motion";
import { CapChips, CapRail } from "./cap-parts";

function Sheet({ sheet }: { sheet: CapSheet }) {
  const cards = sheet.groups?.filter((g) => g.style !== "timings") ?? [];
  const timings = sheet.groups?.filter((g) => g.style === "timings") ?? [];
  const body = (
    <>
      {sheet.tag && <span className="ue-cap-sheet__tag">{sheet.tag}</span>}
      <h3 className="ue-cap-sheet__title">{sheet.title}</h3>
      {sheet.lede && <p className="ue-cap-sheet__lede">{sheet.lede}</p>}
    </>
  );
  return (
    <>
      {sheet.image ? (
        <div className="ue-cap-sheet__media">
          <div>{body}</div>
          <Image
            src={sheet.image}
            alt=""
            width={1024}
            height={688}
            sizes="(max-width:960px) 92vw, 480px"
          />
        </div>
      ) : (
        body
      )}
      {sheet.steps && sheet.steps.length > 0 && (
        <CapRail steps={sheet.steps} reveal={false} />
      )}
      {sheet.stats && sheet.stats.length > 0 && (
        <CapStats
          items={sheet.stats}
          variant="compact"
          cols={Math.min(sheet.stats.length, sheet.stats.length > 4 ? 3 : 4)}
        />
      )}
      {(cards.length > 0 || timings.length > 0) && (
        <div
          className={`ue-cap-sheet__groups${cards.length && timings.length ? " ue-cap-sheet__groups--split" : ""}`}
        >
          {cards.length > 0 && (
            <div style={{ display: "grid", gap: 40 }}>
              {cards.map((g) => (
                <div key={g.label}>
                  <p className="ue-cap-label">{g.label}</p>
                  {g.style === "chips" ? (
                    <CapChips items={g.items.map((i) => i.title)} />
                  ) : (
                    <ul
                      className={`ue-cap-minis${!timings.length && g.items.length % 3 === 0 ? " ue-cap-minis--3" : ""}`}
                    >
                      {g.items.map((it) => (
                        <li key={it.title}>
                          <h4 className="ue-cap-mini__title">{it.title}</h4>
                          {it.text && (
                            <p className="ue-cap-mini__text">{it.text}</p>
                          )}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          )}
          {timings.map((g) => (
            <div key={g.label}>
              <p className="ue-cap-label">{g.label}</p>
              <ul className="ue-cap-timings">
                {g.items.map((it, i) => (
                  <li key={`${it.title}-${i}`}>
                    <div className="ue-cap-timing__value">{it.title}</div>
                    <p className="ue-cap-timing__text">{it.text}</p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
      {sheet.note && <p className="ue-cap-sheet__note">{sheet.note}</p>}
    </>
  );
}

/**
 * A set of sheets with one visible at a time. Every sheet stays in
 * the page markup; inactive ones are hidden, so the content is there
 * for search engines and for the browser's find in page.
 */
export function CapSheets({
  sheets,
  layout = "top",
}: {
  sheets: CapSheet[];
  layout?: "side" | "top";
}) {
  const [active, setActive] = useState(0);
  const uid = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const many = sheets.length > 1;

  const go = (i: number, scroll = false) => {
    setActive(i);
    if (scroll && panelRef.current) {
      const top = panelRef.current.getBoundingClientRect().top;
      if (top < 80 || top > window.innerHeight * 0.6) {
        window.scrollTo({
          top: window.scrollY + top - 140,
          behavior: "smooth",
        });
      }
    }
  };

  const firstThroughout = sheets.findIndex((s) => s.tag === "Throughout");

  const panels = (
    <div ref={panelRef} style={{ minWidth: 0 }}>
      {sheets.map((s, i) => (
        <div
          key={`${s.label}-${i}`}
          id={`${uid}-panel-${i}`}
          role={many ? "tabpanel" : undefined}
          aria-labelledby={many ? `${uid}-tab-${i}` : undefined}
          className="ue-cap-sheet"
          hidden={active !== i}
        >
          <Sheet sheet={s} />
          {many && layout === "side" && (
            <div className="ue-cap-sheets__pager">
              <button
                type="button"
                className="ue-cap-pager"
                disabled={i === 0}
                onClick={() => go(i - 1, true)}
              >
                <ArrowLeft aria-hidden />
                {i > 0 ? sheets[i - 1].label : ""}
              </button>
              <button
                type="button"
                className="ue-cap-pager"
                disabled={i === sheets.length - 1}
                onClick={() => go(i + 1, true)}
              >
                {i < sheets.length - 1 ? sheets[i + 1].label : ""}
                <ArrowRight aria-hidden />
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );

  if (!many) return panels;

  if (layout === "side") {
    return (
      <div className="ue-cap-sheets__layout">
        <div className="ue-cap-sheets__nav" role="tablist" aria-label="Parts">
          {sheets.map((s, i) => (
            <span key={`${s.label}-${i}`} style={{ display: "contents" }}>
              {i === firstThroughout && firstThroughout > 0 && (
                <span className="ue-cap-sheets__sep">Throughout</span>
              )}
              <button
                type="button"
                role="tab"
                id={`${uid}-tab-${i}`}
                aria-selected={active === i}
                aria-controls={`${uid}-panel-${i}`}
                className="ue-cap-sheets__btn"
                data-active={active === i ? "" : undefined}
                onClick={() => go(i)}
              >
                {active === i && (
                  <motion.span
                    layoutId={`cap-sheets-pill-${uid}`}
                    className="ue-cap-sheets__pill"
                    transition={{ type: "spring", stiffness: 420, damping: 38 }}
                  />
                )}
                <span className="ue-cap-sheets__btn-num">
                  {s.tag === "Throughout" ? "·" : i + 1}
                </span>
                <span>{s.label}</span>
              </button>
            </span>
          ))}
        </div>
        {panels}
      </div>
    );
  }

  return (
    <>
      <div className="ue-cap-tabs" role="tablist">
        {sheets.map((s, i) => (
          <button
            key={`${s.label}-${i}`}
            type="button"
            role="tab"
            id={`${uid}-tab-${i}`}
            aria-selected={active === i}
            aria-controls={`${uid}-panel-${i}`}
            className="ue-cap-tab"
            data-active={active === i ? "" : undefined}
            onClick={() => go(i)}
          >
            <span className="ue-cap-tab__num">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="ue-cap-tab__name">{s.label}</span>
            {active === i && (
              <motion.span
                layoutId={`cap-sheets-line-${uid}`}
                className="ue-cap-tab__line"
                transition={{ type: "spring", stiffness: 420, damping: 38 }}
              />
            )}
          </button>
        ))}
      </div>
      {panels}
    </>
  );
}
