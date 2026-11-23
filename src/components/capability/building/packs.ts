import type { ModelPack } from "./types";

/**
 * The building models, by the name a page uses in its `building` block.
 * Each loads on demand, so a page only downloads the model it shows.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyPack = ModelPack<any>;

export const MODEL_PACKS = {
  "data-centre": async (): Promise<AnyPack> => {
    const [m, v] = await Promise.all([
      import("./dc-model"),
      import("./dc-views"),
    ]);
    return {
      build: m.buildDataCentre,
      views: v.DC_VIEWS,
      palette: v.DC_PALETTE,
      roles: v.DC_ROLES,
    };
  },
  fab: (): Promise<AnyPack> => import("./models/fab").then((m) => m.PACK),
  factory: (): Promise<AnyPack> =>
    import("./models/factory").then((m) => m.PACK),
  terminal: (): Promise<AnyPack> =>
    import("./models/terminal").then((m) => m.PACK),
  campus: (): Promise<AnyPack> => import("./models/campus").then((m) => m.PACK),
  hospital: (): Promise<AnyPack> =>
    import("./models/hospital").then((m) => m.PACK),
  "mixed-use": (): Promise<AnyPack> =>
    import("./models/mixed-use").then((m) => m.PACK),
  hotel: (): Promise<AnyPack> =>
    import("./models/mixed-use").then((m) => m.HOTEL_PACK),
  residential: (): Promise<AnyPack> =>
    import("./models/residential").then((m) => m.PACK),
  module: (): Promise<AnyPack> => import("./models/module").then((m) => m.PACK),
  yard: (): Promise<AnyPack> => import("./models/yard").then((m) => m.PACK),
  "floor-kits": (): Promise<AnyPack> =>
    import("./models/floor-kits").then((m) => m.PACK),
  "smart-building": (): Promise<AnyPack> =>
    import("./models/mixed-use").then((m) => m.SMART_PACK),
} as const;

export type ModelName = keyof typeof MODEL_PACKS;
