import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getAllProjects, getProjectWithContext } from "@/lib/cms";
import { Breadcrumb } from "@/components/site/breadcrumb";
import { RelatedProjects } from "@/components/site/related-projects";
import type { Metadata } from "next";

type Params = { slug: string };

export function generateStaticParams() {
  return getAllProjects().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const data = getProjectWithContext(slug);
  if (!data) return {};
  return {
    title: data.project.seo_title ?? `${data.project.name} — Unique Engineers`,
    description: data.project.seo_description ?? data.project.summary,
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const data = getProjectWithContext(slug);
  if (!data) notFound();
  const { project, services, sectors, client, related } = data;
  const primarySector = sectors.find((s) => s.is_primary)?.sector;

  return (
    <>
      {/* Hero — full-bleed image + overlay title */}
      <section
        style={{
          position: "relative",
          minHeight: "60vh",
          background: project.hero_image_url
            ? `linear-gradient(180deg, rgba(10,12,16,0.15) 0%, rgba(10,12,16,0.7) 100%), url(${project.hero_image_url}) center/cover no-repeat`
            : "var(--ink-950)",
          color: "var(--paper)",
          display: "flex",
          alignItems: "flex-end",
          paddingBottom: 56,
          paddingTop: 96,
        }}
      >
        <div className="ue-container" style={{ width: "100%" }}>
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 12,
              color: "rgba(255,255,255,0.7)",
              textTransform: "uppercase",
              letterSpacing: 0.5,
              marginBottom: 16,
            }}
          >
            {primarySector?.name ?? project.project_type}
            {client && ` · ${client.name}`}
          </div>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 500,
              fontSize: 56,
              letterSpacing: "-0.025em",
              lineHeight: 1.02,
              margin: 0,
              maxWidth: "20ch",
              color: "var(--paper)",
            }}
          >
            {project.name}.
          </h1>
          <p
            style={{
              marginTop: 18,
              fontSize: 18,
              lineHeight: 1.55,
              color: "rgba(255,255,255,0.85)",
              maxWidth: "62ch",
            }}
          >
            {project.summary}
          </p>
        </div>
      </section>

      {/* Breadcrumb + metadata row */}
      <section
        className="ue-section"
        style={{ paddingTop: 40, paddingBottom: 48 }}
      >
        <div className="ue-container">
          <Breadcrumb
            items={[
              { label: "Work", href: "/work" },
              {
                label: primarySector?.name ?? project.project_type,
                href: primarySector
                  ? `/sectors/${primarySector.slug}`
                  : undefined,
              },
              { label: project.name },
            ]}
          />
          <div
            style={{
              marginTop: 32,
              paddingTop: 32,
              borderTop: "1px solid var(--border-color)",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
              gap: 24,
            }}
          >
            <Meta
              label="Client"
              value={client?.name ?? project.client_name_display ?? "—"}
            />
            <Meta
              label="Location"
              value={[project.location_city, project.location_state]
                .filter(Boolean)
                .join(", ")}
            />
            <Meta label="Type" value={project.project_type} />
            {project.timeline_text && (
              <Meta label="Timeline" value={project.timeline_text} />
            )}
            {project.value_display && (
              <Meta label="Value" value={project.value_display} />
            )}
            {project.code && <Meta label="Reference" value={project.code} />}
          </div>
        </div>
      </section>

      {/* Narrative + key metrics */}
      <section className="ue-section" style={{ paddingTop: 0 }}>
        <div className="ue-container">
          <div className="grid md:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] gap-12 md:gap-20">
            {/* Narrative */}
            <div>
              <p className="ue-eyebrow">Project narrative</p>
              <div style={{ marginTop: 16 }}>
                {project.narrative.map((p, i) => (
                  <p
                    key={i}
                    style={{
                      fontSize: 18,
                      lineHeight: 1.6,
                      color: "var(--ink-700)",
                      marginTop: i > 0 ? 20 : 0,
                      marginBottom: 0,
                    }}
                  >
                    {p}
                  </p>
                ))}
              </div>
            </div>

            {/* Side rail — metrics + scope */}
            <aside>
              {project.key_metrics && project.key_metrics.length > 0 && (
                <div>
                  <p className="ue-eyebrow">Key metrics</p>
                  <dl
                    style={{
                      marginTop: 16,
                      borderTop: "1px solid var(--border-color)",
                    }}
                  >
                    {project.key_metrics.map((m) => (
                      <div
                        key={m.k}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "baseline",
                          padding: "14px 0",
                          borderBottom: "1px solid var(--border-color)",
                          gap: 12,
                        }}
                      >
                        <dt
                          style={{
                            fontSize: 13,
                            color: "var(--fg-muted)",
                          }}
                        >
                          {m.k}
                        </dt>
                        <dd
                          style={{
                            margin: 0,
                            fontFamily: "var(--font-display)",
                            fontWeight: 500,
                            fontSize: 17,
                            letterSpacing: "-0.012em",
                            color: "var(--ink-950)",
                            textAlign: "right",
                          }}
                        >
                          {m.v}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              )}

              {project.scope_tags.length > 0 && (
                <div style={{ marginTop: 40 }}>
                  <p className="ue-eyebrow">Scope</p>
                  <div
                    style={{
                      marginTop: 14,
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 6,
                    }}
                  >
                    {project.scope_tags.map((t) => (
                      <span
                        key={t}
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: 11,
                          padding: "4px 10px",
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
                </div>
              )}

              {project.certifications && project.certifications.length > 0 && (
                <div style={{ marginTop: 40 }}>
                  <p className="ue-eyebrow">Certifications</p>
                  <ul
                    style={{
                      marginTop: 14,
                      padding: 0,
                      listStyle: "none",
                      fontSize: 14,
                      color: "var(--ink-700)",
                    }}
                  >
                    {project.certifications.map((c) => (
                      <li key={c} style={{ padding: "6px 0" }}>
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </aside>
          </div>
        </div>
      </section>

      {/* Execution snapshots */}
      {project.execution_snapshots &&
        project.execution_snapshots.length > 0 && (
          <section
            className="ue-section"
            style={{
              background: "var(--paper-soft)",
              borderTop: "1px solid var(--border-color)",
              borderBottom: "1px solid var(--border-color)",
            }}
          >
            <div className="ue-container">
              <header style={{ marginBottom: 48 }}>
                <p className="ue-eyebrow">Execution snapshots</p>
                <h2
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 500,
                    fontSize: 40,
                    letterSpacing: "-0.022em",
                    lineHeight: 1.1,
                    margin: "8px 0 0",
                    color: "var(--ink-950)",
                    maxWidth: "20ch",
                  }}
                >
                  How the work was delivered.
                </h2>
              </header>
              <div
                style={{ display: "flex", flexDirection: "column", gap: 64 }}
              >
                {project.execution_snapshots.map((s, i) => (
                  <article
                    key={i}
                    className="grid md:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] gap-10 md:gap-16 items-start"
                  >
                    <div>
                      {s.image_url ? (
                        <div
                          style={{
                            aspectRatio: "4 / 3",
                            background: `url(${s.image_url}) center/cover no-repeat`,
                            borderRadius: 12,
                            border: "1px solid var(--border-color)",
                          }}
                        />
                      ) : (
                        <div
                          style={{
                            aspectRatio: "4 / 3",
                            background: "var(--ink-100)",
                            borderRadius: 12,
                          }}
                        />
                      )}
                    </div>
                    <div>
                      <p className="ue-eyebrow">
                        {String(i + 1).padStart(2, "0")} · {s.title}
                      </p>
                      <h3
                        style={{
                          marginTop: 8,
                          fontFamily: "var(--font-display)",
                          fontWeight: 500,
                          fontSize: 28,
                          letterSpacing: "-0.018em",
                          lineHeight: 1.15,
                          color: "var(--ink-950)",
                        }}
                      >
                        {s.title}.
                      </h3>
                      <div style={{ marginTop: 16 }}>
                        {s.body.map((p, j) => (
                          <p
                            key={j}
                            style={{
                              fontSize: 17,
                              lineHeight: 1.6,
                              color: "var(--ink-700)",
                              marginTop: j > 0 ? 16 : 0,
                              marginBottom: 0,
                            }}
                          >
                            {p}
                          </p>
                        ))}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

      {/* Disciplines & sectors — cross-link */}
      {(services.length > 0 || sectors.length > 0) && (
        <section className="ue-section">
          <div className="ue-container">
            <header style={{ marginBottom: 32 }}>
              <p className="ue-eyebrow">Disciplines & sectors</p>
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 500,
                  fontSize: 32,
                  letterSpacing: "-0.022em",
                  lineHeight: 1.1,
                  margin: "8px 0 0",
                  color: "var(--ink-950)",
                  maxWidth: "20ch",
                }}
              >
                What was engineered, where it lands.
              </h2>
            </header>
            <div className="grid md:grid-cols-2 gap-10">
              {services.length > 0 && (
                <div>
                  <p
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 11,
                      color: "var(--fg-muted)",
                      textTransform: "uppercase",
                      letterSpacing: 0.4,
                      marginBottom: 16,
                    }}
                  >
                    Disciplines delivered
                  </p>
                  <ul
                    style={{
                      margin: 0,
                      padding: 0,
                      listStyle: "none",
                      borderTop: "1px solid var(--border-color)",
                    }}
                  >
                    {services.map(({ service, scope_note, is_primary }) => (
                      <li
                        key={service.id}
                        style={{
                          borderBottom: "1px solid var(--border-color)",
                        }}
                      >
                        <Link
                          href={`/services/${service.slug}`}
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "baseline",
                            padding: "14px 0",
                            gap: 16,
                            textDecoration: "none",
                            color: "inherit",
                          }}
                          className="hover:text-[color:var(--accent-500)] group"
                        >
                          <span>
                            <span
                              style={{
                                fontFamily: "var(--font-display)",
                                fontWeight: 500,
                                fontSize: 17,
                                letterSpacing: "-0.012em",
                                color: "var(--ink-950)",
                              }}
                            >
                              {service.name}
                              {is_primary && (
                                <span
                                  style={{
                                    marginLeft: 8,
                                    fontFamily: "var(--font-mono)",
                                    fontSize: 10,
                                    color: "var(--accent-500)",
                                    textTransform: "uppercase",
                                    letterSpacing: 0.4,
                                  }}
                                >
                                  · Primary
                                </span>
                              )}
                            </span>
                            {scope_note && (
                              <span
                                style={{
                                  display: "block",
                                  marginTop: 2,
                                  fontSize: 13,
                                  color: "var(--ink-500)",
                                }}
                              >
                                {scope_note}
                              </span>
                            )}
                          </span>
                          <ArrowRight
                            className="size-4 shrink-0 text-[color:var(--fg-muted)] transition-transform group-hover:translate-x-0.5"
                            aria-hidden
                          />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {sectors.length > 0 && (
                <div>
                  <p
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 11,
                      color: "var(--fg-muted)",
                      textTransform: "uppercase",
                      letterSpacing: 0.4,
                      marginBottom: 16,
                    }}
                  >
                    Sectors
                  </p>
                  <ul
                    style={{
                      margin: 0,
                      padding: 0,
                      listStyle: "none",
                      borderTop: "1px solid var(--border-color)",
                    }}
                  >
                    {sectors.map(({ sector }) => (
                      <li
                        key={sector.id}
                        style={{
                          borderBottom: "1px solid var(--border-color)",
                        }}
                      >
                        <Link
                          href={`/sectors/${sector.slug}`}
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "baseline",
                            padding: "14px 0",
                            textDecoration: "none",
                            color: "inherit",
                          }}
                          className="hover:text-[color:var(--accent-500)] group"
                        >
                          <span
                            style={{
                              fontFamily: "var(--font-display)",
                              fontWeight: 500,
                              fontSize: 17,
                              letterSpacing: "-0.012em",
                              color: "var(--ink-950)",
                            }}
                          >
                            {sector.name}
                          </span>
                          <ArrowRight
                            className="size-4 text-[color:var(--fg-muted)] transition-transform group-hover:translate-x-0.5"
                            aria-hidden
                          />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Related projects */}
      {related.length > 0 && (
        <section className="ue-section">
          <div className="ue-container">
            <RelatedProjects
              projects={related}
              eyebrow="More from this sector"
              heading="Related mandates."
            />
          </div>
        </section>
      )}

      {/* CTA */}
      <section
        className="ue-section"
        style={{ background: "var(--ink-950)", color: "var(--paper)" }}
      >
        <div
          className="ue-container"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 24,
            alignItems: "flex-start",
          }}
        >
          <p className="ue-eyebrow" style={{ color: "var(--accent-400)" }}>
            Start a project
          </p>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 500,
              fontSize: 44,
              letterSpacing: "-0.022em",
              lineHeight: 1.05,
              margin: 0,
              maxWidth: "18ch",
            }}
          >
            Have drawings? Let&apos;s talk.
          </h2>
          <Button
            asChild
            className="rounded-full h-12 px-7 text-[15px] font-medium bg-[color:var(--paper)] text-[color:var(--ink-950)] hover:bg-[color:var(--ink-100)]"
          >
            <Link href="/contact">
              Talk to an engineer
              <ArrowRight className="size-4 ml-1" aria-hidden />
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 11,
          color: "var(--fg-muted)",
          textTransform: "uppercase",
          letterSpacing: 0.4,
        }}
      >
        {label}
      </div>
      <div
        style={{
          marginTop: 6,
          fontFamily: "var(--font-display)",
          fontWeight: 500,
          fontSize: 16,
          letterSpacing: "-0.012em",
          color: "var(--ink-950)",
        }}
      >
        {value}
      </div>
    </div>
  );
}
