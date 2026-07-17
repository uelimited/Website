# Design system

The site's visual language is **Apple-clean, engineering-restrained**: white
surfaces, cool-neutral greys, one muted blue accent, Inter Tight type, generous
whitespace, hairline rules. Confidence comes from the typography and the content —
not from visual decoration.

Everything visual is driven by **design tokens** in one file:

```
src/styles/design-tokens.css   ← the single source of truth (colours, type, spacing…)
src/styles/design-system.css   ← the .ue-* utility classes built from those tokens
src/app/globals.css            ← global resets + wiring
```

**Change a value in `design-tokens.css` and it flows through the whole site.** Never
hard-code a colour or size anywhere else — reference the token.

---

## Colour

Cool-neutral greys on white, with a single muted-blue accent used sparingly (target:
under 3% of any screen — one primary button, links, focus rings, the wordmark dot).

| Token                        | Value        | Use                                  |
| ---------------------------- | ------------ | ------------------------------------ |
| `--paper`                    | `#FFFFFF`    | Page background                      |
| `--paper-soft`               | `#FAFAFB`    | Alternate section background         |
| `--ink-950` … `--ink-50`     | dark → light | Text and greys (`950` = main text)   |
| `--accent-500`               | `#3B6FE0`    | The one accent — CTAs, links, eyebrows |
| `--accent-700` / `--accent-400` | darker / lighter | Hover, and accent-on-dark      |
| `--ok` `--warn` `--stop`     | green/amber/red | Status only                       |

Semantic aliases (`--bg`, `--fg`, `--fg-muted`, `--border-color`, `--accent`) point
at the ramp above — prefer these in new work. **No gradients, no coloured shadows, no
saffron/orange.**

---

## Typography

Two typefaces, loaded in `src/app/layout.tsx`:

- **Inter Tight** (`--font-display`, `--font-body`) — everything. **Weight ceiling is
  500 (Medium)** — deliberately never heavier.
- **JetBrains Mono** (`--font-mono`) — figures, project codes, spec data, metadata.

Headlines are **mixed case** with tight negative tracking (`--tracking-tight`). The
type scale runs `--fs-xs` (11px) → `--fs-6xl` (128px). Weights: `--w-light` 300,
`--w-regular` 400, `--w-book` 450, `--w-medium` 500.

To restyle headings globally, edit the `.ue-h1` / `.ue-h2` / `.ue-eyebrow` classes in
`design-system.css`.

---

## Spacing, radii, shadows, motion

- **Spacing** — 8px baseline. Scale `--s-0`…`--s-12` (`4, 8, 12, 16, 24, 32, 48, 64,
  96, 128, 160, 200`). Sections breathe at 96–128px.
- **Radii** — `--radius-md` (10px) on cards, `--radius-xl` (20px) on hero imagery,
  `--radius-pill` on buttons and chips. Avoid sharp 0px corners.
- **Shadows** — almost none. `--shadow-xs` on cards, up to `--shadow-md` on
  popovers. No glows.
- **Motion** — sparse and fast: `--dur-1` 120ms (hover), `--dur-2` 220ms (panels),
  `--dur-3` 360ms (page). Easing `--ease-out` for entrances. **Motion never hides
  content** — everything is readable before/without animation, and all motion
  respects the OS "reduce motion" setting.

---

## Reusable classes

Common building blocks (in `design-system.css`) — use these so new sections match the
brand automatically:

| Class          | What it is                                            |
| -------------- | ----------------------------------------------------- |
| `.ue-container`| Centered max-width page column                        |
| `.ue-section`  | Standard vertical section padding                     |
| `.ue-h1` `.ue-h2` | Display headings                                   |
| `.ue-lead`     | Large intro paragraph                                 |
| `.ue-eyebrow`  | Small accent-coloured label above a heading           |
| `.ue-chip`     | Pill tag (e.g. service tags, ISO badges)              |
| `.ue-card`     | Bordered white card                                   |
| `.ue-rule`     | Hairline divider                                      |

---

## Voice

Copy is as much a part of the brand as the type. The rules:

- **Third person, always.** "Unique Engineers delivers…", never "We deliver…".
- **Declarative, not aspirational.** State capability as fact. Avoid "we believe",
  "we strive", "passionate".
- **Numbers before adjectives.** "16,000 TR high-efficiency plant", not "large
  cooling system".
- **Specifications, not claims.** "ISO 6/7/8 cleanroom" beats "advanced facility".
- **Mixed case.** No ALL-CAPS headlines. The only uppercase is project codes in mono
  (`UE-SEM-0650`).
- **No emoji.** Unicode where correct: `·` `—` `×` `°` `∅` `m²`.
- **Only real facts.** Don't invent clients, projects or figures — the site is read
  by prospective clients and investors.

---

## Icons & imagery

- **Icons** — [lucide](https://lucide.dev), 1.5px stroke, colour follows text. A blue
  icon is a deliberate signal (a link, a selected state).
- **Photography** — real project photos, cool-leaning, soft-cornered. No stock-photo
  gloss, no illustrations, no textures. When a photo is missing, a quiet
  "Photography" placeholder shows instead of a broken image.

---

## Dark mode

The tokens are semantically ready for a dark theme (`--ink-950` background,
`--paper` text, accent shifts to `--accent-400`), but a full dark mode isn't wired up
yet. Individual dark _sections_ (like the footer CTA) already use the inverse tokens.
