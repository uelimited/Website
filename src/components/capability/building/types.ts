import type * as THREE from "three";
import type { P3 } from "./kit";

/** A point in the model: a level and a position on that level's floor. */
export type Anchor = { lvl: number; at: P3 };

export type BuildingModel<S extends string> = {
  /** Floor height of each level when the floors sit together. */
  levelY: number[];
  /** Level index for everything that stands on the plot. It never lifts. */
  siteLevel: number;
  /** Extra space opened between two floors when the building is pulled apart. */
  gap: number;
  parts: {
    sys: S;
    lvl: number;
    solid: THREE.BufferGeometry | null;
    outline: THREE.BufferGeometry | null;
  }[];
  /** Vertical runs that stretch as the floors separate. */
  risers: {
    sys: S;
    x: number;
    z: number;
    r: number;
    from: { lvl: number; y: number };
    to: { lvl: number; y: number };
  }[];
  /** Routes that carry moving pulses when their system is lit. */
  flows: { sys: S; lvl: number; pts: P3[] }[];
  /** Named points that callout labels attach to. */
  anchors: Record<string, Anchor>;
};

/** One stop of the camera. Scrolling moves from one view to the next. */
export type BuildingView<S extends string> = {
  /** What the camera looks at. */
  target: Anchor;
  /** Compass angle of the camera around the target, in degrees. 0 is due south. */
  azimuth: number;
  /** Height angle of the camera above the horizon, in degrees. */
  elevation: number;
  /** Distance from the target, in metres. */
  distance: number;
  /** 0 keeps the floors together, 1 pulls them fully apart. */
  explode: number;
  /** Lifts every level above this one clear of the picture, like a lid. */
  lidAbove?: number;
  /** Opacity of the outer walls. */
  shell: number;
  /** Walls below this level stay solid. Defaults to 0: all walls follow `shell`. */
  shellFrom?: number;
  /** Opacity of the racks. */
  racks?: number;
  /** Systems to light, each 0 to 1. */
  lit: Partial<Record<S, number>>;
};

export type StageLabel = { anchor: string; text: string };

export type StageHandle = {
  /** Scroll position in views: 0 is the first view, 1 the second, and so on. */
  setProgress(p: number, jump?: boolean): void;
  resize(): void;
  setActive(active: boolean): void;
  /**
   * Stops the clock and draws one exact moment: scroll position p, with the
   * moving parts where they stand after the given seconds. For making films
   * and stills of the model frame by frame.
   */
  drawAt(p: number, seconds: number): void;
  /** Draws view i at once and returns it as a JPEG data URL. */
  snapshot(i: number, background: string): string;
  dispose(): void;
};

/** Everything the stage needs to show one building. */
export type ModelPack<S extends string> = {
  build(): BuildingModel<S>;
  /** Camera stops by chapter key. "intro" is the opening view. */
  views: Record<string, BuildingView<S>>;
  palette: Record<S, { base: string; lit?: string }>;
  roles: { shell: S; glass?: S; racks?: S };
  /** How far a lifted level travels. Defaults to 120: clear of the picture. */
  lidTravel?: number;
};
