import { notFound } from "next/navigation";
import {
  getAllSectors,
  getSectorWithProjects,
  getAllProjects,
  getSectorsForProject,
} from "@/lib/cms";
import { InnerCTA, TextLink } from "@/components/site/inner-page";
import { CapTiles } from "@/components/capability/cap-parts";
import { archiveTiles } from "@/components/capability/archive-tiles";
import { CapabilityPage } from "@/components/capability/capability-page";
import { getIndustryPage } from "@/data/capability/industries";
import { getCapProject } from "@/data/capability/projects";
import { pageMetadata } from "@/lib/page-metadata";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllSectors().map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const s = getSectorWithProjects(slug)?.sector;
  const page = getIndustryPage(slug);
  return s
    ? pageMetadata(
        s.name,
        page?.description || s.short_description,
        `/sectors/${s.slug}`,
        s.hero_image_url || undefined,
      )
    : {};
}

/**
 * Industry page: what we deliver (the 3D building), our experience and
 * why Unique. The content is held in src/data/capability/industries.ts.
 * The photograph and the extra project tiles come from the CMS.
 */
export default async function SectorPage({ params }: Props) {
  const { slug } = await params;
  const data = getSectorWithProjects(slug);
  const page = getIndustryPage(slug);
  if (!data || !page) notFound();
  const { sector } = data;

  const projects = getAllProjects()
    .filter((p) =>
      getSectorsForProject(p.id).some((s) => s.sector.id === sector.id),
    )
    .filter((p) => p.published && p.information_status !== "placeholder");
  // Under "Our experience": where the page lists no further projects of
  // its own, four more come from the project archive.
  const exp = page.blocks.find((b) => b.kind === "experience");
  const featured = new Set(
    exp?.kind === "experience"
      ? (exp.projects ?? []).map((id) => getCapProject(id).href)
      : [],
  );
  const listsMore = exp?.kind === "experience" && !!exp.more?.length;
  const shown = listsMore
    ? []
    : archiveTiles(projects)
        .filter((t) => !featured.has(t.href))
        .slice(0, 4);

  return (
    <>
      <CapabilityPage
        page={{
          ...page,
          image: page.image || sector.hero_image_url || undefined,
        }}
        parent={{ label: "Industries", href: "/sectors" }}
        slots={{
          experience: (
            <>
              {shown.length > 0 && (
                <div className="ue-cap-also">
                  <p className="ue-cap-label">More from the project archive</p>
                  <CapTiles items={shown} columns={4} />
                </div>
              )}
              <div className="ue-cap-links">
                <TextLink href={`/projects?sector=${slug}`}>
                  Explore the project record
                </TextLink>
              </div>
            </>
          ),
        }}
      />
      <InnerCTA topic={sector.name} />
    </>
  );
}
