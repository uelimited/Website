import Image from "next/image";
import { notFound } from "next/navigation";
import { getAllProjects, getProjectWithContext } from "@/lib/cms";
import { PROJECT_BRIEFS } from "@/data/project-briefs";
import { InnerHero, InnerCTA, TextLink } from "@/components/site/inner-page";
import { RelatedProjects } from "@/components/site/related-projects";
import { pageMetadata } from "@/lib/page-metadata";
import { CAP_PROJECTS, getCapProject } from "@/data/capability/projects";
import type { CapProject } from "@/data/capability/types";
import { CapShowcase } from "@/components/capability/cap-showcase";
import type { Project } from "@/data/cms/types";
type Props = { params: Promise<{ slug: string }> };
const valid = (text?: string | null) =>
  Boolean(text && !/confirm|placeholder|pending/i.test(text));
function brief(p: Project) {
  return (
    PROJECT_BRIEFS[p.slug] ||
    `${p.scope_tags.filter(valid).join(", ")} works for ${p.name}.`
  );
}
/**
 * What the capability decks record for this project: facts, highlights and
 * the scope of work by service (src/data/capability/projects.ts). The
 * industry pages link here, so this page is where that detail is told.
 * A project can have a second entry for its BMS and ELV package.
 */
function deckRecords(slug: string): CapProject[] {
  const all = Object.values(CAP_PROJECTS)
    .filter((p) => p.href === `/projects/${slug}`)
    .map((p) => getCapProject(p.id));
  const main = all.filter((p) => !p.id.startsWith("bms-"));
  const bms = all.filter((p) => p.id.startsWith("bms-"));
  if (all.length < 2) return all;
  return [
    ...main.map((p) => ({ ...p, short: "Overview" })),
    ...bms.map((p) => ({ ...p, short: "BMS and ELV" })),
  ];
}

/** Deck projects that have no record in the project archive. */
function deckOnlySlugs(): string[] {
  const known = new Set(getAllProjects().map((p) => p.slug));
  const slugs = Object.values(CAP_PROJECTS)
    .map((p) => p.href?.replace("/projects/", ""))
    .filter((s): s is string => !!s && !known.has(s));
  return [...new Set(slugs)];
}

const factOf = (p: CapProject, test: RegExp) =>
  p.facts.find((f) => test.test(f.label))?.value;

export function generateStaticParams() {
  return [
    ...getAllProjects().map((p) => ({ slug: p.slug })),
    ...deckOnlySlugs().map((slug) => ({ slug })),
  ];
}
export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const p = getProjectWithContext(slug)?.project;
  if (p)
    return pageMetadata(
      p.name,
      brief(p),
      `/projects/${p.slug}`,
      p.hero_image_url || undefined,
    );
  const deck = deckRecords(slug)[0];
  return deck
    ? pageMetadata(deck.name, deck.scope, `/projects/${slug}`, deck.image)
    : {};
}
export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const d = getProjectWithContext(slug);
  const deck = deckRecords(slug);
  if (!d) {
    if (!deck.length) notFound();
    return <DeckProjectPage projects={deck} />;
  }
  const { project: p, services, sectors, related } = d;
  const location = [p.location_city, p.location_state].filter(valid).join(", ");
  const gallery = p.gallery || [];
  return (
    <>
      <InnerHero
        eyebrow={p.project_type}
        title={`${p.name}.`}
        description={location}
        image={p.hero_image_url || undefined}
        back={{ label: "Projects", href: "/projects" }}
      />
      <section className="ue-section">
        <div className="ue-container">
          <div className="ue-inner-split">
            <div>
              <p className="ue-eyebrow">The project</p>
              <h2 className="ue-h2">Our role.</h2>
            </div>
            <div className="ue-inner-copy">
              <p>{brief(p)}</p>
              <ul className="ue-inner-scope">
                {p.scope_tags.filter(valid).map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </div>
          </div>
          {deck.length === 0 && (
            <dl className="ue-inner-meta">
              {valid(p.client_name_display) && (
                <div>
                  <dt>Client</dt>
                  <dd>{p.client_name_display}</dd>
                </div>
              )}
              {location && (
                <div>
                  <dt>Location</dt>
                  <dd>{location}</dd>
                </div>
              )}
              <div>
                <dt>Industry</dt>
                <dd>
                  {sectors.map((s) => s.sector.name).join(" · ") ||
                    p.project_type}
                </dd>
              </div>
            </dl>
          )}
        </div>
      </section>
      {deck.length > 0 && (
        <section className="ue-section ue-inner-soft ue-cap">
          <div className="ue-container">
            <div className="ue-inner-head">
              <div>
                <p className="ue-eyebrow">Project overview</p>
                <h2 className="ue-h2">Facts and scope of work.</h2>
              </div>
            </div>
            <CapShowcase projects={deck} hideHead hideMedia />
          </div>
        </section>
      )}
      {(gallery.length > 0 || p.video_url) && (
        <section className="ue-section ue-inner-soft">
          <div className="ue-container">
            <div className="ue-inner-head">
              <div>
                <p className="ue-eyebrow">Project gallery</p>
                <h2 className="ue-h2">A closer look at the work.</h2>
              </div>
            </div>
            <div className="ue-inner-gallery">
              {gallery.map((img, i) => (
                <figure key={img.src}>
                  <a
                    href={img.src}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Open ${p.name} project image ${i + 1}`}
                  >
                    <Image
                      src={img.src}
                      alt={`${p.name} — project image ${i + 1}`}
                      fill
                      sizes="(max-width:640px) 100vw,50vw"
                    />
                  </a>
                  <figcaption>
                    {p.name} · {String(i + 1).padStart(2, "0")}
                  </figcaption>
                </figure>
              ))}
            </div>
            {p.video_url && (
              <video
                className="ue-inner-video"
                controls
                playsInline
                preload="none"
                poster={p.hero_image_url || undefined}
                aria-label={`${p.name} project video`}
              >
                <source src={p.video_url} type="video/mp4" />
                Your browser does not support this video.{" "}
                <a href={p.video_url}>Open project video</a>
              </video>
            )}
            <p style={{ fontSize: 13, color: "var(--ink-500)", marginTop: 20 }}>
              Project imagery may include site photographs and architectural
              visualisations.
            </p>
          </div>
        </section>
      )}
      <section className="ue-section">
        <div className="ue-container">
          <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
            {services.map((s) => (
              <TextLink key={s.service.id} href={`/services/${s.service.slug}`}>
                {s.service.name}
              </TextLink>
            ))}
          </div>
          <RelatedProjects
            projects={related
              .filter((p) => p.information_status !== "placeholder")
              .slice(0, 3)}
            heading="Related projects."
          />
          <div style={{ marginTop: 32 }}>
            <TextLink href="/projects">Back to all projects</TextLink>
          </div>
        </div>
      </section>
      <InnerCTA topic={p.name} />
    </>
  );
}

/**
 * A project the decks describe but the project archive does not hold yet.
 * The whole page comes from the deck entry.
 */
function DeckProjectPage({ projects }: { projects: CapProject[] }) {
  const p = projects[0];
  return (
    <>
      <InnerHero
        eyebrow={factOf(p, /^facility$/i) || "Project"}
        title={`${p.name}.`}
        description={factOf(p, /^location$/i) || ""}
        back={{ label: "Projects", href: "/projects" }}
      />
      <section className="ue-section">
        <div className="ue-container">
          <div className="ue-inner-split">
            <div>
              <p className="ue-eyebrow">The project</p>
              <h2 className="ue-h2">Our role.</h2>
            </div>
            <div className="ue-inner-copy">
              {p.lede && <p>{p.lede}</p>}
              <p>{p.scope}</p>
            </div>
          </div>
        </div>
      </section>
      <section className="ue-section ue-inner-soft ue-cap">
        <div className="ue-container">
          <div className="ue-inner-head">
            <div>
              <p className="ue-eyebrow">Project overview</p>
              <h2 className="ue-h2">Facts and scope of work.</h2>
            </div>
          </div>
          <CapShowcase
            projects={projects.map((x) => ({ ...x, scope: "" }))}
            hideHead
          />
        </div>
      </section>
      <section className="ue-section">
        <div className="ue-container">
          <TextLink href="/projects">Back to all projects</TextLink>
        </div>
      </section>
      <InnerCTA topic={p.name} />
    </>
  );
}
