"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import projectsJson from "@/data/cms/projects.json";
import sectorsJson from "@/data/cms/sectors.json";
import projectSectorsJson from "@/data/cms/project_sectors.json";
import type {
  Project,
  Sector,
  ProjectSector,
} from "@/data/cms/types";

const PROJECTS = (projectsJson as Project[]).filter((p) => p.published);
const SECTORS = (sectorsJson as Sector[]).filter((s) => s.published);
const PSEC = projectSectorsJson as ProjectSector[];

// Helper: get primary sector id for a project
function primarySectorId(projectId: string): string | undefined {
  const primary = PSEC.find((j) => j.project_id === projectId && j.is_primary);
  if (primary) return primary.sector_id;
  return PSEC.find((j) => j.project_id === projectId)?.sector_id;
}

export default function ProjectsIndexPage() {
  const [filter, setFilter] = useState<string>("all");

  const shown = useMemo(() => {
    if (filter === "all") return PROJECTS;
    return PROJECTS.filter((p) => primarySectorId(p.id) === filter);
  }, [filter]);

  return (
    <section className="ue-section">
      <div className="ue-container">
        <p className="ue-eyebrow">Record</p>
        <h1 className="ue-h1" style={{ maxWidth: "16ch" }}>
          Selected mandates. Across typologies.
        </h1>
        <p className="ue-lead" style={{ marginTop: 24 }}>
          Data centre, semiconductor, industrial, healthcare, airport,
          education, corporate and residential — delivered by in-house engineers.
        </p>

        <div
          className="flex flex-wrap"
          style={{ gap: 8, marginTop: 64, marginBottom: 48 }}
        >
          <FilterChip
            label="All"
            active={filter === "all"}
            onClick={() => setFilter("all")}
          />
          {SECTORS.map((s) => (
            <FilterChip
              key={s.id}
              label={s.name}
              active={filter === s.id}
              onClick={() => setFilter(s.id)}
            />
          ))}
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: 28,
          }}
        >
          {shown.map((p) => {
            const secId = primarySectorId(p.id);
            const sec = SECTORS.find((s) => s.id === secId);
            return (
              <Link
                key={p.id}
                href={`/projects/${p.slug}`}
                className="group"
                style={{
                  display: "block",
                  border: "1px solid var(--border-color)",
                  borderRadius: 12,
                  background: "var(--paper)",
                  textDecoration: "none",
                  color: "inherit",
                  overflow: "hidden",
                  transition: "border-color var(--dur-2) var(--ease-std)",
                }}
              >
                <div
                  style={{
                    aspectRatio: "16 / 10",
                    background: p.hero_image_url
                      ? `url(${p.hero_image_url}) center/cover no-repeat`
                      : "var(--ink-100)",
                    borderBottom: "1px solid var(--border-color)",
                  }}
                />
                <div style={{ padding: "20px 22px 26px" }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "baseline",
                      fontFamily: "var(--font-mono)",
                      fontSize: 11,
                      color: "var(--fg-muted)",
                      textTransform: "uppercase",
                      letterSpacing: 0.4,
                    }}
                  >
                    <span>{sec?.name ?? p.project_type}</span>
                    {p.value_display && <span>{p.value_display}</span>}
                  </div>
                  <h3
                    style={{
                      marginTop: 8,
                      fontFamily: "var(--font-display)",
                      fontWeight: 500,
                      fontSize: 20,
                      letterSpacing: "-0.012em",
                      lineHeight: 1.2,
                      color: "var(--ink-950)",
                    }}
                  >
                    {p.name}
                  </h3>
                  <p
                    style={{
                      marginTop: 6,
                      fontSize: 13,
                      color: "var(--ink-500)",
                    }}
                  >
                    {p.location_city}
                    {p.location_state ? `, ${p.location_state}` : ""}
                  </p>
                  <div
                    style={{
                      marginTop: 16,
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 6,
                    }}
                  >
                    {p.scope_tags.slice(0, 4).map((t) => (
                      <span
                        key={t}
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: 10,
                          padding: "3px 8px",
                          background: "var(--ink-50)",
                          color: "var(--ink-700)",
                          borderRadius: 999,
                          letterSpacing: 0.3,
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <div
                    style={{
                      marginTop: 18,
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6,
                      fontSize: 13,
                      fontWeight: 500,
                      color: "var(--accent-500)",
                    }}
                    className="group-hover:text-[color:var(--accent-700)]"
                  >
                    View case study
                    <ArrowRight
                      className="size-3.5 transition-transform group-hover:translate-x-0.5"
                      aria-hidden
                    />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {shown.length === 0 && (
          <p className="ue-caption" style={{ marginTop: 48 }}>
            No projects listed in this sector yet.
          </p>
        )}
      </div>
    </section>
  );
}

function FilterChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "8px 16px",
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
      {label}
    </button>
  );
}
