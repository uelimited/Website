import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import {
  getAllServices,
  getCategoriesForService,
  getCategoryWithContextAndProjects,
  getServiceById,
} from "@/lib/cms";
import { Breadcrumb } from "@/components/site/breadcrumb";
import { RelatedProjects } from "@/components/site/related-projects";
import { ContactCTA } from "@/components/site/contact-cta";
import type { Metadata } from "next";

type Params = { slug: string; sub: string };

export function generateStaticParams() {
  const all: { slug: string; sub: string }[] = [];
  for (const service of getAllServices()) {
    const categories = getCategoriesForService(service.id);
    for (const c of categories) {
      all.push({ slug: service.slug, sub: c.slug });
    }
  }
  return all;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug, sub } = await params;
  const data = getCategoryWithContextAndProjects(slug, sub);
  if (!data) return {};
  return {
    title:
      data.category.seo_title ??
      `${data.category.name} — ${data.service.name} — Unique Engineers`,
    description: data.category.seo_description ?? data.category.short_blurb,
  };
}

export default async function SubCategoryDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug, sub } = await params;
  const data = getCategoryWithContextAndProjects(slug, sub);
  if (!data) notFound();
  const { service, category, related, projects } = data;

  const heroImage = category.hero_image_url ?? service.hero_image_url;

  return (
    <>
      {/* Full-bleed hero — image, gradient, title overlay */}
      <section
        style={{
          position: "relative",
          minHeight: "62vh",
          background: heroImage
            ? `linear-gradient(180deg, rgba(10,12,16,0.15) 0%, rgba(10,12,16,0.75) 100%), url(${heroImage}) center/cover no-repeat`
            : "var(--ink-950)",
          color: "var(--paper)",
          display: "flex",
          alignItems: "flex-end",
          paddingTop: 120,
          paddingBottom: 64,
        }}
      >
        <div className="ue-container" style={{ width: "100%" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              padding: "6px 14px",
              borderRadius: 999,
              background: "rgba(255,255,255,0.12)",
              backdropFilter: "blur(8px)",
              border: "1px solid rgba(255,255,255,0.18)",
              fontFamily: "var(--font-display)",
              fontSize: 13,
              fontWeight: 500,
              letterSpacing: "-0.005em",
              color: "var(--paper)",
              marginBottom: 28,
            }}
          >
            <span style={{ color: "var(--accent-400)" }}>
              {service.num}
            </span>
            <span style={{ opacity: 0.5 }}>·</span>
            <span>{service.name}</span>
          </div>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 500,
              fontSize: "clamp(40px, 6vw, 64px)",
              letterSpacing: "-0.025em",
              lineHeight: 1.02,
              margin: 0,
              maxWidth: "20ch",
              color: "var(--paper)",
            }}
          >
            {category.name}.
          </h1>
          <p
            style={{
              marginTop: 20,
              fontSize: "clamp(17px, 1.2vw, 20px)",
              lineHeight: 1.5,
              color: "rgba(255,255,255,0.85)",
              maxWidth: "60ch",
            }}
          >
            {category.short_blurb}
          </p>
        </div>
      </section>

      {/* Breadcrumb strip — quiet, only here for navigation */}
      <section
        style={{
          background: "var(--paper)",
          borderBottom: "1px solid var(--border-color)",
          padding: "16px 0",
        }}
      >
        <div className="ue-container">
          <Breadcrumb
            items={[
              { label: "Capabilities", href: "/services" },
              { label: service.name, href: `/services/${service.slug}` },
              { label: category.name },
            ]}
          />
        </div>
      </section>

      {/* Lead — single big pull paragraph */}
      <section style={{ padding: "96px 0 24px" }}>
        <div className="ue-container" style={{ maxWidth: 880 }}>
          {category.intro_paragraphs[0] && (
            <p
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 400,
                fontSize: "clamp(22px, 2vw, 28px)",
                letterSpacing: "-0.018em",
                lineHeight: 1.35,
                color: "var(--ink-950)",
                margin: 0,
              }}
            >
              {category.intro_paragraphs[0]}
            </p>
          )}
          {category.intro_paragraphs.slice(1).map((p, i) => (
            <p
              key={i}
              style={{
                marginTop: 24,
                fontSize: 18,
                lineHeight: 1.65,
                color: "var(--ink-700)",
              }}
            >
              {p}
            </p>
          ))}
        </div>
      </section>

      {/* What we deliver — softer, more visual systems grid */}
      {category.systems.length > 0 && (
        <section
          style={{
            padding: "80px 0 96px",
            background: "var(--paper-soft)",
            borderTop: "1px solid var(--border-color)",
            borderBottom: "1px solid var(--border-color)",
          }}
        >
          <div className="ue-container">
            <header style={{ marginBottom: 56, maxWidth: 640 }}>
              <p className="ue-eyebrow">What we deliver</p>
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 500,
                  fontSize: "clamp(32px, 3.4vw, 42px)",
                  letterSpacing: "-0.022em",
                  lineHeight: 1.08,
                  margin: "10px 0 16px",
                  color: "var(--ink-950)",
                }}
              >
                The work, in plain terms.
              </h2>
              <p
                style={{
                  fontSize: 17,
                  lineHeight: 1.55,
                  color: "var(--ink-500)",
                  margin: 0,
                }}
              >
                Each of the systems below is engineered, installed and
                commissioned by our in-house team — handed over with
                documentation, training and a number you can call.
              </p>
            </header>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                gap: 20,
              }}
            >
              {category.systems.map((s, i) => (
                <article
                  key={s.name}
                  style={{
                    position: "relative",
                    padding: "32px 30px 30px",
                    background: "var(--paper)",
                    border: "1px solid var(--border-color)",
                    borderRadius: 18,
                    overflow: "hidden",
                  }}
                >
                  <div
                    aria-hidden
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      height: 4,
                      background:
                        "linear-gradient(90deg, var(--accent-500), var(--accent-300))",
                    }}
                  />
                  <div
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 11,
                      color: "var(--accent-500)",
                      letterSpacing: "0.05em",
                      marginBottom: 14,
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <h3
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 500,
                      fontSize: 22,
                      letterSpacing: "-0.018em",
                      lineHeight: 1.18,
                      margin: 0,
                      color: "var(--ink-950)",
                    }}
                  >
                    {s.name}
                  </h3>
                  <p
                    style={{
                      marginTop: 12,
                      fontSize: 15,
                      lineHeight: 1.6,
                      color: "var(--ink-700)",
                    }}
                  >
                    {s.description}
                  </p>
                  {s.specs && s.specs.length > 0 && (
                    <details
                      style={{
                        marginTop: 22,
                        paddingTop: 18,
                        borderTop: "1px solid var(--border-color)",
                      }}
                    >
                      <summary
                        style={{
                          cursor: "pointer",
                          fontFamily: "var(--font-mono)",
                          fontSize: 11,
                          color: "var(--ink-500)",
                          textTransform: "uppercase",
                          letterSpacing: "0.05em",
                          listStyle: "none",
                        }}
                      >
                        Specs
                      </summary>
                      <dl style={{ margin: "12px 0 0" }}>
                        {s.specs.map((sp) => (
                          <div
                            key={sp.k}
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "baseline",
                              padding: "6px 0",
                              fontFamily: "var(--font-mono)",
                              fontSize: 12,
                              color: "var(--ink-700)",
                              gap: 12,
                            }}
                          >
                            <dt
                              style={{
                                color: "var(--fg-muted)",
                                whiteSpace: "nowrap",
                              }}
                            >
                              {sp.k}
                            </dt>
                            <dd
                              style={{ margin: 0, textAlign: "right" }}
                            >
                              {sp.v}
                            </dd>
                          </div>
                        ))}
                      </dl>
                    </details>
                  )}
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* How we work — editorial, image + text side by side */}
      {category.approach_paragraphs.length > 0 && (
        <section style={{ padding: "96px 0" }}>
          <div className="ue-container">
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1.3fr)",
                gap: 64,
                alignItems: "start",
              }}
              className="md:grid"
            >
              <div>
                <p className="ue-eyebrow">How we work</p>
                <h2
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 500,
                    fontSize: "clamp(32px, 3.4vw, 40px)",
                    letterSpacing: "-0.022em",
                    lineHeight: 1.08,
                    margin: "10px 0 0",
                    color: "var(--ink-950)",
                    maxWidth: "16ch",
                  }}
                >
                  Our way of approaching it.
                </h2>
                {heroImage && (
                  <div
                    style={{
                      marginTop: 32,
                      aspectRatio: "4 / 3",
                      borderRadius: 18,
                      background: `url(${heroImage}) center/cover no-repeat`,
                      border: "1px solid var(--border-color)",
                    }}
                  />
                )}
              </div>
              <div>
                {category.approach_paragraphs.map((p, i) => (
                  <p
                    key={i}
                    style={{
                      fontSize: 18,
                      lineHeight: 1.65,
                      color: "var(--ink-700)",
                      marginTop: i > 0 ? 24 : 0,
                      marginBottom: 0,
                    }}
                  >
                    {p}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Featured projects */}
      {projects.length > 0 && (
        <section
          style={{
            padding: "16px 0 96px",
            background: "var(--paper-soft)",
            borderTop: "1px solid var(--border-color)",
          }}
        >
          <div className="ue-container">
            <RelatedProjects
              projects={projects}
              eyebrow="Where we've delivered this"
              heading={`${category.name}, in real buildings.`}
            />
          </div>
        </section>
      )}

      {/* Often works with — warmer, more invitational */}
      {related.length > 0 && (
        <section style={{ padding: "96px 0" }}>
          <div className="ue-container">
            <header style={{ marginBottom: 36, maxWidth: 620 }}>
              <p className="ue-eyebrow">Often works with</p>
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 500,
                  fontSize: "clamp(28px, 3vw, 36px)",
                  letterSpacing: "-0.022em",
                  lineHeight: 1.1,
                  margin: "10px 0 12px",
                  color: "var(--ink-950)",
                }}
              >
                Systems that come along for the ride.
              </h2>
              <p
                style={{
                  fontSize: 16,
                  lineHeight: 1.55,
                  color: "var(--ink-500)",
                  margin: 0,
                }}
              >
                Engineering rarely happens one discipline at a time. These
                are the disciplines we typically deliver alongside{" "}
                {category.name.toLowerCase()}.
              </p>
            </header>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                gap: 16,
              }}
            >
              {related.map((c) => {
                const svc = getServiceById(c.service_id);
                const thumb = c.hero_image_url ?? svc?.hero_image_url;
                return (
                  <Link
                    key={c.id}
                    href={svc ? `/services/${svc.slug}/${c.slug}` : "#"}
                    className="group"
                    style={{
                      display: "block",
                      borderRadius: 16,
                      border: "1px solid var(--border-color)",
                      background: "var(--paper)",
                      overflow: "hidden",
                      textDecoration: "none",
                      color: "inherit",
                      transition: "border-color var(--dur-2) var(--ease-std)",
                    }}
                  >
                    <div
                      style={{
                        aspectRatio: "16 / 10",
                        background: thumb
                          ? `linear-gradient(180deg, rgba(10,12,16,0.05) 0%, rgba(10,12,16,0.35) 100%), url(${thumb}) center/cover no-repeat`
                          : "var(--ink-100)",
                        borderBottom: "1px solid var(--border-color)",
                      }}
                    />
                    <div style={{ padding: "18px 20px 20px" }}>
                      <div
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: 11,
                          color: "var(--accent-500)",
                          textTransform: "uppercase",
                          letterSpacing: 0.5,
                          marginBottom: 6,
                        }}
                      >
                        {svc?.name ?? "Related"}
                      </div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          gap: 10,
                        }}
                      >
                        <h3
                          style={{
                            fontFamily: "var(--font-display)",
                            fontWeight: 500,
                            fontSize: 18,
                            letterSpacing: "-0.012em",
                            margin: 0,
                            color: "var(--ink-950)",
                          }}
                        >
                          {c.name}
                        </h3>
                        <ArrowUpRight
                          className="size-4 text-[color:var(--fg-muted)] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
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
      )}

      {/* CTA */}
      <ContactCTA />
    </>
  );
}
