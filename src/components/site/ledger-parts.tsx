"use client";

import Link from "next/link";
import { ArrowRight, ArrowUpRight, Search } from "lucide-react";
import type { CSSProperties } from "react";
import type { LedgerEntry } from "@/data/cms/types";
import type { FeaturedCard } from "@/lib/ledger-filters";

/**
 * Shared, brand-voiced ledger UI primitives.
 *
 * Consumed by both the scoped `ProjectLedger` embeds (sector/service
 * pages, local-state) and the `/work` discovery hub (URL-synced state),
 * so the row/chip/search treatment stays identical everywhere and rows
 * are clickable in every context.
 */

export type ChipOption = { id: string; name: string };

// -----------------------------------------------------------------
// Metric — one headline figure (count / value)
// -----------------------------------------------------------------

export function Metric({ value, label }: { value: string; label: string }) {
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

// -----------------------------------------------------------------
// Search — free-text box
// -----------------------------------------------------------------

export function LedgerSearch({
  value,
  onChange,
  placeholder = "Search by project, client or city…",
  maxWidth = 420,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  maxWidth?: number;
}) {
  return (
    <div style={{ position: "relative", width: "100%", maxWidth }}>
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
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
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
  );
}

// -----------------------------------------------------------------
// Chip row — single-select toggle chips with aria-pressed
// -----------------------------------------------------------------

export function ChipRow({
  label,
  options,
  value,
  onChange,
  includeAll = true,
}: {
  label: string;
  options: ChipOption[];
  value: string;
  onChange: (v: string) => void;
  includeAll?: boolean;
}) {
  const opts = includeAll ? [{ id: "all", name: "All" }, ...options] : options;
  return (
    <div
      role="group"
      aria-label={label}
      style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}
    >
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
            type="button"
            aria-pressed={active}
            onClick={() => onChange(o.id)}
            className="ue-filter-chip"
            data-active={active ? "" : undefined}
          >
            {o.name}
          </button>
        );
      })}
    </div>
  );
}

// -----------------------------------------------------------------
// Select — compact native dropdown (state, value band)
// -----------------------------------------------------------------

export function LedgerSelect({
  label,
  value,
  onChange,
  options,
  allLabel = "All",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
  allLabel?: string;
}) {
  return (
    <label className="ue-ledger-select">
      <span className="ue-ledger-select__label">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label={label}
      >
        <option value="all">{allLabel}</option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}

// -----------------------------------------------------------------
// Ledger row — dense list line (the default view)
// -----------------------------------------------------------------

const rowGrid: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "minmax(0, 1fr) auto",
  gap: 20,
  alignItems: "baseline",
  padding: "16px 0",
  borderBottom: "1px solid var(--border-color)",
  color: "inherit",
  textDecoration: "none",
};

export function LedgerRow({
  entry,
  href,
  sectorLabel,
  serviceLabels,
}: {
  entry: LedgerEntry;
  href?: string;
  sectorLabel?: string;
  serviceLabels: Record<string, string>;
}) {
  const location = [entry.city, entry.state].filter(Boolean).join(", ");
  const services = entry.service_ids
    .map((id) => serviceLabels[id])
    .filter(Boolean);

  const body = (
    <>
      <div style={{ minWidth: 0 }}>
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: 8,
            fontFamily: "var(--font-display)",
            fontWeight: 500,
            fontSize: 16,
            letterSpacing: "-0.011em",
            lineHeight: 1.3,
            color: "var(--ink-950)",
          }}
        >
          <span>{entry.name}</span>
          {href && (
            <ArrowUpRight
              className="ue-ledger-row__arrow"
              aria-hidden
              style={{ width: 14, height: 14, color: "var(--accent-500)", flexShrink: 0 }}
            />
          )}
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
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        role="listitem"
        className="ue-ledger-row ue-ledger-row--link"
        style={rowGrid}
      >
        {body}
      </Link>
    );
  }
  return (
    <div role="listitem" className="ue-ledger-row" style={rowGrid}>
      {body}
    </div>
  );
}

// -----------------------------------------------------------------
// Ledger card — compact card view (optional toggle)
// -----------------------------------------------------------------

export function LedgerCardItem({
  entry,
  href,
  sectorLabel,
  serviceLabels,
}: {
  entry: LedgerEntry;
  href?: string;
  sectorLabel?: string;
  serviceLabels: Record<string, string>;
}) {
  const location = [entry.city, entry.state].filter(Boolean).join(", ");
  const services = entry.service_ids
    .map((id) => serviceLabels[id])
    .filter(Boolean)
    .slice(0, 5);

  const body = (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          gap: 12,
        }}
      >
        {sectorLabel ? (
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
        ) : (
          <span />
        )}
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 14,
            fontWeight: 500,
            fontVariantNumeric: "tabular-nums",
            color: "var(--ink-950)",
            whiteSpace: "nowrap",
          }}
        >
          {entry.value_display}
        </span>
      </div>
      <div
        style={{
          marginTop: 12,
          fontFamily: "var(--font-display)",
          fontWeight: 500,
          fontSize: 16,
          letterSpacing: "-0.012em",
          lineHeight: 1.25,
          color: "var(--ink-950)",
        }}
      >
        {entry.name}
      </div>
      <div style={{ marginTop: 4, fontSize: 13, color: "var(--ink-500)" }}>
        {entry.client}
        {location ? ` · ${location}` : ""}
      </div>
      {services.length > 0 && (
        <div
          style={{
            marginTop: 12,
            display: "flex",
            flexWrap: "wrap",
            gap: 6,
          }}
        >
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
    </>
  );

  if (href) {
    return (
      <Link href={href} role="listitem" className="ue-ledger-card ue-ledger-card--link">
        {body}
      </Link>
    );
  }
  return (
    <div role="listitem" className="ue-ledger-card">
      {body}
    </div>
  );
}

// -----------------------------------------------------------------
// Featured case-study card — rich photo card
// -----------------------------------------------------------------

export function FeaturedCardView({ card }: { card: FeaturedCard }) {
  return (
    <Link href={`/projects/${card.slug}`} className="ue-work-card group">
      <div
        className="ue-work-card__cover"
        style={{
          background: card.heroImageUrl
            ? `url(${card.heroImageUrl}) center/cover no-repeat`
            : "var(--ink-100)",
        }}
      >
        {!card.heroImageUrl && <span className="ue-work-card__cover-label">Photography</span>}
      </div>
      <div className="ue-work-card__body">
        <div className="ue-work-card__meta">
          <span>{card.primarySectorName}</span>
          {card.value_display && <span>{card.value_display}</span>}
        </div>
        <h3 className="ue-work-card__name">{card.name}</h3>
        <p className="ue-work-card__loc">
          {card.city}
          {card.state ? `, ${card.state}` : ""}
        </p>
        <div className="ue-work-card__tags">
          {card.scopeTags.map((t) => (
            <span key={t} className="ue-work-card__tag">
              {t}
            </span>
          ))}
        </div>
        <span className="ue-work-card__cta">
          View case study
          <ArrowRight className="size-3.5" aria-hidden />
        </span>
      </div>
    </Link>
  );
}
