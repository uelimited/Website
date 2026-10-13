import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getJourney } from "@/lib/cms";

/**
 * Compressed journey strip — 6 milestone highlights on the home page.
 * Full timeline lives on /firm.
 */
export function JourneyStrip() {
  const all = getJourney();
  const highlights = all.slice(0, 9);

  return (
    <section className="ue-section">
      <div className="ue-container">
        <header className="ue-journey-strip__head">
          <p className="ue-eyebrow">Our story</p>
          <h2 className="ue-h2 ue-journey-strip__title">
            Built from specialist roots to a national delivery platform.
          </h2>
          <p className="ue-journey-strip__intro">
            What began as a focused HVAC practice evolved into a multi-discipline
            engineering business trusted on critical infrastructure and
            mission-critical projects across India.
          </p>
        </header>
        <div className="ue-journey-strip__grid">
          {highlights.map((m) => (
            <article key={m.id} className="ue-journey-strip__item">
              <div className="ue-journey-strip__year">{m.year}</div>
              <h3 className="ue-journey-strip__card-title">{m.title}</h3>
              <p className="ue-journey-strip__card-copy">{m.description}</p>
            </article>
          ))}
        </div>
        <div className="ue-journey-strip__link-wrap">
          <Link
            href="/firm"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              fontSize: 14,
              fontWeight: 500,
              color: "var(--accent-500)",
              textDecoration: "none",
            }}
            className="hover:text-[color:var(--accent-700)]"
          >
            See the full journey
            <ArrowRight className="size-3.5" aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}
