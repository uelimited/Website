import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Breadcrumb } from "@/components/site/breadcrumb";
import { ProjectLedger } from "@/components/site/project-ledger";
import {
  getProjectLedger,
  getLedgerStats,
  getAllSectors,
  getAllServices,
} from "@/lib/cms";

export const metadata: Metadata = {
  title: "Track Record — Every project, last 10 years | Unique Engineers",
  description:
    "The full order book: every project Unique Engineers has delivered over the last decade, filterable by industry and service — from data centres and semiconductor fabs to hospitals, universities and airports.",
};

export default function TrackRecordPage() {
  const ledger = getProjectLedger();
  const stats = getLedgerStats();
  const sectors = getAllSectors();
  const services = getAllServices();

  const sectorLabels = Object.fromEntries(sectors.map((s) => [s.id, s.name]));
  const serviceLabels = Object.fromEntries(
    services.map((s) => [s.id, s.short_name ?? s.name]),
  );

  // Only offer filter chips for sectors / services that actually appear.
  const usedSectorIds = new Set(ledger.map((e) => e.sector_id));
  const usedServiceIds = new Set(ledger.flatMap((e) => e.service_ids));
  const sectorFilter = sectors
    .filter((s) => usedSectorIds.has(s.id))
    .map((s) => ({ id: s.id, name: s.name }));
  const serviceFilter = services
    .filter((s) => usedServiceIds.has(s.id))
    .map((s) => ({ id: s.id, name: s.short_name ?? s.name }));

  return (
    <>
      <section className="ue-article-head">
        <div className="ue-container">
          <Breadcrumb items={[{ label: "Track record" }]} />
          <h1 className="ue-h1 ue-article-head__title" style={{ marginTop: 24 }}>
            The full track record.
          </h1>
          <p className="ue-lead ue-article-head__lead">
            Beyond the featured case studies — this is the complete order book.
            Every project we&apos;ve delivered over the last decade, across nine
            industries, filterable and searchable.
          </p>

          <div
            style={{
              marginTop: 48,
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              borderTop: "1px solid var(--border-color)",
              borderBottom: "1px solid var(--border-color)",
            }}
          >
            <HeadStat label="Projects delivered" value={`${stats.count}`} />
            <HeadStat label="Cumulative contract value" value={stats.total_display} />
            <HeadStat label="Industries served" value={`${usedSectorIds.size}`} />
          </div>
        </div>
      </section>

      <section style={{ padding: "56px 0 96px" }}>
        <div className="ue-container">
          <ProjectLedger
            entries={ledger}
            sectorLabels={sectorLabels}
            serviceLabels={serviceLabels}
            eyebrow="Order book · last 10 years"
            heading="Every project, one list."
            intro="Repeat purchase orders for the same site are consolidated; contract values are aggregated. Search or filter to narrow by industry or service."
            sectorFilter={sectorFilter}
            serviceFilter={serviceFilter}
            showSectorTag
            showMetrics={false}
            enableSearch
            initialCount={30}
          />
        </div>
      </section>

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
            Featured work
          </p>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 500,
              fontSize: 44,
              letterSpacing: "-0.022em",
              lineHeight: 1.05,
              margin: 0,
              maxWidth: "22ch",
            }}
          >
            See the landmark mandates in depth.
          </h2>
          <Button
            asChild
            className="rounded-full h-12 px-7 text-[15px] font-medium bg-[color:var(--paper)] text-[color:var(--ink-950)] hover:bg-[color:var(--ink-100)]"
          >
            <Link href="/projects">
              View case studies
              <ArrowRight className="size-4 ml-1" aria-hidden />
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
}

function HeadStat({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ padding: "20px 24px 20px 0", borderRight: "1px solid var(--border-color)" }}>
      <div
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 500,
          fontSize: 28,
          letterSpacing: "-0.022em",
          lineHeight: 1.1,
          color: "var(--ink-950)",
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {value}
      </div>
      <div style={{ marginTop: 4, fontSize: 13, color: "var(--ink-500)" }}>
        {label}
      </div>
    </div>
  );
}
