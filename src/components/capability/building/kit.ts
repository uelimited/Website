import * as THREE from "three";
import { mergeGeometries } from "three/addons/utils/BufferGeometryUtils.js";

export type P3 = [number, number, number];

type Opts = { edge?: boolean };

/**
 * Collects simple solids (boxes, cylinders, pipes, balls) and merges them
 * into one mesh and one set of outline lines per system and level, so a
 * whole building costs a few dozen draw calls.
 *
 * Coordinates are local to the level. For boxes and upright cylinders the
 * position is the centre of the base. For cylinders lying on x or z it is
 * the centre of the cylinder.
 */
export class Kit<S extends string> {
  private solids = new Map<string, THREE.BufferGeometry[]>();
  private outlines = new Map<string, THREE.BufferGeometry[]>();

  private add(
    sys: S,
    lvl: number,
    g: THREE.BufferGeometry,
    edge: boolean,
    angle = 30,
  ) {
    const key = `${sys}|${lvl}`;
    if (edge) {
      const e = new THREE.EdgesGeometry(g, angle);
      const list = this.outlines.get(key) ?? [];
      list.push(e);
      this.outlines.set(key, list);
    }
    const list = this.solids.get(key) ?? [];
    list.push(g);
    this.solids.set(key, list);
  }

  box(sys: S, lvl: number, size: P3, at: P3, o: Opts = {}) {
    const g = new THREE.BoxGeometry(size[0], size[1], size[2]);
    g.translate(at[0], at[1] + size[1] / 2, at[2]);
    this.add(sys, lvl, g, o.edge ?? true);
  }

  cyl(
    sys: S,
    lvl: number,
    r: number,
    h: number,
    at: P3,
    o: Opts & { axis?: "x" | "y" | "z"; seg?: number; top?: number } = {},
  ) {
    const g = new THREE.CylinderGeometry(o.top ?? r, r, h, o.seg ?? 24);
    const axis = o.axis ?? "y";
    if (axis === "y") g.translate(at[0], at[1] + h / 2, at[2]);
    else {
      if (axis === "x") g.rotateZ(Math.PI / 2);
      else g.rotateX(Math.PI / 2);
      g.translate(at[0], at[1], at[2]);
    }
    this.add(sys, lvl, g, o.edge ?? true, 40);
  }

  ball(sys: S, lvl: number, r: number, at: P3, seg = 12) {
    const g = new THREE.SphereGeometry(r, seg, Math.max(6, seg - 4));
    g.translate(at[0], at[1], at[2]);
    this.add(sys, lvl, g, false);
  }

  /** A run of round pipe through the points, with closed elbows. */
  pipe(sys: S, lvl: number, pts: P3[], r: number, seg = 10) {
    const up = new THREE.Vector3(0, 1, 0);
    for (let i = 0; i < pts.length - 1; i++) {
      const a = new THREE.Vector3(...pts[i]);
      const b = new THREE.Vector3(...pts[i + 1]);
      const dir = b.clone().sub(a);
      const len = dir.length();
      if (len < 1e-4) continue;
      const g = new THREE.CylinderGeometry(r, r, len, seg, 1, true);
      const q = new THREE.Quaternion().setFromUnitVectors(up, dir.normalize());
      g.applyQuaternion(q);
      const mid = a.add(b).multiplyScalar(0.5);
      g.translate(mid.x, mid.y, mid.z);
      // An open tube has no index for caps, so match the indexed solids.
      this.add(sys, lvl, g, false);
      if (i > 0) this.ball(sys, lvl, r, pts[i], 8);
    }
  }

  /** Loose line segments, for floor grids and similar. */
  lines(sys: S, lvl: number, segments: [P3, P3][]) {
    const pos = new Float32Array(segments.length * 6);
    segments.forEach(([a, b], i) => {
      pos.set(a, i * 6);
      pos.set(b, i * 6 + 3);
    });
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    const key = `${sys}|${lvl}`;
    const list = this.outlines.get(key) ?? [];
    list.push(g);
    this.outlines.set(key, list);
  }

  build(): {
    sys: S;
    lvl: number;
    solid: THREE.BufferGeometry | null;
    outline: THREE.BufferGeometry | null;
  }[] {
    const keys = new Set([...this.solids.keys(), ...this.outlines.keys()]);
    const out = [];
    for (const key of keys) {
      const [sys, lvl] = key.split("|");
      const s = this.solids.get(key);
      const l = this.outlines.get(key);
      const solid = s?.length ? mergeGeometries(s, false) : null;
      const outline = l?.length ? mergeGeometries(l, false) : null;
      s?.forEach((g) => g.dispose());
      l?.forEach((g) => g.dispose());
      out.push({ sys: sys as S, lvl: Number(lvl), solid, outline });
    }
    return out;
  }
}
