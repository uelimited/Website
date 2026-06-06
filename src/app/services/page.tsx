import Link from "next/link";
import { getAllServices } from "@/lib/cms";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Capabilities — Unique Engineers",
  description:
    "Eight disciplines under one delivery standard: civil, HVAC, electrical, plumbing, firefighting, solar, building management and integrated O&M.",
};

export default function ServicesIndexPage() {
  const services = getAllServices();

  return (
    <section className="ue-section">
      <div className="ue-container">
        <p className="ue-eyebrow">Capabilities</p>
        <h1 className="ue-h1" style={{ maxWidth: "15ch" }}>
          Eight disciplines. One delivery standard.
        </h1>
        <p className="ue-lead" style={{ marginTop: 32 }}>
          Every discipline is delivered by in-house engineers. Design is not brokered.
        </p>

        <div style={{ marginTop: 72, borderTop: "1px solid var(--border-color)" }}>
          {services.map((d) => (
            <Link
              key={d.slug}
              href={`/services/${d.slug}`}
              className="ue-service-row"
            >
              <span className="num">{d.num}</span>
              <span className="name">{d.name}</span>
              <span className="desc">{d.blurb}</span>
              <span className="scope">{d.scope_unit}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
