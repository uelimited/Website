import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import {
  getAllServices,
  getAllSectors,
  getServiceWithCategoriesAndProjects,
  getLedgerByService,
  getLedgerStatsForService,
  getCaseStudyHrefsByLedgerId,
  getSectorSlugById,
} from "@/lib/cms";
import { serviceParamFromId } from "@/lib/ledger-filters";
import { Breadcrumb } from "@/components/site/breadcrumb";
import { RelatedProjects } from "@/components/site/related-projects";
import { ProjectLedger } from "@/components/site/project-ledger";
import { SubServicesList } from "@/components/site/sub-services-list";
import { ServiceMedia } from "@/components/site/service-media";
import { ContactCTA } from "@/components/site/contact-cta";
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
    title: data.service.seo_title ?? `${data.service.name} — Unique Engineers`,
    description: data.service.seo_description ?? data.service.blurb,
  };
}

/** "HVAC" stays as-is mid-sentence; "Civil & Interior" reads better lowercased. */
const inlineName = (name: string) =>
  name === name.toUpperCase() ? name : name.toLowerCase();

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

  // Order-book projects where this service is an evidenced scope.
  // Only surfaced when there's a substantive list to show.
  const serviceLedger = getLedgerByService(service.id);
  const showLedger = serviceLedger.length >= 5;

  // Live headline stat for the hero. Only stated once the ledger sample
  // for this discipline is large enough to be a credible claim — the
  // ledger's service tagging is still being backfilled for a few
  // disciplines, and a thin count would undersell real delivery history.
  const ledgerStats = getLedgerStatsForService(service.id);
  const showHeroStat = ledgerStats.count >= 3;
  // Curated, discipline-specific ceiling figure ("up to 30,000 TR") —
  // stored directly on the service record; not every discipline has one.
  const heroScale = service.hero_scale;
  const sectors = getAllSectors();
  const sectorLabels = Object.fromEntries(sectors.map((s) => [s.id, s.name]));
  const usedSectorIds = new Set(serviceLedger.map((e) => e.sector_id));
  const ledgerSectorFilter = sectors
    .filter((s) => usedSectorIds.has(s.id))
    .map((s) => ({ id: s.id, name: s.name }));
  const caseStudyHrefs = getCaseStudyHrefsByLedgerId();
  const sectorSlugById = getSectorSlugById();

  const subServices = categories.map((c) => ({
    slug: c.slug,
    num: c.num,
    name: c.name,
    blurb: c.short_blurb,
    href: `/services/${service.slug}/${c.slug}`,
  }));

  // Plain-language lead; the original technical copy stays available
  // behind the "for the engineers" disclosure below it.
  const approachLead = service.approach_plain ?? service.approach_paragraphs;
  const approachTechnical = service.approach_plain
    ? service.approach_paragraphs
    : [];

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
            <span style={{ color: "var(--accent-400)" }}>{service.num}</span>
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
            {service.tagline ?? service.blurb}
          </p>
          {(showHeroStat || heroScale) && (
            <p
              style={{
                marginTop: 24,
                fontFamily: "var(--font-mono)",
                fontSize: 15,
                letterSpacing: "0.005em",
                color: "var(--accent-400)",
              }}
            >
              {showHeroStat
                ? `${ledgerStats.count} projects delivered · ${ledgerStats.total_display} in contract value${heroScale ? ` · ${heroScale}` : ""}`
                : heroScale}
            </p>
          )}
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

      {/* Decorative engineering motif — purely illustrative, page text and
          data stand on their own without it. Renders at rest (no scroll
          wiring), so there is nothing gated behind JS or reduced motion. */}
      <section style={{ padding: "0 0 80px" }}>
        <div className="ue-container">
          <ServiceMedia accent={service.accent} label={service.name} />
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

      {/* What the discipline covers — one clean accordion, no internal taxonomy */}
      <section
        style={{
          padding: "96px 0 112px",
          background: "var(--paper-soft)",
          borderTop: "1px solid var(--border-color)",
          borderBottom: "1px solid var(--border-color)",
        }}
      >
        <div className="ue-container">
          <header style={{ marginBottom: 40, maxWidth: 720 }}>
            <p className="ue-eyebrow">What&apos;s inside</p>
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
              {service.name}, piece by piece.
            </h2>
            <p
              style={{
                fontSize: 17,
                lineHeight: 1.55,
                color: "var(--ink-500)",
                margin: 0,
              }}
            >
              Every project draws on a different slice of the discipline. Open
              any part to see what it covers.
            </p>
          </header>

          <SubServicesList items={subServices} />
        </div>
      </section>

      {/* How the discipline is approached overall */}
      {approachLead.length > 0 && (
        <section style={{ padding: "96px 0" }}>
          <div className="ue-container">
            <div className="grid md:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] gap-10 md:gap-16">
              <div>
                <p className="ue-eyebrow">The approach</p>
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
                  How {inlineName(service.name)} is engineered.
                </h2>
              </div>
              <div>
                {approachLead.map((p, i) => (
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

                {approachTechnical.length > 0 && (
                  <details className="ue-tech-details">
                    <summary>For the engineers — the technical version</summary>
                    <div className="ue-tech-details__body">
                      {approachTechnical.map((p, i) => (
                        <p key={i}>{p}</p>
                      ))}
                    </div>
                  </details>
                )}
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

      {/* Full order-book record for this discipline */}
      {showLedger && (
        <section
          className="ue-section"
          style={{
            borderTop: "1px solid var(--border-color)",
          }}
        >
          <div className="ue-container">
            <ProjectLedger
              entries={serviceLedger}
              sectorLabels={sectorLabels}
              eyebrow="Where this scope was delivered"
              heading={`${service.name} — the project record.`}
              intro="Projects from the last decade with documented scope in this discipline, across every industry served."
              sectorFilter={ledgerSectorFilter}
              showSectorTag
              enableSearch={serviceLedger.length > 10}
              initialCount={12}
              caseStudyHrefs={caseStudyHrefs}
              sectorSlugById={sectorSlugById}
            />
            <div style={{ marginTop: 36 }}>
              <Link
                href={`/work?service=${serviceParamFromId(service.id)}`}
                className="inline-flex items-center gap-2 text-[14px] font-medium text-[color:var(--accent-500)] hover:text-[color:var(--accent-700)]"
              >
                See all {serviceLedger.length} {inlineName(service.name)}{" "}
                projects
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <ContactCTA />
    </>
  );
}
