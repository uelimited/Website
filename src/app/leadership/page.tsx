import { DIRECTORS, LEADERS } from "@/data/site-content";
import { InnerHero, InnerCTA } from "@/components/site/inner-page";
import { CompanySubnav } from "@/components/site/company-subnav";
import { pageMetadata } from "@/lib/page-metadata";
export const metadata = pageMetadata(
  "Leadership",
  "Meet the directors and functional leaders at Unique Engineers.",
  "/leadership",
);
export default function LeadershipPage() {
  return (
    <>
      <InnerHero
        eyebrow="Our people"
        title="The people behind the practice."
        description="Leadership across engineering, projects, operations and the functions that support delivery."
      />
      <CompanySubnav current="/leadership" />
      <section className="ue-section">
        <div className="ue-container">
          <p className="ue-eyebrow">Directors</p>
          <div className="ue-inner-team">
            {DIRECTORS.map((p) => (
              <article className="ue-inner-person" key={p.name}>
                <h2>{p.name}</h2>
                <p className="role">{p.role}</p>
                <p>{p.remit}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="ue-section ue-inner-soft">
        <div className="ue-container">
          <p className="ue-eyebrow">Functional leadership</p>
          <div className="ue-inner-team">
            {LEADERS.map((p) => (
              <article className="ue-inner-person" key={p.name}>
                <h2>{p.name}</h2>
                <p className="role">{p.role}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <InnerCTA />
    </>
  );
}
