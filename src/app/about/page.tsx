import { HISTORY } from "@/data/site-content";
import { InnerHero, InnerCTA, TextLink } from "@/components/site/inner-page";
import { CompanySubnav } from "@/components/site/company-subnav";
import { pageMetadata } from "@/lib/page-metadata";
export const metadata = pageMetadata(
  "About Unique",
  "Our story: from specialist HVAC contracting to integrated MEPF engineering across India.",
  "/about",
);
export default function AboutPage() {
  return (
    <>
      <InnerHero
        eyebrow="About Unique"
        title="An engineering firm. Built on delivery."
        description="Unique Engineers is a Gurugram-based MEP firm delivering mechanical, electrical, plumbing and fire protection systems across India. Civil, building controls, solar and process engineering complete our integrated offering."
      />
      <CompanySubnav current="/about" />
      <section className="ue-section">
        <div className="ue-container ue-inner-split">
          <div>
            <p className="ue-eyebrow">Who we are</p>
            <h2 className="ue-h2">Specialist roots. Broader capability.</h2>
          </div>
          <div className="ue-inner-copy">
            <p>
              Our practice began with HVAC engineering. As our clients’ projects
              grew more complex, we brought more of the building’s services into
              one coordinated scope.
            </p>
            <p>
              Today, we work across industrial facilities, data centres,
              airports, hospitals, universities and commercial developments.
              Engineering, procurement and site teams carry the work through
              installation, testing and handover.
            </p>
            <TextLink href="/services">What we do</TextLink>
          </div>
        </div>
      </section>
      <section id="history" className="ue-section ue-inner-soft">
        <div className="ue-container">
          <p className="ue-eyebrow">Our history</p>
          <h2 className="ue-h2">How the practice grew.</h2>
          <ol className="ue-inner-timeline">
            {HISTORY.map((m) => (
              <li key={m.year}>
                <span className="ue-inner-timeline__track" aria-hidden="true">
                  <span className="ue-inner-timeline__fill" />
                </span>
                <time>{m.year}</time>
                <div>
                  <h3>{m.title}</h3>
                  <p>{m.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <section className="ue-section">
        <div className="ue-container ue-inner-split">
          <div>
            <p className="ue-eyebrow">People & practice</p>
            <h2 className="ue-h2">
              Clear responsibility, through every stage.
            </h2>
          </div>
          <div className="ue-inner-copy">
            <p>
              Our directors and functional leaders connect project decisions
              with engineering, commercial and site requirements. Quality,
              safety and commissioning are built into the delivery process.
            </p>
            <div style={{ display: "flex", gap: 28, flexWrap: "wrap" }}>
              <TextLink href="/leadership">Meet our leadership</TextLink>
              <TextLink href="/approach">How we deliver</TextLink>
            </div>
          </div>
        </div>
      </section>
      <InnerCTA />
    </>
  );
}
