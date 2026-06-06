import { FIRM } from "@/data/firm";

/** Wordmark — `Unique Engineers.` with the dot in accent colour. */
export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={className}>
      <span>{FIRM.brand}</span>
      <span className="dot">.</span>
    </span>
  );
}
