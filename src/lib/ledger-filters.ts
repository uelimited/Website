/**
 * Unique Engineers — shared ledger filter logic
 *
 * Pure, framework-free helpers used by BOTH the scoped `ProjectLedger`
 * embeds (local-state) and the `/work` discovery hub (URL-synced state).
 * No React, no data imports — safe to import from server and client.
 *
 * URL param convention (the `/work` hub):
 *   ?q=<text>&sector=<sector-slug>&service=<short-key>&state=<name>&band=<key>
 * Sectors are keyed by their (clean) slug; services by the id with the
 * `svc-` prefix stripped (`svc-hvac` → `hvac`), which reads well in URLs.
 */

import type { LedgerEntry } from "@/data/cms/types";

export type ViewMode = "list" | "cards";

/** Canonical filter state. Ids are resolved (sector/service = cms id or "all"). */
export type LedgerFilters = {
  q: string;
  sector: string; // sector id, or "all"
  service: string; // service id, or "all"
  state: string; // state name, or "all"
  band: string; // value-band key, or "all"
};

export const EMPTY_FILTERS: LedgerFilters = {
  q: "",
  sector: "all",
  service: "all",
  state: "all",
  band: "all",
};

/** Contract-value bands (₹ crore). Keys are URL-stable. */
export const VALUE_BANDS: {
  key: string;
  label: string;
  test: (v: number) => boolean;
}[] = [
  { key: "100+", label: "₹100 Cr +", test: (v) => v >= 100 },
  { key: "25-100", label: "₹25–100 Cr", test: (v) => v >= 25 && v < 100 },
  { key: "10-25", label: "₹10–25 Cr", test: (v) => v >= 10 && v < 25 },
  { key: "lt-10", label: "Under ₹10 Cr", test: (v) => v < 10 },
];

export function bandTest(key: string): ((v: number) => boolean) | undefined {
  return VALUE_BANDS.find((b) => b.key === key)?.test;
}

/** `svc-hvac` → `hvac` for clean URLs. */
export function serviceParamFromId(id: string): string {
  return id.startsWith("svc-") ? id.slice(4) : id;
}

/** `hvac` → `svc-hvac`. */
export function serviceIdFromParam(param: string): string {
  return param.startsWith("svc-") ? param : `svc-${param}`;
}

/** Crore formatter — mirrors lib/cms.ts formatCr so live totals match SSR. */
export function formatCr(cr: number): string {
  if (cr >= 10) return `₹${Math.round(cr).toLocaleString("en-IN")} Cr`;
  if (cr >= 1) return `₹${cr.toFixed(1)} Cr`;
  return `₹${Math.round(cr * 100)} L`;
}

export function isFiltered(f: LedgerFilters): boolean {
  return (
    f.q.trim() !== "" ||
    f.sector !== "all" ||
    f.service !== "all" ||
    f.state !== "all" ||
    f.band !== "all"
  );
}

/** Filter the full 170-row order book. */
export function filterLedger(
  entries: LedgerEntry[],
  f: LedgerFilters,
): LedgerEntry[] {
  const test = f.band !== "all" ? bandTest(f.band) : undefined;
  const q = f.q.trim().toLowerCase();
  return entries.filter((e) => {
    if (f.sector !== "all" && e.sector_id !== f.sector) return false;
    if (f.service !== "all" && !e.service_ids.includes(f.service)) return false;
    if (f.state !== "all" && e.state !== f.state) return false;
    if (test && !test(e.value_cr)) return false;
    if (q) {
      const hay = `${e.name} ${e.client} ${e.city} ${e.state}`.toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });
}

/** Sum of contract value across a set of entries (crore). */
export function sumValueCr(entries: LedgerEntry[]): number {
  return entries.reduce((sum, e) => sum + e.value_cr, 0);
}

/**
 * A rich case-study card, pre-flattened on the server so the hub can
 * filter it against the same axes without touching the join tables.
 */
export type FeaturedCard = {
  slug: string;
  name: string;
  city: string;
  state: string;
  value_display: string;
  value_cr: number;
  primarySectorName: string;
  sectorIds: string[];
  serviceIds: string[];
  scopeTags: string[];
  heroImageUrl: string | null;
  projectType: string;
};

/** Filter the featured case studies with the same filter context as the ledger. */
export function filterFeatured(
  cards: FeaturedCard[],
  f: LedgerFilters,
): FeaturedCard[] {
  const test = f.band !== "all" ? bandTest(f.band) : undefined;
  const q = f.q.trim().toLowerCase();
  return cards.filter((c) => {
    if (f.sector !== "all" && !c.sectorIds.includes(f.sector)) return false;
    if (f.service !== "all" && !c.serviceIds.includes(f.service)) return false;
    if (f.state !== "all" && c.state !== f.state) return false;
    if (test && !test(c.value_cr)) return false;
    if (q) {
      const hay =
        `${c.name} ${c.city} ${c.state} ${c.primarySectorName}`.toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });
}
