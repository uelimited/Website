import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getLandmarkProjects, getClientById } from "@/lib/cms";

/**
 * "Landmark projects" — home-page showcase of flagship mandates.
 *
 * Pulls from the CMS (featured + landmark_order). Layout: the first
 * entry is a wide featured card; the remaining entries fill a 2×2 grid
 * below it. Each card distils the project into a short narrative plus
 * a metadata row (value · timeline · type) and scope chips. Every card
 * links to its case-study page.
 */
export function LandmarkProjects() {
  const projects = getLandmarkProjects().slice(0, 5);
  const [featured, ...rest] = projects;

  return (
    <section id="landmark-projects" className="ue-landmark">
      <div className="ue-container">
        <div className="ue-landmark__head">
          <div>
            <p className="ue-eyebrow">Landmark projects</p>
            <h2 className="ue-h2 ue-landmark__title">
              Benchmarks of capability.
            </h2>
          </div>
          <p className="ue-landmark__kicker">
            A select group of mandates that defined the firm&apos;s evolution —
            precision engineering, disciplined execution, and large-scale
            coordination across sectors.
          </p>
        </div>

        {featured && (
          <Link
            href={`/projects/${featured.slug}`}
            className="ue-landmark__featured group"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div
              className="ue-landmark__cover ue-landmark__cover--featured"
              style={{
                background: featured.hero_image_url
                  ? `linear-gradient(180deg, rgba(10,12,16,0) 60%, rgba(10,12,16,0.4) 100%), url(${featured.hero_image_url}) center/cover no-repeat`
                  : undefined,
              }}
            >
              {!featured.hero_image_url && <div className="ue-photo" />}
              <span className="ue-landmark__tag">Featured mandate</span>
            </div>
            <div className="ue-landmark__body">
              <div className="ue-landmark__client">
                {getClientById(featured.client_id ?? "")?.name ??
                  featured.client_name_display ??
                  ""}
              </div>
              <h3 className="ue-landmark__name">{featured.name}</h3>
              <p className="ue-landmark__loc">
                {featured.location_city}
                {featured.location_state ? `, ${featured.location_state}` : ""}
              </p>
              <p className="ue-landmark__summary">{featured.summary}</p>
              <dl className="ue-landmark__specs">
                {featured.value_display && (
                  <div>
                    <dt>Value</dt>
                    <dd>{featured.value_display}</dd>
                  </div>
                )}
                {featured.timeline_text && (
                  <div>
                    <dt>Timeline</dt>
                    <dd>{featured.timeline_text}</dd>
                  </div>
                )}
                <div>
                  <dt>Type</dt>
                  <dd>{featured.project_type}</dd>
                </div>
              </dl>
              <ul className="ue-landmark__scope">
                {featured.scope_tags.slice(0, 7).map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </div>
          </Link>
        )}

        <div className="ue-landmark__grid">
          {rest.map((p) => (
            <Link
              key={p.id}
              href={`/projects/${p.slug}`}
              className="ue-landmark__card group"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div
                className="ue-landmark__cover"
                style={{
                  background: p.hero_image_url
                    ? `url(${p.hero_image_url}) center/cover no-repeat`
                    : undefined,
                }}
              >
                {!p.hero_image_url && <div className="ue-photo" />}
              </div>
              <div className="ue-landmark__body">
                <div className="ue-landmark__client">
                  {getClientById(p.client_id ?? "")?.name ??
                    p.client_name_display ??
                    ""}
                </div>
                <h3 className="ue-landmark__name ue-landmark__name--sm">
                  {p.name}
                </h3>
                <p className="ue-landmark__loc">
                  {p.location_city}
                  {p.location_state ? `, ${p.location_state}` : ""}
                </p>
                <p className="ue-landmark__summary ue-landmark__summary--sm">
                  {p.summary}
                </p>
                <dl className="ue-landmark__specs ue-landmark__specs--sm">
                  {p.value_display && (
                    <div>
                      <dt>Value</dt>
                      <dd>{p.value_display}</dd>
                    </div>
                  )}
                  {p.timeline_text && (
                    <div>
                      <dt>Timeline</dt>
                      <dd>{p.timeline_text}</dd>
                    </div>
                  )}
                  <div>
                    <dt>Type</dt>
                    <dd>{p.project_type}</dd>
                  </div>
                </dl>
                <ul className="ue-landmark__scope">
                  {p.scope_tags.slice(0, 5).map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              </div>
            </Link>
          ))}
        </div>

        <div className="ue-landmark__foot">
          <Link href="/projects" className="ue-landmark__more">
            Review full project record
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}
