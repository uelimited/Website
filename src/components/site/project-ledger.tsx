"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import type { LedgerEntry } from "@/data/cms/types";

type Option = { id: string; name: string };

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
  sectorFilter?: Option[];
  /** When provided, renders service filter chips. */
  serviceFilter?: Option[];
  /** Show the per-row sector tag (off when the list is already one sector). */
  showSectorTag?: boolean;
  /** Show the count + value metrics in the header (off when the page already shows them). */
  showMetrics?: boolean;
  /** How many rows to show before the “Show all” control. */
  initialCount?: number;
};

/** Client-side crore formatter — mirrors lib/cms.ts formatCr for live totals. */
function formatCr(cr: number): string {
  if (cr >= 10) return `₹${Math.round(cr).toLocaleString("en-IN")} Cr`;
  if (cr >= 1) return `₹${cr.toFixed(1)} Cr`;
  return `₹${Math.round(cr * 100)} L`;
}

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
}: ProjectLedgerProps) {
  const [query, setQuery] = useState("");
  const [sector, setSector] = useState<string>("all");
  const [service, setService] = useState<string>("all");
  const [expanded, setExpanded] = useState(false);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return entries.filter((e) => {
      if (sector !== "all" && e.sector_id !== sector) return false;
      if (service !== "all" && !e.service_ids.includes(service)) return false;
      if (q) {
        const hay = `${e.name} ${e.client} ${e.city} ${e.state}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [entries, query, sector, service]);

  const total = useMemo(
    () => filtered.reduce((sum, e) => sum + e.value_cr, 0),
    [filtered],
  );

  const visible = expanded ? filtered : filtered.slice(0, initialCount);
  const hasFilters = Boolean(
    sectorFilter?.length || serviceFilter?.length || enableSearch,
  );

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
              value={formatCr(entries.reduce((s, e) => s + e.value_cr, 0))}
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
            <div style={{ position: "relative", maxWidth: 420 }}>
              <Search
                aria-hidden
                style={{
                  position: "absolute",
                  left: 14,
                  top: "50%",
                  transform: "translateY(-50%)",
                  width: 16,
                  height: 16,
                  color: "var(--ink-400)",
                }}
              />
              <input
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setExpanded(true);
                }}
                placeholder="Search by project, client or city…"
                aria-label="Search projects"
                style={{
                  width: "100%",
                  height: 44,
                  padding: "0 16px 0 40px",
                  borderRadius: 999,
                  border: "1px solid var(--border-color)",
                  background: "var(--paper)",
                  fontFamily: "var(--font-body)",
                  fontSize: 15,
                  color: "var(--ink-950)",
                  outline: "none",
                }}
              />
            </div>
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

function Metric({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 500,
          fontSize: "clamp(24px, 3vw, 32px)",
          letterSpacing: "-0.022em",
          lineHeight: 1.05,
          color: "var(--ink-950)",
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {value}
      </div>
      <div style={{ marginTop: 4, fontSize: 12, color: "var(--ink-500)" }}>
        {label}
      </div>
    </div>
  );
}

function ChipRow({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: Option[];
  value: string;
  onChange: (v: string) => void;
}) {
  const opts = [{ id: "all", name: "All" }, ...options];
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 11,
          textTransform: "uppercase",
          letterSpacing: 0.6,
          color: "var(--ink-400)",
          marginRight: 4,
        }}
      >
        {label}
      </span>
      {opts.map((o) => {
        const active = value === o.id;
        return (
          <button
            key={o.id}
            onClick={() => onChange(o.id)}
            style={{
              padding: "6px 14px",
              border: "1px solid var(--border-color)",
              borderRadius: 999,
              cursor: "pointer",
              fontFamily: "var(--font-body)",
              fontSize: 13,
              fontWeight: 500,
              letterSpacing: "-0.005em",
              background: active ? "var(--ink-950)" : "transparent",
              color: active ? "var(--paper)" : "var(--ink-700)",
              transition: "all 160ms var(--ease-std)",
            }}
          >
            {o.name}
          </button>
        );
      })}
    </div>
  );
}

function LedgerRow({
  entry,
  sectorLabel,
  serviceLabels,
}: {
  entry: LedgerEntry;
  sectorLabel?: string;
  serviceLabels: Record<string, string>;
}) {
  const location = [entry.city, entry.state].filter(Boolean).join(", ");
  const services = entry.service_ids
    .map((id) => serviceLabels[id])
    .filter(Boolean);

  return (
    <div
      role="listitem"
      className="ue-ledger-row"
      style={{
        display: "grid",
        gridTemplateColumns: "minmax(0, 1fr) auto",
        gap: 20,
        alignItems: "baseline",
        padding: "16px 0",
        borderBottom: "1px solid var(--border-color)",
      }}
    >
      <div style={{ minWidth: 0 }}>
        <div
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 500,
            fontSize: 16,
            letterSpacing: "-0.011em",
            lineHeight: 1.3,
            color: "var(--ink-950)",
          }}
        >
          {entry.name}
        </div>
        <div
          style={{
            marginTop: 3,
            fontSize: 13,
            lineHeight: 1.4,
            color: "var(--ink-500)",
          }}
        >
          {entry.client}
          {location ? ` · ${location}` : ""}
        </div>
        {(sectorLabel || services.length > 0) && (
          <div
            style={{
              marginTop: 9,
              display: "flex",
              flexWrap: "wrap",
              gap: 6,
              alignItems: "center",
            }}
          >
            {sectorLabel && (
              <span
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 11.5,
                  fontWeight: 500,
                  padding: "3px 9px",
                  borderRadius: 999,
                  background: "var(--accent-50)",
                  color: "var(--accent-700)",
                  letterSpacing: "-0.003em",
                }}
              >
                {sectorLabel}
              </span>
            )}
            {services.map((s) => (
              <span
                key={s}
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 10,
                  padding: "2px 7px",
                  background: "var(--ink-50)",
                  color: "var(--ink-600)",
                  borderRadius: 999,
                  letterSpacing: 0.2,
                }}
              >
                {s}
              </span>
            ))}
          </div>
        )}
      </div>

      <div style={{ textAlign: "right", whiteSpace: "nowrap" }}>
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 15,
            fontWeight: 500,
            fontVariantNumeric: "tabular-nums",
            color: "var(--ink-950)",
            letterSpacing: "-0.01em",
          }}
        >
          {entry.value_display}
        </div>
        {entry.year_display && (
          <div style={{ marginTop: 3, fontSize: 11.5, color: "var(--ink-400)" }}>
            {entry.year_display}
          </div>
        )}
      </div>
    </div>
  );
}
