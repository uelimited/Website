import type { P3 } from "../kit";
import type { BuildingView, ModelPack, Anchor } from "../types";
import * as P from "../parts";
import type { Sys } from "../parts";

/**
 * Two residential towers, each drawn as three slices of four storeys.
 * Every apartment has its own VRV system: outdoor units on a service ledge,
 * indoor units on a refrigerant trunk, an air purification unit and a
 * controller. Around that sit the building services: a service shaft on the
 * east front of each tower (power, water, fire, ELV), soil stacks at the
 * corners, roof tanks, and the power, water and fire yards on the plot.
 * A diagram of where each part sits, not a drawing of one project.
 */
const Y = [0, 16, 32, 48];
const SITE = 4;
const FLOOR = 4;
type Rect = { x: number; z: number; w: number; d: number };
const TA: Rect = { x: -24, z: 2, w: 26, d: 26 };
const TB: Rect = { x: 24, z: -8, w: 26, d: 26 };
type Face = "e" | "s" | "w";
const APTS: { qx: number; qz: number; face: Face }[] = [
  { qx: 1, qz: 1, face: "e" },
  { qx: 1, qz: -1, face: "e" },
  { qx: -1, qz: 1, face: "s" },
  { qx: -1, qz: -1, face: "w" },
];
/** Offsets along the east front of the shaft risers. */
const SHAFT = { power: -1.8, water: -0.6, fire: 0.6, controls: 1.8 };

function build() {
  const c = P.newCtx();
  const { k } = c;

  /** VRV outdoor unit on a service ledge. `at` is on the facade line. */
  const outdoor = (l: number, at: P3, face: Face) => {
    const [x, y, z] = at;
    if (face === "s") {
      k.box("structure", l, [3.4, 0.2, 2], [x, y - 0.2, z + 1], {
        edge: false,
      });
      k.box("cooling", l, [2.6, 1.7, 0.9], [x, y, z + 1]);
      for (const d of [-0.65, 0.65])
        k.cyl("cooling", l, 0.5, 0.1, [x + d, y + 0.95, z + 1.5], {
          axis: "z",
          seg: 16,
        });
      return;
    }
    const s = face === "e" ? 1 : -1;
    k.box("structure", l, [2, 0.2, 3.4], [x + s, y - 0.2, z], { edge: false });
    k.box("cooling", l, [0.9, 1.7, 2.6], [x + s, y, z]);
    for (const d of [-0.65, 0.65])
      k.cyl("cooling", l, 0.5, 0.1, [x + 1.5 * s, y + 0.95, z + d], {
        axis: "x",
        seg: 16,
      });
  };

  const floor = (t: Rect, l: number, yb: number, full: boolean) => {
    const x0 = t.x - t.w / 2;
    const x1 = t.x + t.w / 2;
    const z1 = t.z + t.d / 2;
    const top = yb + 3.2;
    const sx = x1 - 0.7;
    k.box("structure", l, [6, 3.5, 6], [t.x, yb, t.z], { edge: false });
    // Balcony on the south front.
    k.box("structure", l, [9, 0.25, 2.2], [t.x + 7, yb - 0.25, z1 + 1.1]);
    if (full) {
      k.box("structure", l, [t.w - 1, 1.1, 0.25], [t.x, yb, t.z], {
        edge: false,
      });
      k.box("structure", l, [0.25, 1.1, t.d - 1], [t.x, yb, t.z], {
        edge: false,
      });
    }
    // Service shaft: floor panel and tray, hose reel, ELV box and lobby camera.
    k.box("power", l, [0.6, 1.9, 0.7], [sx - 1, yb, t.z + SHAFT.power]);
    k.pipe(
      "power",
      l,
      [
        [sx, top + 0.25, t.z + SHAFT.power],
        [t.x + 3.4, top + 0.25, t.z + SHAFT.power],
      ],
      0.12,
      8,
    );
    k.box("fire", l, [0.5, 1.1, 0.5], [sx - 1, yb, t.z + SHAFT.fire]);
    k.box(
      "controls",
      l,
      [0.5, 1.3, 0.6],
      [sx - 1, yb, t.z + SHAFT.controls + 0.9],
    );
    k.box("controls", l, [0.5, 0.3, 0.3], [t.x + 3.3, yb + 2.7, t.z + 2], {
      edge: false,
    });
    // ELV loop round the lift lobby, with a run into each apartment.
    const cl = top - 0.25;
    k.pipe(
      "controls",
      l,
      [
        [sx, cl, t.z + SHAFT.controls],
        [t.x + 3.8, cl, t.z + SHAFT.controls],
        [t.x + 3.8, cl, t.z + 3.8],
        [t.x - 3.8, cl, t.z + 3.8],
        [t.x - 3.8, cl, t.z - 3.8],
        [t.x + 3.8, cl, t.z - 3.8],
        [t.x + 3.8, cl, t.z + SHAFT.controls],
      ],
      0.1,
      8,
    );
    // Sprinkler loop around the lift lobby, with a branch into each apartment.
    const lp = top + 0.42;
    k.pipe(
      "fire",
      l,
      [
        [sx, lp, t.z + SHAFT.fire],
        [t.x + 4.6, lp, t.z + SHAFT.fire],
        [t.x + 4.6, lp, t.z + 4.6],
        [t.x - 4.6, lp, t.z + 4.6],
        [t.x - 4.6, lp, t.z - 4.6],
        [t.x + 4.6, lp, t.z - 4.6],
        [t.x + 4.6, lp, t.z + SHAFT.fire],
      ],
      0.09,
      8,
    );
    for (const ap of APTS) {
      const cx = t.x + ap.qx * 7;
      const cz = t.z + ap.qz * 7;
      const units: P3[] =
        ap.face === "s"
          ? [
              [cx, top - 0.3, cz + 3],
              [cx, top - 0.3, cz - 3],
              [cx - 3.5, top - 0.3, cz],
            ]
          : [
              [cx - 3, top - 0.3, cz],
              [cx + 3, top - 0.3, cz],
              [cx, top - 0.3, cz + 3.5 * ap.qz],
            ];
      for (const u of units) k.box("cooling", l, [1.3, 0.3, 1.3], u);
      if (ap.face === "s") {
        outdoor(l, [cx, yb, z1], "s");
        k.pipe(
          "air",
          l,
          [
            [cx, yb + 1.4, z1 + 0.6],
            [cx, yb + 1.4, z1 - 0.8],
            [cx, top, z1 - 0.8],
            [cx, top, cz - 3],
          ],
          0.09,
          8,
        );
        k.pipe(
          "air",
          l,
          [
            [cx, top, cz],
            [cx - 3.5, top, cz],
          ],
          0.07,
          8,
        );
      } else {
        const s = ap.face === "e" ? 1 : -1;
        const xe = ap.face === "e" ? x1 : x0;
        outdoor(l, [xe, yb, cz], ap.face);
        k.pipe(
          "air",
          l,
          [
            [xe + 0.6 * s, yb + 1.4, cz],
            [xe - 0.8 * s, yb + 1.4, cz],
            [xe - 0.8 * s, top, cz],
            [cx - 3 * s, top, cz],
          ],
          0.09,
          8,
        );
        k.pipe(
          "air",
          l,
          [
            [cx, top, cz],
            [cx, top, cz + 3.5 * ap.qz],
          ],
          0.07,
          8,
        );
      }
      // Air purification unit with its supply duct.
      const px = cx - 2 * ap.qx;
      const pz = cz - 3 * ap.qz;
      k.box("air2", l, [1.2, 0.45, 1.2], [px, top - 0.45, pz]);
      P.duct(
        k,
        l,
        [
          [px, top + 0.3, pz],
          [px + 4.4 * ap.qx, top + 0.3, pz],
        ],
        0.6,
        0.3,
        "air2",
      );
      P.dots(
        k,
        "air2",
        l,
        [
          [px + 2.2 * ap.qx, top - 0.1, pz],
          [px + 4.4 * ap.qx, top - 0.1, pz],
        ],
        0.22,
      );
      P.dots(
        k,
        "controls",
        l,
        [[cx - 4.6 * ap.qx, yb + 1.5, cz - ap.qz]],
        0.34,
      );
      k.pipe(
        "controls",
        l,
        [
          [t.x + 3.8 * ap.qx, cl, t.z + 3.8 * ap.qz],
          [t.x + 3.8 * ap.qx, cl, cz + 2 * ap.qz],
          [cx + 3.4 * ap.qx, cl, cz + 2 * ap.qz],
        ],
        0.08,
        8,
      );
      P.dots(
        k,
        "controls",
        l,
        [
          [cx + 3.4 * ap.qx, cl, cz + 2 * ap.qz],
          [cx, cl, cz + 2 * ap.qz],
        ],
        0.3,
      );
      // Bathroom at the outer corner, apartment board and video door phone
      // by the entrance, sprinkler branch.
      k.box(
        "water",
        l,
        [2.2, 2.3, 2.2],
        [cx + 4.7 * ap.qx, yb, cz + 4.7 * ap.qz],
      );
      k.box(
        "power",
        l,
        [0.3, 1.2, 0.9],
        [cx - 3.6 * ap.qx, yb + 0.6, cz - 5.2 * ap.qz],
        { edge: false },
      );
      k.box(
        "controls",
        l,
        [0.3, 0.5, 0.5],
        [cx - 2.2 * ap.qx, yb + 1.3, cz - 5.6 * ap.qz],
        { edge: false },
      );
      k.pipe(
        "fire",
        l,
        [
          [t.x + 4.6 * ap.qx, lp, t.z + 4.6 * ap.qz],
          [cx + 2 * ap.qx, lp, t.z + 4.6 * ap.qz],
          [cx + 2 * ap.qx, lp, cz + 3 * ap.qz],
        ],
        0.07,
        8,
      );
      if (full) {
        k.box(
          "structure",
          l,
          [0.2, 1.1, 5],
          [cx + 0.6 * ap.qx, yb, cz - 3.4 * ap.qz],
          { edge: false },
        );
        k.box(
          "fit",
          l,
          [2, 0.6, 2.2],
          [cx + 3.4 * ap.qx, yb, cz - 3.6 * ap.qz],
        );
        k.box("fit", l, [3, 0.7, 1], [cx - ap.qx, yb, cz + 4.4 * ap.qz]);
        k.cyl("fit", l, 0.9, 0.75, [cx - 3.4 * ap.qx, yb, cz + 1.6 * ap.qz], {
          seg: 18,
        });
      }
    }
  };

  for (const t of [TA, TB]) {
    const x1 = t.x + t.w / 2;
    const sx = x1 - 0.7;
    for (const l of [0, 1, 2]) {
      P.slab(k, l, t);
      P.rim(k, l, t);
      P.cols(k, l, t, 16, 13);
      P.walls(k, l, t, 16, {
        fins: "",
        storeys: 4,
        glassS: [t.x - 3, t.x + 12, 16],
      });
      for (let s = 0; s < 4; s++) floor(t, l, FLOOR * s, s === 3);
    }
    // Ground: tower LT panel, booster pumps and the lobby security desk.
    P.panels(k, "power", 0, sx - 3.4, t.z + SHAFT.power - 1.6, 2);
    for (let i = 0; i < 2; i++)
      P.pump(k, 0, sx - 3 - 3 * i, t.z + 4.4, "water");
    k.box("controls", 0, [2.6, 1.1, 0.8], [t.x + 6, 0, t.z + 4.6]);
    // Roof: lift overrun, water tank and the units for the common areas.
    P.roofDeck(k, 3, t);
    k.box("shell", 3, [6, 3.4, 6], [t.x, 0, t.z]);
    k.box("structure", 3, [5, 0.3, 5], [t.x - 7.5, 0, t.z + 7], {
      edge: false,
    });
    k.cyl("water", 3, 2, 2.6, [t.x - 7.5, 0.3, t.z + 7], { seg: 28 });
    k.pipe(
      "water",
      3,
      [
        [sx, 0.7, t.z + SHAFT.water],
        [sx, 0.7, t.z + 5],
        [t.x - 5.4, 0.7, t.z + 5],
        [t.x - 5.4, 0.7, t.z + 6.4],
      ],
      0.13,
      8,
    );
    for (let i = 0; i < 4; i++) {
      k.box("cooling", 3, [2.6, 1.7, 0.9], [t.x - 6 + 4 * i, 0, t.z - 9.5]);
      for (const d of [-0.65, 0.65])
        k.cyl("cooling", 3, 0.5, 0.1, [t.x - 6 + 4 * i + d, 0.95, t.z - 9], {
          axis: "z",
          seg: 16,
        });
    }
    // Shaft risers on the east front.
    c.risers.push({
      sys: "power",
      x: sx,
      z: t.z + SHAFT.power,
      r: 0.24,
      from: { lvl: 0, y: 0.4 },
      to: { lvl: 2, y: 15.4 },
    });
    c.risers.push({
      sys: "water",
      x: sx,
      z: t.z + SHAFT.water,
      r: 0.18,
      from: { lvl: 0, y: 0.4 },
      to: { lvl: 3, y: 0.7 },
    });
    c.risers.push({
      sys: "fire",
      x: sx,
      z: t.z + SHAFT.fire,
      r: 0.18,
      from: { lvl: 0, y: 0.4 },
      to: { lvl: 2, y: 15.6 },
    });
    c.risers.push({
      sys: "controls",
      x: sx,
      z: t.z + SHAFT.controls,
      r: 0.2,
      from: { lvl: 0, y: 0.4 },
      to: { lvl: 2, y: 15.2 },
    });
    // Soil and waste stacks at the four corner bathrooms.
    for (const ap of APTS)
      c.risers.push({
        sys: "water",
        x: t.x + ap.qx * 12.4,
        z: t.z + ap.qz * 12.4,
        r: 0.14,
        from: { lvl: 0, y: 0.2 },
        to: { lvl: 2, y: 15.6 },
      });
  }

  /* ---------- Site ---------- */
  P.plot(k, SITE, 2, 4, 184, 128);
  P.road(k, SITE, 2, 48, 172, 7);
  P.road(k, SITE, 58, -2, 6, 92);
  // Court between the towers: pool and clubhouse.
  k.box("road", SITE, [11, 0.1, 22], [0, 0.02, 17], { edge: false });
  k.box("glass", SITE, [9.6, 0.12, 20.6], [0, 0.12, 17], { edge: false });
  k.box("structure", SITE, [16, 4.4, 9], [0, 0.07, -38]);
  k.box("structure", SITE, [17.4, 0.3, 10.4], [0, 4.47, -38], { edge: false });
  const trees: [number, number][] = [
    [-52, 28],
    [-56, -24],
    [-50, -40],
    [-10, 40],
    [12, 40],
    [-64, 2],
    [40, -44],
    [12, 0],
    [-10, -14],
    [30, 40],
    [-34, 40],
  ];
  for (const [x, z] of trees) {
    k.cyl("structure", SITE, 0.22, 2.6, [x, 0.07, z], { seg: 8, edge: false });
    k.ball("site", SITE, 2, [x, 3.9, z]);
  }
  // Power: substation, transformers and DG sets on the east side.
  P.substation(k, SITE, 76, -34, 14, 7);
  for (let i = 0; i < 2; i++) P.transformer(k, SITE, 72.5 + 7 * i, -22);
  for (let i = 0; i < 2; i++) P.dg(k, SITE, 76, -10 + 5.4 * i);
  P.feeder(c, SITE, [
    [69, -34],
    [48, -34],
    [48, TB.z + SHAFT.power],
    [37.4, TB.z + SHAFT.power],
  ]);
  P.feeder(c, SITE, [
    [48, -27],
    [-6, -27],
    [-6, TA.z + SHAFT.power],
    [-10.6, TA.z + SHAFT.power],
  ]);
  // Water: storage tank and pump room, sewage treatment, rainwater pits.
  k.box("water", SITE, [12, 0.5, 8], [76, 0.07, 14]);
  k.box("water", SITE, [7, 3, 5], [76, 0.07, 24]);
  k.box("water", SITE, [7.6, 0.3, 5.6], [76, 3.07, 24], { edge: false });
  for (let i = 0; i < 2; i++)
    k.box("water", SITE, [9, 1.4, 6], [70 + 11 * i, 0.07, 36]);
  for (const x of [-30, -10, 10, 30])
    k.cyl("water", SITE, 1.3, 0.4, [x, 0.07, 58], { seg: 20 });
  const main: P3[] = [
    [72.5, 0.3, 24],
    [66, 0.3, 24],
    [66, 0.3, 30],
    [-7, 0.3, 30],
    [-7, 0.3, TA.z + SHAFT.water],
    [-10.6, 0.3, TA.z + SHAFT.water],
  ];
  k.pipe("water", SITE, main, 0.2);
  k.pipe(
    "water",
    SITE,
    [
      [46, 0.3, 30],
      [46, 0.3, TB.z + SHAFT.water],
      [37.4, 0.3, TB.z + SHAFT.water],
    ],
    0.2,
  );
  c.flows.push({ sys: "water", lvl: SITE, pts: main });
  // Fire: tank, pump house and the hydrant ring round both towers.
  P.fireYard(c, SITE, {
    tank: [-76, 18],
    house: [-76, 34],
    ring: [-44, -26, 44, 34],
  });
  // Security: gate cabin with the BMS and CCTV head end, boundary cameras.
  k.box("controls", SITE, [5, 3, 4], [36, 0.07, 55]);
  k.box("controls", SITE, [9, 0.16, 0.16], [44, 1, 52.6], { edge: false });
  P.cctv(k, SITE, [
    [-88, 66],
    [-20, 53],
    [20, 53],
    [92, 66],
    [92, -58],
    [-88, -58],
  ]);

  const a = (lvl: number, at: P3): Anchor => ({ lvl, at });
  const bx = TB.x + TB.w / 2 - 0.7;
  return P.finish(c, Y, 10, {
    outdoor: a(1, [TB.x + 14, 13.9, TB.z + 7]),
    southunit: a(1, [TA.x - 7, 13.9, TA.z + 14]),
    indoor: a(2, [TB.x + 10, 15.3, TB.z + 7]),
    roofunits: a(3, [TA.x, 1.9, TA.z - 9.5]),
    piping: a(2, [TB.x + 7, 15.4, TB.z - 7]),
    trunk: a(2, [TB.x - 7, 15.4, TB.z + 9]),
    purifier: a(2, [TA.x + 5, 15.3, TA.z + 4]),
    purifier2: a(2, [TA.x - 5, 15.3, TA.z + 4]),
    controller: a(2, [TB.x + 2.4, 13.8, TB.z + 6]),
    substation: a(SITE, [76, 5.9, -34]),
    dg: a(SITE, [76, 4, -4.6]),
    risingmain: a(1, [bx, 9, TB.z + SHAFT.power]),
    boards: a(2, [bx - 1, 14.2, TB.z + SHAFT.power]),
    rooftank: a(3, [TB.x - 7.5, 3.2, TB.z + 7]),
    stacks: a(1, [TB.x + 12.4, 7, TB.z + 12.4]),
    baths: a(2, [TB.x + 11.7, 14.6, TB.z + 11.7]),
    watertank: a(SITE, [76, 3.5, 24]),
    stp: a(SITE, [75.5, 1.8, 36]),
    rainwater: a(SITE, [-10, 0.7, 58]),
    firetank: a(SITE, [-76, 8.2, 18]),
    hydrants: a(SITE, [0, 1.6, 34]),
    wetriser: a(1, [bx, 6, TB.z + SHAFT.fire]),
    sprinklers: a(2, [TA.x + 4.6, 15.8, TA.z + 4.6]),
    security: a(SITE, [36, 3.4, 55]),
    cctv: a(SITE, [20, 7.2, 53]),
    doorphone: a(2, [TB.x + 4.8, 13.6, TB.z + 1.4]),
    elv: a(1, [bx, 11, TB.z + SHAFT.controls]),
    slab: a(2, [TA.x + 13, 0, TA.z + 13]),
    cores: a(2, [TA.x, 15.6, TA.z]),
    plinths: a(SITE, [76, 0.5, -10]),
    trench: a(SITE, [20, 0.4, -27]),
  });
}

const S = (at: P3): Anchor => ({ lvl: SITE, at });
const views: Record<string, BuildingView<Sys>> = {
  intro: {
    target: S([4, 22, 0]),
    azimuth: 34,
    elevation: 22,
    distance: 450,
    explode: 0,
    shell: 1,
    lit: {},
  },
  highside: {
    target: S([2, 32, -2]),
    azimuth: 40,
    elevation: 20,
    distance: 420,
    explode: 1,
    shell: 0,
    lit: { cooling: 1 },
  },
  // The roofs lift away to show the top floor of one tower.
  lowside: {
    target: { lvl: 2, at: [TB.x, 13, TB.z] },
    azimuth: 38,
    elevation: 46,
    distance: 128,
    explode: 0,
    lidAbove: 2,
    shell: 0,
    shellFrom: 2,
    lit: { air: 1, cooling: 0.3 },
  },
  purification: {
    target: { lvl: 2, at: [TA.x, 13, TA.z] },
    azimuth: 30,
    elevation: 46,
    distance: 128,
    explode: 0,
    lidAbove: 2,
    shell: 0,
    shellFrom: 2,
    lit: { air2: 1 },
  },
  electrical: {
    target: S([26, 26, -12]),
    azimuth: 64,
    elevation: 25,
    distance: 430,
    explode: 1,
    shell: 0,
    lit: { power: 1 },
  },
  plumbing: {
    target: S([22, 28, 6]),
    azimuth: 48,
    elevation: 24,
    distance: 450,
    explode: 1,
    shell: 0,
    racks: 0.4,
    lit: { water: 1 },
  },
  fire: {
    target: S([-10, 26, 6]),
    azimuth: -30,
    elevation: 26,
    distance: 450,
    explode: 1,
    shell: 0,
    racks: 0.4,
    lit: { fire: 1 },
  },
  bms: {
    target: S([10, 26, 12]),
    azimuth: 26,
    elevation: 26,
    distance: 440,
    explode: 1,
    shell: 0,
    lit: { controls: 1 },
  },
  civil: {
    target: S([2, 28, 0]),
    azimuth: 36,
    elevation: 23,
    distance: 450,
    explode: 1,
    shell: 0,
    racks: 0.2,
    lit: { structure: 1 },
  },
  testing: {
    target: S([2, 28, 0]),
    azimuth: 30,
    elevation: 22,
    distance: 440,
    explode: 1,
    shell: 0,
    lit: P.ALL_LIT,
  },
};

export const PACK: ModelPack<Sys> = {
  build,
  views,
  palette: P.PALETTE,
  roles: P.ROLES,
};
