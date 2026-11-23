"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
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
  sectorOptions,
  serviceOptions,
  sectorLabels,
  serviceLabels,
  featured,
  states,
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
    const sectorParam = searchParams.get("sector");
    const serviceParam = searchParams.get("service");
    const stateParam = searchParams.get("state");
    const bandParam = searchParams.get("band");
    return {
      q: searchParams.get("q") ?? "",
      sector:
        sectorParam && maps.sectorIdByParam[sectorParam]
          ? maps.sectorIdByParam[sectorParam]
          : "all",
      service:
        serviceParam && maps.serviceIdByParam[serviceParam]
          ? maps.serviceIdByParam[serviceParam]
          : "all",
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
    (patch: Record<string, string | null>) => {
      const p = new URLSearchParams(searchParams.toString());
      for (const [k, val] of Object.entries(patch)) {
        if (val === null || val === "") p.delete(k);
        else p.set(k, val);
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
    return slug ? `/projects?sector=${slug}` : undefined;
  };

  const [showArchive, setShowArchive] = useState(false);
  const [projectMode, setProjectMode] = useState("gallery");
  const galleryProjects = showArchive
    ? filteredFeatured
    : filteredFeatured.slice(0, 12);

  return (
    <>
      {/* Hero */}
      <section className="ue-work-hero">
        <div className="ue-container">
          <p className="ue-eyebrow" style={{ margin: 0 }}>
            Projects
          </p>
          <h1 className="ue-work-hero__title">
            India-scale MEPF, project by project.
          </h1>
          <p className="ue-work-hero__lead">
            Explore our projects by industry and service, or browse the
            historical project record.
          </p>
          <div
            className="ue-work-toggle"
            role="group"
            aria-label="Project collections"
            style={{ marginTop: 28, display: "inline-flex" }}
          >
            <button
              type="button"
              aria-pressed={projectMode === "gallery"}
              data-active={projectMode === "gallery" ? "" : undefined}
              onClick={() => setProjectMode("gallery")}
            >
              Project gallery
            </button>
            <button
              type="button"
              aria-pressed={projectMode === "record"}
              data-active={projectMode === "record" ? "" : undefined}
              onClick={() => setProjectMode("record")}
            >
              Project record
            </button>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="ue-work-filters">
        <div className="ue-container">
          <div className="ue-work-filters__top">
            <LedgerSearch value={queryInput} onChange={onSearchInput} />
            <div className="ue-work-filters__selects">
              {projectMode === "record" && (
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
              )}
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

          <div
            className="ue-work-filters__selects"
            style={{
              marginTop: 16,
              justifyContent: "flex-start",
              flexWrap: "wrap",
            }}
          >
            <LedgerSelect
              label="Industry"
              value={filters.sector}
              allLabel="All industries"
              options={sectorOptions.map((o) => ({
                value: o.id,
                label: o.name,
              }))}
              onChange={(id) =>
                commit({
                  sector: id === "all" ? null : maps.sectorParamById[id],
                })
              }
            />
            <LedgerSelect
              label="Service"
              value={filters.service}
              allLabel="All services"
              options={serviceOptions.map((o) => ({
                value: o.id,
                label: o.name,
              }))}
              onChange={(id) =>
                commit({
                  service: id === "all" ? null : maps.serviceParamById[id],
                })
              }
            />
            {active && (
              <button
                type="button"
                className="ue-work-clear"
                onClick={clearAll}
              >
                Clear filters
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Landmark project archive — responds to the same filter context */}
      {projectMode === "gallery" && (
        <section className="ue-work-featured" id="landmark-projects">
          <div className="ue-container">
            <header className="ue-work-section-head">
              <p className="ue-eyebrow" style={{ margin: 0 }}>
                Project gallery
              </p>
              <h2 className="ue-work-section-title">
                {active
                  ? `${filteredFeatured.length} landmark ${filteredFeatured.length === 1 ? "project" : "projects"} in view.`
                  : "Selected projects, across India."}
              </h2>
            </header>
            <div className="ue-work-grid">
              {galleryProjects.map((c) => (
                <FeaturedCardView key={c.slug} card={c} />
              ))}
            </div>
            {filteredFeatured.length === 0 && (
              <p className="ue-lead" role="status">
                No projects match these filters. Try a different search or clear
                the filters.
              </p>
            )}
            {!showArchive && filteredFeatured.length > 12 && (
              <button
                type="button"
                className="ue-work-clear"
                style={{ marginTop: 28 }}
                onClick={() => setShowArchive(true)}
              >
                Show all {filteredFeatured.length} projects
              </button>
            )}
          </div>
        </section>
      )}

      {/* The full project record */}
      <section
        className="ue-work-orderbook"
        id="project-record"
        hidden={projectMode !== "record"}
      >
        <div className="ue-container">
          <header className="ue-work-section-head">
            <p className="ue-eyebrow" style={{ margin: 0 }}>
              The project record
            </p>
            <h2 className="ue-work-section-title">
              Our historical project record.
            </h2>
            <p className="ue-work-section-lead">
              Recorded contracts from the last decade. Values reflect the
              historical register and may differ from the scope of a current
              project.
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
