import type { P3 } from "../kit";
import type { BuildingView, ModelPack, Anchor } from "../types";
import * as P from "../parts";
import type { Sys } from "../parts";

/**
 * A university campus: academic blocks around a court, a library, hostels,
 * dining and sports, served from one central plant with thermal storage
 * and a geothermal field, and tied together by campus wide networks.
 * A diagram of where each service sits, not a drawing of one project.
 */
const Y = [0, 5, 14];
const SITE = 3;

type Block = {
  name: string;
  x: number;
  z: number;
  w: number;
  d: number;
  tall?: boolean;
};
const BLOCKS: Block[] = [
  { name: "academicA", x: -34, z: -12, w: 46, d: 20 },
  { name: "academicB", x: -34, z: 20, w: 46, d: 18 },
  { name: "library", x: 12, z: 4, w: 24, d: 30, tall: true },
  { name: "hostel1", x: 50, z: -22, w: 16, d: 42 },
  { name: "hostel2", x: 74, z: -22, w: 16, d: 42 },
  { name: "dining", x: 60, z: 28, w: 32, d: 16 },
  { name: "sports", x: -84, z: 28, w: 24, d: 30 },
];
const PLANT = { x: -86, z: -24, w: 26, d: 18 };

function build() {
  const c = P.newCtx();
  const { k } = c;

  for (const b of BLOCKS) {
    P.storey(k, 0, b, 5, { fins: "se", pitch: 5 });
    P.storey(k, 1, b, 9, { fins: "se", pitch: 5, storeys: 2 });
    P.roofDeck(k, 2, b);
    // Roof plant: air handling units, with a BMS outstation on every block.
    const n = Math.max(1, Math.round(b.w / 16));
    for (let i = 0; i < n; i++)
      P.ahu(k, 2, b.x - b.w / 2 + 7 + i * 14, b.z - b.d / 2 + 3, 5);
    k.box(
      "controls",
      2,
      [1.6, 1.8, 0.5],
      [b.x + b.w / 2 - 2, 0, b.z - b.d / 2 + 1.2],
    );
    P.dots(k, "controls", 2, [[b.x, 2.4, b.z]], 0.5);
    // Power kiosk and plant room at grade, beside each block.
    k.box(
      "power",
      SITE,
      [3, 2.4, 2],
      [b.x - b.w / 2 + 3, 0.07, b.z + b.d / 2 + 3.4],
    );
  }
  // Solar on the long roofs, heat pumps and mixing tanks on the hostels.
  P.solar(k, 2, -55, -17, -9, -3);
  P.solar(k, 2, -55, -17, 14.5, 28);
  P.solar(k, 2, 46, 76, 24, 35);
  P.solar(k, 2, 2, 22, -2, 18);
  for (const x of [50, 74]) {
    P.solar(k, 2, x - 7, x + 7, -30, -6);
    for (let i = 0; i < 3; i++)
      k.box("green", 2, [2.2, 1.9, 1.2], [x - 4 + 4 * i, 0, -2]);
    for (let i = 0; i < 2; i++)
      P.vtank(k, "water", 2, x - 3 + 6 * i, -36, 1.4, 3.2);
  }

  /* ---------- Central plant ---------- */
  P.storey(k, 0, PLANT, 5, { fins: "s" });
  P.roofDeck(k, 1, PLANT);
  for (let i = 0; i < 3; i++) P.chiller(k, 1, -86, -29 + 5 * i);
  for (let i = 0; i < 3; i++) P.tower(k, SITE, -108, -30 + 6.4 * i, 0.07);
  for (let i = 0; i < 4; i++)
    P.pump(k, SITE, -100.6, -31 + 3 * i, "cooling", 0.07);
  // Thermal energy storage tanks and the geothermal field.
  for (let i = 0; i < 3; i++)
    P.vtank(k, "process", SITE, -92 + 10 * i, -44, 4, 9, 0.07);
  const bores: P3[] = [];
  for (let x = -40; x <= 20.01; x += 6)
    for (let z = -58; z <= -42.01; z += 5.3) {
      k.cyl("process", SITE, 0.5, 0.35, [x, 0.07, z], { seg: 14 });
      bores.push([x, 0.3, z]);
    }
  for (let z = -58; z <= -42.01; z += 5.3)
    k.pipe(
      "process",
      SITE,
      [
        [-40, 0.3, z],
        [20, 0.3, z],
      ],
      0.14,
      8,
    );
  const geo: P3[] = [
    [20, 0.3, -58],
    [24, 0.3, -58],
    [24, 0.3, -38],
    [-60, 0.3, -38],
    [-60, 0.3, -30],
    [-72.6, 0.3, -30],
  ];
  k.pipe(
    "process",
    SITE,
    [
      [24, 0.3, -58],
      [24, 0.3, -42],
    ],
    0.14,
    8,
  );
  k.pipe("process", SITE, geo, 0.22);
  c.flows.push({ sys: "process", lvl: SITE, pts: geo });

  /* ---------- District cooling loop ---------- */
  const loop: P3[] = [
    [-72.6, 0.34, -20],
    [-64, 0.34, -20],
    [-64, 0.34, 4],
    [-8, 0.34, 4],
    [-8, 0.34, -30],
    [38, 0.34, -30],
    [38, 0.34, 14],
    [86, 0.34, 14],
    [86, 0.34, 42],
    [-64, 0.34, 42],
    [-64, 0.34, 4],
  ];
  k.pipe("cooling", SITE, loop, 0.3);
  c.flows.push({ sys: "cooling", lvl: SITE, pts: loop });
  for (const [x, z, zz] of [
    [-34, 4, -1.6],
    [-34, 4, 10.6],
    [12, -30, -11.4],
    [50, 14, -0.6],
    [74, 14, -0.6],
    [60, 14, 19.6],
    [-84, 42, 43.4],
  ] as const)
    k.pipe(
      "cooling",
      SITE,
      [
        [x, 0.34, z],
        [x, 0.34, zz],
      ],
      0.2,
    );

  /* ---------- Power ---------- */
  P.substation(k, SITE, -92, -64, 16, 7);
  for (let i = 0; i < 3; i++) P.transformer(k, SITE, -76 + 7 * i, -64);
  for (let i = 0; i < 3; i++) P.dg(k, SITE, -112, -62 + 5.4 * i);
  P.feeder(c, SITE, [
    [-92, -59],
    [-92, -56],
    [-70, -56],
    [-70, 48],
    [96, 48],
    [96, -48],
    [30, -48],
    [30, -36],
  ]);

  /* ---------- Fire, water, security ---------- */
  P.fireYard(c, SITE, {
    tank: [-112, 6],
    house: [-98, 6],
    ring: [-68, -34, 90, 46],
  });
  for (let i = 0; i < 2; i++)
    k.box("water", SITE, [12, 1.4, 8], [98 + 0, 0.07, 22 + 11 * i]);
  for (let i = 0; i < 3; i++)
    P.vtank(k, "water", SITE, 112, 20 + 6 * i, 2.2, 4, 0.07);
  k.box("water", SITE, [26, 0.25, 12], [12, 0, 56]);
  k.box("structure", SITE, [27.4, 0.5, 13.4], [12, -0.3, 56], { edge: false });
  for (let i = 0; i < 5; i++)
    k.cyl("water", SITE, 1.3, 0.4, [-50 + 9 * i, 0.07, 56], { seg: 20 });
  const wmain: P3[] = [
    [98, 0.3, 18],
    [98, 0.3, -52],
    [-66, 0.3, -52],
  ];
  k.pipe("water", SITE, wmain, 0.2);
  k.pipe(
    "water",
    SITE,
    [
      [98, 0.3, 44],
      [98, 0.3, 52],
      [26, 0.3, 52],
    ],
    0.2,
  );
  c.flows.push({ sys: "water", lvl: SITE, pts: wmain });
  // BMS fibre ring linking every block to the campus control room.
  const fibre: P3[] = [
    [12, 0.5, 20.4],
    [12, 0.5, 38],
    [-58, 0.5, 38],
    [-58, 0.5, -26],
    [42, 0.5, -26],
    [42, 0.5, 38],
    [12, 0.5, 38],
  ];
  k.pipe("controls", SITE, fibre, 0.12, 8);
  for (const [x, z, zz] of [
    [-34, -26, -22],
    [-34, 38, 29],
    [50, -26, -22],
    [60, 38, 36],
    [-58, 38, 43],
  ] as const)
    k.pipe(
      "controls",
      SITE,
      [
        [x, 0.5, z],
        [x, 0.5, zz],
      ],
      0.1,
      8,
    );
  k.pipe(
    "controls",
    SITE,
    [
      [-58, 0.5, -24],
      [-72.6, 0.5, -24],
    ],
    0.1,
    8,
  );
  k.pipe(
    "controls",
    SITE,
    [
      [42, 0.5, -10],
      [66, 0.5, -10],
      [66, 0.5, -1],
    ],
    0.1,
    8,
  );
  k.pipe(
    "controls",
    SITE,
    [
      [-58, 0.5, 38],
      [-72, 0.5, 38],
    ],
    0.1,
    8,
  );
  c.flows.push({ sys: "controls", lvl: SITE, pts: fibre });
  k.box("controls", 2, [8, 2.6, 0.4], [12, 0, 18]);
  P.cctv(k, SITE, [
    [-124, 70],
    [-60, 70],
    [0, 70],
    [60, 70],
    [122, 70],
    [122, 0],
    [122, -72],
    [0, -74],
    [-124, -74],
  ]);

  /* ---------- Ground ---------- */
  P.plot(k, SITE, 0, -2, 260, 156);
  P.road(k, SITE, 0, 64, 240, 7);
  P.road(k, SITE, 116, -2, 6, 130);
  P.road(k, SITE, -120, -2, 6, 130);
  k.box("site", SITE, [40, 0.1, 10], [-34, -0.05, 4.5], { edge: false });

  const a = (lvl: number, at: P3): Anchor => ({ lvl, at });
  return P.finish(c, Y, 9, {
    plinths: a(SITE, [-112, 0.5, -56.6]),
    trench: a(SITE, [-70, 0.4, 4]),
    slab: a(1, [-34, 0, -2]),
    chillers: a(1, [-86, 3.2, -24]),
    towers: a(SITE, [-108, 5.2, -23.6]),
    loop: a(SITE, [14, 0.9, -30]),
    ahus: a(2, [-34, 3, -19]),
    storage: a(SITE, [-82, 9.6, -44]),
    geo: a(SITE, [-10, 0.8, -50]),
    tank: a(SITE, [-112, 8.2, 6]),
    hydrants: a(SITE, [10, 1.6, 46]),
    substation: a(SITE, [-92, 5.9, -64]),
    transformers: a(SITE, [-69, 4.4, -64]),
    dg: a(SITE, [-112, 4, -56.6]),
    ring: a(SITE, [20, 0.6, 48]),
    treatment: a(SITE, [112, 4.6, 26]),
    pond: a(SITE, [12, 0.6, 56]),
    rain: a(SITE, [-32, 0.8, 56]),
    hotwater: a(2, [50, 3.6, -36]),
    control: a(2, [12, 2.9, 18]),
    fibre: a(SITE, [42, 0.9, 10]),
    outstation: a(2, [-34, 2.9, 20]),
    cctv: a(SITE, [60, 7.2, 70]),
    solar: a(2, [-36, 1.4, 21]),
    heatpumps: a(2, [74, 2.2, -2]),
    hostels: a(2, [50, 1.2, -18]),
  });
}

const S = (at: P3): Anchor => ({ lvl: SITE, at });
const closed = { explode: 0, shell: 1 } as const;
const views: Record<string, BuildingView<Sys>> = {
  intro: {
    target: S([0, 4, 0]),
    azimuth: 34,
    elevation: 31,
    distance: 560,
    ...closed,
    lit: {},
  },
  hvac: {
    target: S([-30, 4, -6]),
    azimuth: -28,
    elevation: 34,
    distance: 430,
    ...closed,
    lit: { cooling: 1, air: 1 },
  },
  lowenergy: {
    target: S([-50, 3, -40]),
    azimuth: -150,
    elevation: 34,
    distance: 300,
    ...closed,
    lit: { process: 1 },
  },
  fire: {
    target: S([-6, 4, 8]),
    azimuth: -40,
    elevation: 36,
    distance: 500,
    ...closed,
    lit: { fire: 1 },
  },
  power: {
    target: S([-10, 4, -8]),
    azimuth: -140,
    elevation: 36,
    distance: 520,
    ...closed,
    lit: { power: 1 },
  },
  water: {
    target: S([40, 4, 16]),
    azimuth: 50,
    elevation: 34,
    distance: 430,
    ...closed,
    lit: { water: 1 },
  },
  controls: {
    target: S([4, 4, 6]),
    azimuth: 20,
    elevation: 40,
    distance: 480,
    ...closed,
    lit: { controls: 1 },
  },
  civil: {
    target: S([0, 6, 0]),
    azimuth: 34,
    elevation: 33,
    distance: 530,
    explode: 1,
    shell: 0,
    lit: { structure: 1 },
  },
  green: {
    target: S([14, 8, -2]),
    azimuth: 40,
    elevation: 42,
    distance: 450,
    ...closed,
    lit: { green: 1 },
  },
  om: {
    target: S([0, 4, 0]),
    azimuth: 32,
    elevation: 31,
    distance: 530,
    ...closed,
    lit: P.ALL_LIT,
  },
};

export const PACK: ModelPack<Sys> = {
  build,
  views,
  palette: P.PALETTE,
  roles: P.ROLES,
};
