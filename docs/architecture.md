# Architecture

For developers. How the codebase is organised and why. If you just want to edit
content or styles, see [editing-content.md](editing-content.md) and
[design-system.md](design-system.md) instead.

> This is **Next.js 16** (App Router, Turbopack) — APIs differ from older versions.
> Check `node_modules/next/dist/docs/` before writing routing/data code. See
> [`AGENTS.md`](../AGENTS.md).

---

## Directory map

```
src/
  app/                     Routes (App Router). One folder per URL segment.
    layout.tsx             Root layout — fonts, <SiteHeader/>, <SiteFooter/>
    page.tsx               Home
    projects/              Unified project hub + 52 project detail pages
    services/[slug]/[sub]/ Capabilities → discipline → sub-discipline
    sectors/[slug]/        Sectors → sector detail
    projects/[slug]/       Case-study detail
    firm/ leadership/ culture/ engineering-strength/ workforce/ journey/
    innovation-ai/ corporate-snapshot/ approach/ careers/ contact/
  components/
    site/                  Page sections & site-specific components (~26 files)
    ui/                    shadcn/ui primitives (button, input, sheet, …)
  data/
    cms/                   The content — JSON + types.ts (the "CMS")
    company-facts.ts       Typed access to the company fact register
    firm.ts                Narrative, capabilities, hero and navigation
    careers.ts             Careers page content
    subservices.ts         Long-form body content for sub-discipline pages
  lib/
    cms.ts                 Typed accessors over the CMS JSON (the data layer)
    ledger-filters.ts      Pure filter engine for the /work hub
    utils.ts               cn() and small helpers
  styles/
    design-tokens.css      Colours, type, spacing… (single source of truth)
    design-system.css      .ue-* utility classes
    globals.css            Resets + wiring
public/                    Static assets (images, hero.mp4, india.svg)
scripts/                   Repeatable content importers
```

---

## The content layer (the "CMS")

There's no database. Content is JSON in `src/data/cms/`, typed in `types.ts`, and
read through **one access layer: `src/lib/cms.ts`**.

Company-wide facts and figures have an additional governance layer:
`src/data/cms/company_facts.json` stores the value, period, as-of date, owner,
visibility, source and verification status for every reusable company claim.
`src/data/company-facts.ts` is its typed access layer. Project-specific facts are
imported into `landmark_projects.json` from the internal project workbook; selected
long-form narratives remain in `projects.json`, and the historic register remains
in `project_ledger.json`. `method_statements.json` indexes the controlled Marketing
method libraries; `organisation.json` is the source for culture, functions, workforce,
AI and corporate-review sections; `content_todos.json` tracks every known evidence gap.

**Rule: pages read content through `cms.ts` helpers, never by importing JSON
directly.** This keeps a single, typed, swappable seam — if this ever moves to a real
CMS/DB, only `cms.ts` changes.

```ts
// A page (server component)
import { getSectorWithProjects, getLedgerStatsForSector } from "@/lib/cms";

const sector = getSectorBySlug(slug);
const stats = getLedgerStatsForSector(sector.id); // { count, total_cr, total_display }
```

Representative helpers: `getAllProjects`, `getProjectBySlug`, `getFeaturedProjects`,
`getProjectsBySector`, `getProjectsByService`, `getProjectLedger`, `getLedgerBySector`,
`getLedgerByService`, `getLedgerStatsFor{Sector,Service}`, `getAllSectors`,
`getAllServices`, `getLeadership`, `getJourney`, `getCertifications`, `getWorkHubData`,
`getMethodStatementRegistry`, `getMethodStatementsForService`,
`getOrganisationRegistry`.

### Data model

Three project stores, joined to sectors and services:

- **`landmark_projects.json`** — 50 photographed landmark records, generated from
  the internal project workbook and media folders. It includes gallery/video paths,
  taxonomy ids and explicit missing-field markers.
- **`projects.json`** — selected long-form narratives and metrics. Matching slugs
  are merged onto the current landmark records by `cms.ts`.
- **`project_ledger.json`** — the 170-row historic project record. Each
  row carries a `sector_id` and `service_ids[]`.
- **`sectors.json`**, **`services.json`**, **`service_categories.json`** — the taxonomy.
- **Join tables** — `project_sectors.json`, `project_services.json`,
  `project_service_categories.json` — link case studies to their sectors/services.
- **Supporting** — `clients.json`, `leadership.json`, `journey.json`,
  `certifications.json`, `offices.json`, `testimonials.json`.

`cms.ts` also exports `CASE_STUDY_SLUG_BY_LEDGER_ID`, which links a project-record row to
its case study so ledger rows on `/projects` can deep-link into `/projects/[slug]`.

`scripts/import-landmark-projects.mjs` is the repeatable import path. It reads the
workbook with the spreadsheet artifact runtime, consolidates duplicate media folders,
keeps missing/disputed fields as placeholders, and creates web-sized assets under
`public/project-archive/`.

---

## The `/projects` hub

The site's centrepiece is one filterable surface combining the landmark photographic
archive and the controlled historic project record. `/work` and `/track-record` now
redirect to canonical `/projects`, with query strings preserved.

- **`app/projects/page.tsx`** — server component; awaits `searchParams` (so it renders
  server-side and is a **dynamic** route), passes data to the client hub.
- **`components/site/work-hub.tsx`** — client component. The **URL is the source of
  truth** for filter state: `/projects?sector=data-centre&service=hvac&state=…&band=…`.
  Chips are real `aria-pressed` buttons; state syncs via `router.replace(..., { scroll: false })`.
- **`lib/ledger-filters.ts`** — framework-free filter logic (also reused by the
  scoped ledgers embedded on sector/service pages).
- **`components/site/ledger-parts.tsx`** / **`project-ledger.tsx`** — shared, brand-
  styled ledger UI (rows, chips, search, cards).

---

## Rendering & routing

- Almost every page is **statically prerendered** (SSG). Detail pages use
  `generateStaticParams`. Run `pnpm build` to see the route table.
- **`/projects` and `/execution-library` are dynamic** because they read
  `searchParams` for deep-linkable filters.
- **Content is always present without JS.** Animations (via `motion`) are progressive
  enhancement only — no reveal ever leaves content at `opacity: 0` in the server-
  rendered HTML. Count-up stats rest at their real value; scroll reveals default to
  visible. Everything respects `prefers-reduced-motion`.

---

## Styling

- **Tokens first.** Colours/spacing/type come from `design-tokens.css` via CSS
  `var(--…)`. Never hard-code hex.
- **`.ue-*` classes** in `design-system.css` for anything that should "look like the
  brand" (headings, sections, cards, chips).
- Some detail pages use **inline styles that reference tokens** (`style={{ color:
  "var(--ink-700)" }}`) — readable and on-brand, though a future pass could promote
  the repeated recipes into `.ue-*` classes.
- Tailwind v4 is available for layout utilities.

---

## Conventions

- **TypeScript throughout**; content is typed via `data/cms/types.ts`.
- **Server components by default;** `"use client"` only where interaction/animation
  needs it (the hub, header, scroll sections).
- **Formatting** is Prettier (`pnpm format`); config in `.prettierrc.json`. Lint with
  `pnpm lint` (ESLint + `eslint-config-next`).
- **`pnpm build` is the gate** — it type-checks, lints implicitly, and prerenders. If
  it passes, the change is sound.

---

## Deployment

Pushing to `main` triggers a Vercel production deploy (Next.js auto-detected). Other
branches get preview deploys. No CI config to maintain. See the
[README](../README.md#publishing-changes).
