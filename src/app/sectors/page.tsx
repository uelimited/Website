import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  getAllSectors,
  getJourney,
  getLedgerStatsForSector,
} from "@/lib/cms";
import { FirmJourneyTimeline } from "@/components/site/firm-journey-timeline";
import type { Sector } from "@/data/cms/types";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sectors — Unique Engineers",
  description:
    "Nine sectors, proven by the order book — data centre, semiconductor & cleanroom, airport & public venues, healthcare and more, engineered to one delivery standard.",
};

/**
 * Lead with the highest-value, deepest-capability verticals; the rest
 * follow in their existing catalogue order. This is a page-local
 * presentation order only — it does not touch `sort_order` in the CMS,
 * which other surfaces (nav, home) still rely on.
 */
const PRIORITY_SLUGS = [
  "data-centre",
  "semiconductor-cleanroom",
  "airport-public-venues",
  "healthcare",
];

function withPriorityFirst(sectors: Sector[]): Sector[] {
  const bySlug = new Map(sectors.map((s) => [s.slug, s]));
  const priority = PRIORITY_SLUGS.map((slug) => bySlug.get(slug)).filter(
    (s): s is Sector => Boolean(s),
  );
  const rest = sectors.filter((s) => !PRIORITY_SLUGS.includes(s.slug));
  return [...priority, ...rest];
}

export default function SectorsIndexPage() {
  const sectors = withPriorityFirst(getAllSectors());
  const journey = getJourney();

  return (
    <>
      <section className="ue-section">
        <div className="ue-container">
        <p className="ue-eyebrow">Sectors</p>
        <h1 className="ue-h1" style={{ maxWidth: "18ch" }}>
          Nine sectors, one delivery standard.
        </h1>
        <p className="ue-lead" style={{ marginTop: 32, maxWidth: "62ch" }}>
          Data centres holding Tier-4 uptime, semiconductor cleanrooms built to
          ISO 6, airports finished inside compressed windows — Unique Engineers
          carries the same MEPF discipline into every sector it serves. Each
          page below opens with proof pulled straight from the order book.
        </p>

        <div
          style={{
            marginTop: 72,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: 24,
          }}
        >
          {sectors.map((s, i) => {
            const stats = getLedgerStatsForSector(s.id);
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
                      {String(i + 1).padStart(2, "0")}
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
                  {/* Live proof number, pulled from the order-book ledger —
                    e.g. "4 projects · ₹61 Cr". Never the marketing overrides. */}
                  <p
                    style={{
                      margin: 0,
                      paddingTop: 14,
                      borderTop: "1px solid var(--border-color)",
                      fontFamily: "var(--font-mono)",
                      fontSize: 15,
                      letterSpacing: "-0.006em",
                      color: "var(--ink-950)",
                    }}
                  >
                    {stats.count} project{stats.count === 1 ? "" : "s"}
                    <span style={{ color: "var(--fg-muted)" }}> · </span>
                    {stats.total_display}
                  </p>
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
      <FirmJourneyTimeline milestones={journey} />
    </>
  );
}
