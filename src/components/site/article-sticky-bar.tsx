import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ServiceProject } from "@/data/subservices";

/**
 * Sticky article band that sits under the site header on service
 * detail pages.
 *
 * The "crumb" (discipline number + name) anchors the reader on
 * the left, and the real estate on the right is dedicated to
 * related-project cards. Each card is a small product tile — a
 * coloured thumbnail, the project name, and a typology · location
 * meta line — so the projects read as clickable work, not as
 * utility chips.
 */
export function ArticleStickyBar({
  num,
  name,
  projects,
}: {
  num: string;
  name: string;
  projects: ServiceProject[];
}) {
  return (
    <div className="ue-article-bar">
      <div className="ue-article-bar__inner">
        <div className="ue-article-bar__crumb">
          <span className="ue-article-bar__crumb-num">{num}</span>
          <span className="ue-article-bar__crumb-name">{name}</span>
        </div>

        <div className="ue-article-bar__projects">
          <span className="ue-article-bar__label">
            Projects in this discipline
          </span>
          <div className="ue-article-bar__cards">
            {projects.map((p, i) => {
              const idx = String(i + 1).padStart(2, "0");
              return (
                <Link
                  key={p.code}
                  href="/work"
                  className="ue-article-bar__card"
                >
                  <span
                    className="ue-article-bar__thumb"
                    aria-hidden
                    data-i={i}
                  >
                    {idx}
                  </span>
                  <span className="ue-article-bar__card-body">
                    <span className="ue-article-bar__card-name">
                      {p.name}
                    </span>
                    <span className="ue-article-bar__card-meta">
                      {p.typology} · {p.location}
                    </span>
                  </span>
                  <ArrowUpRight
                    className="ue-article-bar__card-arrow size-4"
                    aria-hidden
                  />
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
