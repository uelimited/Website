/**
 * Unique Engineers — firm data
 *
 * Single source of truth for company-wide constants. Update values
 * here and they flow through every page.
 *
 * Source: uniqueengineersltd.com/llm-info and the public sitemap.
 * Items marked PENDING are placeholders — replace with real figures
 * when the client provides them.
 */

export const FIRM = {
  legalName: "Unique Engineers Limited",
  brand: "Unique Engineers",
  // Operationally founded 1990 (the founding partnership); the entity was
  // legally incorporated in 1992. Client-confirmed canonical year: 1990.
  foundedYear: 1990,
  incorporatedYear: 1992,
  website: "uniqueengineersltd.com",
  linkedIn: "https://www.linkedin.com/company/uniqueengineers",
  blog: "https://beta.uniqueengineersltd.com/blog",

  headquarters: {
    label: "Gurugram — HQ",
    address:
      "332, 3rd Floor, A-Block, Spaze IT Park\nSohna Road, Sec-49\nGurugram, Haryana 122001",
    phone: "0124 419 2527",
  },

  // PENDING verification — placeholder email for the contact page.
  contactEmail: "info@uelimited.com",
  hours: "Mon–Sat · 09:30–18:30 IST",
};

// Years in practice, from the 1990 founding ("35+ years").
export const YEARS_IN_PRACTICE = 35;

export const HERO = {
  title: FIRM.brand,
  subtitle: "Engineered to specification. Delivered on schedule.",
  lead: "Multi-disciplinary general contracting — civil construction, MEPF services, solar projects and integrated building systems — delivered by in-house teams across India.",
};

/**
 * Company overview block — lead paragraph + six headline figures.
 *
 * Figures are engineering-scale and independently defensible only.
 * Ledger-derived counts (170 projects, ₹3,422 Cr cumulative contract
 * value) come from project_ledger.json and match the /work hub. The
 * cooling headline uses the documented 16,000 TR Central Secretariat
 * plant. Contested deck financials
 * (₹534 Cr turnover, ₹1,800 Cr net worth) are deliberately NOT shown —
 * they conflict with the audited Infomerics rating report.
 */
export const OVERVIEW = {
  eyebrow: "Company overview",
  title: "A multi-disciplinary general contractor.",
  lead: "Unique Engineers Limited is a multi-disciplinary general contractor delivering complex EPC projects across India, with in-house teams for civil construction, MEPF services, solar and integrated building systems — from data centres and semiconductor cleanrooms to airports, hospitals and district cooling.",
  stats: [
    { n: "35", unit: "+", l: "Years, since 1990" },
    { n: "170", unit: "+", l: "Projects delivered · last decade" },
    { n: "3,422", unit: "₹ Cr", l: "Cumulative contract value" },
    { n: "16,000", unit: "TR", l: "Flagship plant capacity" },
    { n: "23", unit: "", l: "States executed" },
    { n: "9", unit: "", l: "Industries served" },
  ],
};

/**
 * Hero video. Dropped into /public and referenced here. To swap,
 * replace the file and/or update `src`. Poster is shown before the
 * video loads — provide one for a sharper first paint.
 */
export const HERO_VIDEO = {
  src: "/hero.mp4",
  poster: "", // e.g. "/hero-poster.jpg"
};

/**
 * Seven disciplines — aligned to the sitemap's service sub-pages.
 *
 * Each discipline has a `media` slot. `media.videoSrc` is empty by
 * default; when set, the service detail page plays it in a rounded
 * card at the top. When empty, an on-brand animated fallback renders
 * instead (see ServiceMedia). `media.accent` picks the fallback's
 * motif — blocks | fan | current | droplets | pulse | sun | graph.
 *
 * `items` is the scope list shown on the home services scroll and
 * on detail pages; `blurb` stays a short one-liner for nav menus.
 */
export const DISCIPLINES = [
  {
    num: "01",
    slug: "civil-interior-contractors-in-gurgaon",
    name: "Civil & Interior",
    blurb:
      "Heavy civil foundations, corporate interiors, façade and retrofitting.",
    items: [
      "Heavy civil foundations",
      "High-end corporate interiors",
      "Industrial flooring",
      "Façade works",
      "Structural finishing",
      "Retrofitting",
    ],
    scope: "sq.ft",
    media: { videoSrc: "", poster: "", accent: "blocks" as const },
    images: [
      "/services/civil-hero.jpg",
      "/services/civil-hero.jpg",
      "/services/civil-hero.jpg",
    ],
  },
  {
    num: "02",
    slug: "hvac-company-in-gurgaon",
    name: "HVAC",
    blurb:
      "Central chillers, VRF, precision cooling, ventilation, thermal storage, geothermal.",
    items: [
      "Central chiller plants",
      "VRF / VRV systems",
      "Precision cooling (PAC)",
      "Ventilation",
      "Thermal storage",
      "Geothermal",
    ],
    scope: "TR · CFM",
    media: { videoSrc: "", poster: "", accent: "fan" as const },
    images: [
      "/services/hvac-hero.jpg",
      "/services/hvac-hero.jpg",
      "/services/hvac-hero.jpg",
    ],
  },
  {
    num: "03",
    slug: "electrical-contractors-in-gurgaon",
    name: "Electrical & Lighting",
    blurb:
      "HT/LT distribution, substations, DG sets, UPS, bus trunking, clean-room lighting.",
    items: [
      "HT / LT distribution",
      "Substations & transformers",
      "DG sets",
      "Critical power systems",
      "UPS",
      "Bus trunking",
      "Clean-room lighting",
    ],
    scope: "kVA · kW",
    media: { videoSrc: "", poster: "", accent: "current" as const },
    images: [
      "/services/electrical-hero.jpg",
      "/services/electrical-hero.jpg",
      "/services/electrical-hero.jpg",
    ],
  },
  {
    num: "04",
    slug: "plumbing-services-in-gurgaon",
    name: "Plumbing & Public Health",
    blurb:
      "WTP/STP/ETP plants, industrial piping, hydropneumatic, steam boilers, rainwater harvesting.",
    items: [
      "WTP / STP / ETP plants",
      "Industrial piping",
      "Hydropneumatic systems",
      "Steam boilers",
      "Rainwater harvesting",
      "Sanitary fixtures",
    ],
    scope: "LPM · KL",
    media: { videoSrc: "", poster: "", accent: "droplets" as const },
    images: [
      "/services/plumbing-hero.jpg",
      "/services/plumbing-hero.jpg",
      "/services/plumbing-hero.jpg",
    ],
  },
  {
    num: "05",
    slug: "fire-fighting-contractors-in-gurgaon",
    name: "Firefighting & Safety",
    blurb:
      "Hydrant, sprinkler, gas suppression, smoke detection, NBC compliance.",
    items: [
      "Fire hydrant systems",
      "Sprinklers",
      "Gas suppression",
      "Smoke detection",
      "NBC compliance",
    ],
    scope: "NFPA · IS",
    media: { videoSrc: "", poster: "", accent: "pulse" as const },
    images: [
      "/services/firefighting-hero.jpg",
      "/services/firefighting-hero.jpg",
      "/services/firefighting-hero.jpg",
    ],
  },
  {
    num: "06",
    slug: "solar-epc-contractors-in-gurgaon",
    name: "Solar & Renewable",
    blurb:
      "Rooftop and ground-mounted solar, net metering, LEED/IGBC compliance, energy audits.",
    items: [
      "Rooftop & ground-mounted solar",
      "Net metering",
      "Green energy integration",
      "LEED / IGBC compliance",
      "Energy audits",
    ],
    scope: "kWp",
    media: { videoSrc: "", poster: "", accent: "sun" as const },
    images: [
      "/services/solar-hero.jpg",
      "/services/solar-hero.jpg",
      "/services/solar-hero.jpg",
    ],
  },
  {
    num: "07",
    slug: "ibms",
    name: "Building Management System",
    blurb:
      "Fire alarm, CCTV, access control, DDC, energy management, SCADA integration.",
    items: [
      "Fire alarm & PA systems",
      "CCTV",
      "Access control",
      "DDC",
      "Energy management",
      "Security control",
      "SCADA integration",
    ],
    scope: "Points",
    media: { videoSrc: "", poster: "", accent: "graph" as const },
    images: [
      "/services/bms-hero.jpg",
      "/services/bms-hero.jpg",
      "/services/bms-hero.jpg",
    ],
  },
  {
    num: "08",
    slug: "operations-maintenance",
    name: "Integrated O&M",
    blurb:
      "24/7 facility management, preventive + predictive maintenance, asset lifecycle, rapid response.",
    items: [
      "24/7 facility management",
      "Preventive maintenance",
      "Predictive maintenance",
      "Asset lifecycle management",
      "Rapid response teams",
    ],
    scope: "SLA · MTTR",
    media: { videoSrc: "", poster: "", accent: "graph" as const },
    images: [
      "/services/om-hero.jpg",
      "/services/om-hero.jpg",
      "/services/om-hero.jpg",
    ],
  },
];

export type DisciplineAccent =
  "blocks" | "fan" | "current" | "droplets" | "pulse" | "sun" | "graph";

/**
 * Four pillars shown on the home page after the services scroll.
 * Curated from the "WHY UNIQUE?" deck — headline metric per point,
 * short label. Source: FY 24/25 company deck.
 */
export const PILLARS = [
  {
    num: "01",
    title: "Execution Excellence",
    lead: "First-time-right delivery — verified at every inspection.",
    points: [
      { k: "98%", l: "Quality acceptance at first inspection" },
      { k: "Zero", l: "Fatalities · last 5 years" },
      { k: "5M+", l: "Safe man-hours · FY 24/25" },
    ],
  },
  {
    num: "02",
    title: "Delivery Discipline",
    lead: "Time is engineered, not assumed. Milestone-driven, centrally monitored.",
    points: [
      { k: "98%", l: "Projects delivered on schedule" },
      { k: "100%", l: "Milestone-based tracking" },
      { k: "Zero", l: "Critical path slippages" },
    ],
  },
  {
    num: "03",
    title: "Scale & standing",
    lead: "Order-book depth and reach for large, multi-year mandates.",
    points: [
      { k: "₹450 Cr", l: "Current order book" },
      { k: "₹3,422 Cr", l: "Delivered · last decade" },
      { k: "BBB-", l: "Infomerics credit rating" },
    ],
  },
  {
    num: "04",
    title: "Exceptional Team",
    lead: "Domain-deep engineers, led by founder-directors since 1990.",
    points: [
      { k: "275+", l: "Managers & engineers" },
      { k: "15+ yrs", l: "Average manager experience" },
      { k: "100+", l: "Testing & commissioning experts" },
    ],
  },
];

/**
 * Primary navigation — the wordmark is the home link. "Capabilities" and
 * "Sectors" open mega-menus; "Work" is the unified case-study + order-book
 * hub at /work (merges the former /projects + /track-record).
 */
export const NAV = [
  { href: "/services", label: "Capabilities", menu: "capabilities" as const },
  { href: "/sectors", label: "Sectors", menu: "sectors" as const },
  { href: "/work", label: "Projects" },
  { href: "/careers", label: "Careers" },
  { href: "/firm", label: "The firm", menu: "firm" as const },
];

/** Sectors mega-menu — lead with the high-value verticals (data centre,
 *  semiconductor, airport, government) per the sector-first IA. */
export const SECTOR_NAV = [
  {
    slug: "data-centre",
    name: "Data Centre",
    blurb: "Mission-critical MEPF for colocation & hyperscale.",
  },
  {
    slug: "semiconductor-cleanroom",
    name: "Semiconductor & Cleanroom",
    blurb: "ISO 6/7/8 cleanrooms, process gases, precision utilities.",
  },
  {
    slug: "airport-public-venues",
    name: "Airport & Public Venues",
    blurb: "Full-scope MEPF for airports and large venues.",
  },
  {
    slug: "healthcare",
    name: "Healthcare",
    blurb: "Hospitals and multi-specialty campuses.",
  },
  {
    slug: "industrial-manufacturing",
    name: "Industrial & Manufacturing",
    blurb: "Factory floors, process plants, district cooling.",
  },
  {
    slug: "education-research",
    name: "Education & Research",
    blurb: "Universities and research institutes, incl. net-zero.",
  },
  {
    slug: "corporate-retail",
    name: "Corporate & Retail",
    blurb: "Towers, malls and mixed-use developments.",
  },
  {
    slug: "hospitality",
    name: "Hospitality",
    blurb: "Five-star hotels and resort campuses.",
  },
  {
    slug: "residential",
    name: "Residential",
    blurb: "Premium and luxury residential developments.",
  },
];
