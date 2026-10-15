import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { CAREER_OPENINGS, CAREERS_HERO } from "@/data/careers";

export const metadata: Metadata = {
  title: "Open positions — Careers at Unique Engineers",
  description:
    "Explore hiring tracks across engineering, project delivery, quality, safety, and operations at Unique Engineers.",
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
            Careers · Open hiring
          </p>
          <h1 className="max-w-[14ch] font-display text-[clamp(40px,6vw,68px)] font-medium leading-[1.04] text-white">
            Find your place on the team.
          </h1>
          <p className="mt-5 max-w-[58ch] text-base leading-7 text-white/80 sm:text-lg">
            Explore the disciplines we hire across and choose the closest fit
                for your experience.
          </p>
        </div>
      </section>

      <section className="ue-section" style={{ padding: "64px 0 96px" }}>
        <div className="ue-container">
          <header className="mb-9 flex flex-col gap-4 border-b border-[color:var(--border-color)] pb-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="ue-eyebrow">Open positions</p>
              <h2 className="text-3xl font-medium text-[color:var(--ink-950)] sm:text-4xl">
                Hiring across disciplines
              </h2>
            </div>
            <p className="max-w-[48ch] text-sm leading-6 text-[color:var(--ink-500)]">
              These are hiring tracks rather than fixed job descriptions. Role
              level and project location are discussed with shortlisted candidates.
            </p>
          </header>

          <div className="grid gap-4 md:grid-cols-2">
            {CAREER_OPENINGS.map((opening, index) => (
              <Link
                key={opening.id}
                href={`/careers/apply?role=${encodeURIComponent(opening.title)}&department=${encodeURIComponent(opening.department)}`}
                className="group flex min-h-52 flex-col justify-between border border-[color:var(--border-color)] bg-white p-5 transition-colors hover:border-[color:var(--accent-400)] sm:p-6"
              >
                <div>
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-mono text-xs text-[color:var(--accent-600)]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="text-xs font-medium uppercase text-[color:var(--ink-400)]">
                      {opening.department}
                    </span>
                  </div>
                  <h3 className="mt-6 max-w-[25ch] text-xl font-medium leading-tight text-[color:var(--ink-950)] sm:text-2xl">
                    {opening.title}
                  </h3>
                  <p className="mt-3 max-w-[52ch] text-sm leading-6 text-[color:var(--ink-600)]">
                    {opening.summary}
                  </p>
                </div>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-[color:var(--accent-700)]">
                  Apply for this role
                  <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>

          <p className="mt-8 border-l-2 border-[color:var(--accent-500)] pl-4 text-sm leading-6 text-[color:var(--ink-600)]">
            Hiring tracks are based on the disciplines listed by Unique Engineers.
            Confirm current vacancies, location, and seniority with the recruiting
            team before applying.
          </p>
        </div>
      </section>
    </main>
  );
}