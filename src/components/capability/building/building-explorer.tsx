"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import Image from "next/image";
import type { CapChapter } from "@/data/capability/types";
import type { StageHandle } from "./types";

type Props = {
  id: string;
  /** Which building to show. See packs.ts. */
  model: string;
  /** The line under the opening text that invites the reader to scroll. */
  hint?: string;
  /** What the building is, for picture descriptions: "a data centre". */
  subject?: string;
  eyebrow?: string;
  title?: string;
  lede?: string;
  image?: string;
  chapters: CapChapter[];
};

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));

// The section goes live in the browser, unless the reader asks for less motion.
const STILL = "(prefers-reduced-motion: reduce)";
const watchMotion = (onChange: () => void) => {
  const mq = window.matchMedia(STILL);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
};
const wantsMotion = () => !window.matchMedia(STILL).matches;
const onServer = () => false;

/**
 * The building explorer. Without JavaScript, with reduced motion, or
 * before the page is live, it is a plain list of chapters with a still
 * picture each. Once live, the section pins and the 3D model takes over:
 * scrolling moves the camera from one chapter to the next.
 */
export function BuildingExplorer({
  id,
  model,
  subject = "the facility",
  hint,
  eyebrow,
  title,
  lede,
  image,
  chapters,
}: Props) {
  const rootRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stageRef = useRef<StageHandle | null>(null);
  const labelRefs = useRef<(HTMLElement | null)[][]>([]);
  const indexRef = useRef<HTMLElement>(null);
  const live = useSyncExternalStore(watchMotion, wantsMotion, onServer);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [active, setActive] = useState(0);
  const steps = chapters.length;

  const progress = useCallback(() => {
    const root = rootRef.current;
    const pin = pinRef.current;
    if (!root || !pin) return 0;
    const top = parseFloat(getComputedStyle(pin).top) || 0;
    const span = root.offsetHeight - pin.offsetHeight;
    if (span <= 0) return 0;
    return clamp((top - root.getBoundingClientRect().top) / span) * steps;
  }, [steps]);

  // Scroll position drives the active chapter and the camera.
  // A long chapter bar scrolls sideways on narrow screens: keep the current
  // chapter in view.
  useEffect(() => {
    const bar = indexRef.current;
    if (!bar || bar.scrollWidth <= bar.clientWidth) return;
    const on = bar.querySelector<HTMLElement>("[data-on]");
    const left = on
      ? on.offsetLeft - (bar.clientWidth - on.offsetWidth) / 2
      : 0;
    bar.scrollTo({ left, behavior: "smooth" });
  }, [active]);

  useEffect(() => {
    if (!live) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const p = progress();
      stageRef.current?.setProgress(p);
      setActive(Math.round(p));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [live, progress]);

  // The 3D model loads when the section comes near, and runs while in view.
  useEffect(() => {
    if (!live) return;
    const root = rootRef.current;
    const canvas = canvasRef.current;
    if (!root || !canvas) return;
    let cancelled = false;
    let handle: StageHandle | null = null;
    let seen: IntersectionObserver | null = null;
    let sized: ResizeObserver | null = null;

    const shift = () => {
      if (new URLSearchParams(window.location.search).has("still"))
        return { x: 0, y: 0 };
      return window.innerWidth > 960
        ? { x: 0.16, y: 0.01 }
        : { x: 0, y: -0.19 };
    };

    const start = async () => {
      // No WebGL: stay on the still pictures, without waking the 3D code.
      const probe = document.createElement("canvas");
      if (!probe.getContext("webgl2")) {
        setFailed(true);
        return;
      }
      try {
        const { MODEL_PACKS } = await import("./packs");
        const load = MODEL_PACKS[model as keyof typeof MODEL_PACKS];
        if (!load) throw new Error(`Unknown building model: ${model}`);
        const [{ createStage }, pack] = await Promise.all([
          import("./stage"),
          load(),
        ]);
        if (cancelled) return;
        handle = createStage({
          canvas,
          model: pack.build(),
          views: [
            pack.views.intro,
            ...chapters.map((c) => pack.views[c.key] ?? pack.views.intro),
          ],
          palette: pack.palette,
          roles: pack.roles,
          labels: [[], ...chapters.map((c) => c.labels ?? [])],
          labelEls: labelRefs.current,
          shift,
          lidTravel: pack.lidTravel,
        });
        stageRef.current = handle;
        (root as HTMLElement & { stage?: StageHandle }).stage = handle;
        handle.setProgress(progress(), true);
        seen = new IntersectionObserver(([e]) =>
          handle?.setActive(e.isIntersecting),
        );
        seen.observe(root);
        sized = new ResizeObserver(() => handle?.resize());
        sized.observe(canvas);
        setReady(true);
      } catch {
        setFailed(true);
      }
    };

    const near = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          near.disconnect();
          start();
        }
      },
      { rootMargin: "120% 0px" },
    );
    near.observe(root);

    return () => {
      cancelled = true;
      near.disconnect();
      seen?.disconnect();
      sized?.disconnect();
      handle?.dispose();
      stageRef.current = null;
      setReady(false);
    };
    // The chapter list is fixed for the life of the page.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [live]);

  const jump = (i: number) => {
    const root = rootRef.current;
    const pin = pinRef.current;
    if (!root || !pin) return;
    const top = parseFloat(getComputedStyle(pin).top) || 0;
    const span = root.offsetHeight - pin.offsetHeight;
    const y =
      window.scrollY +
      root.getBoundingClientRect().top -
      top +
      (span * i) / steps;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  const stills = [image, ...chapters.map((c) => c.image)];

  return (
    <section
      id={id}
      ref={rootRef}
      className="ue-cap-section ue-cap-bld"
      data-live={live ? "" : undefined}
      data-ready={ready ? "" : undefined}
      data-failed={failed ? "" : undefined}
      style={{ ["--steps" as string]: steps }}
    >
      <div className="ue-cap-bld__pin" ref={pinRef}>
        <div className="ue-cap-bld__stage" aria-hidden>
          {/* Stills stand in until the model is drawn, or if it cannot be. */}
          <div className="ue-cap-bld__stills">
            {stills.map((src, i) =>
              src ? (
                <Image
                  key={i}
                  src={src}
                  alt=""
                  fill
                  sizes="100vw"
                  data-on={active === i ? "" : undefined}
                />
              ) : null,
            )}
          </div>
          <canvas ref={canvasRef} className="ue-cap-bld__canvas" />
          <div className="ue-cap-bld__labels">
            {chapters.map((c, ci) =>
              (c.labels ?? []).map((l, li) => (
                <span
                  key={`${c.key}-${l.anchor}`}
                  className="ue-cap-bld__label"
                  data-rank={li}
                  ref={(el) => {
                    (labelRefs.current[ci + 1] ??= [])[li] = el;
                  }}
                >
                  <span>{l.text}</span>
                </span>
              )),
            )}
          </div>
        </div>

        <div className="ue-container ue-cap-bld__ui">
          <div className="ue-cap-bld__col">
            <header
              className="ue-cap-bld__intro"
              data-on={active === 0 ? "" : undefined}
            >
              {eyebrow && <p className="ue-eyebrow">{eyebrow}</p>}
              {title && <h2 className="ue-h2">{title}</h2>}
              {lede && <p className="ue-cap-bld__lede">{lede}</p>}
              <p className="ue-cap-bld__hint">
                <span aria-hidden />
                {hint ?? "Scroll to move through the building"}
              </p>
            </header>

            <ol className="ue-cap-bld__chapters">
              {chapters.map((c, i) => (
                <li
                  key={c.key}
                  className="ue-cap-bld__chapter"
                  data-on={active === i + 1 ? "" : undefined}
                >
                  {c.image && (
                    <div className="ue-cap-bld__still">
                      <Image
                        src={c.image}
                        alt={`${c.title}, shown in a model of ${subject}`}
                        fill
                        sizes="(max-width:960px) 100vw, 56vw"
                      />
                    </div>
                  )}
                  <div className="ue-cap-bld__copy">
                    <p className="ue-cap-bld__count">
                      <span>{String(i + 1).padStart(2, "0")}</span>
                      {c.eyebrow}
                    </p>
                    <h3>{c.title}</h3>
                    <p className="ue-cap-bld__text">{c.text}</p>
                    {c.stat && (
                      <div className="ue-cap-bld__stat">
                        <strong>{c.stat.value}</strong>
                        <span>
                          {c.stat.label}
                          {c.stat.note && <em>{c.stat.note}</em>}
                        </span>
                      </div>
                    )}
                    {c.proof && (
                      <div className="ue-cap-bld__proof">
                        <strong>{c.proof.project}</strong>
                        <span>{c.proof.text}</span>
                      </div>
                    )}
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <nav
          ref={indexRef}
          className="ue-cap-bld__index"
          aria-label="Chapters of the model"
        >
          {chapters.map((c, i) => (
            <button
              key={c.key}
              type="button"
              data-on={active === i + 1 ? "" : undefined}
              aria-current={active === i + 1 ? "step" : undefined}
              onClick={() => jump(i + 1)}
            >
              <span>{c.label}</span>
            </button>
          ))}
        </nav>
      </div>
    </section>
  );
}
