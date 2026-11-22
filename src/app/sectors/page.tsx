import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { getAllSectors } from "@/lib/cms";
import { InnerHero, InnerCTA } from "@/components/site/inner-page";
import { pageMetadata } from "@/lib/page-metadata";
export const metadata = pageMetadata(
  "Industries",
  "MEPF engineering for data centres, manufacturing, airports, healthcare, education, commercial and residential projects.",
  "/sectors",
);
export default function SectorsPage() {
  return (
    <>
      <InnerHero
        eyebrow="Industries we serve"
        title="Engineering for the way your facility works."
        description="Every environment places different demands on its building systems. We coordinate MEPF services around the needs of the people, processes and operations inside."
      />
      <section className="ue-section" style={{ paddingTop: 0 }}>
        <div className="ue-container ue-inner-cards">
          {getAllSectors().map((s) => (
            <Link
              key={s.id}
              href={`/sectors/${s.slug}`}
              className="ue-inner-card"
            >
              <div className="ue-inner-card-image">
                {s.hero_image_url && (
                  <Image
                    src={s.hero_image_url}
                    alt={s.hero_image_alt || s.name}
                    fill
                    sizes="(max-width:640px) 100vw,(max-width:900px) 50vw,33vw"
                  />
                )}
              </div>
              <div className="ue-inner-card-body">
                <h2>{s.name}</h2>
                <p>{s.short_description}</p>
                <span className="ue-inner-link">
                  Explore industry <ArrowRight size={16} aria-hidden />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <InnerCTA />
    </>
  );
}
