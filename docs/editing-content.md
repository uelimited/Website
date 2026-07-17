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
| Homepage hero, headline stats, nav menu     | `src/data/firm.ts`                                 |
| Company facts (founded, address, email)     | `src/data/firm.ts` → `FIRM`                        |
| **Case studies** (the 12 featured projects) | `src/data/cms/projects.json`                       |
| The full project list (170 order-book rows) | `src/data/cms/project_ledger.json`                 |
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
| Photos & the hero video                     | `public/`                                          |

---

## Common tasks

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

### Add or edit a case study (featured project)

Case studies are the rich, photographed project pages at `/projects/[slug]`. They
live in `src/data/cms/projects.json`. To **edit** one, find it by `name` and change
its fields. To **add** one, copy an existing entry (from `{` to `}`), paste it as a
new item in the list, and update every field. Key fields:

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
  "hero_image_url": "/projects/foxconn-hero.jpg",
  "featured": true,                    // show on the homepage's landmark row
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

`src/data/cms/leadership.json` — one entry per person (`name`, `role`, `credential`,
`bio`, `portrait_url`). If someone has no photo yet, leave `portrait_url` empty (`""`)
and a tasteful placeholder shows instead. Order is set by `sort_order`.

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

## Two project lists — which is which?

The site has **two** sources of projects, on purpose:

| File                 | What it is                                | Where it shows                          |
| -------------------- | ----------------------------------------- | --------------------------------------- |
| `projects.json`      | 12 rich, photographed **case studies**    | Homepage, `/projects/[slug]`, top of `/work` |
| `project_ledger.json`| 170-row **order book** (every project)    | The filterable list on `/work`, sector/service pages |

The order book (`project_ledger.json`) is bulk data, mostly generated — you usually
won't hand-edit it. The case studies (`projects.json`) are the hero content you'll
polish often. A ledger row automatically links to a case study when they're the same
project.

---

## Before you publish

1. Check the page in your browser at http://localhost:3000 — does it look right?
2. If a page shows an error, you likely broke the JSON punctuation. Undo your last
   edit and try again, copying an existing entry as a template.
3. Optionally run `pnpm build` — if it succeeds, everything is valid.
4. Commit and push to `main` — it goes live automatically (see the
   [README](../README.md#publishing-changes)).
