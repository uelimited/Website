import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getAllSectors } from "@/lib/cms";

export function SectorsBand() {
  const sectors = getAllSectors();

  return (
    <section
      className="ue-section"
      style={{
        background: "var(--paper-soft)",
        borderTop: "1px solid var(--border-color)",
        borderBottom: "1px solid var(--border-color)",
      }}
    >
      <div className="ue-container">
        <header style={{ marginBottom: 40 }}>
          <p className="ue-eyebrow">Sectors</p>
          <h2 className="ue-h2" style={{ marginTop: 8, maxWidth: "20ch" }}>
            Nine verticals. One engineering practice.
          </h2>
        </header>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 12,
          }}
        >
          {sectors.map((s) => (
            <Link
              key={s.id}
              href={`/sectors/${s.slug}`}
              className="group"
              style={{
                display: "block",
                border: "1px solid var(--border-color)",
                borderRadius: 12,
                background: "var(--paper)",
                textDecoration: "none",
                color: "inherit",
                transition: "border-color var(--dur-2) var(--ease-std)",
                overflow: "hidden",
              }}
            >
              {s.hero_image_url && (
                <div
                  style={{
                    aspectRatio: "16 / 9",
                    background: `url(${s.hero_image_url}) center/cover no-repeat`,
                    borderBottom: "1px solid var(--border-color)",
                  }}
                />
              )}
              <div style={{ padding: "18px 20px" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "baseline",
                    gap: 8,
                  }}
                >
                  <h3
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 500,
                      fontSize: 17,
                      letterSpacing: "-0.012em",
                      margin: 0,
                      color: "var(--ink-950)",
                    }}
                  >
                    {s.name}
                  </h3>
                  <ArrowUpRight
                    className="size-4 text-[color:var(--fg-muted)] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    aria-hidden
                  />
                </div>
                <div
                  style={{
                    marginTop: 8,
                    fontFamily: "var(--font-mono)",
                    fontSize: 11,
                    color: "var(--fg-muted)",
                    textTransform: "uppercase",
                    letterSpacing: 0.4,
                  }}
                >
                  {s.projects_count_override ?? "—"} projects
                  {s.revenue_cr_override && ` · ${s.revenue_cr_override}`}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
