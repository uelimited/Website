import type { P3 } from "../kit";
import type { BuildingView, ModelPack, Anchor } from "../types";
import * as P from "../parts";
import type { Sys } from "../parts";

/**
 * A manufacturing plant: a production hall with a cleanroom zone, an
 * office block, a utility yard joined by a pipe trestle, and the power,
 * fire water and effluent yards around it.
 * A diagram of where each service sits, not a drawing of one project.
 */
const Y = [0, 12];
const SITE = 2;
const HALL = { x: -5, z: 0, w: 90, d: 52 };
const LINES = [-18, -9, 0, 9, 18];

function build() {
  const c = P.newCtx();
  const { k } = c;

  /* ---------- Production hall ---------- */
  P.storey(k, 0, HALL, 12, { storeys: 1, pitch: 6 });
  // Office block on the west side.
  P.storey(k, 0, { x: -57, z: 0, w: 14, d: 28 }, 12, {
    storeys: 3,
    fins: "sw",
    glassS: [-63, -51, 4],
  });
  P.roofDeck(k, 1, { x: -57, z: 0, w: 14, d: 28 });
  // Production lines: machines on bases, with a conveyor down each line.
  for (const z of LINES) {
    if (z < -5) {
      for (let x = -42; x <= 6.01; x += 8) {
        k.box("structure", 0, [5.8, 0.3, 3.6], [x, 0, z], { edge: false });
        k.box("fit", 0, [5, 2.6, 2.8], [x, 0.3, z]);
      }
      k.box("fit", 0, [52, 0.5, 0.9], [-18, 0, z + 2.4], { edge: false });
    } else {
      for (let x = -42; x <= 30.01; x += 8) {
        k.box("structure", 0, [5.8, 0.3, 3.6], [x, 0, z], { edge: false });
        k.box("fit", 0, [5, 2.6, 2.8], [x, 0.3, z]);
      }
      k.box("fit", 0, [76, 0.5, 0.9], [-6, 0, z + 2.4], { edge: false });
    }
    // Bus duct over the line with a tap off at each machine.
    k.box(
      "power",
      0,
      [z < -5 ? 54 : 78, 0.3, 0.45],
      [z < -5 ? -19 : -7, 6.6, z - 2],
    );
  }
  // Cleanroom zone at the north east corner: panels, flooring, filter units.
  const CR = { x0: 14, x1: 38, z0: -24, z1: -6 };
  k.box("env", 0, [24, 0.3, 18], [26, 0, -15]);
  P.wall(k, 0, [CR.x0, CR.z1], [CR.x1, CR.z1], 4.6, "env");
  P.wall(k, 0, [CR.x0, CR.z0], [CR.x0, CR.z1], 4.6, "env");
  for (let x = 17; x <= 35.01; x += 6)
    for (const z of [-20, -11]) k.box("fit", 0, [3.4, 1.8, 2.2], [x, 0.3, z]);
  for (let x = 16; x <= 36.01; x += 3.3)
    for (let z = -22.4; z <= -7.5; z += 3.3)
      k.box("air2", 0, [1.3, 0.4, 1.3], [x, 4.8, z], { edge: false });
  P.ahu(k, 0, 26, -3.2, 8, "air2");
  // Supply ducts down the hall with drops.
  for (const z of [-13.5, -4.5, 4.5, 13.5]) {
    const x1 = z < -5 ? 10 : 36;
    P.duct(
      k,
      0,
      [
        [-46, 9.4, z],
        [x1, 9.4, z],
      ],
      1.5,
      0.8,
    );
    for (let x = -40; x <= x1 - 3; x += 9)
      k.box("air", 0, [1, 0.5, 1], [x, 8.5, z], { edge: false });
  }
  // LT room along the west wall and rising mains to the bus ducts.
  P.panels(k, "power", 0, -48.6, -20, 16, "z", 2.3);
  for (const z of LINES)
    k.pipe(
      "power",
      0,
      [
        [-48, 2.3, z - 2],
        [-48, 6.75, z - 2],
        [-46, 6.75, z - 2],
      ],
      0.18,
    );
  c.flows.push({
    sys: "power",
    lvl: 0,
    pts: [
      [-46, 6.9, -2],
      [32, 6.9, -2],
    ],
  });
  // Sprinklers under the roof.
  P.sprinklers(c, 0, -48, 38, -24, 24, 11, 6);
  // Utility pipe rack along the south wall, with drops to the lines.
  for (const [z, r] of [
    [23.2, 0.24],
    [22.5, 0.2],
    [21.8, 0.16],
    [21.1, 0.14],
  ] as const)
    k.pipe(
      "process",
      0,
      [
        [40, 6, z],
        [-44, 6, z],
      ],
      r,
    );
  for (let x = -42; x <= 30.01; x += 8) {
    k.pipe(
      "process",
      0,
      [
        [x + 2.8, 6, 23.2],
        [x + 2.8, 6, -7],
        [x + 2.8, 3, -7],
      ],
      0.09,
      8,
    );
    for (const z of [18, 9, 0])
      k.pipe(
        "process",
        0,
        [
          [x + 2.8, 6, z + 1.6],
          [x + 2.8, 3, z + 1.6],
        ],
        0.08,
        8,
      );
    k.box("structure", 0, [0.3, 6, 0.3], [x - 4, 0, 24.4], { edge: false });
  }
  c.flows.push({
    sys: "process",
    lvl: 0,
    pts: [
      [40, 6, 23.2],
      [-44, 6, 23.2],
    ],
  });
  // Line PLC panels, sensors on the columns, and the plant control room.
  for (const z of LINES)
    k.box("controls", 0, [0.5, 2, 1.4], [-45.4, 0, z + 1.2]);
  const sens: P3[] = [];
  for (let x = -40; x <= 32.01; x += 12)
    for (const z of [-24.6, -13.5, 4.5, 13.5, 24.6]) sens.push([x, 5, z]);
  P.dots(k, "controls", 0, sens, 0.32);
  k.pipe(
    "controls",
    0,
    [
      [-45.4, 7.6, -22],
      [-45.4, 7.6, 22],
    ],
    0.08,
    8,
  );
  k.pipe(
    "controls",
    0,
    [
      [-45.4, 7.6, 4.5],
      [36, 7.6, 4.5],
    ],
    0.08,
    8,
  );
  c.flows.push({
    sys: "controls",
    lvl: 0,
    pts: [
      [-45.4, 7.6, 4.5],
      [36, 7.6, 4.5],
    ],
  });
  k.box("controls", 0, [0.3, 3, 10], [-50.6, 1, 0]);
  // Toilets and drains (plumbing) at the north west corner.
  k.box("water", 0, [8, 2.6, 5], [-45, 0, -22.6]);

  /* ---------- Roof ---------- */
  P.roofDeck(k, 1, HALL);
  for (let i = 0; i < 4; i++)
    k.box("glass", 1, [70, 0.5, 2.4], [-5, 0, -15 + 10 * i]);
  for (let i = 0; i < 5; i++) {
    const x = -40 + 17 * i;
    P.ahu(k, 1, x, -21, 8);
    k.box("air", 1, [1.6, 1.2, 1.6], [x + 2, -1.2, -21], { edge: false });
  }
  for (let i = 0; i < 8; i++) {
    k.cyl("air", 1, 1.1, 1.2, [-42 + 10.6 * i, 0, 21.5], { seg: 20 });
    k.cyl("air", 1, 1.4, 0.3, [-42 + 10.6 * i, 1.2, 21.5], {
      seg: 20,
      edge: false,
    });
  }

  /* ---------- Site ---------- */
  P.plot(k, SITE, 6, 2, 204, 124);
  P.road(k, SITE, 6, 40, 192, 7);
  P.road(k, SITE, 47, 0, 6, 86);
  P.road(k, SITE, -72, 0, 6, 86);
  P.road(k, SITE, 6, -42, 150, 6);
  // Utility yard: chillers, cooling towers, pumps, compressors and receivers.
  k.box("site", SITE, [44, 0.12, 50], [76, -0.05, 12]);
  for (let i = 0; i < 3; i++) P.chiller(k, SITE, 62, -6 + 5 * i, 0.07);
  for (let i = 0; i < 3; i++) P.tower(k, SITE, 77, -6 + 6.4 * i, 0.07);
  for (let i = 0; i < 4; i++)
    P.pump(k, SITE, 69.5, -7 + 3 * i, "cooling", 0.07);
  for (let i = 0; i < 3; i++)
    k.box("process", SITE, [3.4, 2.3, 2], [60 + 5 * i, 0.07, 30]);
  for (let i = 0; i < 2; i++)
    P.vtank(k, "process", SITE, 77 + 3.6 * i, 30, 1, 3.6, 0.07);
  P.vtank(k, "process", SITE, 88, 30, 1.8, 9, 0.07);
  // Pipe trestle from the yard into the hall.
  for (let x = 43; x <= 55.01; x += 4) {
    for (const z of [20.4, 24.4])
      k.box("structure", SITE, [0.4, 5.6, 0.4], [x, 0, z], { edge: false });
    k.box("structure", SITE, [0.4, 0.4, 4.4], [x, 5.5, 22.4], { edge: false });
    k.box("structure", SITE, [1.4, 0.5, 5.6], [x, 0, 22.4], { edge: false });
  }
  for (const [z, r] of [
    [23.2, 0.24],
    [22.5, 0.2],
    [21.8, 0.16],
    [21.1, 0.14],
  ] as const)
    k.pipe(
      "process",
      SITE,
      [
        [40.4, 6.3, z],
        [57, 6.3, z],
        [57, 6.3, 30],
        [57, 2, 30],
      ],
      r,
    );
  for (const z of [20.4, 19.7])
    k.pipe(
      "cooling",
      SITE,
      [
        [40.4, 6.3, z],
        [56, 6.3, z],
        [56, 2.2, z],
        [56, 2.2, 6],
      ],
      0.26,
    );
  c.flows.push({
    sys: "process",
    lvl: SITE,
    pts: [
      [57, 6.3, 30],
      [57, 6.3, 23.2],
      [40.4, 6.3, 23.2],
    ],
  });
  c.flows.push({
    sys: "cooling",
    lvl: SITE,
    pts: [
      [56, 6.3, 20.4],
      [40.4, 6.3, 20.4],
    ],
  });
  // Power yard to the north east, with duct banks into the hall.
  P.substation(k, SITE, 64, -34, 16, 7);
  for (let i = 0; i < 3; i++) P.transformer(k, SITE, 78 + 7 * i, -34);
  for (let i = 0; i < 3; i++) P.dg(k, SITE, 84, -22 + 5.4 * i);
  P.feeder(c, SITE, [
    [64, -29],
    [64, -27],
    [44, -27],
    [-52, -27],
    [-52, -20],
  ]);
  // Fire water tank, pump house and ring main.
  P.fireYard(c, SITE, {
    tank: [-86, 30],
    house: [-86, 16],
    ring: [-68, -30, 43.5, 30],
  });
  // Water: underground tanks, treatment plant, and the site networks.
  for (let i = 0; i < 2; i++) {
    k.box("water", SITE, [12, 1.4, 8], [14 + 15 * i, 0.07, 52]);
    k.box("structure", SITE, [11, 0.2, 7], [14 + 15 * i, 1.4, 52], {
      edge: false,
    });
  }
  for (let i = 0; i < 3; i++)
    P.vtank(k, "water", SITE, 44 + 6 * i, 52, 2.2, 4, 0.07);
  k.box("water", SITE, [7, 3.4, 5], [-2, 0.07, 52]);
  const mains: P3[] = [
    [-2, 0.3, 49],
    [-2, 0.3, 34],
    [-66, 0.3, 34],
    [-66, 0.3, -34],
    [41, 0.3, -34],
    [41, 0.3, 34],
    [-2, 0.3, 34],
  ];
  k.pipe("water", SITE, mains, 0.22);
  for (const [x, z] of [
    [-66, 34],
    [-66, -34],
    [41, -34],
    [41, 34],
    [-30, 34],
    [10, 34],
    [-30, -34],
    [10, -34],
  ] as const)
    k.box("water", SITE, [1.6, 0.5, 1.6], [x, 0.07, z]);
  k.pipe(
    "water",
    SITE,
    [
      [14, 0.3, 48],
      [14, 0.3, 34],
    ],
    0.2,
  );
  c.flows.push({ sys: "water", lvl: SITE, pts: mains });
  P.cctv(k, SITE, [
    [-92, 60],
    [-30, 60],
    [40, 60],
    [104, 60],
    [104, -56],
    [-92, -56],
    [6, -56],
  ]);
  k.box("site", SITE, [5.5, 3.3, 4.2], [-66, 0, 48]);

  const a = (lvl: number, at: P3): Anchor => ({ lvl, at });
  return P.finish(c, Y, 14, {
    rooftop: a(1, [-6, 3, -21]),
    ducts: a(0, [-10, 9.9, 4.5]),
    chillers: a(SITE, [62, 3.2, -1]),
    towers: a(SITE, [77, 5.2, 6.8]),
    cleanroom: a(0, [38, 4.6, -20]),
    ffu: a(0, [29.2, 5.3, -15.8]),
    crahu: a(0, [26, 2.9, -3.2]),
    substation: a(SITE, [64, 5.9, -34]),
    transformers: a(SITE, [85, 4.4, -34]),
    dg: a(SITE, [84, 4, -11.2]),
    busduct: a(0, [-18, 7, 7]),
    lt: a(0, [-48.6, 2.5, -8]),
    tank: a(SITE, [-86, 8.2, 30]),
    hydrants: a(SITE, [-12, 1.6, 30]),
    sprinklers: a(0, [8, 11.2, 0]),
    compressors: a(SITE, [65, 2.5, 30]),
    trestle: a(SITE, [49, 6.6, 22.4]),
    rack: a(0, [-8, 6.3, 23.2]),
    drops: a(0, [-15.2, 4.5, 10.6]),
    plc: a(0, [-45.4, 2.2, 10.2]),
    sensors: a(0, [8, 5.4, 13.5]),
    control: a(0, [-50.6, 4.2, 0]),
    cctv: a(SITE, [40, 7.2, 60]),
    treatment: a(SITE, [50, 4.6, 52]),
    tanks: a(SITE, [21.5, 1.8, 52]),
    mains: a(SITE, [-30, 0.8, 34]),
    bases: a(0, [-26, 0.4, 18]),
    ductbank: a(SITE, [0, 0.3, -27]),
    trestlefound: a(SITE, [51, 0.6, 22.4]),
  });
}

const S = (at: P3): Anchor => ({ lvl: SITE, at });
const open = { explode: 0, lidAbove: 0, shell: 0 } as const;
const views: Record<string, BuildingView<Sys>> = {
  intro: {
    target: S([6, 5, 4]),
    azimuth: 36,
    elevation: 30,
    distance: 470,
    explode: 0,
    shell: 1,
    lit: {},
  },
  hvac: {
    target: S([8, 14, 2]),
    azimuth: 32,
    elevation: 27,
    distance: 400,
    explode: 1,
    shell: 0,
    lit: { air: 1, cooling: 1 },
  },
  cleanroom: {
    target: { lvl: 0, at: [22, 2, -13] },
    azimuth: 140,
    elevation: 36,
    distance: 185,
    ...open,
    lit: { env: 1, air2: 1 },
  },
  power: {
    target: S([10, 4, -10]),
    azimuth: 140,
    elevation: 33,
    distance: 400,
    ...open,
    lit: { power: 1 },
  },
  fire: {
    target: S([-14, 4, 4]),
    azimuth: -32,
    elevation: 31,
    distance: 400,
    ...open,
    racks: 0.45,
    lit: { fire: 1 },
  },
  process: {
    target: S([14, 4, 12]),
    azimuth: 50,
    elevation: 33,
    distance: 360,
    ...open,
    lit: { process: 1 },
  },
  controls: {
    target: S([-8, 3, 4]),
    azimuth: 14,
    elevation: 30,
    distance: 370,
    ...open,
    lit: { controls: 1 },
  },
  water: {
    target: S([0, 2, 14]),
    azimuth: 18,
    elevation: 38,
    distance: 430,
    explode: 0,
    shell: 1,
    lit: { water: 1 },
  },
  civil: {
    target: S([6, 3, 2]),
    azimuth: 44,
    elevation: 34,
    distance: 420,
    ...open,
    racks: 0.1,
    lit: { structure: 1 },
  },
};

export const PACK: ModelPack<Sys> = {
  build,
  views,
  palette: P.PALETTE,
  roles: P.ROLES,
};
