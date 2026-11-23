import { ServicesExplorer } from "@/components/site/services-explorer";
import { SERVICES } from "@/data/site-content";
import { InnerHero, InnerCTA, TextLink } from "@/components/site/inner-page";
import { pageMetadata } from "@/lib/page-metadata";
export const metadata = pageMetadata(
  "Services",
  "Mechanical, electrical, fire, plumbing, building controls, civil, solar and process engineering services.",
  "/services",
);
export default function ServicesPage() {
  return (
    <>
      <InnerHero
        eyebrow="What we do"
        title="Integrated MEP. Specialist engineering."
        description="We design, install and commission building services. Eight connected disciplines bring the systems together, from the first drawing to handover."
      />
      <section className="ue-section" style={{ paddingTop: 0 }}>
        <div className="ue-container">
          <ServicesExplorer
            services={SERVICES.map((s, i) => ({
              slug: s.slug,
              num: String(i + 1).padStart(2, "0"),
              name: s.name,
              blurb: s.description,
              tagline: s.description,
              hero_image_url:
                s.id === "svc-hvac"
                  ? "/services/hvac-hero.jpg"
                  : s.id === "svc-civil"
                    ? "/services/civil-hero.jpg"
                    : s.image,
              founding: false,
            }))}
          />
          <div className="ue-inner-details">
            <h2 className="ue-h2">Support beyond handover.</h2>
            <p>
              Operations and maintenance help keep installed systems running as
              intended.
            </p>
            <TextLink href="/services/operations-maintenance">
              Operations & maintenance
            </TextLink>
          </div>
          <TextLink href="/execution-library">
            Explore our execution methods
          </TextLink>
        </div>
      </section>
      <InnerCTA />
    </>
  );
}
