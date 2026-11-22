import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { CSSProperties, ReactNode } from "react";
import type {
  CapItem,
  CapProject,
  CapStep,
  CapTile,
} from "@/data/capability/types";

const cols = (n: number): CSSProperties => ({ ["--cols" as string]: n });
const idx = (i: number): CSSProperties => ({ ["--i" as string]: i });
const pad = (n: number) => String(n).padStart(2, "0");

/** Wrapper for one block of a capability page. */
export function CapSection({
  id,
  tone,
  flush,
  className,
  children,
}: {
  id: string;
  tone?: "plain" | "soft";
  /** Continues the section above, so it sits closer to it. */
  flush?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className={[
        "ue-cap-section",
        tone === "soft" ? "ue-cap-section--soft" : "",
        flush ? "ue-cap-section--flush-top" : "",
        className || "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </section>
  );
}

export function CapHead({
  eyebrow,
  title,
  lede,
}: {
  eyebrow?: string;
  title?: string;
  lede?: string;
}) {
  if (!eyebrow && !title && !lede) return null;
  return (
    <header
      className={`ue-cap-head${lede ? "" : " ue-cap-head--solo"}`}
      data-reveal=""
    >
      <div>
        {eyebrow && <p className="ue-eyebrow">{eyebrow}</p>}
        {title && <h2 className="ue-h2">{title}</h2>}
      </div>
      {lede && <p className="ue-cap-head__lede">{lede}</p>}
    </header>
  );
}

export function CapCards({
  items,
  columns = 4,
  numbered,
  small,
}: {
  items: CapItem[];
  columns?: number;
  numbered?: boolean;
  small?: boolean;
}) {
  return (
    <div
      className={`ue-cap-cards${small ? " ue-cap-cards--small" : ""}`}
      style={cols(columns)}
    >
      {items.map((it, i) => {
        const inner = (
          <>
            {(it.meta || numbered) && (
              <span className="ue-cap-card__meta">{it.meta ?? pad(i + 1)}</span>
            )}
            <h3 className="ue-cap-card__title">{it.title}</h3>
            {it.text && <p className="ue-cap-card__text">{it.text}</p>}
            {it.href && (
              <span className="ue-cap-card__more">
                Learn more <ArrowRight size={15} aria-hidden />
              </span>
            )}
          </>
        );
        // A card with a page of its own opens that page.
        return it.href ? (
          <Link
            key={`${it.title}-${i}`}
            href={it.href}
            className="ue-cap-card ue-cap-card--link"
            data-reveal=""
            style={idx(i % columns)}
          >
            {inner}
          </Link>
        ) : (
          <article
            key={`${it.title}-${i}`}
            className="ue-cap-card"
            data-reveal=""
            style={idx(i % columns)}
          >
            {inner}
          </article>
        );
      })}
    </div>
  );
}

const fact = (p: CapProject, test: RegExp) =>
  p.facts.find((f) => test.test(f.label));

/** Short service names for a project card. */
const CARD_SERVICE: Record<string, string> = {
  hvac: "HVAC",
  electrical: "Electrical",
  phe: "Plumbing",
  fire: "Fire",
  bms: "BMS and ELV",
  civil: "Civil",
};

/** The services a project covers, or its highlight titles where no split exists. */
function projectTags(p: CapProject): string[] {
  const split = (p.split ?? []).filter(
    (s) => s.included !== false && (s.pct === undefined || s.pct > 0),
  );
  if (split.length > 1) return split.map((s) => CARD_SERVICE[s.service]);
  return p.highlights
    .map((h) => h.title)
    .filter(Boolean)
    .slice(0, 4);
}

/**
 * Projects as cards. Each shows where the project is, its value, what
 * the facility is and the services delivered, and opens the project's
 * own page for the overview and the scope of work.
 */
export function CapProjects({ projects }: { projects: CapProject[] }) {
  const n = projects.length;
  const columns = n === 1 ? 1 : n === 2 || n === 4 ? 2 : n >= 7 ? 4 : 3;
  return (
    <div
      className="ue-cap-projects"
      data-count={n === 1 ? "one" : undefined}
      style={cols(columns)}
    >
      {projects.map((p, i) => {
        const status = fact(p, /^status$/i)?.value;
        // The value is shown only where the deck gives a figure.
        const value = fact(p, /value/i)?.value;
        const meta = [
          fact(p, /^location$/i)?.value,
          value && /\d/.test(value) ? value : undefined,
        ]
          .filter(Boolean)
          .join("  ·  ");
        const facility = fact(p, /^facility$/i);
        const what =
          p.lede ||
          [facility?.value, facility?.note].filter(Boolean).join(", ");
        const tags = projectTags(p);
        const inner = (
          <>
            <div className="ue-cap-project__media">
              {p.image && (
                <Image
                  src={p.image}
                  alt={p.imageAlt || p.name}
                  fill
                  sizes="(max-width:640px) 100vw, (max-width:1080px) 50vw, 600px"
                />
              )}
              {status && <span className="ue-cap-tile__tag">{status}</span>}
            </div>
            <div className="ue-cap-project__body">
              <h3 className="ue-cap-project__name">{p.name}</h3>
              {meta && <p className="ue-cap-project__meta">{meta}</p>}
              {what && <p className="ue-cap-project__what">{what}</p>}
              {n === 1 && <p className="ue-cap-project__scope">{p.scope}</p>}
              {tags.length > 0 && (
                <ul className="ue-cap-project__tags">
                  {tags.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              )}
              {p.href && (
                <span className="ue-cap-card__more">
                  Learn more <ArrowRight size={15} aria-hidden />
                </span>
              )}
            </div>
          </>
        );
        return p.href ? (
          <Link
            key={p.id}
            href={p.href}
            className="ue-cap-project"
            data-reveal=""
            style={idx(i % columns)}
          >
            {inner}
          </Link>
        ) : (
          <article
            key={p.id}
            className="ue-cap-project"
            data-reveal=""
            style={idx(i % columns)}
          >
            {inner}
          </article>
        );
      })}
    </div>
  );
}

/** Every step visible, joined by a line that draws in on reveal. */
export function CapRail({
  steps,
  reveal = true,
}: {
  steps: (CapStep | CapItem)[];
  reveal?: boolean;
}) {
  return (
    <ol
      className="ue-cap-rail"
      style={cols(steps.length)}
      {...(reveal ? { "data-reveal": "" } : {})}
    >
      {steps.map((s, i) => {
        const title = "label" in s ? s.label : s.title;
        const meta = "meta" in s && s.meta ? s.meta : String(i + 1);
        return (
          <li key={`${title}-${i}`} className="ue-cap-rail__step">
            <span className="ue-cap-rail__dot">{meta}</span>
            <h4 className="ue-cap-rail__title">{title}</h4>
            {s.text && <p className="ue-cap-rail__text">{s.text}</p>}
          </li>
        );
      })}
    </ol>
  );
}

export function CapChips({ items }: { items: string[] }) {
  return (
    <ul className="ue-cap-chips">
      {items.map((t) => (
        <li key={t}>{t}</li>
      ))}
    </ul>
  );
}

/** A labelled supporting row: rail, cards, chips or a plain list. */
export function CapAside({
  label,
  style = "cards",
  items,
}: {
  label: string;
  style?: "cards" | "chips" | "rail" | "list";
  items: CapItem[];
}) {
  return (
    <div className="ue-cap-aside">
      <p className="ue-cap-label" data-reveal="">
        {label}
      </p>
      {style === "rail" && <CapRail steps={items} />}
      {style === "chips" && (
        <div data-reveal="">
          <CapChips items={items.map((i) => i.title)} />
        </div>
      )}
      {style === "cards" && (
        <CapCards items={items} columns={Math.min(items.length, 4)} small />
      )}
      {style === "list" && (
        <ul className="ue-cap-minis ue-cap-minis--3" data-reveal="">
          {items.map((it) => (
            <li key={it.title}>
              <h4 className="ue-cap-mini__title">{it.title}</h4>
              {it.text && <p className="ue-cap-mini__text">{it.text}</p>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function CapTiles({
  items,
  columns = 4,
}: {
  items: CapTile[];
  columns?: number;
}) {
  // One or two tiles run larger. A row that would leave a single tile
  // on its own line takes one more column.
  if (items.length < 3) columns = 2;
  else if (items.length === columns + 1) columns += 1;
  return (
    <div className="ue-cap-tiles" style={cols(columns)}>
      {items.map((t, i) => {
        const inner = (
          <>
            <div className="ue-cap-tile__media">
              {t.image && (
                <Image
                  src={t.image}
                  alt={t.name}
                  fill
                  sizes="(max-width:640px) 50vw, (max-width:1080px) 33vw, 25vw"
                />
              )}
              {t.tag && <span className="ue-cap-tile__tag">{t.tag}</span>}
            </div>
            <h3 className="ue-cap-tile__name">
              {t.name}
              {t.href && <ArrowUpRight aria-hidden />}
            </h3>
            {(t.place || t.value) && (
              <p className="ue-cap-tile__place">
                {[t.place, t.value].filter(Boolean).join("  ·  ")}
              </p>
            )}
            {t.scope && <p className="ue-cap-tile__scope">{t.scope}</p>}
          </>
        );
        return t.href ? (
          <Link
            key={t.name}
            href={t.href}
            className="ue-cap-tile"
            data-reveal=""
            style={idx(i % columns)}
          >
            {inner}
          </Link>
        ) : (
          <div
            key={t.name}
            className="ue-cap-tile"
            data-reveal=""
            style={idx(i % columns)}
          >
            {inner}
          </div>
        );
      })}
    </div>
  );
}

export function CapTable({
  columns,
  rows,
  groups,
}: {
  columns: string[];
  rows: string[][];
  groups?: { before: number; label: string }[];
}) {
  return (
    <table className="ue-cap-table" data-reveal="">
      <thead>
        <tr>
          {columns.map((c) => (
            <th key={c} scope="col">
              {c}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.flatMap((r, i) => {
          const g = groups?.find((x) => x.before === i);
          const out = [];
          if (g)
            out.push(
              <tr key={`g-${i}`} className="ue-cap-table__group">
                <td colSpan={columns.length}>{g.label}</td>
              </tr>,
            );
          out.push(
            <tr key={`r-${i}`}>
              {r.map((cell, j) => (
                <td key={j} data-label={columns[j]}>
                  {cell}
                </td>
              ))}
            </tr>,
          );
          return out;
        })}
      </tbody>
    </table>
  );
}

export function CapLists({
  groups,
  columns = 4,
  numbered,
}: {
  groups: { title: string; items: string[] }[];
  columns?: number;
  numbered?: boolean;
}) {
  // Numbering runs on across groups, as on the method statement slides.
  const starts = groups.reduce<number[]>((acc, g, i) => {
    acc.push(i === 0 ? 0 : acc[i - 1] + groups[i - 1].items.length);
    return acc;
  }, []);
  return (
    <div className="ue-cap-lists" style={cols(columns)}>
      {groups.map((g, gi) => (
        <div
          key={g.title}
          className="ue-cap-list"
          data-reveal=""
          style={idx(gi % columns)}
        >
          <h3 className="ue-cap-list__title">{g.title}</h3>
          <ul>
            {g.items.map((it, i) => (
              <li key={it}>
                {numbered && <i>{pad(starts[gi] + i + 1)}</i>}
                <span>{it}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export function CapCompare({
  aLabel,
  bLabel,
  rows,
}: {
  aLabel: string;
  bLabel: string;
  rows: { label: string; a: string; b: string }[];
}) {
  const last = rows.length - 1;
  return (
    <div className="ue-cap-compare" data-reveal="" role="table">
      <div
        className="ue-cap-compare__cell ue-cap-compare__cell--label ue-cap-compare__cell--head"
        role="columnheader"
      />
      <div
        className="ue-cap-compare__cell ue-cap-compare__cell--a ue-cap-compare__cell--head ue-cap-compare__cell--first"
        role="columnheader"
      >
        {aLabel}
      </div>
      <div
        className="ue-cap-compare__cell ue-cap-compare__cell--b ue-cap-compare__cell--head ue-cap-compare__cell--first"
        role="columnheader"
      >
        {bLabel}
      </div>
      {rows.map((r, i) => (
        <div key={r.label} className="ue-cap-compare__col" role="row">
          <div
            className="ue-cap-compare__cell ue-cap-compare__cell--label"
            role="rowheader"
          >
            {r.label}
          </div>
          <div
            className={`ue-cap-compare__cell ue-cap-compare__cell--a${i === last ? " ue-cap-compare__cell--last" : ""}`}
            role="cell"
          >
            {r.a}
          </div>
          <div
            className={`ue-cap-compare__cell ue-cap-compare__cell--b${i === last ? " ue-cap-compare__cell--last" : ""}`}
            role="cell"
          >
            {r.b}
          </div>
        </div>
      ))}
    </div>
  );
}
