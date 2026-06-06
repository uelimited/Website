"use client";

import { useEffect, useState } from "react";

type Item = { id: string; label: string; num?: string; group?: string };

/**
 * Sticky left-side table of contents for a service article.
 *
 * Scroll-spy: on every scroll event (and once on mount), walk the
 * section ids in order and pick the last one whose top sits at or
 * above a "reading horizon" (~28% of viewport, just under the site
 * header + article bar). That keeps exactly one item highlighted
 * and avoids the edge-case flicker that IntersectionObserver gets
 * when several sections straddle the viewport at once.
 */
export function ArticleTOC({ items }: { items: Item[] }) {
  const [active, setActive] = useState<string | null>(items[0]?.id ?? null);

  useEffect(() => {
    const ids = items.map((it) => it.id);

    const pick = () => {
      const horizon = window.innerHeight * 0.28;
      let current = ids[0] ?? null;
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top;
        if (top - horizon <= 0) current = id;
        else break;
      }
      if (current) setActive(current);
    };

    pick();
    window.addEventListener("scroll", pick, { passive: true });
    window.addEventListener("resize", pick);
    return () => {
      window.removeEventListener("scroll", pick);
      window.removeEventListener("resize", pick);
    };
  }, [items]);

  const groups = groupItems(items);

  return (
    <nav className="ue-article-toc" aria-label="On this page">
      <div className="ue-article-toc__head">On this page</div>
      {groups.map((g, gi) => (
        <div className="ue-article-toc__group" key={gi}>
          {g.heading && (
            <div className="ue-article-toc__heading">{g.heading}</div>
          )}
          <ol className="ue-article-toc__list">
            {g.items.map((it) => (
              <li key={it.id} data-active={active === it.id || undefined}>
                <a href={`#${it.id}`} className="ue-article-toc__link">
                  {it.num && <span className="num">{it.num}</span>}
                  <span className="label">{it.label}</span>
                </a>
              </li>
            ))}
          </ol>
        </div>
      ))}
    </nav>
  );
}

function groupItems(items: Item[]): { heading?: string; items: Item[] }[] {
  const out: { heading?: string; items: Item[] }[] = [];
  let current: { heading?: string; items: Item[] } | null = null;
  for (const it of items) {
    const key = it.group ?? "";
    if (!current || current.heading !== (key || undefined)) {
      current = { heading: key || undefined, items: [] };
      out.push(current);
    }
    current.items.push(it);
  }
  return out;
}
