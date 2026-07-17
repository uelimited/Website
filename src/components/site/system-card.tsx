import type { ServiceCategorySystem } from "@/data/cms/types";

export function SystemCard({ system }: { system: ServiceCategorySystem }) {
  return (
    <article
      style={{
        padding: "28px 24px",
        border: "1px solid var(--border-color)",
        borderRadius: 12,
        background: "var(--paper)",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <h3
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 500,
          fontSize: 18,
          letterSpacing: "-0.012em",
          lineHeight: 1.2,
          margin: 0,
          color: "var(--ink-950)",
        }}
      >
        {system.name}
      </h3>
      <p
        style={{
          marginTop: 10,
          marginBottom: system.specs?.length ? 18 : 0,
          fontSize: 14,
          lineHeight: 1.55,
          color: "var(--ink-500)",
          flex: 1,
        }}
      >
        {system.description}
      </p>
      {system.specs && system.specs.length > 0 && (
        <dl
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: 0,
            margin: 0,
            borderTop: "1px solid var(--border-color)",
            paddingTop: 14,
          }}
        >
          {system.specs.map((s) => (
            <div
              key={s.k}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
                padding: "6px 0",
                fontFamily: "var(--font-mono)",
                fontSize: 12,
                color: "var(--ink-700)",
                gap: 12,
              }}
            >
              <dt style={{ color: "var(--fg-muted)", whiteSpace: "nowrap" }}>
                {s.k}
              </dt>
              <dd style={{ margin: 0, textAlign: "right" }}>{s.v}</dd>
            </div>
          ))}
        </dl>
      )}
    </article>
  );
}
