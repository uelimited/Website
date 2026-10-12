import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FIRM, OVERVIEW } from "@/data/firm";

export const metadata: Metadata = {
  title: "Investors — Unique Engineers",
  description:
    "Company profile, operating scale and project track record for Unique Engineers Limited.",
};

const INVESTOR_STATS = [
  OVERVIEW.stats[0],
  OVERVIEW.stats[1],
  OVERVIEW.stats[2],
  OVERVIEW.stats[4],
  OVERVIEW.stats[5],
];

const DELIVERY_AREAS = [
  "Civil construction",
  "Mechanical, electrical, plumbing and firefighting",
  "Solar and integrated building systems",
];

export default function InvestorsPage() {
  return (
    <main className="ue-investors">
      <section className="ue-investors__hero">
        <div className="ue-container ue-investors__hero-grid">
          <div className="ue-investors__hero-copy">
            <p className="ue-eyebrow">Investor relations</p>
            <h1>Critical infrastructure. Disciplined delivery.</h1>
            <p className="ue-investors__lead">
              Unique Engineers Limited is a multi-disciplinary engineering and
              contracting practice operating across India since{" "}
              {FIRM.foundedYear}.
            </p>
            <div className="ue-investors__actions">
              <Button asChild size="lg">
                <Link href="/work">
                  Explore project record <ArrowRight aria-hidden />
                </Link>
              </Button>
              <Link className="ue-investors__text-link" href="/contact">
                Company enquiries <ArrowUpRight aria-hidden />
              </Link>
            </div>
          </div>
          <figure className="ue-investors__hero-figure">
            <Image
              src="/firm/team-on-site.jpg"
              alt="Unique Engineers team coordinating work at an active project site"
              fill
              priority
              sizes="(max-width: 760px) 100vw, 48vw"
            />
            <figcaption>
              In-house teams across engineering and execution.
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="ue-investors__facts" aria-label="Company at a glance">
        <div className="ue-container ue-investors__facts-grid">
          {INVESTOR_STATS.map((stat) => (
            <div className="ue-investors__fact" key={stat.l}>
              <p>
                {stat.n}
                {stat.unit && <span> {stat.unit}</span>}
              </p>
              <h2>{stat.l}</h2>
            </div>
          ))}
        </div>
      </section>

      <section className="ue-section">
        <div className="ue-container ue-investors__operating-grid">
          <header>
            <p className="ue-eyebrow">Operating platform</p>
            <h2>One practice across the project lifecycle.</h2>
          </header>
          <div>
            <p className="ue-investors__body">{OVERVIEW.lead}</p>
            <ul className="ue-investors__delivery-list">
              {DELIVERY_AREAS.map((area, index) => (
                <li key={area}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  {area}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="ue-investors__track-record">
        <div className="ue-container ue-investors__track-grid">
          <div>
            <p className="ue-eyebrow">Project record</p>
            <h2>Scale and delivery, project by project.</h2>
            <p className="ue-investors__body">
              Review the project ledger and case studies by sector, service and
              location. The record includes delivered work and projects in
              progress, clearly identified by status.
            </p>
          </div>
          <div className="ue-investors__track-link">
            <p>Browse the work and delivery record.</p>
            <Link href="/work" aria-label="Explore projects and project ledger">
              <span>Explore projects</span>
              <ArrowUpRight aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      <section className="ue-investors__contact">
        <div className="ue-container ue-investors__contact-inner">
          <div>
            <p className="ue-eyebrow">Company information</p>
            <h2>For corporate and investor enquiries.</h2>
            <p>
              Contact Unique Engineers Limited for company information or to
              direct an enquiry to the appropriate team.
            </p>
          </div>
          <Button asChild size="lg" className="ue-investors__contact-button">
            <Link href="/contact">
              Contact the company <ArrowRight aria-hidden />
            </Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
