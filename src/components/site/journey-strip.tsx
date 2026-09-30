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
          <p className="ue-eyebrow">The journey</p>
          <h2 className="ue-h2 ue-journey-strip__title">
            From specialist HVAC to multi-discipline EPC.
          </h2>
        </header>
        <div className="ue-journey-strip__grid">
          {highlights.map((m) => (
            <div key={m.id} className="ue-journey-strip__item">
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 13,
                  color: "var(--accent-500)",
                  marginBottom: 8,
                }}
              >
                {m.year}
              </div>
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 500,
                  fontSize: 17,
                  letterSpacing: "-0.012em",
                  margin: 0,
                  color: "var(--ink-950)",
                }}
              >
                {m.title}
              </h3>
              <p
                style={{
                  marginTop: 6,
                  fontSize: 13,
                  lineHeight: 1.5,
                  color: "var(--ink-500)",
                }}
              >
                {m.description}
              </p>
            </div>
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
