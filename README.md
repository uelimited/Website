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

### Email forms

Contact, vendor registration, and career applications send through the shared
EmailJS template. Copy `.env.example` to `.env.local` and add your public key.
The service and template IDs are already set. Restart the dev server after
changing environment variables.

Set **To Email** in the shared template to this single line:

```text
{{#is_vendor}}marketing@uelimited.com{{/is_vendor}}{{^is_vendor}}hr@uelimited.com{{/is_vendor}}
```

Vendor registrations go to Marketing. Careers and Contact go to HR. Replace
the first address in this expression if the vendor inbox changes.

Use `{{subject}}` as the email subject and `{{email}}` as Reply-To. Paste
[`docs/emailjs-template.html`](docs/emailjs-template.html) into the EmailJS
template’s HTML editor.

The site sends text fields only, so it works with the EmailJS Free plan.
File selections stay on the visitor’s device. If the template previously
used file attachments, remove those entries from its Attachments tab.


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

- Want to **review on a private preview URL before it goes public?** Push to a branch
  instead — see **[CONTRIBUTING.md](CONTRIBUTING.md)** for the safe, step-by-step flow
  (and how to roll back if needed).
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
