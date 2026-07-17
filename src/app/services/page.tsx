import {
  getAllServices,
  getLedgerStats,
  getLedgerStatsForService,
} from "@/lib/cms";
import {
  ServicesExplorer,
  type ExplorerService,
} from "@/components/site/services-explorer";
import { ContactCTA } from "@/components/site/contact-cta";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Capabilities — Unique Engineers",
  description:
    "Eight disciplines under one delivery standard: civil, HVAC, electrical, plumbing, firefighting, solar, building management and integrated O&M.",
};

// A live count only reads as credible once the ledger backfill for that
// discipline has a real sample size behind it — below this, the row
// stays clean rather than showing a thin, misleading number.
const MEANINGFUL_LEDGER_COUNT = 10;
const FOUNDING_SERVICE_ID = "svc-hvac";

export default function ServicesIndexPage() {
  const allServices = getAllServices();
  const firmStats = getLedgerStats();

  const services: ExplorerService[] = allServices.map((s) => {
    const ledger = getLedgerStatsForService(s.id);
    const proof =
      ledger.count >= MEANINGFUL_LEDGER_COUNT
        ? `${ledger.count} projects · ${ledger.total_display}`
        : null;
    return {
      slug: s.slug,
      num: s.num,
      name: s.name,
      blurb: s.blurb,
      tagline: s.tagline ?? s.blurb,
      hero_image_url: s.hero_image_url ?? null,
      proof,
      founding: s.id === FOUNDING_SERVICE_ID,
    };
  });

  return (
    <>
      <section className="ue-section">
        <div className="ue-container">
          <p className="ue-eyebrow">Capabilities</p>
          <h1 className="ue-h1" style={{ maxWidth: "16ch" }}>
            Eight disciplines. One delivery standard.
          </h1>
          <p className="ue-lead" style={{ marginTop: 32, maxWidth: "58ch" }}>
            Unique Engineers designs, builds and commissions every discipline
            in-house — the engineers who model the load are the ones on site
            when it&apos;s tested. HVAC has led since the firm&apos;s first job
            in 1990; the other seven grew up around it.
          </p>
          <p
            style={{
              marginTop: 16,
              fontFamily: "var(--font-mono)",
              fontSize: 13,
              letterSpacing: "0.01em",
              color: "var(--ink-500)",
            }}
          >
            {firmStats.count} projects · {firmStats.total_display} in cumulative
            contract value across the disciplines below
          </p>

          <ServicesExplorer services={services} />
        </div>
      </section>

      <ContactCTA />
    </>
  );
}
