import type { P3 } from "../kit";
import type { BuildingView, ModelPack, Anchor } from "../types";
import * as P from "../parts";
import type { Sys } from "../parts";

/**
 * A cleanroom building for semiconductor and electronics manufacturing:
 * a sub fab for utilities, the cleanroom above it and a roof plant deck,
 * with a utility yard, gas yard and substation to the east.
 * A diagram of where each service sits, not a drawing of one project.
 */
const Y = [0, 6.5, 14];
const SITE = 3;
const B = { x: 0, z: 0, w: 84, d: 44 };
const TOOL_Z = [-11, -5.5, 0, 5.5, 11];

function build() {
  const c = P.newCtx();
  const { k } = c;

  /* ---------- Sub fab ---------- */
  P.storey(k, 0, B, 6.5);
  for (let x = -28; x <= 28; x += 14)
    for (const z of [-8, 8])
      k.box("structure", 0, [0.9, 6, 0.9], [x, 0, z], { edge: false });
  // Recirculation air handlers along the south wall.
  for (let i = 0; i < 6; i++) P.ahu(k, 0, -30 + 12 * i, 18.6, 6);
  // Process utilities: CDA, nitrogen and vacuum mains with laterals.
  for (const [z, r] of [
    [-15, 0.24],
    [-14.2, 0.2],
    [-13.4, 0.16],
  ] as const)
    k.pipe(
      "process",
      0,
      [
        [42, 4.6, z],
        [-37, 4.6, z],
      ],
      r,
    );
  for (let i = 0; i < 9; i++) {
    const x = -32 + 8 * i;
    k.pipe(
      "process",
      0,
      [
        [x, 4.6, -15],
        [x, 4.6, 12],
      ],
      0.1,
      8,
    );
    for (const z of TOOL_Z)
      k.pipe(
        "process",
        0,
        [
          [x, 4.6, z],
          [x, 6.4, z],
        ],
        0.08,
        8,
      );
  }
  c.flows.push({
    sys: "process",
    lvl: 0,
    pts: [
      [42, 4.6, -15],
      [-37, 4.6, -15],
    ],
  });
  // Process cooling water: pump skid, heat exchangers, headers and branches.
  for (let i = 0; i < 3; i++) P.pump(k, 0, -37.5, 4 + 2.6 * i, "water");
  for (let i = 0; i < 2; i++)
    k.box("water", 0, [1.3, 2, 2.6], [-33.6, 0, 5 + 4 * i]);
  for (const z of [14.6, 15.5])
    k.pipe(
      "water",
      0,
      [
        [-36, 3.2, z],
        [38, 3.2, z],
      ],
      0.22,
    );
  k.pipe(
    "water",
    0,
    [
      [-37.5, 1, 9],
      [-36, 1, 9],
      [-36, 3.2, 9],
      [-36, 3.2, 15.5],
    ],
    0.2,
  );
  for (let i = 0; i < 9; i++) {
    const x = -28 + 8 * i;
    k.pipe(
      "water",
      0,
      [
        [x, 3.2, 14.6],
        [x, 3.2, -11],
      ],
      0.1,
      8,
    );
    for (const z of TOOL_Z)
      k.pipe(
        "water",
        0,
        [
          [x, 3.2, z],
          [x, 6.4, z],
        ],
        0.07,
        8,
      );
  }
  c.flows.push({
    sys: "water",
    lvl: 0,
    pts: [
      [-36, 3.2, 14.6],
      [38, 3.2, 14.6],
    ],
  });
  // Clean power: LT line up, bus duct and floor distribution boards.
  P.panels(k, "power", 0, 8, -20.4, 22);
  k.box("power", 0, [76, 0.3, 0.45], [0, 5.5, -18.4]);
  for (let i = 0; i < 9; i++)
    k.box("power", 0, [0.9, 2, 0.5], [-34 + 8 * i, 0, -17.6]);
  c.flows.push({
    sys: "power",
    lvl: 0,
    pts: [
      [38, 5.6, -18.4],
      [-38, 5.6, -18.4],
    ],
  });
  // PLC panels.
  for (const x of [-20, 4, 28]) k.box("controls", 0, [1.6, 2, 0.5], [x, 0, 21]);

  /* ---------- Cleanroom ---------- */
  P.storey(k, 1, B, 7.5);
  // Raised access floor of the cleanroom, with its tile grid.
  k.box("env", 1, [68, 0.5, 32], [0, 0, 0]);
  const grid: [P3, P3][] = [];
  for (let x = -34; x <= 34.01; x += 2.4)
    grid.push([
      [x, 0.52, -16],
      [x, 0.52, 16],
    ]);
  for (let z = -16; z <= 16.01; z += 2.4)
    grid.push([
      [-34, 0.52, z],
      [34, 0.52, z],
    ]);
  k.lines("env", 1, grid);
  // Wall panels, cut low, with the gowning rooms and airlocks at the west end.
  for (const z of [-16.2, 16.2]) P.wall(k, 1, [-34, z], [34, z], 1.7, "env");
  P.wall(k, 1, [34.2, -16.2], [34.2, 16.2], 1.7, "env");
  P.wall(k, 1, [-34.2, -16.2], [-34.2, 16.2], 1.7, "env");
  for (const z of [-9, -3, 3, 9])
    P.wall(k, 1, [-41, z], [-34.2, z], 1.7, "env");
  P.wall(k, 1, [-38, -9], [-38, 9], 1.7, "env");
  // Airlock floors, lit with the pressure system.
  for (const z of [-6, 0, 6]) {
    k.box("air2", 1, [3.4, 0.12, 5.4], [-36.1, 0, z], { edge: false });
    k.box("air2", 1, [2.6, 0.12, 5.4], [-39.5, 0, z], { edge: false });
  }
  // Low level return air chases along both long walls.
  for (let x = -31; x <= 31.01; x += 6.2)
    for (const z of [-15.6, 15.6])
      k.box("air2", 1, [1.6, 4.4, 0.7], [x, 0.5, z]);
  // Process tools in bays, each on the bus duct above its row.
  for (const z of TOOL_Z) {
    for (let x = -30; x <= 30.01; x += 5)
      k.box("fit", 1, [3, 2.2, 1.7], [x, 0.5, z]);
    k.box("power", 1, [64, 0.2, 0.3], [0, 4, z - 1.3], { edge: false });
  }
  // Point of use panels beside the tools.
  for (let i = 0; i < 9; i++)
    for (const z of TOOL_Z)
      k.box("process", 1, [0.5, 1.3, 0.4], [-32 + 8 * i, 0.5, z + 1.3], {
        edge: false,
      });
  // Fan filter units over the whole room.
  for (let x = -32.4; x <= 32.5; x += 3.6)
    for (let z = -14.4; z <= 14.5; z += 3.6)
      k.box("air", 1, [1.3, 0.4, 1.3], [x, 4.7, z], { edge: false });
  // Particle counters and room sensors, and the control room at the east end.
  const sensors: P3[] = [];
  for (let x = -30; x <= 30.01; x += 12)
    for (const z of [-13.5, -2.7, 2.7, 13.5]) sensors.push([x, 2.9, z]);
  for (const z of [-6, 0, 6]) sensors.push([-36.1, 2.2, z]);
  P.dots(k, "controls", 1, sensors, 0.3);
  P.wall(k, 1, [35.6, -6.5], [41.6, -6.5]);
  P.wall(k, 1, [35.6, 6.5], [41.6, 6.5]);
  k.box("controls", 1, [0.3, 2.8, 9], [41.2, 1, 0]);
  for (const z of [-3, 1]) {
    k.box("fit", 1, [1, 0.78, 3], [38.4, 0, z]);
    k.box("controls", 1, [0.07, 0.55, 2.2], [38.7, 0.95, z], { edge: false });
  }
  k.pipe(
    "controls",
    1,
    [
      [-36, 5.6, 17.2],
      [38, 5.6, 17.2],
      [38, 5.6, 0],
      [41, 5.6, 0],
    ],
    0.08,
    8,
  );
  c.flows.push({
    sys: "controls",
    lvl: 1,
    pts: [
      [-36, 5.6, 17.2],
      [38, 5.6, 17.2],
    ],
  });

  /* ---------- Roof plant deck ---------- */
  P.roofDeck(k, 2, B);
  // Make up air units with supply ducts into the plenum below.
  for (let i = 0; i < 4; i++) {
    const x = -28 + 18.6 * i;
    P.ahu(k, 2, x, -13, 10);
    P.duct(
      k,
      2,
      [
        [x + 3, 1.4, -11.8],
        [x + 3, 1.4, -4],
      ],
      1.5,
      0.9,
    );
    k.box("air", 2, [1.6, 1.2, 1.6], [x + 3, 0, -4], { edge: false });
  }
  P.duct(
    k,
    2,
    [
      [-26, 1.4, -4],
      [32, 1.4, -4],
    ],
    1.5,
    0.9,
  );
  // Exhaust scrubbers and stacks.
  for (let i = 0; i < 3; i++) {
    const x = 14 + 9 * i;
    P.vtank(k, "air2", 2, x, 11, 1.7, 5.4);
    k.cyl("air2", 2, 0.5, 4.6, [x + 2.6, 0.3, 11], { seg: 14 });
    k.pipe(
      "air2",
      2,
      [
        [x, 4.4, 11],
        [x + 2.6, 4.4, 11],
      ],
      0.35,
    );
  }
  k.box("controls", 2, [2.4, 2.1, 0.5], [-38, 0, -18]);

  /* ---------- Site ---------- */
  P.plot(k, SITE, 14, 4, 196, 112);
  P.road(k, SITE, 14, 34, 184, 7);
  P.road(k, SITE, 48, 0, 6, 76);
  P.road(k, SITE, 104, 0, 7, 76);
  k.box("site", SITE, [44, 0.12, 96], [76, -0.05, -2]);
  // Central utility yard: chillers, cooling towers, pumps.
  for (let i = 0; i < 4; i++) {
    P.chiller(k, SITE, 62 + 0, -34 + 5 * i, 0.07);
    P.tower(k, SITE, 78 + 0, -34 + 6.4 * i, 0.07);
  }
  for (let i = 0; i < 4; i++)
    P.pump(k, SITE, 70.5, -33 + 3 * i, "cooling", 0.07);
  // Pipe trestle from the yard to the building, carrying chilled water and gases.
  for (let x = 44; x <= 56.01; x += 4) {
    for (const z of [-16.4, -12.6])
      k.box("structure", SITE, [0.4, 5.2, 0.4], [x, 0, z], { edge: false });
    k.box("structure", SITE, [0.4, 0.4, 4.2], [x, 5.1, -14.5], { edge: false });
  }
  for (const z of [-16, -15.2])
    k.pipe(
      "cooling",
      SITE,
      [
        [42.4, 5.9, z],
        [57.5, 5.9, z],
        [57.5, 2.2, z],
        [57.5, 2.2, -24],
      ],
      0.26,
    );
  for (const [z, r] of [
    [-14.2, 0.2],
    [-13.6, 0.16],
    [-13, 0.14],
  ] as const)
    k.pipe(
      "process",
      SITE,
      [
        [42.4, 5.9, z],
        [58.5, 5.9, z],
        [58.5, 5.9, 12],
        [66, 5.9, 12],
        [66, 2, 12],
      ],
      r,
    );
  c.flows.push({
    sys: "cooling",
    lvl: SITE,
    pts: [
      [57.5, 5.9, -16],
      [42.4, 5.9, -16],
    ],
  });
  c.flows.push({
    sys: "process",
    lvl: SITE,
    pts: [
      [66, 5.9, 12],
      [58.5, 5.9, 12],
      [58.5, 5.9, -14.2],
      [42.4, 5.9, -14.2],
    ],
  });
  // Gas yard: bulk nitrogen, vaporisers, air compressors, dryers and receiver.
  P.vtank(k, "process", SITE, 64, 20, 2, 10.5, 0.07);
  for (let i = 0; i < 3; i++)
    k.box("process", SITE, [1.6, 4.2, 1.6], [69.5 + 2.4 * i, 0.07, 22]);
  for (let i = 0; i < 3; i++)
    k.box("process", SITE, [3.4, 2.3, 2], [70 + 5 * i, 0.07, 12]);
  for (let i = 0; i < 2; i++)
    P.vtank(k, "process", SITE, 86 + 3.4 * i, 12, 0.9, 3.4, 0.07);
  P.vtank(k, "process", SITE, 88, 20, 1.5, 6, 0.07);
  k.pipe(
    "process",
    SITE,
    [
      [64, 2, 18],
      [64, 2, 12],
      [66, 2, 12],
    ],
    0.16,
  );
  // Substation, transformers and generators.
  P.substation(k, SITE, 66, 40, 18, 7);
  for (let i = 0; i < 3; i++) P.transformer(k, SITE, 80 + 7 * i, 40);
  for (let i = 0; i < 3; i++) P.dg(k, SITE, 86, -4 + 5.4 * i);
  P.feeder(c, SITE, [
    [72, 35],
    [51, 35],
    [51, -19.5],
    [42.4, -19.5],
  ]);
  // Fire: tank, pump house and hydrant ring, sprinklers on both floors,
  // and a clean agent bank in the sub fab.
  P.fireYard(c, SITE, {
    tank: [-68, 10],
    house: [-68, 27],
    ring: [-46, -27, 46, 27],
  });
  P.sprinklers(c, 0, -40, 40, -20, 20, 5.8, 8);
  P.sprinklers(c, 1, -40, 40, -20, 20, 7, 8);
  k.pipe(
    "fire",
    SITE,
    [
      [-46, 0.28, 20.6],
      [-42.4, 0.28, 20.6],
    ],
    0.2,
  );
  c.risers.push({
    sys: "fire",
    x: -41.2,
    z: 20.6,
    r: 0.2,
    from: { lvl: 0, y: 0.6 },
    to: { lvl: 1, y: 7 },
  });
  for (let i = 0; i < 6; i++)
    k.cyl("fire", 0, 0.28, 1.7, [-40.4 + 0.8 * i, 0, -20.9], { seg: 14 });

  // Plumbing: treatment plant, storage tanks and rainwater pits on the
  // west side, wet rooms by the gowning area, drainage in the sub fab.
  k.box("green", SITE, [10, 3, 6], [-68, 0.07, -12]);
  k.box("green", SITE, [10.6, 0.3, 6.6], [-68, 3.07, -12], { edge: false });
  for (const x of [-71, -65]) P.vtank(k, "green", SITE, x, -23, 2.2, 4.6, 0.07);
  k.box("green", SITE, [12, 0.5, 8], [-68, 0.07, -38]);
  for (const z of [-34, -14, 6, 26])
    k.cyl("green", SITE, 1.3, 0.4, [-80, 0.07, z], { seg: 20 });
  const wmain: P3[] = [
    [-63, 0.3, -12],
    [-50, 0.3, -12],
    [-50, 0.3, -17],
    [-42.4, 0.3, -17],
  ];
  k.pipe("green", SITE, wmain, 0.22);
  c.flows.push({ sys: "green", lvl: SITE, pts: wmain });
  k.box("green", 0, [3.4, 2.6, 3], [-39.4, 0, -17]);
  for (let i = 0; i < 2; i++) P.pump(k, 0, -35.4, -18.4 + 2.4 * i, "green");
  const drain: P3[] = [
    [-36, 0.3, -21.2],
    [40.6, 0.3, -21.2],
    [40.6, 0.3, 21.2],
    [-30, 0.3, 21.2],
  ];
  k.pipe("green", 0, drain, 0.13, 8);
  for (let x = -30; x <= 38.01; x += 8)
    k.cyl("green", 0, 0.45, 0.14, [x, 0.3, -21.2], { seg: 14 });
  c.flows.push({ sys: "green", lvl: 0, pts: drain });
  k.box("green", 1, [4.4, 2.4, 4.6], [-39.2, 0, -16]);
  k.box("green", 2, [4, 2.2, 3], [-38.6, 0, -19]);
  c.risers.push({
    sys: "green",
    x: -41.3,
    z: -19.4,
    r: 0.2,
    from: { lvl: 0, y: 1 },
    to: { lvl: 2, y: 1.1 },
  });

  P.cctv(k, SITE, [
    [-78, 56],
    [-20, 56],
    [40, 56],
    [108, 56],
    [108, -48],
    [-78, -48],
  ]);

  const a = (lvl: number, at: P3): Anchor => ({ lvl, at });
  return P.finish(c, Y, 11, {
    firetank: a(SITE, [-68, 8.2, 10]),
    hydrants: a(SITE, [0, 1.6, 27]),
    sprinklers: a(1, [12, 7.2, 0]),
    agent: a(0, [-38.4, 1.9, -20.9]),
    treatment: a(SITE, [-68, 3.5, -12]),
    rainwater: a(SITE, [-80, 0.7, 6]),
    wetrooms: a(1, [-39.2, 2.6, -16]),
    drains: a(0, [18, 0.5, -21.2]),
    plinths: a(SITE, [62, 0.5, -29]),
    trench: a(SITE, [51, 0.4, 12]),
    slab: a(1, [30, 0, 22]),
    mau: a(2, [-9.4, 2.9, -13]),
    ffu: a(1, [3.6, 5.2, 3.6]),
    recirc: a(0, [18, 2.8, 18.6]),
    airlock: a(1, [-37.5, 1.8, 0]),
    returns: a(1, [12.4, 5, 15.6]),
    scrubber: a(2, [23, 5.8, 11]),
    floor: a(1, [-20, 0.6, 14]),
    panels: a(1, [34.2, 1.8, -10]),
    gas: a(SITE, [64, 10.8, 20]),
    compressors: a(SITE, [75, 2.5, 12]),
    trestle: a(SITE, [50, 6.2, -14.2]),
    pou: a(1, [8, 1.9, 6.8]),
    pcwskid: a(0, [-37.5, 1.6, 6.6]),
    pcwheader: a(0, [10, 3.5, 14.6]),
    counters: a(1, [6, 3.3, -13.5]),
    control: a(1, [41.2, 4, 0]),
    plc: a(0, [4, 2.2, 21]),
    substation: a(SITE, [66, 5.9, 40]),
    transformers: a(SITE, [87, 4.4, 40]),
    busduct: a(1, [-12, 4.3, -6.8]),
    lt: a(0, [22, 2.4, -20.4]),
    chillers: a(SITE, [62, 3.2, -24]),
  });
}

const S = (at: P3): Anchor => ({ lvl: SITE, at });
const views: Record<string, BuildingView<Sys>> = {
  intro: {
    target: S([14, 6, 2]),
    azimuth: 36,
    elevation: 30,
    distance: 440,
    explode: 0,
    shell: 1,
    lit: {},
  },
  // The air path from the roof, through the ceiling filters, to the sub fab.
  hvac: {
    target: S([4, 18, 0]),
    azimuth: 30,
    elevation: 27,
    distance: 330,
    explode: 1,
    shell: 0,
    lit: { air: 1 },
  },
  pressure: {
    target: { lvl: 1, at: [-6, 1, 0] },
    azimuth: -22,
    elevation: 42,
    distance: 215,
    explode: 0,
    lidAbove: 1,
    shell: 0,
    shellFrom: 1,
    lit: { air2: 1, air: 0.35 },
  },
  envelope: {
    target: { lvl: 1, at: [0, 1, 0] },
    azimuth: 24,
    elevation: 44,
    distance: 250,
    explode: 0,
    lidAbove: 1,
    shell: 0,
    shellFrom: 1,
    racks: 0.25,
    lit: { env: 1 },
  },
  process: {
    target: S([30, 14, 0]),
    azimuth: 62,
    elevation: 27,
    distance: 340,
    explode: 1,
    shell: 0,
    lit: { process: 1 },
  },
  pcw: {
    target: S([-4, 12, 4]),
    azimuth: -28,
    elevation: 25,
    distance: 320,
    explode: 1,
    shell: 0,
    lit: { water: 1 },
  },
  controls: {
    target: { lvl: 1, at: [0, 1, 0] },
    azimuth: 40,
    elevation: 38,
    distance: 245,
    explode: 0,
    lidAbove: 1,
    shell: 0,
    shellFrom: 1,
    lit: { controls: 1 },
  },
  power: {
    target: S([36, 10, 6]),
    azimuth: 118,
    elevation: 30,
    distance: 330,
    explode: 1,
    shell: 0,
    lit: { power: 1 },
  },
  fire: {
    target: S([-10, 12, 6]),
    azimuth: -32,
    elevation: 27,
    distance: 390,
    explode: 1,
    shell: 0,
    racks: 0.4,
    lit: { fire: 1 },
  },
  plumbing: {
    target: S([-18, 10, -6]),
    azimuth: -52,
    elevation: 30,
    distance: 370,
    explode: 1,
    shell: 0,
    racks: 0.4,
    lit: { green: 1 },
  },
  civil: {
    target: S([14, 10, 2]),
    azimuth: 40,
    elevation: 27,
    distance: 410,
    explode: 1,
    shell: 0,
    racks: 0.15,
    lit: { structure: 1 },
  },
  validation: {
    target: S([14, 8, 2]),
    azimuth: 34,
    elevation: 29,
    distance: 385,
    explode: 0,
    shell: 0.1,
    lit: { ...P.ALL_LIT, env: 0 },
  },
};

export const PACK: ModelPack<Sys> = {
  build,
  views,
  palette: P.PALETTE,
  roles: P.ROLES,
};
