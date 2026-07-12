import { Fragment } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatsGrid } from "@/components/site/stat-counter";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Approach — Unique Engineers",
  description:
    "How it's engineered and delivered — design-build model, BIM LOD 400, project controls, commissioning L1-L5, EHS, sustainability and the vendor ecosystem behind every mandate.",
};

// Quick-read entry strip — three figures pulled straight from the
// sections below, so the page gives up something scannable before
// asking for nine sections of specification-grade reading.
const APPROACH_STATS = [
  { n: "9", l: "Layers of discipline, design-build to vendor ecosystem" },
  { n: "35", unit: "%", l: "Schedule compression vs bid-build, at the high end" },
  { n: "98", unit: "%", l: "First-inspection test acceptance across QA/QC audits" },
];

const SECTIONS = [
  {
    num: "01",
    title: "Design–build model",
    eyebrow: "Delivery model",
    paragraphs: [
      "One contract covers design and execution. The same team that engineers the system installs and commissions it — no design-vs-build finger-pointing, no clarification loops, no translation losses between architect, MEP consultant and contractor.",
      "Design and execution overlap rather than sequence. Long-lead procurement starts at the moment the design intent freezes, compressing the schedule by 20-35% vs traditional bid-build. Value engineering happens at the design stage, when changes are cheap — not during construction, when they aren't.",
    ],
    tiles: [
      { k: "Single contract", v: "Design + build + commission" },
      { k: "Schedule compression", v: "20–35% vs bid-build" },
      { k: "Cost certainty", v: "Single-source budgeting" },
    ],
  },
  {
    num: "02",
    title: "BIM & Virtual Construction",
    eyebrow: "Digital engineering",
    paragraphs: [
      "Every discipline is modelled before it's ever built on site. Fully coordinated multi-disciplinary BIM runs at LOD 400 across HVAC, Firefighting, Plumbing, Electrical, Solar and PNG systems — all services integrated into a federated 3D environment where real-time clash detection and inter-trade coordination are completed before site installation.",
      "Shop drawings are generated directly from the coordinated model to ensure execution accuracy and minimise rework. The modelling process creates a digital twin of the project — enabling constructability validation, accurate material take-offs, prefabrication planning and lifecycle-ready asset data.",
    ],
    tiles: [
      { k: "LOD", v: "400" },
      { k: "Federation", v: "All MEPF + civil" },
      { k: "Output", v: "Shop drawings + digital twin" },
    ],
  },
  {
    num: "03",
    title: "Design stack",
    eyebrow: "Toolchain",
    paragraphs: [
      "Every load is calculated before it's ever installed. 40+ in-house MEPF design engineers run a full stack from heat load through CFD, and tooling is picked for fidelity, not because it's free — Carrier HAP for thermal load, Pipe Flow Expert / AFT Fathom for hydraulic, Trane TRACE 700 / IES VE for energy modelling, Ansys Fluent / Autodesk CFD for airflow.",
      "Layout and coordination live in AutoCAD MEP and Revit (LOD 400). Controls programming uses vendor PLC, DDC and SCADA toolchains. Every workstream has a defined deliverable that signs off at design freeze.",
    ],
    tiles: [
      { k: "Thermal", v: "Carrier HAP · E-20" },
      { k: "Hydraulic", v: "Pipe Flow · AFT Fathom" },
      { k: "Energy", v: "TRACE 700 · IES VE" },
      { k: "CFD", v: "Ansys Fluent · Autodesk" },
      { k: "BIM", v: "Revit (LOD 400)" },
      { k: "Controls", v: "Vendor PLC · DDC · SCADA" },
    ],
  },
  {
    num: "04",
    title: "Project controls",
    eyebrow: "Schedule discipline",
    paragraphs: [
      "Nothing on site moves without a plan behind it. The master schedule lives in Primavera P6 — resource-loaded, baseline-locked, L1 to L5 hierarchy — with every milestone tied to the operator's commissioning sequence. Microsoft Project surfaces executive dashboards and interface-management trackers across MEP / civil / OEM equipment.",
      "An AI scenario layer overlays the schedule — deep-scheduling heuristics, resource-levelling optimisation, what-if impact of design change, weather or LLI slippage modelled before decisions are made. 3-week rolling look-ahead drives daily site deployment; weekly earned-value drives the operator's PMO review.",
    ],
    tiles: [
      { k: "Schedule backbone", v: "Primavera P6" },
      { k: "Cadence", v: "3-week rolling look-ahead" },
      { k: "Reporting", v: "Weekly earned-value" },
      { k: "On-schedule rate", v: "90%+" },
    ],
  },
  {
    num: "05",
    title: "Commissioning · L1 → L5",
    eyebrow: "Validation",
    paragraphs: [
      "Nothing goes live until it's proven, five times over. Aligned to Uptime Institute Cx and ASHRAE / AABC / NEBB protocols: L1 component verification (OEM datasheet check, serial / tag verification, physical integrity, receipt inspection). L2 static testing (insulation resistance, pressure / leak tests, cleanliness flushes). L3 component start-up (powered functional tests on individual components against design parameters).",
      "L4 integrated systems test (end-to-end systems with BMS, failover sequences proven, alarm matrix verified, interlocks witnessed). L5 performance and operational (full-load IST under load banks, concurrent maintainability and fault-tolerance scenarios, steady-state operations test for the operator's PQ window). Each level signed off — operator-witnessed where required — before the next is initiated.",
    ],
    tiles: [
      { k: "Level 1", v: "Component verification" },
      { k: "Level 2", v: "Static testing" },
      { k: "Level 3", v: "Component start-up" },
      { k: "Level 4", v: "Integrated systems test" },
      { k: "Level 5", v: "Performance & operational" },
    ],
  },
  {
    num: "06",
    title: "QA / QC framework",
    eyebrow: "Independent oversight",
    paragraphs: [
      "50+ dedicated QA/QC professionals with an independent reporting line to project leadership — never to the execution team being audited. Trade-specific ITPs aligned to the operator's specs, with hold / witness / review points called out in advance and digitally signed off in the project's QMS.",
      "Trade-specific QC covers HVAC duct leakage and balancing, electrical insulation and load-bank testing, fire pressure and alarm matrix verification, plumbing hydrostatic and sanitary slope checks. FAT for critical OEM equipment, SAT on receipt, IST levels L2–L5 per the operator's commissioning protocol.",
    ],
    tiles: [
      { k: "QA/QC team", v: "50+ professionals" },
      { k: "Reporting", v: "Independent line" },
      { k: "Documentation", v: "Digitally signed in QMS" },
      { k: "Test acceptance", v: "98% first-inspection" },
    ],
  },
  {
    num: "07",
    title: "EHS — non-negotiable",
    eyebrow: "Safety culture",
    paragraphs: [
      "ISO 45001:2018 certified with a 100+ HSE team across all active sites. Daily toolbox talks, JSA, PTW, near-miss reporting, weekly safety audits and walks. Hot work and live-site discipline: strict permits, temporary fire-watch teams, continuous monitoring during welding, cable termination and install in operating data centres.",
      "Zero fatalities in the last 5 years across 5M+ safe man-hours in FY 24-25 alone. Zero-tolerance policy with root-cause analysis on every event and a continuous-improvement cycle that closes the loop.",
    ],
    tiles: [
      { k: "Certification", v: "ISO 45001:2018" },
      { k: "Fatalities", v: "Zero · last 5 years" },
      { k: "Safe man-hours", v: "5M+ · FY 24-25" },
      { k: "HSE team", v: "100+ personnel" },
    ],
  },
  {
    num: "08",
    title: "Sustainability & innovation",
    eyebrow: "Performance, not compliance",
    paragraphs: [
      "Sustainability is treated as a performance driver, not an add-on. Energy-optimised HVAC systems, lifecycle-focused design strategies, reduced operational cost while minimising environmental impact. Projects aligned with evolving green-building standards (LEED, IGBC, GRIHA) and long-term performance benchmarks.",
      "Innovation enters through digital workflows — BIM environments, 3D coordination platforms, AI scenario planning — that improve productivity, reduce rework and strengthen quality control. Intelligent building management systems deliver predictive, performance-oriented operations across commercial and industrial environments.",
    ],
    tiles: [
      { k: "Certifications", v: "LEED · IGBC · GRIHA" },
      { k: "Reference", v: "Nalanda — India's first net-zero" },
      { k: "Reference", v: "Central Secretariat — IGBC Gold" },
      { k: "Innovation", v: "Digital twin, AI scheduling" },
    ],
  },
  {
    num: "09",
    title: "Vendor ecosystem",
    eyebrow: "Supply chain depth",
    paragraphs: [
      "Unique Engineers operates within a robust network of OEM partners, technical consultants, PMCs and verified vendors across India. Standing rate contracts with Carrier, Trane, Vertiv, Schneider, Siemens, ABB and Honeywell mean equipment is mobilised at design freeze — not chased at the last minute.",
      "Long-standing manufacturing partnerships extend to AHU and Air Washer Unit fabrication (in-house since 2005), giving the firm schedule control on the largest single line item in most HVAC projects. ₹300+ Cr annual procurement budget; ₹400+ Cr banking credit limit for working capital depth.",
    ],
    tiles: [
      { k: "OEM partners", v: "Carrier · Trane · Vertiv · Schneider · Siemens · ABB · Honeywell" },
      { k: "Procurement budget", v: "₹300+ Cr / year" },
      { k: "Credit limit", v: "₹400+ Cr" },
      { k: "In-house mfg", v: "AHU + AWU since 2005" },
    ],
  },
];

export default function ApproachPage() {
  return (
    <>
      <section className="ue-section">
        <div className="ue-container">
          <p className="ue-eyebrow">Approach</p>
          <h1 className="ue-h1" style={{ maxWidth: "17ch" }}>
            How it&apos;s engineered. How it&apos;s delivered.
          </h1>
          <p className="ue-lead" style={{ marginTop: 32, maxWidth: "62ch" }}>
            Nine layers of discipline — from design-build contracting and
            BIM coordination through project controls, commissioning, QA,
            safety, sustainability and the vendor ecosystem behind every
            mandate. None of them are accidental.
          </p>
          <hr className="ue-rule" style={{ margin: "56px 0 48px" }} />
          <StatsGrid items={APPROACH_STATS} />
        </div>
      </section>

      <section className="ue-section" style={{ paddingTop: 0 }}>
        <div className="ue-container">
          <div style={{ borderTop: "1px solid var(--border-color)" }}>
            {SECTIONS.map((s) => (
              <Fragment key={s.num}>
              <article
                style={{
                  padding: "64px 0",
                  borderBottom: "1px solid var(--border-color)",
                }}
              >
                <div className="grid md:grid-cols-[160px_minmax(0,1fr)] gap-8 md:gap-12 items-start">
                  <div
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 13,
                      color: "var(--fg-muted)",
                    }}
                  >
                    {s.num}
                  </div>
                  <div>
                    <p
                      className="ue-eyebrow"
                      style={{ color: "var(--accent-500)" }}
                    >
                      {s.eyebrow}
                    </p>
                    <h2
                      style={{
                        marginTop: 8,
                        fontFamily: "var(--font-display)",
                        fontWeight: 500,
                        fontSize: 36,
                        letterSpacing: "-0.022em",
                        lineHeight: 1.1,
                        color: "var(--ink-950)",
                        maxWidth: "20ch",
                      }}
                    >
                      {s.title}.
                    </h2>
                    <div
                      style={{
                        marginTop: 24,
                        display: "grid",
                        gridTemplateColumns:
                          "minmax(0, 1.4fr) minmax(0, 1fr)",
                        gap: 32,
                      }}
                      className="md:grid"
                    >
                      <div>
                        {s.paragraphs.map((p, i) => (
                          <p
                            key={i}
                            style={{
                              fontSize: 17,
                              lineHeight: 1.6,
                              color: "var(--ink-700)",
                              marginTop: i > 0 ? 18 : 0,
                              marginBottom: 0,
                            }}
                          >
                            {p}
                          </p>
                        ))}
                      </div>
                      <dl
                        style={{
                          margin: 0,
                          borderTop: "1px solid var(--border-color)",
                          alignSelf: "start",
                        }}
                      >
                        {s.tiles.map((t) => (
                          <div
                            key={t.k}
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "baseline",
                              padding: "10px 0",
                              borderBottom: "1px solid var(--border-color)",
                              fontFamily: "var(--font-mono)",
                              fontSize: 12,
                              gap: 16,
                            }}
                          >
                            <dt style={{ color: "var(--fg-muted)" }}>{t.k}</dt>
                            <dd
                              style={{
                                margin: 0,
                                color: "var(--ink-950)",
                                textAlign: "right",
                              }}
                            >
                              {t.v}
                            </dd>
                          </div>
                        ))}
                      </dl>
                    </div>
                  </div>
                </div>
              </article>
              {s.num === "05" && (
                <div
                  style={{
                    padding: "72px 0",
                    borderBottom: "1px solid var(--border-color)",
                  }}
                >
                  <p
                    className="ue-eyebrow"
                    style={{ color: "var(--accent-500)" }}
                  >
                    On site
                  </p>
                  <div className="ue-stat" style={{ marginTop: 16 }}>
                    <div className="n">Zero</div>
                    <div className="l" style={{ maxWidth: "40ch" }}>
                      Fatalities in the last five years, across 5M+ safe
                      man-hours logged in FY 24-25 alone.
                    </div>
                  </div>
                </div>
              )}
              </Fragment>
            ))}
          </div>
        </div>
      </section>

      <section
        className="ue-section"
        style={{ background: "var(--ink-950)", color: "var(--paper)" }}
      >
        <div
          className="ue-container"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 24,
            alignItems: "flex-start",
          }}
        >
          <p className="ue-eyebrow" style={{ color: "var(--accent-400)" }}>
            Start a project
          </p>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 500,
              fontSize: 44,
              letterSpacing: "-0.022em",
              lineHeight: 1.05,
              margin: 0,
              maxWidth: "18ch",
            }}
          >
            See this discipline in delivery, not just on paper.
          </h2>
          <Button
            asChild
            className="rounded-full h-12 px-7 text-[15px] font-medium bg-[color:var(--paper)] text-[color:var(--ink-950)] hover:bg-[color:var(--ink-100)]"
          >
            <Link href="/contact">
              Talk to an engineer
              <ArrowRight className="size-4 ml-1" aria-hidden />
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
}
