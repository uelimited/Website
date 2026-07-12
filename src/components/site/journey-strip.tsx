import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getJourney } from "@/lib/cms";

/**
 * Compressed journey strip — 6 milestone highlights on the home page.
 * Full timeline lives on /firm.
 */
export function JourneyStrip() {
  const all = getJourney();
  // Pick a representative subset
  const highlights = [
    all.find((m) => m.year === "1990"),
    all.find((m) => m.year === "2005"),
    all.find((m) => m.year === "2012–2018"),
    all.find((m) => m.year === "2019"),
    all.find((m) => m.year === "2023"),
    all.find((m) => m.year === "2024"),
  ].filter((m): m is NonNullable<typeof m> => Boolean(m));

  return (
    <section className="ue-section">
      <div className="ue-container">
        <header style={{ marginBottom: 40 }}>
          <p className="ue-eyebrow">The journey</p>
          <h2
            className="ue-h2"
            style={{ marginTop: 8, maxWidth: "22ch" }}
          >
            From specialist HVAC to multi-discipline EPC.
          </h2>
        </header>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: 0,
            borderTop: "1px solid var(--border-color)",
            borderBottom: "1px solid var(--border-color)",
          }}
        >
          {highlights.map((m, i) => (
            <div
              key={m.id}
              style={{
                padding: "24px 16px 24px 0",
                paddingLeft: i > 0 ? 24 : 0,
                borderRight:
                  i < highlights.length - 1
                    ? "1px solid var(--border-color)"
                    : "none",
              }}
            >
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
        <div style={{ marginTop: 24, textAlign: "right" }}>
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
