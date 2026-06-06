# Unique Engineers — Website

Marketing website for Unique Engineers (MEPF, BMS, and civil contracting), built with
[Next.js 16](https://nextjs.org) (App Router), React 19, Tailwind CSS 4, and shadcn/ui.

## Tech stack

- **Framework:** Next.js 16 (App Router, Turbopack)
- **Language:** TypeScript
- **UI:** React 19, Tailwind CSS 4, shadcn/ui, lucide-react, motion
- **Package manager:** pnpm

## Pages

- `/` — Home
- `/firm` — About the firm
- `/approach` — Our approach
- `/services`, `/services/[slug]`, `/services/[slug]/[sub]` — Services
- `/sectors`, `/sectors/[slug]` — Sectors served
- `/projects`, `/projects/[slug]` — Project case studies
- `/contact` — Contact

## Prerequisites

- **Node.js 20.9+** (Node 18.18+ also works; this repo was developed on Node 24)
- **pnpm** — install with `npm install -g pnpm` if you don't have it

## Getting started

Install dependencies:

```bash
pnpm install
```

Run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. Pages hot-reload as
you edit files under `src/app`.

## Available scripts

| Command       | Description                                  |
| ------------- | -------------------------------------------- |
| `pnpm dev`    | Start the local development server           |
| `pnpm build`  | Create a production build                    |
| `pnpm start`  | Serve the production build (run after build) |
| `pnpm lint`   | Run ESLint                                   |

## Production build

```bash
pnpm build
pnpm start
```

This serves the optimized build on [http://localhost:3000](http://localhost:3000).

## Project structure

```
src/
  app/         Routes (App Router pages and layouts)
  components/  Reusable UI — site/ (page sections) and ui/ (shadcn primitives)
  data/        Content/data used to render pages
  lib/         Helpers (e.g. cms.ts)
  styles/      Global styles
public/         Static assets (images, video, SVGs)
```

## Deployment

Deploys to any Node host or to [Vercel](https://vercel.com/new). On Vercel, import the
repo and accept the detected Next.js settings — no extra configuration required.
