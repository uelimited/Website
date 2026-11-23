import * as THREE from "three";
import type { P3 } from "./kit";
import type {
  Anchor,
  BuildingModel,
  BuildingView,
  StageHandle,
  StageLabel,
} from "./types";

export type StagePalette<S extends string> = Record<
  S,
  {
    /** Colour at rest. */
    base: string;
    /** Colour when the system is lit. Defaults to the accent. */
    lit?: string;
  }
>;

type Options<S extends string> = {
  canvas: HTMLCanvasElement;
  model: BuildingModel<S>;
  views: BuildingView<S>[];
  palette: StagePalette<S>;
  /** Systems drawn see through: the outer walls, the glazing and the racks. */
  roles: { shell: S; glass?: S; racks?: S };
  /** How far a lifted lid travels, in metres. */
  lidTravel?: number;
  labels: StageLabel[][];
  labelEls: (HTMLElement | null)[][];
  /** How far to move the picture off centre, as a share of the canvas. */
  shift: () => { x: number; y: number };
};

const ACCENT = "#3b6fe0";
const EDGE = "#a3aab6";
const EDGE_LIT = "#1e40af";

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const smooth = (t: number) => t * t * t * (t * (t * 6 - 15) + 10);
const mix = (a: number, b: number, t: number) => a + (b - a) * t;
const rad = (d: number) => (d * Math.PI) / 180;

export function createStage<S extends string>(o: Options<S>): StageHandle {
  const { canvas, model, views, palette, roles } = o;
  const systems = Object.keys(palette) as S[];

  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
    powerPreference: "high-performance",
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFShadowMap;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(22, 1, 30, 1400);

  scene.add(new THREE.HemisphereLight(0xffffff, 0xc6cfde, 1.95));
  const sun = new THREE.DirectionalLight(0xffffff, 2.3);
  sun.position.set(-95, 170, 110);
  sun.castShadow = true;
  // Phones get a lighter shadow map.
  const mapSize = window.innerWidth < 700 ? 1024 : 2048;
  sun.shadow.mapSize.set(mapSize, mapSize);
  sun.shadow.camera.left = -150;
  sun.shadow.camera.right = 150;
  sun.shadow.camera.top = 150;
  sun.shadow.camera.bottom = -150;
  sun.shadow.camera.near = 20;
  sun.shadow.camera.far = 520;
  sun.shadow.bias = -0.0004;
  sun.shadow.normalBias = 0.35;
  sun.shadow.radius = 3.5;
  sun.shadow.blurSamples = 16;
  scene.add(sun, sun.target);
  const fill = new THREE.DirectionalLight(0xffffff, 0.45);
  fill.position.set(130, 60, -60);
  scene.add(fill);

  // A soft shadow under the plot, so the model sits on the page.
  const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(900, 900),
    new THREE.ShadowMaterial({ opacity: 0.1 }),
  );
  floor.rotation.x = -Math.PI / 2;
  floor.position.y = -1.3;
  floor.receiveShadow = true;
  scene.add(floor);

  /* ---------- Materials: one per system, shared by every part ---------- */
  const seeThrough = new Set<S>(
    [roles.shell, roles.glass, roles.racks].filter(Boolean) as S[],
  );
  const base = {} as Record<S, THREE.Color>;
  const lit = {} as Record<S, THREE.Color>;
  const mats = {} as Record<S, THREE.MeshStandardMaterial>;
  const lineMats = {} as Record<S, THREE.LineBasicMaterial>;
  const edgeBase = new THREE.Color(EDGE);
  const edgeLit = new THREE.Color(EDGE_LIT);
  for (const s of systems) {
    base[s] = new THREE.Color(palette[s].base);
    lit[s] = new THREE.Color(palette[s].lit ?? ACCENT);
    mats[s] = new THREE.MeshStandardMaterial({
      color: base[s].clone(),
      roughness: 0.86,
      metalness: 0,
      transparent: seeThrough.has(s),
    });
    lineMats[s] = new THREE.LineBasicMaterial({
      color: edgeBase.clone(),
      transparent: true,
      opacity: 0.6,
    });
  }
  if (roles.glass) {
    mats[roles.glass].roughness = 0.2;
    mats[roles.glass].metalness = 0.1;
  }

  /* ---------- Levels ---------- */
  const levelCount = Math.max(...model.parts.map((p) => p.lvl)) + 1;
  const levels: THREE.Group[] = [];
  for (let i = 0; i < levelCount; i++) {
    const g = new THREE.Group();
    scene.add(g);
    levels.push(g);
  }
  // The outer walls get a material per level, so one floor can open
  // while the floors below it stay closed.
  const shells: {
    lvl: number;
    mesh?: THREE.Mesh;
    mat: THREE.MeshStandardMaterial;
    line: THREE.LineBasicMaterial;
  }[] = [];
  const solids: { lvl: number; mesh: THREE.Mesh }[] = [];
  for (const p of model.parts) {
    const isShell = p.sys === roles.shell;
    const entry = isShell
      ? { lvl: p.lvl, mat: mats[p.sys].clone(), line: lineMats[p.sys].clone() }
      : null;
    if (p.solid) {
      const m = new THREE.Mesh(p.solid, entry ? entry.mat : mats[p.sys]);
      m.castShadow = p.sys !== roles.glass;
      m.receiveShadow = true;
      levels[p.lvl].add(m);
      if (entry) (entry as (typeof shells)[number]).mesh = m;
      else solids.push({ lvl: p.lvl, mesh: m });
    }
    if (p.outline) {
      levels[p.lvl].add(
        new THREE.LineSegments(p.outline, entry ? entry.line : lineMats[p.sys]),
      );
    }
    if (entry) shells.push(entry);
  }
  const lidTravel = o.lidTravel ?? 120;
  const baseY = (lvl: number) =>
    lvl === model.siteLevel ? 0 : model.levelY[lvl];
  const lift = (lvl: number, explode: number) =>
    lvl === model.siteLevel ? 0 : lvl * model.gap * explode;
  /** Extra height of a level that has been lifted away as a lid. */
  const lid = (lvl: number) =>
    lvl !== model.siteLevel && lvl > state.lidAbove ? state.lid * lidTravel : 0;

  /* ---------- Risers ---------- */
  const risers = model.risers.map((r) => {
    const g = new THREE.CylinderGeometry(r.r, r.r, 1, 14);
    g.translate(0, 0.5, 0);
    const m = new THREE.Mesh(g, mats[r.sys]);
    m.castShadow = true;
    m.position.set(r.x, 0, r.z);
    scene.add(m);
    return { ...r, mesh: m };
  });

  /* ---------- Flow pulses ---------- */
  const flows = model.flows.map((f) => {
    const pts = f.pts.map((p) => new THREE.Vector3(...p));
    const lens = [0];
    for (let i = 1; i < pts.length; i++)
      lens.push(lens[i - 1] + pts[i].distanceTo(pts[i - 1]));
    const total = lens[lens.length - 1];
    return {
      ...f,
      pts,
      lens,
      total,
      count: Math.max(2, Math.round(total / 8)),
    };
  });
  const pulseCount = flows.reduce((n, f) => n + f.count, 0);
  const pulses = new THREE.InstancedMesh(
    new THREE.SphereGeometry(0.62, 14, 10),
    new THREE.MeshBasicMaterial({ color: 0xeaf1ff }),
    Math.max(1, pulseCount),
  );
  pulses.frustumCulled = false;
  scene.add(pulses);
  const dummy = new THREE.Object3D();

  /* ---------- Views ---------- */
  const worldOf = (a: Anchor, explode: number, out = new THREE.Vector3()) =>
    out.set(a.at[0], baseY(a.lvl) + a.at[1] + lift(a.lvl, explode), a.at[2]);
  const stops = views.map((v) => ({
    v,
    target: worldOf(v.target, v.explode),
  }));

  type State = {
    target: THREE.Vector3;
    az: number;
    el: number;
    dist: number;
    explode: number;
    lid: number;
    lidAbove: number;
    shellAt: number[];
    racks: number;
    lit: Record<S, number>;
  };
  const state: State = {
    target: new THREE.Vector3(),
    az: 0,
    el: 0,
    dist: 0,
    explode: 0,
    lid: 0,
    lidAbove: 99,
    shellAt: [],
    racks: 1,
    lit: Object.fromEntries(systems.map((s) => [s, 0])) as Record<S, number>,
  };

  function sample(p: number) {
    const n = stops.length;
    const i = clamp(Math.floor(p), 0, Math.max(0, n - 2));
    const a = stops[i];
    const b = stops[Math.min(n - 1, i + 1)];
    // Hold on each view, and travel between them in the middle of the step.
    const t = smooth(clamp((p - i - 0.16) / 0.68));
    state.target.lerpVectors(a.target, b.target, t);
    let d = b.v.azimuth - a.v.azimuth;
    d = ((((d + 180) % 360) + 360) % 360) - 180;
    state.az = a.v.azimuth + d * t;
    state.el = mix(a.v.elevation, b.v.elevation, t);
    state.dist = mix(a.v.distance, b.v.distance, t);
    state.explode = mix(a.v.explode, b.v.explode, t);
    const la = a.v.lidAbove;
    const lb = b.v.lidAbove;
    state.lid = mix(la === undefined ? 0 : 1, lb === undefined ? 0 : 1, t);
    state.lidAbove = lb ?? la ?? 99;
    for (let l = 0; l < levelCount; l++) {
      const sa = l >= (a.v.shellFrom ?? 0) ? a.v.shell : 1;
      const sb = l >= (b.v.shellFrom ?? 0) ? b.v.shell : 1;
      state.shellAt[l] = mix(sa, sb, t);
    }
    state.racks = mix(a.v.racks ?? 1, b.v.racks ?? 1, t);
    for (const s of systems)
      state.lit[s] = mix(a.v.lit[s] ?? 0, b.v.lit[s] ?? 0, t);
  }

  /* ---------- Frame ---------- */
  let goal = 0;
  let cur = 0;
  let active = false;
  let raf = 0;
  let last = 0;
  let time = 0;
  let fit = 1;
  let width = 1;
  let height = 1;
  const pointer = { x: 0, y: 0, sx: 0, sy: 0 };
  const tmp = new THREE.Vector3();

  function apply() {
    sample(cur);
    const e = state.explode;

    for (let i = 0; i < levels.length; i++) {
      const up = lid(i);
      levels[i].position.y = baseY(i) + lift(i, e) + up;
      levels[i].visible = up < lidTravel * 0.97;
    }
    for (const s of solids) s.mesh.castShadow = lid(s.lvl) < 1.5;
    for (const r of risers) {
      const y0 = baseY(r.from.lvl) + r.from.y + lift(r.from.lvl, e);
      // A riser stops at the highest level that has not been lifted away.
      const top =
        state.lid > 0.02 ? Math.min(r.to.lvl, state.lidAbove) : r.to.lvl;
      const y1 =
        top === r.to.lvl
          ? baseY(top) + r.to.y + lift(top, e)
          : baseY(top) + model.levelY[1] - model.levelY[0] + lift(top, e);
      r.mesh.position.y = y0;
      r.mesh.scale.y = Math.max(0.01, y1 - y0);
    }

    for (const s of systems) {
      const w = state.lit[s];
      mats[s].color.copy(base[s]).lerp(lit[s], w);
      mats[s].emissive.copy(lit[s]).multiplyScalar(0.16 * w);
      lineMats[s].color.copy(edgeBase).lerp(edgeLit, w);
    }
    for (const sh of shells) {
      const a = state.shellAt[sh.lvl] ?? 1;
      sh.mat.opacity = a;
      sh.mat.depthWrite = a > 0.98;
      sh.line.opacity = 0.6 * clamp(a * 5);
      if (sh.mesh) {
        sh.mesh.visible = a > 0.01;
        sh.mesh.castShadow = a > 0.6 && lid(sh.lvl) < 1.5;
      }
    }
    if (roles.glass) {
      // Glazing goes with the most open wall, so it never veils an interior.
      const a = Math.min(1, ...state.shellAt);
      mats[roles.glass].opacity = 0.4 * clamp(a * 4);
      lineMats[roles.glass].opacity = 0.6 * clamp(a * 4);
    }
    if (roles.racks) {
      mats[roles.racks].opacity = state.racks;
      mats[roles.racks].depthWrite = state.racks > 0.98;
    }

    // Pulses run along every lit route.
    let n = 0;
    for (const f of flows) {
      const w = state.lit[f.sys];
      const y = baseY(f.lvl) + lift(f.lvl, e) + lid(f.lvl);
      for (let j = 0; j < f.count; j++) {
        const s = (time * 7 + (j * f.total) / f.count) % f.total;
        let k = 1;
        while (k < f.lens.length - 1 && f.lens[k] < s) k++;
        const seg = f.lens[k] - f.lens[k - 1] || 1;
        tmp.lerpVectors(f.pts[k - 1], f.pts[k], (s - f.lens[k - 1]) / seg);
        dummy.position.set(tmp.x, tmp.y + y, tmp.z);
        dummy.scale.setScalar(w > 0.5 ? (w - 0.5) * 2 : 0.0001);
        dummy.updateMatrix();
        pulses.setMatrixAt(n++, dummy.matrix);
      }
    }
    pulses.instanceMatrix.needsUpdate = true;

    // Camera: orbit position around the target, with a little life.
    pointer.sx += (pointer.x - pointer.sx) * 0.06;
    pointer.sy += (pointer.y - pointer.sy) * 0.06;
    const az = rad(state.az + pointer.sx * 3 + Math.sin(time * 0.22) * 0.7);
    const el = rad(clamp(state.el - pointer.sy * 1.6, 8, 85));
    const dist = state.dist * fit;
    camera.position.set(
      state.target.x + dist * Math.sin(az) * Math.cos(el),
      state.target.y + dist * Math.sin(el),
      state.target.z + dist * Math.cos(az) * Math.cos(el),
    );
    camera.lookAt(state.target);
    camera.updateMatrixWorld();
  }

  function placeLabels() {
    for (let v = 0; v < o.labels.length; v++) {
      const w = clamp(1 - Math.abs(cur - v) / 0.3);
      const set = o.labels[v];
      for (let i = 0; i < set.length; i++) {
        const el = o.labelEls[v]?.[i];
        if (!el) continue;
        if (w <= 0.01) {
          if (el.style.opacity !== "0") el.style.opacity = "0";
          continue;
        }
        const a = model.anchors[set[i].anchor];
        if (!a) continue;
        worldOf(a, state.explode, tmp);
        tmp.y += lid(a.lvl);
        tmp.project(camera);
        const x = (tmp.x * 0.5 + 0.5) * width;
        const y = (-tmp.y * 0.5 + 0.5) * height;
        el.style.opacity = tmp.z < 1 ? String(smooth(w)) : "0";
        el.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`;
      }
    }
  }

  function frame(now: number) {
    raf = 0;
    const dt = Math.min(0.05, (now - last) / 1000 || 0.016);
    last = now;
    time += dt;
    cur += (goal - cur) * (1 - Math.exp(-dt * 7));
    if (Math.abs(goal - cur) < 0.0004) cur = goal;
    apply();
    renderer.render(scene, camera);
    placeLabels();
    if (active) raf = requestAnimationFrame(frame);
  }

  function resize() {
    const r = canvas.getBoundingClientRect();
    width = Math.max(1, Math.round(r.width));
    height = Math.max(1, Math.round(r.height));
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    // Narrow stages pull the camera back so the model still fits.
    fit = camera.aspect < 1.55 ? Math.pow(1.55 / camera.aspect, 0.8) : 1;
    const s = o.shift();
    camera.setViewOffset(
      width,
      height,
      -s.x * width,
      -s.y * height,
      width,
      height,
    );
    camera.updateProjectionMatrix();
    if (!active) {
      apply();
      renderer.render(scene, camera);
      placeLabels();
    }
  }

  const onPointer = (ev: PointerEvent) => {
    if (ev.pointerType === "touch") return;
    pointer.x = (ev.clientX / window.innerWidth) * 2 - 1;
    pointer.y = (ev.clientY / window.innerHeight) * 2 - 1;
  };
  window.addEventListener("pointermove", onPointer, { passive: true });

  resize();

  return {
    setProgress(p, jump) {
      goal = clamp(p, 0, views.length - 1);
      if (jump) cur = goal;
      if (!active) {
        cur = goal;
        apply();
        renderer.render(scene, camera);
        placeLabels();
      }
    },
    resize,
    setActive(on) {
      if (on === active) return;
      active = on;
      if (on && !raf) {
        last = performance.now();
        raf = requestAnimationFrame(frame);
      }
      if (!on && raf) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    },
    drawAt(p, seconds) {
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
      active = false;
      cur = goal = clamp(p, 0, views.length - 1);
      time = seconds;
      pointer.sx = pointer.sy = pointer.x = pointer.y = 0;
      apply();
      renderer.render(scene, camera);
      placeLabels();
    },
    snapshot(i, background) {
      const keep = { cur, goal, time, sx: pointer.sx, sy: pointer.sy };
      cur = goal = i;
      time = 0;
      pointer.sx = pointer.sy = pointer.x = pointer.y = 0;
      apply();
      renderer.render(scene, camera);
      const c = document.createElement("canvas");
      c.width = canvas.width;
      c.height = canvas.height;
      const ctx = c.getContext("2d")!;
      ctx.fillStyle = background;
      ctx.fillRect(0, 0, c.width, c.height);
      ctx.drawImage(canvas, 0, 0);
      cur = keep.cur;
      goal = keep.goal;
      time = keep.time;
      return c.toDataURL("image/jpeg", 0.9);
    },
    dispose() {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onPointer);
      for (const p of model.parts) {
        p.solid?.dispose();
        p.outline?.dispose();
      }
      for (const r of risers) r.mesh.geometry.dispose();
      pulses.geometry.dispose();
      (pulses.material as THREE.Material).dispose();
      floor.geometry.dispose();
      (floor.material as THREE.Material).dispose();
      for (const s of systems) {
        mats[s].dispose();
        lineMats[s].dispose();
      }
      renderer.dispose();
    },
  };
}

export type { P3 };
