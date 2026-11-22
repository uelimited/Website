import { notFound } from "next/navigation";
import {
  getAllServices,
  getCategoriesForService,
  getCategoryWithContextAndProjects,
} from "@/lib/cms";
import { InnerHero, InnerCTA, TextLink } from "@/components/site/inner-page";
import { RelatedProjects } from "@/components/site/related-projects";
import { pageMetadata } from "@/lib/page-metadata";
type Props = { params: Promise<{ slug: string; sub: string }> };
export function generateStaticParams() {
  return getAllServices().flatMap((s) =>
    getCategoriesForService(s.id).map((c) => ({ slug: s.slug, sub: c.slug })),
  );
}
export async function generateMetadata({ params }: Props) {
  const { slug, sub } = await params;
  const d = getCategoryWithContextAndProjects(slug, sub);
  return d
    ? pageMetadata(
        `${d.category.name} · ${d.service.name}`,
        d.category.short_blurb,
        `/services/${slug}/${sub}`,
      )
    : {};
}
export default async function CategoryPage({ params }: Props) {
  const { slug, sub } = await params;
  const d = getCategoryWithContextAndProjects(slug, sub);
  if (!d) notFound();
  const { category: c, service: s, projects } = d;
  return (
    <>
      <InnerHero
        eyebrow={s.name}
        title={`${c.name}.`}
        description={c.short_blurb}
        image={c.hero_image_url || s.hero_image_url || undefined}
        back={{ label: s.name, href: `/services/${slug}` }}
      />
      <section className="ue-section">
        <div className="ue-container">
          <div className="ue-inner-split">
            <div>
              <p className="ue-eyebrow">Systems & scope</p>
              <h2 className="ue-h2">What this covers.</h2>
            </div>
            <div>
              {c.systems.map((system) => (
                <details className="ue-inner-details" key={system.name}>
                  <summary>{system.name}</summary>
                  <p>{system.description}</p>
                </details>
              ))}
            </div>
          </div>
          {c.approach_paragraphs.length > 0 && (
            <details className="ue-inner-details">
              <summary>Engineering approach</summary>
              {c.approach_paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </details>
          )}
          {projects.length > 0 && (
            <RelatedProjects
              projects={projects
                .filter((p) => p.information_status !== "placeholder")
                .slice(0, 3)}
              heading="Related project experience."
            />
          )}
          <div style={{ marginTop: 32 }}>
            <TextLink href={`/services/${slug}`}>Back to {s.name}</TextLink>
          </div>
        </div>
      </section>
      <InnerCTA topic={`${s.name}: ${c.name}`} />
    </>
  );
}
