import { getAllServices } from "@/lib/cms";
import {
  ServicesExplorer,
  type ExplorerService,
} from "@/components/site/services-explorer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Capabilities — Unique Engineers",
  description:
    "Eight disciplines under one delivery standard: civil, HVAC, electrical, plumbing, firefighting, solar, building management and integrated O&M.",
};

export default function ServicesIndexPage() {
  const services: ExplorerService[] = getAllServices().map((s) => ({
    slug: s.slug,
    num: s.num,
    name: s.name,
    blurb: s.blurb,
    tagline: s.tagline ?? s.blurb,
    hero_image_url: s.hero_image_url ?? null,
  }));

  return (
    <section className="ue-section">
      <div className="ue-container">
        <p className="ue-eyebrow">What we do</p>
        <h1 className="ue-h1" style={{ maxWidth: "15ch" }}>
          Eight disciplines. One delivery standard.
        </h1>
        <p className="ue-lead" style={{ marginTop: 32 }}>
          Every discipline is delivered by in-house engineers — the people who
          design it are the people who build it.
        </p>

        <ServicesExplorer services={services} />
      </div>
    </section>
  );
}
