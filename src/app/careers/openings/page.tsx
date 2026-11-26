import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { CAREERS_HERO } from "@/data/careers";

export const metadata: Metadata = {
  title: "Open positions — Careers at Unique Engineers",
  description: "We will announce new positions here when they become available.",
};

export default function CareerOpeningsPage() {
  return (
    <main>
      <section className="relative isolate flex min-h-[360px] items-end overflow-hidden bg-[color:var(--ink-950)] py-14 sm:min-h-[420px] sm:py-16">
        <Image
          src={CAREERS_HERO.image}
          alt={CAREERS_HERO.imageAlt}
          fill
          priority
          sizes="100vw"
          className="-z-20 object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/85 via-black/55 to-black/20" />
        <div className="ue-container w-full">
          <Link
            href="/careers"
            className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-white/80 transition-colors hover:text-white"
          >
            <ArrowRight aria-hidden className="size-4 rotate-180" />
            Careers at Unique
          </Link>
          <p className="ue-eyebrow text-[color:var(--accent-300)]">
            Careers · Job openings
          </p>
          <h1 className="max-w-[22ch] font-display text-[clamp(40px,6vw,68px)] font-medium leading-[1.04] text-white">
            No open positions at the moment.
          </h1>
          <p className="mt-5 max-w-[58ch] text-base leading-7 text-white/80 sm:text-lg">
            We will announce new positions here when they become available.
          </p>
        </div>
      </section>
    </main>
  );
}