import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { OVERVIEW } from "@/data/firm";
import { getAllSectors, getLedgerStatsForSector } from "@/lib/cms";
import { HeroVideo } from "@/components/site/hero-video";
import { StatsGrid } from "@/components/site/stat-counter";
import { ServicesScroll } from "@/components/site/services-scroll";
import { SectorsScroll } from "@/components/site/sectors-scroll";
import { WhyPillars } from "@/components/site/why-pillars";
import { LandmarkProjects } from "@/components/site/landmark-projects";
import { ClientsWall } from "@/components/site/clients-wall";
import { JourneyStrip } from "@/components/site/journey-strip";
import { TestimonialsBand } from "@/components/site/testimonials-band";
import { ContactCTA } from "@/components/site/contact-cta";

export default function HomePage() {
  // Live ledger stats, computed server-side, so the sectors carousel shows
  // real order-book figures instead of the legacy marketing overrides
  // (projects_count_override / revenue_cr_override) that don't reconcile
  // with the ₹3,422 Cr ledger total shown everywhere else on the site.
  const sectors = getAllSectors();
  const sectorStats = Object.fromEntries(
    sectors.map((s) => [s.id, getLedgerStatsForSector(s.id)]),
  );

  return (
    <>
      <HeroVideo />

      {/* Company overview — lead paragraph + CTA, then six headline figures */}
      <section className="ue-overview">
        <div className="ue-container">
          <h2 className="ue-h2 ue-overview__heading">Company Overview</h2>
          <div className="ue-overview__intro">
            <p className="ue-lead ue-overview__lead">{OVERVIEW.lead}</p>
            <div className="ue-overview__cta">
              <Button
                asChild
                className="rounded-full h-11 px-6 text-[15px] font-medium"
              >
                <Link href="/work">
                  Explore the work
                  <ArrowRight className="size-4 ml-1" aria-hidden />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="rounded-full h-11 px-6 text-[15px] font-medium border-[color:var(--border-strong)] text-[color:var(--ink-950)] bg-transparent hover:bg-[color:var(--ink-50)]"
              >
                <Link href="/services">Explore what we do</Link>
              </Button>
            </div>
          </div>
          <hr className="ue-rule ue-overview__rule" />
          <StatsGrid items={OVERVIEW.stats} />
        </div>
      </section>

      {/* Capabilities (top-level only — sub-discipline detail lives inside each service page) */}
      <ServicesScroll />

      {/* Sectors — pinned card with scroll-driven horizontal carousel */}
      <SectorsScroll sectors={sectors} sectorStats={sectorStats} />

      {/* Why Unique */}
      <WhyPillars />

      {/* Landmark projects — each card linked to its case-study page */}
      <LandmarkProjects />

      {/* Clients wall */}
      <ClientsWall />

      {/* Compressed journey strip */}
      <JourneyStrip />

      {/* Testimonials */}
      <TestimonialsBand />

      {/* Contact CTA */}
      <ContactCTA />
    </>
  );
}
