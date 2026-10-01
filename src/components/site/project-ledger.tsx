"use client";

import { useMemo, useState } from "react";
import type { LedgerEntry } from "@/data/cms/types";
import {
  filterLedger,
  sumValueCr,
  formatCr,
  type LedgerFilters,
} from "@/lib/ledger-filters";
import {
  ChipRow,
  LedgerRow,
  LedgerSearch,
  Metric,
  type ChipOption,
} from "@/components/site/ledger-parts";

export type ProjectLedgerProps = {
  entries: LedgerEntry[];
  /** id → display name, for the sector tag on each row */
  sectorLabels?: Record<string, string>;
  /** id → short display name, for service tags on each row */
  serviceLabels?: Record<string, string>;
  /** Section eyebrow + heading. */
  eyebrow?: string;
  heading?: string;
  intro?: string;
  /** Show the free-text search box. */
  enableSearch?: boolean;
  /** When provided, renders sector filter chips (master page). */
  sectorFilter?: ChipOption[];
  /** When provided, renders service filter chips. */
  serviceFilter?: ChipOption[];
  /** Show the per-row sector tag (off when the list is already one sector). */
  showSectorTag?: boolean;
  /** Show the count + value metrics in the header (off when the page already shows them). */
  showMetrics?: boolean;
  /** How many rows to show before the "Show all" control. */
  initialCount?: number;
  /** ledger id → `/projects/<slug>` for rows that map to a rich case study. */
  caseStudyHrefs?: Record<string, string>;
  /** sector id → sector slug, for the "explore this sector in /work" fallback link. */
  sectorSlugById?: Record<string, string>;
};

export function ProjectLedger({
  entries,
  sectorLabels = {},
  serviceLabels = {},
  eyebrow = "Track record",
  heading = "Every project, last 10 years.",
  intro,
  enableSearch = true,
  sectorFilter,
  serviceFilter,
  showSectorTag = true,
  showMetrics = true,
  initialCount = 24,
  caseStudyHrefs,
  sectorSlugById,
}: ProjectLedgerProps) {
  const [query, setQuery] = useState("");
  const [sector, setSector] = useState<string[]>([]);
  const [service, setService] = useState<string[]>([]);
  const [expanded, setExpanded] = useState(false);

  const filters: LedgerFilters = useMemo(
    () => ({ q: query, sector, service, state: "all", band: "all" }),
    [query, sector, service],
  );

  const filtered = useMemo(
    () => filterLedger(entries, filters),
    [entries, filters],
  );
  const total = useMemo(() => sumValueCr(filtered), [filtered]);

  const visible = expanded ? filtered : filtered.slice(0, initialCount);
  const hasFilters = Boolean(
    sectorFilter?.length || serviceFilter?.length || enableSearch,
  );

  const hrefFor = (e: LedgerEntry): string | undefined => {
    if (caseStudyHrefs?.[e.id]) return caseStudyHrefs[e.id];
    const slug = sectorSlugById?.[e.sector_id];
    return slug ? `/work?sector=${slug}` : undefined;
  };

  return (
    <div>
      {/* Heading + headline stat */}
      <header
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 24,
          alignItems: "flex-end",
          justifyContent: "space-between",
          marginBottom: hasFilters ? 28 : 20,
        }}
      >
        <div style={{ maxWidth: "40ch" }}>
          <p className="ue-eyebrow" style={{ margin: 0 }}>
            {eyebrow}
          </p>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 500,
              fontSize: "clamp(28px, 3.4vw, 40px)",
              letterSpacing: "-0.022em",
              lineHeight: 1.08,
              margin: "10px 0 0",
              color: "var(--ink-950)",
            }}
          >
            {heading}
          </h2>
          {intro && (
            <p
              style={{
                margin: "14px 0 0",
                fontSize: 16,
                lineHeight: 1.55,
                color: "var(--ink-500)",
              }}
            >
              {intro}
            </p>
          )}
        </div>

        {showMetrics && (
          <div style={{ display: "flex", gap: 28, flexShrink: 0 }}>
            <Metric value={String(entries.length)} label="Projects" />
            <Metric
              value={formatCr(sumValueCr(entries))}
              label="Contract value"
            />
          </div>
        )}
      </header>

      {/* Controls */}
      {hasFilters && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 16,
            marginBottom: 20,
            paddingBottom: 20,
            borderBottom: "1px solid var(--border-color)",
          }}
        >
          {enableSearch && (
            <LedgerSearch
              value={query}
              onChange={(v) => {
                setQuery(v);
                setExpanded(true);
              }}
            />
          )}

          {sectorFilter && sectorFilter.length > 0 && (
            <ChipRow
              label="Industry"
              options={sectorFilter}
              value={sector}
              onChange={(v) => {
                setSector(v);
                setExpanded(false);
              }}
            />
          )}
          {serviceFilter && serviceFilter.length > 0 && (
            <ChipRow
              label="Service"
              options={serviceFilter}
              value={service}
              onChange={(v) => {
                setService(v);
                setExpanded(false);
              }}
            />
          )}
        </div>
      )}

      {/* Live count */}
      <p
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 12,
          color: "var(--ink-500)",
          letterSpacing: 0.2,
          margin: "0 0 4px",
        }}
      >
        {filtered.length === entries.length
          ? `${filtered.length} projects · ${formatCr(total)}`
          : `${filtered.length} of ${entries.length} projects · ${formatCr(total)}`}
      </p>

      {/* Ledger rows */}
      <div role="list">
        {visible.map((e) => (
          <LedgerRow
            key={e.id}
            entry={e}
            href={hrefFor(e)}
            sectorLabel={showSectorTag ? sectorLabels[e.sector_id] : undefined}
            serviceLabels={serviceLabels}
          />
        ))}
      </div>

      {filtered.length === 0 && (
        <p
          style={{
            padding: "32px 0",
            fontSize: 15,
            color: "var(--ink-500)",
          }}
        >
          No projects match these filters.
        </p>
      )}

      {/* Show all */}
      {!expanded && filtered.length > initialCount && (
        <div style={{ marginTop: 24 }}>
          <button
            type="button"
            onClick={() => setExpanded(true)}
            style={{
              padding: "10px 22px",
              borderRadius: 999,
              border: "1px solid var(--border-color)",
              background: "transparent",
              cursor: "pointer",
              fontFamily: "var(--font-body)",
              fontSize: 14,
              fontWeight: 500,
              color: "var(--ink-950)",
              transition: "background 160ms var(--ease-std)",
            }}
          >
            Show all {filtered.length} projects
          </button>
        </div>
      )}
    </div>
  );
}
