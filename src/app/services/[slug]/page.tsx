import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  getAllServices,
  getAllSectors,
  getServiceWithCategoriesAndProjects,
  getLedgerByService,
  getCaseStudyHrefsByLedgerId,
  getSectorSlugById,
} from "@/lib/cms";
import { serviceParamFromId } from "@/lib/ledger-filters";
import { Breadcrumb } from "@/components/site/breadcrumb";
import { RelatedProjects } from "@/components/site/related-projects";
import { ProjectLedger } from "@/components/site/project-ledger";
import { SubServicesList } from "@/components/site/sub-services-list";
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
            {service.tagline ?? service.blurb}
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

      {/* What we cover — one clean accordion, no internal taxonomy */}
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

      {/* How we approach the discipline overall */}
      {approachLead.length > 0 && (
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
                  How we engineer {inlineName(service.name)}.
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
              intro="Projects from the last decade with documented scope in this discipline, across every industry we serve."
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
                Explore every {inlineName(service.name)} project in the hub
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </div>
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
