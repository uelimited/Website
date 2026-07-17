# Unique Engineers — Website

The marketing website for **Unique Engineers Limited**, an MEPF, BMS and civil
contracting firm. Built with Next.js 16, React 19, TypeScript and Tailwind CSS 4.

**Live:** https://unique-engineers-website.vercel.app

---

## Quick start

You need [Node.js](https://nodejs.org) 20.9+ and [pnpm](https://pnpm.io)
(`npm install -g pnpm`).

```bash
pnpm install     # install dependencies (first time only)
pnpm dev         # start the local site at http://localhost:3000
```

Leave `pnpm dev` running and edit files — the site reloads automatically as you
save. That's the whole loop.

---

## 📝 Editing the site

**Almost everything you'll want to change — the words, the projects, the colours,
the photos — lives in plain data and style files. You rarely need to touch React
components.** Start here:

| I want to change…                        | Read this                                              |
| ---------------------------------------- | ------------------------------------------------------ |
| Copy, projects, sectors, services, logos | **[docs/editing-content.md](docs/editing-content.md)** |
| Colours, type, spacing, the brand voice  | **[docs/design-system.md](docs/design-system.md)**     |
| How the code is put together (for devs)  | **[docs/architecture.md](docs/architecture.md)**       |

A 30-second map of where things live:

- **Words & data** → `src/data/` (mostly `.json` files — see the editing guide)
- **Colours, type, spacing** → `src/styles/design-tokens.css`
- **Photos & video** → `public/`
- **Page layouts** → `src/app/` (one folder per page)

---

## Pages

| URL                         | What it is                                                  |
| --------------------------- | ----------------------------------------------------------- |
| `/`                         | Home                                                        |
| `/work`                     | Every project — filterable by sector, service, value, state |
| `/services` · `/services/…` | Capabilities (8 disciplines, each with sub-disciplines)     |
| `/sectors` · `/sectors/…`   | Sectors served (data centre, semiconductor, airport, …)     |
| `/projects/[slug]`          | Individual case-study pages                                 |
| `/firm`                     | The firm — interactive company profile                     |
| `/approach`                 | How the firm engineers and delivers                        |
| `/careers`                  | Culture / why join                                         |
| `/contact`                  | Contact form + details                                     |

> The old `/projects` and `/track-record` pages now redirect to `/work`, which
> merged them into one place.

---

## Commands

| Command             | What it does                                           |
| ------------------- | ------------------------------------------------------ |
| `pnpm dev`          | Run the site locally (hot-reloads on save)             |
| `pnpm build`        | Production build — the real test that everything works |
| `pnpm start`        | Serve the production build (run after `pnpm build`)    |
| `pnpm lint`         | Check code for problems                                |
| `pnpm format`       | Auto-format all code with Prettier                     |
| `pnpm format:check` | Check formatting without changing files                |

Before pushing a bigger change, `pnpm build` is the best confidence check — if it
passes, the site works.

---

## Publishing changes

The site **auto-deploys**: every push to the `main` branch builds and goes live at
https://unique-engineers-website.vercel.app within a minute or two.

```bash
git add -A
git commit -m "Update the Foxconn case study"
git push          # → live shortly after
```

- Push to a **different branch** to get a private preview URL (great for reviewing
  before it's public) — Vercel comments the link on the pull request.
- Repo: https://github.com/sudo-prakhar/unique-engineers-website
- Hosting: [Vercel](https://vercel.com) (Next.js auto-detected, no config needed).

---

## Tech stack

- **Framework** — [Next.js 16](https://nextjs.org) (App Router, Turbopack)
- **Language** — TypeScript
- **UI** — React 19, [Tailwind CSS 4](https://tailwindcss.com),
  [shadcn/ui](https://ui.shadcn.com) primitives, [lucide](https://lucide.dev)
  icons, [motion](https://motion.dev) for animation
- **Content** — a lightweight file-based CMS (JSON in `src/data/`) — no database
- **Hosting** — Vercel, deployed from `main`

> **Note for AI coding agents:** this is Next.js **16**, which differs from older
> versions. See [`AGENTS.md`](AGENTS.md).
