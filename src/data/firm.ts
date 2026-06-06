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
  foundedYear: 1992,
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
  hours: "Mon–Fri · 09:30–18:30 IST",
};

// Hard-coded to match the company deck (FY 24/25). Founded 1992.
export const YEARS_IN_PRACTICE = 35;

export const HERO = {
  title: FIRM.brand,
  subtitle: "Engineered to specification. Delivered on schedule.",
  lead:
    "Multi-disciplinary general contracting — civil construction, MEPF services, solar projects and integrated building systems — delivered by in-house teams across India.",
};

/**
 * Company overview block — lead paragraph + six headline figures.
 * Source: the company's FY 24/25 deck.
 */
export const OVERVIEW = {
  eyebrow: "Company overview",
  title: "A multi-disciplinary general contractor.",
  lead:
    "Unique Engineers Limited is a premier multi-disciplinary general contracting company delivering complex EPC projects across India, with in-house capabilities across civil construction, MEPF services, solar projects and integrated building and infrastructure systems.",
  stats: [
    { n: "35",         unit: "",    l: "Years of experience" },
    { n: "534",        unit: "₹ Cr", l: "Turnover · FY 24/25" },
    { n: "650",        unit: "",    l: "Projects completed" },
    { n: "2,500",      unit: "",    l: "Workforce strength" },
    { n: "1,000",      unit: "₹ Cr", l: "Project handling capacity" },
    { n: "10",         unit: "days", l: "Pan-India mobilisation" },
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
  | "blocks" | "fan" | "current" | "droplets" | "pulse" | "sun" | "graph";

// Selected project record. PENDING client-supplied case studies.
export const PROJECTS = [
  {
    idx: "01",
    code: "UE-MEP-0142",
    name: "Commercial tower shell + MEPF",
    location: "Gurugram, Haryana",
    meta: ["MEPF", "180K sq.ft", "Delivered"],
    category: "Commercial",
  },
  {
    idx: "02",
    code: "UE-BMS-0238",
    name: "IT park IBMS retrofit",
    location: "Noida, Uttar Pradesh",
    meta: ["IBMS retrofit", "6 blocks", "Active"],
    category: "Commercial",
  },
  {
    idx: "03",
    code: "UE-FFS-0311",
    name: "Healthcare firefighting upgrade",
    location: "Delhi NCR",
    meta: ["Firefighting", "320 beds", "Delivered"],
    category: "Healthcare",
  },
  {
    idx: "04",
    code: "UE-MEP-0402",
    name: "Pharma R&D facility",
    location: "Baddi, Himachal Pradesh",
    meta: ["MEPF", "42K sq.ft", "Delivered"],
    category: "Pharma",
  },
  {
    idx: "05",
    code: "UE-CIV-0519",
    name: "Industrial shed package",
    location: "Manesar, Haryana",
    meta: ["Civil + MEP", "64K sq.ft", "Active"],
    category: "Industrial",
  },
  {
    idx: "06",
    code: "UE-MEP-0604",
    name: "Data centre MEPF + BMS",
    location: "Mumbai, Maharashtra",
    meta: ["MEPF + BMS", "12 MW", "Active"],
    category: "Data Centre",
  },
];

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
    title: "Financial Strength",
    lead: "Balance-sheet depth for large, multi-year mandates.",
    points: [
      { k: "₹1,800 Cr", l: "Approx. company net worth" },
      { k: "₹400+ Cr", l: "Banking credit limit" },
      { k: "₹300+ Cr", l: "Procurement budget" },
    ],
  },
  {
    num: "04",
    title: "Exceptional Team",
    lead: "Domain-deep engineers, led by founder-directors since 1992.",
    points: [
      { k: "275+", l: "Managers & engineers" },
      { k: "15+ yrs", l: "Average manager experience" },
      { k: "100+", l: "Testing & commissioning experts" },
    ],
  },
];

/**
 * Project sectors — breadth of industries served. Shown on the home
 * page directly below the Capabilities section. Each entry lists
 * completed count + cumulative revenue and will eventually carry a
 * row of client logos (placeholders for now).
 */
export const SECTORS = [
  {
    title: "Semiconductor & Data Centre",
    projects: "8",
    revenue: "₹750+ Cr",
    clients: 6,
  },
  {
    title: "Airport & Public Venues",
    projects: "20+",
    revenue: "₹500+ Cr",
    clients: 6,
  },
  {
    title: "Education & Research Centres",
    projects: "50+",
    revenue: "₹600+ Cr",
    clients: 6,
  },
  {
    title: "Corporate & Retail",
    projects: "75+",
    revenue: "₹800+ Cr",
    clients: 6,
  },
  {
    title: "Industrial",
    projects: "15",
    revenue: "₹550+ Cr",
    clients: 6,
  },
  {
    title: "Healthcare",
    projects: "50+",
    revenue: "₹700+ Cr",
    clients: 6,
  },
  {
    title: "Hospitality",
    projects: "25+",
    revenue: "₹400+ Cr",
    clients: 6,
  },
  {
    title: "Residential",
    projects: "25+",
    revenue: "₹500+ Cr",
    clients: 6,
  },
];

/**
 * Landmark projects — flagship mandates that defined the firm's
 * evolution. Sourced from the FY 24/25 company deck. Used in the
 * home page "Landmark projects" section below Why Unique.
 *
 * Order is by prominence: the first entry renders as the featured
 * hero card; the remaining four fill a 2×2 grid beneath it.
 */
export const LANDMARK_PROJECTS = [
  {
    idx: "01",
    name: "Ingka Centre",
    client: "IKEA",
    location: "Noida, India",
    type: "Mixed Use",
    timeline: "3 years",
    value: "₹411 Cr",
    scope: ["HVAC", "Firefighting", "Plumbing", "Electrical", "Solar", "PNG"],
    summary:
      "Our biggest single-order mandate to date — full MEPF and solar services, with PNG. A ₹450 Cr second phase for office and hotel floors is in the pipeline.",
    accent: "blocks" as const,
  },
  {
    idx: "02",
    name: "Foxconn Semiconductor Facility",
    client: "Foxconn · Apple",
    location: "Bangalore, India",
    type: "Semiconductor",
    timeline: "1 year",
    value: "₹650 Cr",
    scope: [
      "HVAC",
      "Firefighting",
      "Plumbing",
      "Electrical",
      "Clean room",
      "CDA",
      "Nitrogen",
      "Vacuum",
    ],
    summary:
      "Fast-track clean-room MEPF in active ISO-class zones. Two 14,000 sqm floors delivered in three months with a 1,500-strong workforce — ahead of schedule, earning a ₹12 Cr early-delivery bonus.",
    accent: "pulse" as const,
  },
  {
    idx: "03",
    name: "Common Central Secretariat — Executive Enclave",
    client: "Government of India",
    location: "New Delhi, India",
    type: "Office Building",
    timeline: "3 years",
    value: "₹250 Cr",
    scope: ["HVAC", "Firefighting"],
    summary:
      "IGBC-Gold administrative complex. 16,000 TR high-efficiency plant, 5,00,000 sqm ducting, 1,00,000 m piping — optimised for lifecycle carbon reduction.",
    accent: "fan" as const,
  },
  {
    idx: "04",
    name: "Mopa International Airport",
    client: "GMR Group",
    location: "Goa, India",
    type: "Airport",
    timeline: "1 year",
    value: "₹130 Cr",
    scope: ["HVAC", "Firefighting", "Plumbing", "Electrical"],
    summary:
      "Full MEPF delivery in a logistically constrained site. Structured material planning and parallel work fronts held schedule discipline through a compressed timeline.",
    accent: "graph" as const,
  },
  {
    idx: "05",
    name: "Nalanda University",
    client: "Ministry of External Affairs",
    location: "Rajgir, Bihar, India",
    type: "University Campus",
    timeline: "2 years",
    value: "₹60 Cr",
    scope: ["HVAC", "IBMS", "Thermal storage", "Geothermal VRV"],
    summary:
      "India's first net-zero university campus. Thermal storage, brine chillers, and geothermal VRV tied into an IBMS for real-time energy control.",
    accent: "sun" as const,
  },
];

/**
 * Leadership — the two founding directors.
 * Source: FY 24/25 company deck. Portrait assets are PENDING;
 * until then the /firm page renders a .ue-photo placeholder.
 */
export const LEADERSHIP = [
  {
    name: "Pradeep Sharma",
    role: "Founding & Managing Director",
    credential: "B.Tech Mechanical Engineering · YMCA '88",
    experience: "40 years in the MEPF industry",
    portrait: "",
  },
  {
    name: "Manmohan Jindal",
    role: "Founding & Managing Director",
    credential: "B.Tech Mechanical Engineering · YMCA '89",
    experience: "40 years in the MEPF industry",
    portrait: "",
  },
];

/**
 * Team metrics shown beneath the leadership cards on /firm.
 * Source: FY 24/25 company deck ("Exceptional Team" slide).
 */
export const TEAM_STATS = [
  { n: "2,500", unit: "+", l: "Workforce strength · direct & contractual" },
  { n: "275",   unit: "+", l: "Managers & engineers" },
  { n: "15",    unit: "+ yrs", l: "Average manager experience" },
  { n: "100",   unit: "+", l: "Testing & commissioning experts" },
  { n: "10",    unit: "+ yrs", l: "Average field engineer experience" },
];

export const PROJECT_CATEGORIES = [
  "All",
  "Commercial",
  "Industrial",
  "Pharma",
  "Healthcare",
  "Data Centre",
];

export const NAV = [
  { href: "/",         label: "Home" },
  { href: "/services", label: "Capabilities" },
  { href: "/sectors",  label: "Sectors" },
  { href: "/projects", label: "Projects" },
  { href: "/approach", label: "Approach" },
  { href: "/firm",     label: "Firm" },
  { href: "/contact",  label: "Contact" },
];
