# Editing content

Everything on the site — every headline, project, photo and number — is stored in
plain **data files**, separately from the code. This guide shows you how to change
any of it. You don't need to know React.

> **See your changes live:** keep `pnpm dev` running in a terminal and open
> http://localhost:3000. The moment you save a file, the page updates.

---

## The three golden rules

1. **Most content lives in `.json` files under `src/data/cms/`.** JSON is just a
   structured list of text. Change the text inside the quotes — that's it.
2. **Keep the punctuation intact.** Every `"` , `,` `{` `}` `[` `]` matters. If a
   page suddenly shows an error, you almost certainly deleted a quote or a comma.
   Copy an existing entry as your template rather than typing from scratch.
3. **Photos go in `public/`** and are referenced by path (e.g. `/projects/foxconn-hero.jpg`).

**Special characters** you'll see and can copy-paste: `₹` (rupees), `·` (middle dot
separator), `—` (em dash), `×` (dimensions), `²` (as in m²). Never use ALL-CAPS for
headlines and always write in the third person — see
[the brand voice](design-system.md#voice).

---

## Where everything lives

| To edit…                                    | Open this file                                     |
| ------------------------------------------- | -------------------------------------------------- |
| Company facts, figures and contact details  | `src/data/cms/company_facts.json`                  |
| Homepage hero, narrative and nav menu       | `src/data/firm.ts`                                 |
| Landmark project archive (50 photographed projects) | `src/data/cms/landmark_projects.json`     |
| Additional long-form project narratives    | `src/data/cms/projects.json`                       |
| The full historic project list (170 rows)  | `src/data/cms/project_ledger.json`                 |
| **Sector** pages (data centre, airport, …)  | `src/data/cms/sectors.json`                        |
| **Service** pages (HVAC, electrical, …)     | `src/data/cms/services.json`                       |
| Service sub-pages (e.g. HVAC → high-side)   | `src/data/cms/service_categories.json`             |
| The firm's founders / leadership            | `src/data/cms/leadership.json`                     |
| Company timeline (1990 → today)             | `src/data/cms/journey.json`                        |
| Client list (for logo walls)                | `src/data/cms/clients.json`                        |
| Certifications (ISO, etc.)                  | `src/data/cms/certifications.json`                 |
| Offices / locations                         | `src/data/cms/offices.json`                        |
| Testimonials                                | `src/data/cms/testimonials.json`                   |
| Careers / culture page                      | `src/data/careers.ts`                              |
| Culture, functions, workforce, AI and diligence structure | `src/data/cms/organisation.json`       |
| Controlled method-statement index           | `src/data/cms/method_statements.json`              |
| Missing content and evidence register       | `src/data/cms/content_todos.json`                  |
| Photos & the hero video                     | `public/`                                          |

---

## Common tasks

### Review or change a company fact

Open `src/data/cms/company_facts.json` and find the record by `id`. Every fact has:

- `display` — the approved human-readable wording;
- `period` and `as_of` — when the figure applies;
- `verification_status` — derived, confirmed, conflicting or awaiting evidence;
- `visibility` — public, confidential or internal;
- `website_enabled` — the explicit public-site switch;
- `owner`, `source` and `notes` — the review trail.

Update the register first. Website pages read shared figures from it through
`src/data/company-facts.ts`. Never enable a confidential/internal fact on the public
site, and do not enable a conflicting or time-sensitive claim until its owner has
approved the supporting source.

### Change a headline or paragraph

Find the text in the relevant file (use your editor's search) and edit what's inside
the quotes. Example — the homepage hero lives in `src/data/firm.ts`:

```ts
export const HERO = {
  title: FIRM.brand,
  subtitle: "Engineered to specification. Delivered on schedule.",
  lead: "Multi-disciplinary general contracting — civil construction, MEPF services, …",
};
```

Change `subtitle` or `lead`, save, and the homepage updates.

### Add or edit a landmark project

The photographed project pages at `/projects/[slug]` are controlled by
`src/data/cms/landmark_projects.json`. This file is generated from
`uel_projects_photographs_and_videos/UEL_Project Details.xlsx` plus the matching
media folders. Missing or disputed details remain visible as `To be confirmed`.

Update the workbook or source media folder first, then run
`scripts/import-landmark-projects.mjs` (or ask Codex to refresh the landmark project
archive). The importer optimises the selected images and videos and rewrites the
landmark-project JSON. Do not invent a missing value in the generated file.

`src/data/cms/projects.json` is retained for the deeper narratives, metrics and
execution notes already written for selected flagship projects. The site merges
those richer passages with the current workbook facts and project media.

Key fields in the generated landmark register:

```jsonc
{
  "slug": "foxconn-bangalore",        // the URL: /projects/foxconn-bangalore
  "name": "Foxconn Semiconductor Facility",
  "client_name_display": "Foxconn · Apple",
  "location_city": "Bangalore",
  "location_state": "Karnataka",
  "value_display": "₹650 Cr",         // shown on the card
  "value_cr": 650,                     // the number (used for sorting/filtering)
  "summary": "Fast-track cleanroom MEPF for an Apple semiconductor facility…",
  "narrative": ["First paragraph…", "Second paragraph…"],
  "scope_tags": ["HVAC", "Firefighting", "Plumbing", "Electrical"],
  "hero_image_url": "/project-archive/foxconn-bangalore/hero.jpg",
  "gallery": [{ "src": "/project-archive/…/gallery-01.jpg", "alt": "…" }],
  "video_url": "/project-archive/…/project-video.mp4",
  "featured": true,                    // eligible for the landmark archive
  "missing_fields": [],                // unresolved fields remain listed here
  "published": true                    // set false to hide it entirely
}
```

To **hide** a project without deleting it, set `"published": false`.

### Edit a sector page

Sector pages (`/sectors/data-centre`, etc.) live in `src/data/cms/sectors.json`. The
headline number of projects and contract value is **calculated automatically** from
the project list — you don't type it. What you edit is the story:

- `short_description` — the one-liner under the title
- `long_description` — the sector narrative (name real projects with real numbers)
- `sections` — the deeper technical breakdown further down the page

> ⚠️ Only name clients and projects that are real (in `clients.json` /
> `projects.json`). Don't invent names — the site is read by prospective clients and
> investors.

### Edit a service page

Service pages (`/services/hvac-company-in-gurgaon`, etc.) live in
`src/data/cms/services.json`. Notable fields:

- `tagline` — the confident line under the discipline name
- `intro_paragraphs` — the opening
- `approach_plain` — the plain-language "how we work" (shown by default)
- `approach_paragraphs` — the technical version (behind a "for the engineers" toggle)
- `stats` — the three proof figures (e.g. `"30,000 TR"` → "District-cooling plant…")

The sub-discipline pages (HVAC → high-side, low-side, …) live in
`src/data/cms/service_categories.json`.

Each service page also shows its relevant controlled execution methods. That index is
generated from the Marketing method-statement libraries by
`scripts/import-method-statements.mjs`. Update the controlled source documents first,
then refresh the index rather than editing the generated JSON by hand.

### Edit the homepage headline stats

In `src/data/firm.ts`, `OVERVIEW.stats` is the six-figure grid:

```ts
stats: [
  { n: "35",     unit: "+",    l: "Years, since 1990" },
  { n: "170",    unit: "+",    l: "Projects delivered · last decade" },
  { n: "3,422",  unit: "₹ Cr", l: "Cumulative contract value" },
  // …
];
```

`n` is the number (it counts up when scrolled into view), `unit` is the small suffix
(a `₹` prefix is detected automatically), `l` is the label.

### Change the navigation menu

Also in `src/data/firm.ts`: `NAV` is the top menu, and `SECTOR_NAV` is the list of
sectors in the "Sectors" dropdown. Reorder or relabel entries here.

### Edit the founders / leadership

`src/data/cms/leadership.json` — one entry per person or controlled placeholder
(`name`, `role`, `credential`, `bio`, `portrait_url`, `group`, `profile_status`). If
someone has no photo yet, leave `portrait_url` empty and a neutral placeholder shows.
Order is set by `sort_order`. Do not invent names or credentials for pending director
or executive profiles.

### Edit Culture, Engineering Strength, Workforce or Innovation & AI

Open `src/data/cms/organisation.json`. It contains the culture principles and grey
photo slots, functional-team register, hybrid workforce model, continuity controls,
AI use-case status and corporate-diligence map. A `null` count deliberately renders
as “To be confirmed”; replace it only when the named owner validates the number and
as-of date. The associated evidence requests live in `content_todos.json`.

### Edit the company timeline

`src/data/cms/journey.json` — the 1990→today milestones on the `/firm` page. Each has
a `year`, `title`, and `description`. Add a milestone by copying an entry and bumping
`sort_order`.

### Swap or add a photo

1. Put the image file in the right `public/` folder:
   - `public/projects/` — case-study photos
   - `public/sectors/` — sector hero images
   - `public/services/` — discipline hero images
   - `public/firm/` — leadership portraits, team photos
2. Reference it by path (no `public`) in the data file, e.g.
   `"hero_image_url": "/projects/my-new-photo.jpg"`.

Use `.jpg` for photos, keep them reasonably sized (long edge ~2000px is plenty), and
prefer cool, clean, real project photography over stock. The homepage hero video is
`public/hero.mp4`.

### Contact details

Phone, address and email are in `src/data/firm.ts` → `FIRM`. The contact form opens
the visitor's email app pre-filled to `FIRM.contactEmail` (there's no server), so
make sure that email is correct.

---

## Three project stores — which is which?

The site has **two** sources of projects, on purpose:

| File                     | What it is                               | Where it shows |
| ------------------------ | ---------------------------------------- | -------------- |
| `landmark_projects.json` | Media-backed landmark project records | `/projects/[slug]`, top of `/projects` |
| `projects.json`          | Additional rich narratives and metrics   | Merged into matching landmark pages |
| `project_ledger.json`    | 170-row historic project record          | Filterable list on `/projects`, sector/service pages |

The landmark archive and project record are generated/controlled data, so update
their source material first. The narrative file is the place to polish selected
flagship stories. A ledger row automatically links to a project page when the match
has been confirmed.

---

## Before you publish

1. Check the page in your browser at http://localhost:3000 — does it look right?
2. If a page shows an error, you likely broke the JSON punctuation. Undo your last
   edit and try again, copying an existing entry as a template.
3. Optionally run `pnpm build` — if it succeeds, everything is valid.
4. Commit and push to `main` — it goes live automatically (see the
   [README](../README.md#publishing-changes)).
