import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  getAllServices,
  getServiceWithCategoriesAndProjects,
} from "@/lib/cms";
import { Breadcrumb } from "@/components/site/breadcrumb";
import { RelatedProjects } from "@/components/site/related-projects";
import type { Metadata } from "next";

type Params = { slug: string };

export function generateStaticParams() {
  return getAllServices().map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const data = getServiceWithCategoriesAndProjects(slug);
  if (!data) return {};
  return {
    title:
      data.service.seo_title ?? `${data.service.name} — Unique Engineers`,
    description:
      data.service.seo_description ?? data.service.blurb,
  };
}

const TYPE_LABELS = {
  system_layer: "System layer",
  application: "Application",
  specialised: "Specialised",
} as const;

const GROUP_KICKERS = {
  system_layer: "The engineering decomposition — central plant and the air-side equipment that feeds it.",
  application: "Application-led delivery — sized to the building's use, occupancy and operating window.",
  specialised: "Mission-critical disciplines — data centre, semiconductor and process environments.",
} as const;

export default async function ServiceLandingPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const data = getServiceWithCategoriesAndProjects(slug);
  if (!data) {
    notFound();
  }
  const { service, categories, projects } = data;

  const grouped = {
    system_layer: categories.filter((c) => c.category_type === "system_layer"),
    application: categories.filter((c) => c.category_type === "application"),
    specialised: categories.filter((c) => c.category_type === "specialised"),
  };

  return (
    <>
      {/* Hero */}
      <section
        style={{
          position: "relative",
          minHeight: "60vh",
          background: service.hero_image_url
            ? `linear-gradient(180deg, rgba(10,12,16,0.10) 0%, rgba(10,12,16,0.78) 100%), url(${service.hero_image_url}) center/cover no-repeat`
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
            <span>One of eight disciplines</span>
          </div>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 500,
              fontSize: "clamp(44px, 6.5vw, 72px)",
              letterSpacing: "-0.028em",
              lineHeight: 1.02,
              margin: 0,
              maxWidth: "18ch",
              color: "var(--paper)",
            }}
          >
            {service.name}.
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
            {service.blurb}
          </p>
        </div>
      </section>

      {/* Breadcrumb */}
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
              { label: service.name },
            ]}
          />
        </div>
      </section>

      {/* Big intro pull paragraph */}
      <section style={{ padding: "96px 0 32px" }}>
        <div className="ue-container" style={{ maxWidth: 880 }}>
          {service.intro_paragraphs[0] && (
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
              {service.intro_paragraphs[0]}
            </p>
          )}
          {service.intro_paragraphs.slice(1).map((p, i) => (
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

      {/* Stats — but as a softer band, not a tech table */}
      {service.stats && service.stats.length > 0 && (
        <section style={{ padding: "32px 0 96px" }}>
          <div className="ue-container">
            <div
              style={{
                display: "grid",
                gridTemplateColumns: `repeat(${Math.min(service.stats.length, 3)}, minmax(0, 1fr))`,
                gap: 24,
              }}
            >
              {service.stats.map((s) => (
                <div
                  key={s.k}
                  style={{
                    padding: "28px 28px 32px",
                    background: "var(--paper-soft)",
                    border: "1px solid var(--border-color)",
                    borderRadius: 18,
                  }}
                >
                  <div
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 500,
                      fontSize: "clamp(28px, 2.8vw, 36px)",
                      letterSpacing: "-0.022em",
                      lineHeight: 1.05,
                      color: "var(--ink-950)",
                    }}
                  >
                    {s.k}
                  </div>
                  <div
                    style={{
                      marginTop: 10,
                      fontSize: 14,
                      lineHeight: 1.5,
                      color: "var(--ink-500)",
                    }}
                  >
                    {s.v}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* What we cover — friendly sub-discipline grid */}
      <section
        style={{
          padding: "96px 0 112px",
          background: "var(--paper-soft)",
          borderTop: "1px solid var(--border-color)",
          borderBottom: "1px solid var(--border-color)",
        }}
      >
        <div className="ue-container">
          <header style={{ marginBottom: 56, maxWidth: 720 }}>
            <p className="ue-eyebrow">What this discipline covers</p>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 500,
                fontSize: "clamp(34px, 4vw, 48px)",
                letterSpacing: "-0.025em",
                lineHeight: 1.05,
                margin: "10px 0 16px",
                color: "var(--ink-950)",
              }}
            >
              {categories.length} ways we deliver{" "}
              {service.name.toLowerCase()}.
            </h2>
            <p
              style={{
                fontSize: 17,
                lineHeight: 1.55,
                color: "var(--ink-500)",
                margin: 0,
              }}
            >
              We split {service.name} into focused sub-disciplines so you can
              see exactly which slice of the work matches your project. Click
              any one to read more.
            </p>
          </header>

          {(["system_layer", "application", "specialised"] as const).map(
            (type) =>
              grouped[type].length > 0 && (
                <div key={type} style={{ marginBottom: 64 }}>
                  <header
                    style={{
                      display: "flex",
                      alignItems: "baseline",
                      gap: 16,
                      marginBottom: 24,
                      paddingBottom: 12,
                      borderBottom: "1px solid var(--border-color)",
                    }}
                  >
                    <h3
                      style={{
                        fontFamily: "var(--font-display)",
                        fontWeight: 500,
                        fontSize: 22,
                        letterSpacing: "-0.018em",
                        margin: 0,
                        color: "var(--ink-950)",
                      }}
                    >
                      {TYPE_LABELS[type]}s
                    </h3>
                    <p
                      style={{
                        fontSize: 14,
                        color: "var(--ink-500)",
                        margin: 0,
                        flex: 1,
                        maxWidth: "60ch",
                      }}
                    >
                      {GROUP_KICKERS[type]}
                    </p>
                  </header>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns:
                        "repeat(auto-fit, minmax(300px, 1fr))",
                      gap: 16,
                    }}
                  >
                    {grouped[type].map((c) => (
                      <Link
                        key={c.id}
                        href={`/services/${service.slug}/${c.slug}`}
                        className="group"
                        style={{
                          display: "block",
                          borderRadius: 18,
                          border: "1px solid var(--border-color)",
                          background: "var(--paper)",
                          overflow: "hidden",
                          textDecoration: "none",
                          color: "inherit",
                          transition:
                            "border-color var(--dur-2) var(--ease-std)",
                        }}
                      >
                        <div
                          style={{
                            aspectRatio: "16 / 9",
                            background: c.hero_image_url
                              ? `linear-gradient(180deg, rgba(10,12,16,0.10) 0%, rgba(10,12,16,0.45) 100%), url(${c.hero_image_url}) center/cover no-repeat`
                              : service.hero_image_url
                              ? `linear-gradient(180deg, rgba(10,12,16,0.20) 0%, rgba(10,12,16,0.55) 100%), url(${service.hero_image_url}) center/cover no-repeat`
                              : "var(--ink-100)",
                            position: "relative",
                            borderBottom: "1px solid var(--border-color)",
                          }}
                        >
                          <div
                            style={{
                              position: "absolute",
                              top: 18,
                              left: 18,
                              right: 18,
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "baseline",
                              color: "var(--paper)",
                            }}
                          >
                            <span
                              style={{
                                fontFamily: "var(--font-mono)",
                                fontSize: 11,
                                letterSpacing: "0.05em",
                                opacity: 0.85,
                              }}
                            >
                              {c.num}
                            </span>
                            <span
                              style={{
                                fontFamily: "var(--font-mono)",
                                fontSize: 10,
                                textTransform: "uppercase",
                                letterSpacing: "0.05em",
                                padding: "3px 10px",
                                borderRadius: 999,
                                background: "rgba(255,255,255,0.18)",
                                backdropFilter: "blur(8px)",
                              }}
                            >
                              {TYPE_LABELS[c.category_type]}
                            </span>
                          </div>
                        </div>
                        <div style={{ padding: "22px 24px 24px" }}>
                          <h4
                            style={{
                              fontFamily: "var(--font-display)",
                              fontWeight: 500,
                              fontSize: 22,
                              letterSpacing: "-0.018em",
                              lineHeight: 1.15,
                              margin: 0,
                              color: "var(--ink-950)",
                            }}
                          >
                            {c.name}
                          </h4>
                          <p
                            style={{
                              marginTop: 10,
                              marginBottom: 18,
                              fontSize: 14,
                              lineHeight: 1.55,
                              color: "var(--ink-500)",
                            }}
                          >
                            {c.short_blurb}
                          </p>
                          <div
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              gap: 6,
                              fontSize: 13,
                              fontWeight: 500,
                              color: "var(--accent-500)",
                            }}
                            className="group-hover:text-[color:var(--accent-700)]"
                          >
                            Read more
                            <ArrowUpRight
                              className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                              aria-hidden
                            />
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              ),
          )}
        </div>
      </section>

      {/* How we approach the discipline overall */}
      {service.approach_paragraphs.length > 0 && (
        <section style={{ padding: "96px 0" }}>
          <div className="ue-container">
            <div
              className="grid md:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] gap-10 md:gap-16"
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
                  How we engineer {service.name.toLowerCase()}.
                </h2>
              </div>
              <div>
                {service.approach_paragraphs.map((p, i) => (
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
              eyebrow="Where you'll see this work"
              heading={`${service.name} — in delivery.`}
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
            Working on a project?
          </p>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 500,
              fontSize: "clamp(36px, 4vw, 48px)",
              letterSpacing: "-0.022em",
              lineHeight: 1.05,
              margin: 0,
              maxWidth: "20ch",
            }}
          >
            Tell us about it. We&apos;ll listen properly.
          </h2>
          <p
            style={{
              fontSize: 17,
              lineHeight: 1.55,
              color: "rgba(255,255,255,0.7)",
              margin: 0,
              maxWidth: "56ch",
            }}
          >
            Share a scope and we&apos;ll come back with a proposal, a
            programme, and the name of the engineer who&apos;ll lead it. No
            sales rep in between.
          </p>
          <Button
            asChild
            className="rounded-full h-12 px-7 text-[15px] font-medium bg-[color:var(--paper)] text-[color:var(--ink-950)] hover:bg-[color:var(--ink-100)]"
          >
            <Link href="/contact">
              Start a conversation
              <ArrowRight className="size-4 ml-1" aria-hidden />
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
}
