import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getServiceById } from "@/lib/cms";
import type { ServiceCategory } from "@/data/cms/types";

export function PairsWith({ categories }: { categories: ServiceCategory[] }) {
  if (!categories.length) return null;
  return (
    <section
      style={{
        marginTop: 64,
        paddingTop: 32,
        borderTop: "1px solid var(--border-color)",
      }}
    >
      <p
        className="ue-eyebrow"
        style={{ marginBottom: 24 }}
      >
        Pairs with
      </p>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 16,
        }}
      >
        {categories.map((c) => {
          const service = getServiceById(c.service_id);
          if (!service) return null;
          return (
            <Link
              key={c.id}
              href={`/services/${service.slug}/${c.slug}`}
              style={{
                display: "block",
                padding: "16px 18px",
                border: "1px solid var(--border-color)",
                borderRadius: 10,
                background: "var(--paper)",
                textDecoration: "none",
                color: "inherit",
                transition: "border-color var(--dur-1) var(--ease-std), background var(--dur-1) var(--ease-std)",
              }}
              className="hover:border-[color:var(--ink-300)] hover:bg-[color:var(--paper-soft)] group"
            >
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  color: "var(--fg-muted)",
                  textTransform: "uppercase",
                  letterSpacing: 0.4,
                  marginBottom: 4,
                }}
              >
                {service.name}
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 8,
                  fontFamily: "var(--font-display)",
                  fontSize: 16,
                  fontWeight: 500,
                  letterSpacing: "-0.012em",
                  color: "var(--ink-950)",
                }}
              >
                <span>{c.name}</span>
                <ArrowRight
                  className="size-4 text-[color:var(--fg-muted)] transition-transform group-hover:translate-x-0.5"
                  aria-hidden
                />
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
