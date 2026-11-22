import { InnerHero, InnerCTA, TextLink } from "@/components/site/inner-page";
import { CompanySubnav } from "@/components/site/company-subnav";
import { pageMetadata } from "@/lib/page-metadata";
export const metadata = pageMetadata(
  "How we deliver",
  "Engineering, project coordination, quality, safety and commissioning at Unique Engineers.",
  "/approach",
);
const stages = [
  {
    year: "01",
    title: "Understand and coordinate",
    text: "Review the scope, performance requirements, drawings and interfaces. Coordinate the disciplines before work reaches site.",
  },
  {
    year: "02",
    title: "Plan and procure",
    text: "Agree work sequences, material submissions and procurement priorities around the project programme.",
  },
  {
    year: "03",
    title: "Install and inspect",
    text: "Supervise work fronts, check materials and workmanship, and maintain inspection and test records as installation progresses.",
  },
  {
    year: "04",
    title: "Test and hand over",
    text: "Commission the systems, close outstanding items, and prepare as-built drawings, operating records and handover documentation.",
  },
];
export default function ApproachPage() {
  return (
    <>
      <InnerHero
        eyebrow="How we deliver"
        title="From engineering intent to working systems."
        description="One coordinated process connects design, procurement, installation and commissioning."
      />
      <CompanySubnav current="/approach" />
      <div className="ue-container">
        <nav className="ue-inner-section-nav" aria-label="Delivery sections">
          <a href="#process">The process</a>
          <a href="#quality-safety">Quality & safety</a>
          <a href="#technology">Engineering tools</a>
          <a href="#people">Our teams</a>
        </nav>
      </div>
      <section className="ue-section" id="process">
        <div className="ue-container">
          <p className="ue-eyebrow">The process</p>
          <h2 className="ue-h2">Four connected stages.</h2>
          <ol className="ue-inner-timeline">
            {stages.map((s) => (
              <li key={s.year}>
                <span className="ue-eyebrow">{s.year}</span>
                <div>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <section id="quality-safety" className="ue-section ue-inner-soft">
        <div className="ue-container ue-inner-split">
          <div>
            <p className="ue-eyebrow">Quality & safety</p>
            <h2 className="ue-h2">Checked at the point of work.</h2>
          </div>
          <div className="ue-inner-copy">
            <p>
              Material approvals, method statements, inspection plans and test
              records define how work is checked. Site briefings, permits and
              supervision bring safety requirements into daily execution.
            </p>
            <p>
              Inspection hold points and corrective actions are tracked through
              closure, so the handover record follows the installation.
            </p>
            <TextLink href="/execution-library">
              Explore the execution library
            </TextLink>
          </div>
        </div>
      </section>
      <section id="technology" className="ue-section">
        <div className="ue-container ue-inner-split">
          <div>
            <p className="ue-eyebrow">Engineering tools</p>
            <h2 className="ue-h2">Better coordination before installation.</h2>
          </div>
          <div className="ue-inner-copy">
            <p>
              BIM and coordinated drawings help teams resolve service
              interfaces, equipment access and construction sequences. Building
              controls and monitoring connect the installed systems with
              day-to-day operation.
            </p>
            <p>
              Structured project information supports planning, progress reviews
              and document control throughout delivery.
            </p>
            <TextLink href="/services/ibms">
              Building management & intelligent systems
            </TextLink>
          </div>
        </div>
      </section>
      <section id="people" className="ue-section ue-inner-soft">
        <div className="ue-container ue-inner-split">
          <div>
            <p className="ue-eyebrow">Our teams</p>
            <h2 className="ue-h2">
              Engineering and site experience, together.
            </h2>
          </div>
          <div className="ue-inner-copy">
            <p>
              Project managers, engineers, procurement specialists and site
              supervisors work around the same programme. Functional leaders
              support resource planning, technical decisions and escalation.
            </p>
            <p>
              Learning comes through practical problem-solving, technical
              reviews and shared execution methods.
            </p>
            <TextLink href="/careers">Careers at Unique</TextLink>
          </div>
        </div>
      </section>
      <InnerCTA />
    </>
  );
}
