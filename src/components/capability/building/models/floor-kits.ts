import type { P3 } from "../kit";
import type { BuildingView, ModelPack, Anchor } from "../types";
import * as P from "../parts";
import type { Sys } from "../parts";

/**
 * A tower with repeating floors. One typical floor is laid out on the
 * ground as the frozen design; the tower repeats it on every floor. Kits
 * wait on a truck, and one rides the hoist to its floor as the reader
 * scrolls (it is the only part on a level that lifts).
 * A diagram of the method, not a drawing of one project.
 */
const FH = 5.2;
const FLOORS = 7;
/** The kit on the hoist rides to this floor. */
const TO = 5;
const Y = [0, 0];
const KIT = 1;
const SITE = 2;
const TOWER = { x: 10, z: 0, w: 46, d: 30 };
/** The typical floor, laid out at grade west of the tower. */
const PLAN = { x: -58, z: 0 };
const HOIST = { x: TOWER.x + TOWER.w / 2 + 5.2, z: 9 };

function build() {
  const c = P.newCtx();
  const { k } = c;
  const e = { edge: false };

  /** The services of one floor: riser set, main spools, branch trees. */
  const floorKit = (
    lvl: number,
    ox: number,
    y: number,
    oz: number,
    soffit: boolean,
  ) => {
    const my = y + (soffit ? FH - 1.2 : 0.7);
    // Riser set at the shaft, west end.
    for (const dz of [-1.2, 0, 1.2])
      k.cyl(
        "cooling",
        lvl,
        0.34,
        soffit ? FH - 0.5 : 2.4,
        [ox - 19, y, oz + dz],
        { seg: 12 },
      );
    k.pipe(
      "cooling",
      lvl,
      [
        [ox - 19, my, oz],
        [ox - 16, my, oz],
      ],
      0.3,
      10,
    );
    // Main spools along the corridor, flanged at each joint.
    k.pipe(
      "cooling",
      lvl,
      [
        [ox - 16, my, oz],
        [ox + 20, my, oz],
      ],
      0.36,
      12,
    );
    for (let x = -16; x <= 20.01; x += 9)
      k.cyl("cooling", lvl, 0.56, 0.24, [ox + x, my, oz], {
        axis: "x",
        seg: 14,
      });
    // Branch trees with their drops.
    for (const x of [-11.5, -2.5, 6.5, 15.5]) {
      k.pipe(
        "cooling",
        lvl,
        [
          [ox + x, my, oz - 11.5],
          [ox + x, my, oz + 11.5],
        ],
        0.22,
        8,
      );
      for (const z of [-10, -5, 5, 10])
        k.cyl("cooling", lvl, 0.16, 0.7, [ox + x, my - 0.7, oz + z], {
          seg: 8,
          edge: false,
        });
      if (soffit)
        for (const z of [-8, 8])
          k.box("structure", lvl, [0.08, 1.2, 0.08], [ox + x, my, oz + z], e);
    }
  };
  /** A kit wagon: frame, spools, branch trees, consumables and tag. */
  const wagon = (lvl: number, x: number, z: number, y = 0) => {
    k.box("air2", lvl, [7, 0.3, 3.2], [x, y + 0.5, z]);
    for (const dx of [-3.4, 3.4])
      for (const dz of [-1.5, 1.5])
        k.box("air2", lvl, [0.24, 3, 0.24], [x + dx, y + 0.8, z + dz], e);
    for (const dz of [-1.5, 1.5])
      k.box("air2", lvl, [7, 0.24, 0.24], [x, y + 3.6, z + dz], e);
    for (const dx of [-2.5, 2.5])
      k.cyl("fit", lvl, 0.4, 3.4, [x + dx, y + 0.4, z], {
        axis: "z",
        seg: 12,
        edge: false,
      });
    for (let i = 0; i < 4; i++)
      k.cyl(
        "cooling",
        lvl,
        0.3,
        6,
        [x, y + 1.15 + 0.66 * (i % 2), z - 0.9 + 0.6 * i],
        { axis: "x", seg: 10, edge: false },
      );
    for (let i = 0; i < 3; i++)
      k.cyl("cooling", lvl, 0.18, 6, [x, y + 2.6, z - 0.6 + 0.6 * i], {
        axis: "x",
        seg: 8,
        edge: false,
      });
    k.box("air2", lvl, [1.7, 1.1, 1.2], [x + 2.2, y + 2.3, z - 0.7]);
    k.box("controls", lvl, [0.8, 0.8, 0.08], [x - 1.4, y + 2.6, z + 1.64], e);
  };

  /* ---------- Plot ---------- */
  P.plot(k, SITE, 2, 0, 204, 104);
  P.road(k, SITE, 64, 0, 44, 96);

  /* ---------- The typical floor, as designed ---------- */
  k.box(
    "structure",
    SITE,
    [TOWER.w + 0.6, 0.5, TOWER.d + 0.6],
    [PLAN.x, 0, PLAN.z],
  );
  for (const dx of [-TOWER.w / 2 + 0.6, -7.5, 7.5, TOWER.w / 2 - 0.6])
    for (const dz of [-TOWER.d / 2 + 0.6, TOWER.d / 2 - 0.6])
      k.box(
        "structure",
        SITE,
        [0.9, 1.1, 0.9],
        [PLAN.x + dx, 0.5, PLAN.z + dz],
        e,
      );
  k.box("structure", SITE, [5, 1.1, 8], [PLAN.x - 20, 0.5, PLAN.z - 9], e);
  floorKit(SITE, PLAN.x, 0.5, PLAN.z, false);

  /* ---------- The tower: the same floor, seven times ---------- */
  for (let f = 0; f <= FLOORS; f++) {
    const y = FH * f;
    // Floor slabs are drawn as shell, so the last view can look through them.
    k.box(
      "shell",
      0,
      [TOWER.w + 0.6, 0.5, TOWER.d + 0.6],
      [TOWER.x, y - 0.5, TOWER.z],
    );
    if (f === FLOORS) break;
    for (const dx of [-TOWER.w / 2 + 0.6, -7.5, 7.5, TOWER.w / 2 - 0.6])
      for (const dz of [-TOWER.d / 2 + 0.6, TOWER.d / 2 - 0.6])
        k.box(
          "structure",
          0,
          [0.9, FH - 0.5, 0.9],
          [TOWER.x + dx, y, TOWER.z + dz],
          e,
        );
    k.box("structure", 0, [5, FH - 0.5, 8], [TOWER.x - 20, y, TOWER.z - 9], e);
    floorKit(0, TOWER.x, y, TOWER.z, true);
    // The lower floors are closed in already.
    if (f < 3) {
      k.box(
        "shell",
        0,
        [TOWER.w + 0.6, FH - 0.5, 0.3],
        [TOWER.x, y, TOWER.z - TOWER.d / 2 - 0.15],
      );
      k.box(
        "shell",
        0,
        [0.3, FH - 0.5, TOWER.d],
        [TOWER.x - TOWER.w / 2 - 0.15, y, TOWER.z],
      );
      k.box(
        "glass",
        0,
        [TOWER.w + 0.6, FH - 0.5, 0.2],
        [TOWER.x, y, TOWER.z + TOWER.d / 2 + 0.15],
      );
    }
  }

  /* ---------- Hoist ---------- */
  k.box(
    "structure",
    SITE,
    [1.5, FH * FLOORS + 3, 1.5],
    [HOIST.x + 5.2, 0, HOIST.z],
  );
  for (let f = 1; f < FLOORS; f++)
    k.box(
      "structure",
      SITE,
      [1.6, 0.3, 4.4],
      [TOWER.x + TOWER.w / 2 + 1.1, FH * f - 0.3, HOIST.z],
      e,
    );
  k.box("structure", KIT, [8.4, 0.3, 4.6], [HOIST.x, 0.2, HOIST.z]);
  for (const dz of [-2.2, 2.2])
    k.box("structure", KIT, [8.4, 1.1, 0.12], [HOIST.x, 0.5, HOIST.z + dz], e);
  wagon(KIT, HOIST.x, HOIST.z, 0.2);

  /* ---------- Truck with the next kits, and one more waiting ---------- */
  k.box("power", SITE, [26, 0.5, 4], [66, 1.4, -8]);
  k.box("power", SITE, [3.6, 3.6, 3.8], [81.4, 0.6, -8]);
  for (const dx of [-11, -8, 6, 9, 15.4])
    k.cyl("fit", SITE, 0.75, 4.2, [66 + dx, 0.75, -8], {
      axis: "z",
      seg: 14,
      edge: false,
    });
  for (const dx of [-8.4, 0, 8.4]) wagon(SITE, 66 + dx, -8, 1.4);
  wagon(SITE, 56, 22);
  k.box("controls", SITE, [0.5, 2.2, 0.5], [86, 0, 30]);
  k.box("controls", SITE, [0.2, 0.2, 14], [86, 2.2, 37], e);

  const a = (lvl: number, at: P3): Anchor => ({ lvl, at });
  return P.finish(c, Y, FH * TO, {
    riserset: a(SITE, [PLAN.x - 19, 3.2, PLAN.z]),
    spool: a(SITE, [PLAN.x + 2, 1.7, PLAN.z]),
    branch: a(SITE, [PLAN.x + 15.5, 1.5, PLAN.z + 9]),
    wagon: a(SITE, [66, 5.6, -8]),
    consumables: a(SITE, [58.2, 3.6, 21.3]),
    truck: a(SITE, [81.4, 4.6, -8]),
    mast: a(SITE, [HOIST.x + 5.2, FH * 3, HOIST.z]),
    cage: a(KIT, [HOIST.x, 4.4, HOIST.z]),
    fixed: a(0, [TOWER.x + 20, FH * TO + FH - 0.8, TOWER.z]),
  });
}

const S = (at: P3): Anchor => ({ lvl: SITE, at });
const views: Record<string, BuildingView<Sys>> = {
  intro: {
    target: S([4, 16, 0]),
    azimuth: 34,
    elevation: 22,
    distance: 430,
    explode: 0,
    shell: 1,
    lit: {},
  },
  design: {
    target: S([PLAN.x + 4, 2, 0]),
    azimuth: 22,
    elevation: 44,
    distance: 210,
    explode: 0,
    shell: 1,
    lit: { cooling: 1 },
  },
  kit: {
    target: S([62, 3, 4]),
    azimuth: 56,
    elevation: 28,
    distance: 200,
    explode: 0,
    shell: 1,
    lit: { air2: 1 },
  },
  // The kit rides the hoist to its floor on the way into this view.
  deliver: {
    target: S([34, 15, 6]),
    azimuth: 58,
    elevation: 16,
    distance: 320,
    explode: 1,
    shell: 0.3,
    lit: { air2: 1, power: 1 },
  },
  fix: {
    target: S([TOWER.x + 2, 17, 0]),
    azimuth: 28,
    elevation: 24,
    distance: 380,
    explode: 1,
    shell: 0.1,
    lit: { cooling: 1 },
  },
};

export const PACK: ModelPack<Sys> = {
  build,
  views,
  palette: P.PALETTE,
  roles: P.ROLES,
};
