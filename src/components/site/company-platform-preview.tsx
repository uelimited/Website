import Link from "next/link";
import { ArrowRight } from "lucide-react";

const SECTIONS = [
  [
    "Leadership",
    "/leadership",
    "Founder-directors, directors and senior functional ownership.",
  ],
  [
    "Culture",
    "/culture",
    "The behaviours expected in offices, on sites and at handover.",
  ],
  [
    "Engineering strength",
    "/engineering-strength",
    "Design, planning, procurement, assurance and commissioning.",
  ],
  [
    "Workforce model",
    "/workforce",
    "Core teams, supervised capacity and continuity controls.",
  ],
  [
    "Journey",
    "/journey",
    "Scroll through the milestones that expanded the practice.",
  ],
  [
    "Innovation & AI",
    "/innovation-ai",
    "Responsible AI, structured knowledge and digital delivery.",
  ],
];

export function CompanyPlatformPreview() {
  return (
    <section className="ue-company-platform">
      <div className="ue-container">
        <header className="ue-company-section-head">
          <div>
            <p className="ue-eyebrow">The organisation behind the projects</p>
            <h2 className="ue-h2">Scale needs an operating system.</h2>
          </div>
          <p>
            Project photographs show the output. These company sections show the
            leadership, people, controls and knowledge that make delivery
            repeatable.
          </p>
        </header>
        <div className="ue-company-platform__grid">
          {SECTIONS.map(([title, href, body], index) => (
            <Link href={href} key={href}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{title}</h3>
              <p>{body}</p>
              <ArrowRight aria-hidden />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
