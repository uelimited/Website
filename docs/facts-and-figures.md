> Production boundary (11 September 2026): browser modules read `src/data/cms/company_facts_public.json`, an explicitly reviewed public projection. The original `company_facts.json` remains a local internal register and is excluded from deployment. Do not import the original register into client components or pass it wholesale to page props. Strip source, owner and internal notes when preparing public content. Public established date is 1992 per the supplied September 2026 UEL Information Pack; the historic internal register is retained unchanged for reconciliation.

# Facts and figures governance

The authoritative company-wide fact register is:

`src/data/cms/company_facts.json`

It exists so the website, company profile, capability decks and diligence responses
do not slowly develop different versions of the same number.

## What belongs in the register

- Company identity, dates and contact details
- Company-wide scale, workforce, delivery, safety and financial claims
- Any number or credential reused in more than one communication
- Conflicting or unverified claims that need an owner to resolve

Project-specific scope, value and technical facts from the current project workbook
are imported into `landmark_projects.json`. Rich supporting narratives remain in
`projects.json`; the historic project register remains in `project_ledger.json`.
The importer deliberately leaves missing or disputed values as placeholders.
Certifications and leadership profiles remain in their dedicated JSON files.

## Statuses

- `verified`: supported by an approved primary record
- `derived`: calculated from another controlled dataset
- `needs_confirmation`: plausible, but its owner has not approved the evidence
- `conflicting`: two current sources disagree
- `needs_current_source`: time-sensitive and awaiting the latest source

## Visibility

- `public`: eligible for website or public profile use
- `confidential`: may be used in an NDA-controlled diligence pack
- `internal`: working information that must not be distributed

`website_enabled` is a separate safety switch. A fact appears on the public site only
when it is both public and explicitly enabled.

## Review sequence

1. Confirm the value and definition with the listed owner.
2. Link or identify the primary source in the `source` field.
3. Set the correct reporting period and as-of date.
4. Resolve any conflicting version and explain the change in `notes`.
5. Set the verification status.
6. Enable public display only when the fact is suitable for external use.
