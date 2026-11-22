"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  animate,
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import type { CapStat } from "@/data/capability/types";

/**
 * Scroll reveals for a capability page.
 *
 * Elements carry `data-reveal`. They are visible in the server HTML
 * and without JavaScript. On mount, anything still below the fold is
 * set to "hidden" and brought in once as it enters the viewport.
 * Nothing above the fold ever flashes, and reduced motion skips it.
 */
export function CapReveal() {
  const pathname = usePathname();
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const els = Array.from(
      document.querySelectorAll<HTMLElement>(".ue-cap [data-reveal]"),
    );
    const vh = window.innerHeight;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          (e.target as HTMLElement).dataset.reveal = "shown";
          io.unobserve(e.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
    );
    for (const el of els) {
      if (el.dataset.reveal === "shown") continue;
      if (el.getBoundingClientRect().top > vh * 0.92) {
        el.dataset.reveal = "hidden";
        io.observe(el);
      } else {
        el.dataset.reveal = "shown";
      }
    }
    return () => io.disconnect();
  }, [pathname]);
  return null;
}

/** Image hero with a slow parallax on the photograph. */
export function CapHero({
  eyebrow,
  title,
  description,
  image,
}: {
  eyebrow: string;
  title: string;
  description: string;
  image?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  // With reduced motion the picture and text stay still. The style is
  // always set, so the server and the browser render the same markup.
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", reduce ? "0%" : "12%"],
  );
  const fade = useTransform(scrollYProgress, [0, 0.85], [1, reduce ? 1 : 0.2]);
  return (
    <section ref={ref} className="ue-cap-hero">
      {image && (
        <motion.div className="ue-cap-hero__media" style={{ y }}>
          <Image src={image} alt="" fill priority sizes="100vw" />
        </motion.div>
      )}
      <div className="ue-cap-hero__shade" />
      <motion.div
        className="ue-container ue-cap-hero__inner"
        style={{ opacity: fade }}
      >
        <p className="ue-eyebrow">{eyebrow}</p>
        <h1 className="ue-h1">{title}</h1>
        <p className="ue-lead">{description}</p>
      </motion.div>
    </section>
  );
}

/**
 * Section nav. Sticks under the site header, marks the section in
 * view and shows how far down the page the reader is.
 */
export function CapSubnav({
  parent,
  name,
  sections,
}: {
  parent: { label: string; href: string };
  name: string;
  sections: { id: string; label: string }[];
}) {
  const [active, setActive] = useState<string | null>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();

  // The active link is the last listed section whose top has passed the
  // reading line. Sections without a link belong to the one above them.
  useEffect(() => {
    const els = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => !!el);
    let frame = 0;
    const update = () => {
      frame = 0;
      const line = window.innerHeight * 0.4;
      let current: string | null = null;
      for (const el of els) {
        if (el.getBoundingClientRect().top <= line) current = el.id;
      }
      setActive(current);
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
  }, [sections]);

  useEffect(() => {
    const wrap = linksRef.current;
    if (!wrap || !active) return;
    const link = wrap.querySelector<HTMLElement>(`[data-id="${active}"]`);
    if (!link) return;
    const a = wrap.getBoundingClientRect();
    const b = link.getBoundingClientRect();
    if (b.left < a.left || b.right > a.right) {
      wrap.scrollTo({
        left: wrap.scrollLeft + (b.left - a.left) - (a.width - b.width) / 2,
        behavior: "smooth",
      });
    }
  }, [active]);

  return (
    <nav className="ue-cap-subnav" aria-label={`${name} sections`}>
      <div className="ue-cap-subnav__inner">
        <div className="ue-cap-subnav__crumb">
          <Link href={parent.href}>{parent.label}</Link>
          <span aria-hidden>/</span>
          <span>{name}</span>
        </div>
        <div className="ue-cap-subnav__links" ref={linksRef}>
          {sections.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              data-id={s.id}
              className="ue-cap-subnav__link"
              data-active={active === s.id ? "" : undefined}
              aria-current={active === s.id ? "true" : undefined}
              onClick={(e) => {
                const el = document.getElementById(s.id);
                if (!el) return;
                e.preventDefault();
                el.scrollIntoView({ behavior: "smooth", block: "start" });
                history.replaceState(null, "", `#${s.id}`);
              }}
            >
              {active === s.id && (
                <motion.span
                  layoutId="cap-subnav-pill"
                  className="ue-cap-subnav__pill"
                  transition={{ type: "spring", stiffness: 420, damping: 36 }}
                />
              )}
              {s.label}
            </a>
          ))}
        </div>
      </div>
      <motion.div
        className="ue-cap-subnav__progress"
        style={{ scaleX: scrollYProgress }}
        aria-hidden
      />
    </nav>
  );
}

const NUM = /^(₹)?(\d[\d,]*(?:\.\d+)?)([\s\S]*)$/;

function StatValue({ value, start }: { value: string; start: boolean }) {
  // The server and no JavaScript clients always see the real value.
  const [display, setDisplay] = useState(value);
  const reduce = useReducedMotion();
  useEffect(() => {
    if (!start || reduce) return;
    const m = value.match(NUM);
    if (!m) return;
    const [, pre = "", num, post] = m;
    const target = parseFloat(num.replace(/,/g, ""));
    if (!isFinite(target) || target === 0) return;
    const decimals = (num.split(".")[1] || "").length;
    const grouped = num.includes(",");
    const fmt = (v: number) => {
      const s = v.toFixed(decimals);
      return grouped
        ? Number(s).toLocaleString("en-IN", {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals,
          })
        : s;
    };
    const controls = animate(0, target, {
      duration: 1.1,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(`${pre}${fmt(v)}${post}`),
      onComplete: () => setDisplay(value),
    });
    return () => controls.stop();
  }, [start, reduce, value]);
  return <>{display}</>;
}

/** Headline figures. Numbers count up once when they scroll into view. */
export function CapStats({
  items,
  variant,
  cols,
}: {
  items: CapStat[];
  variant?: "band" | "compact";
  cols?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  return (
    <div
      ref={ref}
      className={`ue-cap-stats${variant ? ` ue-cap-stats--${variant}` : ""}`}
      data-long={items.some((s) => s.value.length > 7) ? "" : undefined}
      style={{ ["--cols" as string]: cols ?? Math.min(items.length, 4) }}
    >
      {items.map((s, i) => (
        <div key={`${s.label}-${i}`} className="ue-cap-stat">
          <div className="ue-cap-stat__value">
            <StatValue value={s.value} start={inView} />
          </div>
          <div className="ue-cap-stat__label">{s.label}</div>
          {s.note && <div className="ue-cap-stat__note">{s.note}</div>}
        </div>
      ))}
    </div>
  );
}
