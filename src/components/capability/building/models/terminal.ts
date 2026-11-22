import type { P3 } from "../kit";
import type { BuildingView, ModelPack, Anchor } from "../types";
import * as P from "../parts";
import type { Sys } from "../parts";

/**
 * An airport terminal: arrivals below, the departures hall above under a
 * vaulted roof, aircraft stands and a control tower on the air side, and
 * the plant, power, fire and water yards on the land side.
 * A diagram of where each service sits, not a drawing of one project.
 */
const Y = [0, 7, 18];
const SITE = 3;
const T = { x: 0, z: 0, w: 120, d: 40 };

function aircraft(k: P.Ctx["k"], x: number, z: number) {
  k.cyl("site", SITE, 2, 34, [x, 3.4, z], { axis: "z", seg: 20 });
  k.cyl("site", SITE, 2, 4, [x, 3.4, z + 19], { axis: "z", seg: 20, top: 0.5 });
  k.box("site", SITE, [34, 0.4, 5], [x, 2.6, z + 2]);
  k.box("site", SITE, [12, 0.3, 3], [x, 4, z - 15]);
  k.box("site", SITE, [0.5, 5.5, 5], [x, 4.6, z - 14.5]);
  for (const dx of [-7, 7])
    k.cyl("site", SITE, 1.1, 4, [x + dx, 1.6, z + 3.5], { axis: "z", seg: 14 });
}

function build() {
  const c = P.newCtx();
  const { k } = c;

  /* ---------- Arrivals level ---------- */
  P.storey(k, 0, T, 7, { fins: "s", pitch: 6, glassS: [-40, 40, 5] });
  for (let i = 0; i < 4; i++) {
    const x = -36 + 20 * i;
    k.box("fit", 0, [12, 0.9, 3], [x, 0, -8]);
    k.box("fit", 0, [8, 1.1, 1], [x, 0.9, -8], { edge: false });
  }
  // Plant rooms at the east end: AHUs, LT panels, pumps.
  P.wall(k, 0, [40, -19.5], [40, 19.5]);
  for (let i = 0; i < 3; i++) P.ahu(k, 0, 50, -14 + 7 * i, 6);
  P.panels(k, "power", 0, 43, 9, 12);
  P.panels(k, "powerB", 0, 43, 13, 12);
  for (let i = 0; i < 6; i++)
    k.cyl("fire", 0, 0.28, 1.7, [44 + 0.8 * i, 0, 18.4], { seg: 14 });
  // Toilet cores with their water and drainage stacks.
  for (const x of [-52, -14, 26]) {
    k.box("water", 0, [8, 2.8, 5], [x, 0, 16.6]);
    k.pipe(
      "water",
      0,
      [
        [x, 0.3, 19.4],
        [x, 0.3, 14],
      ],
      0.2,
    );
  }
  P.sprinklers(c, 0, -58, 58, -18, 18, 6.2, 8);
  k.pipe(
    "controls",
    0,
    [
      [-58, 5.4, 12],
      [58, 5.4, 12],
    ],
    0.08,
    8,
  );

  /* ---------- Departures hall ---------- */
  P.storey(k, 1, T, 11, { fins: "s", pitch: 6, glassS: [-58, 58, 9] });
  // Check in islands, security lanes and gate seating.
  for (let i = 0; i < 5; i++) {
    const x = -44 + 22 * i;
    k.box("fit", 1, [10, 1.2, 1.6], [x, 0, 10]);
    k.box("fit", 1, [10, 1.2, 1.6], [x, 0, 6]);
  }
  for (let i = 0; i < 8; i++) {
    k.box("controls", 1, [0.9, 2.2, 3.6], [-14 + 4 * i, 0, -2]);
    k.box("fit", 1, [0.6, 0.9, 5], [-12 + 4 * i, 0, -2], { edge: false });
  }
  for (let i = 0; i < 12; i++)
    k.box("fit", 1, [6, 0.6, 1.2], [-52 + 9.4 * i, 0, -15]);
  // Air towers along the hall and supply ducts under the roof.
  for (let x = -52; x <= 52.01; x += 13) {
    k.box("air", 1, [1.6, 5, 1.6], [x, 0, 1.6]);
    k.cyl("air", 1, 1.2, 0.4, [x, 5, 1.6], { seg: 16 });
  }
  for (const z of [-10, 12])
    P.duct(
      k,
      1,
      [
        [-56, 8.6, z],
        [56, 8.6, z],
      ],
      1.6,
      0.8,
    );
  // Operations control centre, and the PA and CCTV points in the hall.
  P.wall(k, 1, [40, 4], [59, 4]);
  P.controlRoom(k, 1, 49, 5, 14);
  const pts: P3[] = [];
  for (let x = -54; x <= 36.01; x += 10)
    for (const z of [-18.6, 18.6]) pts.push([x, 6, z]);
  for (let x = -52; x <= 52.01; x += 13) pts.push([x, 6, 1.6]);
  P.dots(k, "controls", 1, pts, 0.34);
  k.pipe(
    "controls",
    1,
    [
      [-56, 7.6, 18.6],
      [56, 7.6, 18.6],
      [56, 7.6, 5],
    ],
    0.08,
    8,
  );
  c.flows.push({
    sys: "controls",
    lvl: 1,
    pts: [
      [-56, 7.6, 18.6],
      [56, 7.6, 18.6],
    ],
  });
  for (const x of [-52, -14, 26]) k.box("water", 1, [8, 2.8, 5], [x, 0, 16.6]);
  P.sprinklers(c, 1, -58, 58, -18, 18, 9.8, 8);
  // Boarding bridges to the stands.
  for (const x of [-36, 0, 36]) {
    k.box("structure", 1, [3, 3, 17], [x + 5, 0.4, -28.5]);
    k.cyl("structure", 1, 2.4, 3.2, [x + 5, 0.3, -37.5], { seg: 20 });
    k.box("structure", 1, [0.6, 7.4, 0.6], [x + 5, -7, -37.5], { edge: false });
  }

  /* ---------- Vaulted roof ---------- */
  for (let i = 0; i < 22; i++) {
    const z = -21 + 2 * i;
    const h = 3.4 * (1 - (z / 23) ** 2);
    k.box("shell", 2, [124, 0.5, 2.02], [0, h - 0.5, z], {
      edge: i % 21 === 0,
    });
  }
  k.box("shell", 2, [124, 0.5, 9], [0, -0.6, 26]);
  for (let x = -56; x <= 56.01; x += 16)
    k.box("structure", 2, [0.7, 11, 0.7], [x, -11.4, 29.6], { edge: false });
  for (let i = 0; i < 3; i++)
    P.solar(k, 2, -52 + 36 * i, -20 + 36 * i, 22.5, 29.5, -0.4);

  /* ---------- Site ---------- */
  P.plot(k, SITE, 4, -6, 250, 168);
  // Apron and stands on the air side, forecourt road on the land side.
  P.road(k, SITE, 0, -52, 190, 58);
  P.road(k, SITE, 0, 36, 230, 8);
  P.road(k, SITE, 66, 20, 6, 32);
  for (const x of [-36, 0, 36]) aircraft(k, x, -62);
  // Control tower.
  k.cyl("site", SITE, 3.2, 34, [-88, 0, -12], { seg: 24 });
  k.cyl("glass", SITE, 5.6, 3.6, [-88, 34, -12], { seg: 24, top: 6.4 });
  k.cyl("site", SITE, 6.8, 0.6, [-88, 37.6, -12], { seg: 24 });
  k.cyl("controls", SITE, 0.2, 5, [-88, 38.2, -12], { seg: 8, edge: false });
  // Central plant: chillers, towers, pumps, and thermal storage.
  k.box("site", SITE, [40, 0.12, 40], [92, -0.05, -2]);
  for (let i = 0; i < 4; i++) P.chiller(k, SITE, 80, -16 + 5 * i, 0.07);
  for (let i = 0; i < 4; i++) P.tower(k, SITE, 94, -16 + 6.4 * i, 0.07);
  for (let i = 0; i < 4; i++)
    P.pump(k, SITE, 87.5, -15 + 3 * i, "cooling", 0.07);
  P.vtank(k, "process", SITE, 104, -12, 4.6, 10, 0.07);
  P.vtank(k, "process", SITE, 104, 0, 4.6, 10, 0.07);
  for (const z of [-17.4, -16.6])
    k.pipe(
      "cooling",
      SITE,
      [
        [74, 1, z],
        [66, 1, z],
        [66, 1, -8],
        [60.4, 1, -8],
      ],
      0.3,
    );
  k.pipe(
    "process",
    SITE,
    [
      [104, 1.4, -6],
      [98, 1.4, -6],
      [98, 1.4, -19],
      [74, 1.4, -19],
    ],
    0.24,
  );
  c.flows.push({
    sys: "cooling",
    lvl: SITE,
    pts: [
      [74, 1, -17.4],
      [66, 1, -17.4],
      [66, 1, -8],
      [60.4, 1, -8],
    ],
  });
  // Power yard.
  P.substation(k, SITE, 82, 26, 16, 7);
  for (let i = 0; i < 3; i++) P.transformer(k, SITE, 96 + 7 * i, 26);
  for (let i = 0; i < 4; i++) P.dg(k, SITE, 100, 40 + 5.4 * i);
  P.feeder(c, SITE, [
    [82, 21],
    [82, 16],
    [62, 16],
    [62, 10],
    [60.4, 10],
  ]);
  // Fire water and ring main.
  P.fireYard(c, SITE, {
    tank: [-92, 22],
    house: [-78, 22],
    ring: [-66, -23.5, 63.5, 23.5],
  });
  // Water: tanks, treatment, and rainwater recharge pits by the forecourt.
  for (let i = 0; i < 2; i++)
    k.box("water", SITE, [12, 1.4, 8], [42 + 15 * i, 0.07, 52]);
  for (let i = 0; i < 3; i++)
    P.vtank(k, "water", SITE, 20 + 6 * i, 52, 2.2, 4, 0.07);
  for (let i = 0; i < 6; i++)
    k.cyl("water", SITE, 1.3, 0.4, [-60 + 14 * i, 0.07, 44], { seg: 20 });
  const main: P3[] = [
    [42, 0.3, 48],
    [42, 0.3, 28],
    [-52, 0.3, 28],
    [-52, 0.3, 20.4],
  ];
  k.pipe("water", SITE, main, 0.22);
  for (const x of [-14, 26])
    k.pipe(
      "water",
      SITE,
      [
        [x, 0.3, 28],
        [x, 0.3, 20.4],
      ],
      0.2,
    );
  c.flows.push({ sys: "water", lvl: SITE, pts: main });
  // Car park canopies with solar.
  for (let i = 0; i < 3; i++) {
    P.solar(k, SITE, -64 + 26 * i, -44 + 26 * i, 54, 70, 3.2);
    for (const dx of [2, 18])
      for (const z of [56, 68])
        k.box("structure", SITE, [0.4, 3.4, 0.4], [-64 + 26 * i + dx, 0, z], {
          edge: false,
        });
  }
  P.cctv(k, SITE, [
    [-110, 44],
    [-60, 32],
    [-10, 32],
    [40, 32],
    [118, 60],
    [118, -30],
    [-110, -82],
    [0, -84],
    [100, -82],
  ]);

  const a = (lvl: number, at: P3): Anchor => ({ lvl, at });
  return P.finish(c, Y, 12, {
    plinths: a(SITE, [80, 0.5, -3.5]),
    trench: a(SITE, [72, 0.4, 16]),
    slab: a(1, [36, 0, 20]),
    chillers: a(SITE, [80, 3.2, -8.5]),
    towers: a(SITE, [94, 5.2, 3.2]),
    ducts: a(1, [-20, 9.2, 12]),
    airtowers: a(1, [13, 5.6, 1.6]),
    ahus: a(0, [50, 2.8, -7]),
    storage: a(SITE, [104, 10.6, -12]),
    tank: a(SITE, [-92, 8.2, 22]),
    hydrants: a(SITE, [-10, 1.6, 23.5]),
    sprinklers: a(1, [20, 10, 0]),
    gas: a(0, [46, 1.9, 18.4]),
    substation: a(SITE, [82, 5.9, 26]),
    transformers: a(SITE, [103, 4.4, 26]),
    dg: a(SITE, [100, 4, 48]),
    lt: a(0, [50, 2.4, 11]),
    treatment: a(SITE, [26, 4.6, 52]),
    tanks: a(SITE, [49.5, 1.8, 52]),
    rain: a(SITE, [-18, 0.8, 44]),
    cores: a(1, [-14, 3, 16.6]),
    control: a(1, [49, 4.6, 5]),
    security: a(1, [0, 2.4, -2]),
    pa: a(1, [-24, 6.4, 18.6]),
    cctv: a(SITE, [-10, 7.2, 32]),
    tower: a(SITE, [-88, 43.4, -12]),
    solar: a(SITE, [-28, 4.2, 62]),
    roofsolar: a(2, [0, 0.4, 26]),
  });
}

const S = (at: P3): Anchor => ({ lvl: SITE, at });
const views: Record<string, BuildingView<Sys>> = {
  intro: {
    target: S([4, 8, -4]),
    azimuth: 34,
    elevation: 28,
    distance: 560,
    explode: 0,
    shell: 1,
    lit: {},
  },
  hvac: {
    target: S([26, 16, 0]),
    azimuth: 46,
    elevation: 26,
    distance: 450,
    explode: 1,
    shell: 0,
    lit: { cooling: 1, air: 1 },
  },
  lowenergy: {
    target: S([92, 5, -4]),
    azimuth: 58,
    elevation: 30,
    distance: 190,
    explode: 0,
    shell: 1,
    lit: { process: 1, cooling: 0.4 },
  },
  fire: {
    target: S([-12, 16, 4]),
    azimuth: -30,
    elevation: 26,
    distance: 470,
    explode: 1,
    shell: 0,
    racks: 0.5,
    lit: { fire: 1 },
  },
  power: {
    target: S([62, 8, 20]),
    azimuth: 70,
    elevation: 32,
    distance: 330,
    explode: 0.6,
    shell: 0,
    lit: { power: 1, powerB: 1 },
  },
  water: {
    target: S([0, 8, 30]),
    azimuth: 12,
    elevation: 30,
    distance: 430,
    explode: 1,
    shell: 0,
    lit: { water: 1 },
  },
  controls: {
    target: { lvl: 1, at: [14, 2, 2] },
    azimuth: 28,
    elevation: 36,
    distance: 290,
    explode: 0,
    lidAbove: 1,
    shell: 0,
    shellFrom: 1,
    lit: { controls: 1 },
  },
  civil: {
    target: S([4, 12, 0]),
    azimuth: 38,
    elevation: 27,
    distance: 480,
    explode: 1,
    shell: 0,
    racks: 0.15,
    lit: { structure: 1 },
  },
  green: {
    target: S([-8, 8, 36]),
    azimuth: 20,
    elevation: 34,
    distance: 400,
    explode: 0,
    shell: 1,
    lit: { green: 1 },
  },
  om: {
    target: S([4, 8, -2]),
    azimuth: 32,
    elevation: 28,
    distance: 510,
    explode: 0,
    shell: 0.1,
    lit: P.ALL_LIT,
  },
};

export const PACK: ModelPack<Sys> = {
  build,
  views,
  palette: P.PALETTE,
  roles: P.ROLES,
};
