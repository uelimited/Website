import { Kit, type P3 } from "./kit";
import type { BuildingModel, Anchor } from "./types";

/**
 * A generic colocation data centre, modelled from simple solids.
 *
 * Ground floor plus three data hall floors and a roof plant deck, with a
 * power yard to the east and the fire water tank to the south west. It is
 * a diagram of where each service sits, not a drawing of any one project.
 *
 * Axes: x runs east, z runs south (towards the usual camera), y is up.
 * Units are metres. Each level is built around its own floor at y = 0.
 */

export type DcSystem =
  | "site"
  | "road"
  | "shell"
  | "glass"
  | "structure"
  | "racks"
  | "cooling"
  | "white"
  | "power"
  | "powerB"
  | "fire"
  | "water"
  | "controls";

/** Floor level of ground, L1, L2, L3 and roof. */
const LEVEL_Y = [0, 7, 14, 21, 28];
/** Index used for everything that stands on the plot, outside the building. */
const SITE = 5;
const HALLS = [1, 2, 3];

/** Hot aisle pods in each data hall: centre x of pod k. */
const POD_X = Array.from({ length: 9 }, (_, k) => -23.4 + 5.2 * k);

export function buildDataCentre(): BuildingModel<DcSystem> {
  const k = new Kit<DcSystem>();
  const risers: BuildingModel<DcSystem>["risers"] = [];
  const flows: BuildingModel<DcSystem>["flows"] = [];

  /* ---------------- Structure and shell, every floor ---------------- */
  for (let l = 0; l <= 3; l++) {
    k.box("structure", l, [72.6, 0.5, 36.6], [0, -0.5, 0]);
    // Low rim, so a floor still reads as a tray when the walls are away.
    k.box("structure", l, [72, 0.9, 0.3], [0, 0, 17.85], { edge: false });
    k.box("structure", l, [72, 0.9, 0.3], [0, 0, -17.85], { edge: false });
    k.box("structure", l, [0.3, 0.9, 35.4], [35.85, 0, 0], { edge: false });
    k.box("structure", l, [0.3, 0.9, 35.4], [-35.85, 0, 0], { edge: false });
    // Perimeter columns.
    for (const x of [-35.4, -23.6, -11.8, 0, 11.8, 23.6, 35.4])
      for (const z of [-17.4, 17.4])
        k.box("structure", l, [0.8, 6.5, 0.8], [x, 0, z], { edge: false });
    for (const z of [-5.8, 5.8])
      for (const x of [-35.4, 35.4])
        k.box("structure", l, [0.8, 6.5, 0.8], [x, 0, z], { edge: false });
    // Stair and lift cores.
    k.box("structure", l, [6, 6.5, 6.4], [-31.6, 0, 12.6]);
    k.box("structure", l, [4.6, 6.5, 5.2], [-32.3, 0, 3.4]);

    // Outer walls.
    k.box("shell", l, [72.6, 7, 0.3], [0, 0, -18.15]);
    k.box("shell", l, [0.3, 7, 36], [36.15, 0, 0]);
    k.box("shell", l, [0.3, 7, 36], [-36.15, 0, 0]);
    if (l === 0) {
      // Entrance glazing on the south front.
      k.box("shell", l, [2.3, 7, 0.3], [-35.15, 0, 18.15]);
      k.box("glass", l, [16, 5, 0.2], [-26, 0, 18.15]);
      k.box("shell", l, [16, 2, 0.3], [-26, 5, 18.15]);
      k.box("shell", l, [54.3, 7, 0.3], [9.15, 0, 18.15]);
      k.box("structure", l, [18, 0.3, 4.4], [-26, 5, 20.5]);
    } else {
      k.box("shell", l, [72.6, 7, 0.3], [0, 0, 18.15]);
    }
    // Facade fins on the two fronts the camera sees most.
    for (let x = -34; x <= 34.01; x += 4) {
      if (l === 0 && x < -17) continue;
      k.box("shell", l, [0.28, 6.4, 0.45], [x, 0.3, 18.5], { edge: false });
    }
    for (let z = -16; z <= 16.01; z += 4)
      k.box("shell", l, [0.45, 6.4, 0.28], [36.5, 0.3, z], { edge: false });
  }

  /* ---------------- Data hall floors ---------------- */
  for (const l of HALLS) {
    // Cut partitions.
    k.box("structure", l, [0.25, 1.1, 35.4], [22.7, 0, 0], { edge: false });
    k.box("structure", l, [0.25, 1.1, 35.4], [-27.1, 0, 0], { edge: false });
    k.box("structure", l, [49.6, 1.1, 0.25], [-2.2, 0, 12.75], { edge: false });
    k.box("structure", l, [13, 1.1, 0.25], [29.3, 0, -1.4], { edge: false });
    k.box("structure", l, [13, 1.1, 0.25], [29.3, 0, 9.8], { edge: false });

    // Raised floor of the white space, with a tile grid.
    k.box("structure", l, [49.4, 0.6, 24.5], [-2.2, 0, 0.25]);
    const grid: [P3, P3][] = [];
    for (let x = -26.9; x <= 22.5; x += 2.4)
      grid.push([
        [x, 0.62, -12],
        [x, 0.62, 12.5],
      ]);
    for (let z = -12; z <= 12.5; z += 2.4)
      grid.push([
        [-26.9, 0.62, z],
        [22.5, 0.62, z],
      ]);
    k.lines("structure", l, grid);

    // Racks, in pods of two rows around a contained hot aisle.
    for (const x0 of POD_X) {
      for (const dx of [-1.25, 1.25])
        for (let j = 0; j < 16; j++)
          k.box(
            "racks",
            l,
            [1.1, 2.3, 1.2],
            [x0 + dx, 0.6, -9.375 + 1.25 * j],
            {
              edge: false,
            },
          );
      k.box("white", l, [1.4, 0.08, 20.3], [x0, 2.95, 0]);
      k.box("white", l, [1.4, 2.35, 0.1], [x0, 0.6, 10.1], { edge: false });
      k.box("white", l, [1.4, 2.35, 0.1], [x0, 0.6, -10.1], { edge: false });
    }

    // Fan wall units along the north gallery, each on a plinth.
    for (const x0 of POD_X) {
      k.box("structure", l, [4.1, 0.3, 1.7], [x0, 0, -13.2], { edge: false });
      k.box("white", l, [3.8, 4.1, 1.3], [x0, 0.3, -13.2]);
      for (const dx of [-0.95, 0.95])
        for (const y of [1.45, 3.3])
          k.cyl("white", l, 0.72, 0.1, [x0 + dx, y, -12.52], { axis: "z" });
    }

    // Chilled water headers in the gallery, with a branch to every unit.
    k.pipe(
      "cooling",
      l,
      [
        [-31, 5.2, -16.3],
        [20.6, 5.2, -16.3],
      ],
      0.27,
    );
    k.pipe(
      "cooling",
      l,
      [
        [-31, 5.2, -15.4],
        [20.6, 5.2, -15.4],
      ],
      0.27,
    );
    for (const x0 of POD_X) {
      k.pipe(
        "cooling",
        l,
        [
          [x0 - 0.8, 5.2, -16.3],
          [x0 - 0.8, 5.2, -13.5],
          [x0 - 0.8, 4.4, -13.5],
        ],
        0.12,
      );
      k.pipe(
        "cooling",
        l,
        [
          [x0 + 0.8, 5.2, -15.4],
          [x0 + 0.8, 5.2, -13.5],
          [x0 + 0.8, 4.4, -13.5],
        ],
        0.12,
      );
    }
    flows.push({
      sys: "cooling",
      lvl: l,
      pts: [
        [-31, 5.2, -16.3],
        [20.6, 5.2, -16.3],
      ],
    });

    // Liquid cooling: a CDU at the end of each pod and a manifold per row.
    k.pipe(
      "white",
      l,
      [
        [-24.8, 3.35, 11.9],
        [19.6, 3.35, 11.9],
      ],
      0.13,
    );
    for (const x0 of POD_X) {
      k.box("white", l, [1.3, 2.1, 0.9], [x0, 0.6, 11.15]);
      k.pipe(
        "white",
        l,
        [
          [x0, 2.7, 11.15],
          [x0, 3.35, 11.15],
          [x0, 3.35, 11.9],
        ],
        0.09,
      );
      k.pipe(
        "white",
        l,
        [
          [x0 - 1.25, 3.0, -9.9],
          [x0 - 1.25, 3.0, 10.55],
          [x0 + 1.25, 3.0, 10.55],
          [x0 + 1.25, 3.0, -9.9],
        ],
        0.07,
        8,
      );
    }
    // Precision units for the electrical rooms.
    k.box("white", l, [0.9, 2, 1.9], [35.1, 0, -15.6]);
    k.box("white", l, [0.9, 2, 1.9], [35.1, 0, 7.4]);

    // UPS line ups (A and B), LT panels and battery racks.
    for (let i = 0; i < 7; i++) {
      k.box("power", l, [1.2, 2.1, 0.9], [24.9 + 1.3 * i, 0, -13.4]);
      k.box("powerB", l, [1.2, 2.1, 0.9], [24.9 + 1.3 * i, 0, -7.4]);
    }
    for (let i = 0; i < 9; i++)
      k.box("power", l, [0.8, 2.2, 1.1], [35.05, 0, -12.6 + 1.2 * i]);
    for (let r = 0; r < 4; r++)
      k.box("power", l, [8.6, 1.9, 0.75], [29.2, 0, 1.0 + 2.1 * r]);

    // Bus duct trunks across the hall, A and B, with a run to every row.
    k.box("power", l, [48.1, 0.28, 0.42], [-1.65, 3.55, -5.4]);
    k.box("powerB", l, [50.1, 0.28, 0.42], [-0.65, 3.55, 5.4]);
    k.box("power", l, [0.42, 0.28, 8.4], [22.6, 3.55, -9.4], { edge: false });
    k.box("power", l, [2.6, 0.28, 0.42], [23.9, 3.55, -13.4], { edge: false });
    k.box("power", l, [0.42, 1.25, 0.42], [24.9, 2.3, -13.4], { edge: false });
    k.box("powerB", l, [0.42, 0.28, 13.2], [24.6, 3.55, -1.0], { edge: false });
    k.box("powerB", l, [0.42, 1.25, 0.42], [24.6, 2.3, -7.4], { edge: false });
    for (const x0 of POD_X)
      for (const dx of [-1.25, 1.25]) {
        k.box("power", l, [0.16, 0.12, 19.6], [x0 + dx - 0.32, 3.18, 0], {
          edge: false,
        });
        k.box("powerB", l, [0.16, 0.12, 19.6], [x0 + dx + 0.32, 3.18, 0], {
          edge: false,
        });
        k.box("power", l, [0.2, 0.3, 0.42], [x0 + dx - 0.32, 3.27, -5.4], {
          edge: false,
        });
        k.box("powerB", l, [0.2, 0.3, 0.42], [x0 + dx + 0.32, 3.27, 5.4], {
          edge: false,
        });
      }
    k.pipe(
      "power",
      l,
      [
        [31, 3.55, -17.1],
        [31, 3.55, -13.4],
        [31, 2.2, -13.4],
      ],
      0.16,
    );
    k.pipe(
      "powerB",
      l,
      [
        [33, 3.55, -17.1],
        [33, 3.55, -7.4],
        [33, 2.2, -7.4],
      ],
      0.16,
    );
    flows.push({
      sys: "power",
      lvl: l,
      pts: [
        [22.4, 3.55, -5.4],
        [-25.6, 3.55, -5.4],
      ],
    });
    flows.push({
      sys: "powerB",
      lvl: l,
      pts: [
        [24.4, 3.55, 5.4],
        [-25.6, 3.55, 5.4],
      ],
    });

    // Sprinkler main and branches, and smoke sampling pipes.
    k.pipe(
      "fire",
      l,
      [
        [-28.2, 5.9, -4],
        [-28.2, 5.9, 0.6],
        [20.9, 5.9, 0.6],
      ],
      0.22,
    );
    for (let i = 0; i < 17; i++)
      k.pipe(
        "fire",
        l,
        [
          [-23.4 + 2.6 * i, 5.9, -11.2],
          [-23.4 + 2.6 * i, 5.9, 11.8],
        ],
        0.1,
        8,
      );
    k.pipe(
      "fire",
      l,
      [
        [-26.5, 5.1, -9],
        [-26.5, 5.1, 9],
      ],
      0.07,
      8,
    );
    for (let i = 0; i < 4; i++) {
      const z = -9 + 6 * i;
      k.pipe(
        "fire",
        l,
        [
          [-26.5, 5.1, z],
          [21.4, 5.1, z],
        ],
        0.05,
        6,
      );
    }
    k.box("fire", l, [0.3, 0.7, 0.6], [-26.8, 3.4, -9]);
    flows.push({
      sys: "fire",
      lvl: l,
      pts: [
        [-28.2, 5.9, 0.6],
        [20.9, 5.9, 0.6],
      ],
    });

    // Clean agent bank for the electrical rooms.
    for (let i = 0; i < 8; i++)
      k.cyl("fire", l, 0.28, 1.7, [24.6 + 0.8 * i, 0, 16.7], { seg: 14 });
    k.pipe(
      "fire",
      l,
      [
        [24.6, 2.0, 16.7],
        [31.6, 2.0, 16.7],
        [31.6, 5.7, 16.7],
        [31.6, 5.7, -15.5],
      ],
      0.08,
      8,
    );

    // Sensors at both ends of every pod, on a backbone in the corridor.
    k.pipe(
      "controls",
      l,
      [
        [-27.6, 4.7, 12.95],
        [22.2, 4.7, 12.95],
      ],
      0.08,
      8,
    );
    for (const x0 of POD_X) {
      k.ball("controls", l, 0.26, [x0, 3.55, 10.9]);
      k.ball("controls", l, 0.26, [x0, 3.55, -10.9]);
      k.ball("controls", l, 0.22, [x0, 4.75, -13.2]);
      k.pipe(
        "controls",
        l,
        [
          [x0, 4.7, 12.95],
          [x0, 4.7, 10.9],
          [x0, 3.55, 10.9],
        ],
        0.04,
        6,
      );
    }
    k.box("controls", l, [0.35, 1.9, 1.0], [-26.75, 0.6, -6]);
    k.box("controls", l, [1.0, 1.9, 0.35], [21.4, 0, -16.9]);
    k.box("controls", l, [0.35, 1.9, 1.0], [23.2, 0, 13.6]);
    // Leak detection cable along the fan wall.
    k.pipe(
      "controls",
      l,
      [
        [-26.4, 0.68, -12.2],
        [22.2, 0.68, -12.2],
      ],
      0.06,
      6,
    );
    flows.push({
      sys: "controls",
      lvl: l,
      pts: [
        [-27.6, 4.7, 12.95],
        [22.2, 4.7, 12.95],
      ],
    });
  }

  /* ---------------- Ground floor ---------------- */
  {
    const l = 0;
    // Cut partitions: control room, lobby, main switch rooms.
    k.box("structure", l, [0.25, 1.1, 10.2], [-18.2, 0, 12.75], {
      edge: false,
    });
    k.box("structure", l, [0.25, 1.1, 10.2], [2.4, 0, 12.75], { edge: false });
    k.box("structure", l, [20.6, 1.1, 0.25], [-7.9, 0, 7.65], { edge: false });
    k.box("structure", l, [0.25, 1.1, 35.4], [13.2, 0, 0], { edge: false });
    k.box("structure", l, [0.25, 1.1, 14], [-27.1, 0, -10.8], { edge: false });

    // Control room: video wall, operator desks, BMS and EPMS servers.
    k.box("controls", l, [16, 3.3, 0.3], [-7.9, 1.1, 8.1]);
    for (const z of [11.4, 14.5])
      for (let i = 0; i < 4; i++) {
        const x = -14 + 4.1 * i;
        k.box("site", l, [3.3, 0.78, 1.0], [x, 0, z]);
        for (const dx of [-0.9, 0.9])
          k.box("controls", l, [1.3, 0.55, 0.07], [x + dx, 0.95, z - 0.25], {
            edge: false,
          });
      }
    for (let i = 0; i < 4; i++)
      k.box("controls", l, [0.7, 2.1, 0.9], [1.6, 0, 9.4 + 1.1 * i]);
    // Lobby: reception and access control turnstiles.
    k.box("site", l, [5.4, 1.1, 1.3], [-23.4, 0, 15.4]);
    for (let i = 0; i < 4; i++)
      k.box("controls", l, [0.26, 1.0, 1.5], [-26 + 1.15 * i, 0, 11]);

    // Main LT switchboards (A and B), HT panels and DG synchronising panels.
    for (let i = 0; i < 14; i++) {
      k.box("power", l, [1.2, 2.3, 1.0], [16 + 1.3 * i, 0, -13.2]);
      k.box("powerB", l, [1.2, 2.3, 1.0], [16 + 1.3 * i, 0, -7.6]);
    }
    for (let i = 0; i < 10; i++)
      k.box("power", l, [1.05, 2.4, 1.4], [16.4 + 1.15 * i, 0, 3.4]);
    for (let i = 0; i < 9; i++)
      k.box("power", l, [1.0, 2.3, 0.9], [16.4 + 1.1 * i, 0, 10.4]);
    k.pipe(
      "power",
      l,
      [
        [31, 2.3, -13.2],
        [31, 3.4, -13.2],
        [31, 3.4, -17.1],
      ],
      0.16,
    );
    k.pipe(
      "powerB",
      l,
      [
        [33, 2.3, -7.6],
        [33, 3.4, -7.6],
        [33, 3.4, -17.1],
      ],
      0.16,
    );
    k.box("white", l, [0.9, 2, 1.9], [35.1, 0, -15.6]);
    k.box("white", l, [0.9, 2, 1.9], [35.1, 0, 14.6]);

    // Fire: incoming main, wet riser foot, sprinklers, alarm panel, gas bank.
    k.pipe(
      "fire",
      l,
      [
        [-36.3, 0.3, -4],
        [-28.2, 0.3, -4],
        [-28.2, 5.9, -4],
      ],
      0.2,
    );
    k.pipe(
      "fire",
      l,
      [
        [-28.2, 5.9, -4],
        [-28.2, 5.9, 0.6],
        [34.4, 5.9, 0.6],
      ],
      0.17,
    );
    for (let i = 0; i < 11; i++)
      k.pipe(
        "fire",
        l,
        [
          [-24 + 5.6 * i, 5.9, -16],
          [-24 + 5.6 * i, 5.9, 16],
        ],
        0.07,
        8,
      );
    k.box("fire", l, [0.3, 1.3, 1.0], [2.05, 1.0, 15.4]);
    for (let i = 0; i < 8; i++)
      k.cyl("fire", l, 0.28, 1.7, [27 + 0.8 * i, 0, 16.7], { seg: 14 });

    // Controls trunk from the control room to the riser.
    k.pipe(
      "controls",
      l,
      [
        [-9, 3.8, 8.4],
        [-9, 3.8, 6.8],
        [-27.6, 3.8, 6.8],
        [-27.6, 3.8, 12.95],
      ],
      0.08,
      8,
    );
  }

  /* ---------------- Roof plant deck ---------------- */
  {
    const l = 4;
    k.box("structure", l, [72.6, 0.5, 36.6], [0, -0.5, 0]);
    k.box("shell", l, [72.6, 1.3, 0.3], [0, 0, 18.15]);
    k.box("shell", l, [72.6, 1.3, 0.3], [0, 0, -18.15]);
    k.box("shell", l, [0.3, 1.3, 36], [36.15, 0, 0]);
    k.box("shell", l, [0.3, 1.3, 36], [-36.15, 0, 0]);
    k.box("structure", l, [6, 3.2, 6.4], [-31.6, 0, 12.6]);

    // Water cooled chillers, two rows of three.
    const chillerX = [-15, -3, 9];
    const chillerZ = [-9.6, -3.4];
    for (const z of chillerZ)
      for (const x of chillerX) {
        k.box("structure", l, [9.6, 0.3, 3.2], [x, 0, z], { edge: false });
        k.box("cooling", l, [9.0, 0.35, 2.6], [x, 0.3, z]);
        k.cyl("cooling", l, 0.72, 8.2, [x, 1.4, z - 0.62], { axis: "x" });
        k.cyl("cooling", l, 0.6, 8.2, [x, 1.3, z + 0.7], { axis: "x" });
        k.box("cooling", l, [3.2, 1.0, 1.5], [x - 1.2, 2.0, z]);
        k.box("controls", l, [0.9, 1.5, 0.35], [x + 3.6, 0.65, z + 1.45]);
      }
    // Chilled water headers on the north edge, and a pair to each chiller.
    for (const z of [-16.3, -15.4])
      k.pipe(
        "cooling",
        l,
        [
          [-31, 3.1, z],
          [12.4, 3.1, z],
        ],
        0.3,
      );
    for (const x of chillerX) {
      k.pipe(
        "cooling",
        l,
        [
          [x - 3.2, 3.1, -16.3],
          [x - 3.2, 3.1, -3.4],
        ],
        0.17,
      );
      k.pipe(
        "cooling",
        l,
        [
          [x + 3.2, 3.1, -15.4],
          [x + 3.2, 3.1, -3.4],
        ],
        0.17,
      );
      for (const z of chillerZ)
        for (const dx of [-3.2, 3.2])
          k.pipe(
            "cooling",
            l,
            [
              [x + dx, 3.1, z - 0.62],
              [x + dx, 2.1, z - 0.62],
            ],
            0.14,
          );
    }
    flows.push({
      sys: "cooling",
      lvl: l,
      pts: [
        [12.4, 3.1, -16.3],
        [-31, 3.1, -16.3],
      ],
    });

    // Thermal energy storage tanks.
    for (const z of [-9.4, -3.2, 3]) {
      k.box("structure", l, [5.4, 0.3, 5.4], [-28.6, 0, z], { edge: false });
      k.cyl("cooling", l, 2.4, 8.4, [-28.6, 0.3, z], { seg: 32 });
      k.pipe(
        "cooling",
        l,
        [
          [-26.2, 1.6, z],
          [-24.6, 1.6, z],
          [-24.6, 3.1, z],
        ],
        0.16,
      );
    }
    k.pipe(
      "cooling",
      l,
      [
        [-24.6, 3.1, 3],
        [-24.6, 3.1, -15.4],
      ],
      0.17,
    );

    // Cooling towers along the south edge.
    const towerX = [-17.4, -10.2, -3, 4.2, 11.4, 18.6];
    for (const x of towerX) {
      k.box("structure", l, [5.4, 0.4, 5.2], [x, 0, 11.6], { edge: false });
      k.box("cooling", l, [4.9, 3.6, 4.7], [x, 0.4, 11.6]);
      k.box("cooling", l, [5.05, 0.9, 4.85], [x, 1.0, 11.6], { edge: false });
      k.cyl("cooling", l, 1.9, 1.0, [x, 4.0, 11.6], { seg: 28, top: 1.75 });
      k.cyl("cooling", l, 0.35, 0.3, [x, 5.0, 11.6], { seg: 12, edge: false });
    }
    // Condenser water header, pump sets, and the main back to the chillers.
    for (const z of [7.9, 7.1])
      k.pipe(
        "cooling",
        l,
        [
          [-19.6, 1.2, z],
          [20.8, 1.2, z],
        ],
        0.26,
      );
    for (const x of towerX) {
      k.pipe(
        "cooling",
        l,
        [
          [x - 0.9, 1.2, 7.9],
          [x - 0.9, 1.2, 9.3],
        ],
        0.15,
      );
      k.pipe(
        "cooling",
        l,
        [
          [x + 0.9, 1.2, 7.1],
          [x + 0.9, 1.2, 9.3],
        ],
        0.15,
      );
    }
    for (let i = 0; i < 8; i++) {
      const x = -16.4 + 4.4 * i;
      k.box("structure", l, [2.6, 0.25, 1.2], [x, 0, 3.6], { edge: false });
      k.cyl("cooling", l, 0.42, 1.2, [x - 0.5, 0.75, 3.6], {
        axis: "x",
        seg: 16,
      });
      k.cyl("cooling", l, 0.55, 0.5, [x + 0.6, 0.8, 3.6], {
        axis: "x",
        seg: 16,
      });
      k.pipe(
        "cooling",
        l,
        [
          [x + 0.6, 1.2, 7.1],
          [x + 0.6, 1.2, 3.6],
        ],
        0.13,
      );
      k.pipe(
        "cooling",
        l,
        [
          [x + 0.6, 0.8, 3.0],
          [x + 0.6, 0.8, 0.2],
        ],
        0.13,
      );
    }
    k.pipe(
      "cooling",
      l,
      [
        [-19.6, 0.8, 0.2],
        [14.6, 0.8, 0.2],
      ],
      0.24,
    );
    for (const x of chillerX)
      k.pipe(
        "cooling",
        l,
        [
          [x + 2.2, 0.8, 0.2],
          [x + 2.2, 0.8, -2.2],
        ],
        0.14,
      );
    flows.push({
      sys: "cooling",
      lvl: l,
      pts: [
        [20.8, 1.2, 7.9],
        [-19.6, 1.2, 7.9],
      ],
    });
    // Plant PLC panel.
    k.box("controls", l, [2.4, 2.1, 0.5], [18.5, 0, -15.6]);
    k.ball("controls", l, 0.26, [12.4, 3.6, -16.3]);
    k.ball("controls", l, 0.26, [-19.6, 1.7, 7.9]);
  }

  /* ---------------- Plumbing and drainage ---------------- */
  {
    // Ground floor plant: water tanks and booster pumps by the west wall.
    for (const z of [-15.6, -11.6])
      k.box("water", 0, [3.4, 2.6, 3], [-33.6, 0, z]);
    for (let i = 0; i < 3; i++) {
      k.box("structure", 0, [2.6, 0.25, 1.2], [-30.2, 0, -16 + 2.4 * i], {
        edge: false,
      });
      k.cyl("water", 0, 0.42, 1.6, [-30.2, 0.75, -16 + 2.4 * i], {
        axis: "x",
        seg: 16,
      });
    }
    // Toilets between the two cores on every floor.
    for (let l = 0; l <= 3; l++)
      k.box("water", l, [3.4, 2.4, 2.4], [-33.2, 0, 7.7]);
    // Floor drainage along the south edge of each hall, with gullies.
    for (const l of HALLS) {
      const drain: P3[] = [
        [-22, 0.3, 17.2],
        [34.6, 0.3, 17.2],
        [34.6, 0.3, 10],
      ];
      k.pipe("water", l, drain, 0.13, 8);
      for (let x = -18; x <= 30.01; x += 8)
        k.cyl("water", l, 0.45, 0.14, [x, 0.3, 17.2], { seg: 14 });
      flows.push({ sys: "water", lvl: l, pts: drain });
    }
    // Roof: make up water tanks and the line to the cooling towers.
    for (const z of [9.4, 13.4]) k.box("water", 4, [4, 2.4, 3], [-32.4, 0, z]);
    const makeup: P3[] = [
      [-30.4, 0.9, 13.4],
      [-28, 0.9, 13.4],
      [-28, 0.9, 16.6],
      [24, 0.9, 16.6],
    ];
    k.pipe("water", 4, makeup, 0.16);
    flows.push({ sys: "water", lvl: 4, pts: makeup });
    risers.push({
      sys: "water",
      x: -35,
      z: 9.4,
      r: 0.2,
      from: { lvl: 0, y: 1 },
      to: { lvl: 4, y: 1.2 },
    });
    risers.push({
      sys: "water",
      x: 34.6,
      z: 10,
      r: 0.16,
      from: { lvl: 0, y: 0.6 },
      to: { lvl: 3, y: 0.3 },
    });
  }

  /* ---------------- Risers that span the floors ---------------- */
  for (const z of [-16.3, -15.4])
    risers.push({
      sys: "cooling",
      x: -31,
      z,
      r: 0.3,
      from: { lvl: 1, y: 5.2 },
      to: { lvl: 4, y: 3.1 },
    });
  risers.push({
    sys: "fire",
    x: -28.2,
    z: -4,
    r: 0.2,
    from: { lvl: 0, y: 5.9 },
    to: { lvl: 3, y: 5.9 },
  });
  risers.push({
    sys: "power",
    x: 31,
    z: -17.1,
    r: 0.3,
    from: { lvl: 0, y: 3.4 },
    to: { lvl: 3, y: 3.55 },
  });
  risers.push({
    sys: "powerB",
    x: 33,
    z: -17.1,
    r: 0.3,
    from: { lvl: 0, y: 3.4 },
    to: { lvl: 3, y: 3.55 },
  });
  risers.push({
    sys: "controls",
    x: -27.6,
    z: 12.95,
    r: 0.1,
    from: { lvl: 0, y: 3.8 },
    to: { lvl: 3, y: 4.7 },
  });

  /* ---------------- The plot ---------------- */
  {
    const l = SITE;
    k.box("site", l, [180, 1.2, 104], [10, -1.25, 2]);
    // Internal roads.
    k.box("road", l, [168, 0.05, 7], [10, -0.05, 40], { edge: false });
    k.box("road", l, [6, 0.05, 82], [40, -0.05, 2.5], { edge: false });
    k.box("road", l, [7, 0.05, 82], [90.5, -0.05, 2.5], { edge: false });
    k.box("road", l, [12, 0.05, 9], [60, -0.05, 48], { edge: false });
    // Boundary wall, with the gate on the south side.
    k.box("site", l, [127.5, 2.2, 0.25], [-13.75, -0.05, 52.6], {
      edge: false,
    });
    k.box("site", l, [30, 2.2, 0.25], [83, -0.05, 52.6], { edge: false });
    k.box("site", l, [0.25, 2.2, 101], [98, -0.05, 2.2], { edge: false });
    k.box("site", l, [0.25, 2.2, 101], [-77.5, -0.05, 2.2], { edge: false });
    k.box("site", l, [175.5, 2.2, 0.25], [10.25, -0.05, -48.2], {
      edge: false,
    });
    // Gate house, boom barrier and bollards.
    k.box("site", l, [5.5, 3.3, 4.2], [70, 0, 49.4]);
    k.box("controls", l, [0.5, 1.2, 0.5], [66.4, 0, 51]);
    k.box("controls", l, [11, 0.16, 0.16], [60.6, 1.0, 51], { edge: false });
    // Yard paving.
    k.box("site", l, [42, 0.12, 60], [65.5, -0.05, -6.5]);

    // Diesel generators, eight sets in acoustic enclosures.
    const dgZ = [-30, -23.5, -17, -10.5];
    const dgX = [53.5, 68];
    for (const z of dgZ)
      for (const x of dgX) {
        k.box("structure", l, [11.4, 0.45, 3.6], [x, 0.07, z]);
        k.box("power", l, [10.4, 3.0, 2.8], [x, 0.52, z]);
        k.box("power", l, [0.25, 2.3, 2.3], [x - 5.3, 0.85, z], {
          edge: false,
        });
        k.cyl("power", l, 0.5, 3.2, [x + 1.4, 4.05, z], { axis: "x", seg: 16 });
        k.cyl("power", l, 0.3, 5.2, [x + 4.2, 3.5, z], { seg: 14 });
      }
    // Bulk HSD tanks in a bund.
    for (const z of [-28.5, -22.5]) {
      k.cyl("power", l, 1.5, 8.6, [80.6, 2.05, z], { axis: "x", seg: 24 });
      for (const dx of [-2.6, 2.6])
        k.box("structure", l, [0.5, 0.75, 2.6], [80.6 + dx, 0.07, z], {
          edge: false,
        });
    }
    k.box("structure", l, [11.6, 0.9, 0.3], [80.6, 0.07, -31.8], {
      edge: false,
    });
    k.box("structure", l, [11.6, 0.9, 0.3], [80.6, 0.07, -19.2], {
      edge: false,
    });
    k.box("structure", l, [0.3, 0.9, 12.9], [86.25, 0.07, -25.5], {
      edge: false,
    });
    k.box("structure", l, [0.3, 0.9, 12.9], [74.95, 0.07, -25.5], {
      edge: false,
    });
    // Fuel main from the tanks to the generator day tanks.
    k.pipe(
      "power",
      l,
      [
        [76.3, 1.1, -25.5],
        [74.3, 1.1, -25.5],
        [74.3, 0.5, -25.5],
      ],
      0.1,
      8,
    );
    k.pipe(
      "power",
      l,
      [
        [74.3, 0.5, -30],
        [74.3, 0.5, -10.5],
      ],
      0.1,
      8,
    );
    for (const z of dgZ)
      k.pipe(
        "power",
        l,
        [
          [74.3, 0.5, z],
          [73.2, 0.5, z],
        ],
        0.08,
        8,
      );

    // Transformers with blast walls, and the HT substation with its gantry.
    const txX = [50, 57.5, 65, 72.5];
    for (const x of txX) {
      k.box("structure", l, [4.6, 0.5, 5], [x, 0.07, 4.2]);
      k.box("power", l, [3.0, 2.7, 2.1], [x, 0.57, 4.2]);
      for (const dz of [-1.5, 1.5])
        k.box("power", l, [2.5, 2.1, 0.55], [x, 0.9, 4.2 + dz]);
      k.cyl("power", l, 0.42, 2.5, [x, 3.9, 4.2], { axis: "x", seg: 14 });
      for (const dx of [-0.8, 0, 0.8])
        k.cyl("power", l, 0.13, 0.9, [x + dx, 3.27, 3.6], {
          seg: 8,
          edge: false,
        });
    }
    for (const x of [53.75, 61.25, 68.75])
      k.box("structure", l, [0.35, 4.4, 6], [x, 0.07, 4.2]);
    k.box("power", l, [20, 5.6, 7.5], [61, 0.07, 16]);
    k.box("power", l, [20.6, 0.3, 8.1], [61, 5.67, 16], { edge: false });
    for (const z of [12.6, 19.4])
      k.cyl("power", l, 0.22, 9.2, [77, 0.07, z], { seg: 10, edge: false });
    k.box("power", l, [0.45, 0.45, 7.6], [77, 8.9, 16], { edge: false });
    for (const z of [13.8, 16, 18.2])
      k.cyl("power", l, 0.16, 1.1, [77, 7.8, z], { seg: 8, edge: false });

    // Cable trenches (civil) carrying the feeders (power) into the building.
    const trench: [P3, P3][] = [
      [
        [46.2, 0, -31.5],
        [46.2, 0, 9.4],
      ],
      [
        [36.4, 0, 9.4],
        [73.4, 0, 9.4],
      ],
      [
        [60.75, 0, -31.5],
        [60.75, 0, -7.2],
      ],
      [
        [46.2, 0, -7.2],
        [60.75, 0, -7.2],
      ],
    ];
    for (const [a, b] of trench) {
      const dx = Math.abs(b[0] - a[0]);
      const dz = Math.abs(b[2] - a[2]);
      const at: P3 = [(a[0] + b[0]) / 2, 0.02, (a[2] + b[2]) / 2];
      k.box("structure", l, [dx + 1.7, 0.16, dz + 1.7], at);
      k.box("power", l, [dx + 0.5, 0.1, dz + 0.5], [at[0], 0.18, at[2]], {
        edge: false,
      });
    }
    for (const z of dgZ) {
      k.box("structure", l, [2.6, 0.16, 1.5], [47.7, 0.02, z], { edge: false });
      k.box("power", l, [2.6, 0.1, 0.5], [47.7, 0.18, z], { edge: false });
      k.box("structure", l, [1.9, 0.16, 1.5], [62, 0.02, z], { edge: false });
      k.box("power", l, [1.9, 0.1, 0.5], [62, 0.18, z], { edge: false });
    }
    for (const x of txX) {
      k.box("structure", l, [1.5, 0.16, 3.4], [x, 0.02, 7.9], { edge: false });
      k.box("power", l, [0.5, 0.1, 3.4], [x, 0.18, 7.9], { edge: false });
    }
    flows.push({
      sys: "power",
      lvl: l,
      pts: [
        [73.4, 0.4, 9.4],
        [36.4, 0.4, 9.4],
      ],
    });
    flows.push({
      sys: "power",
      lvl: l,
      pts: [
        [46.2, 0.4, -31.5],
        [46.2, 0.4, 9.4],
      ],
    });

    // Fire water tank, pump house, and the hydrant ring main with posts.
    k.box("structure", l, [12, 0.3, 12], [-57, 0.07, 28], { edge: false });
    k.cyl("fire", l, 5.2, 7.6, [-57, 0.37, 28], { seg: 40 });
    k.cyl("fire", l, 5.35, 0.25, [-57, 7.97, 28], { seg: 40, edge: false });
    k.box("fire", l, [9.5, 4.2, 6.6], [-44, 0.07, 28]);
    k.box("fire", l, [10.1, 0.3, 7.2], [-44, 4.27, 28], { edge: false });
    k.pipe(
      "fire",
      l,
      [
        [-51.9, 0.9, 28],
        [-48.75, 0.9, 28],
      ],
      0.25,
    );
    const ring: P3[] = [
      [-41.5, 0.28, 23.5],
      [38.4, 0.28, 23.5],
      [38.4, 0.28, -23.5],
      [-41.5, 0.28, -23.5],
      [-41.5, 0.28, 23.5],
    ];
    k.pipe("fire", l, ring, 0.2);
    k.pipe(
      "fire",
      l,
      [
        [-41.5, 0.28, 23.5],
        [-41.5, 0.28, 26],
        [-44, 0.28, 26],
      ],
      0.2,
    );
    k.pipe(
      "fire",
      l,
      [
        [-41.5, 0.28, -4],
        [-36.4, 0.28, -4],
      ],
      0.2,
    );
    const posts: [number, number][] = [];
    for (let i = 0; i <= 6; i++) {
      posts.push([-41.5 + 13.3 * i, 23.5]);
      posts.push([-41.5 + 13.3 * i, -23.5]);
    }
    for (const z of [-11.75, 0, 11.75]) {
      posts.push([38.4, z]);
      posts.push([-41.5, z]);
    }
    for (const [x, z] of posts) {
      k.cyl("fire", l, 0.2, 1.25, [x, 0.07, z], { seg: 10, edge: false });
      k.cyl("fire", l, 0.3, 0.28, [x, 1.2, z], { seg: 10, edge: false });
    }
    flows.push({ sys: "fire", lvl: l, pts: ring });

    // Water: treatment plant, storage tanks, rainwater harvesting pits.
    k.box("water", l, [10, 3, 6], [-60, 0.07, -22]);
    k.box("water", l, [10.6, 0.3, 6.6], [-60, 3.07, -22], { edge: false });
    for (const x of [-63, -57]) {
      k.box("structure", l, [5.2, 0.3, 5.2], [x, 0.07, -33], { edge: false });
      k.cyl("water", l, 2.2, 4.6, [x, 0.37, -33], { seg: 32 });
    }
    k.box("water", l, [12, 0.5, 8], [-61, 0.07, -8]);
    for (const z of [-38, -20, -2, 14])
      k.cyl("water", l, 1.3, 0.4, [-71.5, 0.07, z], { seg: 20 });
    const wmain: P3[] = [
      [-55, 0.3, -22],
      [-46, 0.3, -22],
      [-46, 0.3, -13.6],
      [-36.4, 0.3, -13.6],
    ];
    k.pipe("water", l, wmain, 0.22);
    flows.push({ sys: "water", lvl: l, pts: wmain });

    // CCTV poles around the boundary.
    const poles: [number, number][] = [
      [-74, 49.5],
      [-30, 49.5],
      [14, 49.5],
      [51, 49.5],
      [94.5, 49.5],
      [94.5, 10],
      [94.5, -44],
      [-74, -44],
      [10, -44],
    ];
    for (const [x, z] of poles) {
      k.cyl("controls", l, 0.14, 7, [x, 0, z], { seg: 8, edge: false });
      k.box("controls", l, [0.7, 0.3, 0.3], [x, 6.7, z + 0.3], { edge: false });
    }
  }

  const anchors: Record<string, Anchor> = {
    chillers: { lvl: 4, at: [-3, 3.3, -9.6] },
    towers: { lvl: 4, at: [18.6, 5.4, 11.6] },
    storage: { lvl: 4, at: [-28.6, 8.9, -3.2] },
    pumps: { lvl: 4, at: [-16.4, 1.4, 3.6] },
    headers: { lvl: 4, at: [-12, 3.5, -16.3] },
    fanwall: { lvl: 3, at: [7.8, 4.5, -13.2] },
    containment: { lvl: 3, at: [-7.8, 3.1, 2] },
    cdu: { lvl: 3, at: [18.2, 2.8, 11.15] },
    chw: { lvl: 3, at: [-18, 5.5, -16.3] },
    substation: { lvl: SITE, at: [68, 6.2, 16] },
    transformers: { lvl: SITE, at: [50, 4.6, 4.2] },
    generators: { lvl: SITE, at: [53.5, 4, -30] },
    fuel: { lvl: SITE, at: [80.6, 3.8, -28.5] },
    ups: { lvl: 3, at: [29, 2.4, -10.4] },
    battery: { lvl: 2, at: [29.2, 2.1, 4.2] },
    busduct: { lvl: 3, at: [-7.8, 3.9, 5.4] },
    switchboards: { lvl: 0, at: [24, 2.6, -10.4] },
    tank: { lvl: SITE, at: [-57, 8.4, 28] },
    pumphouse: { lvl: SITE, at: [-44, 4.8, 28] },
    hydrants: { lvl: SITE, at: [11.7, 1.6, 23.5] },
    sprinklers: { lvl: 3, at: [5, 6.1, 0.6] },
    sampling: { lvl: 2, at: [-10, 5.2, 9] },
    cleanagent: { lvl: 1, at: [27.4, 1.9, 16.7] },
    controlroom: { lvl: 0, at: [-2, 4.6, 8.1] },
    sensors: { lvl: 2, at: [13, 3.8, 10.9] },
    plantplc: { lvl: 4, at: [18.5, 2.3, -15.6] },
    access: { lvl: 0, at: [-26, 1.2, 11] },
    cctv: { lvl: SITE, at: [51, 7.2, 49.5] },
    raisedfloor: { lvl: 3, at: [-12, 0.7, 11] },
    plinths: { lvl: SITE, at: [53.5, 0.6, -30] },
    trenches: { lvl: SITE, at: [46.2, 0.3, -2] },
    partitions: { lvl: 1, at: [22.7, 1.2, 14] },
    cores: { lvl: 2, at: [-31.6, 6.6, 12.6] },
    makeup: { lvl: 4, at: [-32.4, 2.6, 11.4] },
    drains: { lvl: 2, at: [14, 0.5, 17.2] },
    treatment: { lvl: SITE, at: [-60, 3.5, -22] },
    rainwater: { lvl: SITE, at: [-71.5, 0.7, -2] },
    watertanks: { lvl: SITE, at: [-60, 5.1, -33] },
  };

  return {
    levelY: LEVEL_Y,
    siteLevel: SITE,
    gap: 10,
    parts: k.build(),
    risers,
    flows,
    anchors,
  };
}
