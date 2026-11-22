import { notFound } from "next/navigation";
import {
  getAllSectors,
  getSectorWithProjects,
  getAllProjects,
  getSectorsForProject,
} from "@/lib/cms";
import { InnerHero, InnerCTA, TextLink } from "@/components/site/inner-page";
import { RelatedProjects } from "@/components/site/related-projects";
import { pageMetadata } from "@/lib/page-metadata";
type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() {
  return getAllSectors().map((s) => ({ slug: s.slug }));
}
export async function generateMetadata({ params }: Props) {
  const s = getSectorWithProjects((await params).slug)?.sector;
  return s
    ? pageMetadata(
        s.name,
        s.short_description,
        `/sectors/${s.slug}`,
        s.hero_image_url || undefined,
      )
    : {};
}
const focus: Record<string, string[]> = {
  "data-centre": [
    "Cooling and thermal management",
    "Critical power distribution",
    "Fire protection and early detection",
    "BMS and monitoring interfaces",
    "Integrated testing and commissioning",
  ],
  "semiconductor-cleanroom": [
    "Cleanroom air systems",
    "Process cooling and utility piping",
    "Electrical distribution",
    "Fire protection",
    "Building and process controls",
  ],
  "industrial-manufacturing": [
    "Process cooling and ventilation",
    "Power distribution",
    "Utility and process pipework",
    "Fire protection",
    "Equipment foundations and enabling works",
  ],
  "airport-public-venues": [
    "Large-volume air conditioning",
    "Smoke management and fire protection",
    "Electrical and lighting systems",
    "Water supply and drainage",
    "Building controls and commissioning",
  ],
  "education-research": [
    "Campus cooling and ventilation",
    "Laboratory and research environments",
    "Power and lighting",
    "Water and fire systems",
    "Campus controls and monitoring",
  ],
  "corporate-retail": [
    "Air conditioning and occupant comfort",
    "Electrical and lighting systems",
    "Water supply and drainage",
    "Fire and life safety",
    "Controls, security and energy monitoring",
  ],
  healthcare: [
    "Clinical ventilation and pressure control",
    "Cooling plants and distribution",
    "Electrical services",
    "Fire and water systems",
    "Building controls and testing",
  ],
  hospitality: [
    "Guest and public-area conditioning",
    "Kitchen and back-of-house ventilation",
    "Hot and cold water systems",
    "Electrical and lighting",
    "Fire protection and building controls",
  ],
  residential: [
    "Apartment and common-area cooling",
    "Electrical distribution",
    "Domestic water and drainage",
    "Fire protection",
    "Building controls",
  ],
};
export default async function SectorPage({ params }: Props) {
  const { slug } = await params;
  const data = getSectorWithProjects(slug);
  if (!data) notFound();
  const { sector } = data;
  const projects = getAllProjects()
    .filter((p) =>
      getSectorsForProject(p.id).some((s) => s.sector.id === sector.id),
    )
    .slice(0, 3);
  return (
    <>
      <InnerHero
        eyebrow="Industries we serve"
        title={`${sector.name}.`}
        description={sector.short_description}
        image={sector.hero_image_url || undefined}
        back={{ label: "Industries", href: "/sectors" }}
      />
      <section className="ue-section">
        <div className="ue-container ue-inner-split">
          <div>
            <p className="ue-eyebrow">Engineering focus</p>
            <h2 className="ue-h2">Systems shaped around the facility.</h2>
          </div>
          <ul className="ue-inner-scope">
            {(focus[slug] || []).map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </div>
      </section>
      <section className="ue-section ue-inner-soft">
        <div className="ue-container">
          {projects.length > 0 ? (
            <RelatedProjects
              projects={projects}
              eyebrow="Selected work"
              heading="Experience in this industry."
            />
          ) : (
            <>
              <h2 className="ue-h2">Discuss your facility with us.</h2>
              <p className="ue-lead">
                Our team can review the scope and relevant project experience
                with you.
              </p>
            </>
          )}
          <div
            style={{
              marginTop: 32,
              display: "flex",
              gap: 28,
              flexWrap: "wrap",
            }}
          >
            <TextLink href={`/projects?sector=${slug}`}>
              Explore the project record
            </TextLink>
            <TextLink href="/services">Explore our services</TextLink>
          </div>
        </div>
      </section>
      <InnerCTA topic={sector.name} />
    </>
  );
}
