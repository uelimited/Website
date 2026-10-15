import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Breadcrumb } from "@/components/site/breadcrumb";
import { FIRM } from "@/data/firm";
import {
  CAREERS_HERO,
  CAREERS_PITCH,
  CULTURE_PILLARS,
  CAREERS_OFFERS,
  CAREERS_GROWTH,
  CAREERS_PATHS,
} from "@/data/careers";

export const metadata: Metadata = {
  title: "Why join us — Careers at Unique Engineers",
  description:
    "Build India's most demanding projects alongside people invested in your growth. Collaborative in-house teams, marquee projects, mentorship under 40-year veterans, and range across nine sectors.",
};

export default function CareersPage() {
  return (
    <>
      {/* Hero */}
      <section
        style={{
          position: "relative",
          minHeight: "66vh",
          background: `linear-gradient(180deg, rgba(10,12,16,0.35) 0%, rgba(10,12,16,0.82) 100%), url(${CAREERS_HERO.image}) center/cover no-repeat`,
          color: "var(--paper)",
          display: "flex",
          alignItems: "flex-end",
          paddingTop: 128,
          paddingBottom: 72,
        }}
      >
        <div className="ue-container" style={{ width: "100%" }}>
          <p
            className="ue-eyebrow"
            style={{ color: "var(--accent-400)", margin: 0 }}
          >
            {CAREERS_HERO.eyebrow}
          </p>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 500,
              fontSize: "clamp(44px, 6.8vw, 78px)",
              letterSpacing: "-0.03em",
              lineHeight: 1.01,
              margin: "16px 0 0",
              maxWidth: "17ch",
              color: "var(--paper)",
            }}
          >
            {CAREERS_HERO.title}
          </h1>
          <p
            style={{
              marginTop: 22,
              fontSize: "clamp(17px, 1.3vw, 21px)",
              lineHeight: 1.5,
              color: "rgba(255,255,255,0.86)",
              maxWidth: "60ch",
            }}
          >
            {CAREERS_HERO.lead}
          </p>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 12,
              marginTop: 34,
            }}
          >
            <Button
              asChild
              className="rounded-full h-12 px-7 text-[15px] font-medium bg-[color:var(--paper)] text-[color:var(--ink-950)] hover:bg-[color:var(--ink-100)]"
            >
              <Link href="/careers/openings">
                Open hiring
                <ArrowRight className="size-4 ml-1" aria-hidden />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="h-12 rounded-full border-white/50 bg-white/10 px-7 text-[15px] font-medium text-white hover:bg-white/20 hover:text-white"
            >
              <Link href="/careers/apply">Apply directly</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Breadcrumb */}
      <section
        style={{
          background: "var(--paper)",
          borderBottom: "1px solid var(--border-color)",
          padding: "16px 0",
        }}
      >
        <div className="ue-container">
          <Breadcrumb items={[{ label: "Careers" }]} />
        </div>
      </section>

      {/* The pitch — three pains, answered */}
      <section style={{ padding: "96px 0" }}>
        <div className="ue-container">
          <div className="grid md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.3fr)] gap-10 md:gap-20 items-start">
            <div>
              <p className="ue-eyebrow">{CAREERS_PITCH.eyebrow}</p>
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 500,
                  fontSize: "clamp(32px, 3.8vw, 48px)",
                  letterSpacing: "-0.025em",
                  lineHeight: 1.05,
                  margin: "10px 0 0",
                  color: "var(--ink-950)",
                  maxWidth: "14ch",
                }}
              >
                {CAREERS_PITCH.title}
              </h2>
            </div>
            <div>
              {CAREERS_PITCH.body.map((p, i) => (
                <p
                  key={i}
                  style={{
                    fontSize: 19,
                    lineHeight: 1.6,
                    color: "var(--ink-700)",
                    margin: i > 0 ? "24px 0 0" : 0,
                  }}
                >
                  {p}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Culture pillars */}
      <section
        style={{
          padding: "96px 0",
          background: "var(--paper-soft)",
          borderTop: "1px solid var(--border-color)",
          borderBottom: "1px solid var(--border-color)",
        }}
      >
        <div className="ue-container">
          <header style={{ marginBottom: 56, maxWidth: 640 }}>
            <p className="ue-eyebrow">What it&apos;s like here</p>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 500,
                fontSize: "clamp(30px, 3.4vw, 44px)",
                letterSpacing: "-0.024em",
                lineHeight: 1.06,
                margin: "10px 0 0",
                color: "var(--ink-950)",
              }}
            >
              Four things you&apos;ll feel in the first month.
            </h2>
          </header>
          <div className="grid md:grid-cols-2 gap-x-16 gap-y-14">
            {CULTURE_PILLARS.map((p) => (
              <div key={p.num}>
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 13,
                    color: "var(--accent-500)",
                    letterSpacing: 0.5,
                    marginBottom: 14,
                  }}
                >
                  {p.num}
                </div>
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 500,
                    fontSize: 24,
                    letterSpacing: "-0.018em",
                    lineHeight: 1.15,
                    margin: 0,
                    color: "var(--ink-950)",
                    maxWidth: "20ch",
                  }}
                >
                  {p.title}
                </h3>
                <p
                  style={{
                    marginTop: 14,
                    fontSize: 16,
                    lineHeight: 1.6,
                    color: "var(--ink-700)",
                    maxWidth: "48ch",
                  }}
                >
                  {p.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What you get */}
      <section
        style={{
          padding: "96px 0",
          background: "var(--paper-soft)",
          borderTop: "1px solid var(--border-color)",
          borderBottom: "1px solid var(--border-color)",
        }}
      >
        <div className="ue-container">
          <header style={{ marginBottom: 48, maxWidth: 640 }}>
            <p className="ue-eyebrow">What you get</p>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 500,
                fontSize: "clamp(30px, 3.4vw, 44px)",
                letterSpacing: "-0.024em",
                lineHeight: 1.06,
                margin: "10px 0 0",
                color: "var(--ink-950)",
              }}
            >
              The parts that can be put in writing.
            </h2>
          </header>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: 16,
            }}
          >
            {CAREERS_OFFERS.map((o) => (
              <div
                key={o.title}
                style={{
                  padding: "28px 26px 30px",
                  background: "var(--paper)",
                  border: "1px solid var(--border-color)",
                  borderRadius: 14,
                }}
              >
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 500,
                    fontSize: 19,
                    letterSpacing: "-0.014em",
                    lineHeight: 1.2,
                    margin: 0,
                    color: "var(--ink-950)",
                  }}
                >
                  {o.title}
                </h3>
                <p
                  style={{
                    marginTop: 10,
                    fontSize: 15,
                    lineHeight: 1.55,
                    color: "var(--ink-500)",
                  }}
                >
                  {o.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Where you'd fit */}
      <section style={{ padding: "88px 0" }}>
        <div className="ue-container">
          <div className="grid md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] gap-10 md:gap-20 items-start">
            <div>
              <p className="ue-eyebrow">Where you&apos;d fit</p>
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 500,
                  fontSize: "clamp(28px, 3vw, 38px)",
                  letterSpacing: "-0.022em",
                  lineHeight: 1.1,
                  margin: "10px 0 0",
                  color: "var(--ink-950)",
                  maxWidth: "16ch",
                }}
              >
                Hiring for strength, across disciplines.
              </h2>
              <p
                style={{
                  marginTop: 16,
                  fontSize: 16,
                  lineHeight: 1.6,
                  color: "var(--ink-500)",
                  maxWidth: "48ch",
                }}
              >
                Fresh out of college or fifteen years in — if you&apos;re good
                and you want to get better, a bench is waiting for you.
              </p>
            </div>
            <ul
              style={{
                listStyle: "none",
                margin: 0,
                padding: 0,
                borderTop: "1px solid var(--border-color)",
              }}
            >
              {CAREERS_PATHS.map((p) => (
                <li
                  key={p}
                  style={{
                    padding: "18px 0",
                    borderBottom: "1px solid var(--border-color)",
                    fontFamily: "var(--font-display)",
                    fontWeight: 500,
                    fontSize: 19,
                    letterSpacing: "-0.014em",
                    color: "var(--ink-950)",
                  }}
                >
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* CV submission */}
      <section style={{ padding: "88px 0" }}>
        <div className="ue-container">
          <div
            style={{
              position: "relative",
              border: "1px solid var(--border-color)",
              borderRadius: 22,
              background:
                "linear-gradient(135deg, rgba(242,245,248,0.96) 0%, rgba(255,255,255,0.98) 100%)",
              padding: "34px clamp(20px, 4vw, 46px)",
              display: "grid",
              gap: 22,
              boxShadow: "0 18px 40px rgba(14, 25, 35, 0.06)",
            }}
          >
            <div style={{ display: "grid", gap: 12 }}>
              <p className="ue-eyebrow">Why join us · Working at Unique</p>
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 500,
                  fontSize: "clamp(30px, 3.3vw, 44px)",
                  letterSpacing: "-0.022em",
                  lineHeight: 1.08,
                  margin: 0,
                  color: "var(--ink-950)",
                  maxWidth: "16ch",
                }}
              >
                Bring your skills to a bigger kind of work.
              </h2>
            </div>
            <p
              style={{
                margin: 0,
                fontSize: 17,
                lineHeight: 1.7,
                color: "var(--ink-700)",
                maxWidth: "60ch",
              }}
            >
              Join an in-house team that values execution, invests in growth,
              and delivers landmark projects across India. Explore the
              disciplines we hire for and submit your profile through our
              application form.
            </p>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 16,
                alignItems: "center",
              }}
            >
              <Button
                asChild
                className="rounded-full h-12 px-7 text-[15px] font-medium bg-[color:var(--accent-500)] text-[color:var(--paper)] hover:bg-[color:var(--accent-600)] shadow-[0_12px_26px_rgba(194,46,30,0.25)]"
              >
                <Link href="/careers/openings">
                  Open hiring
                  <ArrowRight className="size-4 ml-1" aria-hidden />
                </Link>
              </Button>
              <a
                href={`mailto:${FIRM.contactEmail}`}
                style={{
                  fontSize: 15,
                  color: "var(--accent-700)",
                  fontWeight: 500,
                  textDecoration: "underline",
                  textUnderlineOffset: 3,
                }}
              >
                Questions? {FIRM.contactEmail}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Growth band */}
      <section
        className="ue-section"
        style={{ background: "var(--ink-950)", color: "var(--paper)" }}
      >
        <div className="ue-container">
          <p className="ue-eyebrow" style={{ color: "var(--accent-400)" }}>
            {CAREERS_GROWTH.eyebrow}
          </p>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 500,
              fontSize: "clamp(32px, 4vw, 48px)",
              letterSpacing: "-0.024em",
              lineHeight: 1.05,
              margin: "12px 0 0",
              maxWidth: "18ch",
              color: "var(--paper)",
            }}
          >
            {CAREERS_GROWTH.title}
          </h2>
          <p
            style={{
              marginTop: 20,
              fontSize: 18,
              lineHeight: 1.55,
              color: "rgba(255,255,255,0.75)",
              maxWidth: "58ch",
            }}
          >
            {CAREERS_GROWTH.body}
          </p>
          <div
            style={{
              marginTop: 48,
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
              gap: 0,
              borderTop: "1px solid rgba(255,255,255,0.14)",
            }}
          >
            {CAREERS_GROWTH.stats.map((s, i) => (
              <div
                key={s.l}
                style={{
                  padding: "28px 20px 8px",
                  paddingLeft: i > 0 ? 24 : 0,
                  borderRight:
                    i < CAREERS_GROWTH.stats.length - 1
                      ? "1px solid rgba(255,255,255,0.14)"
                      : "none",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 500,
                    fontSize: 40,
                    letterSpacing: "-0.024em",
                    lineHeight: 1,
                    color: "var(--paper)",
                    fontVariantNumeric: "tabular-nums",
                  }}
                >
                  {s.n}
                </div>
                <div
                  style={{
                    marginTop: 10,
                    fontSize: 13,
                    lineHeight: 1.45,
                    color: "rgba(255,255,255,0.6)",
                  }}
                >
                  {s.l}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </>
  );
}
