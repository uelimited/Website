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

### Edit an industry or service page

The industry pages (`/sectors/data-centre`, etc.) and the service pages
(`/services/hvac-company-in-gurgaon`, etc.) are built from the capability decks in
`Marketing/Capability PPTs/01_Capability_Decks`. Their content lives in
`src/data/capability/`:

| To edit…                                                    | Open this file          |
| ----------------------------------------------------------- | ----------------------- |
| An industry page                                            | `industries.ts`         |
| A service page                                              | `services.ts`           |
| The Why Unique cards, and the sections behind them (DfMA, the yard, floor kits, AI, intelligent buildings, how we deliver) | `shared.ts` |
| Which sections make up each Why Unique page (`/why-unique/...`) | `value.ts` |
| A project's facts and scope by service (shown on its project page) | `projects.deck.ts`, `projects.ts` |

Each page is a list of **blocks**, shown in order. A block has a `kind` (for example
`cards`, `showcase`, `process`, `sheets`, `tiles`, `table`, `lists`), an optional
`eyebrow`, `title` and `lede`, and its content. To change wording, change the text
inside the quotes. To move a section, move its block. To remove one, delete the block.
Give a block a `nav` label to list it in the bar under the hero. The page alternates
the white and grey backgrounds by itself.

Every block notes the deck and slide it came from in a comment. When a deck changes,
change the matching block.

**An industry page has three sections.** What we deliver (the 3D building), Our
experience, and Why Unique. Each subject is written in one place and the industry page
links to it:

- _Our experience_ is the `experience` block. `projects` lists project ids from
  `projects.ts`; each shows as a card with a "Learn more" link to the project's own page
  (`/projects/...`), which carries the facts, highlights and scope of work by service.
  `more` lists further projects as small tiles and `also` lists client names. A project
  with no record in the project archive still gets a page, built from its deck entry:
  give it an `href` in `projects.deck.ts`.
- _Why Unique_ is `whyBlock()`. Its eight cards are `WHY_VALUE_ADDITIONS` in `shared.ts`.
  A card with an `href` opens its own page under `/why-unique/`. To change what DfMA or
  the Bhondsi yard says, edit its section in `shared.ts`: every page that links to it
  picks up the change.
- Four Why Unique pages open with a 3D model of their own, built the same way as the
  buildings: a module taken apart service by service (DfMA), the yard (prefabrication at
  Bhondsi), a tower receiving one kit per floor (floor kits) and a building read through
  its controls (intelligent buildings). Their stops are the `chapters` of the `building`
  block in `value.ts`, and they follow the same rules as the building stops below.
- The Why Unique menu in the site header, and the first five cards, read one list:
  `src/data/why-unique.ts`. Change a name or a line there.
- Sections taken off the industry pages in November 2026 (the data centre register, live
  facilities, automation, commissioning and method lists; the cleanroom credentials,
  process piping and engineering sheets) are kept at the foot of `industries.ts` in
  `PARKED_BLOCKS`. Move one back into a page's `blocks` list to show it again.

**The 3D building (What we deliver, every industry page).** The `building` block
shows a model that stays in view while the reader scrolls: a data centre, a cleanroom
building, a manufacturing plant, an airport terminal, a campus, a hospital, a mixed use
development (also used for the hotel) or two residential towers. Each entry in its
`chapters` list is one stop: a `title`, a `text`, one `stat` or `proof` line from a
project, and the `labels` that point at parts of the model. You can reword all of these
freely. The `key` of a chapter picks the camera view and the `anchor` of a label picks
the point it attaches to, so leave those two as they are. Airports, education and
healthcare share one list of chapters (`PUBLIC_CHAPTERS`) and add their own labels and
project lines. Every page covers the same core services (HVAC, electrical, plumbing,
fire, BMS and ELV, civil) plus that industry's own stops. Where the decks hold no project
record for a service in an industry, the chapter uses the wording of the company services
slide and carries no project line: add a `stat` or `proof` when there is a project to
quote. The views, the anchors and the models themselves live in
`src/components/capability/building/` and need a developer. Readers without 3D support,
or who ask their device for less motion, get the still pictures in
`public/capability/building/` in place of the model. If a developer changes a model,
the stills for that model need to be made again.

**House rules for these pages**

- No dashes or hyphens in copy. Use a comma, a colon or two sentences.
- Headings are plain statements of what the section holds.
- Figures are placed exactly as the deck states them. Do not round, merge or recompute.
- Do not encode meaning with a red and green pair. The pages use blue and grey only.

The name, hero picture and one line description of each page still come from
`src/data/cms/sectors.json` and `src/data/site-content.ts`. The "A closer look" list
on a service page still comes from `src/data/cms/service_categories.json`, and the
"From the project archive" tiles come from the project records.

The sub-discipline pages (HVAC → high-side, low-side, …) live in
`src/data/cms/service_categories.json`.

Each service page also shows its relevant controlled execution methods. That index is
generated from the Marketing method-statement libraries by
`scripts/import-method-statements.mjs`. Update the controlled source documents first,
then refresh the index rather than editing the generated JSON by hand.

Pictures for these pages are in `public/capability/` (`process/` for the step
illustrations, `screens/` for the operator graphics, `projects/` for site photos).

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
