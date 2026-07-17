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
import { FirmValuesCards } from "@/components/site/firm-values-cards";
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

const ISO_CERTS = ["ISO 9001:2015", "ISO 14001:2015", "ISO 45001:2018"];

export default function FirmPage() {
  const leaders = getLeadership();
  const journey = getJourney();
  const certifications = getCertifications();
  const offices = getOffices();
  const headquarters = getHeadquarters();

  // Chandigarh is a union territory, not a state — excluded to keep this
  // list matching the "23 states executed" figure used across the site.
  const statesExecuted = getLedgerStates().filter((s) => s !== "Chandigarh");

  const heroStats = [
    {
      n: String(YEARS_IN_PRACTICE),
      unit: "+",
      l: `Years in practice, since ${FIRM.foundedYear}`,
    },
    { n: "23", unit: "", l: "States executed" },
    { n: "450", unit: "₹ Cr", l: "Current order book · audited" },
  ];

  const record: [string, string][] = [
    ["Founded", `${FIRM.foundedYear} · ${headquarters?.city ?? "Gurugram"}`],
    [
      "Headquarters",
      headquarters
        ? `${headquarters.city}, ${headquarters.state ?? ""}`
        : "Gurugram, Haryana",
    ],
    ["Operating region", "India + SAARC"],
  ];

  const certsByCategory = certifications.reduce<
    Record<string, typeof certifications>
  >((acc, c) => {
    (acc[c.category] ??= []).push(c);
    return acc;
  }, {});

  return (
    <>
      {/* 1 — Hero */}
      <section className="ue-section">
        <div className="ue-container">
          <p className="ue-eyebrow">The firm</p>
          <h1 className="ue-h1" style={{ maxWidth: "16ch" }}>
            Engineering discipline, run as a practice, since 1990.
          </h1>
          <div
            className="grid md:grid-cols-[1.1fr_1fr] gap-10 md:gap-24 items-start"
            style={{ marginTop: 64 }}
          >
            <div
              style={{ fontSize: 18, lineHeight: 1.6, color: "var(--ink-700)" }}
            >
              <p style={{ margin: 0 }}>
                {FIRM.legalName} was founded in {FIRM.foundedYear} in Gurugram
                as a specialist HVAC contractor, by three engineer co-founders
                with a shared discipline for technical depth. Thirty-five years
                later, the firm operates across India and delivers select
                engagements in Bangladesh, Nepal and the Maldives.
              </p>
              <p style={{ marginTop: 24, marginBottom: 0 }}>
                Work is undertaken by in-house engineers, not brokered. Site
                supervision is continuous; documentation is continuous; quality
                audits are quarterly. The firm does not subcontract design —
                every drawing leaves the office stamped.
              </p>

              {/*
                Rendered as plain static text (not <StatsGrid>/<StatCounter>)
                so these three headline facts are present unconditionally in
                the server-rendered HTML — StatCounter's rest state is the
                literal string "0" until client JS hydrates and the element
                scrolls into view, which no-JS clients and crawlers would
                otherwise see permanently.
              */}
              <div className="ue-overview__grid" style={{ marginTop: 40 }}>
                {heroStats.map((s) => {
                  const hasRupee = s.unit?.startsWith("₹");
                  const post = hasRupee
                    ? s.unit!.slice(2).trim()
                    : s.unit?.trim();
                  return (
                    <div key={s.l} className="ue-stat ue-overview__stat">
                      <div className="n">
                        {hasRupee && (
                          <span className="ue-overview__unit--pre">₹</span>
                        )}
                        {s.n}
                        {post && (
                          <span className="ue-overview__unit"> {post}</span>
                        )}
                      </div>
                      <div className="l">{s.l}</div>
                    </div>
                  );
                })}
              </div>

              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 8,
                  marginTop: 40,
                }}
              >
                {ISO_CERTS.map((c) => (
                  <span key={c} className="ue-chip">
                    {c}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <div style={{ borderTop: "1px solid var(--border-color)" }}>
                {record.map(([k, v]) => (
                  <div
                    key={k}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "170px 1fr",
                      padding: "18px 0",
                      borderBottom: "1px solid var(--border-color)",
                      alignItems: "baseline",
                      gap: 16,
                    }}
                  >
                    <span style={{ fontSize: 13, color: "var(--fg-muted)" }}>
                      {k}
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-display)",
                        fontWeight: 500,
                        fontSize: 17,
                        letterSpacing: "-0.012em",
                        color: "var(--ink-950)",
                      }}
                    >
                      {v}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2 — Journey timeline (centerpiece) */}
      <FirmJourneyTimeline milestones={journey} />

      {/* 3 — Guiding principles */}
      <section className="ue-section">
        <div className="ue-container">
          <header style={{ marginBottom: 48 }}>
            <p className="ue-eyebrow">Guiding principles</p>
            <h2 className="ue-h2" style={{ marginTop: 8, maxWidth: "22ch" }}>
              How the firm thinks before it builds.
            </h2>
          </header>
          <div className="grid md:grid-cols-2 gap-10">
            <div>
              <div
                style={{
                  borderLeft: "3px solid var(--accent-500)",
                  paddingLeft: 24,
                  marginBottom: 32,
                }}
              >
                <p
                  className="ue-eyebrow"
                  style={{ color: "var(--accent-500)" }}
                >
                  Vision
                </p>
                <p
                  style={{
                    marginTop: 8,
                    fontSize: 17,
                    lineHeight: 1.55,
                    color: "var(--ink-700)",
                  }}
                >
                  To lead India&apos;s infrastructure evolution as the preferred
                  single-window partner for critical engineering systems —
                  setting the benchmark for reliability, sustainability and
                  scale.
                </p>
              </div>
              <div
                style={{
                  borderLeft: "3px solid var(--accent-500)",
                  paddingLeft: 24,
                }}
              >
                <p
                  className="ue-eyebrow"
                  style={{ color: "var(--accent-500)" }}
                >
                  Mission
                </p>
                <p
                  style={{
                    marginTop: 8,
                    fontSize: 17,
                    lineHeight: 1.55,
                    color: "var(--ink-700)",
                  }}
                >
                  To de-risk complex infrastructure projects through precision
                  planning, transparent execution and future-ready technology —
                  so every project delivered operates at peak potential.
                </p>
              </div>
            </div>
            <div>
              <p className="ue-eyebrow">Core values</p>
              <FirmValuesCards values={VALUES} />
            </div>
          </div>
        </div>
      </section>

      {/* 4 — Leadership */}
      <section
        className="ue-section"
        style={{
          background: "var(--paper-soft)",
          borderTop: "1px solid var(--border-color)",
          borderBottom: "1px solid var(--border-color)",
        }}
      >
        <div className="ue-container">
          <header style={{ marginBottom: 48 }}>
            <p className="ue-eyebrow">Leadership</p>
            <h2 className="ue-h2" style={{ marginTop: 8, maxWidth: "22ch" }}>
              The people behind the practice.
            </h2>
            <p
              style={{
                marginTop: 16,
                fontSize: 17,
                lineHeight: 1.55,
                color: "var(--ink-700)",
                maxWidth: "60ch",
              }}
            >
              Founded and led by three engineers with decades of hands-on
              delivery in the MEPF industry — directly engaged on tier-1
              mandates across data centre, semiconductor and large-format
              mixed-use projects.
            </p>
          </header>
          <LeadershipGrid leaders={leaders} />
        </div>
      </section>

      {/* 5 — Pan-India presence */}
      <section
        className="ue-section"
        style={{ background: "var(--ink-950)", color: "var(--paper)" }}
      >
        <div className="ue-container">
          <p className="ue-eyebrow" style={{ color: "var(--accent-400)" }}>
            Pan-India presence
          </p>
          <h2
            className="ue-h2"
            style={{
              marginTop: 12,
              marginBottom: 24,
              color: "var(--paper)",
              maxWidth: "20ch",
            }}
          >
            Rooted in India. Read internationally.
          </h2>
          <p
            style={{
              fontSize: 17,
              lineHeight: 1.55,
              color: "rgba(255,255,255,0.75)",
              maxWidth: "56ch",
              marginBottom: 48,
            }}
          >
            Operating across {statesExecuted.length} states with registrations
            in 16. Active projects in Bangladesh, Nepal and the Maldives.
            Regional offices in Ahmedabad, Mumbai, Hyderabad, Bangalore and
            Kolkata — supporting a 10-day pan-India mobilisation benchmark.
          </p>
          <FirmPresenceMap offices={offices} statesExecuted={statesExecuted} />
        </div>
      </section>

      {/* 6 — Certifications */}
      <section className="ue-section">
        <div className="ue-container">
          <header style={{ marginBottom: 32 }}>
            <p className="ue-eyebrow">Certifications</p>
            <h2
              className="ue-h2"
              style={{
                marginTop: 8,
                maxWidth: "26ch",
                fontSize: "clamp(28px, 3.2vw, 40px)",
              }}
            >
              Quality, environment, safety — independently certified.
            </h2>
          </header>
          <div className="grid md:grid-cols-3 gap-10">
            {Object.entries(certsByCategory).map(([cat, items]) => (
              <div key={cat}>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontWeight: 500,
                    fontSize: 13,
                    color: "var(--fg-muted)",
                    margin: "0 0 12px",
                  }}
                >
                  {cat}
                </p>
                <ul
                  style={{
                    margin: 0,
                    padding: 0,
                    listStyle: "none",
                    borderTop: "1px solid var(--border-color)",
                  }}
                >
                  {items.map((c) => (
                    <li
                      key={c.id}
                      style={{
                        padding: "12px 0",
                        borderBottom: "1px solid var(--border-color)",
                        fontFamily: "var(--font-display)",
                        fontWeight: 500,
                        fontSize: 16,
                        letterSpacing: "-0.012em",
                        color: "var(--ink-950)",
                      }}
                    >
                      {c.name}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7 — Contact */}
      <ContactCTA />
    </>
  );
}
