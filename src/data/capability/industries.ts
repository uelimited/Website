/**
 * Industry pages, keyed by sector slug.
 *
 * Each page takes the slice of its capability deck that applies:
 *   data-centre                 02 Data Centre (with 08 DfMA and Modular)
 *   semiconductor-cleanroom     05 Cleanroom
 *   industrial-manufacturing    04 Industrial
 *   airport-public-venues       07 Public and Institutional
 *   education-research          07 Public and Institutional
 *   healthcare                  07 Public and Institutional
 *   corporate-retail            06 High End Mixed Use
 *   hospitality                 06 High End Mixed Use
 *   residential                 06 High End Mixed Use
 *
 * The company overview, history, people, revenue, organisation and
 * contact slides are not carried over. Why Unique Engineers and How
 * we deliver come from shared.ts and are the same on every page.
 */
import type { CapBlock, CapChapter, CapPage, CapTile } from "./types";
import { whyBlock } from "./shared";

const C = "/capability/projects/";
const EYEBROW = "Industries we serve";

/* ------------------------------------------------------------------
   06 High End Mixed Use: corporate and retail, hospitality, residential
   ------------------------------------------------------------------ */

const MIXED_USE_CLIENTS = [
  "IKEA (INGKA Centre)",
  "Prestige",
  "World Trade Center",
  "Microsoft",
  "CPWD",
  "Bharti Airtel",
  "Vatika",
  "M3M",
];

// Deck 06, slide 19. City and scope as on the slide.
const REF_CAMELLIAS: CapTile = {
  name: "DLF The Camellias",
  slug: "dlf-camellias-gurugram",
  place: "Gurugram",
  scope: "VRF air conditioning",
};
const REF_MANSION: CapTile = {
  name: "M3M Mansion, Sector 113",
  slug: "m3m-mansion-113",
  place: "Gurugram",
  scope: "VRV air conditioning and air purification",
};
const REF_GOLF: CapTile = {
  name: "M3M Golf Estate",
  slug: "m3m-golf-estate",
  place: "Gurugram",
  scope: "HVAC",
};
const REF_MERLIN: CapTile = {
  name: "M3M Merlin",
  slug: "m3m-merlin",
  place: "Gurugram",
  scope: "HVAC",
};
const REF_SKY: CapTile = {
  name: "Sky Mansion",
  slug: "sky-mansion",
  place: "New Delhi",
  scope: "HVAC, electrical, fire alarm and CCTV",
};
const REF_BHARTI: CapTile = {
  name: "Bharti Aerocity",
  slug: "bharti-airtel-aerocity",
  place: "New Delhi",
  scope: "HVAC",
};
const REF_VATIKA: CapTile = {
  name: "Vatika One on One",
  // The archive record is not published yet, so the picture is set here.
  image: "/project-archive/vatika-one-on-one/hero.jpg",
  place: "Gurugram",
  scope: "HVAC and electrical",
};
const REF_VINTA: CapTile = {
  name: "Vinta, Aerocity",
  // The archive record is a placeholder, so the picture is set here.
  image: "/project-archive/vinta-realty/hero.jpg",
  place: "New Delhi",
  scope: "HVAC",
};

// Deck 06, slide 20. Values as on the slide.
export const CIVIL_PORTFOLIO: CapTile[] = [
  {
    name: "Tata Dholera",
    place: "Dholera",
    value: "₹70+ cr",
    scope: "Civil and electrical duct bank",
    image: C + "dholera-duct-bank.jpg",
  },
  {
    name: "CtrlS Data Centre DC6 and 7",
    place: "Navi Mumbai",
    value: "₹150+ cr",
    scope: "Civil interiors, electrical, HVAC, IBMS, fire, PHE",
    image: C + "ctrls-civil-interiors.jpg",
  },
  {
    name: "VISTA Centre",
    place: "NCR",
    value: "₹80 cr",
    scope: "Civil",
    image: C + "vista-centre.jpg",
  },
  {
    name: "SMARR City Centre, Shishta Buildwell",
    slug: "smarr-city-centre-92",
    place: "NCR",
    value: "₹70 cr",
    scope: "Civil",
  },
];

const corporateRetail: CapPage = {
  slug: "corporate-retail",
  name: "Corporate & Retail",
  eyebrow: EYEBROW,
  title: "Corporate & Retail.",
  description:
    "MEPF, solar, BMS and civil works for retail, office and mixed use developments.",
  stats: [
    {
      value: "120+",
      label: "Commercial, hospitality and residential projects",
    },
    {
      value: "₹410 cr",
      label: "IKEA / INGKA Centre, Noida",
      note: "Work order value, August 2026 order book",
    },
    {
      value: "₹220 cr",
      label: "Prestige BKC 101, Mumbai",
      note: "Work order value, August 2026 order book",
    },
    {
      value: "₹76.9 cr",
      label: "World Trade Centre, Gurugram",
      note: "Basic contract value, excluding GST",
    },
  ],
  blocks: [
    {
      // The scope of work on INGKA Centre and Prestige BKC 101 (deck 06,
      // slides 11 and 13), placed on a model of a mixed use development.
      kind: "building",
      model: "mixed-use",
      subject: "a mixed use development",
      id: "what-we-deliver",
      nav: "What we deliver",
      eyebrow: "What we deliver in retail, office and mixed use developments",
      title:
        "MEPF, solar, BMS and civil works across the podium and the towers.",
      lede: "Scope of work on INGKA Centre, Noida, and Prestige BKC 101, Mumbai.",
      image: "/capability/building/mixed-use-intro.jpg",
      chapters: [
        {
          key: "hvac",
          label: "HVAC",
          eyebrow: "INGKA Centre, Noida",
          title: "HVAC",
          text: "Chiller installation, pumps and chilled water distribution. AHUs, FCUs, fresh air, ventilation, smoke control, ducts, valves and insulation. Equipment supply follows the signed package.",
          labels: [
            { anchor: "chillers", text: "Chillers and pumps" },
            { anchor: "header", text: "Chilled water distribution" },
            { anchor: "ahu", text: "Air handling units" },
            { anchor: "fcu", text: "Fan coil units" },
          ],
          proof: {
            project: "Prestige BKC 101, Mumbai",
            text: "Chilled water systems, air handling, ventilation and distribution for office and hotel areas. Connections and installation of identified client supplied plant.",
          },
          image: "/capability/building/mixed-use-hvac.jpg",
        },
        {
          key: "electrical",
          label: "Electrical and solar",
          eyebrow: "INGKA Centre, Noida",
          title: "Electrical and solar",
          text: "Electrical distribution, lighting, cabling, earthing and equipment connections. Scheduled PV solar works across the basement, retail and common areas.",
          labels: [
            { anchor: "substation", text: "Substation" },
            { anchor: "lt", text: "Electrical distribution" },
            { anchor: "solar", text: "PV solar" },
            { anchor: "dg", text: "DG sets" },
          ],
          proof: {
            project: "Prestige BKC 101, Mumbai",
            text: "Power distribution, cabling, lighting, earthing and bonding. Installation and connection of identified client supplied electrical equipment.",
          },
          image: "/capability/building/mixed-use-electrical.jpg",
        },
        {
          key: "plumbing",
          label: "Plumbing and PNG",
          eyebrow: "INGKA Centre, Noida",
          title: "Plumbing and PNG",
          text: "Plumbing pumps, water supply, drainage and sanitary services. Scheduled PNG system and building utility connections.",
          labels: [
            { anchor: "tanks", text: "Water tanks and pumps" },
            { anchor: "png", text: "PNG system" },
            { anchor: "stp", text: "Sewage treatment plant" },
            { anchor: "hotwater", text: "Hotel hot water" },
          ],
          proof: {
            project: "Prestige BKC 101, Mumbai",
            text: "Domestic and flushing water supply, soil and waste drainage, pumps and tanks. Sewage treatment plant and hotel hot water systems.",
          },
          image: "/capability/building/mixed-use-plumbing.jpg",
        },
        {
          key: "fire",
          label: "Fire protection",
          eyebrow: "INGKA Centre, Noida",
          title: "Fire protection",
          text: "Fire pumps, sprinkler and hydrant distribution, with the required equipment and control interfaces.",
          labels: [
            { anchor: "firetank", text: "Fire water tank and pumps" },
            { anchor: "hydrants", text: "Hydrant ring main" },
            { anchor: "sprinklers", text: "Sprinklers" },
            { anchor: "wetriser", text: "Wet risers" },
          ],
          proof: {
            project: "Prestige BKC 101, Mumbai",
            text: "Fire pumps, wet risers, hydrants, sprinklers, water curtains and hose reels.",
          },
          image: "/capability/building/mixed-use-fire.jpg",
        },
        {
          key: "bms",
          label: "BMS and ELV",
          eyebrow: "INGKA Centre, Noida",
          title: "BMS and ELV",
          text: "HVAC plant controls, instruments and communications interfaces. Point schedules and equipment integration with the chiller and BMS specialists.",
          labels: [
            { anchor: "ddc", text: "DDC controls" },
            { anchor: "devices", text: "Field devices" },
            { anchor: "alarm", text: "Fire alarm and voice alarm" },
          ],
          proof: {
            project: "Prestige BKC 101, Mumbai",
            text: "BMS head end, DDC controls and field devices. Fire alarm and PA/voice alarm. CCTV, access control, data, Wi Fi, telephone, mobile booster and DTH within the office award.",
          },
          image: "/capability/building/mixed-use-bms.jpg",
        },
        {
          // Service lines: deck 06, slide 6 (the same slide is in every deck). Figure: deck 06, slide 20 (civil portfolio).
          key: "civil",
          label: "Civil works",
          eyebrow: "Civil",
          title: "Civil works",
          text: "Foundations and enabling works, civil infrastructure works, partitions and interiors, and builders' work coordinated with the services.",
          labels: [
            { anchor: "podium", text: "Podium structure" },
            { anchor: "slab", text: "Floor slabs" },
            { anchor: "cores", text: "Lift and stair cores" },
            { anchor: "plinths", text: "Equipment foundations" },
          ],
          stat: { value: "₹80 cr", label: "VISTA Centre, NCR", note: "Civil" },
          image: "/capability/building/mixed-use-civil.jpg",
        },
        {
          key: "firestop",
          label: "Fire stopping",
          eyebrow: "Prestige BKC 101, Mumbai",
          title: "Fire stopping",
          text: "Specified fire stopping package for MEP penetrations through rated walls and slabs. Coordinate sleeves and openings with the general contractor and record completed seals.",
          labels: [
            { anchor: "collar", text: "Sealed slab penetrations" },
            { anchor: "risers", text: "Service risers" },
          ],
          image: "/capability/building/mixed-use-firestop.jpg",
        },
        {
          key: "handover",
          label: "Testing and handover",
          eyebrow: "INGKA Centre, Noida",
          title: "Testing and handover",
          text: "Coordinated shop drawings, system inspections, TAB, integrated testing and phased handover.",
          proof: {
            project: "Prestige BKC 101, Mumbai",
            text: "Trade test packs, TAB, coordinated commissioning and office/hotel handover dossiers.",
          },
          image: "/capability/building/mixed-use-handover.jpg",
        },
      ],
    },
    {
      // Projects open their own pages (src/app/projects/[slug]), where the
      // overview and the scope of work by service are told.
      kind: "experience",
      id: "experience",
      nav: "Experience",
      eyebrow: "Our experience",
      title: "Retail, office and mixed use developments.",
      lede: "INGKA Centre, Prestige BKC 101 and World Trade Centre. Each opens its own page, with the project overview and the scope of work by service.",
      projects: ["ikea-noida", "prestige-bkc-101", "wtc-gurugram"],
      more: [
        {
          label: "More references in the National Capital Region",
          items: [REF_BHARTI, REF_VATIKA, REF_VINTA, REF_SKY],
        },
        { label: "Civil portfolio", items: CIVIL_PORTFOLIO },
      ],
      also: {
        label: "Clients in commercial and residential work",
        items: MIXED_USE_CLIENTS,
      },
    },
    whyBlock(),
  ],
};

const hospitality: CapPage = {
  slug: "hospitality",
  name: "Hospitality",
  eyebrow: EYEBROW,
  title: "Hospitality.",
  description:
    "MEPF, BMS and civil works for hotels within high end mixed use developments.",
  stats: [
    {
      value: "120+",
      label: "Commercial, hospitality and residential projects",
    },
    {
      value: "182",
      label: "Hotel keys at Prestige BKC 101",
      note: "BMS and fire alarm with voice evacuation cover the hotel",
    },
    {
      value: "₹220 cr",
      label: "Prestige BKC 101, office and hotel",
      note: "Work order value, August 2026 order book",
    },
    {
      value: "62",
      label: "DDC controllers in the hotel",
      note: "Of 193 across the office tower and hotel",
    },
  ],
  blocks: [
    {
      // Deck 06, slides 13 and 15, and deck 09, slides 16 to 18: the hotel
      // at Prestige BKC 101, placed on a model of a mixed use development.
      kind: "building",
      model: "hotel",
      subject: "a hotel tower in a mixed use development",
      id: "what-we-deliver",
      nav: "What we deliver",
      eyebrow: "What we deliver in hotels",
      title: "What we are delivering for the hotel at Prestige BKC 101.",
      lede: "The hotel shares the base build MEP systems with the office tower. BMS and fire alarm with voice evacuation cover both buildings. Hotel ELV is by others.",
      image: "/capability/building/hotel-intro.jpg",
      chapters: [
        {
          key: "hvac",
          label: "HVAC",
          eyebrow: "Prestige BKC 101, Mumbai",
          title: "HVAC",
          text: "Chilled water systems, air handling, ventilation and distribution for office and hotel areas. Connections and installation of identified client supplied plant.",
          labels: [
            { anchor: "hotelriser", text: "Chilled water risers" },
            { anchor: "hotelfcu", text: "Fan coil units" },
            { anchor: "chillers", text: "Chilled water plant" },
            { anchor: "vrf", text: "VRF units" },
          ],
          stat: {
            value: "₹220 cr",
            label: "Prestige BKC 101, office and hotel",
            note: "Work order value, August 2026 order book",
          },
          image: "/capability/building/hotel-hvac.jpg",
        },
        {
          key: "electrical",
          label: "Electrical",
          eyebrow: "Prestige BKC 101, Mumbai",
          title: "Electrical",
          text: "Power distribution, cabling, lighting, earthing and bonding. Installation and connection of identified client supplied electrical equipment.",
          labels: [
            { anchor: "hotelpower", text: "Rising main" },
            { anchor: "hoteldb", text: "Floor distribution boards" },
            { anchor: "lt", text: "LT panels" },
          ],
          image: "/capability/building/hotel-electrical.jpg",
        },
        {
          key: "water",
          label: "Hot water and public health",
          eyebrow: "Prestige BKC 101, Mumbai",
          title: "Hot water and public health",
          text: "Domestic and flushing water supply, soil and waste drainage, pumps and tanks. Sewage treatment plant and hotel hot water systems.",
          labels: [
            { anchor: "hotwater", text: "Hotel hot water" },
            { anchor: "baths", text: "Guest bathrooms" },
            { anchor: "tanks", text: "Pumps and tanks" },
            { anchor: "stp", text: "Sewage treatment plant" },
          ],
          image: "/capability/building/hotel-water.jpg",
        },
        {
          key: "fire",
          label: "Fire protection",
          eyebrow: "Prestige BKC 101, Mumbai",
          title: "Fire protection",
          text: "Fire pumps, wet risers, hydrants, sprinklers, water curtains and hose reels.",
          labels: [
            { anchor: "hotelwet", text: "Wet risers" },
            { anchor: "hotelsprinklers", text: "Sprinklers" },
            { anchor: "firetank", text: "Fire water tank and pumps" },
            { anchor: "hydrants", text: "Hydrant ring main" },
          ],
          image: "/capability/building/hotel-fire.jpg",
        },
        {
          key: "alarm",
          label: "Fire alarm and voice evacuation",
          eyebrow: "Prestige BKC 101, Mumbai",
          title: "Fire alarm and voice evacuation",
          text: "Addressable fire alarm and voice evacuation for the office tower and the hotel, with every life safety interface proved as one sequence.",
          labels: [
            { anchor: "alarmpanel", text: "Fire alarm panel" },
            { anchor: "hotelalarm", text: "Detectors" },
            { anchor: "speakers", text: "Voice evacuation speakers" },
          ],
          image: "/capability/building/hotel-alarm.jpg",
        },
        {
          key: "bms",
          label: "BMS",
          eyebrow: "Prestige BKC 101, Mumbai",
          title: "BMS",
          text: "Air handling, fresh air and fan coil units on every floor, with VAV and VRF units in the hotel. 193 DDC controllers: 131 in the office tower and 62 in the hotel.",
          labels: [
            { anchor: "hotelddc", text: "DDC controller" },
            { anchor: "roomddc", text: "Fan coil unit controls" },
          ],
          stat: {
            value: "62",
            label: "DDC controllers in the hotel",
            note: "Of 193 across the office tower and hotel. Quantities are from the contract bills of quantities and are confirmed in the approved shop drawings.",
          },
          image: "/capability/building/hotel-bms.jpg",
        },
        {
          key: "civil",
          label: "Civil and fire stopping",
          eyebrow: "Prestige BKC 101, Mumbai",
          title: "Civil and fire stopping",
          text: "Specified fire stopping package for MEP penetrations through rated walls and slabs. Coordinate sleeves and openings with the general contractor and record completed seals.",
          labels: [
            { anchor: "hotelcollar", text: "Sealed slab penetrations" },
            { anchor: "hotelrisers", text: "Service risers" },
          ],
          image: "/capability/building/hotel-civil.jpg",
        },
        {
          key: "handover",
          label: "Testing and handover",
          eyebrow: "Prestige BKC 101, Mumbai",
          title: "Testing and handover",
          text: "Trade test packs, TAB, coordinated commissioning and office/hotel handover dossiers.",
          stat: {
            value: "182",
            label: "Hotel keys at Prestige BKC 101",
            note: "BMS and fire alarm with voice evacuation cover the hotel",
          },
          image: "/capability/building/hotel-handover.jpg",
        },
      ],
    },
    {
      // Projects open their own pages (src/app/projects/[slug]), where the
      // overview and the scope of work by service are told.
      kind: "experience",
      id: "experience",
      nav: "Experience",
      eyebrow: "Our experience",
      title: "Hotel and mixed use developments.",
      lede: "Prestige BKC 101 is an office tower and a 182 key hotel at BKC, Mumbai, under one direct MEP contract. INGKA Centre is a mixed use campus in Noida.",
      projects: ["prestige-bkc-101", "ikea-noida"],
      more: [
        {
          label: "More references in the National Capital Region",
          items: [REF_BHARTI, REF_VINTA, REF_VATIKA, REF_CAMELLIAS],
        },
      ],
      also: {
        label: "Clients in commercial and residential work",
        items: MIXED_USE_CLIENTS,
      },
    },
    whyBlock(),
  ],
};

const residential: CapPage = {
  slug: "residential",
  name: "Residential",
  eyebrow: EYEBROW,
  title: "Residential.",
  description:
    "MEPF, BMS and civil works for high end residential developments.",
  stats: [
    {
      value: "120+",
      label: "Commercial, hospitality and residential projects",
    },
    {
      value: "₹82 cr",
      label: "M3M Mansion, Sector 113",
      note: "Work order value, August 2026 order book",
    },
    {
      value: "5",
      label: "Residential references in the National Capital Region",
      note: "DLF The Camellias, M3M Mansion, M3M Golf Estate, M3M Merlin and Sky Mansion",
    },
    {
      value: "2 orders",
      label: "High side and low side at M3M Mansion",
      note: "VRV equipment supply ₹47 cr, installation works ₹35 cr",
    },
  ],
  blocks: [
    {
      // The scope of work at M3M Mansion (deck 06, slide 17), placed on a
      // model of two residential towers.
      kind: "building",
      model: "residential",
      subject: "two residential towers",
      id: "what-we-deliver",
      nav: "What we deliver",
      eyebrow: "What we deliver in residential towers",
      title: "MEPF, BMS and civil works for residential towers.",
      lede: "From the VRV system in every apartment, as at M3M Mansion, Sector 113, to the electrical, plumbing, fire, BMS and civil works of a residential tower.",
      image: "/capability/building/residential-intro.jpg",
      chapters: [
        {
          key: "highside",
          label: "High side",
          eyebrow: "M3M Mansion, Sector 113",
          title: "High side",
          text: "VRV equipment supply.",
          labels: [
            { anchor: "outdoor", text: "VRV outdoor units" },
            { anchor: "southunit", text: "Service ledge" },
            { anchor: "roofunits", text: "Roof units" },
          ],
          stat: {
            value: "₹47 cr",
            label: "High side order",
            note: "VRV equipment supply",
          },
          image: "/capability/building/residential-highside.jpg",
        },
        {
          key: "lowside",
          label: "Low side",
          eyebrow: "M3M Mansion, Sector 113",
          title: "Low side",
          text: "Installation works.",
          labels: [
            { anchor: "piping", text: "Refrigerant piping" },
            { anchor: "indoor", text: "Indoor units" },
            { anchor: "trunk", text: "Outdoor unit connection" },
          ],
          stat: {
            value: "₹35 cr",
            label: "Low side order",
            note: "Installation works",
          },
          image: "/capability/building/residential-lowside.jpg",
        },
        {
          key: "purification",
          label: "Air purification",
          eyebrow: "M3M Mansion, Sector 113",
          title: "Air purification",
          text: "Included in both orders.",
          labels: [
            { anchor: "purifier", text: "Air purification unit" },
            { anchor: "purifier2", text: "Supply duct" },
          ],
          image: "/capability/building/residential-purification.jpg",
        },
        {
          // Service lines: deck 06, slide 6 (the same slide is in every deck).
          key: "electrical",
          label: "Electrical",
          eyebrow: "Electrical",
          title: "Electrical",
          text: "HT and LT distribution, transformers and DG sets, rising mains, cabling and earthing, and lighting and small power for apartments and common areas.",
          labels: [
            { anchor: "substation", text: "Substation" },
            { anchor: "dg", text: "DG sets" },
            { anchor: "risingmain", text: "Rising mains" },
            { anchor: "boards", text: "Floor panels" },
          ],
          image: "/capability/building/residential-electrical.jpg",
        },
        {
          // Service lines: deck 06, slide 6 (the same slide is in every deck).
          key: "plumbing",
          label: "Plumbing",
          eyebrow: "Plumbing",
          title: "Plumbing and public health",
          text: "Water supply and drainage, water and sewage treatment, rainwater harvesting and reuse, and sanitary installations.",
          labels: [
            { anchor: "rooftank", text: "Roof tanks" },
            { anchor: "stacks", text: "Soil and waste stacks" },
            { anchor: "watertank", text: "Water tank and pumps" },
            { anchor: "stp", text: "Sewage treatment" },
          ],
          image: "/capability/building/residential-plumbing.jpg",
        },
        {
          // Service lines: deck 06, slide 6 (the same slide is in every deck).
          key: "fire",
          label: "Fire and life safety",
          eyebrow: "Fire",
          title: "Fire and life safety",
          text: "Hydrants and sprinklers, fire pumps and pump rooms, wet risers, fire alarm and public address, and fire stopping.",
          labels: [
            { anchor: "firetank", text: "Fire water tank and pumps" },
            { anchor: "hydrants", text: "Hydrant ring main" },
            { anchor: "wetriser", text: "Wet risers" },
            { anchor: "sprinklers", text: "Sprinklers" },
          ],
          image: "/capability/building/residential-fire.jpg",
        },
        {
          // Service lines: deck 06, slide 6 (the same slide is in every deck). Scope line: deck 06 reference tile.
          key: "bms",
          label: "BMS and ELV",
          eyebrow: "BMS and ELV",
          title: "BMS and ELV",
          text: "BMS and plant controls, energy metering and monitoring, CCTV and access control, and fire alarm and PA integration.",
          labels: [
            { anchor: "security", text: "Security and BMS room" },
            { anchor: "cctv", text: "CCTV" },
            { anchor: "elv", text: "ELV riser" },
            { anchor: "controller", text: "Apartment controllers" },
          ],
          proof: {
            project: "Sky Mansion, New Delhi",
            text: "HVAC, electrical, fire alarm and CCTV.",
          },
          image: "/capability/building/residential-bms.jpg",
        },
        {
          // Service lines: deck 06, slide 6 (the same slide is in every deck).
          key: "civil",
          label: "Civil works",
          eyebrow: "Civil",
          title: "Civil works",
          text: "Foundations and enabling works, civil infrastructure works, partitions and interiors.",
          labels: [
            { anchor: "slab", text: "Floor slabs" },
            { anchor: "cores", text: "Lift and stair cores" },
            { anchor: "plinths", text: "Equipment foundations" },
            { anchor: "trench", text: "Trenches and utility corridors" },
          ],
          image: "/capability/building/residential-civil.jpg",
        },
        {
          key: "testing",
          label: "Testing and commissioning",
          eyebrow: "M3M Mansion, Sector 113",
          title: "Testing and commissioning",
          text: "Testing and commissioning apartment by apartment before handover.",
          stat: {
            value: "₹82 cr",
            label: "M3M Mansion, Sector 113",
            note: "Work order value, August 2026 order book",
          },
          image: "/capability/building/residential-testing.jpg",
        },
      ],
    },
    {
      // Projects open their own pages (src/app/projects/[slug]), where the
      // overview and the scope of work by service are told.
      kind: "experience",
      id: "experience",
      nav: "Experience",
      eyebrow: "Our experience",
      title: "Residential towers.",
      lede: "VRV air conditioning and air purification for the residences at M3M Mansion, Sector 113, tested and commissioned apartment by apartment.",
      projects: ["m3m-mansion"],
      more: [
        {
          label: "Residential references in the National Capital Region",
          items: [REF_CAMELLIAS, REF_MANSION, REF_GOLF, REF_MERLIN, REF_SKY],
        },
      ],
      also: {
        label: "Clients in commercial and residential work",
        items: MIXED_USE_CLIENTS,
      },
    },
    whyBlock(),
  ],
};

/* ------------------------------------------------------------------
   02 Data Centre
   ------------------------------------------------------------------ */

const dataCentre: CapPage = {
  slug: "data-centre",
  name: "Data Centre",
  eyebrow: EYEBROW,
  title: "Data Centre.",
  description:
    "MEPF, civil works and building intelligence for data centres. Every system between the utility intake and the rack, from one contractor.",
  // Deck 02, slides 10, 11 and 34.
  stats: [
    {
      value: "14",
      label: "Data centre projects",
      note: "Nine operators and EPC partners, from government server rooms to rated 4 hyperscale colocation",
    },
    {
      value: "8",
      label: "Under execution",
      note: "CtrlS in Navi Mumbai and Hyderabad, Digital Edge, AdaniConneX and Anant Raj",
    },
    {
      value: "₹344+ cr",
      label: "Work orders on active projects",
      note: "Eight active projects across five featured locations",
    },
    {
      value: "3",
      label: "Repeat clients",
      note: "CtrlS with five active projects across two locations, Anant Raj with two orders on one campus, and Larsen and Toubro on STT Mumbai and AdaniConneX Hyderabad",
    },
  ],
  blocks: [
    {
      // Deck 02, slide 9: the eight scope cards, shown in place on a model
      // of a data centre. One figure or scope line per chapter comes from
      // the project slides noted beside it.
      kind: "building",
      model: "data-centre",
      id: "what-we-deliver",
      nav: "What we deliver",
      eyebrow: "What we deliver in a data centre",
      title: "Every system between the utility intake and the rack.",
      lede: "Engineered, installed and commissioned by one contractor.",
      image: "/capability/building/data-centre-intro.jpg",
      chapters: [
        {
          key: "cooling",
          label: "Cooling plant",
          eyebrow: "HVAC",
          title: "Cooling plant and hydronics",
          text: "Chillers and cooling towers, primary and secondary pumping, N+1 and 2N distribution, thermal energy storage, PICV balancing, sectional isolation and cross ties for concurrent maintainability.",
          labels: [
            { anchor: "chillers", text: "Chillers" },
            { anchor: "towers", text: "Cooling towers" },
            { anchor: "storage", text: "Thermal energy storage" },
            { anchor: "pumps", text: "Pump sets" },
            { anchor: "headers", text: "Chilled water headers" },
          ],
          // Deck 02, slide 19
          stat: {
            value: "13.5 km",
            label: "Chilled water piping at Digital Edge BOM131",
            note: "With 26 client supplied thermal storage tanks and 26 split case pumps",
          },
          image: "/capability/building/data-centre-cooling.jpg",
        },
        {
          key: "white",
          label: "White space",
          eyebrow: "HVAC",
          title: "Precision cooling and white space",
          text: "CRAH and PAC units, in row cooling, aisle containment, rear door heat exchangers, liquid cooling ready paths with CDU integration, zoned leak detection.",
          labels: [
            { anchor: "fanwall", text: "Fan wall units" },
            { anchor: "containment", text: "Aisle containment" },
            { anchor: "cdu", text: "CDUs for liquid cooling" },
            { anchor: "chw", text: "Chilled water ring" },
          ],
          // Deck 02, slide 22
          stat: {
            value: "60",
            label: "Fan wall units at AdaniConneX HYD 23",
            note: "With 22 free issue chillers and 72 precision AHUs",
          },
          image: "/capability/building/data-centre-white.jpg",
        },
        {
          key: "power",
          label: "Critical power",
          eyebrow: "Electrical",
          title: "Critical power",
          text: "33, 22 and 11 kV HT systems, transformers, LT switchgear, bus ducts, 2N A and B paths, UPS and battery rooms with hydrogen sensing, DG synchronisation, HSD fuel systems.",
          labels: [
            // The first three are the ones a phone shows.
            { anchor: "ups", text: "UPS and battery rooms" },
            { anchor: "generators", text: "DG sets" },
            { anchor: "substation", text: "HT substation" },
            { anchor: "transformers", text: "Transformers" },
            { anchor: "fuel", text: "HSD fuel" },
            { anchor: "busduct", text: "Bus ducts, A and B paths" },
          ],
          // Deck 02, slide 16
          stat: {
            value: "5 tiers",
            label: "Of wire mesh containment at CtrlS HYD 141",
            note: "LT feeders to 16 line ups, with rack whips and sockets",
          },
          image: "/capability/building/data-centre-power.jpg",
        },
        {
          // Service lines: deck 06, slide 6 (the same slide is in every deck). Scope line: CtrlS HYD 141.
          key: "plumbing",
          label: "Plumbing",
          eyebrow: "Plumbing",
          title: "Plumbing and drainage",
          text: "Water supply and make up water for the cooling plant, floor drainage for data halls and technical rooms, sanitary installations, water treatment and rainwater harvesting.",
          labels: [
            { anchor: "makeup", text: "Make up water tanks" },
            { anchor: "drains", text: "Floor drainage" },
            { anchor: "treatment", text: "Water treatment" },
            { anchor: "rainwater", text: "Rainwater harvesting" },
          ],
          proof: {
            project: "CtrlS HYD 141, Hyderabad",
            text: "Floor drainage for halls, panel and battery rooms. Toilet water supply and drainage, with traps, supports and insulation.",
          },
          image: "/capability/building/data-centre-plumbing.jpg",
        },
        {
          key: "fire",
          label: "Fire and life safety",
          eyebrow: "Fire",
          title: "Fire and life safety",
          text: "Very early smoke detection, double interlock pre action sprinklers, clean agent suppression, hydrants, high pressure water mist, foam, fire rated compartmentation.",
          labels: [
            { anchor: "sprinklers", text: "Pre action sprinklers" },
            { anchor: "tank", text: "Fire water tank and pumps" },
            { anchor: "cleanagent", text: "Clean agent" },
            { anchor: "hydrants", text: "Hydrant ring main" },
          ],
          // Deck 02, slide 22
          proof: {
            project: "AdaniConneX HYD 22 and 23",
            text: "Double interlock pre action sprinklers with nitrogen generation, internal and external hydrants with monitors, high pressure water mist on stainless steel tube, and electric, diesel, jockey and booster fire pumps.",
          },
          image: "/capability/building/data-centre-fire.jpg",
        },
        {
          key: "controls",
          label: "BMS and ELV",
          eyebrow: "BMS and ELV",
          title: "BMS, EPMS, DCIM and security",
          text: "PLC plant control, BMS supervision, electrical power monitoring and DCIM interfaces on open protocols. Access control, CCTV, water and liquid leak detection, public address, structured cabling and fire alarm integration.",
          labels: [
            { anchor: "sensors", text: "Environmental monitoring" },
            { anchor: "controlroom", text: "Control room" },
            { anchor: "cctv", text: "CCTV" },
            { anchor: "plantplc", text: "Plant PLC" },
            { anchor: "access", text: "Access control" },
          ],
          // Deck 02, slide 13
          proof: {
            project: "CtrlS DC6 and 7",
            text: "DDC controls and MaxCool PLC integration. VESDA, water leak detection, fire alarm, access control, PA and CCTV. EPMS communications and ELV networks.",
          },
          image: "/capability/building/data-centre-controls.jpg",
        },
        {
          key: "civil",
          label: "Civil interiors",
          eyebrow: "Civil",
          title: "Civil interiors",
          text: "Raised floors, partitions and false ceilings in data halls, equipment plinths and foundations, trenches, fire stopped penetrations.",
          labels: [
            { anchor: "raisedfloor", text: "Raised floors" },
            { anchor: "plinths", text: "Equipment plinths" },
            { anchor: "partitions", text: "Partitions" },
            { anchor: "trenches", text: "Cable trenches" },
          ],
          // Deck 02, slide 13
          stat: {
            value: "4 floors",
            label: "Fitted out inside a live data centre",
            note: "CtrlS DC6 and 7, floors 6 to 9",
          },
          image: "/capability/building/data-centre-civil.jpg",
        },
        {
          key: "commissioning",
          label: "Commissioning",
          eyebrow: "All services",
          title: "Testing and commissioning",
          text: "Factory and site acceptance, L1 to L5 commissioning, load bank testing, integrated systems testing of failure scenarios, operator witnessed records.",
          // Deck 02, slide 13
          stat: {
            value: "275",
            label: "Rack load banks of 19 kW at CtrlS DC6 and 7",
            note: "A 90 day commissioning team, witnessing L2 and L3 and leading L4 and L5",
          },
          image: "/capability/building/data-centre-commissioning.jpg",
        },
      ],
    },
    {
      // Projects open their own pages (src/app/projects/[slug]), where the
      // overview and the scope of work by service are told.
      kind: "experience",
      id: "experience",
      nav: "Experience",
      eyebrow: "Our experience",
      title: "Data centre projects.",
      lede: "Eight active projects across five locations and two completed references. Each opens its own page, with the project overview and the scope of work by service.",
      projects: [
        "ctrls-dc6-7",
        "ctrls-hyd-141",
        "digital-edge-bom131",
        "adaniconnex-hyd",
        "anant-raj",
        "stt-nmdc01",
        "stpi-mohali",
      ],
    },
    whyBlock(),
  ],
};

/* ------------------------------------------------------------------
   05 Cleanroom
   ------------------------------------------------------------------ */

const semiconductor: CapPage = {
  slug: "semiconductor-cleanroom",
  name: "Semiconductor & Cleanroom",
  eyebrow: EYEBROW,
  title: "Semiconductor & Cleanroom.",
  description:
    "Cleanroom HVAC, process utilities, controls and validation for semiconductor and electronics manufacturing.",
  stats: [
    {
      value: "₹817 cr",
      label: "Active semiconductor and industrial orders",
      note: "Foxconn, Tata Electronics and JSW",
    },
    {
      value: "14,000 sqm",
      label: "On each of two cleanroom floors",
      note: "ISO 7 and ISO 8 assembly cleanrooms for Foxconn in Bengaluru",
    },
    {
      value: "3 months",
      label: "To complete both floors",
      note: "With more than 1,500 people on site",
    },
    {
      value: "ISO 6",
      label: "The engineering step is fully worked out",
      note: "Class 10,000 and 100,000 executed",
    },
  ],
  blocks: [
    {
      // Deck 05, slide 9: the eight scope cards, shown in place on a model
      // of a cleanroom building. The figure or scope line in each chapter
      // comes from deck 05, slides 12 to 14.
      kind: "building",
      model: "fab",
      subject: "a cleanroom building",
      id: "what-we-deliver",
      nav: "What we deliver",
      eyebrow: "What we deliver in cleanrooms",
      title:
        "Controlled environments, engineered, installed and validated by one contractor.",
      lede: "For semiconductor, electronics and battery manufacturing.",
      image: "/capability/building/fab-intro.jpg",
      chapters: [
        {
          key: "hvac",
          label: "Cleanroom HVAC",
          eyebrow: "HVAC",
          title: "Cleanroom HVAC",
          text: "Make up air units, recirculation AHUs, fan filter units and HEPA terminal filtration, sized room by room to hold the ISO class, temperature and humidity.",
          labels: [
            { anchor: "mau", text: "Make up air units" },
            { anchor: "ffu", text: "Fan filter units" },
            { anchor: "recirc", text: "Recirculation AHUs" },
          ],
          stat: {
            value: "14,000 sqm",
            label: "On each of two cleanroom floors for Foxconn in Bengaluru",
            note: "ISO 7 and ISO 8, completed in three months",
          },
          image: "/capability/building/fab-hvac.jpg",
        },
        {
          key: "pressure",
          label: "Pressure and airflow",
          eyebrow: "HVAC",
          title: "Pressure and airflow",
          text: "Pressure differentials between zones, airlocks and anterooms, unidirectional or turbulent airflow set per room, and low level returns.",
          labels: [
            { anchor: "airlock", text: "Airlocks and anterooms" },
            { anchor: "returns", text: "Low level returns" },
            { anchor: "ffu", text: "Fan filter units" },
          ],
          stat: {
            value: "15 Pa",
            label: "At least, between zones",
            note: "Temperature and humidity held typically within 1°C and 5% RH",
          },
          image: "/capability/building/fab-pressure.jpg",
        },
        {
          key: "envelope",
          label: "Envelope",
          eyebrow: "Cleanroom envelope",
          title: "Envelope and finishes",
          text: "Wall and ceiling panelling, cleanroom doors and view panels, epoxy flooring and sealed penetrations through every boundary.",
          labels: [
            { anchor: "panels", text: "Wall panelling" },
            { anchor: "floor", text: "Cleanroom flooring" },
            { anchor: "airlock", text: "Gowning rooms" },
          ],
          proof: {
            project: "Foxconn, Bengaluru",
            text: "Wall and ceiling panelling, epoxy flooring, HEPA filtered AHUs, return air risers, cleanroom doors and view panels.",
          },
          image: "/capability/building/fab-envelope.jpg",
        },
        {
          key: "process",
          label: "Process utilities",
          eyebrow: "Process piping",
          title: "Process utilities",
          text: "Compressed dry air, nitrogen and vacuum networks with point of use drops, routed with slope control and leak tested.",
          labels: [
            { anchor: "gas", text: "Bulk nitrogen" },
            { anchor: "compressors", text: "Dry air compressors and dryers" },
            { anchor: "trestle", text: "Pipe trestle" },
            { anchor: "pou", text: "Point of use panels" },
          ],
          proof: {
            project: "Foxconn, Bengaluru",
            text: "Compressed dry air, nitrogen and vacuum networks with complete precision MEPF, routed with strict slope control and leak tested.",
          },
          image: "/capability/building/fab-process.jpg",
        },
        {
          key: "pcw",
          label: "Process cooling water",
          eyebrow: "Process piping",
          title: "Process cooling water",
          text: "Closed loop headers and branch distribution in SS 316 and PP H, hydro and pneumatic tested, with OEM validated hook ups.",
          labels: [
            { anchor: "pcwskid", text: "Pumps and heat exchangers" },
            { anchor: "pcwheader", text: "Closed loop headers" },
          ],
          proof: {
            project: "Foxconn, Bengaluru",
            text: "Closed loop process water headers, primary and secondary interfaces, SS 316 and PP H piping, hydro and pneumatic testing.",
          },
          image: "/capability/building/fab-pcw.jpg",
        },
        {
          key: "power",
          label: "Electrical",
          eyebrow: "Electrical",
          title: "Electrical and lighting",
          text: "Clean power distribution, cleanroom lighting, containment and earthing installed to avoid vibration and particle shedding.",
          labels: [
            { anchor: "substation", text: "Substation" },
            { anchor: "transformers", text: "Transformers" },
            { anchor: "lt", text: "LT panels" },
            { anchor: "busduct", text: "Bus duct over the tools" },
          ],
          proof: {
            project: "Foxconn, Bengaluru",
            text: "Electrical distribution and equipment connections across the awarded work orders. Power, cabling and energisation interfaces for manufacturing and support areas.",
          },
          image: "/capability/building/fab-power.jpg",
        },
        {
          // Service lines: deck 06, slide 6 (the same slide is in every deck).
          key: "plumbing",
          label: "Plumbing",
          eyebrow: "Plumbing",
          title: "Plumbing and public health",
          text: "Water supply and drainage, water and sewage treatment, rainwater harvesting and reuse, and sanitary installations for gowning and support areas.",
          labels: [
            { anchor: "treatment", text: "Water treatment" },
            { anchor: "wetrooms", text: "Sanitary installations" },
            { anchor: "drains", text: "Sub fab drainage" },
            { anchor: "rainwater", text: "Rainwater harvesting" },
          ],
          image: "/capability/building/fab-plumbing.jpg",
        },
        {
          // Service lines: deck 06, slide 6 (the same slide is in every deck). Scope line: Foxconn.
          key: "fire",
          label: "Fire and life safety",
          eyebrow: "Fire",
          title: "Fire and life safety",
          text: "Hydrants and sprinklers, fire pumps and pump rooms, clean agent suppression, fire alarm and public address, and fire stopping of service penetrations.",
          labels: [
            { anchor: "firetank", text: "Fire water tank and pumps" },
            { anchor: "hydrants", text: "Hydrant ring main" },
            { anchor: "sprinklers", text: "Sprinklers" },
            { anchor: "agent", text: "Clean agent cylinders" },
          ],
          proof: {
            project: "Foxconn, Bengaluru",
            text: "Firefighting networks, equipment and building interfaces within the campus MEPF work orders.",
          },
          image: "/capability/building/fab-fire.jpg",
        },
        {
          key: "controls",
          label: "Controls",
          eyebrow: "BMS and controls",
          title: "Controls and monitoring",
          text: "PLC and BMS control of MAUs, AHUs and FFUs, with continuous pressure, temperature, humidity and particle monitoring.",
          labels: [
            { anchor: "counters", text: "Particle and room sensors" },
            { anchor: "control", text: "Control room" },
            { anchor: "airlock", text: "Pressure monitoring" },
          ],
          proof: {
            project: "Foxconn, Bengaluru",
            text: "PLC panels, HMI and automatic controls. Temperature, humidity and differential pressure monitoring, leak detection and particle counters.",
          },
          image: "/capability/building/fab-controls.jpg",
        },
        {
          // Service lines: deck 06, slide 6 (the same slide is in every deck). Scope line: Foxconn.
          key: "civil",
          label: "Civil works",
          eyebrow: "Civil",
          title: "Civil and enabling works",
          text: "Foundations and enabling works, raised floors and precision grouting, trenches and utility corridors, partitions and interiors.",
          labels: [
            { anchor: "plinths", text: "Equipment foundations" },
            { anchor: "floor", text: "Raised floor" },
            { anchor: "trench", text: "Trenches and utility corridors" },
            { anchor: "trestle", text: "Trestle foundations" },
          ],
          proof: {
            project: "Foxconn, Bengaluru",
            text: "Civil works within the campus packages. Cleanroom envelope interfaces, service openings, equipment access and local making good within the assigned packages.",
          },
          image: "/capability/building/fab-civil.jpg",
        },
        {
          key: "validation",
          label: "Validation",
          eyebrow: "All services",
          title: "Validation and handover",
          text: "IQ, OQ and PQ to ISO 14644 Part 3, balancing to AABC or NEBB procedures, and a complete validation dossier at handover.",
          stat: {
            value: "3 months",
            label: "To complete both Foxconn cleanroom floors",
            note: "With more than 1,500 people on site",
          },
          image: "/capability/building/fab-validation.jpg",
        },
      ],
    },
    {
      // Projects open their own pages (src/app/projects/[slug]), where the
      // overview and the scope of work by service are told.
      kind: "experience",
      id: "experience",
      nav: "Experience",
      eyebrow: "Our experience",
      title: "Foxconn and Tata Electronics.",
      lede: "Cleanrooms, process utilities, precision piping and controls delivered on fast programmes.",
      projects: ["foxconn", "tata-dholera", "tata-jagiroad"],
    },
    whyBlock(),
  ],
};

/* ------------------------------------------------------------------
   04 Industrial
   ------------------------------------------------------------------ */

const industrial: CapPage = {
  slug: "industrial-manufacturing",
  name: "Industrial & Manufacturing",
  eyebrow: EYEBROW,
  title: "Industrial & Manufacturing.",
  description:
    "MEPF, civil works, process utilities and building intelligence for industrial facilities.",
  stats: [
    {
      value: "₹817 cr",
      label: "Active industrial work orders",
      note: "Foxconn, Tata Electronics and JSW",
    },
    {
      value: "₹611 cr",
      label: "Foxconn, Devanahalli, Bengaluru",
      note: "August 2026 order book",
    },
    {
      value: "₹103 cr",
      label: "Tata Electronics, Dholera and Jagiroad",
      note: "Active",
    },
    {
      value: "₹103 cr",
      label: "JSW Motors, Chhatrapati Sambhajinagar",
      note: "August 2026 order book",
    },
  ],
  blocks: [
    {
      // Deck 04, slide 9: the eight scope cards, shown in place on a model
      // of a manufacturing plant. The scope line in each chapter comes from
      // the project slides of deck 04 (Foxconn, Tata Electronics, JSW).
      kind: "building",
      model: "factory",
      subject: "a manufacturing plant",
      id: "what-we-deliver",
      nav: "What we deliver",
      eyebrow: "What we deliver in industrial facilities",
      title: "Integrated building services and process utilities.",
      lede: "For manufacturing, semiconductor and industrial facilities, delivered within each awarded package.",
      image: "/capability/building/factory-intro.jpg",
      chapters: [
        {
          key: "hvac",
          label: "Industrial HVAC",
          eyebrow: "HVAC",
          title: "Industrial HVAC",
          text: "Cooling plants, pumps, AHUs, ventilation, exhaust, ducts and hydronic distribution. Temperature and humidity control for manufacturing and support areas.",
          labels: [
            { anchor: "rooftop", text: "Air handling units" },
            { anchor: "chillers", text: "Cooling plant" },
            { anchor: "ducts", text: "Supply ducts" },
            { anchor: "towers", text: "Cooling towers" },
          ],
          proof: {
            project: "Foxconn, Bengaluru",
            text: "HVAC, air handling and ventilation for manufacturing and support buildings. Cleanroom mechanical services and coordinated equipment connections within the awarded campus packages.",
          },
          image: "/capability/building/factory-hvac.jpg",
        },
        {
          key: "cleanroom",
          label: "Cleanrooms",
          eyebrow: "HVAC",
          title: "Cleanrooms",
          text: "Cleanroom HVAC, filtration, air distribution and pressure control. Environmental monitoring and coordinated envelope, service and utility interfaces to suit the specified classification.",
          labels: [
            { anchor: "ffu", text: "Filter units" },
            { anchor: "cleanroom", text: "Cleanroom envelope" },
            { anchor: "crahu", text: "Cleanroom AHU" },
          ],
          stat: {
            value: "14,000 sqm",
            label: "On each of two cleanroom floors for Foxconn in Bengaluru",
            note: "ISO 7 and ISO 8, completed in three months",
          },
          image: "/capability/building/factory-cleanroom.jpg",
        },
        {
          key: "power",
          label: "Electrical",
          eyebrow: "Electrical",
          title: "Electrical and busduct",
          text: "HT and LT distribution, transformers, switchgear, busduct, cables, lighting and earthing. Equipment connections, utility feeds and coordinated power routes.",
          labels: [
            { anchor: "busduct", text: "Bus duct over the lines" },
            { anchor: "transformers", text: "Transformers" },
            { anchor: "substation", text: "Substation" },
            { anchor: "lt", text: "LT panels" },
            { anchor: "dg", text: "DG sets" },
          ],
          proof: {
            project: "JSW Motors, Chhatrapati Sambhajinagar",
            text: "Transformers, HT/LT panels, scheduled cables and terminations, cable trays, earthing and equipment connections within the electrical package.",
          },
          image: "/capability/building/factory-power.jpg",
        },
        {
          key: "fire",
          label: "Fire and life safety",
          eyebrow: "Fire",
          title: "Fire and life safety",
          text: "Fire water pumps, hydrants, sprinklers, suppression and fire alarm interfaces. Underground ring mains, building networks and protection of service penetrations.",
          labels: [
            { anchor: "sprinklers", text: "Sprinklers" },
            { anchor: "tank", text: "Fire water tank and pumps" },
            { anchor: "hydrants", text: "Ring main and hydrants" },
          ],
          proof: {
            project: "JSW Motors, Chhatrapati Sambhajinagar",
            text: "Fire pumps, hydrants, sprinklers, extinguishers and gas suppression. Fire stopping, signage and the associated fire package charges.",
          },
          image: "/capability/building/factory-fire.jpg",
        },
        {
          key: "process",
          label: "Process piping",
          eyebrow: "Process piping",
          title: "Process and precision piping",
          text: "Precision utility piping, compressed dry air, nitrogen, vacuum and water services. Equipment tie ins, valves and supports with material and joining requirements matched to each process.",
          labels: [
            { anchor: "trestle", text: "Pipe trestle" },
            { anchor: "compressors", text: "Compressors and receivers" },
            { anchor: "rack", text: "Utility headers" },
            { anchor: "drops", text: "Equipment tie ins" },
          ],
          proof: {
            project: "Tata Electronics, Dholera",
            text: "Domestic, industrial and reclaim water networks, drainage and effluent lines. Precision/process utilities include CDA, instrument air, breathing air and warm water piping.",
          },
          image: "/capability/building/factory-process.jpg",
        },
        {
          key: "controls",
          label: "ELV and BMS",
          eyebrow: "BMS and ELV",
          title: "ELV and BMS",
          text: "PLC and DDC controls, plant and environmental monitoring, field instruments, alarms and trends. Fire alarm, PA, security and other ELV systems within the package.",
          labels: [
            { anchor: "sensors", text: "Field instruments" },
            { anchor: "plc", text: "PLC panels" },
            { anchor: "control", text: "Control room" },
            { anchor: "cctv", text: "Security" },
          ],
          proof: {
            project: "Foxconn, Bengaluru",
            text: "PLC panels, HMI and automatic controls. Temperature, humidity and differential pressure monitoring, leak detection and particle counters. Field instrumentation, wiring and networks.",
          },
          image: "/capability/building/factory-controls.jpg",
        },
        {
          key: "water",
          label: "PHE and utilities",
          eyebrow: "Plumbing",
          title: "PHE and underground utilities",
          text: "Water supply, drainage, sewerage, effluent and utility pipelines. Underground and trestle distribution with valves, chambers and coordinated connections.",
          labels: [
            { anchor: "mains", text: "Underground networks" },
            { anchor: "treatment", text: "Treatment plant" },
            { anchor: "tanks", text: "Water tanks" },
          ],
          proof: {
            project: "JSW Motors, Chhatrapati Sambhajinagar",
            text: "Internal and external metallic/non metallic utility and process lines. Water networks, pumps, valves and associated pipe supports/steel.",
          },
          image: "/capability/building/factory-water.jpg",
        },
        {
          key: "civil",
          label: "Civil works",
          eyebrow: "Civil",
          title: "Civil and enabling works",
          text: "Equipment bases, utility corridors, duct banks, chambers and support foundations where awarded. Openings, fire stopping, access and local reinstatement coordinated with the services.",
          labels: [
            { anchor: "bases", text: "Equipment bases" },
            { anchor: "ductbank", text: "Duct banks" },
            { anchor: "trestlefound", text: "Support foundations" },
          ],
          proof: {
            project: "Tata Electronics, Dholera",
            text: "Excavation, bedding, thrust blocks and duct bank concrete/chambers within TPL packages.",
          },
          image: "/capability/building/factory-civil.jpg",
        },
      ],
    },
    {
      // Projects open their own pages (src/app/projects/[slug]), where the
      // overview and the scope of work by service are told.
      kind: "experience",
      id: "experience",
      nav: "Experience",
      eyebrow: "Our experience",
      title: "Semiconductor, electronics and automotive plants.",
      lede: "Delivered on fast programmes, with process utilities and controls, for Foxconn, Tata Electronics and JSW.",
      projects: ["foxconn", "tata-dholera", "tata-jagiroad", "jsw-motors"],
      more: [{ label: "Also delivered for", items: [] }],
      also: {
        label: "Industrial clients",
        items: [
          "Hindustan Coca Cola Beverages, Ahmedabad",
          "Britannia Industries",
          "Barco",
          "NIAB Hyderabad",
          "Aksh Optifibre",
          "Luxottica (Bausch & Lomb)",
          "Oriflame",
          "Belco Pharma",
          "ITC",
          "JCT Electronics, Mohali",
          "NTPC",
          "BHEL",
          "Rolls Royce Power Engineering",
        ],
      },
    },
    whyBlock(),
  ],
};

/* ------------------------------------------------------------------
   07 Public and Institutional: airport, education, healthcare
   ------------------------------------------------------------------ */

// Deck 07, slide 9: the eight scope cards of the public and institutional
// deck, shown in place on a model of the building type. Each page supplies
// the model, the callouts and one figure or scope line per chapter.
type Extra = Pick<CapChapter, "labels" | "stat" | "proof">;
const PUBLIC_CHAPTERS: Omit<
  CapChapter,
  "labels" | "stat" | "proof" | "image"
>[] = [
  {
    key: "hvac",
    label: "Central HVAC",
    eyebrow: "HVAC",
    title: "Central HVAC plants",
    text: "High efficiency chiller plants, thermal storage and air distribution sized for large campuses and office complexes.",
  },
  {
    key: "lowenergy",
    label: "Low energy systems",
    eyebrow: "HVAC",
    title: "Low energy systems",
    text: "Thermal energy storage, geothermal water cooled VRV, brine chillers and evaporative cooling, as delivered at Nalanda University.",
  },
  {
    key: "fire",
    label: "Fire protection",
    eyebrow: "Fire",
    title: "Fire protection",
    text: "Hydrants, sprinklers, gas suppression and detection to the National Building Code for offices, terminals and campuses.",
  },
  {
    key: "power",
    label: "Electrical",
    eyebrow: "Electrical",
    title: "Electrical",
    text: "HT and LT distribution, substations, DG sets and lighting for terminals, offices and academic blocks.",
  },
  {
    key: "water",
    label: "Plumbing and water",
    eyebrow: "Plumbing",
    title: "Plumbing and water",
    text: "Water supply, drainage, water treatment, sewage treatment and rainwater harvesting across campuses.",
  },
  {
    key: "controls",
    label: "IBMS and security",
    eyebrow: "BMS and ELV",
    title: "IBMS and security",
    text: "Integrated building management, fire alarm, public address, CCTV and access control for high security buildings.",
  },
  {
    // Service lines: deck 07, slide 6.
    key: "civil",
    label: "Civil works",
    eyebrow: "Civil",
    title: "Civil and structural works",
    text: "Foundations and enabling works, civil infrastructure works, partitions and interiors, trenches and utility corridors.",
  },
  {
    key: "green",
    label: "Green buildings",
    eyebrow: "All services",
    title: "Green buildings",
    text: "Systems for IGBC rated buildings such as the IGBC Gold Common Central Secretariat, with efficient equipment, balancing and zoning.",
  },
  {
    key: "om",
    label: "Operation",
    eyebrow: "Operation and maintenance",
    title: "Operation and maintenance",
    text: "Preventive and predictive maintenance and rapid response teams, including continuous HVAC operation for NCR hospitals in the pandemic.",
  },
];

// Scope lines: deck 07, slides 14 to 21 (Nalanda, BITSoM) and slide 24 (Amity).
const EDU_EXTRA: Record<string, Extra> = {
  hvac: {
    labels: [
      { anchor: "chillers", text: "Central chiller plant" },
      { anchor: "loop", text: "Campus cooling loop" },
      { anchor: "ahus", text: "Air handling units" },
      { anchor: "towers", text: "Cooling towers" },
    ],
    proof: {
      project: "Nalanda University",
      text: "Campus HVAC and cooling plant, thermal storage systems and geothermal mechanical interfaces. Installed plant and campus distribution within the completed reference.",
    },
  },
  lowenergy: {
    labels: [
      { anchor: "storage", text: "Thermal energy storage" },
      { anchor: "geo", text: "Geothermal field" },
    ],
    proof: {
      project: "BITSoM campus, Kalyan",
      text: "Brine and screw chillers, thermal storage, pumps and heat exchangers monitored on one system.",
    },
  },
  fire: {
    labels: [
      { anchor: "tank", text: "Fire water tank and pumps" },
      { anchor: "hydrants", text: "Hydrant ring main" },
    ],
  },
  power: {
    labels: [
      { anchor: "substation", text: "Substation" },
      { anchor: "ring", text: "HT ring to every block" },
      { anchor: "dg", text: "DG sets" },
      { anchor: "transformers", text: "Transformers" },
    ],
  },
  water: {
    labels: [
      { anchor: "hotwater", text: "Hot water tanks" },
      { anchor: "treatment", text: "Water and sewage treatment" },
      { anchor: "pond", text: "Rainwater harvesting" },
    ],
    proof: {
      project: "BITSoM campus, Kalyan",
      text: "Air source heat pumps with SS 316L mixing tanks of 5,000 litres each, sized at 45 litres per person per day.",
    },
  },
  controls: {
    labels: [
      { anchor: "control", text: "Campus control room" },
      { anchor: "fibre", text: "BMS network" },
      { anchor: "outstation", text: "Block outstations" },
      { anchor: "cctv", text: "CCTV" },
    ],
    stat: {
      value: "21",
      label: "Blocks on one BMS at the BITSoM campus",
      note: "Academic blocks, hostels, housing, dining, sports and utilities",
    },
  },
  civil: {
    labels: [
      { anchor: "slab", text: "Floor slabs" },
      { anchor: "plinths", text: "Equipment foundations" },
      { anchor: "trench", text: "Trenches and utility corridors" },
    ],
  },
  green: {
    labels: [
      { anchor: "solar", text: "Roof solar" },
      { anchor: "heatpumps", text: "Heat pump hot water" },
    ],
    proof: {
      project: "Nalanda University",
      text: "HVAC, intelligent building management, thermal storage and geothermal systems, with continuing operating experience reflected in the site records.",
    },
  },
  om: {
    stat: {
      value: "8",
      label: "Amity campuses and schools",
      note: "FY17 to date, with lifecycle O&M",
    },
  },
};
// Scope lines: deck 07, slides 5, 9 and 24; deck 09, slide 11.
const HEALTH_EXTRA: Record<string, Extra> = {
  hvac: {
    labels: [
      { anchor: "chillers", text: "Central chiller plant" },
      { anchor: "otahu", text: "Theatre air handling units" },
      { anchor: "fcu", text: "Ward fan coil units" },
      { anchor: "laminar", text: "Theatre air supply" },
    ],
    stat: {
      value: "8",
      label: "AIIMS projects",
      note: "Through ACIL, L&T and HSCC, from 2012 to date",
    },
  },
  lowenergy: {
    labels: [{ anchor: "storage", text: "Thermal energy storage" }],
    proof: {
      project: "Nalanda University",
      text: "Campus HVAC and cooling plant, thermal storage systems and geothermal mechanical interfaces.",
    },
  },
  fire: {
    labels: [
      { anchor: "sprinklers", text: "Sprinklers" },
      { anchor: "tank", text: "Fire water tank and pumps" },
      { anchor: "hydrants", text: "Hydrant ring main" },
      { anchor: "gas", text: "Gas suppression" },
    ],
  },
  power: {
    labels: [
      { anchor: "substation", text: "Substation" },
      { anchor: "dg", text: "DG sets" },
      { anchor: "lt", text: "LT panels" },
      { anchor: "transformers", text: "Transformers" },
    ],
    proof: {
      project: "PMSSY and AIIMS healthcare campuses",
      text: "From 2010 to 2020 the service offering widened to complete MEPF packages: PMSSY and AIIMS healthcare campuses and cancer institutes.",
    },
  },
  water: {
    labels: [
      { anchor: "stacks", text: "Ward water and drainage" },
      { anchor: "treatment", text: "Water and sewage treatment" },
      { anchor: "rain", text: "Rainwater harvesting" },
      { anchor: "rooftanks", text: "Roof tanks" },
    ],
  },
  controls: {
    labels: [
      { anchor: "ot", text: "Theatre monitoring" },
      { anchor: "icu", text: "Intensive care" },
    ],
    proof: {
      project: "AIIMS Jammu and Burari Hospital",
      text: "IBMS delivered with the HVAC package at AIIMS Jammu, and BMS at Burari Hospital, New Delhi.",
    },
  },
  civil: {
    labels: [
      { anchor: "slab", text: "Floor slabs" },
      { anchor: "plinths", text: "Equipment foundations" },
      { anchor: "trench", text: "Trenches and utility corridors" },
      { anchor: "partitions", text: "Partitions and interiors" },
    ],
  },
  green: {
    labels: [
      { anchor: "solar", text: "Roof solar" },
      { anchor: "canopy", text: "Solar canopies" },
    ],
    stat: {
      value: "IGBC Gold",
      label: "Common Central Secretariat",
      note: "Efficient equipment, balancing and zoning",
    },
  },
  om: {
    stat: {
      value: "Since 2012",
      label: "On the PMSSY healthcare network",
      note: "Jammu, Rewari and others",
    },
  },
};

const publicBuilding = (o: {
  model: "terminal" | "campus" | "hospital";
  subject: string;
  extra: Record<string, Extra>;
}): CapBlock => ({
  kind: "building",
  model: o.model,
  subject: o.subject,
  id: "what-we-deliver",
  nav: "What we deliver",
  eyebrow: "What we deliver in public and institutional buildings",
  title:
    "Delivered under public procurement rules and site security protocols.",
  lede: "Government offices, airports, universities and healthcare buildings.",
  image: `/capability/building/${o.model}-intro.jpg`,
  chapters: PUBLIC_CHAPTERS.map((c) => ({
    ...c,
    ...o.extra[c.key],
    image: `/capability/building/${o.model}-${c.key}.jpg`,
  })),
});

const airport: CapPage = {
  slug: "airport-public-venues",
  name: "Airport & Public Venues",
  eyebrow: EYEBROW,
  title: "Airport & Public Venues.",
  description:
    "MEPF, IBMS and civil works for airports, government buildings and public venues, delivered under public procurement rules and site security protocols.",
  stats: [
    { value: "120+", label: "Airport, education and healthcare projects" },
    {
      value: "₹298 cr",
      label: "Common Central Secretariat and Executive Enclave",
      note: "Work order value, August 2026 order book",
    },
    {
      value: "₹130 cr",
      label: "Mopa International Airport, Goa",
      note: "Billed project register value",
    },
    {
      value: "IGBC Gold",
      label: "Common Central Secretariat",
      note: "Efficient equipment, balancing and zoning",
    },
  ],
  blocks: [
    publicBuilding({
      model: "terminal",
      subject: "an airport terminal",
      // Scope lines: deck 07, slides 12 to 17 (Mopa, Central Secretariat, Nalanda).
      extra: {
        hvac: {
          labels: [
            { anchor: "chillers", text: "Central chiller plant" },
            { anchor: "ducts", text: "Supply ducts" },
            { anchor: "airtowers", text: "Air towers" },
            { anchor: "ahus", text: "Air handling units" },
          ],
          proof: {
            project: "Mopa International Airport, Goa",
            text: "HVAC and central chiller plant work in the completed airport reference. Mechanical services coordinated with terminal systems and operational handover.",
          },
        },
        lowenergy: {
          labels: [
            { anchor: "storage", text: "Thermal energy storage" },
            { anchor: "chillers", text: "Chiller plant" },
          ],
          proof: {
            project: "Nalanda University",
            text: "Campus HVAC and cooling plant, thermal storage systems and geothermal mechanical interfaces.",
          },
        },
        fire: {
          labels: [
            { anchor: "sprinklers", text: "Sprinklers" },
            { anchor: "tank", text: "Fire water tank and pumps" },
            { anchor: "hydrants", text: "Hydrant ring main" },
            { anchor: "gas", text: "Gas suppression" },
          ],
          proof: {
            project: "Mopa International Airport, Goa",
            text: "Fire protection systems within the airport MEPF package and associated building interfaces.",
          },
        },
        power: {
          labels: [
            { anchor: "substation", text: "Substation" },
            { anchor: "dg", text: "DG sets" },
            { anchor: "lt", text: "LT panels" },
            { anchor: "transformers", text: "Transformers" },
          ],
          proof: {
            project: "Mopa International Airport, Goa",
            text: "Electrical works within the completed airport MEPF package, with equipment and building system connections.",
          },
        },
        water: {
          labels: [
            { anchor: "treatment", text: "Water treatment" },
            { anchor: "rain", text: "Rainwater harvesting" },
            { anchor: "cores", text: "Toilet cores" },
            { anchor: "tanks", text: "Water tanks" },
          ],
          proof: {
            project: "Mopa International Airport, Goa",
            text: "Plumbing, water and drainage services within the completed MEPF package.",
          },
        },
        controls: {
          labels: [
            { anchor: "control", text: "Operations control centre" },
            { anchor: "security", text: "Access control" },
            { anchor: "pa", text: "Public address and CCTV" },
          ],
          proof: {
            project: "Mopa International Airport, Goa",
            text: "Interfaces: HVAC and electrical monitoring connections, with agreed fire and plant shutdown interfaces to the receiving systems.",
          },
        },
        civil: {
          labels: [
            { anchor: "slab", text: "Floor slabs" },
            { anchor: "plinths", text: "Equipment foundations" },
            { anchor: "trench", text: "Trenches and utility corridors" },
          ],
        },
        green: {
          labels: [
            { anchor: "solar", text: "Solar canopies" },
            { anchor: "roofsolar", text: "Roof solar" },
          ],
          stat: {
            value: "IGBC Gold",
            label: "Common Central Secretariat",
            note: "Efficient equipment, balancing and zoning",
          },
        },
        om: {
          stat: {
            value: "₹130 cr",
            label: "Mopa International Airport, Goa",
            note: "Billed project register value",
          },
        },
      },
    }),
    {
      // Projects open their own pages (src/app/projects/[slug]), where the
      // overview and the scope of work by service are told.
      kind: "experience",
      id: "experience",
      nav: "Experience",
      eyebrow: "Our experience",
      title: "Government offices and airports.",
      lede: "Active values are work order values including GST from the order book of August 2026; completed values are billed values.",
      projects: ["mopa-airport", "central-secretariat"],
      more: [
        {
          label: "More references",
          items: [
            {
              name: "Chennai Airport T3, Phase II",
              slug: "chennai-airport-t3-phase-2",
            },
            {
              name: "ATC Tower, Kolkata",
              slug: "atc-tower-kolkata",
              scope: "IBMS with the MEP package",
            },
            {
              name: "High Speed Rail, Ahmedabad",
              slug: "high-speed-rail-ahmedabad",
            },
            {
              name: "CBI Headquarters, New Delhi",
              slug: "cbi-headquarters-new-delhi",
            },
          ],
        },
      ],
      also: {
        label: "Also delivered for",
        items: [
          "UIDAI Headquarters, New Delhi",
          "NISM, Mumbai",
          "Commonwealth Games venues, Delhi",
          "Airports Authority of India",
          "Larsen and Toubro",
          "NHSRCL",
        ],
      },
    },
    whyBlock(),
  ],
};

const education: CapPage = {
  slug: "education-research",
  name: "Education & Research",
  eyebrow: EYEBROW,
  title: "Education & Research.",
  description:
    "MEPF, IBMS and low energy systems for universities and campuses.",
  stats: [
    { value: "120+", label: "Airport, education and healthcare projects" },
    {
      value: "₹60 cr",
      label: "Nalanda University, Rajgir",
      note: "Billed project register value",
    },
    {
      value: "21",
      label: "Blocks on one BMS at the BITSoM campus",
      note: "Academic blocks, hostels, housing, dining, sports and utilities",
    },
    {
      value: "8",
      label: "Amity campuses and schools",
      note: "FY17 to date, with lifecycle O&M",
    },
  ],
  blocks: [
    publicBuilding({
      model: "campus",
      subject: "a university campus",
      extra: EDU_EXTRA,
    }),
    {
      // Projects open their own pages (src/app/projects/[slug]), where the
      // overview and the scope of work by service are told.
      kind: "experience",
      id: "experience",
      nav: "Experience",
      eyebrow: "Our experience",
      title: "University campuses.",
      lede: "A net zero campus at Rajgir, and integrated building management and heat pump hot water for the BITSoM campus at Kalyan.",
      projects: ["nalanda-university", "bitsom-campus"],
      more: [
        {
          label: "More references",
          items: [
            { name: "Amity University, Mohali", slug: "amity-mohali" },
            {
              name: "Amity University, Kolkata",
              slug: "amity-kolkata-operations-maintenance",
            },
            {
              name: "Amity University, Ranchi",
              slug: "amity-ranchi-operations-maintenance",
            },
            { name: "IIT Palakkad", slug: "iit-palakkad" },
            { name: "Bose Institute, Kolkata", slug: "bose-institute-kolkata" },
          ],
        },
      ],
      also: {
        label: "Clients in education",
        items: [
          "Nalanda University",
          "Amity University",
          "BITS",
          "IIT Palakkad",
        ],
      },
    },
    whyBlock(),
  ],
};

const healthcare: CapPage = {
  slug: "healthcare",
  name: "Healthcare",
  eyebrow: EYEBROW,
  title: "Healthcare.",
  description:
    "MEPF, IBMS and operation and maintenance for hospitals and healthcare campuses.",
  stats: [
    { value: "120+", label: "Airport, education and healthcare projects" },
    {
      value: "8",
      label: "AIIMS projects",
      note: "Through ACIL, L&T and HSCC",
    },
    {
      value: "Since 2012",
      label: "On the PMSSY healthcare network",
      note: "Jammu, Rewari and others",
    },
  ],
  blocks: [
    publicBuilding({
      model: "hospital",
      subject: "a hospital",
      extra: HEALTH_EXTRA,
    }),
    {
      // Projects open their own pages (src/app/projects/[slug]), where the
      // overview and the scope of work by service are told.
      kind: "experience",
      id: "experience",
      nav: "Experience",
      eyebrow: "Our experience",
      title: "AIIMS and the PMSSY healthcare network.",
      items: [
        {
          title: "AIIMS",
          text: "Eight projects through ACIL, L&T and HSCC, from 2012 to date. PMSSY healthcare network: Jammu, Rewari and others.",
        },
        {
          title: "Complete MEPF packages",
          text: "From 2010 to 2020 the service offering widened to complete MEPF packages: PMSSY and AIIMS healthcare campuses and cancer institutes.",
        },
        {
          title: "IBMS with the HVAC package",
          text: "IBMS delivered with the HVAC package at AIIMS Jammu, and BMS at Burari Hospital, New Delhi.",
        },
        {
          title: "Hospital HVAC operation",
          text: "Preventive and predictive maintenance and rapid response teams, including continuous HVAC operation for NCR hospitals in the pandemic.",
        },
      ],
      more: [
        {
          label: "Hospitals and medical colleges",
          items: [
            { name: "AIIMS Jammu", slug: "aiims-jammu" },
            { name: "AIIMS Rewari", slug: "aiims-rewari" },
            { name: "Safdarjung Hospital", slug: "safdarjung-hospital" },
            { name: "Indira Gandhi Hospital", slug: "indira-gandhi-hospital" },
            {
              name: "ESIC Medical College and Hospital",
              slug: "esic-medical-college-hospital",
            },
            {
              name: "SCB Medical College, Cuttack",
              slug: "scb-medical-college-cuttack",
            },
            { name: "SSH Warangal", slug: "ssh-warangal" },
            { name: "Burari Hospital", slug: "burari-hospital" },
          ],
        },
      ],
      also: {
        label: "Clients in healthcare",
        items: ["AIIMS", "Safdarjung Hospital", "ESIC", "SCB Medical College"],
      },
    },
    whyBlock(),
  ],
};

/* ------------------------------------------------------------------
   Sections taken off the industry pages in the November 2026 clean up.
   Each is complete: put it back into a page's `blocks` list, or onto a
   page of its own, when that content is worked on.
   ------------------------------------------------------------------ */
export const PARKED_BLOCKS: Record<string, CapBlock[]> = {
  "semiconductor-cleanroom": [
    {
      // Deck 05, slide 12
      kind: "cards",
      id: "credentials",
      eyebrow: "Cleanroom credentials",
      title: "Class 10,000 and 100,000 executed.",
      lede: "The engineering step to ISO 6 is fully worked out.",
      columns: 4,
      items: [
        {
          title: "Class 10,000 and 100,000",
          text: "ISO 7 and ISO 8 assembly cleanrooms for Foxconn in Bengaluru: two floors of 14,000 sqm each, completed in three months with more than 1,500 people on site.",
        },
        {
          title: "Process piping at Foxconn",
          text: "Compressed dry air, nitrogen and vacuum networks with complete precision MEPF, routed with strict slope control and leak tested.",
        },
        {
          title: "Cleanroom envelope",
          text: "Wall and ceiling panelling, epoxy flooring, HEPA filtered AHUs, return air risers, cleanroom doors and view panels.",
        },
        {
          title: "Controls",
          text: "PLC programming of AHUs and BMS integration across the controlled environment estate at Foxconn.",
        },
      ],
      more: {
        label: "The step to ISO 6",
        items: [
          {
            title: "Air change rates for ISO 6",
            text: "60 to 90 air changes an hour for ISO 6, against about 20 to 40 for ISO 7 and ISO 8.",
          },
          {
            title: "Directional airflow",
            text: "FFU assisted, low turbulence flow and low level returns that sweep particles out of the room.",
          },
          {
            title: "Terminal filtration",
            text: "HEPA H13 and H14 terminal filters in gel seal housings, with in situ leak testing of every filter.",
          },
          {
            title: "Pressure and stability",
            text: "At least 15 Pa between zones, and temperature and humidity held typically within 1°C and 5% RH.",
          },
        ],
      },
      tone: "soft",
    },
    {
      // Deck 05, slide 13
      kind: "cards",
      id: "process-piping",
      nav: "Process piping",
      eyebrow: "Process piping and distribution",
      title:
        "Executed across the semiconductor, industrial and data centre portfolios.",
      columns: 3,
      items: [
        {
          meta: "PCW",
          title: "Process cooling water",
          text: "Closed loop process water headers, primary and secondary interfaces, SS 316 and PP H piping, hydro and pneumatic testing at Foxconn.",
        },
        {
          meta: "CDA",
          title: "Compressed dry air",
          text: "Oil free compressor and dryer skids, multi stage filtration to dew point class, SS and aluminium distribution, point of use regulators.",
        },
        {
          meta: "Gases",
          title: "Nitrogen and vacuum",
          text: "Nitrogen and vacuum networks with point of use drops, leak tested and integrated without breaching contamination zones.",
        },
        {
          meta: "Underground",
          title: "Tata Electronics, Dholera",
          text: "Underground utility piping: the main header runs that will feed future point of use distribution for the fab.",
        },
        {
          meta: "HVAC",
          title: "Tata Electronics, Jagiroad",
          text: "HVAC for the utility and non cleanroom zones of the assembly and test plant in Assam.",
        },
        {
          meta: "DC loops",
          title: "Data centre portfolio",
          text: "Large closed loop secondary distribution with N+1 and 2N redundancy, plate heat exchanger interfaces and balancing discipline.",
        },
      ],
    },
    {
      // Deck 05, slides 26 to 29
      kind: "sheets",
      id: "engineering",
      nav: "Cleanroom engineering",
      eyebrow: "Cleanroom engineering",
      title: "From the design basis to the validation dossier.",
      lede: "Room by room loads, standards fixed at the start, and one federated model before anything is released to site.",
      layout: "top",
      sheets: [
        {
          label: "Design basis",
          title: "Heat load and design basis",
          lede: "Room by room loads, standards fixed at the start, and one federated model before anything is released to site.",
          stats: [
            {
              value: "ISO 14644",
              label:
                "Cleanroom standard. Parts 1 to 3: classification, design and testing",
            },
            {
              value: "ASHRAE 170",
              label:
                "Ventilation basis. With ISHRAE and the project specification",
            },
            {
              value: "LOD 400",
              label:
                "Federated BIM. HVAC, envelope, electrical, process piping and BMS",
            },
            {
              value: "AABC, NEBB",
              label:
                "Balancing procedures. Air and water balanced at terminal level",
            },
          ],
          groups: [
            {
              label: "Loads and tools",
              style: "cards",
              items: [
                {
                  title: "Cleanroom and process zones",
                  text: "Room by room: tool dissipation from OEM datasheets, exhaust make up and infiltration, people and lighting gains, and the latent load of replacement air.",
                },
                {
                  title: "Utility and support zones",
                  text: "Per equipment: AHU rooms, electrical rooms, chiller plant and gas yards, from nameplate dissipation and envelope modelling.",
                },
                {
                  title: "Office and R&D blocks",
                  text: "ASHRAE 62.1 and 90.1: occupancy driven sensible and latent splits, DOAS sizing and worst case design day tables.",
                },
                {
                  title: "Design tools",
                  text: "Carrier HAP for loads, AutoCAD MEP and Revit for layouts and BIM, Pipe Flow Expert for hydraulics, Trane TRACE and IES VE for energy, Ansys Fluent for airflow.",
                },
              ],
            },
          ],
        },
        {
          label: "Design workflow",
          title: "Cleanroom design workflow",
          lede: "To ISO 14644 Parts 1 and 2, ASHRAE 170 and ISHRAE, with the project specification as the governing contract.",
          steps: [
            {
              label: "Concept zoning",
              text: "ISO class per room, positive and negative pressure strategy, people and material flow, and the airlock hierarchy.",
            },
            {
              label: "Heat load and airflow",
              text: "Room by room loads in Carrier HAP, with tool heat mapped granularly and exhaust make up accounted for.",
            },
            {
              label: "FFU and HEPA layout",
              text: "Ceiling grid layout, gel seal terminal frames for ISO 6 and ISO 7, and unidirectional or turbulent flow set per room.",
            },
            {
              label: "Pressure cascade",
              text: "Differential pressure targets, door interlock logic, emergency purge paths and cross contamination checks.",
            },
            {
              label: "Federated BIM",
              text: "LOD 400 model of HVAC, envelope, electrical, process piping and BMS, with every clash resolved before shop release.",
            },
            {
              label: "Validation strategy",
              text: "Particle count, recovery time, air changes, pressure, temperature, humidity, noise and lighting, each tied to an ISO 14644 Part 3 method.",
            },
          ],
        },
        {
          label: "Control philosophy",
          title: "Control philosophy",
          lede: "The control design starts from the pressure cascade, not from the equipment list.",
          steps: [
            {
              label: "Pressure first",
              text: "Zone pressure targets from the design cascade, monitored continuously by the BMS with alarm bands.",
            },
            {
              label: "Coordinated air",
              text: "MAU, AHU and FFU modulate together: the MAU for make up air, the AHU for sensible load, the FFU to hold the ISO class.",
            },
            {
              label: "Temperature and humidity",
              text: "PID loops with dead bands to stop hunting, with chilled water valve and reheat logic.",
            },
            {
              label: "Setback",
              text: "Occupancy and equipment state setback for energy, without breaking the pressure cascade.",
            },
            {
              label: "Safety interlocks",
              text: "Door interlocks, airlock purge and emergency evacuation, hardwired at PLC level.",
            },
            {
              label: "Alarm hierarchy",
              text: "Operator, supervisor and critical alarm levels, with automatic tickets into the maintenance system.",
            },
          ],
        },
        {
          label: "Validation",
          title: "Validation, testing and handover",
          lede: "Qualification to ISO 14644 Part 3, balancing to AABC or NEBB procedures, and a dossier that grows with the installation.",
          steps: [
            {
              label: "IQ Installation qualification",
              text: "As built checked against design drawings, equipment tags and serials, envelope and penetration integrity.",
            },
            {
              label: "OQ Operational qualification",
              text: "HEPA leak tests, airflow and air changes, pressure, temperature and humidity at several load states, noise and lighting.",
            },
            {
              label: "PQ Performance qualification",
              text: "Particle counts at rest and in operation on the ISO 14644 Part 1 grid, and continuous monitoring trials.",
            },
            {
              label: "TAB Testing and balancing",
              text: "Supply, return and exhaust balanced at terminal level; chilled water and PCW balanced at branch valves; CDA and N2 dew point checked at tool drops.",
            },
            {
              label: "BMS Loop tuning",
              text: "PID stability, alarm verification and trend logging under the operating sequence.",
            },
          ],
          groups: [
            {
              label: "Tests by ISO 14644 Part 3",
              style: "cards",
              items: [
                {
                  title: "HEPA leak test",
                  text: "Aerosol photometer scan of every terminal filter and housing.",
                },
                {
                  title: "Airflow",
                  text: "Velocity and volume at terminals, and air changes per hour room by room.",
                },
                {
                  title: "Pressure cascade",
                  text: "Differential pressure at design condition and under door cycle stress.",
                },
                {
                  title: "Particle counts",
                  text: "At rest and operational counts on the ISO 14644 Part 1 grid.",
                },
              ],
            },
            {
              label: "Test discipline",
              style: "cards",
              items: [
                {
                  title: "Instruments",
                  text: "NABL calibrated instruments, client witnessed tests and archived records.",
                },
                {
                  title: "Dossier",
                  text: "As built drawings and BIM, test packs, TAB reports, calibration certificates, warranties and training records.",
                },
                {
                  title: "Format",
                  text: "Hard copy and searchable digital copy at handover.",
                },
              ],
            },
          ],
        },
      ],
    },
  ],
  "data-centre": [
    {
      // Deck 02, slides 12 and 34
      kind: "table",
      id: "register",
      eyebrow: "Data centre project register",
      title: "By operator, location, facility, status and scope.",
      lede: "CtrlS has three active projects in Navi Mumbai and two in Hyderabad. Four earlier projects established the company's data centre credentials before the Navi Mumbai programme.",
      columns: ["Project", "Client", "Location", "Facility", "Status", "Scope"],
      rows: [
        [
          "AdaniConneX HYD 22 and 23",
          "AdaniConneX, through Larsen and Toubro",
          "Hyderabad",
          "600 MW potential IT load, Hyderabad campus",
          "Active, 2 work orders",
          "HVAC, fire protection",
        ],
        [
          "CtrlS Data Centre HYD 141",
          "CtrlS Datacenters",
          "Chandanvelly, Hyderabad",
          "700+ MW campus, scalable to 1.4 GW",
          "2 active projects",
          "Electrical, HVAC, IBMS, fire protection, PHE",
        ],
        [
          "CtrlS Data Centre DC6 and 7, floors 6 to 9",
          "CtrlS Datacenters",
          "Mahape, Navi Mumbai",
          "20 MW, rated 4",
          "3 active projects",
          "Civil interiors, electrical, HVAC, IBMS and ELV, fire protection, PHE, IST",
        ],
        [
          "Digital Edge BOM131",
          "Digital Edge, through Tata Projects",
          "Navi Mumbai",
          "48 MW",
          "Active",
          "HVAC package: plant, chilled water, air side, VRF",
        ],
        [
          "Anant Raj Cloud Data Centre, Towers D and E",
          "Anant Raj Cloud",
          "Manesar, Haryana",
          "21 MW campus, Tier III",
          "Active",
          "HVAC high side and low side, fire fighting",
        ],
        [
          "STT GDC NMDC01, ground and first floor",
          "STT GDC India",
          "Mahape, Navi Mumbai",
          "28.4 MW campus, Tier III",
          "Completed",
          "HVAC",
        ],
        [
          "STPI Incubation Centre",
          "STPI, through CPWD",
          "Mohali",
          "Server rooms",
          "Completed",
          "HVAC, precision cooling, BMS",
        ],
        [
          "TTSL Data Centre",
          "Tata Teleservices",
          "Hyderabad",
          "Approx. 2 to 3 MW",
          "Completed",
          "Precision cooling, power distribution",
        ],
        [
          "ASF Insignia Data Centre",
          "ASF",
          "Gurugram",
          "Approx. 1 to 2 MW, enterprise",
          "Completed",
          "HVAC, electrical, fire fighting, ELV",
        ],
        [
          "NISM Data Centre",
          "NISM",
          "Mumbai",
          "Under 1 MW, institutional",
          "Completed",
          "HVAC, electrical, allied services",
        ],
        [
          "UIDAI Headquarters Data Centre",
          "UIDAI",
          "New Delhi",
          "Approx. 1 MW, headquarters",
          "Completed",
          "Data centre and server room MEP",
        ],
      ],
      groups: [
        { before: 7, label: "Earlier data centre and server room work" },
      ],
    },
    {
      // Deck 02, slide 48
      kind: "cards",
      id: "live-facilities",
      nav: "Live facilities",
      eyebrow: "Working in live facilities",
      title: "Five disciplines govern every intrusive activity.",
      lede: "Most data centre packages are executed next to live IT load, from the STT and CtrlS floors in Navi Mumbai onward.",
      columns: 3,
      numbered: true,
      items: [
        {
          title: "Method of procedure",
          text: "Every intrusive activity on live infrastructure runs against a method of procedure signed by the operator, with standard and emergency operating procedures alongside.",
        },
        {
          title: "Change control",
          text: "Changes classified at four levels; the higher levels need operator engineering and operations approval. No work starts on a live system without a signed change ticket.",
        },
        {
          title: "Concurrent maintainability",
          text: "Loads transferred to the redundant path before work begins. Plant cells, UPS modules and distribution sections come offline only after their pair carries the full load and is monitored.",
        },
        {
          title: "Witnessed isolation",
          text: "Two person verification on every isolation. Lock out and tag out on electrical, valve and damper isolations with a photographic record of every locked state.",
        },
        {
          title: "Live commissioning",
          text: "Tie ins, hot cuts and load bank tests scheduled inside agreed maintenance windows, instrumented, rehearsed and executed by lead engineers.",
        },
        {
          meta: "Hold point",
          title: "Jointly signed before isolation",
          text: "No isolation is applied until the approved method of procedure, the proven temporary state and the rollback trigger are jointly signed by Unique Engineers and facility operations.",
        },
      ],
      more: {
        label: "Tie in sequence",
        items: [
          { meta: "1", title: "Impact assessment", text: "" },
          { meta: "2", title: "Approved method of procedure", text: "" },
          { meta: "3", title: "Temporary state proven", text: "" },
          {
            meta: "4",
            title: "Isolation applied and zero energy verified",
            text: "",
          },
          { meta: "5", title: "Work executed", text: "" },
          { meta: "6", title: "Staged reinstatement", text: "" },
          { meta: "7", title: "Redundancy and alarms verified", text: "" },
          { meta: "8", title: "Rollback closed", text: "" },
        ],
      },
      tone: "soft",
    },
    {
      // Deck 02, slide 45
      kind: "process",
      id: "automation",
      nav: "Automation and BMS",
      eyebrow: "Data centre automation and BMS",
      title: "Controls are where power, cooling and life safety meet.",
      lede: "The Intelligent Solutions division engineers, programmes and commissions BMS, EPMS and fail safe cooling controls in house, from the points list to integrated systems testing.",
      variant: "rail",
      steps: [
        {
          label: "Field",
          text: "Sensors, meters, actuators, VFDs, leak detection and VESDA at defined risks, each tagged to the points list",
        },
        {
          label: "Control",
          text: "DDC and PLC controllers, MaxCool fail safe panels and auto sequential duty and standby panels that can run the plant locally",
        },
        {
          label: "Supervisory",
          text: "BMS, EPMS and DCIM on BACnet, Modbus and SNMP, with synchronised time and a standard tag dictionary",
        },
        {
          label: "Operator",
          text: "Graphics, prioritised alarms, trends, energy dashboards and reports for the facility team and the client",
        },
      ],
      aside: [
        {
          label: "Controls commissioning, step by step",
          style: "rail",
          items: [
            {
              title: "Points list",
              text: "I/O schedule and tag dictionary signed off with the operator",
            },
            {
              title: "Panel FAT",
              text: "Control panels tested at the panel builder before dispatch",
            },
            {
              title: "Point to point",
              text: "Every field device checked end to end: wiring, scaling, command and feedback",
            },
            {
              title: "Sequences",
              text: "Sequence of operation, fail safe and duty and standby changeover tested",
            },
            {
              title: "Alarms and trends",
              text: "Thresholds, priorities, graphics and trend logging verified",
            },
            {
              title: "Integration",
              text: "EPMS, fire and third party interfaces proven, then exercised in IST",
            },
          ],
        },
        {
          label: "Systems we integrate",
          style: "chips",
          items: [
            "Chillers and cooling towers",
            "CRAH, fan wall units and PAHUs",
            "CDUs and liquid cooling",
            "Pumps and VFDs",
            "UPS and PDUs",
            "DG sets, HT and LT panels",
            "Energy and BTU meters",
            "Fire alarm and VESDA",
            "Water leak detection",
            "MaxCool",
            "VRF central controllers",
            "Access control and CCTV",
          ].map((title) => ({ title, text: "" })),
        },
      ],
    },
    {
      // Deck 02, slide 49
      kind: "process",
      id: "commissioning",
      nav: "Commissioning",
      eyebrow: "Commissioning and integrated systems testing",
      title: "Five levels, ending in integrated failure scenarios.",
      lede: "Each level is signed off and operator witnessed where required before the next begins, ending in integrated failure scenarios verified across every affected system and the operating response.",
      variant: "rail",
      steps: [
        {
          label: "L1 Component verification",
          text: "OEM datasheet, serial and tag check, physical integrity and receipt inspection",
        },
        {
          label: "L2 Static completion",
          text: "Insulation resistance, pressure and leak tests, flushing and cleanliness, no load checks",
        },
        {
          label: "L3 System start up",
          text: "Powered functional tests of pumps, fans, CRAH units, UPS modules and generators against design",
        },
        {
          label: "L4 Functional performance",
          text: "End to end systems with BMS, failover sequences, alarm matrix and interlocks under full plant operation",
        },
        {
          label: "L5 Integrated failure and recovery",
          text: "Full load integrated systems test with load banks, concurrent maintainability and fault tolerance scenarios",
        },
      ],
      aside: [
        {
          label: "Integrated systems test scenarios",
          style: "cards",
          items: [
            {
              title: "Utility loss",
              text: "Source transfer and load acceptance verified across power, cooling, controls and operations",
            },
            {
              title: "Cooling equipment failure",
              text: "Duty and standby transfer and thermal recovery verified across cooling, controls and operations",
            },
            {
              title: "Controls communication loss",
              text: "Fallback control and alarm propagation verified across cooling, power and controls",
            },
            {
              title: "Fire alarm interface",
              text: "Cause and effect and safe shutdown verified across fire, cooling, power and controls",
            },
          ],
        },
        {
          label: "Test discipline",
          style: "list",
          items: [
            {
              title: "Script",
              text: "Baseline, failure injection, recovery and evidence for every scenario, agreed with the operator before the test window",
            },
            {
              title: "Instruments",
              text: "NABL calibrated instruments and witnessed records; testing, adjusting and balancing to ASHRAE, AABC and NEBB procedures",
            },
          ],
        },
      ],
      tone: "soft",
    },
    {
      // Deck 02, slide 47
      kind: "lists",
      id: "methods",
      eyebrow: "Data centre engineering methods",
      title: "Nineteen controlled method statements.",
      lede: "Across MEPF, controls and integrated testing. Each carries a sequence, hold points and an inspection and test plan, and is issued to the site before the workfront is released.",
      columns: 3,
      numbered: true,
      groups: [
        {
          title: "Multidiscipline",
          items: [
            "DfMA and modular MEP distribution",
            "Live system tie ins and phased changeovers",
          ],
        },
        {
          title: "Mechanical",
          items: [
            "Precision air cooling and airflow management",
            "Direct to chip liquid cooling and CDU integration",
            "High integrity critical cooling piping",
            "Redundant chilled water distribution and sectional isolation",
            "Cooling system failover and thermal ride through",
          ],
        },
        {
          title: "Electrical",
          items: [
            "2N electrical distribution and A and B path segregation",
            "Critical white space power distribution",
            "Emergency power transfer, synchronisation and recovery",
            "Data centre earthing, bonding and power quality",
          ],
        },
        {
          title: "BMS and controls",
          items: [
            "PLC based critical cooling plant controls",
            "BMS, EPMS and DCIM integration architecture",
            "Environmental monitoring and leak detection",
            "Critical alarm management and cause and effect logic",
          ],
        },
        {
          title: "Fire and life safety",
          items: [
            "Very early smoke detection and staged fire response",
            "Double interlock pre action fire protection",
            "Clean agent suppression and enclosure integrity",
          ],
        },
        {
          title: "Integrated testing",
          items: ["Integrated systems testing and failure mode validation"],
        },
      ],
    },
  ],
};

export const INDUSTRY_PAGES: Record<string, CapPage> = {
  "data-centre": dataCentre,
  "semiconductor-cleanroom": semiconductor,
  "industrial-manufacturing": industrial,
  "airport-public-venues": airport,
  "education-research": education,
  "corporate-retail": corporateRetail,
  healthcare,
  hospitality,
  residential,
};

export function getIndustryPage(slug: string): CapPage | null {
  return INDUSTRY_PAGES[slug] ?? null;
}
