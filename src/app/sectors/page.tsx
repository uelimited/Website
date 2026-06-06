import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getAllSectors, getProjectsBySector } from "@/lib/cms";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sectors — Unique Engineers",
  description:
    "Nine verticals delivered with cross-sector engineering depth — data centre, semiconductor, industrial, airport, education, corporate, healthcare, hospitality and residential.",
};

export default function SectorsIndexPage() {
  const sectors = getAllSectors();

  return (
    <section className="ue-section">
      <div className="ue-container">
        <p className="ue-eyebrow">Sectors</p>
        <h1 className="ue-h1" style={{ maxWidth: "16ch" }}>
          Nine verticals. One engineering practice.
        </h1>
        <p className="ue-lead" style={{ marginTop: 32 }}>
          Cross-sector engineering depth — from mission-critical data centres
          and semiconductor cleanrooms to airports, healthcare and
          mixed-use developments. The same delivery standard everywhere.
        </p>

        <div
          style={{
            marginTop: 72,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: 24,
          }}
        >
          {sectors.map((s) => {
            const projects = getProjectsBySector(s.id);
            return (
              <Link
                key={s.id}
                href={`/sectors/${s.slug}`}
                className="group"
                style={{
                  display: "block",
                  border: "1px solid var(--border-color)",
                  borderRadius: 14,
                  background: "var(--paper)",
                  textDecoration: "none",
                  color: "inherit",
                  transition: "border-color var(--dur-2) var(--ease-std)",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    aspectRatio: "16 / 10",
                    background: s.hero_image_url
                      ? `url(${s.hero_image_url}) center/cover no-repeat`
                      : "var(--ink-100)",
                    borderBottom: "1px solid var(--border-color)",
                  }}
                />
                <div style={{ padding: "28px 28px 32px" }}>
                <header
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    justifyContent: "space-between",
                    marginBottom: 20,
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 13,
                      color: "var(--fg-muted)",
                    }}
                  >
                    {String(s.sort_order).padStart(2, "0")}
                  </span>
                  {s.deep_page && (
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: 10,
                        color: "var(--accent-500)",
                        textTransform: "uppercase",
                        letterSpacing: 0.4,
                      }}
                    >
                      Deep capability
                    </span>
                  )}
                </header>
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 500,
                    fontSize: 24,
                    letterSpacing: "-0.018em",
                    lineHeight: 1.15,
                    margin: 0,
                    color: "var(--ink-950)",
                  }}
                >
                  {s.name}
                </h3>
                <p
                  style={{
                    marginTop: 12,
                    marginBottom: 22,
                    fontSize: 14,
                    lineHeight: 1.55,
                    color: "var(--ink-500)",
                  }}
                >
                  {s.short_description}
                </p>
                <dl
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 0,
                    margin: 0,
                    borderTop: "1px solid var(--border-color)",
                    paddingTop: 14,
                  }}
                >
                  <div>
                    <dt
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: 10,
                        color: "var(--fg-muted)",
                        textTransform: "uppercase",
                        letterSpacing: 0.4,
                      }}
                    >
                      Projects
                    </dt>
                    <dd
                      style={{
                        margin: 0,
                        marginTop: 4,
                        fontFamily: "var(--font-display)",
                        fontWeight: 500,
                        fontSize: 18,
                        letterSpacing: "-0.012em",
                        color: "var(--ink-950)",
                      }}
                    >
                      {s.projects_count_override ?? String(projects.length)}
                    </dd>
                  </div>
                  <div>
                    <dt
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: 10,
                        color: "var(--fg-muted)",
                        textTransform: "uppercase",
                        letterSpacing: 0.4,
                      }}
                    >
                      Revenue
                    </dt>
                    <dd
                      style={{
                        margin: 0,
                        marginTop: 4,
                        fontFamily: "var(--font-display)",
                        fontWeight: 500,
                        fontSize: 18,
                        letterSpacing: "-0.012em",
                        color: "var(--ink-950)",
                      }}
                    >
                      {s.revenue_cr_override ?? "—"}
                    </dd>
                  </div>
                </dl>
                <div
                  style={{
                    marginTop: 22,
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    fontSize: 13,
                    fontWeight: 500,
                    color: "var(--accent-500)",
                  }}
                  className="group-hover:text-[color:var(--accent-700)]"
                >
                  Explore sector
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
      </div>
    </section>
  );
}
