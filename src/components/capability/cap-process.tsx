"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  useInView,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { Pause, Play } from "lucide-react";
import type { CapStep } from "@/data/capability/types";

const pad = (n: number) => String(n).padStart(2, "0");
const DWELL = 4600;

function Stage({ steps, active }: { steps: CapStep[]; active: number }) {
  return (
    <>
      {steps.map((s, i) =>
        s.image ? (
          <div
            key={s.label}
            className="ue-cap-proc__img"
            style={{
              opacity: active === i ? 1 : 0,
              transform: active === i ? "scale(1)" : "scale(1.035)",
              transition:
                "opacity 0.6s cubic-bezier(0.22,1,0.36,1), transform 1.1s cubic-bezier(0.22,1,0.36,1)",
            }}
            aria-hidden={active !== i}
          >
            <Image
              src={s.image}
              alt={active === i ? s.label : ""}
              width={1300}
              height={880}
              sizes="(max-width:960px) 92vw, 640px"
            />
          </div>
        ) : null,
      )}
      <span className="ue-cap-proc__count" aria-hidden>
        {pad(active + 1)} / {pad(steps.length)}
      </span>
    </>
  );
}

/**
 * Process that plays through its steps while it is on screen.
 * Clicking a step jumps to it and pauses; the button resumes.
 */
export function CapProcessAuto({ steps }: { steps: CapStep[] }) {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(true);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-25% 0px -25% 0px" });
  const reduce = useReducedMotion();
  const run = playing && inView && !reduce;

  useEffect(() => {
    if (!run) return;
    const t = window.setTimeout(
      () => setActive((a) => (a + 1) % steps.length),
      DWELL,
    );
    return () => window.clearTimeout(t);
  }, [run, active, steps.length]);

  return (
    <div className="ue-cap-proc__layout" ref={ref}>
      <div className="ue-cap-proc__list" role="tablist" aria-label="Steps">
        {steps.map((s, i) => (
          <button
            key={s.label}
            type="button"
            role="tab"
            aria-selected={active === i}
            className="ue-cap-proc__item"
            data-active={active === i ? "" : undefined}
            data-done={i < active || (i === active && !run) ? "" : undefined}
            onClick={() => {
              setActive(i);
              setPlaying(false);
            }}
          >
            <span className="ue-cap-proc__track" aria-hidden>
              <span
                className="ue-cap-proc__fill"
                key={run && active === i ? `run-${active}` : "idle"}
                style={
                  run && active === i
                    ? {
                        animation: `capFillY ${DWELL}ms linear both`,
                      }
                    : undefined
                }
              />
            </span>
            <span className="ue-cap-proc__body">
              <span className="ue-cap-proc__num">{pad(i + 1)}</span>
              <span className="ue-cap-proc__name">{s.label}</span>
              <span className="ue-cap-proc__text">
                <span>
                  <span>{s.text}</span>
                </span>
              </span>
            </span>
          </button>
        ))}
      </div>
      <div className="ue-cap-proc__stage">
        <Stage steps={steps} active={active} />
        {!reduce && (
          <button
            type="button"
            className="ue-cap-proc__toggle"
            aria-label={playing ? "Pause" : "Play"}
            onClick={() => setPlaying((p) => !p)}
          >
            {playing ? <Pause aria-hidden /> : <Play aria-hidden />}
          </button>
        )}
      </div>
    </div>
  );
}

function PinnedItem({
  step,
  index,
  total,
  active,
  progress,
  onClick,
}: {
  step: CapStep;
  index: number;
  total: number;
  active: boolean;
  progress: MotionValue<number>;
  onClick: () => void;
}) {
  const fill = useTransform(progress, (v) => {
    const scaled = v * total;
    if (scaled <= index) return 0;
    if (scaled >= index + 1) return 1;
    return scaled - index;
  });
  return (
    <button
      type="button"
      className="ue-cap-proc__item"
      data-active={active ? "" : undefined}
      onClick={onClick}
    >
      <span className="ue-cap-proc__track" aria-hidden>
        <motion.span className="ue-cap-proc__fill" style={{ scaleY: fill }} />
      </span>
      <span className="ue-cap-proc__body">
        <span className="ue-cap-proc__num">{pad(index + 1)}</span>
        <span className="ue-cap-proc__name">{step.label}</span>
        <span className="ue-cap-proc__text">
          <span>
            <span>{step.text}</span>
          </span>
        </span>
      </span>
    </button>
  );
}

/**
 * Scroll driven process. The section pins under the nav and the
 * steps advance as the reader scrolls; the track beside each step
 * fills with the scroll position. Below 960px it becomes a plain
 * list, rendered by the `mobile` slot.
 */
export function CapProcessPinned({
  steps,
  eyebrow,
  title,
  lede,
}: {
  steps: CapStep[];
  eyebrow?: string;
  title?: string;
  lede?: string;
}) {
  const n = steps.length;
  const [active, setActive] = useState(0);
  const outerRef = useRef<HTMLDivElement>(null);
  const reduce = !!useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: outerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const scaled = v * n;
    const guard = 0.06;
    setActive((prev) => {
      if (scaled > prev + 1 - guard) return Math.min(n - 1, Math.floor(scaled));
      if (scaled < prev + guard) return Math.max(0, Math.floor(scaled));
      return prev;
    });
  });

  const jumpTo = (i: number) => {
    const el = outerRef.current;
    if (!el) return;
    const start = window.scrollY + el.getBoundingClientRect().top;
    const scrollable = el.scrollHeight - window.innerHeight;
    window.scrollTo({
      top: start + ((i + 0.3) / n) * scrollable,
      behavior: reduce ? "auto" : "smooth",
    });
  };

  return (
    <div
      ref={outerRef}
      className="ue-cap-proc__outer"
      style={{ ["--span" as string]: (n * 0.5 + 0.9).toFixed(2) }}
    >
      <div className="ue-cap-proc__pin">
        <div className="ue-container">
          <div className="ue-cap-proc__layout">
            <div>
              <header className="ue-cap-proc__pinhead">
                {eyebrow && <p className="ue-eyebrow">{eyebrow}</p>}
                {title && <h2 className="ue-h2">{title}</h2>}
                {lede && <p className="ue-cap-head__lede">{lede}</p>}
              </header>
              <div className="ue-cap-proc__list">
                {steps.map((s, i) => (
                  <PinnedItem
                    key={s.label}
                    step={s}
                    index={i}
                    total={n}
                    active={active === i}
                    progress={scrollYProgress}
                    onClick={() => jumpTo(i)}
                  />
                ))}
              </div>
            </div>
            <div className="ue-cap-proc__stage">
              <Stage steps={steps} active={active} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
