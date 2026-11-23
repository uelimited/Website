# Website launch review — 11 September 2026

**Recommendation: fix the security, content and enquiry issues before publishing this version.** The site builds successfully and the main design works on desktop and mobile. It is not ready for an unrestricted public launch in its current form.

Launch address selected: **https://unique-engineers-website.vercel.app**.

This was an audit of the existing working copy. No application code, company data or deployment settings were changed. This report is the only intentional source addition. The new version has not been published.

## Verified results

| Check | Result |
| --- | --- |
| Production build, including TypeScript | Passed; 136 build outputs generated |
| Code lint | Passed |
| Public page responses | All 132 public HTML routes returned HTTP 200 |
| Additional linked routes and filtered URLs | 23 checked; no broken destinations |
| Legacy redirects | `/work` and `/track-record` reach `/projects`, preserving the tested sector filter |
| Unknown page | Correct HTTP 404 |
| Local assets referenced in content JSON | No missing image, video or document paths found |
| Homepage video | Plays in the browser |
| Project search and card/list view | Verified; “Foxconn” yields one archive case study and 11 historic records |
| Empty contact form | Required name and email validation works |
| Responsive review | Desktop at 1280px and selected pages at 390px; mobile menu defect reproduced |
| Existing Vercel homepage | Returned HTTP 200; it differs from the current local version |

The 132-page count excludes the favicon and framework error routes. The first restricted build could not download Google Fonts; the subsequent build with network access completed. Page availability is not a claim that every interactive element on all 132 pages has been exhaustively tested.

## Resolve before launch

### 1. Confidential company records are shipped to browsers

**Priority: launch blocker. Owner: development.**

The production browser file `/_next/static/chunks/0g1xrbbg3encd.js` returned HTTP 200 and contains five records marked confidential or internal: current order book, FY25 turnover, net-worth claim, procurement-budget claim and banking-credit-limit claim. Their values are deliberately not reproduced here.

`src/data/company-facts.ts` imports the entire register. Client components, including the header and project browser, import this module through shared company content. Hiding a fact from visible page content does not remove it from downloadable JavaScript. The existing visibility check only checks configuration; it does not prevent this exposure. The direct fact getters also do not enforce the display flags.

**Change:** keep the complete register server-only. Provide browser components with a separate, explicitly selected public dataset containing only required fields. Enforce publication flags in public getters. Rebuild and verify that private record identifiers and values are absent from browser chunks and page data. This exposure was confirmed on the local production build; the older live site's bundles were not audited for it.

### 2. Update the framework and dependency lockfile

**Priority: launch blocker. Owner: development.**

The installed Next.js version is **16.2.4**. The production dependency audit flags 24 Next.js advisories, including two critical advisories. The maintainer identifies **16.3.3** as the patched 16.x release for the AVIF image-optimization issue and the Windows-hosting issue. Upgrade to a supported version that covers these patches, align the framework lint package, refresh affected dependencies, and rebuild.

Sources: [Next.js AVIF advisory](https://github.com/vercel/next.js/security/advisories/GHSA-2xp9-vwfh-vxw4), [Next.js Windows-hosting advisory](https://github.com/vercel/next.js/security/advisories/GHSA-p293-qw3h-jr36), [React Server Components denial-of-service advisory](https://github.com/vercel/next.js/security/advisories/GHSA-8h8q-6873-q5fj).

The audit totals are 2 critical, 37 high, 41 moderate and 7 low findings across the declared production dependency tree. These counts include transitive and tooling dependencies; they do not establish that every finding is exploitable on this website. In particular, the Windows-specific advisory should not be described as a confirmed Vercel exposure, and the AVIF advisory depends on image optimization conditions. No exploit testing was performed. The `shadcn` CLI is currently declared as a production dependency and should be reviewed as development tooling.

### 3. Make enquiries reliably reach the business

**Priority: high. Owner: development / business development.**

The contact form has no receiving endpoint. “Send message” builds a `mailto:` URL, replaces the form with a “Draft ready” message, and expects the visitor to finish sending in a separate mail application. A visitor without a configured mail application can lose the enquiry. The generated reference is not stored or tracked.

**Change:** connect a real enquiry endpoint or CRM with validation, spam protection, routing and clear success/error states. Alternatively, launch with an explicit “Email us” action that accurately describes what will happen. Make the displayed email and phone clickable, give the topic selector an accessible label, and confirm the promised two-business-day response owner. A completed enquiry was not sent during this audit.

### 4. Remove unfinished public content

**Priority: high. Owner: marketing / HR / project teams.**

| Page or area | What is unfinished | Launch treatment |
| --- | --- | --- |
| Leadership | Ten pending director/functional profiles plus one missing founder portrait | Show only completed, confirmed profiles until the rest are ready |
| Culture | Eight photo slots and text such as “Real moments will live here” | Supply authentic photos or omit the incomplete section |
| Engineering strength / workforce | Headcount and workforce placeholders | Publish supported narrative; omit unknown numbers and editing instructions |
| Careers | Three sample employee quotes with “Sample — replace me” names | Replace with approved real stories or remove the block |
| Project archive | 39 of 50 imported landmark records list missing fields; 52 total case-study pages include two legacy records | Resolve material gaps or show only complete public fields and eligible projects |
| Project detail pages | Public “Information status” lists expose missing-field notes | Keep editorial tracking in the content register, outside visitor-facing pages |
| Footer | “Legal pages · content pending approval” | Replace with actual approved pages and working links |

The project archive also claims “verified register data” while many records explicitly remain incomplete. That wording needs to match the publication status. The content tracker refers to a founder portrait for Rajiv Aggarwal while the leadership data names Rajiv Kumar Gupta; reconcile the tracker against the approved roster before requesting materials.

### 5. Reconcile project figures and public claims

**Priority: high. Owner: projects / commercial / marketing.**

The archive and historic register show different numbers for apparently corresponding mandates:

| Project | Archive | Historic register, displayed rounded |
| --- | --- | --- |
| INGKA / IKEA | ₹411 Cr | ₹347 Cr |
| Mopa Airport | ₹130 Cr | ₹112 Cr |
| Common Central Secretariat | ₹250 Cr | ₹224 Cr |
| Foxconn campus | ₹650 Cr | ₹454 Cr across 11 matching records |

These may reflect different dates, package scopes or contract revisions. Neither set should be overwritten by guesswork. Reconcile them or label the dataset date and scope clearly. Sector totals also use the historic register: the homepage shows ₹61 Cr for data centres while an individual featured CtrlS project shows ₹70 Cr.

Four visible performance claims remain marked `needs_confirmation`: first-inspection acceptance, on-schedule delivery, safe man-hours and fatalities. The existing content register also says the two client testimonials await approval and certification evidence is outstanding. Confirm the source, period and publication status, or omit these claims for launch.

The state filter contains “Gujarat” and “Gujrat”, “NCR”, “Delhi NCR”, and a combined “Gujarat and Jagiroad, Assam” option. Normalize geographic fields and multi-state projects, then recalculate the geographic headline. Do not infer a state count from raw labels.

### 6. Close the mobile menu after a selection

**Priority: high. Owner: development.**

At 390px width: open the menu, choose Leadership, and the URL changes to `/leadership` while the Navigation dialog stays open and covers the page. The shared header survives route changes, and its menu links do not dismiss the sheet.

**Change:** close the menu on link selection and route change, with appropriate focus handling. Recheck keyboard navigation as well as touch.

### 7. Finish search and sharing settings for Vercel

**Priority: high. Owner: development / marketing.**

The site's metadata base is still `https://www.uniqueengineersltd.com`. The rendered share-image URL therefore points to that domain, not the selected Vercel host. No canonical URL was present on the 132 pages checked. `/sitemap.xml` and `/robots.txt` both return 404. The contact page inherits the homepage title.

**Change:** use the Vercel launch origin consistently for canonical and share URLs, add a sitemap for published pages and an intentional robots policy, and add contact-page metadata. The current share description also reads “35+, 170+ and delivery across 23 states”; add units so it makes sense outside the website. Add relevant organization/breadcrumb structured data after the public company facts are settled.

### 8. Finish the privacy and terms pages

**Priority: high. Owner: company content owner / development.**

`/privacy` and `/terms` return 404. The site's own content tracker records these as awaiting company-approved content. Publish notices that describe the actual enquiry and tracking setup and link them from the footer and relevant form context. This is an implementation/content finding, not a determination of legal compliance. No cookie banner or analytics service should be added without matching the chosen setup.

## Improve during launch preparation

| Improvement | Evidence and recommended change |
| --- | --- |
| Reduce the homepage video | `public/hero.mp4` is 40.6 MB (38.7 MiB), auto-plays and has no poster. Produce a shorter, compressed version, add a poster and a pause control, and respect reduced-motion preferences for video as well as text animation. A throttled network performance score was not measured. |
| Shorten the homepage | Observed page heights were about 25,350px on desktop and 27,977px on mobile. Reduce long scroll sequences and repeated explanatory copy; bring representative work and an enquiry action closer to the first screen. |
| Fix narrow-screen overflow | The homepage reached 393px content width in a 390px viewport. The testimonial grid's 320px minimum is a likely contributor. Check at 320px and 375px too. Other sampled routes fit the 390px page width; horizontal company subnavigation is intentional. |
| Preserve method enquiry context | Every “Request review” link opens generic `/contact`. Carry the method code/title and enquiry topic into the form. |
| Improve accessibility details | Add a skip-to-content link, label the contact topic control, review heading hierarchy, and check light-blue hero copy for contrast over moving imagery. The looping hero video has no pause control. |
| Polish copy and photography | Correct durations such as “1 Years”, normalize location spelling/capitalization and replace remaining generic “Photography” panels. |
| Simplify company navigation | The company menu has many closely related destinations. Lead with completed pages and progressively reveal supporting information. |
| Update publishing documentation | README still says `/work` is canonical and `/projects` redirects there; current routing does the reverse. Keep the launch instructions consistent with the actual site. |
| Define enquiry and error monitoring | After choosing the receiving service, confirm who monitors delivery failures and enquiry response time. Traffic analytics can follow the selected privacy setup. |

## Suggested release sequence

1. Remove private data from browser output and update vulnerable dependencies.
2. Fix the mobile menu, enquiry experience and Vercel metadata.
3. Publish complete content only; reconcile material project figures and performance claims.
4. Compress the hero video and finish the highest-impact copy/accessibility improvements.
5. Rebuild, rerun dependency and browser-output checks, and verify the final enquiry workflow.
6. Create a review deployment, check the exact deployed version, then publish to the selected Vercel address.

The working copy already contains extensive edits and untracked pages/media on `main`. Preserve that work and explicitly include the intended new assets when preparing the release. Vercel project linkage is present locally, and repository documentation says pushes to `main` auto-deploy; the current dashboard configuration was not inspected. No Git push, merge, deployment or external message was performed in this audit.
