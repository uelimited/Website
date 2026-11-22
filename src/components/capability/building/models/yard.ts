import type { P3 } from "../kit";
import type { BuildingView, ModelPack, Anchor } from "../types";
import * as P from "../parts";
import type { Sys } from "../parts";

/**
 * The prefabrication yard: design office, store, workshop shed with the
 * cutting line, fabrication bays and test bay, the kitting area and the
 * dispatch yard with its gate. A small site stands in one corner, so the
 * last two steps (hoist and install) can be shown.
 * A diagram of the flow, not a survey of the yard at Bhondsi.
 */
const Y = [0, 9];
const SITE = 2;
type Rect = { x: number; z: number; w: number; d: number };
const SHED: Rect = { x: -2, z: -24, w: 76, d: 40 };
const STORE: Rect = { x: -70, z: -29, w: 36, d: 30 };
const OFFICE: Rect = { x: -75, z: 17, w: 26, d: 18 };
/** The site corner: a four storey frame with a hoist. */
const TOWER = { x: 68, z: 44, w: 22, d: 16, fh: 6 };

function build() {
  const c = P.newCtx();
  const { k } = c;
  const e = { edge: false };

  /** A pipe spool on its trestles, with its QR tag. */
  const spool = (
    lvl: number,
    x: number,
    y: number,
    z: number,
    len: number,
    trestles = true,
  ) => {
    k.pipe(
      "cooling",
      lvl,
      [
        [x - len / 2, y, z],
        [x + len / 2, y, z],
        [x + len / 2, y, z + 2.4],
      ],
      0.3,
      10,
    );
    k.cyl("cooling", lvl, 0.5, 0.22, [x - len / 2, y, z], {
      axis: "x",
      seg: 12,
    });
    k.cyl("cooling", lvl, 0.5, 0.22, [x + len / 2, y, z + 2.4], {
      axis: "z",
      seg: 12,
    });
    k.box("controls", lvl, [0.7, 0.7, 0.08], [x - 0.6, y + 0.3, z + 0.34], e);
    if (trestles)
      for (const dx of [-len / 3, len / 3])
        k.box("structure", lvl, [0.3, y - 0.3, 2.2], [x + dx, 0, z], e);
  };
  /** A kit wagon: frame, spools, consumables box and tag. */
  const wagon = (lvl: number, x: number, z: number, y = 0) => {
    k.box("air2", lvl, [6.2, 0.3, 2.8], [x, y + 0.5, z]);
    for (const dx of [-3, 3])
      for (const dz of [-1.3, 1.3])
        k.box("air2", lvl, [0.22, 2.8, 0.22], [x + dx, y + 0.8, z + dz], e);
    for (const dz of [-1.3, 1.3])
      k.box("air2", lvl, [6.2, 0.22, 0.22], [x, y + 3.4, z + dz], e);
    for (const dx of [-2.2, 2.2])
      k.cyl("fit", lvl, 0.36, 3, [x + dx, y + 0.36, z], {
        axis: "z",
        seg: 12,
        edge: false,
      });
    for (let i = 0; i < 3; i++)
      k.cyl(
        "cooling",
        lvl,
        0.26,
        5.4,
        [x, y + 1.15 + 0.62 * i, z - 0.6 + 0.4 * i],
        { axis: "x", seg: 10, edge: false },
      );
    k.box("air2", lvl, [1.5, 1, 1.1], [x + 1.9, y + 0.8, z + 0.7]);
    k.box("controls", lvl, [0.7, 0.7, 0.08], [x - 1, y + 2.4, z + 1.42], e);
  };
  /** A flatbed truck along x, optionally carrying two kit wagons. */
  const truck = (x: number, z: number, loaded: boolean) => {
    k.box("power", SITE, [14, 0.5, 3.4], [x, 1.3, z]);
    k.box("power", SITE, [3.2, 3.2, 3.2], [x + 8.6, 0.6, z]);
    for (const dx of [-5, -2.6, 4, 8.6])
      k.cyl("fit", SITE, 0.7, 3.6, [x + dx, 0.7, z], {
        axis: "z",
        seg: 14,
        edge: false,
      });
    if (loaded) for (const dx of [-3.4, 3.4]) wagon(SITE, x + dx, z, 1.3);
  };

  /* ---------- Plot ---------- */
  P.plot(k, SITE, 0, 0, 208, 128);
  P.road(k, SITE, 66, 0, 52, 30);
  P.road(k, SITE, 96, 14, 8, 84);
  P.road(k, SITE, 20, 20, 150, 7);

  /* ---------- Workshop shed ---------- */
  k.box("road", 0, [SHED.w, 0.14, SHED.d], [SHED.x, 0, SHED.z], e);
  P.cols(k, 0, SHED, 9, 12);
  P.walls(k, 0, SHED, 9, { fins: "" });
  k.box("structure", 1, [SHED.w + 2, 0.5, SHED.d + 2], [SHED.x, 0, SHED.z]);
  for (let x = -30; x <= 26.01; x += 14)
    k.box("glass", 1, [6, 0.2, 26], [x, 0.5, SHED.z], e);
  // Cutting line along the north wall: conveyor, saw, groove and thread machines.
  k.box("process", 0, [26, 0.9, 1.6], [-22, 0, -39]);
  for (let x = -34; x <= -10.01; x += 3)
    k.cyl("process", 0, 0.28, 1.8, [x, 1.05, -39], {
      axis: "z",
      seg: 10,
      edge: false,
    });
  k.box("process", 0, [2.6, 2.8, 2.8], [-6, 0, -39]);
  k.cyl("process", 0, 1.3, 0.25, [-6, 2.2, -37.4], { axis: "z", seg: 20 });
  for (const x of [2, 8, 14]) {
    k.box("process", 0, [2.4, 1.7, 1.8], [x, 0, -39]);
    k.cyl("process", 0, 0.5, 1.2, [x, 2.1, -39], { axis: "x", seg: 14 });
  }
  for (let i = 0; i < 4; i++)
    k.cyl("fit", 0, 0.3, 12, [-22, 1.3 + 0.001 * i, -39.4 + 0.5 * i], {
      axis: "x",
      seg: 10,
      edge: false,
    });
  // Fabrication bays: spools on trestles, two rows.
  for (const x of [-26, -10, 6])
    for (const z of [-28, -18]) spool(0, x, 1.3, z, 9);
  // Welding and assembly tables.
  for (const x of [-26, -10, 6]) k.box("process", 0, [3, 1, 1.6], [x, 0, -11]);
  // Test bay: manifold of spools under pressure, test pump and gauge.
  for (const z of [-30, -25, -20]) spool(0, 26, 1.3, z, 8);
  k.pipe(
    "process",
    0,
    [
      [21.6, 1.3, -30],
      [20.4, 1.3, -30],
      [20.4, 1.3, -14],
      [24, 1.3, -14],
    ],
    0.16,
    8,
  );
  k.box("process", 0, [3, 2, 2], [26, 0, -13]);
  k.cyl("process", 0, 0.7, 0.2, [26, 2.8, -11.9], { axis: "z", seg: 18 });

  /* ---------- Store ---------- */
  k.box("road", 0, [STORE.w, 0.14, STORE.d], [STORE.x, 0, STORE.z], e);
  P.cols(k, 0, STORE, 7, 12);
  k.box(
    "structure",
    1,
    [STORE.w + 2, 0.5, STORE.d + 2],
    [STORE.x, -2, STORE.z],
  );
  for (const z of [-40, -32, -24]) {
    for (const dx of [-14, 0, 14])
      k.box("structure", 0, [0.5, 5.4, 3], [STORE.x + dx, 0, z], e);
    for (const y of [1, 2.6, 4.2])
      for (const dz of [-0.9, 0, 0.9])
        k.cyl("fit", 0, 0.34, 30, [STORE.x, y, z + dz], {
          axis: "x",
          seg: 10,
          edge: false,
        });
  }
  for (let i = 0; i < 5; i++)
    k.box("fit", 0, [2.4, 1.6, 2.4], [STORE.x - 12 + 6 * i, 0, -17]);

  /* ---------- Design and BIM office ---------- */
  k.box("road", 0, [OFFICE.w, 0.14, OFFICE.d], [OFFICE.x, 0, OFFICE.z], e);
  P.walls(k, 0, OFFICE, 8, {
    fins: "",
    glassS: [OFFICE.x - 10, OFFICE.x + 10, 8],
  });
  k.box(
    "structure",
    1,
    [OFFICE.w + 1, 0.5, OFFICE.d + 1],
    [OFFICE.x, -1, OFFICE.z],
  );
  k.box("controls", 0, [14, 3.4, 0.3], [OFFICE.x, 1.2, OFFICE.z - 8]);
  for (const z of [OFFICE.z - 3, OFFICE.z + 3])
    for (const dx of [-7.5, -2.5, 2.5, 7.5]) {
      k.box("fit", 0, [3.6, 0.78, 1.4], [OFFICE.x + dx, 0, z]);
      k.box("controls", 0, [2.4, 0.9, 0.1], [OFFICE.x + dx, 0.95, z - 0.4], e);
    }

  /* ---------- Kitting area: canopy east of the shed ---------- */
  const KIT: Rect = { x: 54, z: -33, w: 26, d: 20 };
  k.box("road", 0, [KIT.w, 0.14, KIT.d], [KIT.x, 0, KIT.z], e);
  P.cols(k, 0, KIT, 7, 13);
  k.box("structure", 1, [KIT.w + 2, 0.5, KIT.d + 2], [KIT.x, -2, KIT.z]);
  for (const x of [48, 60]) for (const z of [-38, -28]) wagon(0, x, z);
  for (let i = 0; i < 4; i++)
    k.box("air2", 0, [1.6, 1.2, 1.2], [45 + 2.2 * i, 0, -24.4]);

  /* ---------- Dispatch yard and gate ---------- */
  truck(60, -6, true);
  truck(60, 4, true);
  truck(78, 9, false);
  k.box("controls", SITE, [4.4, 3.2, 4.4], [103, 0, 30]);
  k.box("controls", SITE, [0.5, 1.3, 0.5], [100.4, 0, 26]);
  k.box("controls", SITE, [8.4, 0.2, 0.2], [96, 1.1, 26], e);
  P.cctv(k, SITE, [
    [-100, 60],
    [-100, -60],
    [100, -60],
  ]);

  /* ---------- A site, to show the last two steps ---------- */
  const T = TOWER;
  k.box("road", SITE, [70, 0.1, 30], [66, 0, 44], e);
  k.box("site", SITE, [74, 2, 0.3], [66, 0, 28.4], e);
  for (let s = 0; s < 4; s++) {
    const y = T.fh * s;
    k.box(
      "structure",
      SITE,
      [T.w + 0.6, 0.5, T.d + 0.6],
      [T.x, y + (s ? -0.5 : 0), T.z],
    );
    if (s < 3) {
      for (const dx of [-T.w / 2 + 0.6, 0, T.w / 2 - 0.6])
        for (const dz of [-T.d / 2 + 0.6, T.d / 2 - 0.6])
          k.box(
            "structure",
            SITE,
            [0.7, T.fh - 0.5, 0.7],
            [T.x + dx, y, T.z + dz],
            e,
          );
      // Installed spools under the slab above, each with its scan point.
      const sy = y + T.fh - 1.3;
      k.pipe(
        "cooling",
        SITE,
        [
          [T.x - 9, sy, T.z],
          [T.x + 9, sy, T.z],
        ],
        0.3,
        10,
      );
      for (const dx of [-6, 0, 6]) {
        k.pipe(
          "cooling",
          SITE,
          [
            [T.x + dx, sy, T.z - 6.4],
            [T.x + dx, sy, T.z + 6.4],
          ],
          0.2,
          8,
        );
        k.box(
          "controls",
          SITE,
          [0.7, 0.7, 0.08],
          [T.x + dx + 0.5, sy + 0.3, T.z + 6.5],
          e,
        );
      }
    }
  }
  // Hoist: mast, landing at the second floor with a kit on it.
  k.box("structure", SITE, [1.3, 22, 1.3], [T.x - T.w / 2 - 9, 0, T.z]);
  k.box("structure", SITE, [7.6, 0.3, 4.2], [T.x - T.w / 2 - 4.4, 11.7, T.z]);
  wagon(SITE, T.x - T.w / 2 - 4.4, T.z, 12);
  k.box(
    "controls",
    SITE,
    [0.5, 1.4, 0.5],
    [T.x - T.w / 2 - 0.8, 12, T.z + 3.4],
  );
  // Site gate: scanner and a truck arriving.
  k.box("controls", SITE, [0.5, 2.2, 0.5], [36, 0, 54]);
  k.box("controls", SITE, [0.5, 2.2, 0.5], [36, 0, 34]);
  k.box("controls", SITE, [0.2, 0.2, 20], [36, 2.2, 44], e);
  truck(44, 50, true);

  const a = (lvl: number, at: P3): Anchor => ({ lvl, at });
  return P.finish(c, Y, 0, {
    office: a(0, [OFFICE.x, 5, OFFICE.z - 8]),
    store: a(0, [STORE.x, 5.2, -32]),
    saw: a(0, [-6, 3.2, -39]),
    bays: a(0, [-10, 2, -28]),
    assembly: a(0, [-10, 1.4, -11]),
    test: a(0, [26, 2.6, -13]),
    tags: a(0, [5.4, 1.8, -17.6]),
    kits: a(0, [54, 4, -33]),
    trucks: a(SITE, [60, 5, 4]),
    gate: a(SITE, [103, 3.6, 30]),
    sitegate: a(SITE, [36, 2.6, 54]),
    hoist: a(SITE, [T.x - T.w / 2 - 4.4, 15.6, T.z]),
    installed: a(SITE, [T.x, 2 * T.fh + T.fh - 0.9, T.z + 6.5]),
  });
}

const S = (at: P3): Anchor => ({ lvl: SITE, at });
/** Inside views: the roofs are lifted and the walls nearly clear. */
const open = { explode: 0, lidAbove: 0, shell: 0.12 } as const;
const views: Record<string, BuildingView<Sys>> = {
  intro: {
    target: S([2, 4, 2]),
    azimuth: 34,
    elevation: 30,
    distance: 440,
    explode: 0,
    shell: 1,
    lit: {},
  },
  model: {
    target: S([OFFICE.x, 3, OFFICE.z]),
    azimuth: 22,
    elevation: 34,
    distance: 170,
    ...open,
    lit: { controls: 1 },
  },
  cutlist: {
    target: S([-40, 3, -32]),
    azimuth: 18,
    elevation: 36,
    distance: 250,
    ...open,
    lit: { process: 1 },
  },
  produce: {
    target: S([0, 3, -24]),
    azimuth: 24,
    elevation: 38,
    distance: 230,
    ...open,
    lit: { cooling: 1, process: 0.45 },
  },
  tag: {
    target: S([4, 3, -22]),
    azimuth: 44,
    elevation: 42,
    distance: 200,
    ...open,
    lit: { controls: 1 },
  },
  kit: {
    target: S([54, 3, -31]),
    azimuth: 50,
    elevation: 34,
    distance: 170,
    ...open,
    lit: { air2: 1 },
  },
  slot: {
    target: S([76, 3, 6]),
    azimuth: 100,
    elevation: 34,
    distance: 230,
    ...open,
    lit: { power: 1, controls: 0.7 },
  },
  hoist: {
    target: S([56, 9, 44]),
    azimuth: 34,
    elevation: 24,
    distance: 230,
    ...open,
    lit: { air2: 1, controls: 1 },
  },
  install: {
    target: S([TOWER.x, 12, TOWER.z]),
    azimuth: 18,
    elevation: 16,
    distance: 190,
    ...open,
    lit: { cooling: 1, controls: 1 },
  },
};

export const PACK: ModelPack<Sys> = {
  build,
  views,
  palette: P.PALETTE,
  roles: P.ROLES,
};
