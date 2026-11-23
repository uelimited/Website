import type { P3 } from "../kit";
import type { BuildingView, ModelPack, Anchor } from "../types";
import * as P from "../parts";
import type { Sys } from "../parts";

/**
 * A hospital: a two storey podium for outpatients, diagnostics and the
 * operating theatres, a ward block above it, a roof plant deck, and the
 * power, fire and water yards around it.
 * A diagram of where each service sits, not a drawing of one project.
 */
const Y = [0, 5, 10, 22];
const SITE = 4;
const POD = { x: 0, z: 0, w: 90, d: 48 };
const WARD = { x: 0, z: -4, w: 72, d: 20 };

function build() {
  const c = P.newCtx();
  const { k } = c;

  /* ---------- Ground: emergency, outpatients, diagnostics, plant ---------- */
  P.storey(k, 0, POD, 5, { fins: "se", glassS: [-20, 8, 4] });
  k.box("structure", 0, [30, 0.3, 6], [-6, 4.4, 27.5]);
  for (let x = -38; x <= 14.01; x += 8.6) P.wall(k, 0, [x, 6], [x, 23]);
  P.wall(k, 0, [-44, 6], [22, 6]);
  for (let x = -34; x <= 12.01; x += 8.6)
    k.box("fit", 0, [3, 0.8, 1.2], [x, 0, 14]);
  for (const x of [-34, -22])
    k.cyl("fit", 0, 1.6, 2.4, [x, 1.4, -14], { axis: "z", seg: 20 });
  P.wall(k, 0, [24, -23], [24, 23]);
  for (let i = 0; i < 3; i++) P.ahu(k, 0, 34, -18 + 7 * i, 6);
  P.panels(k, "power", 0, 27, 6, 12);
  P.panels(k, "powerB", 0, 27, 10, 12);
  for (let i = 0; i < 4; i++) P.pump(k, 0, 30 + 4 * i, 18, "water");
  for (let i = 0; i < 6; i++)
    k.cyl("fire", 0, 0.28, 1.7, [27 + 0.8 * i, 0, 22.4], { seg: 14 });
  P.sprinklers(c, 0, -43, 43, -22, 22, 4.3, 7);
  // BMS room beside the entrance.
  P.wall(k, 0, [10, 6.2], [10, 23]);
  k.box("controls", 0, [0.3, 2.6, 8], [22.8, 1, 14]);
  for (const z of [11, 16]) {
    k.box("fit", 0, [1, 0.78, 3], [19.6, 0, z]);
    k.box("controls", 0, [0.07, 0.55, 2.2], [19.9, 0.95, z], { edge: false });
  }
  for (const x of [-42, 0]) k.box("water", 0, [5, 2.6, 4], [x, 0, -21]);

  /* ---------- Podium first floor: operating theatres and intensive care ---------- */
  P.storey(k, 1, POD, 5, { fins: "se" });
  for (let i = 0; i < 6; i++) {
    const x = -36 + 11 * i;
    P.wall(k, 1, [x - 5, 8], [x + 5, 8]);
    P.wall(k, 1, [x - 5, 8], [x - 5, 20]);
    P.wall(k, 1, [x + 5, 8], [x + 5, 20]);
    k.box("fit", 1, [0.8, 0.9, 2.2], [x, 0, 14]);
    // Laminar flow ceiling over the table, on its supply duct.
    k.box("air", 1, [3.2, 0.4, 3.2], [x, 3.6, 14]);
    P.duct(
      k,
      1,
      [
        [x, 4.3, 14],
        [x, 4.3, 4],
      ],
      1,
      0.5,
    );
    P.dots(k, "controls", 1, [[x - 4.2, 2.2, 9]], 0.3);
  }
  P.duct(
    k,
    1,
    [
      [-40, 4.3, 4],
      [36, 4.3, 4],
    ],
    1.4,
    0.6,
  );
  for (let i = 0; i < 12; i++) {
    const x = -40 + 6 * i;
    k.box("fit", 1, [1, 0.7, 2.1], [x, 0, -16]);
    k.box("controls", 1, [0.4, 1.5, 0.3], [x + 1, 0, -17.2], { edge: false });
  }
  P.wall(k, 1, [-44, -10], [34, -10]);
  for (const x of [-42, 0]) k.box("water", 1, [5, 2.6, 4], [x, 0, -21]);
  P.sprinklers(c, 1, -43, 43, -22, 22, 4.6, 7);
  k.pipe(
    "controls",
    1,
    [
      [-42, 3.6, 22],
      [42, 3.6, 22],
    ],
    0.08,
    8,
  );
  c.flows.push({
    sys: "controls",
    lvl: 1,
    pts: [
      [-42, 3.6, 22],
      [42, 3.6, 22],
    ],
  });

  /* ---------- Ward block (three floors, shown as one) and the podium roof ---------- */
  P.slab(k, 2, POD);
  P.rim(k, 2, WARD);
  P.cols(k, 2, WARD, 12);
  P.walls(k, 2, WARD, 12, { fins: "sen", storeys: 3 });
  // Theatre air handling units on the podium roof, with ducts down.
  for (let i = 0; i < 6; i++) {
    const x = -36 + 11 * i;
    P.ahu(k, 2, x, 14, 6);
    k.box("air", 2, [1.2, 1.2, 1.2], [x + 2, -1.2, 14], { edge: false });
  }
  P.solar(k, 2, -42, 42, 18.5, 23.5);
  // Top ward floor: rooms off a central corridor.
  for (let x = -36; x <= 36.01; x += 6) {
    P.wall(k, 2, [x, -13.6], [x, -6]);
    P.wall(k, 2, [x, -2], [x, 5.6]);
  }
  P.wall(k, 2, [-36, -6], [36, -6]);
  P.wall(k, 2, [-36, -2], [36, -2]);
  for (let x = -33; x <= 33.01; x += 6)
    for (const [z, zf, zw] of [
      [-10.5, -7.2, -12.6],
      [2.2, -0.8, 4.6],
    ] as const) {
      k.box("fit", 2, [1, 0.7, 2.1], [x - 1.2, 0, z]);
      k.box("fit", 2, [1, 0.7, 2.1], [x + 1.2, 0, z]);
      k.box("air", 2, [1.6, 0.4, 0.8], [x, 2.8, zf], { edge: false });
      k.box("water", 2, [1.4, 2.2, 1.2], [x + 2.2, 0, zw]);
      P.dots(k, "controls", 2, [[x - 2.4, 2.2, zf]], 0.26);
    }
  for (const z of [-5.2, -2.8])
    k.pipe(
      "cooling",
      2,
      [
        [-35, 3.3, z],
        [35, 3.3, z],
      ],
      0.16,
    );
  k.box("controls", 2, [4, 1.1, 1.6], [0, 0, -4]);
  P.sprinklers(c, 2, -35, 35, -13, 5, 11.4, 6);

  /* ---------- Roof plant ---------- */
  P.roofDeck(k, 3, WARD);
  for (let i = 0; i < 3; i++) P.chiller(k, 3, -24 + 12 * i, -8);
  for (let i = 0; i < 3; i++) P.tower(k, 3, -24 + 7.2 * i, 1.4);
  for (let i = 0; i < 4; i++) P.pump(k, 3, 2 + 4.4 * i, 2.4);
  for (const z of [-12.4, -11.6])
    k.pipe(
      "cooling",
      3,
      [
        [-33, 3, z],
        [14, 3, z],
      ],
      0.28,
    );
  for (let i = 0; i < 3; i++)
    k.pipe(
      "cooling",
      3,
      [
        [-24 + 12 * i, 3, -12.4],
        [-24 + 12 * i, 3, -8.6],
        [-24 + 12 * i, 2.1, -8.6],
      ],
      0.15,
    );
  c.flows.push({
    sys: "cooling",
    lvl: 3,
    pts: [
      [14, 3, -12.4],
      [-33, 3, -12.4],
    ],
  });
  for (let i = 0; i < 2; i++) P.vtank(k, "water", 3, 26 + 6 * i, -8, 2.2, 3.4);
  P.solar(k, 3, 20, 35, -2, 5);
  k.box("controls", 3, [2.4, 2.1, 0.5], [16, 0, -12.6]);

  /* ---------- Risers ---------- */
  for (const z of [-12.4, -11.6])
    c.risers.push({
      sys: "cooling",
      x: -33,
      z,
      r: 0.28,
      from: { lvl: 0, y: 3.4 },
      to: { lvl: 3, y: 3 },
    });
  k.pipe(
    "cooling",
    0,
    [
      [-33, 3.4, -12.4],
      [30, 3.4, -12.4],
      [30, 3.4, -18],
    ],
    0.22,
  );
  c.risers.push({
    sys: "fire",
    x: 35,
    z: -12.6,
    r: 0.2,
    from: { lvl: 0, y: 4.3 },
    to: { lvl: 2, y: 11.4 },
  });
  c.risers.push({
    sys: "power",
    x: 33,
    z: 5.6,
    r: 0.28,
    from: { lvl: 0, y: 2.2 },
    to: { lvl: 2, y: 3 },
  });
  c.risers.push({
    sys: "water",
    x: 31,
    z: -12.6,
    r: 0.2,
    from: { lvl: 0, y: 1 },
    to: { lvl: 3, y: 1.2 },
  });
  c.risers.push({
    sys: "controls",
    x: 22.8,
    z: 5,
    r: 0.1,
    from: { lvl: 0, y: 3.4 },
    to: { lvl: 3, y: 2 },
  });

  /* ---------- Site ---------- */
  P.plot(k, SITE, 6, 4, 210, 130);
  P.road(k, SITE, 6, 36, 198, 8);
  P.road(k, SITE, 54, 0, 6, 80);
  P.road(k, SITE, -62, 0, 6, 80);
  P.substation(k, SITE, 72, -30, 16, 7);
  for (let i = 0; i < 2; i++) P.transformer(k, SITE, 86 + 7 * i, -30);
  for (let i = 0; i < 3; i++) P.dg(k, SITE, 84, -18 + 5.4 * i);
  P.feeder(c, SITE, [
    [72, -25],
    [72, -8],
    [50, -8],
    [50, 8],
    [45.4, 8],
  ]);
  // Thermal energy storage beside the plant.
  P.vtank(k, "process", SITE, 72, 10, 4.2, 9, 0.07);
  k.pipe(
    "process",
    SITE,
    [
      [72, 1.2, 14],
      [72, 1.2, 20],
      [45.4, 1.2, 20],
    ],
    0.22,
  );
  P.fireYard(c, SITE, {
    tank: [-84, 22],
    house: [-84, 8],
    ring: [-49, -28, 49, 30],
  });
  for (let i = 0; i < 2; i++)
    k.box("water", SITE, [12, 1.4, 8], [22 + 15 * i, 0.07, 54]);
  for (let i = 0; i < 3; i++)
    P.vtank(k, "water", SITE, 52 + 6 * i, 54, 2.2, 4, 0.07);
  for (let i = 0; i < 5; i++)
    k.cyl("water", SITE, 1.3, 0.4, [-40 + 10 * i, 0.07, 46], { seg: 20 });
  const wmain: P3[] = [
    [22, 0.3, 50],
    [22, 0.3, 32],
    [31, 0.3, 32],
    [31, 0.3, 24.4],
  ];
  k.pipe("water", SITE, wmain, 0.22);
  c.flows.push({ sys: "water", lvl: SITE, pts: wmain });
  // Parking canopies with solar.
  for (let i = 0; i < 3; i++) {
    P.solar(k, SITE, -96 + 0, -76, -36 + 22 * i, -20 + 22 * i, 3.2);
    for (const dx of [2, 18])
      for (const dz of [2, 14])
        k.box(
          "structure",
          SITE,
          [0.4, 3.4, 0.4],
          [-96 + dx, 0, -36 + 22 * i + dz],
          { edge: false },
        );
  }
  P.cctv(k, SITE, [
    [-96, 62],
    [-30, 44],
    [30, 44],
    [108, 62],
    [108, -56],
    [-96, -56],
  ]);

  const a = (lvl: number, at: P3): Anchor => ({ lvl, at });
  return P.finish(c, Y, 10, {
    plinths: a(SITE, [84, 0.5, -12.6]),
    trench: a(SITE, [61, 0.4, -8]),
    partitions: a(1, [-14, 1.2, 8]),
    slab: a(2, [40, 0, 24]),
    chillers: a(3, [-12, 3.2, -8]),
    towers: a(3, [-16.8, 5.4, 1.4]),
    otahu: a(2, [-3, 2.9, 14]),
    laminar: a(1, [8, 4.1, 14]),
    fcu: a(2, [15, 3.2, -7.2]),
    storage: a(SITE, [72, 9.6, 10]),
    tank: a(SITE, [-84, 8.2, 22]),
    hydrants: a(SITE, [0, 1.6, 30]),
    sprinklers: a(2, [9, 11.6, -4]),
    gas: a(0, [29, 1.9, 22.4]),
    substation: a(SITE, [72, 5.9, -30]),
    dg: a(SITE, [84, 4, -12.6]),
    lt: a(0, [34, 2.4, 8]),
    transformers: a(SITE, [89.5, 4.4, -30]),
    treatment: a(SITE, [58, 4.6, 54]),
    tanks: a(SITE, [29.5, 1.8, 54]),
    rain: a(SITE, [-20, 0.8, 46]),
    stacks: a(2, [-0.8, 2.4, 4.6]),
    rooftanks: a(3, [29, 3.9, -8]),
    bms: a(0, [22.8, 3.8, 14]),
    nurse: a(2, [0, 1.3, -4]),
    icu: a(1, [-10, 1.7, -17.2]),
    ot: a(1, [-25, 2.5, 9]),
    solar: a(2, [10, 1.2, 21]),
    canopy: a(SITE, [-86, 4.2, -6]),
    roofsolar: a(3, [27.5, 1.2, 1.5]),
  });
}

const S = (at: P3): Anchor => ({ lvl: SITE, at });
const views: Record<string, BuildingView<Sys>> = {
  intro: {
    target: S([6, 8, 4]),
    azimuth: 36,
    elevation: 29,
    distance: 470,
    explode: 0,
    shell: 1,
    lit: {},
  },
  hvac: {
    target: S([4, 24, 0]),
    azimuth: 30,
    elevation: 26,
    distance: 410,
    explode: 1,
    shell: 0,
    lit: { cooling: 1, air: 1 },
  },
  lowenergy: {
    target: S([50, 8, 6]),
    azimuth: 62,
    elevation: 30,
    distance: 250,
    explode: 0,
    shell: 1,
    lit: { process: 1, cooling: 0.4 },
  },
  fire: {
    target: S([-10, 22, 6]),
    azimuth: -30,
    elevation: 26,
    distance: 420,
    explode: 1,
    shell: 0,
    racks: 0.45,
    lit: { fire: 1 },
  },
  power: {
    target: S([46, 10, -8]),
    azimuth: 68,
    elevation: 30,
    distance: 330,
    explode: 0.7,
    shell: 0,
    lit: { power: 1, powerB: 1 },
  },
  water: {
    target: S([10, 20, 14]),
    azimuth: 16,
    elevation: 26,
    distance: 420,
    explode: 1,
    shell: 0,
    lit: { water: 1 },
  },
  // The ward block lifts away to show the theatre floor.
  controls: {
    target: { lvl: 1, at: [0, 1, 0] },
    azimuth: 26,
    elevation: 42,
    distance: 250,
    explode: 0,
    lidAbove: 1,
    shell: 0,
    shellFrom: 1,
    lit: { controls: 1 },
  },
  civil: {
    target: S([6, 22, 2]),
    azimuth: 36,
    elevation: 26,
    distance: 440,
    explode: 1,
    shell: 0,
    racks: 0.2,
    lit: { structure: 1 },
  },
  green: {
    target: S([-6, 10, 0]),
    azimuth: -36,
    elevation: 36,
    distance: 430,
    explode: 0,
    shell: 1,
    lit: { green: 1 },
  },
  om: {
    target: S([6, 9, 4]),
    azimuth: 34,
    elevation: 28,
    distance: 440,
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
