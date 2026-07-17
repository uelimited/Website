import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FIRM } from "@/data/firm";

/**
 * Closing contact CTA — minimal black conclusion panel.
 *
 * Stacked layout, from top: (1) headline + primary CTA alongside the
 * India outline map, (2) a prominent "presence" band that calls out
 * pan-India operation and neighbouring-country delivery, (3) the
 * full head-office address as its own block, (4) a compact phone /
 * hours / mobilisation strip.
 */

const METROS = [
  "Gurugram",
  "Delhi NCR",
  "Mumbai",
  "Bangalore",
  "Chennai",
  "Hyderabad",
  "Pune",
  "Kolkata",
  "Ahmedabad",
];

const NEIGHBOURS = ["Bangladesh", "Nepal", "Maldives"];

export function ContactCTA() {
  return (
    <section className="ue-cta">
      <div className="ue-container">
        <div className="ue-cta__grid">
          <div className="ue-cta__text">
            <p className="ue-eyebrow ue-cta__eyebrow">Contact</p>
            <h2 className="ue-cta__title">Get in touch.</h2>
            <p className="ue-cta__lead">
              Start a project, review a scope, or ask a question. A principal
              engineer will respond within two business days.
            </p>
            <div className="ue-cta__actions">
              <Button
                asChild
                className="rounded-full h-12 px-7 text-[15px] font-medium"
              >
                <Link href="/contact">
                  Get in touch
                  <ArrowRight className="size-4 ml-1" aria-hidden />
                </Link>
              </Button>
              <a href={`mailto:${FIRM.contactEmail}`} className="ue-cta__mail">
                {FIRM.contactEmail}
              </a>
            </div>
          </div>

          <div className="ue-cta__map">
            <Image
              src="/india.svg"
              alt="Map of India — Unique Engineers' area of operation"
              width={1000}
              height={1000}
              className="ue-map__image"
              priority={false}
            />
          </div>
        </div>

        <div className="ue-cta__presence">
          <p className="ue-cta__presence-label">Operating across</p>
          <h3 className="ue-cta__presence-title">
            Pan-India and neighbouring countries.
          </h3>
          <dl className="ue-cta__presence-list">
            <div>
              <dt>Metros</dt>
              <dd>{METROS.join(" · ")}</dd>
            </div>
            <div>
              <dt>Beyond India</dt>
              <dd>{NEIGHBOURS.join(" · ")}</dd>
            </div>
          </dl>
        </div>

        <div className="ue-cta__office">
          <p className="ue-cta__office-label">Head office</p>
          <address className="ue-cta__office-address">
            {FIRM.headquarters.label}
            <br />
            {FIRM.headquarters.address.split("\n").map((line, i, arr) => (
              <span key={i}>
                {line}
                {i < arr.length - 1 && <br />}
              </span>
            ))}
          </address>
        </div>

        <dl className="ue-cta__meta">
          <div>
            <dt>Phone</dt>
            <dd>{FIRM.headquarters.phone}</dd>
          </div>
          <div>
            <dt>Hours</dt>
            <dd>{FIRM.hours}</dd>
          </div>
          <div>
            <dt>Mobilisation</dt>
            <dd>10 days · nationwide</dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
