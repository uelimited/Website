import { cn } from "@/lib/utils";

type Item = { label: string; value: string; mono?: boolean };

/** Quiet label/value metadata strip — replaces the old title-block. */
export function MetadataRow({
  items,
  invert,
  className,
}: {
  items: Item[];
  invert?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("ue-meta-row", invert && "ue-meta-row--invert", className)}>
      {items.map((it, i) => (
        <div key={i} className="item">
          <div className="label">{it.label}</div>
          <div
            className="value"
            style={{ fontFamily: it.mono === false ? "var(--font-body)" : "var(--font-mono)" }}
          >
            {it.value}
          </div>
        </div>
      ))}
    </div>
  );
}
