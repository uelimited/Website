import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  getAllSectors,
  getAllServices,
  getSectorWithProjects,
  getLedgerBySector,
  getCaseStudyHrefsByLedgerId,
  getSectorSlugById,
} from "@/lib/cms";
import { Breadcrumb } from "@/components/site/breadcrumb";
import { RelatedProjects } from "@/components/site/related-projects";
import { ProjectLedger } from "@/components/site/project-ledger";
import { SystemCard } from "@/components/site/system-card";
import type { Metadata } from "next";

type Params = { slug: string };

export function generateStaticParams() {
  return getAllSectors().map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const data = getSectorWithProjects(slug);
  if (!data) return {};
  return {
    title: `${data.sector.name} — Unique Engineers`,
    description: data.sector.short_description,
  };
}

export default async function SectorDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const data = getSectorWithProjects(slug);
  if (!data) notFound();
  const { sector, projects, clients } = data;

  // Full order-book record for this sector (last 10 years).
  const ledger = getLedgerBySector(sector.id);
  const services = getAllServices();
  const serviceLabels = Object.fromEntries(
    services.map((s) => [s.id, s.short_name ?? s.name]),
  );
  const usedServiceIds = new Set(ledger.flatMap((e) => e.service_ids));
  const serviceFilter = services
    .filter((s) => usedServiceIds.has(s.id))
    .map((s) => ({ id: s.id, name: s.short_name ?? s.name }));
  const caseStudyHrefs = getCaseStudyHrefsByLedgerId();
  const sectorSlugById = getSectorSlugById();

  return (
    <>
      {sector.hero_image_url && (
        <section
          aria-hidden
          style={{
            height: "44vh",
            minHeight: 360,
            background: `linear-gradient(180deg, rgba(10,12,16,0.1) 0%, rgba(10,12,16,0.55) 100%), url(${sector.hero_image_url}) center/cover no-repeat`,
            borderBottom: "1px solid var(--border-color)",
          }}
        />
      )}
      <section className="ue-article-head">
        <div className="ue-container">
          <Breadcrumb
            items={[
              { label: "Sectors", href: "/sectors" },
              { label: sector.name },
            ]}
          />
          <h1
            className="ue-h1 ue-article-head__title"
            style={{ marginTop: 24 }}
          >
            {sector.name}.
          </h1>
          <p className="ue-lead ue-article-head__lead">
            {sector.short_description}
          </p>

          {(sector.projects_count_override ||
            sector.revenue_cr_override) && (
            <div
              style={{
                marginTop: 48,
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 0,
                borderTop: "1px solid var(--border-color)",
                borderBottom: "1px solid var(--border-color)",
              }}
            >
              <Stat
                label="Projects delivered"
                value={
                  sector.projects_count_override ?? String(projects.length)
                }
              />
              <Stat
                label="Cumulative revenue"
                value={sector.revenue_cr_override ?? "—"}
              />
              <Stat
                label="Active clients"
                value={String(clients.length || "—")}
              />
            </div>
          )}
        </div>
      </section>

      {/* Long description */}
      <section style={{ padding: "48px 0 0" }}>
        <div className="ue-container" style={{ maxWidth: 820 }}>
          <p className="ue-eyebrow">Sector overview</p>
          <p
            style={{
              marginTop: 16,
              fontSize: 18,
              lineHeight: 1.6,
              color: "var(--ink-700)",
            }}
          >
            {sector.long_description}
          </p>
        </div>
      </section>

      {/* Sections (for deep_page sectors) */}
      {sector.sections && sector.sections.length > 0 && (
        <section className="ue-section">
          <div className="ue-container">
            {sector.sections.map((s, i) => (
              <div key={i} style={{ marginBottom: 80 }}>
                <header style={{ marginBottom: 24 }}>
                  <p className="ue-eyebrow">
                    {String(i + 1).padStart(2, "0")} · {s.heading}
                  </p>
                  <h2
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 500,
                      fontSize: 32,
                      letterSpacing: "-0.022em",
                      lineHeight: 1.1,
                      margin: "8px 0 0",
                      color: "var(--ink-950)",
                      maxWidth: "22ch",
                    }}
                  >
                    {s.heading}
                  </h2>
                </header>
                <div style={{ maxWidth: 820 }}>
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
                {s.systems && s.systems.length > 0 && (
                  <div
                    style={{
                      marginTop: 32,
                      display: "grid",
                      gridTemplateColumns:
                        "repeat(auto-fit, minmax(280px, 1fr))",
                      gap: 16,
                    }}
                  >
                    {s.systems.map((sys) => (
                      <SystemCard key={sys.name} system={sys} />
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Featured clients */}
      {clients.length > 0 && (
        <section
          className="ue-section"
          style={{
            background: "var(--paper-soft)",
            borderTop: "1px solid var(--border-color)",
            borderBottom: "1px solid var(--border-color)",
          }}
        >
          <div className="ue-container">
            <header style={{ marginBottom: 32 }}>
              <p className="ue-eyebrow">Selected clients</p>
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 500,
                  fontSize: 28,
                  letterSpacing: "-0.022em",
                  lineHeight: 1.1,
                  margin: "8px 0 0",
                  color: "var(--ink-950)",
                  maxWidth: "26ch",
                }}
              >
                Trusted by operators in this sector.
              </h2>
            </header>
            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit, minmax(160px, 1fr))",
                gap: 16,
              }}
            >
              {clients.map((c) => (
                <div
                  key={c.id}
                  style={{
                    padding: "20px 18px",
                    background: "var(--paper)",
                    border: "1px solid var(--border-color)",
                    borderRadius: 10,
                    textAlign: "center",
                    fontFamily: "var(--font-display)",
                    fontWeight: 500,
                    fontSize: 15,
                    letterSpacing: "-0.012em",
                    color: "var(--ink-700)",
                  }}
                >
                  {c.name}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Projects in this sector */}
      {projects.length > 0 && (
        <section className="ue-section">
          <div className="ue-container">
            <RelatedProjects
              projects={projects}
              eyebrow="Sector record"
              heading={`${sector.name} — selected projects.`}
            />
          </div>
        </section>
      )}

      {/* Full order-book record for this sector */}
      {ledger.length > 0 && (
        <section
          className="ue-section"
          style={{
            background: "var(--paper-soft)",
            borderTop: "1px solid var(--border-color)",
            borderBottom: "1px solid var(--border-color)",
          }}
        >
          <div className="ue-container">
            <ProjectLedger
              entries={ledger}
              serviceLabels={serviceLabels}
              eyebrow="Full record · last 10 years"
              heading={`Every ${sector.name.toLowerCase()} project.`}
              intro="The complete list from our order book — consolidated by site, largest first."
              serviceFilter={serviceFilter}
              showSectorTag={false}
              enableSearch={ledger.length > 10}
              initialCount={12}
              caseStudyHrefs={caseStudyHrefs}
              sectorSlugById={sectorSlugById}
            />
            <div style={{ marginTop: 36 }}>
              <Link
                href={`/work?sector=${sector.slug}`}
                className="inline-flex items-center gap-2 text-[14px] font-medium text-[color:var(--accent-500)] hover:text-[color:var(--accent-700)]"
              >
                Explore {sector.name.toLowerCase()} in the full project hub
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
            Sector enquiry
          </p>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 500,
              fontSize: 44,
              letterSpacing: "-0.022em",
              lineHeight: 1.05,
              margin: 0,
              maxWidth: "20ch",
            }}
          >
            Building in {sector.name.toLowerCase()}? Let&apos;s talk.
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

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div
      style={{
        padding: "20px 24px 20px 0",
        borderRight: "1px solid var(--border-color)",
      }}
    >
      <div
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 500,
          fontSize: 28,
          letterSpacing: "-0.022em",
          lineHeight: 1.1,
          color: "var(--ink-950)",
        }}
      >
        {value}
      </div>
      <div
        style={{
          marginTop: 4,
          fontSize: 13,
          color: "var(--ink-500)",
        }}
      >
        {label}
      </div>
    </div>
  );
}
