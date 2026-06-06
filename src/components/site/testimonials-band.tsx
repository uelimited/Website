import { getTestimonials } from "@/lib/cms";

export function TestimonialsBand() {
  const testimonials = getTestimonials();
  if (!testimonials.length) return null;

  return (
    <section
      className="ue-section"
      style={{
        background: "var(--paper-soft)",
        borderTop: "1px solid var(--border-color)",
        borderBottom: "1px solid var(--border-color)",
      }}
    >
      <div className="ue-container">
        <header style={{ marginBottom: 32 }}>
          <p className="ue-eyebrow">Client voice</p>
          <h2
            className="ue-h2"
            style={{ marginTop: 8, maxWidth: "20ch" }}
          >
            In their words.
          </h2>
        </header>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: 20,
          }}
        >
          {testimonials.map((t) => (
            <blockquote
              key={t.id}
              style={{
                margin: 0,
                padding: "28px",
                borderLeft: "3px solid var(--accent-500)",
                background: "var(--paper)",
                borderRadius: "0 12px 12px 0",
              }}
            >
              <p
                style={{
                  margin: 0,
                  fontFamily: "var(--font-display)",
                  fontStyle: "italic",
                  fontSize: 19,
                  lineHeight: 1.45,
                  letterSpacing: "-0.012em",
                  color: "var(--ink-950)",
                }}
              >
                &ldquo;{t.quote}&rdquo;
              </p>
              <footer
                style={{
                  marginTop: 16,
                  fontSize: 14,
                  color: "var(--ink-500)",
                }}
              >
                <strong
                  style={{ color: "var(--ink-950)", fontWeight: 500 }}
                >
                  {t.author_name}
                </strong>{" "}
                · {t.author_role}, {t.author_company}
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
