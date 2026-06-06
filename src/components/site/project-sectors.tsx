import { SECTORS } from "@/data/firm";

/**
 * Project sectors — two-column block shown after Capabilities on the
 * home page. Left column carries the section title and lead; right
 * column is a vertical stack of sector cards, each with a dark
 * banner + stats and a row of client-logo placeholders.
 *
 * Logos are solid-colour placeholders for now; swap to real brand
 * marks when assets are ready.
 */
export function ProjectSectors() {
  return (
    <section className="ue-sectors">
      <div className="ue-container">
        <div className="ue-sectors__layout">
          <div className="ue-sectors__head">
            <h2 className="ue-h2 ue-sectors__title">
              Project
              <br />
              Sectors
            </h2>
            <p className="ue-sectors__lead">
              Unique Engineers has successfully delivered projects across
              multiple sectors including aviation, semiconductor manufacturing,
              commercial real estate, education, healthcare, and government
              infrastructure. Our cross-sector experience reflects engineering
              depth, operational discipline, and the ability to execute complex
              MEPF systems at scale.
            </p>
          </div>

          <div className="ue-sectors__list">
            {SECTORS.map((s) => (
              <article key={s.title} className="ue-sector-card">
                <div className="ue-sector-card__header">
                  <h3 className="ue-sector-card__title">{s.title}</h3>
                  <div className="ue-sector-card__stats">
                    <span>
                      <strong>{s.projects}</strong> Projects Completed
                    </span>
                    <span aria-hidden>|</span>
                    <span>
                      <strong>{s.revenue}</strong> Total Revenue
                    </span>
                  </div>
                </div>
                <div
                  className="ue-sector-card__clients"
                  role="list"
                  aria-label={`${s.title} clients`}
                >
                  {Array.from({ length: s.clients }).map((_, i) => (
                    <div
                      key={i}
                      role="listitem"
                      className="ue-sector-card__client"
                      aria-label="Client logo placeholder"
                    />
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
