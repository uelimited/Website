import { getFeaturedClients } from "@/lib/cms";

export function ClientsWall() {
  const clients = getFeaturedClients();

  return (
    <section className="ue-section">
      <div className="ue-container">
        <header style={{ marginBottom: 32, textAlign: "center" }}>
          <p className="ue-eyebrow">Trusted by</p>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 500,
              fontSize: 32,
              letterSpacing: "-0.022em",
              lineHeight: 1.1,
              margin: "8px auto 0",
              color: "var(--ink-950)",
              maxWidth: "28ch",
            }}
          >
            Operators across India&apos;s most demanding industries.
          </h2>
        </header>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
            gap: 12,
            paddingTop: 24,
            borderTop: "1px solid var(--border-color)",
          }}
        >
          {clients.map((c) => (
            <div
              key={c.id}
              style={{
                padding: "18px 14px",
                textAlign: "center",
                fontFamily: "var(--font-display)",
                fontWeight: 500,
                fontSize: 14,
                letterSpacing: "-0.012em",
                color: "var(--ink-700)",
                border: "1px solid var(--border-color)",
                borderRadius: 8,
                background: "var(--paper)",
              }}
            >
              {c.name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
