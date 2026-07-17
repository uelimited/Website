import Link from "next/link";
import { Fragment } from "react";

export type Crumb = {
  label: string;
  href?: string;
  badge?: string; // e.g. "02" for numbered category
};

export function Breadcrumb({ items }: { items: Crumb[] }) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="ue-breadcrumb"
      style={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        gap: 8,
        fontFamily: "var(--font-mono)",
        fontSize: 12,
        color: "var(--fg-muted)",
        letterSpacing: 0,
        textTransform: "uppercase",
      }}
    >
      {items.map((item, i) => {
        const isLast = i === items.length - 1;
        return (
          <Fragment key={`${item.label}-${i}`}>
            {item.href && !isLast ? (
              <Link
                href={item.href}
                style={{
                  color: "var(--fg-muted)",
                  textDecoration: "none",
                  transition: "color var(--dur-1) var(--ease-std)",
                }}
                className="hover:text-[color:var(--ink-950)]"
              >
                {item.label}
              </Link>
            ) : (
              <span
                style={{ color: isLast ? "var(--ink-950)" : "var(--fg-muted)" }}
              >
                {item.label}
              </span>
            )}
            {item.badge && (
              <span
                style={{
                  color: "var(--fg-subtle)",
                  fontSize: 11,
                }}
              >
                · {item.badge}
              </span>
            )}
            {!isLast && (
              <span aria-hidden style={{ color: "var(--fg-subtle)" }}>
                /
              </span>
            )}
          </Fragment>
        );
      })}
    </nav>
  );
}
