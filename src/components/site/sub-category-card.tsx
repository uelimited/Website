import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ServiceCategory } from "@/data/cms/types";

const TYPE_LABELS: Record<ServiceCategory["category_type"], string> = {
  system_layer: "System layer",
  application: "Application",
  specialised: "Specialised",
};

export function SubCategoryCard({
  serviceSlug,
  category,
}: {
  serviceSlug: string;
  category: ServiceCategory;
}) {
  return (
    <Link
      href={`/services/${serviceSlug}/${category.slug}`}
      className="ue-subcat-card group"
      style={{
        display: "block",
        padding: "32px 28px 36px",
        border: "1px solid var(--border-color)",
        borderRadius: 14,
        background: "var(--paper)",
        textDecoration: "none",
        color: "inherit",
        transition: "border-color var(--dur-2) var(--ease-std), transform var(--dur-2) var(--ease-std), box-shadow var(--dur-2) var(--ease-std)",
        position: "relative",
        height: "100%",
      }}
    >
      <header
        style={{
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
          marginBottom: 28,
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 13,
            color: "var(--fg-muted)",
          }}
        >
          {category.num}
        </span>
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            color: "var(--accent-500)",
            textTransform: "uppercase",
            letterSpacing: 0.4,
          }}
        >
          {TYPE_LABELS[category.category_type]}
        </span>
      </header>

      <h3
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 500,
          fontSize: 26,
          letterSpacing: "-0.018em",
          lineHeight: 1.15,
          margin: 0,
          color: "var(--ink-950)",
        }}
      >
        {category.name}
      </h3>

      <p
        style={{
          marginTop: 14,
          marginBottom: 24,
          fontSize: 15,
          lineHeight: 1.55,
          color: "var(--ink-500)",
        }}
      >
        {category.short_blurb}
      </p>

      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          fontSize: 13,
          fontWeight: 500,
          color: "var(--accent-500)",
          transition: "color var(--dur-1) var(--ease-std)",
        }}
        className="group-hover:text-[color:var(--accent-700)]"
      >
        View discipline
        <ArrowUpRight
          className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          aria-hidden
        />
      </div>
    </Link>
  );
}
