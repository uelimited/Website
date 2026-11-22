/**
 * Unique Engineers - shared site content.
 *
 * Company identity and reusable facts come from company_facts.json.
 * This file keeps narrative, navigation and capability content only.
 */

import {
  COMPANY,
  getCompanyFact,
  getCompanyFactDisplay,
  getCompanyFactStat,
} from "@/data/company-facts";

export const FIRM = {
  legalName: COMPANY.legal_name,
  brand: COMPANY.brand_name,
  foundedYear: COMPANY.operational_founded_year,
  incorporatedYear: COMPANY.incorporated_year,
  website: COMPANY.website,
  linkedIn: COMPANY.linkedin,
  blog: "https://beta.uniqueengineersltd.com/blog",

  headquarters: {
    label: COMPANY.headquarters.label,
    address: COMPANY.headquarters.address_lines.join("\n"),
    phone: COMPANY.headquarters.phone,
  },

  contactEmail: COMPANY.contact_email,
  hours: COMPANY.office_hours,
};

export const YEARS_IN_PRACTICE = Number(
  getCompanyFact("years_in_practice").value,
);

export const HERO = {
  title: FIRM.brand,
  subtitle: "Engineered to specification. Delivered on schedule.",
  lead: "Multi-disciplinary general contracting — civil construction, MEPF services, solar projects and integrated building systems — delivered by in-house teams across India.",
};

/**
 * Company overview block — lead paragraph + six headline figures.
 *
 * Every figure comes from the reviewable company fact register.
 */
export const OVERVIEW = {
  eyebrow: "Company overview",
  title: "A multi-disciplinary general contractor.",
  lead: "Unique Engineers Limited is a multi-disciplinary general contractor delivering complex EPC projects across India, with in-house teams for civil construction, MEPF services, solar and integrated building systems — from data centres and semiconductor cleanrooms to airports, hospitals and district cooling.",
  stats: [
    getCompanyFactStat("years_in_practice", "Years, since 1992"),
    getCompanyFactStat("projects_last_decade", "Projects · last decade"),
    getCompanyFactStat(
      "cumulative_contract_value_last_decade",
      "Historic contract value · last decade",
    ),
    getCompanyFactStat(
      "cooling_engineered_flagships",
      "Cooling engineered · flagships",
    ),
    getCompanyFactStat("states_executed"),
    getCompanyFactStat("industries_served"),
  ],
};

/**
 * Hero video. Dropped into /public and referenced here. To swap,
 * replace the file and/or update `src`. Poster is shown before the
 * video loads — provide one for a sharper first paint.
 */
export const HERO_VIDEO = {
  src: "/hero-web.mp4",
  poster: "/hero-poster.jpg",
};

/**
 * Seven disciplines — aligned to the sitemap's service sub-pages.
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
    images: [
      "/services/om-hero.jpg",
      "/services/om-hero.jpg",
      "/services/om-hero.jpg",
    ],
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
      {
        k: getCompanyFactDisplay("quality_acceptance_first_inspection"),
        l: "First-inspection acceptance · company reported",
      },
      {
        k: getCompanyFactDisplay("fatalities_last_five_years"),
        l: "Fatalities · five years to FY2024-25",
      },
      {
        k: getCompanyFactDisplay("safe_man_hours_fy25"),
        l: "Safe man-hours · FY2024-25",
      },
    ],
  },
  {
    num: "02",
    title: "Delivery Discipline",
    lead: "Time is engineered, not assumed. Milestone-driven, centrally monitored.",
    points: [
      {
        k: getCompanyFactDisplay("projects_delivered_on_schedule"),
        l: "Projects delivered on schedule · company reported",
      },
      { k: "L1-L5", l: "Commissioning sequence" },
      { k: "3-week", l: "Rolling look-ahead planning" },
    ],
  },
  {
    num: "03",
    title: "Scale & standing",
    lead: "A historic delivery record across sectors and geographies.",
    points: [
      {
        k: getCompanyFactDisplay("projects_last_decade"),
        l: "Projects · last decade",
      },
      {
        k: getCompanyFactDisplay("cumulative_contract_value_last_decade"),
        l: "Historic contract value · last decade",
      },
      { k: getCompanyFactDisplay("states_executed"), l: "Geographic reach" },
    ],
  },
  {
    num: "04",
    title: "Exceptional Team",
    lead: "Founder-led, multi-disciplinary engineering under one delivery model.",
    points: [
      { k: getCompanyFactDisplay("founder_directors"), l: "Leadership" },
      {
        k: getCompanyFactDisplay("delivery_disciplines"),
        l: "Integrated capabilities",
      },
      { k: getCompanyFactDisplay("industries_served"), l: "Sector exposure" },
    ],
  },
];

/**
 * V2 primary navigation — four clear pillars + the Contact CTA (the wordmark
 * is the home link). Capabilities, Industries and Company open mega-menus;
 * Projects is the unified landmark archive + historic project record.
 */
export const NAV = [
  { href: "/services", label: "Services", menu: "capabilities" as const },
  { href: "/sectors", label: "Industries", menu: "sectors" as const },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About Unique", menu: "firm" as const },
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
