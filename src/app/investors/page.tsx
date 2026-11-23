import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { InvestorDocuments } from "./investor-documents";
import { Button } from "@/components/ui/button";
import { FIRM } from "@/data/firm";

export const metadata: Metadata = {
  title: "Investors — Unique Engineers",
  description:
    "Company profile, operating scale and project track record for Unique Engineers Limited.",
};

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
            <div className="ue-investors__hero-badges" aria-label="Company highlights">
              <span>35+ years</span>
              <span>23 states</span>
              <span>India + SAARC</span>
            </div>
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
              src="/Investor.jpg"
              alt="Engineer reviewing a project plan marked with the Unique Engineers logo"
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

      <InvestorDocuments />
    </main>
  );
}
