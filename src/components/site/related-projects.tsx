import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getProjectHeroImage } from "@/lib/cms";
import type { Project } from "@/data/cms/types";

export function RelatedProjects({
  projects,
  heading = "Featured projects",
  eyebrow = "In delivery",
}: {
  projects: Project[];
  heading?: string;
  eyebrow?: string;
}) {
  if (!projects.length) return null;

  return (
    <section
      style={{
        marginTop: 80,
        paddingTop: 48,
        borderTop: "1px solid var(--border-color)",
      }}
    >
      <header style={{ marginBottom: 32 }}>
        <p className="ue-eyebrow">{eyebrow}</p>
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 500,
            fontSize: 32,
            letterSpacing: "-0.022em",
            lineHeight: 1.1,
            margin: "8px 0 0",
            color: "var(--ink-950)",
            maxWidth: "24ch",
          }}
        >
          {heading}
        </h2>
      </header>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: 24,
        }}
      >
        {projects.map((p) => {
          const image = getProjectHeroImage(p);
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
                position: "relative",
                background: image
                  ? `url(${image}) center/cover no-repeat`
                  : "var(--ink-100)",
                borderBottom: "1px solid var(--border-color)",
              }}
            >
              {!p.hero_image_url && image && (
                <span className="ue-work-card__cover-label">
                  Representative image
                </span>
              )}
            </div>
            <div style={{ padding: "20px 22px 24px" }}>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  color: "var(--fg-muted)",
                  textTransform: "uppercase",
                  letterSpacing: 0.4,
                }}
              >
                {p.project_type} {p.value_display ? `· ${p.value_display}` : ""}
              </div>
              <h3
                style={{
                  marginTop: 6,
                  fontFamily: "var(--font-display)",
                  fontWeight: 500,
                  fontSize: 19,
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
                  lineHeight: 1.45,
                }}
              >
                {p.location_city}
                {p.location_state ? `, ${p.location_state}` : ""}
              </p>
              <div
                style={{
                  marginTop: 14,
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
    </section>
  );
}
