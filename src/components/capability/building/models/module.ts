import type { P3 } from "../kit";
import type { BuildingView, ModelPack, Anchor } from "../types";
import * as P from "../parts";
import type { Sys } from "../parts";

/**
 * One multi service module, drawn large. Each service sits on its own
 * level, so the module comes apart layer by layer as the reader scrolls:
 * frame, plumbing, mechanical, fire, electrical, controls. Beside the
 * workshop bay is a landing zone on site, where a second module is lowered
 * in next to one already installed.
 * A diagram of what a module holds, not a drawing of one project.
 */
const Y = [0, 0, 0, 0, 0, 0, 0];
const SITE = 7;
type Lv = {
  frame: number;
  plumb: number;
  mech: number;
  fire: number;
  elec: number;
  ctrl: number;
};
/** The module in the workshop bay: one level per service. */
const BAY: Lv = { frame: 0, plumb: 1, mech: 2, fire: 3, elec: 4, ctrl: 5 };
/** The module being lowered in on site: one level, lifted as a lid. */
const LIFTED = 6;
const all = (l: number): Lv => ({
  frame: l,
  plumb: l,
  mech: l,
  fire: l,
  elec: l,
  ctrl: l,
});
/** Height of the jig bed and of the site plinths. */
const OY = 1.6;
const AX = -50;
const BX = 44;
const CX = 112;
const POSTS = [-32, -16, 0, 16, 32];

function moduleAt(c: P.Ctx, lv: Lv, ox: number, caps: boolean) {
  const { k } = c;
  const at = (x: number, y: number, z: number): P3 => [ox + x, OY + y, z];
  const e = { edge: false };

  /* Frame: base skid, posts, two service tiers, top ring, lifting points. */
  for (const z of [-7.6, 7.6]) {
    k.box("structure", lv.frame, [65, 0.9, 0.9], at(0, 0, z));
    k.box("structure", lv.frame, [65, 0.9, 0.9], at(0, 17.1, z));
    for (const x of POSTS)
      k.box("structure", lv.frame, [0.9, 16.2, 0.9], at(x, 0.9, z), e);
    for (const x of [-32, 32])
      k.cyl("structure", lv.frame, 0.9, 1.3, at(x, 18, z), { seg: 14 });
  }
  for (const x of POSTS)
    for (const y of [0.1, 5.6, 11, 17.2])
      k.box("structure", lv.frame, [0.7, 0.7, 14.3], at(x, y, 0), e);

  /* Plumbing: drainage and condensate headers, booster set. */
  k.pipe("water", lv.plumb, [at(-31, 2, -5.4), at(24, 2, -5.4)], 0.6, 14);
  k.pipe("water", lv.plumb, [at(-31, 1.8, -3.4), at(24, 1.8, -3.4)], 0.4, 12);
  k.box("structure", lv.plumb, [14, 0.4, 4.6], at(-21, 0.9, 3.6), e);
  k.cyl("water", lv.plumb, 1.7, 3.6, at(-25.6, 1.3, 3.6), { seg: 24 });
  for (const x of [-21, -17]) {
    k.box("water", lv.plumb, [1.8, 0.9, 1.8], at(x, 1.3, 3.6), e);
    k.cyl("water", lv.plumb, 1, 2.8, at(x, 3.2, 3.6), { axis: "z", seg: 18 });
  }
  k.pipe(
    "water",
    lv.plumb,
    [
      at(-25.6, 4.2, 3.6),
      at(-25.6, 4.2, 1.2),
      at(-17, 4.2, 1.2),
      at(-17, 3.2, 2.2),
    ],
    0.3,
    10,
  );

  /* Mechanical: chilled water headers, valve station, pump skid. */
  const headers = [-4.2, -0.6];
  for (const z of headers) {
    k.pipe("cooling", lv.mech, [at(-32, 7.9, z), at(32, 7.9, z)], 1.25, 20);
    for (const x of [-32.4, 32.4])
      k.cyl("cooling", lv.mech, 1.75, 0.5, at(x, 7.9, z), {
        axis: "x",
        seg: 20,
      });
    for (const x of [2, 8, 14]) {
      k.cyl("cooling", lv.mech, 0.75, 2.2, at(x, 8.8, z), { seg: 14 });
      k.cyl("cooling", lv.mech, 1.2, 0.25, at(x, 11, z), { seg: 18 });
    }
    if (caps)
      for (const x of [-33, 33])
        k.cyl("process", lv.mech, 1.5, 0.9, at(x, 7.9, z), {
          axis: "x",
          seg: 18,
        });
  }
  k.box("structure", lv.mech, [15, 0.5, 5.6], at(19, 0.9, 3.9), e);
  for (const x of [14.5, 23.5]) {
    k.cyl("cooling", lv.mech, 1.5, 3.8, at(x, 3.2, 5), { axis: "z", seg: 20 });
    k.cyl("cooling", lv.mech, 2, 1.4, at(x, 3.2, 2), { axis: "z", seg: 22 });
    k.pipe(
      "cooling",
      lv.mech,
      [at(x, 5.2, 2), at(x, 7.9, 2), at(x, 7.9, -0.6)],
      0.7,
      14,
    );
  }
  c.flows.push({
    sys: "cooling",
    lvl: lv.mech,
    pts: [at(-32, 7.9, -4.2), at(32, 7.9, -4.2)],
  });

  /* Fire: sprinkler main with branch stubs, pre action valve set. */
  k.pipe("fire", lv.fire, [at(-32, 12.7, 5), at(32, 12.7, 5)], 0.85, 16);
  for (let x = -20; x <= 28.01; x += 8)
    k.pipe("fire", lv.fire, [at(x, 12.7, 5), at(x, 12.7, 7)], 0.35, 8);
  k.box("structure", lv.fire, [4, 0.3, 4], at(-26, 11.7, 2), e);
  k.cyl("fire", lv.fire, 1.1, 3.2, at(-26, 12, 2), { seg: 18 });
  k.box("fire", lv.fire, [2.4, 1.4, 1.2], at(-26, 12.8, 0.4));
  k.pipe(
    "fire",
    lv.fire,
    [at(-26, 14.6, 2), at(-26, 14.6, 5), at(-26, 12.7, 5)],
    0.5,
    12,
  );
  if (caps)
    for (const x of [-33, 33])
      k.cyl("process", lv.fire, 1.1, 0.9, at(x, 12.7, 5), {
        axis: "x",
        seg: 16,
      });

  /* Electrical: two tiers of cable containment, a busway section, power skid. */
  for (const y of [12.1, 14.5]) {
    k.box("power", lv.elec, [64, 0.25, 3.4], at(0, y, -4.6));
    for (const dz of [-1.7, 1.7])
      k.box("power", lv.elec, [64, 0.8, 0.15], at(0, y, -4.6 + dz), e);
    for (const dz of [-1, 0, 1])
      k.cyl("power", lv.elec, 0.3, 63, at(0, y + 0.55, -4.6 + dz), {
        axis: "x",
        seg: 10,
        edge: false,
      });
  }
  k.box("powerB", lv.elec, [44, 1.1, 1.3], at(-6, 15.4, 0.4));
  for (const x of [-22, 10])
    k.box("powerB", lv.elec, [1.6, 1.7, 1.9], at(x, 14.4, 0.4));
  for (const x of [28.2, 30.6])
    k.box("power", lv.elec, [2, 5, 2.4], at(x, 0.9, -5));

  /* Controls: panel, skid wiring, junction boxes, instruments on the valves. */
  k.box("controls", lv.ctrl, [1.4, 4.6, 4.4], at(-30.6, 0.9, 5));
  k.pipe(
    "controls",
    lv.ctrl,
    [
      at(-30.6, 5.5, 6.6),
      at(-30.6, 16.4, 6.6),
      at(-30.6, 16.4, 8.3),
      at(26, 16.4, 8.3),
    ],
    0.2,
    8,
  );
  for (const x of [-22, -6, 10, 26])
    k.box("controls", lv.ctrl, [1.4, 1.4, 0.8], at(x, 15.2, 8.5));
  P.dots(
    k,
    "controls",
    lv.ctrl,
    [2, 8, 14].flatMap((x) => headers.map((z) => at(x, 11.7, z))),
    0.5,
  );
  P.dots(
    k,
    "controls",
    lv.ctrl,
    [at(14.5, 5.2, 5), at(23.5, 5.2, 5), at(-25.6, 5.4, 3.6)],
    0.5,
  );
}

function build() {
  const c = P.newCtx();
  const { k } = c;

  k.box("site", SITE, [270, 1.2, 124], [30, -1.25, 0]);

  /* ---------- Workshop bay ---------- */
  k.box("road", SITE, [104, 0.12, 62], [AX - 4, -0.05, 0], { edge: false });
  for (const z of [-7.6, 7.6])
    k.box("structure", SITE, [72, OY - 0.1, 1.5], [AX, 0, z]);
  for (const x of [-34.6, 34.6])
    for (const z of [-7.6, 7.6])
      k.box("structure", SITE, [1.6, OY + 1.2, 2.6], [AX + x, 0, z], {
        edge: false,
      });
  moduleAt(c, BAY, AX, true);
  // Module ID tag on the south face.
  k.box("process", BAY.frame, [3.2, 2.2, 0.2], [AX + 8, OY + 8, 8.2]);
  // Pressure test rig at the west end, hosed to the header.
  k.box("process", SITE, [5, 3.4, 3.6], [AX - 44, 0, -0.6]);
  k.cyl("process", SITE, 1.1, 0.3, [AX - 44, 4.6, 1.3], { axis: "z", seg: 20 });
  k.pipe(
    "process",
    SITE,
    [
      [AX - 41.5, 2.2, -0.6],
      [AX - 36.6, 2.2, -0.6],
      [AX - 36.6, OY + 7.9, -0.6],
      [AX - 33.4, OY + 7.9, -0.6],
    ],
    0.35,
    10,
  );
  // Material racks behind the bay.
  for (let i = 0; i < 3; i++) {
    const x = AX - 26 + 26 * i;
    for (const dx of [-7, 7])
      k.box("env", SITE, [0.6, 8, 3.4], [x + dx, 0, -25], {
        edge: false,
      });
    for (const y of [1.6, 4, 6.4])
      for (const dz of [-0.9, 0.2, 1.3])
        k.cyl("fit", SITE, 0.5, 16, [x, y, -25 + dz], {
          axis: "x",
          seg: 10,
          edge: false,
        });
  }
  // Low loader waiting for the next module.
  k.box("env", SITE, [74, 1.2, 15], [AX + 6, 2.2, 24]);
  k.box("env", SITE, [9, 8, 14], [AX + 50, 0.6, 24]);
  for (const x of [-22, -14, 22, 30, 50])
    k.cyl("fit", SITE, 2, 15.4, [AX + x, 2, 24], { axis: "z", seg: 18 });

  /* ---------- Landing zone on site ---------- */
  k.box("road", SITE, [156, 0.12, 54], [BX + 40, -0.05, 0], { edge: false });
  for (const cx of [BX, CX])
    for (const x of POSTS)
      for (const z of [-7.6, 7.6])
        k.box("env", SITE, [2.6, OY, 2.6], [cx + x, 0, z], {
          edge: false,
        });
  moduleAt(c, all(SITE), CX, false);
  moduleAt(c, all(LIFTED), BX, false);
  // Tower crane over the landing zone. Drawn as shell, so it shows only
  // in the site view.
  k.box("shell", SITE, [3.4, 96, 3.4], [BX, 0, -27]);
  k.box("shell", SITE, [3, 3, 66], [BX, 93, -6]);
  k.box("shell", SITE, [5, 4, 8], [BX, 92.5, -36]);
  k.box("shell", SITE, [5, 2.2, 5], [BX, 90.6, 0]);
  k.box("shell", SITE, [1.4, 3, 1.4], [BX, 86, 0], { edge: false });

  const a = (lvl: number, at: P3): Anchor => ({ lvl, at });
  return P.finish(c, Y, 9, {
    lugs: a(BAY.frame, [AX + 32, OY + 19.4, 7.6]),
    jig: a(SITE, [AX - 10, 1.6, 8.4]),
    datum: a(SITE, [AX - 34.6, 2.9, 7.6]),
    headers: a(BAY.mech, [AX - 14, OY + 9.3, -4.2]),
    valves: a(BAY.mech, [AX + 8, OY + 11.4, -0.6]),
    pumps: a(BAY.mech, [AX + 19, OY + 5, 5]),
    trays: a(BAY.elec, [AX + 12, OY + 15.6, -4.6]),
    busway: a(BAY.elec, [AX - 12, OY + 16.6, 0.4]),
    powerskid: a(BAY.elec, [AX + 29.4, OY + 6.1, -5]),
    firemain: a(BAY.fire, [AX + 10, OY + 13.7, 5]),
    preaction: a(BAY.fire, [AX - 26, OY + 15.4, 2]),
    drain: a(BAY.plumb, [AX + 4, OY + 2.8, -5.4]),
    booster: a(BAY.plumb, [AX - 21, OY + 4.4, 3.6]),
    panel: a(BAY.ctrl, [AX - 30.6, OY + 5.7, 5]),
    jbox: a(BAY.ctrl, [AX + 10, OY + 16.8, 8.5]),
    instruments: a(BAY.ctrl, [AX + 8, OY + 12.3, -0.6]),
    testrig: a(SITE, [AX - 44, 5.2, -0.6]),
    caps: a(BAY.mech, [AX + 33.2, OY + 9.6, -4.2]),
    tag: a(BAY.frame, [AX + 8, OY + 10.4, 8.2]),
    landing: a(SITE, [BX - 20, 1.8, 8.4]),
    joint: a(SITE, [(BX + CX) / 2, OY + 9.8, -4.2]),
    neighbour: a(SITE, [CX + 6, OY + 19.6, 0]),
    crane: a(SITE, [BX, 91, 0]),
  });
}

const S = (at: P3): Anchor => ({ lvl: SITE, at });
/** In the workshop the second module stays out of sight, above the picture. */
const bay = { lidAbove: 5, shell: 0 } as const;
const services = {
  cooling: 1,
  power: 1,
  powerB: 1,
  fire: 1,
  water: 1,
  controls: 1,
};
const views: Record<string, BuildingView<Sys>> = {
  intro: {
    target: S([AX, 9, 0]),
    azimuth: 32,
    elevation: 19,
    distance: 300,
    explode: 0,
    ...bay,
    lit: {},
  },
  frame: {
    target: S([AX, 30, 0]),
    azimuth: 40,
    elevation: 20,
    distance: 420,
    explode: 1,
    ...bay,
    lit: { structure: 1 },
  },
  mechanical: {
    target: S([AX, 26, 0]),
    azimuth: 26,
    elevation: 17,
    distance: 330,
    explode: 1,
    ...bay,
    lit: { cooling: 1 },
  },
  electrical: {
    target: S([AX, 48, 0]),
    azimuth: -30,
    elevation: 16,
    distance: 330,
    explode: 1,
    ...bay,
    lit: { power: 1, powerB: 1 },
  },
  fire: {
    target: S([AX, 40, 0]),
    azimuth: 34,
    elevation: 18,
    distance: 330,
    explode: 1,
    ...bay,
    lit: { fire: 1 },
  },
  plumbing: {
    target: S([AX, 12, 0]),
    azimuth: -34,
    elevation: 17,
    distance: 320,
    explode: 1,
    ...bay,
    lit: { water: 1 },
  },
  controls: {
    target: S([AX, 52, 2]),
    azimuth: 24,
    elevation: 16,
    distance: 340,
    explode: 1,
    ...bay,
    lit: { controls: 1 },
  },
  gates: {
    target: S([AX - 14, 9, 0]),
    azimuth: -24,
    elevation: 18,
    distance: 290,
    explode: 0,
    ...bay,
    lit: { process: 1 },
  },
  // No lid here: the second module comes down into the landing zone.
  site: {
    target: S([(BX + CX) / 2 + 12, 13, 0]),
    azimuth: 30,
    elevation: 20,
    distance: 380,
    explode: 0,
    shell: 1,
    lit: services,
  },
};

export const PACK: ModelPack<Sys> = {
  build,
  views,
  palette: P.PALETTE,
  roles: P.ROLES,
  lidTravel: 62,
};
