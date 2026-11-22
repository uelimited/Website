# Production release — 11 September 2026

The homepage composition and original visual language have been restored and preserved. Inner-page changes reuse the existing typography, colours, rounded elements, imagery and components. The primary reference for the service taxonomy and current leadership is the September 2026 UEL Information Pack.

## Content and navigation

- Main navigation: Services, Industries, Projects, About Unique, Contact.
- About Unique: Our story, Leadership, How we deliver, Careers.
- Duplicate company pages redirect to the relevant story or delivery section.
- Service and industry detail pages lead with scope and selected work; technical details remain available through disclosures and existing subservice URLs.
- Projects open in a short photographic gallery. The historic register remains searchable in a separate view.
- Project details omit missing fields and internal content notes. Five draft project profiles are excluded from public discovery.
- Leadership uses the supplied overview; no placeholder biographies or synthetic portraits.
- Contact uses explicit mailto and telephone links. Copy-email works; no submission is falsely reported as delivered. This release does not have an email-delivery backend.
- Established date aligned to 1992 in the supplied overview; conservative 30+ years wording retained in the same homepage statistic slot.

## Release safeguards

- Next.js upgraded to 16.3.4. Production dependency audit: zero reported vulnerabilities.
- Browser components import a public-only projection of company facts. Private values and internal provenance are excluded. The original confidential register is excluded from deployment.
- Canonical URLs, metadata, robots, sitemap, privacy information, website terms and a useful 404 are included.
- Homepage footage remains the same; the web video is approximately 76% smaller and includes a poster image.
- Original files and the rejected visual redesign are retained in local temporary backups. Existing uncommitted user work was preserved.

## Validation

- Production build and TypeScript: passed.
- ESLint: passed.
- 122 sitemap pages, 343 additional internal links, 318 assets: passed.
- 23 browser chunks checked for 17 private fact markers: no leaks.
- Mobile menu navigation, project search, service filters, gallery/record switch and copy-email tested.
- 320px and 390px mobile widths checked. Narrow-screen header overflow fixed. Desktop homepage and service page visually verified.

Company-reported historic metrics and original homepage statements were preserved apart from the date correction. This release does not independently certify contractual values, safety statistics, testimonials or third-party certifications. The financial diligence pack itself is not published.

## Live deployment

Published successfully to https://unique-engineers-website.vercel.app on 11 September 2026. Production deployment dpl_2m4LMpN8pm1ZD1TFkyJ9ozcJwzGV. Public smoke checks passed for main routes, a service detail, a project detail, redirects, sitemap, robots and homepage media.
