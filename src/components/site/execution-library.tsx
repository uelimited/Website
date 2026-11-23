"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Search, X } from "lucide-react";
import type { MethodLibrary, MethodStatement } from "@/data/cms/types";

const INITIAL_RESULTS = 24;

export function ExecutionLibrary({
  libraries,
  statements,
  initialLibrary = "all",
  initialQuery = "",
}: {
  libraries: MethodLibrary[];
  statements: Omit<MethodStatement, "source_file">[];
  initialLibrary?: string;
  initialQuery?: string;
}) {
  const [query, setQuery] = useState(initialQuery);
  const [library, setLibrary] = useState(initialLibrary);
  const [section, setSection] = useState("all");
  const [showAll, setShowAll] = useState(false);

  const sections = useMemo(
    () =>
      Array.from(
        new Set(
          statements
            .filter((item) => library === "all" || item.library_id === library)
            .map((item) => item.section),
        ),
      ).sort((a, b) => a.localeCompare(b)),
    [library, statements],
  );

  const results = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return statements.filter((item) => {
      const matchesLibrary = library === "all" || item.library_id === library;
      const matchesSection = section === "all" || item.section === section;
      const matchesQuery =
        !needle || item.search_text.toLowerCase().includes(needle);
      return matchesLibrary && matchesSection && matchesQuery;
    });
  }, [library, query, section, statements]);

  const visible = showAll ? results : results.slice(0, INITIAL_RESULTS);
  const isFiltered = query || library !== "all" || section !== "all";

  const clear = () => {
    setQuery("");
    setLibrary("all");
    setSection("all");
    setShowAll(false);
  };

  return (
    <div className="ue-methods">
      <div className="ue-methods__toolbar">
        <label className="ue-methods__search">
          <Search aria-hidden />
          <span className="sr-only">Search execution methods</span>
          <input
            type="search"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setShowAll(false);
            }}
            placeholder="Search systems, activities or method codes"
          />
        </label>
        <label className="ue-methods__select">
          <span>Work package</span>
          <select
            value={section}
            onChange={(event) => {
              setSection(event.target.value);
              setShowAll(false);
            }}
          >
            <option value="all">All work packages</option>
            {sections.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="ue-methods__chips" aria-label="Filter by library">
        <button
          type="button"
          data-active={library === "all" ? "" : undefined}
          onClick={() => {
            setLibrary("all");
            setSection("all");
            setShowAll(false);
          }}
        >
          All methods <span>{statements.length}</span>
        </button>
        {libraries.map((item) => (
          <button
            key={item.id}
            type="button"
            data-active={library === item.id ? "" : undefined}
            onClick={() => {
              setLibrary(item.id);
              setSection("all");
              setShowAll(false);
            }}
          >
            {item.name} <span>{item.count}</span>
          </button>
        ))}
      </div>

      <div className="ue-methods__resultbar">
        <p aria-live="polite">
          <strong>{results.length}</strong> controlled methods in view
        </p>
        {isFiltered && (
          <button type="button" onClick={clear}>
            <X aria-hidden /> Clear filters
          </button>
        )}
      </div>

      {visible.length ? (
        <div className="ue-methods__grid">
          {visible.map((item) => (
            <article className="ue-method-card" key={item.id}>
              <div className="ue-method-card__meta">
                <span>{item.code}</span>
                <span>{item.library_name}</span>
              </div>
              <h3>{item.title}</h3>
              <p className="ue-method-card__section">{item.section}</p>
              <div className="ue-method-card__foot">
                <span>{item.availability}</span>
                <Link
                  href="/contact"
                  aria-label={`Enquire about ${item.title}`}
                >
                  Request review <ArrowUpRight aria-hidden />
                </Link>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="ue-methods__empty">
          <p>No execution methods match this search.</p>
          <button type="button" onClick={clear}>
            Reset the library
          </button>
        </div>
      )}

      {!showAll && results.length > INITIAL_RESULTS && (
        <button
          type="button"
          className="ue-methods__showall"
          onClick={() => setShowAll(true)}
        >
          Show all {results.length} methods
        </button>
      )}
    </div>
  );
}
