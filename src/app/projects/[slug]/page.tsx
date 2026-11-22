import Image from "next/image";
import { notFound } from "next/navigation";
import { getAllProjects, getProjectWithContext } from "@/lib/cms";
import { PROJECT_BRIEFS } from "@/data/project-briefs";
import { InnerHero, InnerCTA, TextLink } from "@/components/site/inner-page";
import { RelatedProjects } from "@/components/site/related-projects";
import { pageMetadata } from "@/lib/page-metadata";
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
export function generateStaticParams() {
  return getAllProjects().map((p) => ({ slug: p.slug }));
}
export async function generateMetadata({ params }: Props) {
  const p = getProjectWithContext((await params).slug)?.project;
  return p
    ? pageMetadata(
        p.name,
        brief(p),
        `/projects/${p.slug}`,
        p.hero_image_url || undefined,
      )
    : {};
}
export default async function ProjectPage({ params }: Props) {
  const d = getProjectWithContext((await params).slug);
  if (!d) notFound();
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
        </div>
      </section>
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
