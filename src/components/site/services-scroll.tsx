"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "motion/react";
import { ArrowRight } from "lucide-react";
import { DISCIPLINES } from "@/data/firm";
import { getCompanyFactDisplay } from "@/data/company-facts";

/**
 * Home services section — pinned parallax reel.
 *
 * The card acts as a sticky viewport. Behind, a backdrop image
 * crossfades between disciplines with a slow Ken Burns zoom — the
 * image stays above scale 1 the whole time so it always fully
 * covers the card. In front, a stack of text panes scrolls
 * vertically at scroll speed — text flies past while the backdrop
 * stays mostly put, which is what gives the parallax depth.
 *
 * A 10% dwell at each end of a segment lets each pane settle before
 * the transition begins. Active state (driving the backdrop swap
 * and the tab underline) flips at the midpoint of each transition.
 */
export function ServicesScroll() {
  const n = DISCIPLINES.length;
  const [active, setActive] = useState(0);
  const outerRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tabs = tabsRef.current;
    if (!tabs) return;
    const btn = tabs.querySelectorAll<HTMLButtonElement>(".ue-svc-tab")[active];
    if (!btn) return;
    const tabsRect = tabs.getBoundingClientRect();
    const btnRect = btn.getBoundingClientRect();
    if (btnRect.left < tabsRect.left || btnRect.right > tabsRect.right) {
      const centerOffset =
        btnRect.left - tabsRect.left - (tabsRect.width - btnRect.width) / 2;
      tabs.scrollTo({
        left: tabs.scrollLeft + centerOffset,
        behavior: "smooth",
      });
    }
  }, [active]);

  const { scrollYProgress } = useScroll({
    target: outerRef,
    offset: ["start start", "end end"],
  });

  // Text track position (0..n-1). Per-segment dwell+smoothstep so
  // each pane settles briefly before the next transition.
  const textPos = useTransform(scrollYProgress, (v) => {
    if (n <= 1) return 0;
    const scaled = v * (n - 1);
    const idx = Math.min(n - 2, Math.max(0, Math.floor(scaled)));
    const localP = scaled - idx;
    const dwellIn = 0.1;
    const dwellOut = 0.9;
    let eased: number;
    if (localP <= dwellIn) {
      eased = 0;
    } else if (localP >= dwellOut) {
      eased = 1;
    } else {
      const t = (localP - dwellIn) / (dwellOut - dwellIn);
      eased = t * t * (3 - 2 * t);
    }
    return idx + eased;
  });
  const textPct = useTransform(textPos, (v) => -v * 100);
  const textTransform = useMotionTemplate`translate3d(0, ${textPct}%, 0)`;

  // Active discipline — flips at the midpoint between panes, with a
  // small hysteresis band around each midpoint so scroll jitter
  // can't toggle state rapidly.
  useMotionValueEvent(textPos, "change", (v) => {
    const candidate = Math.min(n - 1, Math.max(0, Math.round(v)));
    setActive((prev) => {
      if (candidate !== prev && Math.abs(v - candidate) < 0.42) {
        return candidate;
      }
      return prev;
    });
  });

  const current = DISCIPLINES[active];

  const jumpTo = (i: number) => {
    const el = outerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const start = window.scrollY + rect.top;
    const scrollable = el.scrollHeight - window.innerHeight;
    const denom = Math.max(1, n - 1);
    const v = i === 0 ? 0.02 : i === n - 1 ? 0.98 : i / denom;
    window.scrollTo({ top: start + v * scrollable, behavior: "smooth" });
  };

  return (
    <section className="ue-svc-scroll">
      <div ref={outerRef} className="ue-svc-scroll__outer">
        <div className="ue-svc-scroll__pin">
          <div className="ue-container">
            <div className="ue-svc-scroll__head">
              <p className="ue-eyebrow">Capabilities</p>
              <h2 className="ue-h2 ue-svc-scroll__title">
                {getCompanyFactDisplay("delivery_disciplines")}. One delivery
                standard.
              </h2>
            </div>

            <nav
              ref={tabsRef}
              className="ue-svc-scroll__tabs"
              aria-label="Disciplines"
            >
              {DISCIPLINES.map((d, i) => (
                <button
                  key={d.slug}
                  type="button"
                  onClick={() => jumpTo(i)}
                  className="ue-svc-tab"
                  data-active={active === i ? "" : undefined}
                >
                  <span className="num">{d.num}</span>
                  <span className="name">{d.name}</span>
                </button>
              ))}
            </nav>

            <div className="ue-svc-scroll__card">
              {/* Backdrop layer — keyed child crossfades between
                  disciplines, each with a Ken Burns zoom. Kept
                  permanently above scale 1 so the card is always
                  fully covered. */}
              <div className="ue-svc-scroll__bg-layer">
                <AnimatePresence initial={false}>
                  <motion.div
                    key={current.slug}
                    className="ue-svc-scroll__bg"
                    initial={{ opacity: 0, scale: 1.18 }}
                    animate={{
                      opacity: 1,
                      scale: 1.06,
                      transition: {
                        opacity: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
                        scale: { duration: 4.5, ease: "easeOut" },
                      },
                    }}
                    exit={{
                      opacity: 0,
                      scale: 1.12,
                      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
                    }}
                  >
                    {/* Deliberate raw <img>, not next/image: this is a
                        decorative crossfading Ken-Burns background layer
                        keyed per-discipline inside AnimatePresence. next/image's
                        `fill` layout fights the parent's scale animation, so a
                        plain <img> (styled by .ue-svc-scroll__bg img) is used. */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={current.images[0]}
                      alt={current.name}
                      draggable={false}
                    />
                    <div className="ue-svc-scroll__tint" aria-hidden />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Text layer — scrolls vertically at full speed. */}
              <div className="ue-svc-scroll__text-viewport">
                <motion.div
                  className="ue-svc-scroll__text-track"
                  style={{ transform: textTransform }}
                >
                  {DISCIPLINES.map((d) => (
                    <div key={d.slug} className="ue-svc-scroll__text-pane">
                      <div className="ue-svc-scroll__overlay-inner">
                        <span className="ue-svc-scroll__o-meta">
                          {d.num} / {String(n).padStart(2, "0")}
                        </span>
                        <h3 className="ue-svc-scroll__o-name">{d.name}</h3>
                        <Link
                          href={`/services/${d.slug}`}
                          className="ue-svc-scroll__o-cta"
                        >
                          View discipline
                          <ArrowRight className="size-3.5" aria-hidden />
                        </Link>
                        <hr className="ue-svc-scroll__o-rule" />
                        <ul className="ue-svc-scroll__o-items">
                          {d.items.map((it) => (
                            <li key={it}>{it}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile-only static list — hidden on desktop. */}
      <div className="ue-svc-scroll__mobile">
        {DISCIPLINES.map((d) => (
          <Link
            key={d.slug}
            href={`/services/${d.slug}`}
            className="ue-svc-mobile"
          >
            <span className="num">{d.num}</span>
            <h3 className="name">{d.name}</h3>
            <ul className="items">
              {d.items.map((it) => (
                <li key={it}>{it}</li>
              ))}
            </ul>
          </Link>
        ))}
      </div>
    </section>
  );
}
