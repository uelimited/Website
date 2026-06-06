"use client";

import {
  MotionValue,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "motion/react";
import type { DisciplineAccent } from "@/data/firm";

type Props = {
  videoSrc?: string;
  poster?: string;
  accent: DisciplineAccent;
  label: string;
};

export function ServiceMedia({ videoSrc, poster, accent, label }: Props) {
  return (
    <div className="ue-service-media">
      {videoSrc ? (
        <video
          className="ue-service-media__video"
          src={videoSrc}
          poster={poster || undefined}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        />
      ) : (
        <ServiceDiagram accent={accent} label={label} />
      )}
      <div className="ue-service-media__caption">
        <span className="ue-service-media__mono">{label.toUpperCase()}</span>
        <span className="dot">·</span>
        <span>System diagram</span>
      </div>
    </div>
  );
}

/**
 * Self-contained animated SVG diagram for a discipline.
 *
 * Drawn in a 1000 × 1000 square viewBox with `xMidYMid meet` — the
 * motif always fits entirely inside the card regardless of the
 * card's aspect ratio. Letterbox area picks up the card's own
 * background gradient so the seam isn't visible.
 *
 * When a `progress` MotionValue is supplied, every motif drives its
 * animation off that value (scroll-linked). When it's absent, the
 * diagram renders at its baseline "at rest" state.
 */
export function ServiceDiagram({
  accent,
  label,
  progress,
}: {
  accent: DisciplineAccent;
  label: string;
  progress?: MotionValue<number>;
}) {
  const fallback = useMotionValue(0);
  const p = progress ?? fallback;

  return (
    <div className="ue-service-media__fallback">
      <svg
        viewBox="0 0 1000 1000"
        preserveAspectRatio="xMidYMid slice"
        className="ue-service-media__svg"
        role="img"
        aria-label={`Animated diagram — ${label}`}
      >
        {accent === "blocks" && <BlocksMotif progress={p} />}
        {accent === "fan" && <FanMotif progress={p} />}
        {accent === "current" && <CurrentMotif progress={p} />}
        {accent === "droplets" && <DropletsMotif progress={p} />}
        {accent === "pulse" && <PulseMotif progress={p} />}
        {accent === "sun" && <SunMotif progress={p} />}
        {accent === "graph" && <GraphMotif progress={p} />}
      </svg>
    </div>
  );
}

/* --------------------------------------------------------------------
 * Motifs — each one lives inside a 1000 × 1000 viewBox. Every motif's
 * skeleton is visible at progress = 0; the scroll progress drives
 * continuous motion (rotation, travelling pulse, ring expansion)
 * rather than an enter-from-nothing animation.
 * ------------------------------------------------------------------ */

type MotifProps = { progress: MotionValue<number> };

/* 01 · Civil & Interior ------------------------------------------- */
function BlocksMotif({ progress }: MotifProps) {
  const hookY = useTransform(progress, [0, 0.5, 1], [320, 360, 320]);
  const blocks = [
    { x: 200, y: 740, w: 200, h: 80 },
    { x: 420, y: 680, w: 200, h: 140 },
    { x: 620, y: 620, w: 180, h: 200 },
    { x: 200, y: 620, w: 200, h: 100 },
    { x: 420, y: 540, w: 200, h: 120 },
    { x: 220, y: 460, w: 160, h: 140 },
  ];
  return (
    <>
      {/* Ground rule */}
      <line
        x1={120} x2={880} y1={820} y2={820}
        stroke="rgba(255,255,255,0.3)" strokeWidth={1.5}
      />
      {/* Stacked blocks — always visible */}
      {blocks.map((b, i) => (
        <rect
          key={i}
          x={b.x} y={b.y} width={b.w} height={b.h}
          rx={3}
          fill="rgba(59,111,224,0.06)"
          stroke="rgba(255,255,255,0.5)"
          strokeWidth={1.5}
        />
      ))}
      {/* Crane hoist: line from top + box that bobs with scroll */}
      <line
        x1={700} x2={700} y1={160} y2={300}
        stroke="rgba(255,255,255,0.45)" strokeWidth={1.5}
      />
      <motion.rect
        x={680} width={40} height={14} rx={2}
        fill="var(--accent-400)"
        style={{ y: hookY }}
      />
    </>
  );
}

/* 02 · HVAC -------------------------------------------------------- */
function FanMotif({ progress }: MotifProps) {
  const prefersReduced = useReducedMotion();
  const rotate = useTransform(progress, [0, 1], [0, 720]);
  const ringOpacity = useTransform(progress, [0, 0.5, 1], [0.14, 0.32, 0.14]);
  return (
    <>
      {[280, 340, 400].map((r) => (
        <motion.circle
          key={r}
          cx={500} cy={500} r={r}
          fill="none"
          stroke="rgba(255,255,255,0.18)"
          strokeWidth={1}
          style={{ opacity: ringOpacity }}
        />
      ))}
      <motion.g
        style={{
          transformOrigin: "500px 500px",
          rotate: prefersReduced ? 0 : rotate,
        }}
      >
        {[0, 60, 120, 180, 240, 300].map((a) => {
          const rad = (a * Math.PI) / 180;
          const radCtl = ((a + 30) * Math.PI) / 180;
          return (
            <path
              key={a}
              d={`M 500 500 Q ${500 + 30 * Math.cos(radCtl)} ${500 + 30 * Math.sin(radCtl)} ${500 + 240 * Math.cos(rad)} ${500 + 240 * Math.sin(rad)}`}
              stroke="rgba(255,255,255,0.7)"
              strokeWidth={4}
              strokeLinecap="round"
              fill="none"
            />
          );
        })}
        <circle cx={500} cy={500} r={18} fill="rgba(255,255,255,0.55)" />
      </motion.g>
    </>
  );
}

/* 03 · Electrical & Lighting -------------------------------------- */
function CurrentMotif({ progress }: MotifProps) {
  return (
    <>
      {/* Left rail */}
      <rect
        x={160} y={280} width={60} height={440}
        rx={8}
        stroke="rgba(255,255,255,0.5)" strokeWidth={2} fill="rgba(59,111,224,0.04)"
      />
      {/* Right rail */}
      <rect
        x={780} y={280} width={60} height={440}
        rx={8}
        stroke="rgba(255,255,255,0.5)" strokeWidth={2} fill="rgba(59,111,224,0.04)"
      />
      {/* Bus bars between rails — always visible */}
      {[0, 1, 2, 3, 4].map((i) => (
        <line
          key={`bar-${i}`}
          x1={220} x2={780}
          y1={350 + i * 75} y2={350 + i * 75}
          stroke="rgba(255,255,255,0.25)"
          strokeWidth={1.5}
        />
      ))}
      {/* Travelling pulses — position driven by scroll, looping */}
      {[0, 1, 2, 3].map((i) => (
        <CurrentPulse key={i} i={i} progress={progress} />
      ))}
    </>
  );
}

function CurrentPulse({ i, progress }: { i: number; progress: MotionValue<number> }) {
  const cx = useTransform(progress, (v) => {
    const phase = (v * 1.6 + i * 0.23) % 1;
    return 220 + phase * 560;
  });
  const opacity = useTransform(progress, (v) => {
    const phase = (v * 1.6 + i * 0.23) % 1;
    // Fade in/out at the ends of the travel.
    if (phase < 0.08) return phase / 0.08;
    if (phase > 0.92) return (1 - phase) / 0.08;
    return 1;
  });
  return (
    <motion.circle
      cy={350 + i * 150}
      r={7}
      fill="var(--accent-400)"
      style={{ cx, opacity }}
    />
  );
}

/* 04 · Plumbing & Public Health ----------------------------------- */
function DropletsMotif({ progress }: MotifProps) {
  const drops = [260, 380, 500, 620, 740];
  return (
    <>
      {/* Pipe manifold — always visible */}
      <path
        d="M 240 340 L 240 240 L 760 240 L 760 340"
        stroke="rgba(255,255,255,0.5)"
        strokeWidth={3}
        fill="none"
        strokeLinecap="round"
      />
      {/* Drop tubes */}
      {drops.map((x) => (
        <line
          key={`t-${x}`}
          x1={x} x2={x} y1={240} y2={360}
          stroke="rgba(255,255,255,0.32)" strokeWidth={2}
        />
      ))}
      {drops.map((x, i) => (
        <Droplet key={x} x={x} i={i} progress={progress} />
      ))}
      {/* Reservoir line at bottom */}
      <line
        x1={180} x2={820} y1={800} y2={800}
        stroke="rgba(59,111,224,0.45)" strokeWidth={2}
      />
    </>
  );
}

function Droplet({ x, i, progress }: { x: number; i: number; progress: MotionValue<number> }) {
  const cy = useTransform(progress, (v) => {
    const phase = (v * 1.4 + i * 0.17) % 1;
    return 360 + phase * 440;
  });
  const opacity = useTransform(progress, (v) => {
    const phase = (v * 1.4 + i * 0.17) % 1;
    if (phase < 0.08) return phase / 0.08;
    if (phase > 0.9) return (1 - phase) / 0.1;
    return 1;
  });
  return (
    <motion.circle
      cx={x} r={8}
      fill="var(--accent-400)"
      style={{ cy, opacity }}
    />
  );
}

/* 05 · Firefighting & Safety -------------------------------------- */
function PulseMotif({ progress }: MotifProps) {
  return (
    <>
      {/* Cross-hair guides */}
      <line x1={200} x2={800} y1={500} y2={500} stroke="rgba(255,255,255,0.08)" strokeWidth={1} />
      <line x1={500} x2={500} y1={200} y2={800} stroke="rgba(255,255,255,0.08)" strokeWidth={1} />
      {/* Expanding rings driven by scroll — continuous loop */}
      {[0, 1, 2].map((i) => (
        <PulseRing key={i} i={i} progress={progress} />
      ))}
      {/* Core — always visible */}
      <circle cx={500} cy={500} r={26} fill="rgba(227,93,61,0.9)" />
      <circle cx={500} cy={500} r={44} fill="none" stroke="rgba(227,93,61,0.5)" strokeWidth={2} />
    </>
  );
}

function PulseRing({ i, progress }: { i: number; progress: MotionValue<number> }) {
  const scale = useTransform(progress, (v) => {
    const phase = (v * 1.3 + i * 0.33) % 1;
    return 0.3 + phase * 2.5;
  });
  const opacity = useTransform(progress, (v) => {
    const phase = (v * 1.3 + i * 0.33) % 1;
    return Math.max(0, 0.8 - phase);
  });
  return (
    <motion.circle
      cx={500} cy={500} r={100}
      fill="none"
      stroke="#E35D3D"
      strokeWidth={2}
      style={{ scale, opacity, transformOrigin: "500px 500px" }}
    />
  );
}

/* 06 · Solar & Renewable ------------------------------------------ */
function SunMotif({ progress }: MotifProps) {
  const rotate = useTransform(progress, [0, 1], [0, 180]);
  const ringScale = useTransform(progress, (v) => {
    const phase = (v * 1.2) % 1;
    return 0.5 + phase * 1.3;
  });
  const ringOpacity = useTransform(progress, (v) => {
    const phase = (v * 1.2) % 1;
    return Math.max(0, 0.5 - phase * 0.6);
  });
  return (
    <>
      {/* Panel array — always visible */}
      <g transform="translate(220, 640) skewX(-14)">
        {[0, 1, 2].map((row) =>
          [0, 1, 2, 3].map((col) => (
            <g key={`${row}-${col}`}>
              <rect
                x={col * 130} y={row * 60}
                width={110} height={48}
                rx={3}
                fill="rgba(59,111,224,0.08)"
                stroke="rgba(255,255,255,0.4)"
                strokeWidth={1.2}
              />
              {[0, 1, 2].map((line) => (
                <line
                  key={line}
                  x1={col * 130 + 8}
                  x2={col * 130 + 102}
                  y1={row * 60 + 12 + line * 12}
                  y2={row * 60 + 12 + line * 12}
                  stroke="rgba(255,255,255,0.14)"
                  strokeWidth={0.8}
                />
              ))}
            </g>
          )),
        )}
      </g>
      {/* Sun */}
      <g transform="translate(500, 360)">
        <motion.circle
          r={130}
          fill="none"
          stroke="rgba(255,255,255,0.22)"
          strokeWidth={1.5}
          style={{ scale: ringScale, opacity: ringOpacity, transformOrigin: "0px 0px" }}
        />
        <circle r={74} fill="rgba(59,111,224,0.4)" />
        <circle r={48} fill="var(--accent-400)" />
        <motion.g style={{ rotate, transformOrigin: "0px 0px" }}>
          {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
            <line
              key={a}
              x1={62 * Math.cos((a * Math.PI) / 180)}
              y1={62 * Math.sin((a * Math.PI) / 180)}
              x2={140 * Math.cos((a * Math.PI) / 180)}
              y2={140 * Math.sin((a * Math.PI) / 180)}
              stroke="rgba(255,255,255,0.6)"
              strokeWidth={2.5}
              strokeLinecap="round"
            />
          ))}
        </motion.g>
      </g>
    </>
  );
}

/* 07 · Building Management System --------------------------------- */
function GraphMotif({ progress }: MotifProps) {
  // Trend line is always fully drawn; a marker dot travels along it.
  const pts = [
    [180, 720], [280, 640], [380, 680], [480, 560],
    [580, 600], [680, 440], [780, 480], [820, 320],
  ] as const;
  const d = pts.map(([x, y], i) => `${i === 0 ? "M" : "L"} ${x} ${y}`).join(" ");
  const markerCx = useTransform(progress, (v) => {
    const t = v * (pts.length - 1);
    const i = Math.min(pts.length - 2, Math.floor(t));
    const f = t - i;
    return pts[i][0] * (1 - f) + pts[i + 1][0] * f;
  });
  const markerCy = useTransform(progress, (v) => {
    const t = v * (pts.length - 1);
    const i = Math.min(pts.length - 2, Math.floor(t));
    const f = t - i;
    return pts[i][1] * (1 - f) + pts[i + 1][1] * f;
  });
  return (
    <>
      {/* Grid — always visible */}
      {[0, 1, 2, 3, 4].map((i) => (
        <line
          key={`h-${i}`}
          x1={160} x2={840}
          y1={340 + i * 90}
          y2={340 + i * 90}
          stroke="rgba(255,255,255,0.08)"
          strokeWidth={1}
        />
      ))}
      {[0, 1, 2, 3, 4].map((i) => (
        <line
          key={`v-${i}`}
          x1={160 + i * 170}
          x2={160 + i * 170}
          y1={340} y2={700}
          stroke="rgba(255,255,255,0.05)"
          strokeWidth={1}
        />
      ))}
      {/* Full trend line always drawn */}
      <path
        d={d}
        fill="none"
        stroke="var(--accent-400)"
        strokeWidth={3}
        strokeLinecap="round"
      />
      {/* Waypoint dots */}
      {pts.map(([x, y], i) => (
        <circle
          key={i}
          cx={x} cy={y} r={3}
          fill="var(--accent-400)"
          opacity={0.6}
        />
      ))}
      {/* Travelling marker driven by scroll */}
      <motion.circle
        r={10}
        fill="var(--accent-400)"
        stroke="rgba(255,255,255,0.95)"
        strokeWidth={2}
        style={{ cx: markerCx, cy: markerCy }}
      />
    </>
  );
}
