import { Kit, type P3 } from "./kit";
import type { BuildingModel } from "./types";
import type { StagePalette } from "./stage";

/**
 * Shared kit of parts for the building models: storeys, plant and site
 * equipment, drawn from simple solids. Every model uses the same set of
 * systems, so one palette and one way of lighting serves them all.
 *
 * Positions follow kit.ts: x east, z south, y up, metres, each level
 * built around its own floor at y = 0.
 */
export type Sys =
  | "site"
  | "road"
  | "shell"
  | "glass"
  | "structure"
  // Furniture, machines, beds, desks: the things the services are there for.
  | "fit"
  // Chilled water and refrigerant plant and pipework.
  | "cooling"
  // Air handling: AHUs, ducts, fan filter units, fan coils.
  | "air"
  // A second air system, shown in navy: returns, exhaust, purification.
  | "air2"
  | "power"
  | "powerB"
  | "fire"
  // Plumbing, drainage, treatment, hot water.
  | "water"
  | "controls"
  // Process utilities, gases and low energy plant.
  | "process"
  // Envelope and finishes.
  | "env"
  // Solar and other green building systems.
  | "green";

export type Ctx = {
  k: Kit<Sys>;
  risers: BuildingModel<Sys>["risers"];
  flows: BuildingModel<Sys>["flows"];
};

export const newCtx = (): Ctx => ({ k: new Kit<Sys>(), risers: [], flows: [] });

const REST = "#c5cad3";
export const PALETTE: StagePalette<Sys> = {
  site: { base: "#eef0f3" },
  road: { base: "#e2e5ea" },
  shell: { base: "#f7f8fa" },
  glass: { base: "#9db7ee" },
  structure: { base: "#e3e6eb" },
  fit: { base: "#7d8492" },
  cooling: { base: REST },
  air: { base: REST },
  air2: { base: REST, lit: "#16307a" },
  power: { base: REST },
  powerB: { base: REST, lit: "#16307a" },
  fire: { base: REST },
  water: { base: REST },
  controls: { base: REST },
  process: { base: REST },
  env: { base: "#dfe3e9" },
  green: { base: REST },
};
export const ROLES = { shell: "shell", glass: "glass", racks: "fit" } as const;

/** Every service system, for the closing "all systems running" view. */
export const ALL_LIT: Partial<Record<Sys, number>> = {
  cooling: 1,
  air: 1,
  air2: 1,
  power: 1,
  powerB: 1,
  fire: 1,
  water: 1,
  controls: 1,
  process: 1,
  green: 1,
};

/* ------------------------------ Ground ------------------------------ */

export function plot(
  k: Kit<Sys>,
  L: number,
  x: number,
  z: number,
  w: number,
  d: number,
) {
  k.box("site", L, [w, 1.2, d], [x, -1.25, z]);
}
export function road(
  k: Kit<Sys>,
  L: number,
  x: number,
  z: number,
  w: number,
  d: number,
) {
  k.box("road", L, [w, 0.05, d], [x, -0.05, z], { edge: false });
}

/* ------------------------------ Storeys ------------------------------ */

type Rect = { x: number; z: number; w: number; d: number };

export function slab(k: Kit<Sys>, l: number, r: Rect, t = 0.5) {
  k.box("structure", l, [r.w + 0.6, t, r.d + 0.6], [r.x, -t, r.z]);
}

/** Low upstand, so a floor reads as a tray when its walls are away. */
export function rim(k: Kit<Sys>, l: number, r: Rect, h = 0.9) {
  const o = { edge: false };
  k.box("structure", l, [r.w, h, 0.3], [r.x, 0, r.z + r.d / 2 - 0.15], o);
  k.box("structure", l, [r.w, h, 0.3], [r.x, 0, r.z - r.d / 2 + 0.15], o);
  k.box("structure", l, [0.3, h, r.d - 0.6], [r.x + r.w / 2 - 0.15, 0, r.z], o);
  k.box("structure", l, [0.3, h, r.d - 0.6], [r.x - r.w / 2 + 0.15, 0, r.z], o);
}

export function cols(k: Kit<Sys>, l: number, r: Rect, h: number, pitch = 12) {
  const nx = Math.max(1, Math.round(r.w / pitch));
  const nz = Math.max(1, Math.round(r.d / pitch));
  for (let i = 0; i <= nx; i++)
    for (let j = 0; j <= nz; j++) {
      if (i > 0 && i < nx && j > 0 && j < nz) continue;
      const x = r.x - r.w / 2 + 0.6 + ((r.w - 1.2) * i) / nx;
      const z = r.z - r.d / 2 + 0.6 + ((r.d - 1.2) * j) / nz;
      k.box("structure", l, [0.8, h - 0.5, 0.8], [x, 0, z], { edge: false });
    }
}

type WallOpts = {
  /** Sides that carry facade fins. */
  fins?: string;
  pitch?: number;
  /** Glazed stretch of the south front: from x, to x, height. */
  glassS?: [number, number, number];
  /** Horizontal lines on the walls, one per storey inside this level. */
  storeys?: number;
};

/** Outer walls of one level, with optional fins, glazing and storey lines. */
export function walls(
  k: Kit<Sys>,
  l: number,
  r: Rect,
  h: number,
  o: WallOpts = {},
) {
  const x0 = r.x - r.w / 2;
  const x1 = r.x + r.w / 2;
  const z0 = r.z - r.d / 2;
  const z1 = r.z + r.d / 2;
  k.box("shell", l, [r.w + 0.6, h, 0.3], [r.x, 0, z0 - 0.15]);
  k.box("shell", l, [0.3, h, r.d], [x1 + 0.15, 0, r.z]);
  k.box("shell", l, [0.3, h, r.d], [x0 - 0.15, 0, r.z]);
  if (o.glassS) {
    const [g0, g1, gh] = o.glassS;
    if (g0 > x0)
      k.box(
        "shell",
        l,
        [g0 - x0 + 0.3, h, 0.3],
        [(g0 + x0 - 0.3) / 2, 0, z1 + 0.15],
      );
    if (g1 < x1)
      k.box(
        "shell",
        l,
        [x1 - g1 + 0.3, h, 0.3],
        [(g1 + x1 + 0.3) / 2, 0, z1 + 0.15],
      );
    k.box("glass", l, [g1 - g0, gh, 0.2], [(g0 + g1) / 2, 0, z1 + 0.15]);
    if (gh < h)
      k.box("shell", l, [g1 - g0, h - gh, 0.3], [(g0 + g1) / 2, gh, z1 + 0.15]);
  } else {
    k.box("shell", l, [r.w + 0.6, h, 0.3], [r.x, 0, z1 + 0.15]);
  }
  const pitch = o.pitch ?? 4;
  const fins = o.fins ?? "se";
  const e = { edge: false };
  if (fins.includes("s"))
    for (let x = x0 + 2; x <= x1 - 1.9; x += pitch) {
      if (o.glassS && x > o.glassS[0] - 0.5 && x < o.glassS[1] + 0.5) continue;
      k.box("shell", l, [0.28, h - 0.6, 0.45], [x, 0.3, z1 + 0.5], e);
    }
  if (fins.includes("n"))
    for (let x = x0 + 2; x <= x1 - 1.9; x += pitch)
      k.box("shell", l, [0.28, h - 0.6, 0.45], [x, 0.3, z0 - 0.5], e);
  if (fins.includes("e"))
    for (let z = z0 + 2; z <= z1 - 1.9; z += pitch)
      k.box("shell", l, [0.45, h - 0.6, 0.28], [x1 + 0.5, 0.3, z], e);
  if (fins.includes("w"))
    for (let z = z0 + 2; z <= z1 - 1.9; z += pitch)
      k.box("shell", l, [0.45, h - 0.6, 0.28], [x0 - 0.5, 0.3, z], e);
  // Storey lines: thin bands that read as slab edges on a tall level.
  for (let s = 1; s < (o.storeys ?? 1); s++) {
    const y = (h * s) / (o.storeys ?? 1);
    k.box("structure", l, [r.w + 0.9, 0.35, r.d + 0.9], [r.x, y - 0.35, r.z]);
  }
}

/** One complete storey: slab, rim, perimeter columns and outer walls. */
export function storey(
  k: Kit<Sys>,
  l: number,
  r: Rect,
  h: number,
  o: WallOpts = {},
) {
  slab(k, l, r);
  rim(k, l, r);
  cols(k, l, r, h);
  walls(k, l, r, h, o);
}

/** Roof deck with a parapet. */
export function roofDeck(k: Kit<Sys>, l: number, r: Rect) {
  slab(k, l, r);
  const z0 = r.z - r.d / 2;
  const z1 = r.z + r.d / 2;
  k.box("shell", l, [r.w + 0.6, 1.2, 0.3], [r.x, 0, z1 + 0.15]);
  k.box("shell", l, [r.w + 0.6, 1.2, 0.3], [r.x, 0, z0 - 0.15]);
  k.box("shell", l, [0.3, 1.2, r.d], [r.x + r.w / 2 + 0.15, 0, r.z]);
  k.box("shell", l, [0.3, 1.2, r.d], [r.x - r.w / 2 - 0.15, 0, r.z]);
}

/** Cut partition, 1.1 m high, along x or z. */
export function wall(
  k: Kit<Sys>,
  l: number,
  a: [number, number],
  b: [number, number],
  h = 1.1,
  sys: Sys = "structure",
) {
  const dx = Math.abs(b[0] - a[0]);
  const dz = Math.abs(b[1] - a[1]);
  k.box(
    sys,
    l,
    [dx + 0.25, h, dz + 0.25],
    [(a[0] + b[0]) / 2, 0, (a[1] + b[1]) / 2],
    { edge: false },
  );
}

/* ------------------------------ HVAC plant ------------------------------ */

/** Water cooled chiller, 9 m long, lying along x. */
export function chiller(k: Kit<Sys>, l: number, x: number, z: number, y = 0) {
  k.box("structure", l, [9.6, 0.3, 3.2], [x, y, z], { edge: false });
  k.box("cooling", l, [9, 0.35, 2.6], [x, y + 0.3, z]);
  k.cyl("cooling", l, 0.72, 8.2, [x, y + 1.4, z - 0.62], { axis: "x" });
  k.cyl("cooling", l, 0.6, 8.2, [x, y + 1.3, z + 0.7], { axis: "x" });
  k.box("cooling", l, [3.2, 1, 1.5], [x - 1.2, y + 2, z]);
}

export function tower(k: Kit<Sys>, l: number, x: number, z: number, y = 0) {
  k.box("structure", l, [5.4, 0.4, 5.2], [x, y, z], { edge: false });
  k.box("cooling", l, [4.9, 3.6, 4.7], [x, y + 0.4, z]);
  k.cyl("cooling", l, 1.9, 1, [x, y + 4, z], { seg: 28, top: 1.75 });
}

export function pump(
  k: Kit<Sys>,
  l: number,
  x: number,
  z: number,
  sys: Sys = "cooling",
  y = 0,
) {
  k.box("structure", l, [2.6, 0.25, 1.2], [x, y, z], { edge: false });
  k.cyl(sys, l, 0.42, 1.2, [x - 0.5, y + 0.75, z], { axis: "x", seg: 16 });
  k.cyl(sys, l, 0.55, 0.5, [x + 0.6, y + 0.8, z], { axis: "x", seg: 16 });
}

/** Upright tank on a pad. */
export function vtank(
  k: Kit<Sys>,
  sys: Sys,
  l: number,
  x: number,
  z: number,
  r: number,
  h: number,
  y = 0,
) {
  k.box("structure", l, [r * 2 + 0.8, 0.3, r * 2 + 0.8], [x, y, z], {
    edge: false,
  });
  k.cyl(sys, l, r, h, [x, y + 0.3, z], { seg: 32 });
}

/** Air handling unit lying along x, with a fan section and intake hood. */
export function ahu(
  k: Kit<Sys>,
  l: number,
  x: number,
  z: number,
  len = 6,
  sys: Sys = "air",
  y = 0,
) {
  k.box("structure", l, [len + 0.6, 0.25, 3], [x, y, z], { edge: false });
  k.box(sys, l, [len, 2.4, 2.4], [x, y + 0.25, z]);
  k.box(sys, l, [1.2, 1.5, 2], [x - len / 2 - 0.6, y + 0.7, z]);
  k.cyl(sys, l, 0.7, 0.12, [x + len / 2 - 1.2, y + 1.45, z + 1.22], {
    axis: "z",
  });
}

/** Rectangular duct through axis aligned points. */
export function duct(
  k: Kit<Sys>,
  l: number,
  pts: P3[],
  w = 1.2,
  h = 0.6,
  sys: Sys = "air",
) {
  for (let i = 0; i < pts.length - 1; i++) {
    const a = pts[i];
    const b = pts[i + 1];
    const dx = Math.abs(b[0] - a[0]);
    const dy = Math.abs(b[1] - a[1]);
    const dz = Math.abs(b[2] - a[2]);
    const size: P3 =
      dy > 0.01 ? [w, dy + h, w] : dx > dz ? [dx + w, h, w] : [w, h, dz + w];
    k.box(
      sys,
      l,
      size,
      [
        (a[0] + b[0]) / 2,
        Math.min(a[1], b[1]) - (dy > 0.01 ? h / 2 : h / 2),
        (a[2] + b[2]) / 2,
      ],
      { edge: false },
    );
  }
}

/* ------------------------------ Power ------------------------------ */

/** Diesel generator in an acoustic enclosure, lying along x. */
export function dg(k: Kit<Sys>, L: number, x: number, z: number) {
  k.box("structure", L, [11.4, 0.45, 3.6], [x, 0.07, z]);
  k.box("power", L, [10.4, 3, 2.8], [x, 0.52, z]);
  k.cyl("power", L, 0.5, 3.2, [x + 1.4, 4.05, z], { axis: "x", seg: 16 });
  k.cyl("power", L, 0.3, 5.2, [x + 4.2, 3.5, z], { seg: 14 });
}

export function transformer(k: Kit<Sys>, L: number, x: number, z: number) {
  k.box("structure", L, [4.6, 0.5, 5], [x, 0.07, z]);
  k.box("power", L, [3, 2.7, 2.1], [x, 0.57, z]);
  for (const dz of [-1.5, 1.5])
    k.box("power", L, [2.5, 2.1, 0.55], [x, 0.9, z + dz]);
  k.cyl("power", L, 0.42, 2.5, [x, 3.9, z], { axis: "x", seg: 14 });
}

export function substation(
  k: Kit<Sys>,
  L: number,
  x: number,
  z: number,
  w = 16,
  d = 7,
) {
  k.box("power", L, [w, 5.4, d], [x, 0.07, z]);
  k.box("power", L, [w + 0.6, 0.3, d + 0.6], [x, 5.47, z], { edge: false });
}

/** A line up of panels or cabinets. */
export function panels(
  k: Kit<Sys>,
  sys: Sys,
  l: number,
  x: number,
  z: number,
  n: number,
  axis: "x" | "z" = "x",
  h = 2.2,
  y = 0,
) {
  for (let i = 0; i < n; i++)
    k.box(
      sys,
      l,
      axis === "x" ? [1.2, h, 0.9] : [0.9, h, 1.2],
      axis === "x" ? [x + 1.3 * i, y, z] : [x, y, z + 1.3 * i],
    );
}

/** A cable route at grade: a trench cover (civil) with the feeder on it. */
export function feeder(
  c: Ctx,
  L: number,
  pts: [number, number][],
  sys: Sys = "power",
) {
  for (let i = 0; i < pts.length - 1; i++) {
    const [ax, az] = pts[i];
    const [bx, bz] = pts[i + 1];
    const dx = Math.abs(bx - ax);
    const dz = Math.abs(bz - az);
    const at: P3 = [(ax + bx) / 2, 0.02, (az + bz) / 2];
    c.k.box("structure", L, [dx + 1.7, 0.16, dz + 1.7], at, { edge: false });
    c.k.box(sys, L, [dx + 0.5, 0.1, dz + 0.5], [at[0], 0.18, at[2]], {
      edge: false,
    });
  }
  c.flows.push({ sys, lvl: L, pts: pts.map(([x, z]) => [x, 0.4, z] as P3) });
}

/* ------------------------------ Fire ------------------------------ */

/** Fire water tank, pump house, and a hydrant ring main with posts. */
export function fireYard(
  c: Ctx,
  L: number,
  o: {
    tank: [number, number];
    house: [number, number];
    ring: [number, number, number, number];
  },
) {
  const { k } = c;
  const [tx, tz] = o.tank;
  const [hx, hz] = o.house;
  k.box("structure", L, [12, 0.3, 12], [tx, 0.07, tz], { edge: false });
  k.cyl("fire", L, 5.2, 7.6, [tx, 0.37, tz], { seg: 40 });
  k.box("fire", L, [9.5, 4.2, 6.6], [hx, 0.07, hz]);
  k.box("fire", L, [10.1, 0.3, 7.2], [hx, 4.27, hz], { edge: false });
  k.pipe(
    "fire",
    L,
    [
      [tx, 0.9, tz],
      [hx, 0.9, hz],
    ],
    0.25,
  );
  const [x0, z0, x1, z1] = o.ring;
  const ring: P3[] = [
    [x0, 0.28, z1],
    [x1, 0.28, z1],
    [x1, 0.28, z0],
    [x0, 0.28, z0],
    [x0, 0.28, z1],
  ];
  k.pipe("fire", L, ring, 0.2);
  // Feed from the pump house to the nearest corner of the ring.
  const cx = Math.abs(hx - x0) < Math.abs(hx - x1) ? x0 : x1;
  const cz = Math.abs(hz - z0) < Math.abs(hz - z1) ? z0 : z1;
  k.pipe(
    "fire",
    L,
    [
      [hx, 0.28, hz],
      [hx, 0.28, cz],
      [cx, 0.28, cz],
    ],
    0.2,
  );
  const post = (x: number, z: number) => {
    k.cyl("fire", L, 0.2, 1.25, [x, 0.07, z], { seg: 10, edge: false });
    k.cyl("fire", L, 0.3, 0.28, [x, 1.2, z], { seg: 10, edge: false });
  };
  const nx = Math.max(2, Math.round((x1 - x0) / 14));
  const nz = Math.max(2, Math.round((z1 - z0) / 14));
  for (let i = 0; i <= nx; i++) {
    post(x0 + ((x1 - x0) * i) / nx, z0);
    post(x0 + ((x1 - x0) * i) / nx, z1);
  }
  for (let j = 1; j < nz; j++) {
    post(x0, z0 + ((z1 - z0) * j) / nz);
    post(x1, z0 + ((z1 - z0) * j) / nz);
  }
  c.flows.push({ sys: "fire", lvl: L, pts: ring });
}

/** Sprinkler main along x with branches along z. */
export function sprinklers(
  c: Ctx,
  l: number,
  x0: number,
  x1: number,
  z0: number,
  z1: number,
  y: number,
  pitch = 3,
) {
  const zc = (z0 + z1) / 2;
  c.k.pipe(
    "fire",
    l,
    [
      [x0, y, zc],
      [x1, y, zc],
    ],
    0.2,
  );
  for (let x = x0 + pitch / 2; x < x1; x += pitch)
    c.k.pipe(
      "fire",
      l,
      [
        [x, y, z0],
        [x, y, z1],
      ],
      0.09,
      8,
    );
  c.flows.push({
    sys: "fire",
    lvl: l,
    pts: [
      [x0, y, zc],
      [x1, y, zc],
    ],
  });
}

/* ------------------------------ Controls ------------------------------ */

export function cctv(k: Kit<Sys>, L: number, pts: [number, number][]) {
  for (const [x, z] of pts) {
    k.cyl("controls", L, 0.14, 7, [x, 0, z], { seg: 8, edge: false });
    k.box("controls", L, [0.7, 0.3, 0.3], [x, 6.7, z + 0.3], { edge: false });
  }
}

export function dots(k: Kit<Sys>, sys: Sys, l: number, pts: P3[], r = 0.28) {
  for (const p of pts) k.ball(sys, l, r, p);
}

/** Control room: a video wall facing south, with rows of desks before it. */
export function controlRoom(
  k: Kit<Sys>,
  l: number,
  x: number,
  z: number,
  w = 14,
) {
  k.box("controls", l, [w, 3.2, 0.3], [x, 1.1, z]);
  for (const dz of [3.2, 6.2])
    for (let i = 0; i < Math.floor(w / 4); i++) {
      const dx = x - w / 2 + 2 + 4 * i;
      k.box("fit", l, [3.2, 0.78, 1], [dx, 0, z + dz]);
      k.box("controls", l, [2.4, 0.55, 0.07], [dx, 0.95, z + dz - 0.25], {
        edge: false,
      });
    }
}

/* ------------------------------ Green ------------------------------ */

/** Rows of solar panels over a rectangle. */
export function solar(
  k: Kit<Sys>,
  l: number,
  x0: number,
  x1: number,
  z0: number,
  z1: number,
  y = 0.4,
) {
  for (let z = z0 + 1; z <= z1 - 0.9; z += 3)
    k.box("green", l, [x1 - x0, 0.12, 1.9], [(x0 + x1) / 2, y + 0.5, z]);
  for (let x = x0 + 1; x <= x1 - 0.9; x += 6)
    for (let z = z0 + 1; z <= z1 - 0.9; z += 3)
      k.box("structure", l, [0.12, 0.5, 0.12], [x, y, z], { edge: false });
}

export function finish(
  c: Ctx,
  levelY: number[],
  gap: number,
  anchors: BuildingModel<Sys>["anchors"],
): BuildingModel<Sys> {
  return {
    levelY,
    siteLevel: levelY.length,
    gap,
    parts: c.k.build(),
    risers: c.risers,
    flows: c.flows,
    anchors,
  };
}
