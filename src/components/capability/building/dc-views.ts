import type { BuildingView } from "./types";
import type { StagePalette } from "./stage";
import type { DcSystem } from "./dc-model";

const SITE = 5;

/** Colours at rest. A lit system turns the accent blue. */
export const DC_PALETTE: StagePalette<DcSystem> = {
  site: { base: "#eef0f3" },
  road: { base: "#e2e5ea" },
  shell: { base: "#f7f8fa" },
  glass: { base: "#9db7ee" },
  structure: { base: "#e3e6eb" },
  racks: { base: "#5b6270" },
  cooling: { base: "#c4c9d2" },
  white: { base: "#c9ced6" },
  power: { base: "#c4c9d2" },
  // The second power path is navy, so A and B differ by lightness.
  powerB: { base: "#c4c9d2", lit: "#16307a" },
  fire: { base: "#c9ced6" },
  water: { base: "#c9ced6" },
  controls: { base: "#c9ced6" },
};

export const DC_ROLES = {
  shell: "shell",
  glass: "glass",
  racks: "racks",
} as const;

/**
 * Camera stops for the data centre model, by chapter key. "intro" is the
 * opening view. A chapter in the page content picks its view by key.
 */
export const DC_VIEWS: Record<string, BuildingView<DcSystem>> = {
  intro: {
    target: { lvl: SITE, at: [8, 6, 4] },
    azimuth: 36,
    elevation: 30,
    distance: 440,
    explode: 0,
    shell: 1,
    lit: {},
  },
  // The roof plant, close.
  cooling: {
    target: { lvl: 4, at: [-4, 2, 0] },
    azimuth: 28,
    elevation: 46,
    distance: 205,
    explode: 0,
    shell: 1,
    lit: { cooling: 1 },
  },
  // The roof lifts away and the camera drops into the top data hall.
  white: {
    target: { lvl: 3, at: [-2, 1.5, 0] },
    azimuth: 22,
    elevation: 44,
    distance: 200,
    explode: 0,
    lidAbove: 3,
    shell: 0,
    shellFrom: 3,
    lit: { white: 1, cooling: 0.5 },
  },
  // Round to the east: the yard in front, UPS rooms and bus ducts behind.
  power: {
    target: { lvl: SITE, at: [36, 9, -2] },
    azimuth: 58,
    elevation: 34,
    distance: 330,
    explode: 0,
    lidAbove: 3,
    shell: 0,
    shellFrom: 3,
    lit: { power: 1, powerB: 1 },
  },
  // The floors separate, seen from the south west past the fire water tank.
  fire: {
    target: { lvl: SITE, at: [-8, 27, 6] },
    azimuth: -30,
    elevation: 26,
    distance: 370,
    explode: 1,
    shell: 0,
    racks: 0.4,
    lit: { fire: 1 },
  },
  // From the south west again: treatment and tanks on the left, drains inside.
  plumbing: {
    target: { lvl: SITE, at: [-16, 24, -2] },
    azimuth: -42,
    elevation: 27,
    distance: 380,
    explode: 1,
    shell: 0,
    racks: 0.4,
    lit: { water: 1 },
  },
  controls: {
    target: { lvl: SITE, at: [0, 29, 4] },
    azimuth: 14,
    elevation: 22,
    distance: 350,
    explode: 0.85,
    shell: 0,
    lit: { controls: 1 },
  },
  civil: {
    target: { lvl: SITE, at: [10, 33, 0] },
    azimuth: 42,
    elevation: 27,
    distance: 390,
    explode: 1,
    shell: 0,
    racks: 0.1,
    lit: { structure: 1 },
  },
  // Closed up again, every system running.
  commissioning: {
    target: { lvl: SITE, at: [10, 8, 2] },
    azimuth: 34,
    elevation: 29,
    distance: 400,
    explode: 0,
    shell: 0.1,
    lit: {
      cooling: 1,
      white: 1,
      power: 1,
      powerB: 1,
      fire: 1,
      water: 1,
      controls: 1,
    },
  },
};
