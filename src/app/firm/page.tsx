import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FIRM, YEARS_IN_PRACTICE } from "@/data/firm";
import {
  getLeadership,
  getJourney,
  getCertifications,
  getOffices,
  getHeadquarters,
  getLedgerStates,
} from "@/lib/cms";
import { FirmJourneyTimeline } from "@/components/site/firm-journey-timeline";
import { LeadershipGrid } from "@/components/site/leadership-grid";
import { FirmPresenceMap } from "@/components/site/firm-presence-map";
import { ContactCTA } from "@/components/site/contact-cta";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The firm — Unique Engineers",
  description: `${FIRM.legalName} · design-build MEPF · Gurugram · since ${FIRM.foundedYear}.`,
};

const VALUES = [
  {
    title: "Safety first",
    body: "Zero-tolerance permits, daily toolbox, ISO 45001 — non-negotiable on every site.",
  },
  {
    title: "Uncompromising integrity",
    body: "Transparent execution, owned outcomes, no hidden subcontracting.",
  },
  {
    title: "Environmental sustainability",
    body: "IGBC / LEED-aligned design, lifecycle energy modelling, measurable efficiency.",
  },
  {
    title: "Engineering innovation",
    body: "BIM LOD 400, AI scenario planning, digital twins — innovation as productivity.",
  },
];

const EXECUTIVE_LEADERSHIP = [
  {
    name: "Brajesh Kumar Gupta",
    role: "Chief Financial Officer (CFO)",
    image: "/firm/team-on-site.jpg",
    imagePosition: "center center",
    functions: [
      "Accounts and Taxation",
      "Treasury and FP&A",
      "Legal",
      "Commercial and Contracts",
    ],
  },
  {
    name: "Krishan Bhushan Pandey",
    role: "Chief Projects Officer",
    image: "/firm/team-on-site.jpg",
    imagePosition: "center center",
    functions: [
      "Heads of Projects",
      "Project Managers",
      "Engineers and Supervisors",
      "Planning and Scheduling",
      "Monitoring and Cost Control",
      "EHS and Safety",
      "QA/QC",
      "Testing and Commissioning",
    ],
  },
  {
    name: "Neeraj Sharma",
    role: "Chief Operating Officer (COO)",
    image: "/firm/team-on-site.jpg",
    imagePosition: "center center",
    functions: ["Procurement", "Stores and Logistics", "O&M Engineering Core"],
  },
  {
    name: "Sanjeev Kumar",
    role: "Chief Human Resources Officer (CHRO)",
    image: "/firm/team-on-site.jpg",
    imagePosition: "center center",
    functions: [
      "HR Operations / HRBPs",
      "Recruitment",
      "Payroll",
      "Compliance",
      "Administration",
      "Office Support",
    ],
  },
  {
    name: "Kumar Abhijeet",
    role: "Chief Technology Officer (CTO)",
    image: "/firm/team-on-site.jpg",
    imagePosition: "center center",
    functions: [
      "Design and Drawings",
      "BIM",
      "Intelligent Solutions",
      "IT and Systems",
    ],
  },
  {
    name: "Madhur Malik",
    role: "Head of Sales and Estimation",
    image: "/firm/team-on-site.jpg",
    imagePosition: "center center",
    functions: [
      "Business Development",
      "Key Accounts",
      "Estimation and Tendering",
      "Marketing / Proposals",
    ],
  },
];

export default function FirmPage() {
  const leaders = getLeadership();
  const journey = getJourney();
  const certifications = getCertifications();
  const offices = getOffices();
  const headquarters = getHeadquarters();

  // Chandigarh is a union territory, not a state — excluded to keep this
  // list matching the "23 states executed" figure used across the site.
  const statesExecuted = getLedgerStates().filter((s) => s !== "Chandigarh");

  const certsByCategory = certifications.reduce<
    Record<string, typeof certifications>
  >((acc, c) => {
    (acc[c.category] ??= []).push(c);
    return acc;
  }, {});

  return (
    <main className="ue-firm-redesign">
      <section className="ue-firm-redesign__hero" aria-labelledby="firm-title">
        <Image
          src="/firm/team-on-site.jpg"
          alt="Unique Engineers team coordinating work on an active project site"
          fill
          priority
          sizes="100vw"
          className="ue-firm-redesign__hero-image"
        />
        <div className="ue-firm-redesign__hero-shade" aria-hidden="true" />
        <div className="ue-container ue-firm-redesign__hero-inner">
          <div className="ue-firm-redesign__hero-copy">
            <p className="ue-firm-redesign__eyebrow">
              The firm <span>·</span> Gurugram <span>·</span> Since 1990
            </p>
            <h1 id="firm-title">Engineering discipline, run as a practice.</h1>
            <p className="ue-firm-redesign__hero-lead">
              {FIRM.legalName} delivers complex infrastructure through in-house
              civil, MEPF, solar and building-systems teams.
            </p>
            <div className="ue-firm-redesign__hero-actions">
              <Link href="/work" className="ue-firm-redesign__hero-link">
                Explore projects <ArrowRight aria-hidden />
              </Link>
              <Link
                href="/contact"
                className="ue-firm-redesign__hero-link ue-firm-redesign__hero-link--quiet"
              >
                Contact the team
              </Link>
            </div>
          </div>

          <dl className="ue-firm-redesign__hero-stats">
            <div>
              <dd>{YEARS_IN_PRACTICE}+</dd>
              <dt>Years in practice</dt>
            </div>
            <div>
              <dd>{statesExecuted.length}</dd>
              <dt>States executed</dt>
            </div>
            <div>
              <dd>₹450 Cr</dd>
              <dt>Audited order book</dt>
            </div>
          </dl>
        </div>
      </section>

      <section className="ue-firm-redesign__record" aria-label="Company record">
        <div className="ue-container ue-firm-redesign__record-inner">
          <div>
            <span>Headquarters</span>
            <strong>
              {headquarters
                ? `${headquarters.city}, ${headquarters.state ?? ""}`
                : "Gurugram, Haryana"}
            </strong>
          </div>
          <div>
            <span>Operating region</span>
            <strong>India + SAARC</strong>
          </div>
          <div>
            <span>Delivery model</span>
            <strong>In-house engineering teams</strong>
          </div>
        </div>
      </section>

      <section
        id="our-story"
        style={{ scrollMarginTop: "calc(var(--header-h) + 24px)" }}
      >
        <FirmJourneyTimeline milestones={journey} />
      </section>

      <section
        id="how-we-deliver"
        className="ue-firm-redesign__practice"
        style={{ scrollMarginTop: "calc(var(--header-h) + 24px)" }}
      >
        <div className="ue-container">
          <header className="ue-firm-redesign__section-head">
            <div>
              <p className="ue-eyebrow">Guiding principles</p>
              <h2>How the firm thinks before it builds.</h2>
            </div>
            <p>
              Planning, execution and accountability are held to the same
              standard on every site.
            </p>
          </header>

          <div className="ue-firm-redesign__practice-grid">
            <div className="ue-firm-redesign__purpose">
              <article>
                <p className="ue-firm-redesign__label">Vision</p>
                <p>
                  To lead India&apos;s infrastructure evolution as the preferred
                  single-window partner for critical engineering systems —
                  setting the benchmark for reliability, sustainability and
                  scale.
                </p>
              </article>
              <article>
                <p className="ue-firm-redesign__label">Mission</p>
                <p>
                  To de-risk complex infrastructure projects through precision
                  planning, transparent execution and future-ready technology —
                  so every project delivered operates at peak potential.
                </p>
              </article>
              <figure>
                <Image
                  src="/firm/execution-excellence.jpg"
                  alt="Engineers verifying execution quality on site"
                  width={1000}
                  height={650}
                  sizes="(max-width: 800px) 100vw, 40vw"
                />
                <figcaption>
                  Quality is verified at every inspection.
                </figcaption>
              </figure>
            </div>

            <div className="ue-firm-redesign__values">
              <p className="ue-firm-redesign__label">Core values</p>
              <ol>
                {VALUES.map((value, i) => (
                  <li key={value.title}>
                    <span>{String(i + 1).padStart(2, "0")}</span>
                    <div>
                      <h3>{value.title}</h3>
                      <p>{value.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      <section
        id="leadership"
        className="ue-firm-redesign__leadership"
        aria-labelledby="firm-leadership-heading"
        style={{ scrollMarginTop: "calc(var(--header-h) + 24px)" }}
      >
        <div className="ue-container">
          <header className="ue-firm-redesign__section-head">
            <div>
              <p className="ue-eyebrow">Leadership</p>
              <h2 id="firm-leadership-heading">
                The people behind the practice.
              </h2>
            </div>
            <p>
              Founded and led by engineers with decades of hands-on MEPF
              delivery, directly engaged on the firm&apos;s tier-one mandates.
            </p>
          </header>
          <LeadershipGrid leaders={leaders} />
          <div className="ue-firm-executives">
            <header className="ue-firm-executives__head">
              <div>
                <p className="ue-eyebrow">Executive leadership</p>
                <h3>Leaders across the business.</h3>
              </div>
              <p>
                Functional leaders guiding finance, projects, operations,
                people, technology and growth.
              </p>
            </header>
            <div className="ue-firm-executives__grid">
              {EXECUTIVE_LEADERSHIP.map((executive) => (
                <article
                  className="ue-firm-executive-card"
                  key={executive.name}
                >
                  <div className="ue-firm-executive-card__portrait">
                    <Image
                      src={executive.image}
                      alt={`Portrait of ${executive.name}`}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="ue-firm-executive-card__image"
                      style={{ objectPosition: executive.imagePosition }}
                    />
                  </div>
                  <div className="ue-firm-executive-card__body">
                    <p className="ue-firm-leaders__role">{executive.role}</p>
                    <h4 className="ue-firm-leaders__name">{executive.name}</h4>
                    <p className="ue-firm-executive-card__label">
                      Key functions
                    </p>
                    <ul className="ue-firm-executive-card__functions">
                      {executive.functions.map((functionName) => (
                        <li key={functionName}>{functionName}</li>
                      ))}
                    </ul>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="ue-firm-redesign__presence">
        <div className="ue-container">
          <header className="ue-firm-redesign__presence-head">
            <p className="ue-firm-redesign__eyebrow">
              Offices, projects and reach
            </p>
            <h2>Rooted in India. Read internationally.</h2>
            <p>
              Operating across {statesExecuted.length} states, with active
              projects in Bangladesh, Nepal and the Maldives. Regional offices
              support a 10-day pan-India mobilisation benchmark.
            </p>
          </header>
          <FirmPresenceMap offices={offices} statesExecuted={statesExecuted} />
        </div>
      </section>

      <section className="ue-firm-redesign__certifications">
        <div className="ue-container">
          <header className="ue-firm-redesign__section-head">
            <div>
              <p className="ue-eyebrow">Credentials</p>
              <h2>
                Quality, environment and safety — independently certified.
              </h2>
            </div>
            <p>
              Management systems and empanelments that support delivery across
              regulated, high-accountability environments.
            </p>
          </header>
          <div className="ue-firm-redesign__cert-grid">
            {Object.entries(certsByCategory).map(([category, items]) => (
              <section key={category} aria-label={category}>
                <h3>{category}</h3>
                <ul>
                  {items.map((certification) => (
                    <li key={certification.id}>{certification.name}</li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </div>
      </section>

      <ContactCTA />
    </main>
  );
}
