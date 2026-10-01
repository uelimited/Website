import Link from "next/link";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Culture — Unique Engineers",
  description:
    "Our culture is built on engineering discipline, team ownership, safety and celebrations that bring people together across every project and site.",
};

const CULTURE_STATS = [
  { n: "35", unit: "+", l: "Years of shared practice and values" },
  { n: "98", unit: "%", l: "First-time quality acceptance on active audits" },
  { n: "5M", unit: "+", l: "Safe man-hours across recent operations" },
];

const CULTURE_PILLARS = [
  {
    title: "Engineer-led execution",
    body:
      "We believe the best work happens when people closest to the problem are also closest to the decision. That is why our site managers, engineers and commissioning teams lead from the field, not from the sidelines.",
  },
  {
    title: "Safety is a habit",
    body:
      "Every toolbox talk, every permit-to-work check and every site walk is a reinforcement of a simple rule: no speed at the cost of people, quality or process.",
  },
  {
    title: "Ownership without ego",
    body:
      "We take accountability for outcomes, escalate early, and fix visibly. Good work is recognisable because it is done without blame and without shortcuts.",
  },
  {
    title: "Respect across roles",
    body:
      "From draftsmen to field engineers, project managers to commissioning specialists, our teams work with professionalism, humility and care for each other’s craft.",
  },
];

const CELEBRATIONS = [
  {
    title: "Project handover nights",
    body:
      "When a critical project reaches handover, the entire team pauses to recognise the people who made it possible — engineering, site execution, QA and client coordination alike.",
  },
  {
    title: "Annual team townhalls",
    body:
      "Leadership shares the year’s milestones, honest lessons and next goals, while the broader team reflects on what was built and what must improve next.",
  },
  {
    title: "Milestone celebrations",
    body:
      "Safety wins, commissioning breakthroughs and client milestones are marked visibly because recognition builds momentum and strengthens team pride.",
  },
  {
    title: "Festivals across the office",
    body:
      "From Diwali and Independence Day to simple team lunches and cultural observances, we make room for joy, belonging and recognition as a lived company rhythm.",
  },
];

export default function CulturePage() {
  return (
    <>
      <section className="ue-section">
        <div className="ue-container">
          <p className="ue-eyebrow">Culture</p>
          <h1 className="ue-h1" style={{ maxWidth: "16ch" }}>
            Built on discipline, ownership and meaningful celebration.
          </h1>
          <p className="ue-lead" style={{ marginTop: 24, maxWidth: "62ch" }}>
            Our culture is practical, high-standard and people-first. We value
            execution discipline, calm accountability and the sense of pride that
            comes from delivering difficult work together and then taking a moment
            to celebrate it.
          </p>
          <div style={{ marginTop: 56 }}>
            <div className="ue-overview__grid">
              {CULTURE_STATS.map((s) => (
                <div key={s.l} className="ue-stat ue-overview__stat">
                  <div className="n">
                    {s.n}
                    {s.unit && (
                      <span className="ue-overview__unit"> {s.unit}</span>
                    )}
                  </div>
                  <div className="l">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="ue-section" style={{ paddingTop: 0 }}>
        <div className="ue-container">
          <div className="ue-culture-grid">
            {CULTURE_PILLARS.map((item) => (
              <div
                key={item.title}
                className="ue-culture-card"
              >
                <p
                  className="ue-eyebrow"
                  style={{ color: "var(--accent-500)", marginBottom: 12 }}
                >
                  Culture
                </p>
                <h2
                  className="ue-h3"
                  style={{ margin: 0, fontSize: 26, marginBottom: 12 }}
                >
                  {item.title}
                </h2>
                <p
                  style={{
                    margin: 0,
                    color: "var(--ink-600)",
                    lineHeight: 1.7,
                    fontSize: 15,
                  }}
                >
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="ue-section">
        <div className="ue-container">
          <header style={{ marginBottom: 36 }}>
            <p className="ue-eyebrow">Celebrations</p>
            <h2 className="ue-h2" style={{ maxWidth: "22ch" }}>
              We celebrate the work, the team and the milestones.
            </h2>
          </header>

          <div className="ue-culture-celebrations">
            {CELEBRATIONS.map((item, index) => (
              <div
                key={item.title}
                className="ue-culture-celebration-item"
              >
                <div className="ue-culture-celebration-no">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <div>
                  <h3
                    className="ue-h3"
                    style={{ margin: 0, fontSize: 24, marginBottom: 10 }}
                  >
                    {item.title}
                  </h3>
                  <p
                    style={{
                      margin: 0,
                      color: "var(--ink-600)",
                      lineHeight: 1.7,
                      fontSize: 15,
                    }}
                  >
                    {item.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="ue-section" style={{ paddingTop: 0 }}>
        <div className="ue-container">
          <div className="ue-culture-cta">
            <p className="ue-eyebrow" style={{ color: "var(--accent-500)" }}>
              Why we work this way
            </p>
            <h2 className="ue-h2" style={{ maxWidth: "22ch", marginTop: 12 }}>
              Strong teams do not just deliver work — they build trust while they
              do it.
            </h2>
            <div style={{ marginTop: 20, display: "flex", flexWrap: "wrap", gap: 12 }}>
              <Button asChild size="lg">
                <Link href="/firm">Meet the firm</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/careers">Careers</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
