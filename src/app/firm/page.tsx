import Image from "next/image";
import { FIRM, YEARS_IN_PRACTICE } from "@/data/firm";
import {
  getLeadership,
  getJourney,
  getCertifications,
  getOffices,
  getTestimonials,
} from "@/lib/cms";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The firm — Unique Engineers",
  description: `${FIRM.legalName} · design-build MEPF · Gurugram · since ${FIRM.foundedYear}.`,
};

const RECORD: [string, string][] = [
  ["Founded", `${FIRM.foundedYear} · Gurugram`],
  ["Headquarters", "Gurugram, Haryana"],
  ["Operating region", "India + SAARC"],
  ["Years in practice", `${YEARS_IN_PRACTICE}+`],
  ["States executed", "23"],
  ["Current order book", "~₹450 Cr"],
  ["Certifications", "ISO 9001 · 14001 · 45001"],
];

const VALUES = [
  { title: "Safety First", body: "Zero-tolerance permits, daily toolbox, ISO 45001 — non-negotiable on every site." },
  { title: "Uncompromising Integrity", body: "Transparent execution, owned outcomes, no hidden subcontracting." },
  { title: "Environmental Sustainability", body: "IGBC / LEED-aligned design, lifecycle energy modelling, measurable efficiency." },
  { title: "Engineering Innovation", body: "BIM LOD 400, AI scenario planning, digital twins — innovation as productivity." },
];

export default function FirmPage() {
  const leaders = getLeadership();
  const journey = getJourney();
  const certifications = getCertifications();
  const offices = getOffices();
  const testimonials = getTestimonials();

  const certsByCategory = certifications.reduce<Record<string, typeof certifications>>(
    (acc, c) => {
      (acc[c.category] ??= []).push(c);
      return acc;
    },
    {},
  );

  return (
    <>
      {/* Hero */}
      <section className="ue-section">
        <div className="ue-container">
          <p className="ue-eyebrow">The firm</p>
          <h1 className="ue-h1" style={{ maxWidth: "15ch" }}>
            A contracting firm, run like a practice.
          </h1>
          <div
            className="grid md:grid-cols-[1.1fr_1fr] gap-10 md:gap-24 items-start"
            style={{ marginTop: 80 }}
          >
            <div
              style={{
                fontSize: 18,
                lineHeight: 1.6,
                color: "var(--ink-700)",
              }}
            >
              <p style={{ margin: 0 }}>
                {FIRM.legalName} was founded in 1990 in Gurugram as a
                specialist HVAC contractor, by a group of mechanical
                engineers with a shared discipline for technical depth.
                Thirty-five years later, the firm operates across India
                and delivers select engagements in neighbouring countries.
              </p>
              <p style={{ marginTop: 24 }}>
                Work is undertaken by in-house engineers, not brokered.
                Site supervision is continuous; documentation is
                continuous; quality audits are quarterly. The firm does
                not subcontract design — every drawing leaves the office
                stamped.
              </p>
              <p style={{ marginTop: 24, marginBottom: 0 }}>
                Our vision is to lead India&apos;s infrastructure
                evolution as the preferred single-window partner for
                critical engineering systems — setting the benchmark for
                reliability, sustainability, and scale.
              </p>
            </div>
            <div>
              <div style={{ borderTop: "1px solid var(--border-color)" }}>
                {RECORD.map(([k, v]) => (
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

      {/* Journey */}
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
            <p className="ue-eyebrow">Our journey</p>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 500,
                fontSize: 40,
                letterSpacing: "-0.022em",
                lineHeight: 1.1,
                margin: "8px 0 0",
                color: "var(--ink-950)",
                maxWidth: "22ch",
              }}
            >
              Thirty-five years, ten inflection points.
            </h2>
          </header>
          <ol
            style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
              borderTop: "1px solid var(--border-color)",
            }}
          >
            {journey.map((m) => (
              <li
                key={m.id}
                style={{
                  display: "grid",
                  gridTemplateColumns: "160px minmax(0, 1fr)",
                  padding: "24px 0",
                  borderBottom: "1px solid var(--border-color)",
                  gap: 24,
                  alignItems: "baseline",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 500,
                    fontSize: 24,
                    letterSpacing: "-0.018em",
                    color: "var(--ink-950)",
                  }}
                >
                  {m.year}
                </div>
                <div>
                  <div
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 11,
                      color: "var(--accent-500)",
                      textTransform: "uppercase",
                      letterSpacing: 0.4,
                      marginBottom: 4,
                    }}
                  >
                    {m.title}
                  </div>
                  <p
                    style={{
                      margin: 0,
                      fontSize: 16,
                      lineHeight: 1.55,
                      color: "var(--ink-700)",
                    }}
                  >
                    {m.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Vision / mission / values */}
      <section className="ue-section">
        <div className="ue-container">
          <header style={{ marginBottom: 48 }}>
            <p className="ue-eyebrow">Guiding principles</p>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 500,
                fontSize: 40,
                letterSpacing: "-0.022em",
                lineHeight: 1.1,
                margin: "8px 0 0",
                color: "var(--ink-950)",
                maxWidth: "22ch",
              }}
            >
              How we think before we build.
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
                  To lead India&apos;s infrastructure evolution as the
                  preferred single-window partner for critical
                  engineering systems — setting the benchmark for
                  reliability, sustainability, and scale.
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
                  To de-risk complex infrastructure projects through
                  precision planning, transparent execution, and
                  future-ready technology — ensuring every square foot
                  we touch operates at peak potential.
                </p>
              </div>
            </div>
            <div>
              <p className="ue-eyebrow">Core values</p>
              <div
                style={{
                  marginTop: 16,
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 16,
                }}
              >
                {VALUES.map((v) => (
                  <div
                    key={v.title}
                    style={{
                      padding: "20px 18px",
                      border: "1px solid var(--border-color)",
                      borderRadius: 10,
                      background: "var(--paper)",
                    }}
                  >
                    <h3
                      style={{
                        fontFamily: "var(--font-display)",
                        fontWeight: 500,
                        fontSize: 16,
                        letterSpacing: "-0.012em",
                        margin: 0,
                        color: "var(--ink-950)",
                      }}
                    >
                      {v.title}
                    </h3>
                    <p
                      style={{
                        marginTop: 6,
                        fontSize: 13,
                        lineHeight: 1.5,
                        color: "var(--ink-500)",
                      }}
                    >
                      {v.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership */}
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
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 500,
                fontSize: 40,
                letterSpacing: "-0.022em",
                lineHeight: 1.1,
                margin: "8px 0 0",
                color: "var(--ink-950)",
                maxWidth: "22ch",
              }}
            >
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
              Founded and led by two mechanical engineers with four
              decades each in the MEPF industry — directly engaged on
              tier-1 mandates across data centre, semiconductor and
              large-format mixed-use projects.
            </p>
          </header>
          <div className="grid md:grid-cols-2 gap-10">
            {leaders.map((p) => (
              <article
                key={p.id}
                style={{
                  background: "var(--paper)",
                  border: "1px solid var(--border-color)",
                  borderRadius: 14,
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    aspectRatio: "4 / 3",
                    background: p.portrait_url
                      ? `url(${p.portrait_url}) center/cover no-repeat`
                      : "var(--ink-100)",
                    borderBottom: "1px solid var(--border-color)",
                  }}
                />
                <div style={{ padding: "24px 28px 28px" }}>
                  <p
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 11,
                      color: "var(--accent-500)",
                      textTransform: "uppercase",
                      letterSpacing: 0.4,
                      margin: 0,
                    }}
                  >
                    {p.role}
                  </p>
                  <h3
                    style={{
                      marginTop: 8,
                      fontFamily: "var(--font-display)",
                      fontWeight: 500,
                      fontSize: 26,
                      letterSpacing: "-0.018em",
                      color: "var(--ink-950)",
                    }}
                  >
                    {p.name}
                  </h3>
                  <ul
                    style={{
                      marginTop: 12,
                      padding: 0,
                      listStyle: "none",
                      fontSize: 14,
                      color: "var(--ink-500)",
                      lineHeight: 1.55,
                    }}
                  >
                    <li>{p.credential}</li>
                    <li>{p.experience}</li>
                  </ul>
                  {p.bio && (
                    <p
                      style={{
                        marginTop: 16,
                        fontSize: 14,
                        lineHeight: 1.55,
                        color: "var(--ink-700)",
                      }}
                    >
                      {p.bio}
                    </p>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Team depth */}
      <section className="ue-section">
        <div className="ue-container">
          <header style={{ marginBottom: 32 }}>
            <p className="ue-eyebrow">The team</p>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 500,
                fontSize: 40,
                letterSpacing: "-0.022em",
                lineHeight: 1.1,
                margin: "8px 0 0",
                color: "var(--ink-950)",
                maxWidth: "20ch",
              }}
            >
              Engineering depth, across disciplines.
            </h2>
          </header>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
              gap: 0,
              borderTop: "1px solid var(--border-color)",
              borderBottom: "1px solid var(--border-color)",
            }}
          >
            {[
              { n: "2,500+", l: "Direct + contractual workforce" },
              { n: "275+", l: "Managers + engineers" },
              { n: "40+", l: "Design + BIM engineers" },
              { n: "200+", l: "T&C specialists" },
              { n: "100+", l: "HSE personnel" },
              { n: "50+", l: "QA/QC engineers" },
            ].map((s, i) => (
              <div
                key={s.l}
                style={{
                  padding: "24px 16px 24px 0",
                  paddingLeft: i > 0 ? 24 : 0,
                  borderRight:
                    i < 5 ? "1px solid var(--border-color)" : "none",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 500,
                    fontSize: 32,
                    letterSpacing: "-0.022em",
                    lineHeight: 1.05,
                    color: "var(--ink-950)",
                  }}
                >
                  {s.n}
                </div>
                <div
                  style={{
                    marginTop: 6,
                    fontSize: 13,
                    color: "var(--ink-500)",
                    lineHeight: 1.45,
                  }}
                >
                  {s.l}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications & memberships */}
      <section
        className="ue-section"
        style={{
          background: "var(--paper-soft)",
          borderTop: "1px solid var(--border-color)",
          borderBottom: "1px solid var(--border-color)",
        }}
      >
        <div className="ue-container">
          <header style={{ marginBottom: 32 }}>
            <p className="ue-eyebrow">Certifications</p>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 500,
                fontSize: 32,
                letterSpacing: "-0.022em",
                lineHeight: 1.1,
                margin: "8px 0 0",
                color: "var(--ink-950)",
                maxWidth: "26ch",
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
                    fontFamily: "var(--font-mono)",
                    fontSize: 11,
                    color: "var(--fg-muted)",
                    textTransform: "uppercase",
                    letterSpacing: 0.4,
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

      {/* Pan-India presence */}
      <section
        className="ue-section"
        style={{
          background: "var(--ink-950)",
          color: "var(--paper)",
        }}
      >
        <div className="ue-container">
          <p className="ue-eyebrow" style={{ color: "var(--accent-400)" }}>
            Pan-India presence
          </p>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 500,
              fontSize: 44,
              letterSpacing: "-0.022em",
              lineHeight: 1.05,
              marginTop: 12,
              marginBottom: 32,
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
            Operating across 23 states with registrations in 16. Active
            projects in Bangladesh, Nepal and the Maldives. Regional
            offices in Ahmedabad, Mumbai, Hyderabad, Bangalore and
            Kolkata — supporting a 3-day NCR / 10-day pan-India
            mobilisation benchmark.
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: 16,
            }}
          >
            {offices.map((o) => (
              <div
                key={o.id}
                style={{
                  padding: "20px 18px",
                  border: "1px solid rgba(255,255,255,0.12)",
                  borderRadius: 10,
                  background: "rgba(255,255,255,0.03)",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 11,
                    color: "var(--accent-400)",
                    textTransform: "uppercase",
                    letterSpacing: 0.4,
                  }}
                >
                  {o.is_hq ? "Headquarters" : "Regional office"}
                </div>
                <div
                  style={{
                    marginTop: 6,
                    fontFamily: "var(--font-display)",
                    fontWeight: 500,
                    fontSize: 18,
                    letterSpacing: "-0.012em",
                    color: "var(--paper)",
                  }}
                >
                  {o.city}
                </div>
                {o.state && (
                  <div
                    style={{
                      marginTop: 2,
                      fontSize: 13,
                      color: "rgba(255,255,255,0.6)",
                    }}
                  >
                    {o.state}
                  </div>
                )}
                {o.phone && (
                  <div
                    style={{
                      marginTop: 10,
                      fontSize: 13,
                      color: "rgba(255,255,255,0.7)",
                    }}
                  >
                    {o.phone}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      {testimonials.length > 0 && (
        <section className="ue-section">
          <div className="ue-container">
            <header style={{ marginBottom: 32 }}>
              <p className="ue-eyebrow">Client voice</p>
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 500,
                  fontSize: 32,
                  letterSpacing: "-0.022em",
                  lineHeight: 1.1,
                  margin: "8px 0 0",
                  color: "var(--ink-950)",
                  maxWidth: "22ch",
                }}
              >
                In their words.
              </h2>
            </header>
            <div className="grid md:grid-cols-2 gap-10">
              {testimonials.map((t) => (
                <blockquote
                  key={t.id}
                  style={{
                    margin: 0,
                    padding: "28px 28px 28px 28px",
                    borderLeft: "3px solid var(--accent-500)",
                    background: "var(--paper-soft)",
                    borderRadius: "0 12px 12px 0",
                  }}
                >
                  <p
                    style={{
                      margin: 0,
                      fontFamily: "var(--font-display)",
                      fontStyle: "italic",
                      fontSize: 19,
                      lineHeight: 1.45,
                      letterSpacing: "-0.012em",
                      color: "var(--ink-950)",
                    }}
                  >
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <footer
                    style={{
                      marginTop: 16,
                      fontSize: 14,
                      color: "var(--ink-500)",
                    }}
                  >
                    <strong style={{ color: "var(--ink-950)", fontWeight: 500 }}>
                      {t.author_name}
                    </strong>{" "}
                    · {t.author_role}, {t.author_company}
                  </footer>
                </blockquote>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
