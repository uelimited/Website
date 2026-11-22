import { notFound } from "next/navigation";
import {
  getAllServices,
  getMethodStatementsForService,
  getProjectsByService,
  getServiceWithCategoriesAndProjects,
} from "@/lib/cms";
import { SERVICES } from "@/data/site-content";
import { InnerCTA, TextLink } from "@/components/site/inner-page";
import { SubServicesList } from "@/components/site/sub-services-list";
import { MethodStatementStrip } from "@/components/site/method-statement-strip";
import { CapabilityPage } from "@/components/capability/capability-page";
import { CapTiles } from "@/components/capability/cap-parts";
import { archiveTiles } from "@/components/capability/archive-tiles";
import { getServicePage } from "@/data/capability/services";
import { plain, plainSentence } from "@/data/capability/plain";
import { pageMetadata } from "@/lib/page-metadata";

type Props = { params: Promise<{ slug: string }> };

const maintenance = {
  id: "svc-om",
  slug: "operations-maintenance",
  name: "Operations & Maintenance",
  description:
    "Planned maintenance, operational support and system checks throughout the life of a facility.",
  image: "/services/om-hero.jpg",
};

/** Execution library filter for each service, where it has its own library. */
const LIBRARY: Record<string, string> = {
  "svc-civil": "civil",
  "svc-hvac": "hvac",
  "svc-electrical": "electrical",
  "svc-plumbing": "public-health",
  "svc-bms": "elv-bms",
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

/**
 * Service page. The figures and sections come from the capability
 * decks, held in src/data/capability/services.ts. The name, description,
 * photograph, sub disciplines, methods and case studies come from the
 * CMS and src/data/site-content.ts.
 */
export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const s = content(slug);
  const cap = getServicePage(slug);
  if (!s || !cap) notFound();

  const data = getServiceWithCategoriesAndProjects(slug);
  const image = data?.service.hero_image_url || s.image;
  const categories = data?.categories || [];
  const methods = getMethodStatementsForService(s.id);
  const projects = getProjectsByService(s.id).filter(
    (p) => p.information_status !== "placeholder",
  );
  const tiles = archiveTiles(projects);
  const shown = tiles.slice(0, tiles.length >= 6 ? 6 : 3);

  return (
    <>
      <CapabilityPage
        page={{
          slug,
          name: s.name,
          eyebrow: "What we do",
          title: `${s.name}.`,
          description: plainSentence(s.description),
          image,
          stats: cap.stats,
          blocks: cap.blocks,
        }}
        parent={{ label: "Services", href: "/services" }}
        slots={{
          subservices:
            categories.length > 0 ? (
              <SubServicesList
                items={categories.map((c) => ({
                  slug: c.slug,
                  num: c.num,
                  name: plain(c.name),
                  blurb: plainSentence(c.short_blurb),
                  href: `/services/${slug}/${c.slug}`,
                }))}
              />
            ) : undefined,
          methods:
            methods.length > 0 ? (
              <MethodStatementStrip
                serviceName={s.name}
                methods={methods}
                libraryHref={
                  LIBRARY[s.id]
                    ? `/execution-library?library=${LIBRARY[s.id]}`
                    : "/execution-library"
                }
              />
            ) : undefined,
          related: (
            <>
              {shown.length > 0 && <CapTiles items={shown} columns={3} />}
              <div
                className="ue-cap-links"
                style={shown.length ? undefined : { marginTop: 0 }}
              >
                <TextLink
                  href={`/projects?service=${s.id.replace("svc-", "")}`}
                >
                  Explore related projects
                </TextLink>
                <TextLink href="/approach">How we deliver</TextLink>
              </div>
            </>
          ),
        }}
      />
      <InnerCTA topic={s.name} />
    </>
  );
}
