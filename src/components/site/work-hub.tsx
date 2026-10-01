"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { StatsGrid } from "@/components/site/stat-counter";
import {
  ChipRow,
  FeaturedCardView,
  LedgerCardItem,
  LedgerRow,
  LedgerSearch,
  LedgerSelect,
} from "@/components/site/ledger-parts";
import {
  VALUE_BANDS,
  filterFeatured,
  filterLedger,
  formatCr,
  isFiltered,
  sumValueCr,
  type FeaturedCard,
  type LedgerFilters,
  type ViewMode,
} from "@/lib/ledger-filters";
import type { LedgerEntry } from "@/data/cms/types";

type Option = { id: string; name: string; param: string };

export type WorkHubProps = {
  ledger: LedgerEntry[];
  stats: { count: number; total_cr: number; total_display: string };
  sectorOptions: Option[];
  serviceOptions: Option[];
  sectorLabels: Record<string, string>;
  serviceLabels: Record<string, string>;
  featured: FeaturedCard[];
  states: string[];
  industries: number;
  caseStudyHrefs: Record<string, string>;
  sectorSlugById: Record<string, string>;
};

const INITIAL_ROWS = 30;

export function WorkHub({
  ledger,
  stats,
  sectorOptions,
  serviceOptions,
  sectorLabels,
  serviceLabels,
  featured,
  states,
  industries,
  caseStudyHrefs,
  sectorSlugById,
}: WorkHubProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // param <-> id lookups, derived once from the option lists
  const maps = useMemo(() => {
    const sectorIdByParam: Record<string, string> = {};
    const sectorParamById: Record<string, string> = {};
    for (const o of sectorOptions) {
      sectorIdByParam[o.param] = o.id;
      sectorParamById[o.id] = o.param;
    }
    const serviceIdByParam: Record<string, string> = {};
    const serviceParamById: Record<string, string> = {};
    for (const o of serviceOptions) {
      serviceIdByParam[o.param] = o.id;
      serviceParamById[o.id] = o.param;
    }
    return {
      sectorIdByParam,
      sectorParamById,
      serviceIdByParam,
      serviceParamById,
    };
  }, [sectorOptions, serviceOptions]);

  // The URL is the single source of truth for the resolved filter state.
  const filters: LedgerFilters = useMemo(() => {
    const sectorParams = searchParams.getAll("sector");
    const serviceParams = searchParams.getAll("service");
    const stateParam = searchParams.get("state");
    const bandParam = searchParams.get("band");
    return {
      q: searchParams.get("q") ?? "",
      sector: sectorParams
        .map((param) => maps.sectorIdByParam[param])
        .filter((id): id is string => Boolean(id)),
      service: serviceParams
        .map((param) => maps.serviceIdByParam[param])
        .filter((id): id is string => Boolean(id)),
      state: stateParam && states.includes(stateParam) ? stateParam : "all",
      band:
        bandParam && VALUE_BANDS.some((b) => b.key === bandParam)
          ? bandParam
          : "all",
    };
  }, [searchParams, maps, states]);

  const active = isFiltered(filters);

  // --- URL writers (replace, never push — filters shouldn't spam history) ---
  const commit = useCallback(
    (patch: Record<string, string | string[] | null>) => {
      const p = new URLSearchParams(searchParams.toString());
      for (const [k, val] of Object.entries(patch)) {
        p.delete(k);
        if (Array.isArray(val)) {
          val.forEach((item) => p.append(k, item));
        } else if (val !== null && val !== "") {
          p.set(k, val);
        }
      }
      const qs = p.toString();
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    },
    [router, pathname, searchParams],
  );

  // --- Free-text search: local state + debounced URL write, so typing stays
  //     smooth and the caret never jumps while the URL catches up. ---
  const [queryInput, setQueryInput] = useState(filters.q);
  const lastWrittenQ = useRef(filters.q);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (filters.q !== lastWrittenQ.current) {
      lastWrittenQ.current = filters.q;
      setQueryInput(filters.q);
    }
  }, [filters.q]);

  const onSearchInput = (v: string) => {
    setQueryInput(v);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      lastWrittenQ.current = v;
      commit({ q: v || null });
    }, 200);
  };

  const clearAll = () => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    lastWrittenQ.current = "";
    setQueryInput("");
    router.replace(pathname, { scroll: false });
  };

  // --- Results ---
  const filteredLedger = useMemo(
    () => filterLedger(ledger, filters),
    [ledger, filters],
  );
  const filteredFeatured = useMemo(
    () => filterFeatured(featured, filters),
    [featured, filters],
  );
  const total = useMemo(() => sumValueCr(filteredLedger), [filteredLedger]);

  // View + pagination
  const [view, setView] = useState<ViewMode>("list");
  const [expanded, setExpanded] = useState(false);
  // Reset pagination to the top whenever the filter context changes, using
  // React's render-time state-adjustment pattern (no effect / cascading render).
  const filterKey = `${filters.q}|${filters.sector}|${filters.service}|${filters.state}|${filters.band}`;
  const [prevFilterKey, setPrevFilterKey] = useState(filterKey);
  if (filterKey !== prevFilterKey) {
    setPrevFilterKey(filterKey);
    setExpanded(false);
  }

  const visible = expanded
    ? filteredLedger
    : filteredLedger.slice(0, INITIAL_ROWS);

  const hrefFor = (e: LedgerEntry): string | undefined => {
    if (caseStudyHrefs[e.id]) return caseStudyHrefs[e.id];
    const slug = sectorSlugById[e.sector_id];
    return slug ? `/work?sector=${slug}` : undefined;
  };

  const heroStats = [
    {
      n: String(stats.count),
      unit: "+",
      l: "Projects delivered · last decade",
    },
    {
      n: Math.round(stats.total_cr).toLocaleString("en-IN"),
      unit: "₹ Cr",
      l: "Cumulative contract value",
    },
    { n: String(industries), unit: "", l: "Industries served" },
    { n: "75,000", unit: "TR", l: "Cooling engineered · flagships" },
    { n: "23", unit: "", l: "States executed" },
  ];

  return (
    <>
      {/* Hero */}
      <section className="ue-work-hero">
        <div className="ue-container">
          <p className="ue-eyebrow" style={{ margin: 0 }}>
            Projects
          </p>
          <h1 className="ue-work-hero__title">Every project, delivered.</h1>
          <p className="ue-work-hero__lead">
            {stats.count} projects across {industries} industries, delivered
            over the last decade. Filter by sector, system, contract value or
            location to find the work that matches yours.
          </p>
          <div className="ue-work-hero__stats">
            <StatsGrid items={heroStats} />
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="ue-work-filters">
        <div className="ue-container">
          <div className="ue-work-filters__top">
            <LedgerSearch value={queryInput} onChange={onSearchInput} />
            <div className="ue-work-filters__selects">
              <LedgerSelect
                label="Value"
                value={filters.band}
                onChange={(v) => commit({ band: v === "all" ? null : v })}
                allLabel="Any value"
                options={VALUE_BANDS.map((b) => ({
                  value: b.key,
                  label: b.label,
                }))}
              />
              {states.length > 0 && (
                <LedgerSelect
                  label="State"
                  value={filters.state}
                  onChange={(v) => commit({ state: v === "all" ? null : v })}
                  allLabel="All states"
                  options={states.map((s) => ({ value: s, label: s }))}
                />
              )}
            </div>
          </div>

          <div className="ue-work-filters__chips">
            <ChipRow
              label="Sector"
              options={sectorOptions.map((o) => ({ id: o.id, name: o.name }))}
              value={filters.sector}
              onChange={(ids) =>
                commit({
                  sector: ids.flatMap((id) =>
                    maps.sectorParamById[id]
                      ? [maps.sectorParamById[id]]
                      : [],
                  ),
                })
              }
            />
            <ChipRow
              label="Service"
              options={serviceOptions.map((o) => ({ id: o.id, name: o.name }))}
              value={filters.service}
              onChange={(ids) =>
                commit({
                  service: ids.flatMap((id) =>
                    maps.serviceParamById[id]
                      ? [maps.serviceParamById[id]]
                      : [],
                  ),
                })
              }
            />
          </div>
        </div>
      </section>

      {/* Featured case studies — respond to the same filter context */}
      {filteredFeatured.length > 0 && (
        <section className="ue-work-featured">
          <div className="ue-container">
            <header className="ue-work-section-head">
              <p className="ue-eyebrow" style={{ margin: 0 }}>
                Featured case studies
              </p>
              <h2 className="ue-work-section-title">
                {active
                  ? `${filteredFeatured.length} featured ${filteredFeatured.length === 1 ? "project" : "projects"} in view.`
                  : "The mandates that defined the firm."}
              </h2>
            </header>
            <div className="ue-work-grid">
              {filteredFeatured.map((c) => (
                <FeaturedCardView key={c.slug} card={c} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* The full order book */}
      <section className="ue-work-orderbook">
        <div className="ue-container">
          <header className="ue-work-section-head">
            <p className="ue-eyebrow" style={{ margin: 0 }}>
              The full order book
            </p>
            <h2 className="ue-work-section-title">Every project, one list.</h2>
            <p className="ue-work-section-lead">
              Repeat purchase orders for the same site are consolidated;
              contract values are aggregated. Largest first.
            </p>
          </header>

          {/* Results bar: live count + clear + view toggle */}
          <div className="ue-work-results">
            <p className="ue-work-count" aria-live="polite">
              {filteredLedger.length === ledger.length
                ? `${filteredLedger.length} projects · ${formatCr(total)}`
                : `${filteredLedger.length} of ${ledger.length} projects · ${formatCr(total)}`}
            </p>
            <div className="ue-work-results__actions">
              {active && (
                <button
                  type="button"
                  className="ue-work-clear"
                  onClick={clearAll}
                >
                  Clear filters
                </button>
              )}
              <div
                className="ue-work-toggle"
                role="group"
                aria-label="View mode"
              >
                <button
                  type="button"
                  aria-pressed={view === "list"}
                  data-active={view === "list" ? "" : undefined}
                  onClick={() => setView("list")}
                >
                  List
                </button>
                <button
                  type="button"
                  aria-pressed={view === "cards"}
                  data-active={view === "cards" ? "" : undefined}
                  onClick={() => setView("cards")}
                >
                  Cards
                </button>
              </div>
            </div>
          </div>

          {/* Rows / cards */}
          {view === "list" ? (
            <div role="list">
              {visible.map((e) => (
                <LedgerRow
                  key={e.id}
                  entry={e}
                  href={hrefFor(e)}
                  sectorLabel={sectorLabels[e.sector_id]}
                  serviceLabels={serviceLabels}
                />
              ))}
            </div>
          ) : (
            <div role="list" className="ue-ledger-cards">
              {visible.map((e) => (
                <LedgerCardItem
                  key={e.id}
                  entry={e}
                  href={hrefFor(e)}
                  sectorLabel={sectorLabels[e.sector_id]}
                  serviceLabels={serviceLabels}
                />
              ))}
            </div>
          )}

          {filteredLedger.length === 0 && (
            <p
              style={{
                padding: "40px 0",
                fontSize: 15,
                color: "var(--ink-500)",
              }}
            >
              No projects match these filters.{" "}
              <button
                type="button"
                className="ue-work-clear"
                onClick={clearAll}
              >
                Clear filters
              </button>
              .
            </p>
          )}

          {!expanded && filteredLedger.length > INITIAL_ROWS && (
            <div style={{ marginTop: 28 }}>
              <button
                type="button"
                className="ue-work-showall"
                onClick={() => setExpanded(true)}
              >
                Show all {filteredLedger.length} projects
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
