import type { ReactNode } from "react";
import type { CapBlock, CapPage, CapTile } from "@/data/capability/types";
import { getProjectBySlug } from "@/lib/cms";
import { getCapProject } from "@/data/capability/projects";
import { CapHero, CapReveal, CapStats, CapSubnav } from "./cap-motion";
import {
  CapAside,
  CapCards,
  CapCompare,
  CapHead,
  CapLists,
  CapProjects,
  CapRail,
  CapSection,
  CapTable,
  CapTiles,
  CapChips,
} from "./cap-parts";
import { CapShowcase } from "./cap-showcase";
import { CapProcessAuto, CapProcessPinned } from "./cap-process";
import { CapSheets } from "./cap-sheets";
import { CapGallery, CapLedger } from "./cap-gallery";
import { BuildingExplorer } from "./building/building-explorer";
import { plain } from "@/data/capability/plain";
import { placeOf } from "./archive-tiles";

/** Fill a tile's photograph, link, city and scope from the project archive. */
function resolveTile(t: CapTile): CapTile {
  if (!t.slug) return t;
  const p = getProjectBySlug(t.slug);
  if (!p) return t;
  const known = (v?: string) =>
    v && !/confirm|pending/i.test(v) ? v : undefined;
  const linkable = p.published && p.information_status !== "placeholder";
  return {
    ...t,
    image: t.image ?? p.hero_image_url,
    href: t.href ?? (linkable ? `/projects/${p.slug}` : undefined),
    place:
      t.place ?? (placeOf(p.location_city, undefined, p.slug) || undefined),
    scope:
      t.scope ??
      (plain(p.scope_tags.filter((x) => known(x)).join(", ")) || undefined),
  };
}

export type CapSlots = Partial<
  Record<"subservices" | "methods" | "related" | "experience", ReactNode>
>;

function Block({ block, slots }: { block: CapBlock; slots: CapSlots }) {
  const head = (
    <CapHead eyebrow={block.eyebrow} title={block.title} lede={block.lede} />
  );
  const note = block.note ? (
    <p className="ue-cap-note" data-reveal="">
      {block.note}
    </p>
  ) : null;

  switch (block.kind) {
    case "stats":
      return (
        <CapSection id={block.id} tone={block.tone} flush={block.flush}>
          <div className="ue-container">
            {head}
            <CapStats items={block.items} />
            {note}
          </div>
        </CapSection>
      );

    case "building":
      return (
        <BuildingExplorer
          id={block.id}
          model={block.model}
          subject={block.subject}
          hint={block.hint}
          eyebrow={block.eyebrow}
          title={block.title}
          lede={block.lede}
          image={block.image}
          chapters={block.chapters}
        />
      );

    case "cards":
      return (
        <CapSection id={block.id} tone={block.tone} flush={block.flush}>
          <div className="ue-container">
            {head}
            {block.label && (
              <p className="ue-cap-label" data-reveal="">
                {block.label}
              </p>
            )}
            <CapCards
              items={block.items}
              columns={block.columns ?? 4}
              numbered={block.numbered}
            />
            {block.more && (
              <div className="ue-cap-more">
                <p className="ue-cap-label" data-reveal="">
                  {block.more.label}
                </p>
                <CapCards
                  items={block.more.items}
                  columns={block.columns ?? 4}
                  small
                />
              </div>
            )}
            {note}
          </div>
        </CapSection>
      );

    case "showcase": {
      const projects = block.projects.map(getCapProject);
      return (
        <CapSection id={block.id} tone={block.tone} flush={block.flush}>
          <div className="ue-container">
            {head}
            <CapShowcase projects={projects} focus={block.focus} />
            {note}
          </div>
        </CapSection>
      );
    }

    case "process": {
      const after = (
        <>
          {block.aside?.map((a) => (
            <CapAside key={a.label} {...a} />
          ))}
          {note}
        </>
      );
      if (block.variant === "pinned") {
        return (
          <CapSection
            id={block.id}
            tone={block.tone}
            flush={block.flush}
            className="ue-cap-proc--pinned"
          >
            <CapProcessPinned
              steps={block.steps}
              eyebrow={block.eyebrow}
              title={block.title}
              lede={block.lede}
            />
            {/* Static list below 960px, where pinning is switched off. */}
            <div className="ue-cap-proc__mobile">
              <div className="ue-container">
                {head}
                {block.steps.map((s, i) => (
                  <div key={s.label} className="ue-cap-proc__mobile-step">
                    {s.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={s.image} alt="" loading="lazy" />
                    ) : (
                      <span />
                    )}
                    <div>
                      <span className="ue-cap-proc__num">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h3 className="ue-cap-rail__title">{s.label}</h3>
                      <p className="ue-cap-rail__text">{s.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {(block.aside?.length || block.note) && (
              <div className="ue-cap-proc__after">
                <div className="ue-container">{after}</div>
              </div>
            )}
          </CapSection>
        );
      }
      return (
        <CapSection id={block.id} tone={block.tone} flush={block.flush}>
          <div className="ue-container">
            {head}
            {block.variant === "auto" ? (
              <CapProcessAuto steps={block.steps} />
            ) : (
              <CapRail steps={block.steps} />
            )}
            {after}
          </div>
        </CapSection>
      );
    }

    case "sheets":
      return (
        <CapSection id={block.id} tone={block.tone} flush={block.flush}>
          <div className="ue-container">
            {head}
            {(block.stats || block.bands) && (
              <div className="ue-cap-sheets__overview">
                {block.stats && (
                  <div data-reveal="">
                    <CapStats items={block.stats} />
                  </div>
                )}
                {block.bands && (
                  <div className="ue-cap-bands" data-reveal="">
                    {block.bands.map((b) => (
                      <div key={b.title} className="ue-cap-band">
                        <strong>{b.title}</strong>
                        <span>{b.text}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
            <CapSheets sheets={block.sheets} layout={block.layout} />
            {note}
          </div>
        </CapSection>
      );

    case "experience": {
      const featured = (block.projects ?? []).map(getCapProject);
      // A project shown as a card is not listed again among the tiles.
      const taken = new Set(featured.map((p) => p.href).filter(Boolean));
      const more = (block.more ?? [])
        .map((g) => ({
          label: g.label,
          items: g.items.map(resolveTile).filter((t) => !taken.has(t.href)),
        }))
        .filter((g) => g.items.length > 0);
      return (
        <CapSection id={block.id} tone={block.tone} flush={block.flush}>
          <div className="ue-container">
            {head}
            {block.items && block.items.length > 0 && (
              <div className="ue-cap-exp__points">
                <CapCards items={block.items} columns={4} numbered />
              </div>
            )}
            {featured.length > 0 && <CapProjects projects={featured} />}
            {more.map((g) => (
              <div key={g.label} className="ue-cap-also">
                <p className="ue-cap-label" data-reveal="">
                  {g.label}
                </p>
                <CapTiles items={g.items} columns={4} />
              </div>
            ))}
            {block.also && (
              <div className="ue-cap-also">
                <p className="ue-cap-label" data-reveal="">
                  {block.also.label}
                </p>
                <div data-reveal="">
                  <CapChips items={block.also.items} />
                </div>
              </div>
            )}
            {slots.experience}
            {note}
          </div>
        </CapSection>
      );
    }

    case "tiles":
      return (
        <CapSection id={block.id} tone={block.tone} flush={block.flush}>
          <div className="ue-container">
            {head}
            {block.items.length > 0 && (
              <CapTiles
                items={block.items.map(resolveTile)}
                columns={block.columns ?? 4}
              />
            )}
            {block.also && (
              <div
                className="ue-cap-also"
                style={block.items.length ? undefined : { marginTop: 0 }}
              >
                <p className="ue-cap-label" data-reveal="">
                  {block.also.label}
                </p>
                <div data-reveal="">
                  <CapChips items={block.also.items} />
                </div>
              </div>
            )}
            {note}
          </div>
        </CapSection>
      );

    case "table":
      return (
        <CapSection id={block.id} tone={block.tone} flush={block.flush}>
          <div className="ue-container">
            {head}
            <CapTable
              columns={block.columns}
              rows={block.rows}
              groups={block.groups}
            />
            {note}
          </div>
        </CapSection>
      );

    case "gallery":
      return (
        <CapSection id={block.id} tone={block.tone} flush={block.flush}>
          <div className="ue-container">
            {head}
            <CapGallery items={block.items} />
            {note}
          </div>
        </CapSection>
      );

    case "lists":
      return (
        <CapSection id={block.id} tone={block.tone} flush={block.flush}>
          <div className="ue-container">
            {head}
            {block.stats && (
              <div className="ue-cap-lists__stats" data-reveal="">
                <CapStats items={block.stats} variant="compact" />
              </div>
            )}
            <CapLists
              groups={block.groups}
              columns={block.columns ?? 4}
              numbered={block.numbered}
            />
            {note}
          </div>
        </CapSection>
      );

    case "compare":
      return (
        <CapSection
          id={block.id}
          tone={block.tone}
          flush={block.flush}
          className={block.title ? undefined : "ue-cap-section--tight-top"}
        >
          <div className="ue-container">
            {head}
            <CapCompare
              aLabel={block.aLabel}
              bLabel={block.bLabel}
              rows={block.rows}
            />
            {note}
          </div>
        </CapSection>
      );

    case "ledger": {
      const groups = block.groups
        .map((g) => ({
          label: g.label,
          projects: g.projects
            .map(getCapProject)
            .filter((p) =>
              p.split?.some(
                (s) => s.service === block.service && s.included !== false,
              ),
            ),
        }))
        .filter((g) => g.projects.length > 0);
      return (
        <CapSection id={block.id} tone={block.tone} flush={block.flush}>
          <div className="ue-container">
            {head}
            <CapLedger service={block.service} groups={groups} />
            {note}
          </div>
        </CapSection>
      );
    }

    case "subservices":
    case "methods":
    case "related": {
      const slot = slots[block.kind];
      if (!slot) return null;
      if (block.kind === "methods") return <div id={block.id}>{slot}</div>;
      return (
        <CapSection
          id={block.id}
          tone={block.tone}
          flush={block.flush}
          className={block.kind === "related" ? "ue-cap-related" : undefined}
        >
          <div className="ue-container">
            {head}
            {slot}
            {note}
          </div>
        </CapSection>
      );
    }
  }
}

/**
 * Renders an industry or service page from its block list.
 * `slots` carries the three blocks that come from the CMS and are
 * built by the route: sub disciplines, methods and related projects.
 */
export function CapabilityPage({
  page,
  parent,
  slots = {},
}: {
  page: CapPage;
  parent: { label: string; href: string };
  slots?: CapSlots;
}) {
  const sections = page.blocks
    .filter((b) => b.nav && (!("kind" in b) || slotPresent(b, slots)))
    .map((b) => ({ id: b.id, label: b.nav! }));
  return (
    <div className="ue-cap">
      <CapReveal />
      <CapHero
        eyebrow={page.eyebrow}
        title={page.title}
        description={page.description}
        image={page.image}
      />
      <CapSubnav parent={parent} name={page.name} sections={sections} />
      {page.stats && page.stats.length > 0 && (
        <div className="ue-container">
          <div data-reveal="">
            <CapStats items={page.stats} variant="band" />
          </div>
        </div>
      )}
      {withTones(page.blocks, slots).map((b) => (
        <Block key={b.id} block={b} slots={slots} />
      ))}
    </div>
  );
}

/**
 * Section backgrounds alternate white and soft grey down the page.
 * A block with no heading of its own continues the block above it,
 * so it keeps that block's background.
 */
function withTones(blocks: CapBlock[], slots: CapSlots): CapBlock[] {
  let soft = true;
  return blocks.map((b) => {
    if (b.kind === "methods" || !slotPresent(b, slots)) return b;
    const continues = !b.title && !b.eyebrow;
    if (!continues) soft = !soft;
    return { ...b, tone: soft ? "soft" : "plain", flush: continues };
  });
}

function slotPresent(b: CapBlock, slots: CapSlots) {
  if (b.kind === "subservices" || b.kind === "methods" || b.kind === "related")
    return !!slots[b.kind];
  return true;
}
