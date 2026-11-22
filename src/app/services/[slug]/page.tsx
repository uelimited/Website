import { notFound } from "next/navigation";
import {
  getAllServices,
  getServiceWithCategoriesAndProjects,
  getProjectsByService,
} from "@/lib/cms";
import { SERVICES } from "@/data/site-content";
import { InnerHero, InnerCTA, TextLink } from "@/components/site/inner-page";
import { SubServicesList } from "@/components/site/sub-services-list";
import { RelatedProjects } from "@/components/site/related-projects";
import { pageMetadata } from "@/lib/page-metadata";
type Props = { params: Promise<{ slug: string }> };
const maintenance = {
  id: "svc-om",
  slug: "operations-maintenance",
  name: "Operations & Maintenance",
  description:
    "Planned maintenance, operational support and system checks throughout the life of a facility.",
  image: "/services/om-hero.jpg",
  scope: [
    "Preventive maintenance",
    "System inspections and fault diagnosis",
    "Performance monitoring",
    "Asset and maintenance records",
    "Shutdown planning",
    "Operator support",
  ],
};
function content(slug: string) {
  return [...SERVICES, maintenance].find((s) => s.slug === slug);
}
export function generateStaticParams() {
  return getAllServices().map((s) => ({ slug: s.slug }));
}
export async function generateMetadata({ params }: Props) {
  const s = content((await params).slug);
  return s
    ? pageMetadata(s.name, s.description, `/services/${s.slug}`, s.image)
    : {};
}
export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const s = content(slug);
  if (!s) notFound();
  const data = getServiceWithCategoriesAndProjects(slug);
  const image = data?.service.hero_image_url || s.image;
  const categories = data?.categories || [];
  const projects = getProjectsByService(s.id)
    .filter((p) => p.information_status !== "placeholder")
    .slice(0, 3);
  return (
    <>
      <InnerHero
        eyebrow="What we do"
        title={`${s.name}.`}
        description={s.description}
        image={image}
        back={{ label: "Services", href: "/services" }}
      />
      <section className="ue-section">
        <div className="ue-container ue-inner-split">
          <div>
            <p className="ue-eyebrow">Our scope</p>
            <h2 className="ue-h2">What we deliver.</h2>
          </div>
          <ul className="ue-inner-scope">
            {s.scope.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>
      {categories.length > 0 && (
        <section className="ue-section ue-inner-soft">
          <div className="ue-container">
            <div className="ue-inner-head">
              <div>
                <p className="ue-eyebrow">Explore the systems</p>
                <h2 className="ue-h2">A closer look.</h2>
              </div>
            </div>
            <SubServicesList
              items={categories.map((c) => ({
                slug: c.slug,
                num: c.num,
                name: c.name,
                blurb: c.short_blurb,
                href: `/services/${slug}/${c.slug}`,
              }))}
            />
          </div>
        </section>
      )}
      <section className="ue-section">
        <div className="ue-container">
          {projects.length > 0 && (
            <RelatedProjects
              projects={projects}
              eyebrow="Selected work"
              heading={`${s.name} in practice.`}
            />
          )}
          <div
            style={{
              marginTop: 32,
              display: "flex",
              gap: 28,
              flexWrap: "wrap",
            }}
          >
            <TextLink href={`/projects?service=${s.id.replace("svc-", "")}`}>
              Explore related projects
            </TextLink>
            <TextLink href="/approach">How we deliver</TextLink>
          </div>
        </div>
      </section>
      <InnerCTA topic={s.name} />
    </>
  );
}
