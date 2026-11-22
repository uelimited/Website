import type { P3 } from "../kit";
import type { BuildingView, ModelPack, Anchor } from "../types";
import * as P from "../parts";
import type { Sys } from "../parts";

/**
 * A mixed use development: a retail podium with a food court, an office
 * tower and a hotel tower above it, roof plant, and the power, fire, water
 * and gas yards around it. Two pages share it: corporate and retail looks at
 * the whole development, hospitality looks at the hotel tower.
 * A diagram of where each service sits, not a drawing of one project.
 */
const Y = [0, 10, 30, 50];
const SITE = 4;
const FLOOR = 4;
type Rect = { x: number; z: number; w: number; d: number };
const POD: Rect = { x: 0, z: 0, w: 104, d: 60 };
const OFF: Rect = { x: -26, z: -6, w: 40, d: 34 };
const HOT: Rect = { x: 30, z: -10, w: 32, d: 20 };
/** The hotel is three storeys shorter: its roof sits below the top level. */
const HR = -8;
/** Service risers run up the east edge of each tower. */
const OX = -7.4;
const HX = 44.8;
const OFF_RISERS = [-18, -17, -11, -5, 1, 6, 9];
const HOT_RISERS = [-18.6, -17, -14, -10.5, -9.5, -6, -3];

function build() {
  const c = P.newCtx();
  const { k } = c;

  /* ---------- Podium: retail, food court and plant ---------- */
  P.storey(k, 0, POD, 10, { fins: "se", pitch: 5, glassS: [-44, 44, 6.5] });
  k.box("structure", 0, [40, 0.35, 5], [0, 6.6, 32.6]);
  P.wall(k, 0, [-51, -7], [28, -7], 1.4);
  for (let x = -48; x <= 24.01; x += 12) P.wall(k, 0, [x, 10], [x, 29], 1.4);
  for (let x = -42; x <= 18.01; x += 12)
    for (const z of [15, 22]) k.box("fit", 0, [8, 1.6, 0.8], [x, 0, z]);
  // Food court: tables, and the kitchen line on piped gas.
  for (const x of [31, 36, 41])
    for (const z of [11, 17, 23])
      k.cyl("fit", 0, 1.1, 0.8, [x, 0, z], { seg: 18 });
  for (let i = 0; i < 5; i++)
    k.box("process", 0, [1.4, 1.1, 2.6], [48.6, 0, 10 + 4 * i]);
  k.pipe(
    "process",
    0,
    [
      [51.6, 2.6, 22],
      [50.4, 2.6, 22],
      [50.4, 2.6, 9],
      [50.4, 2.6, 27],
    ],
    0.12,
  );
  // Low tension room.
  P.panels(k, "power", 0, -48, -25, 9);
  P.panels(k, "powerB", 0, -48, -20, 9);
  const tray: P3[] = [
    [-42, 8, -22],
    [-10, 8, -22],
    [-10, 8, 1],
    [OX, 8, 1],
  ];
  k.pipe("power", 0, tray, 0.2);
  k.pipe(
    "power",
    0,
    [
      [-10, 8, -22],
      [HX, 8, -22],
      [HX, 8, -17],
    ],
    0.2,
  );
  c.flows.push({ sys: "power", lvl: 0, pts: tray });
  // Air handling units and the retail supply duct.
  for (const x of [-29, -20, -11]) {
    P.ahu(k, 0, x, -24, 6);
    k.pipe(
      "cooling",
      0,
      [
        [x, 7.4, -18],
        [x, 7.4, -22.6],
        [x, 2.9, -22.6],
      ],
      0.14,
    );
  }
  P.duct(
    k,
    0,
    [
      [-20, 3, -24],
      [-20, 8.9, -24],
      [-20, 8.9, 2],
    ],
    1.4,
    0.6,
  );
  P.duct(
    k,
    0,
    [
      [-46, 8.9, 2],
      [46, 8.9, 2],
    ],
    1.6,
    0.7,
  );
  for (let x = -42; x <= 42.01; x += 12)
    P.duct(
      k,
      0,
      [
        [x, 8.9, 2],
        [x, 8.9, 26],
      ],
      1,
      0.5,
    );
  // Chilled water from the office risers to the plant rooms and the hotel.
  const chw: P3[] = [
    [-30, 7.4, -18],
    [OX, 7.4, -18],
    [OX, 7.4, -14],
    [HX, 7.4, -14],
    [HX, 7.4, -10.5],
  ];
  k.pipe("cooling", 0, chw, 0.26);
  k.pipe(
    "cooling",
    0,
    [
      [OX, 7.9, -17],
      [OX, 7.9, -13.2],
      [HX, 7.9, -13.2],
      [HX, 7.9, -9.5],
    ],
    0.26,
  );
  c.flows.push({ sys: "cooling", lvl: 0, pts: chw });
  // BMS head end and the fire alarm panel.
  P.controlRoom(k, 0, 4, -27, 12);
  k.box("env", 0, [0.8, 2.4, 3.4], [13, 0, -22]);
  k.pipe(
    "env",
    0,
    [
      [13, 2.4, -22],
      [13, 9.25, -22],
      [13, 9.25, 18],
      [-46, 9.25, 18],
    ],
    0.1,
    8,
  );
  k.pipe(
    "env",
    0,
    [
      [13, 9.25, 18],
      [46, 9.25, 18],
    ],
    0.1,
    8,
  );
  for (let x = -44; x <= 44.01; x += 11)
    for (const z of [4, 18])
      k.cyl("env", 0, 0.6, 0.16, [x, 9.1, z], { seg: 16 });
  for (const x of [18, 23]) k.box("fit", 0, [3.4, 2, 6], [x, 0, -22]);
  // Water tanks and pumps.
  for (const x of [35, 43]) k.box("water", 0, [6, 3, 5], [x, 0, -24]);
  for (let i = 0; i < 4; i++) P.pump(k, 0, 33 + 3.6 * i, -17.6, "water");
  const cold: P3[] = [
    [44, 1.2, -15.5],
    [OX, 1.2, -15.5],
    [OX, 1.2, -11],
  ];
  k.pipe("water", 0, cold, 0.18);
  k.pipe(
    "water",
    0,
    [
      [44, 1.2, -15.5],
      [HX, 1.2, -15.5],
      [HX, 1.2, -14],
    ],
    0.18,
  );
  c.flows.push({ sys: "water", lvl: 0, pts: cold });
  P.sprinklers(c, 0, -50, 50, -28, 28, 9.4, 8);
  k.pipe(
    "controls",
    0,
    [
      [-46, 9.7, 5],
      [46, 9.7, 5],
    ],
    0.08,
    8,
  );
  c.flows.push({
    sys: "controls",
    lvl: 0,
    pts: [
      [-46, 9.7, 5],
      [46, 9.7, 5],
    ],
  });

  /* ---------- Podium roof ---------- */
  P.roofDeck(k, 1, POD);
  P.solar(k, 1, -48, 48, 15, 28);
  P.solar(k, 1, 16, 48, 3, 13);

  /* ---------- Towers ---------- */
  const slice = (l: number, r: Rect, h: number, glass: boolean) => {
    P.slab(k, l, r);
    P.rim(k, l, r);
    P.cols(k, l, r, h, 10);
    const x0 = r.x - r.w / 2;
    P.walls(k, l, r, h, {
      fins: glass ? "e" : "se",
      pitch: glass ? 4 : 3.9,
      storeys: Math.round(h / FLOOR),
      glassS: glass ? [x0 + 1.5, x0 + r.w - 1.5, h] : undefined,
    });
  };
  /** Sealed collar where a riser passes through a floor slab. */
  const collars = (l: number, yb: number, x: number, zs: number[]) => {
    for (const z of zs)
      k.cyl("air2", l, 0.62, 0.34, [x, yb - 0.08, z], { seg: 16 });
  };

  const officeFloor = (l: number, yb: number, top: boolean) => {
    k.box("structure", l, [8, 3.5, 10], [-18, yb, -8], { edge: false });
    // Floor air handling unit, its duct loop and chilled water branch.
    k.box("air", l, [5, 2.2, 3], [-41, yb, -19]);
    P.duct(
      k,
      l,
      [
        [-41, yb + 3.3, -19],
        [-41, yb + 3.3, 7],
        [-11, yb + 3.3, 7],
        [-11, yb + 3.3, -1],
      ],
      1,
      0.45,
    );
    k.pipe(
      "cooling",
      l,
      [
        [OX, yb + 2.9, -18],
        [OX, yb + 2.9, -21.6],
        [-41, yb + 2.9, -21.6],
        [-41, yb + 2.3, -19.6],
      ],
      0.13,
    );
    k.box("power", l, [0.7, 2, 2.2], [-9.2, yb, 1]);
    k.box("water", l, [3, 2.4, 5], [-10.4, yb, -11]);
    k.pipe(
      "fire",
      l,
      [
        [OX, yb + 3.6, -5],
        [-9, yb + 3.6, -5],
        [-9, yb + 3.6, 9.4],
        [-44, yb + 3.6, 9.4],
        [-44, yb + 3.6, -21],
        [-24, yb + 3.6, -21],
      ],
      0.09,
      8,
    );
    k.box("controls", l, [0.5, 1.3, 0.9], [-9.2, yb, 6]);
    P.dots(
      k,
      "controls",
      l,
      [
        [-41, yb + 2.6, -17],
        [-38, yb + 3, 8.4],
        [-28, yb + 3, 8.4],
        [-18, yb + 3, 8.4],
      ],
      0.26,
    );
    // Fire alarm loop: detectors and speakers on the ceiling, panel at the riser.
    k.pipe(
      "env",
      l,
      [
        [OX, yb + 3.45, 9],
        [-10.4, yb + 3.45, 9],
        [-10.4, yb + 3.45, -14],
        [-36, yb + 3.45, -14],
        [-36, yb + 3.45, 4],
        [-13, yb + 3.45, 4],
      ],
      0.1,
      8,
    );
    for (const [x, z] of [
      [-36, -14],
      [-36, -5],
      [-36, 4],
      [-24, 4],
      [-13, 4],
      [-24, -14],
      [-10.4, -5],
    ])
      k.cyl("env", l, 0.5, 0.16, [x, yb + 3.3, z], { seg: 16 });
    k.box("env", l, [0.5, 1.5, 1.1], [-9.2, yb + 0.6, 9]);
    if (top || yb === 0)
      for (const z of [-2, 3])
        for (const x of [-37, -27]) k.box("fit", l, [8, 0.75, 1.4], [x, yb, z]);
    collars(l, yb, OX, OFF_RISERS);
  };

  const hotelFloor = (l: number, yb: number) => {
    for (let i = 0; i < 7; i++) {
      const x = 16.2 + 3.9 * i;
      for (const side of [-1, 1]) {
        const zc = HOT.z + side * 1.6;
        const zo = HOT.z + side * 5.8;
        k.box("structure", l, [0.2, 1.1, 8], [x, yb, zo], { edge: false });
        k.box("fit", l, [1.8, 0.6, 2], [x + 2, yb, zo + side * 1.6]);
        k.box("air", l, [1.5, 0.4, 0.8], [x + 2.4, yb + 2.9, zc + side * 0.9], {
          edge: false,
        });
        k.box("water", l, [1.5, 2.3, 1.8], [x + 1, yb, zc + side * 1.2]);
        P.dots(k, "controls", l, [[x + 3.2, yb + 2.3, zc + side * 0.5]], 0.24);
        k.cyl("env", l, 0.42, 0.16, [x + 2, yb + 3.3, zo], { seg: 14 });
      }
    }
    for (const side of [-1, 1])
      k.box("structure", l, [27.6, 1.1, 0.2], [30, yb, HOT.z + side * 1.5], {
        edge: false,
      });
    for (const z of [-10.5, -9.5])
      k.pipe(
        "cooling",
        l,
        [
          [16.4, yb + 3.2, z],
          [HX, yb + 3.2, z],
        ],
        0.12,
      );
    k.pipe(
      "fire",
      l,
      [
        [16.4, yb + 3.6, -10],
        [43.6, yb + 3.6, -10],
        [43.6, yb + 3.6, -6],
        [HX, yb + 3.6, -6],
      ],
      0.09,
      8,
    );
    k.pipe(
      "water",
      l,
      [
        [17, yb + 2.6, -10],
        [43.2, yb + 2.6, -10],
        [43.2, yb + 2.6, -14],
        [HX, yb + 2.6, -14],
      ],
      0.1,
      8,
    );
    k.box("power", l, [0.6, 1.8, 1.6], [43.7, yb, -17]);
    k.box("controls", l, [0.5, 1.3, 0.7], [43.7, yb, -3]);
    k.pipe(
      "env",
      l,
      [
        [16.4, yb + 3.45, -9.2],
        [43.2, yb + 3.45, -9.2],
        [43.2, yb + 3.45, -18.6],
        [HX, yb + 3.45, -18.6],
      ],
      0.1,
      8,
    );
    for (const x of [20, 28, 36])
      k.box("env", l, [0.7, 0.5, 0.3], [x, yb + 2.7, -10], { edge: false });
    k.box("env", l, [0.5, 1.5, 1.1], [43.7, yb + 0.6, -18.8]);
    collars(l, yb, HX, HOT_RISERS);
  };

  for (const l of [1, 2]) {
    slice(l, OFF, 20, true);
    for (let s = 0; s < 5; s++) officeFloor(l, FLOOR * s, s === 4);
  }
  slice(1, HOT, 20, false);
  for (let s = 0; s < 5; s++) hotelFloor(1, FLOOR * s);
  slice(2, HOT, 12, false);
  for (let s = 0; s < 3; s++) hotelFloor(2, FLOOR * s);

  /* ---------- Office roof: chilled water plant ---------- */
  P.roofDeck(k, 3, OFF);
  k.box("shell", 3, [8, 3.4, 10], [-18, 0, -8]);
  for (const x of [-38, -27]) for (const z of [-18, -12]) P.chiller(k, 3, x, z);
  for (let i = 0; i < 4; i++) P.tower(k, 3, -40 + 6.2 * i, 5);
  for (let i = 0; i < 3; i++) P.pump(k, 3, -11.8 + 0 * i, -1 + 2.2 * i);
  const head: P3[] = [
    [OX, 2.6, -18],
    [OX, 2.6, -21.6],
    [-43, 2.6, -21.6],
  ];
  k.pipe("cooling", 3, head, 0.28);
  k.pipe(
    "cooling",
    3,
    [
      [OX, 3.2, -17],
      [OX, 3.2, -22.3],
      [-43, 3.2, -22.3],
    ],
    0.28,
  );
  for (const x of [-38, -27])
    k.pipe(
      "cooling",
      3,
      [
        [x, 2.6, -21.6],
        [x, 2.6, -10.6],
      ],
      0.15,
    );
  k.pipe(
    "cooling",
    3,
    [
      [-32.4, 2.4, -15],
      [-32.4, 2.4, 1.6],
      [-43, 2.4, 1.6],
      [-19, 2.4, 1.6],
    ],
    0.2,
  );
  c.flows.push({ sys: "cooling", lvl: 3, pts: [...head].reverse() });
  k.box("controls", 3, [2.4, 2.1, 0.5], [-12, 0, 8.6]);

  /* ---------- Hotel roof: hot water plant and VRF units ---------- */
  k.box(
    "structure",
    3,
    [HOT.w + 0.6, 0.5, HOT.d + 0.6],
    [HOT.x, HR - 0.5, HOT.z],
  );
  for (const z of [HOT.z - HOT.d / 2 - 0.15, HOT.z + HOT.d / 2 + 0.15])
    k.box("shell", 3, [HOT.w + 0.6, 1.2, 0.3], [HOT.x, HR, z]);
  for (const x of [HOT.x - HOT.w / 2 - 0.15, HOT.x + HOT.w / 2 + 0.15])
    k.box("shell", 3, [0.3, 1.2, HOT.d], [x, HR, HOT.z]);
  for (let i = 0; i < 3; i++) {
    k.box("water", 3, [2.6, 2, 1.6], [18 + 3.6 * i, HR, -16]);
    k.cyl("water", 3, 0.6, 0.15, [18 + 3.6 * i, HR + 2, -16], { seg: 16 });
    P.vtank(k, "water", 3, 18.4 + 3.4 * i, -11.4, 1.2, 3, HR);
  }
  k.pipe(
    "water",
    3,
    [
      [18, HR + 1, -13.6],
      [43.2, HR + 1, -13.6],
      [43.2, HR + 1, -14],
      [HX, HR + 1, -14],
    ],
    0.14,
  );
  for (let i = 0; i < 2; i++)
    k.box("water", 3, [5, 2.4, 4], [31.5 + 6.2 * i, HR, -16.6]);
  for (let i = 0; i < 5; i++) {
    k.box("cooling", 3, [1.8, 1.8, 0.9], [18 + 2.7 * i, HR, -3.6]);
    k.cyl("cooling", 3, 0.6, 0.1, [18 + 2.7 * i, HR + 1, -3.1], {
      axis: "z",
      seg: 16,
    });
  }
  k.box("shell", 3, [5, 3, 6], [36.5, HR, -6]);

  /* ---------- Risers ---------- */
  const up = (
    sys: Sys,
    x: number,
    z: number,
    r: number,
    y0: number,
    lvl: number,
    y1: number,
  ) =>
    c.risers.push({
      sys,
      x,
      z,
      r,
      from: { lvl: 0, y: y0 },
      to: { lvl, y: y1 },
    });
  up("cooling", OX, -18, 0.3, 7.4, 3, 2.6);
  up("cooling", OX, -17, 0.3, 7.9, 3, 3.2);
  up("water", OX, -11, 0.22, 1.2, 2, 18.6);
  up("fire", OX, -5, 0.22, 9.4, 2, 19.6);
  up("power", OX, 1, 0.3, 8, 2, 18);
  up("controls", OX, 6, 0.12, 9.7, 3, 1.6);
  up("env", OX, 9, 0.18, 2, 2, 17.9);
  up("cooling", HX, -10.5, 0.26, 7.4, 2, 11.2);
  up("cooling", HX, -9.5, 0.26, 7.9, 2, 11.2);
  up("water", HX, -14, 0.22, 1.2, 3, HR + 1);
  up("fire", HX, -6, 0.22, 9.4, 2, 11.6);
  up("power", HX, -17, 0.28, 8, 2, 9.8);
  up("controls", HX, -3, 0.12, 9.7, 2, 9.3);
  up("env", HX, -18.6, 0.18, 2, 2, 9.9);
  k.pipe(
    "env",
    0,
    [
      [13, 2, -22],
      [13, 2, -20.4],
      [HX, 2, -20.4],
      [HX, 2, -18.6],
    ],
    0.12,
    8,
  );
  k.pipe(
    "env",
    0,
    [
      [13, 2, -20.4],
      [OX, 2, -20.4],
      [OX, 2, 9],
    ],
    0.12,
    8,
  );

  /* ---------- Site ---------- */
  P.plot(k, SITE, 4, 6, 236, 152);
  P.road(k, SITE, 4, 42, 224, 7);
  P.road(k, SITE, -64, -2, 6, 82);
  P.substation(k, SITE, -86, -24, 16, 7);
  for (let i = 0; i < 2; i++) P.transformer(k, SITE, -91 + 7 * i, -12);
  for (let i = 0; i < 3; i++) P.dg(k, SITE, -87, -2 + 5.4 * i);
  P.feeder(c, SITE, [
    [-78, -24],
    [-52.4, -24],
  ]);
  P.fireYard(c, SITE, {
    tank: [92, -14],
    house: [92, -30],
    ring: [-58, -36, 58, 36],
  });
  // Sewage treatment.
  for (let i = 0; i < 2; i++)
    k.box("water", SITE, [12, 1.4, 8], [66 + 15 * i, 0.07, 60]);
  for (let i = 0; i < 3; i++)
    P.vtank(k, "water", SITE, 96 + 6 * i, 60, 2.2, 4, 0.07);
  const main: P3[] = [
    [66, 0.3, 56],
    [66, 0.3, -15.5],
    [52.4, 0.3, -15.5],
  ];
  k.pipe("water", SITE, main, 0.22);
  c.flows.push({ sys: "water", lvl: SITE, pts: main });
  // Piped natural gas: meter skid and the line to the food court.
  k.box("structure", SITE, [7, 0.3, 4], [90, 0.07, 22], { edge: false });
  k.box("process", SITE, [4.4, 1.5, 1.6], [90, 0.37, 22]);
  for (const dx of [-1.4, 1.4])
    k.cyl("process", SITE, 0.35, 1.1, [90 + dx, 1.87, 22], { seg: 14 });
  const gas: P3[] = [
    [87.6, 0.6, 22],
    [52.4, 0.6, 22],
  ];
  k.pipe("process", SITE, gas, 0.16);
  c.flows.push({ sys: "process", lvl: SITE, pts: gas });
  // Parking canopies with solar.
  for (let i = 0; i < 2; i++) {
    const x0 = -106 + 30 * i;
    P.solar(k, SITE, x0, x0 + 24, 52, 68, 3.2);
    for (const dx of [2, 22])
      for (const dz of [2, 14])
        k.box("structure", SITE, [0.4, 3.4, 0.4], [x0 + dx, 0, 52 + dz], {
          edge: false,
        });
  }
  P.cctv(k, SITE, [
    [-108, 76],
    [-40, 48],
    [40, 48],
    [116, 76],
    [116, -64],
    [-108, -64],
  ]);

  const a = (lvl: number, at: P3): Anchor => ({ lvl, at });
  return P.finish(c, Y, 12, {
    plinths: a(SITE, [-87, 0.6, 3.4]),
    trench: a(SITE, [-65, 0.4, -24]),
    slab: a(2, [-26, 0, 11]),
    podium: a(1, [40, 0, 30]),
    cores: a(2, [-18, 19.6, -8]),
    hotelpower: a(1, [HX, 12, -17]),
    hoteldb: a(2, [43.7, 9.9, -17]),
    hotelwet: a(1, [HX, 10, -6]),
    hotelsprinklers: a(2, [30, 11.7, -10]),
    hotelcollar: a(2, [HX, 8.2, -14]),
    hotelrisers: a(1, [HX, 15, -6]),
    chillers: a(3, [-32.5, 3.4, -15]),
    towers: a(3, [-30.7, 5.6, 5]),
    header: a(0, [18, 8.2, -14]),
    ahu: a(0, [-20, 3, -24]),
    floorahu: a(2, [-41, 18.6, -19]),
    fcu: a(1, [34, 19.4, -7.5]),
    substation: a(SITE, [-86, 5.9, -24]),
    dg: a(SITE, [-87, 4, 3.4]),
    lt: a(0, [-43, 2.6, -22.5]),
    solar: a(1, [-20, 1.2, 21]),
    canopy: a(SITE, [-64, 4.2, 60]),
    tanks: a(0, [39, 3.3, -24]),
    stp: a(SITE, [73.5, 1.8, 60]),
    png: a(SITE, [90, 3.2, 22]),
    kitchens: a(0, [48.6, 1.5, 18]),
    firetank: a(SITE, [92, 8.2, -14]),
    hydrants: a(SITE, [20, 1.6, 36]),
    sprinklers: a(0, [10, 9.6, 0]),
    wetriser: a(2, [OX, 12, -5]),
    bmsroom: a(0, [4, 4.5, -27]),
    ddc: a(2, [-9.2, 17.5, 6]),
    devices: a(2, [-28, 19.2, 8.4]),
    alarm: a(2, [-24, 19.7, 2]),
    cctv: a(SITE, [40, 7.2, 48]),
    collar: a(2, [OX, 8.2, -11]),
    risers: a(1, [OX, 14, 1]),
    hotwater: a(3, [21.6, HR + 2.4, -16]),
    rooftanks: a(3, [34.6, HR + 2.6, -16.6]),
    baths: a(2, [28.9, 10.4, -8.8]),
    vrf: a(3, [23.4, HR + 2, -3.6]),
    hotelriser: a(1, [HX, 10, -10]),
    hotelfcu: a(2, [30.3, 11.1, -7.5]),
    hotelddc: a(2, [43.7, 9.4, -3]),
    roomddc: a(2, [31.1, 10.4, -11.1]),
    hotelalarm: a(2, [29.9, 11.4, -4.2]),
    speakers: a(2, [36, 11.2, -10]),
    alarmpanel: a(0, [13, 2.4, -22]),
    hotelpanel: a(2, [43.7, 10, -18.8]),
  });
}

const S = (at: P3): Anchor => ({ lvl: SITE, at });
type Views = Record<string, BuildingView<Sys>>;

/** Corporate and retail: the whole development. */
const views: Views = {
  intro: {
    target: S([2, 20, 2]),
    azimuth: 34,
    elevation: 24,
    distance: 520,
    explode: 0,
    shell: 1,
    lit: {},
  },
  hvac: {
    target: S([-2, 36, -2]),
    azimuth: 30,
    elevation: 22,
    distance: 540,
    explode: 1,
    shell: 0,
    lit: { cooling: 1, air: 1 },
  },
  electrical: {
    target: S([-30, 16, 8]),
    azimuth: -34,
    elevation: 30,
    distance: 500,
    explode: 0.5,
    shell: 0.1,
    lit: { power: 1, powerB: 1, green: 1 },
  },
  plumbing: {
    target: S([28, 26, 8]),
    azimuth: 58,
    elevation: 26,
    distance: 520,
    explode: 1,
    shell: 0,
    lit: { water: 1, process: 1 },
  },
  fire: {
    target: S([12, 28, 0]),
    azimuth: 46,
    elevation: 26,
    distance: 540,
    explode: 1,
    shell: 0,
    racks: 0.45,
    lit: { fire: 1 },
  },
  // The roofs lift away to show the top office floor.
  bms: {
    target: { lvl: 2, at: [-22, 17, -4] },
    azimuth: 30,
    elevation: 44,
    distance: 190,
    explode: 0,
    lidAbove: 2,
    shell: 0,
    shellFrom: 2,
    lit: { controls: 1, env: 1 },
  },
  civil: {
    target: S([2, 30, 0]),
    azimuth: 34,
    elevation: 24,
    distance: 550,
    explode: 1,
    shell: 0,
    racks: 0.2,
    lit: { structure: 1 },
  },
  firestop: {
    target: { lvl: 1, at: [-8, 11, -4] },
    azimuth: 62,
    elevation: 13,
    distance: 175,
    explode: 0.4,
    shell: 0,
    racks: 0.3,
    lit: { air2: 1, cooling: 0.3, water: 0.3, fire: 0.3, power: 0.3 },
  },
  handover: {
    target: S([2, 20, 2]),
    azimuth: 36,
    elevation: 24,
    distance: 540,
    explode: 0,
    shell: 0.1,
    lit: { ...P.ALL_LIT, env: 1 },
  },
};

/** Hospitality: the same development, seen from the hotel tower. */
const hotelViews: Views = {
  intro: {
    target: S([24, 20, -2]),
    azimuth: 52,
    elevation: 22,
    distance: 430,
    explode: 0,
    shell: 1,
    lit: {},
  },
  hvac: {
    target: S([26, 34, -8]),
    azimuth: 54,
    elevation: 20,
    distance: 400,
    explode: 1,
    shell: 0,
    lit: { cooling: 1, air: 1 },
  },
  electrical: {
    target: S([14, 28, -6]),
    azimuth: 56,
    elevation: 23,
    distance: 420,
    explode: 1,
    shell: 0,
    lit: { power: 1, powerB: 1 },
  },
  water: {
    target: S([34, 30, 0]),
    azimuth: 66,
    elevation: 24,
    distance: 410,
    explode: 1,
    shell: 0,
    lit: { water: 1 },
  },
  // The roofs lift away to show the top hotel floor.
  bms: {
    target: { lvl: 2, at: [28, 9, -8] },
    azimuth: 40,
    elevation: 42,
    distance: 150,
    explode: 0,
    lidAbove: 2,
    shell: 0,
    shellFrom: 2,
    lit: { controls: 1 },
  },
  fire: {
    target: S([28, 28, -2]),
    azimuth: 50,
    elevation: 24,
    distance: 420,
    explode: 1,
    shell: 0,
    racks: 0.4,
    lit: { fire: 1 },
  },
  alarm: {
    target: S([24, 32, -6]),
    azimuth: 46,
    elevation: 22,
    distance: 350,
    explode: 1,
    shell: 0,
    racks: 0.4,
    lit: { env: 1 },
  },
  // Where the risers at the east end pass through the hotel floors.
  civil: {
    target: { lvl: 1, at: [44, 11, -10] },
    azimuth: 64,
    elevation: 12,
    distance: 150,
    explode: 0.4,
    shell: 0,
    racks: 0.3,
    lit: { air2: 1, cooling: 0.3, water: 0.3, fire: 0.3, power: 0.3 },
  },
  handover: {
    target: S([24, 20, -2]),
    azimuth: 50,
    elevation: 23,
    distance: 420,
    explode: 0,
    shell: 0.1,
    lit: { ...P.ALL_LIT, env: 1 },
  },
};

/** Intelligent buildings: the same development, read through its controls. */
const smartViews: Views = {
  intro: {
    target: S([2, 20, 2]),
    azimuth: 34,
    elevation: 24,
    distance: 520,
    explode: 0,
    shell: 1,
    lit: {},
  },
  sense: {
    target: S([-2, 34, -2]),
    azimuth: 28,
    elevation: 22,
    distance: 540,
    explode: 1,
    shell: 0,
    lit: { controls: 1 },
  },
  // The towers lift away to show the BMS head end in the podium.
  learn: {
    target: { lvl: 0, at: [6, 2, -22] },
    azimuth: 24,
    elevation: 40,
    distance: 130,
    explode: 0,
    lidAbove: 0,
    shell: 0,
    lit: { controls: 1 },
  },
  predict: {
    target: { lvl: 3, at: [-28, 2, -6] },
    azimuth: 30,
    elevation: 42,
    distance: 175,
    explode: 0,
    shell: 1,
    lit: { cooling: 1, controls: 1 },
  },
  save: {
    target: S([-12, 18, 6]),
    azimuth: -30,
    elevation: 30,
    distance: 520,
    explode: 0.5,
    shell: 0.1,
    lit: { power: 1, powerB: 1, green: 1 },
  },
};

export const PACK: ModelPack<Sys> = {
  build,
  views,
  palette: P.PALETTE,
  roles: P.ROLES,
};
export const HOTEL_PACK: ModelPack<Sys> = {
  build,
  views: hotelViews,
  palette: P.PALETTE,
  roles: P.ROLES,
};
export const SMART_PACK: ModelPack<Sys> = {
  build,
  views: smartViews,
  palette: P.PALETTE,
  roles: P.ROLES,
};
