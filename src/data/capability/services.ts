/**
 * Service pages, keyed by service slug.
 *
 * The BMS and ELV page carries deck 09 in full. The other services
 * follow the same order (what we deliver, projects, specialist
 * sections, how we deliver) and are built from what the decks say
 * about each trade: the Services slide of deck 06, the "what we
 * deliver" slides of decks 02, 04, 05 and 07, and each project's
 * scope of work column.
 *
 * Name, description and photograph come from the CMS and
 * src/data/site-content.ts; this file holds figures and blocks only.
 */
import type { CapBlock, CapItem, CapStat, ServiceKey } from "./types";
import { deliveryBlock } from "./shared";
import { CIVIL_PORTFOLIO } from "./industries";

export type ServiceCap = { stats?: CapStat[]; blocks: CapBlock[] };

const P = "/capability/process/";
const S = "/capability/screens/";

const LEDGER_GROUPS = [
  {
    label: "Data centres",
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
  {
    label: "Semiconductor and industrial",
    projects: ["foxconn", "tata-dholera", "tata-jagiroad", "jsw-motors"],
  },
  {
    label: "Commercial and residential",
    projects: ["ikea-noida", "prestige-bkc-101", "wtc-gurugram", "m3m-mansion"],
  },
  {
    label: "Public and institutional",
    projects: ["central-secretariat", "mopa-airport", "nalanda-university"],
  },
];

const scope = (lede: string, titles: string[]): CapBlock => ({
  kind: "cards",
  id: "what-we-deliver",
  nav: "What we deliver",
  eyebrow: "Our scope",
  title: "What we deliver.",
  lede,
  columns: titles.length === 4 ? 4 : 5,
  numbered: true,
  items: titles.map((title) => ({ title, text: "" })),
});

const byIndustry = (title: string, items: CapItem[]): CapBlock => ({
  kind: "cards",
  id: "by-industry",
  nav: "By industry",
  eyebrow: "By industry",
  title,
  columns: items.length % 3 === 0 ? 3 : 4,
  items,
  tone: "soft",
});

const closer = (tone: "plain" | "soft" = "plain"): CapBlock => ({
  kind: "subservices",
  id: "systems",
  nav: "Systems",
  eyebrow: "Explore the systems",
  title: "A closer look.",
  tone,
});

const ledger = (service: ServiceKey, title: string): CapBlock => ({
  kind: "ledger",
  id: "projects",
  nav: "On our projects",
  eyebrow: "On our projects",
  title,
  lede: "The scope we hold for this service on each project, as stated in its scope of work.",
  service,
  groups: LEDGER_GROUPS,
  tone: "soft",
});

const tail = (variant: "general" | "bms" = "general"): CapBlock[] => [
  deliveryBlock(variant, { tone: "soft" }),
  { kind: "methods", id: "methods" },
  {
    kind: "related",
    id: "case-studies",
    eyebrow: "Case studies",
    title: "From the project archive.",
  },
];

/* ------------------------------------------------------------------
   HVAC and mechanical
   ------------------------------------------------------------------ */
const hvac: ServiceCap = {
  stats: [
    { value: "43", label: "HVAC projects in the register" },
    {
      value: "29",
      label: "Controlled HVAC method statements",
      note: "Built and maintained under engineer review",
    },
    {
      value: "13.5 km",
      label: "Chilled water piping at Digital Edge BOM131",
      note: "From 25 to 450 mm, with actuated valves, balancing and instruments",
    },
    {
      value: "22",
      label: "Free issue chillers installed at AdaniConneX HYD 23",
      note: "With 60 fan wall units and 72 precision AHUs",
    },
  ],
  blocks: [
    scope(
      "HVAC is where the company began, and it is the largest service line by projects in the register.",
      [
        "Chilled water plants and cooling towers",
        "AHUs, FCUs and VRF",
        "Ventilation and smoke control",
        "Pumps, piping and hydronics",
        "Precision and process cooling",
      ],
    ),
    byIndustry("The same trade, engineered for each kind of facility.", [
      {
        meta: "Data centres",
        title: "Cooling plant and hydronics",
        text: "Chillers and cooling towers, primary and secondary pumping, N+1 and 2N distribution, thermal energy storage, PICV balancing, sectional isolation and cross ties for concurrent maintainability.",
      },
      {
        meta: "Data centres",
        title: "Precision cooling and white space",
        text: "CRAH and PAC units, in row cooling, aisle containment, rear door heat exchangers, liquid cooling ready paths with CDU integration, zoned leak detection.",
      },
      {
        meta: "Industrial",
        title: "Industrial HVAC",
        text: "Cooling plants, pumps, AHUs, ventilation, exhaust, ducts and hydronic distribution. Temperature and humidity control for manufacturing and support areas.",
      },
      {
        meta: "Cleanrooms",
        title: "Cleanroom HVAC",
        text: "Make up air units, recirculation AHUs, fan filter units and HEPA terminal filtration, sized room by room to hold the ISO class, temperature and humidity.",
      },
      {
        meta: "Cleanrooms",
        title: "Pressure and airflow",
        text: "Pressure differentials between zones, airlocks and anterooms, unidirectional or turbulent airflow set per room, and low level returns.",
      },
      {
        meta: "Public and institutional",
        title: "Central HVAC plants",
        text: "High efficiency chiller plants, thermal storage and air distribution sized for large campuses and office complexes.",
      },
      {
        meta: "Public and institutional",
        title: "Low energy systems",
        text: "Thermal energy storage, geothermal water cooled VRV, brine chillers and evaporative cooling, as delivered at Nalanda University.",
      },
      {
        meta: "Residential",
        title: "VRV air conditioning",
        text: "Supply, installation, testing and commissioning of VRV air conditioning and air purification for residences, tested and commissioned apartment by apartment before handover.",
      },
    ]),
    closer(),
    ledger("hvac", "HVAC scope across our projects."),
    {
      kind: "cards",
      id: "prefabrication",
      eyebrow: "DfMA and testing",
      title: "High fit for off site assembly.",
      columns: 3,
      items: [
        {
          meta: "DfMA",
          title: "Mechanical, high fit",
          text: "Chilled water spools and headers, pump and CDU skids, valve stations and CRAH connection sets.",
        },
        {
          meta: "Balancing",
          title: "To ASHRAE, AABC and NEBB procedures",
          text: "Balancing reports with NABL calibrated instruments, and certificates on record.",
        },
        {
          meta: "Controls",
          title: "Chiller plant manager",
          text: "Central control stations and software that sequence the chillers and optimise the plant, as at IKEA, INGKA Centre, Noida.",
        },
      ],
    },
    ...tail(),
  ],
};

/* ------------------------------------------------------------------
   Electrical and critical power
   ------------------------------------------------------------------ */
const electrical: ServiceCap = {
  stats: [
    { value: "16", label: "Electrical projects in the register" },
    {
      value: "33 kV",
      label: "HT systems at 33, 22 and 11 kV",
      note: "Transformers, LT switchgear and bus ducts",
    },
    {
      value: "2N",
      label: "A and B paths",
      note: "UPS and battery rooms with hydrogen sensing, DG synchronisation",
    },
    {
      value: "5 tiers",
      label: "Of wire mesh containment at CtrlS HYD 141",
      note: "LT feeders to 16 line ups, with rack whips and sockets",
    },
  ],
  blocks: [
    scope("Power distribution from the HT intake to the final circuit.", [
      "HT and LT distribution",
      "Transformers and DG sets",
      "UPS and power quality",
      "Busduct, cabling and earthing",
      "Lighting and small power",
    ]),
    byIndustry(
      "From the utility intake to the rack, the tool and the tenant.",
      [
        {
          meta: "Data centres",
          title: "Critical power",
          text: "33, 22 and 11 kV HT systems, transformers, LT switchgear, bus ducts, 2N A and B paths, UPS and battery rooms with hydrogen sensing, DG synchronisation, HSD fuel systems.",
        },
        {
          meta: "Industrial",
          title: "Electrical and busduct",
          text: "HT and LT distribution, transformers, switchgear, busduct, cables, lighting and earthing. Equipment connections, utility feeds and coordinated power routes.",
        },
        {
          meta: "Cleanrooms",
          title: "Electrical and lighting",
          text: "Clean power distribution, cleanroom lighting, containment and earthing installed to avoid vibration and particle shedding.",
        },
        {
          meta: "Public and institutional",
          title: "Electrical",
          text: "HT and LT distribution, substations, DG sets and lighting for terminals, offices and academic blocks.",
        },
      ],
    ),
    closer(),
    ledger("electrical", "Electrical scope across our projects."),
    {
      // Deck 02, slide 47, and deck 08, slide 14
      kind: "cards",
      id: "methods-and-dfma",
      eyebrow: "Methods and DfMA",
      title: "Controlled methods for critical power.",
      columns: 3,
      items: [
        {
          meta: "Method 08",
          title: "2N electrical distribution and A and B path segregation",
          text: "",
        },
        {
          meta: "Method 09",
          title: "Critical white space power distribution",
          text: "",
        },
        {
          meta: "Method 10",
          title: "Emergency power transfer, synchronisation and recovery",
          text: "",
        },
        {
          meta: "Method 11",
          title: "Data centre earthing, bonding and power quality",
          text: "",
        },
        {
          meta: "DfMA",
          title: "Electrical, high fit",
          text: "Multi tier cable containment, busway sections, power skids and earthing assemblies.",
        },
        {
          meta: "Testing",
          title: "L3 system start up",
          text: "Powered tests of pumps, fans, VRF, AHUs, DG sets and panels against design.",
        },
      ],
    },
    ...tail(),
  ],
};

/* ------------------------------------------------------------------
   Fire and life safety
   ------------------------------------------------------------------ */
const fire: ServiceCap = {
  stats: [
    { value: "14", label: "Fire and life safety projects in the register" },
    {
      value: "About 6,000",
      label: "Addressable detectors at Prestige BKC 101",
      note: "With about 2,800 voice evacuation speakers",
    },
    {
      value: "312",
      label: "Cause and effect mappings",
      note: "Proved as one sequence on Prestige BKC 101",
    },
    {
      value: "NFPA 72",
      label: "Fire alarm system to UL 864 and NFPA 72",
      note: "Prestige BKC 101",
    },
  ],
  blocks: [
    scope(
      "Detection, suppression and fire protection, coordinated with the building and its operations.",
      [
        "Hydrants and sprinklers",
        "Fire pumps and pump rooms",
        "Fire alarm and public address",
        "Clean agent and water mist",
        "Fire stopping",
      ],
    ),
    byIndustry("Protection matched to the risk in each facility.", [
      {
        meta: "Data centres",
        title: "Fire and life safety",
        text: "Very early smoke detection, double interlock pre action sprinklers, clean agent suppression, hydrants, high pressure water mist, foam, fire rated compartmentation.",
      },
      {
        meta: "Industrial",
        title: "Fire and life safety",
        text: "Fire water pumps, hydrants, sprinklers, suppression and fire alarm interfaces. Underground ring mains, building networks and protection of service penetrations.",
      },
      {
        meta: "Public and institutional",
        title: "Fire protection",
        text: "Hydrants, sprinklers, gas suppression and detection to the National Building Code for offices, terminals and campuses.",
      },
      {
        meta: "Office and hotel",
        title: "Fire alarm and voice evacuation",
        text: "Addressable fire alarm and voice evacuation for the office tower and the hotel at Prestige BKC 101, with every life safety interface proved as one sequence.",
      },
    ]),
    closer(),
    ledger("fire", "Firefighting scope across our projects."),
    {
      // Deck 09, slide 18
      kind: "sheets",
      id: "fire-alarm",
      nav: "Fire alarm",
      eyebrow: "Fire alarm at Prestige BKC 101",
      title: "Every life safety interface proved as one sequence.",
      lede: "Addressable fire alarm and voice evacuation for the office tower and the hotel.",
      sheets: [
        {
          label: "Fire alarm",
          title: "Detect, confirm, evacuate, control, report",
          steps: [
            {
              label: "Detect",
              text: "Addressable detectors in every room, ceiling void and plant space.",
            },
            {
              label: "Confirm",
              text: "One detector alerts. A second detector or a timeout raises the alarm.",
            },
            {
              label: "Evacuate",
              text: "Voice messages zone by zone, with live paging from the control room.",
            },
            {
              label: "Control",
              text: "Lifts recalled, pressurisation fans started, dampers and doors released.",
            },
            {
              label: "Report",
              text: "Status to the repeater panels, and to the BMS over a tested BACnet gateway.",
            },
          ],
          stats: [
            { value: "About 6,000", label: "Addressable detectors" },
            { value: "About 2,800", label: "Voice evacuation speakers" },
            { value: "312", label: "Cause and effect mappings" },
            {
              value: "6",
              label: "Networked fire alarm panels, with 5 repeaters",
            },
          ],
          groups: [
            {
              label: "What we supply, install and prove",
              style: "cards",
              items: [
                {
                  title: "Panels and network",
                  text: "Six networked fire alarm panels and five repeater panels, linked between the buildings on fibre.",
                },
                {
                  title: "Detection",
                  text: "Smoke, heat, multi criteria and carbon monoxide detectors, with beam and gas detection.",
                },
                {
                  title: "Alarm devices",
                  text: "About 280 manual call points and 700 sounders and strobes, with fire fighter telephone points.",
                },
                {
                  title: "Voice evacuation",
                  text: "Digital amplifiers, zone paging, and ceiling, wall and horn speakers in both buildings.",
                },
                {
                  title: "Interfaces",
                  text: "About 1,750 control, monitor and relay modules to lifts, fans, dampers, doors and DG sets.",
                },
                {
                  title: "Testing",
                  text: "Gateway tested at the works, four phases of site testing, then a witnessed demonstration to the fire authority.",
                },
              ],
            },
          ],
          note: "System to UL 864 and NFPA 72. Quantities are from the contract bills of quantities and are confirmed in the approved shop drawings.",
        },
      ],
    },
    {
      // Deck 02, slide 47, and deck 08, slide 14
      kind: "cards",
      id: "methods-and-dfma",
      eyebrow: "Methods and DfMA",
      title: "Controlled methods for fire and life safety.",
      columns: 4,
      items: [
        {
          meta: "Method 16",
          title: "Very early smoke detection and staged fire response",
          text: "",
        },
        {
          meta: "Method 17",
          title: "Double interlock pre action fire protection",
          text: "",
        },
        {
          meta: "Method 18",
          title: "Clean agent suppression and enclosure integrity",
          text: "",
        },
        {
          meta: "DfMA",
          title: "Fire protection, high fit",
          text: "Sprinkler mains and risers, pre action valve sets, and pump and header skids.",
        },
      ],
      tone: "soft",
    },
    ...tail(),
  ],
};

/* ------------------------------------------------------------------
   Plumbing and public health
   ------------------------------------------------------------------ */
const plumbing: ServiceCap = {
  stats: [
    {
      value: "8",
      label: "Plumbing and public health projects in the register",
    },
    {
      value: "5,000 litres",
      label: "SS 316L mixing tanks at the BITSoM hostels",
      note: "Air source heat pump hot water, sized at 45 litres per person per day",
    },
    {
      value: "5",
      label: "Hostels on the heat pump hot water programme",
      note: "Hostel by hostel cutovers in low occupancy windows",
    },
  ],
  blocks: [
    scope(
      "Water supply, drainage, treatment and reuse for reliable everyday operation.",
      [
        "Water supply and drainage",
        "Water and sewage treatment",
        "Rainwater harvesting and reuse",
        "Sanitary installations",
        "Piped natural gas",
      ],
    ),
    byIndustry("Water, drainage and utilities for each kind of facility.", [
      {
        meta: "Industrial",
        title: "PHE and underground utilities",
        text: "Water supply, drainage, sewerage, effluent and utility pipelines. Underground and trestle distribution with valves, chambers and coordinated connections.",
      },
      {
        meta: "Public and institutional",
        title: "Plumbing and water",
        text: "Water supply, drainage, water treatment, sewage treatment and rainwater harvesting across campuses.",
      },
      {
        meta: "Retail and mixed use",
        title: "Plumbing and piped natural gas",
        text: "Plumbing pumps, water supply, drainage and sanitary services. Scheduled PNG system and building utility connections, as at IKEA, INGKA Centre, Noida.",
      },
      {
        meta: "Office and hotel",
        title: "Hotel hot water and sewage treatment",
        text: "Domestic and flushing water supply, soil and waste drainage, pumps and tanks. Sewage treatment plant and hotel hot water systems, as at Prestige BKC 101.",
      },
    ]),
    closer(),
    ledger("phe", "Plumbing and public health scope across our projects."),
    {
      // Deck 07, slide 21
      kind: "showcase",
      id: "heat-pumps",
      nav: "Heat pump hot water",
      eyebrow: "Heat pump hot water",
      title: "A turnkey hot water system for five hostels.",
      projects: ["bitsom-campus"],
    },
    ...tail(),
  ],
};

/* ------------------------------------------------------------------
   Civil and structural
   ------------------------------------------------------------------ */
const civil: ServiceCap = {
  stats: [
    { value: "5", label: "Civil projects in the register" },
    {
      value: "4",
      label: "Active or nearly complete civil projects",
      note: "Tata Dholera, CtrlS DC6 and 7, VISTA Centre and SMARR City Centre",
    },
    {
      value: "4 floors",
      label: "Fitted out inside a live data centre",
      note: "CtrlS DC6 and 7, floors 6 to 9",
    },
  ],
  blocks: [
    scope("Civil works built around the requirements of integrated services.", [
      "Foundations and enabling works",
      "Civil infrastructure works",
      "Partitions and interiors",
      "Raised floors and precision grouting",
      "Trenches and utility corridors",
    ]),
    {
      kind: "tiles",
      id: "portfolio",
      nav: "Civil portfolio",
      eyebrow: "Civil portfolio",
      title: "Four active or nearly complete projects.",
      items: CIVIL_PORTFOLIO,
      columns: 4,
      tone: "soft",
    },
    byIndustry("Civil scope inside the services package.", [
      {
        meta: "Data centres",
        title: "Civil interiors",
        text: "Raised floors, partitions and false ceilings in data halls, equipment plinths and foundations, trenches, fire stopped penetrations.",
      },
      {
        meta: "Industrial",
        title: "Civil and enabling works",
        text: "Equipment bases, utility corridors, duct banks, chambers and support foundations where awarded. Openings, fire stopping, access and local reinstatement coordinated with the services.",
      },
      {
        meta: "Cleanrooms",
        title: "Envelope and finishes",
        text: "Wall and ceiling panelling, cleanroom doors and view panels, epoxy flooring and sealed penetrations through every boundary.",
      },
      {
        meta: "Office and hotel",
        title: "Fire stopping",
        text: "Specified fire stopping package for MEP penetrations through rated walls and slabs. Coordinate sleeves and openings with the general contractor and record completed seals.",
      },
    ]),
    closer(),
    ledger("civil", "Civil scope across our projects."),
    ...tail(),
  ],
};

/* ------------------------------------------------------------------
   Solar and renewables
   ------------------------------------------------------------------ */
const solar: ServiceCap = {
  blocks: [
    scope(
      "Solar PV and electrical integration within a coordinated energy strategy.",
      [
        "Rooftop and ground mounted solar PV",
        "Inverter integration",
        "Electrical protection",
        "Net metering",
      ],
    ),
    {
      kind: "cards",
      id: "by-industry",
      nav: "On our projects",
      eyebrow: "On our projects",
      title: "Solar delivered with the MEPF package.",
      columns: 3,
      items: [
        {
          meta: "IKEA / INGKA Centre, Noida",
          title: "PV solar under Package 2A",
          text: "Integrated MEPF and PV solar works under Package 2A, including PNG services and coordinated delivery across the mixed use development.",
        },
        {
          meta: "IKEA / INGKA Centre, Noida",
          title: "Within the electrical scope",
          text: "Electrical distribution, lighting, cabling, earthing and equipment connections. Scheduled PV solar works across the basement, retail and common areas.",
        },
        {
          meta: "BITSoM campus, Kalyan",
          title: "Solar on the BMS",
          text: "Chiller plant, DG sets, transformers, LT panels, solar, energy meters, pumps, fire alarm and lifts on one head end.",
        },
      ],
      tone: "soft",
    },
    closer(),
    {
      kind: "showcase",
      id: "projects",
      nav: "Project",
      eyebrow: "Project",
      title: "The INGKA Centre package.",
      projects: ["ikea-noida"],
      focus: "electrical",
    },
    ...tail(),
  ],
};

/* ------------------------------------------------------------------
   Precision and process engineering
   ------------------------------------------------------------------ */
const process: ServiceCap = {
  stats: [
    { value: "3", label: "Process engineering projects in the register" },
    {
      value: "14,000 sqm",
      label: "On each of two cleanroom floors at Foxconn",
      note: "ISO 7 and ISO 8, completed in three months",
    },
    {
      value: "SS 316",
      label: "Process cooling water piping in SS 316 and PP H",
      note: "Hydro and pneumatic tested, with OEM validated hook ups",
    },
    {
      value: "ISO 14644",
      label: "Qualification standard",
      note: "IQ, OQ and PQ to ISO 14644 Part 3",
    },
  ],
  blocks: [
    scope(
      "Specialist utilities and high integrity piping for advanced manufacturing and cleanrooms.",
      [
        "Cleanrooms",
        "CDA, nitrogen and vacuum",
        "Process cooling water",
        "High integrity piping",
      ],
    ),
    {
      // Deck 05, slide 13
      kind: "cards",
      id: "by-industry",
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
          meta: "Industrial",
          title: "Process and precision piping",
          text: "Precision utility piping, compressed dry air, nitrogen, vacuum and water services. Equipment tie ins, valves and supports with material and joining requirements matched to each process.",
        },
        {
          meta: "DC loops",
          title: "Data centre portfolio",
          text: "Large closed loop secondary distribution with N+1 and 2N redundancy, plate heat exchanger interfaces and balancing discipline.",
        },
      ],
      tone: "soft",
    },
    {
      // Deck 05, slide 12
      kind: "cards",
      id: "credentials",
      nav: "Cleanrooms",
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
    },
    closer("soft"),
    {
      kind: "showcase",
      id: "projects",
      nav: "Projects",
      eyebrow: "Projects",
      title: "Foxconn, Tata Electronics and JSW.",
      lede: "On industrial projects the PHE column of the scope of work includes the stated process and utility piping.",
      projects: ["foxconn", "tata-dholera", "jsw-motors"],
      focus: "phe",
    },
    ...tail(),
  ],
};

/* ------------------------------------------------------------------
   09 BMS and ELV
   ------------------------------------------------------------------ */
const bms: ServiceCap = {
  // Deck 09, slides 1 and 5
  stats: [
    {
      value: "10+",
      label: "BMS and ELV projects",
      note: "Campuses, hospitals, offices, plants and data centres",
    },
    {
      value: "28",
      label: "Method statements",
      note: "A controlled ELV and BMS library of 196 pages",
    },
    {
      value: "7",
      label: "Client sites on AMC and O&M",
      note: "Served by our field engineers and technicians",
    },
    {
      value: "8",
      label: "In the Intelligent Solutions division",
      note: "A dedicated team for BMS, ELV and building intelligence",
    },
  ],
  blocks: [
    {
      // Deck 09, slide 5
      kind: "cards",
      id: "division",
      eyebrow: "Intelligent Solutions division",
      title: "A dedicated team for BMS, ELV and building intelligence.",
      lede: "It works inside our MEP packages and on standalone contracts for outside clients.",
      columns: 3,
      label: "The team",
      items: [
        {
          title: "Design and engineering",
          text: "BMS and ELV design, IO schedules, panel and network design.",
        },
        {
          title: "Programming and commissioning",
          text: "BMS and ELV engineers who program, loop check and commission on site.",
        },
        {
          title: "Service and analytics",
          text: "AMC, remote monitoring and energy analytics after handover.",
        },
      ],
      more: {
        label: "How we are engaged",
        items: [
          {
            title: "Inside an MEP package",
            text: "Prestige BKC 101, CtrlS data centres and Nalanda University.",
          },
          {
            title: "Standalone BMS contract",
            text: "BITSoM campus, and AHU and MAU controls for Foxconn.",
          },
          {
            title: "Service and analytics",
            text: "Annual maintenance, BMS audits and cloud monitoring.",
          },
        ],
      },
    },
    {
      // Deck 09, slide 7
      kind: "lists",
      id: "what-we-deliver",
      nav: "Systems",
      eyebrow: "BMS and ELV systems",
      title: "Eight groups of services from one team.",
      lede: "What we design, install, integrate and commission.",
      columns: 4,
      groups: [
        {
          title: "Building management",
          items: [
            "DDC controls and field devices",
            "Head end, graphics and trends",
            "Alarm management",
            "Schedules and setpoints",
            "Third party integration",
          ],
        },
        {
          title: "Industrial and cleanroom",
          items: [
            "PLC panels and HMI",
            "SCADA and historian",
            "Pressure and particle monitoring",
            "MCC and drive integration",
          ],
        },
        {
          title: "Fire alarm and public address",
          items: [
            "Addressable fire detection",
            "Voice alarm and public address",
            "Aspirating smoke detection",
            "Cause and effect integration",
          ],
        },
        {
          title: "Networks and communications",
          items: [
            "Structured cabling and LAN",
            "Wi Fi infrastructure",
            "Telephony",
            "Mobile signal boosters",
            "DTH distribution",
          ],
        },
        {
          title: "Plant controls",
          items: [
            "Chiller plant managers",
            "Pump and cooling tower control",
            "AHU, FCU and VAV control",
            "Thermal storage and brine plant",
            "Variable speed pumping",
          ],
        },
        {
          title: "Energy and power monitoring",
          items: [
            "Energy and BTU metering",
            "Electrical power monitoring",
            "Tenant sub metering",
            "Consumption reporting",
          ],
        },
        {
          title: "Security",
          items: [
            "CCTV and video surveillance",
            "Access control",
            "Egress and fire release interface",
            "Security for gated developments",
          ],
        },
        {
          title: "Intelligent building solutions",
          items: [
            "Cloud monitoring",
            "AI predictive maintenance",
            "Energy and carbon analytics",
            "BMS audits",
            "Annual maintenance contracts",
          ],
        },
      ],
      tone: "soft",
    },
    {
      kind: "subservices",
      id: "systems",
      eyebrow: "Explore the systems",
      title: "A closer look.",
    },
    {
      // Deck 09, slide 8
      kind: "process",
      id: "architecture",
      nav: "Architecture",
      eyebrow: "System architecture",
      title: "Four layers on site and one in the cloud.",
      lede: "On open protocols, so every system in the building reports to one head end.",
      variant: "auto",
      steps: [
        {
          label: "Field devices",
          text: "Sensors, meters, valves and actuators on every plant and floor.",
          image: P + "sensors.jpg",
        },
        {
          label: "Controllers",
          text: "DDC controllers and integrators that run each plant and read third party equipment.",
          image: P + "ddc-panel.jpg",
        },
        {
          label: "Supervisory layer",
          text: "Supervisory controllers hold schedules and a second copy of the data.",
          image: P + "network.jpg",
        },
        {
          label: "Head end",
          text: "Servers and workstations with graphics, trends, alarms and reports.",
          image: P + "workstation.jpg",
        },
        {
          label: "Cloud and AI",
          text: "Analytics above the BMS for monitoring, prediction and savings.",
          image: P + "cloud.jpg",
        },
      ],
      aside: [
        {
          label: "What we integrate, and how",
          style: "cards",
          items: [
            {
              title: "What we integrate",
              text: "Chillers and plant managers, drives and pumps, energy meters, DG sets and UPS, fire alarm, lifts, water and sewage plant, solar.",
            },
            {
              title: "Protocols and platforms",
              text: "BACnet IP and MS/TP, Modbus, LON and SNMP. Delivered on Honeywell WEBs on the Niagara framework, on Siemens, and on PLC based control.",
            },
          ],
        },
      ],
    },
    {
      // Deck 09, slide 9
      kind: "gallery",
      id: "operator-graphics",
      nav: "Operator graphics",
      eyebrow: "Operator graphics",
      title: "From the campus to the plant to a single unit.",
      lede: "Operator screens from two of our projects, redrawn in one style. Trends and alarms are on every page.",
      items: [
        {
          src: S + "bitsom-campus.jpg",
          title: "Campus overview",
          place: "BITSoM, Kalyan",
        },
        {
          src: S + "bitsom-chiller-plant.jpg",
          title: "Chiller plant manager",
          place: "BITSoM, Kalyan",
        },
        {
          src: S + "bitsom-ahu-trend.jpg",
          title: "Air handling unit with trend",
          place: "BITSoM, Kalyan",
        },
        {
          src: S + "bitsom-floor-summary.jpg",
          title: "Floor summary",
          place: "BITSoM, Kalyan",
        },
        {
          src: S + "bitsom-lt-panel.jpg",
          title: "Main LT panel status",
          place: "BITSoM, Kalyan",
        },
        {
          src: S + "atc-building.jpg",
          title: "Building overview",
          place: "ATC Tower, Kolkata",
        },
        {
          src: S + "atc-ahu-heat-recovery.jpg",
          title: "Air handling and heat recovery",
          place: "ATC Tower, Kolkata",
        },
        {
          src: S + "atc-chiller-plant.jpg",
          title: "Chiller plant",
          place: "ATC Tower, Kolkata",
        },
      ],
      note: "BITSoM runs on Honeywell WEBs on the Niagara framework. ATC Tower Kolkata runs on Siemens. Names and values follow the screens our team built.",
      tone: "soft",
    },
    {
      // Deck 09, slide 11
      kind: "tiles",
      id: "references",
      eyebrow: "BMS and ELV references",
      title: "Standalone contracts and inside our MEP packages.",
      lede: "For campuses, offices, hospitals, plants and data centres.",
      columns: 4,
      items: [
        {
          name: "Nalanda University",
          slug: "nalanda-university",
          place: "Rajgir, Bihar",
          scope: "IBMS for a net zero campus, with AMC",
        },
        {
          name: "BITSoM campus",
          slug: "bitsom-mumbai",
          place: "Kalyan, Mumbai",
          scope: "Integrated BMS across 21 blocks",
        },
        {
          name: "Prestige BKC 101",
          slug: "prestige-bkc-101",
          place: "Mumbai",
          scope: "BMS, fire alarm, voice evacuation, ELV and security",
        },
        {
          name: "IKEA, INGKA Centre",
          slug: "ingka-centre-ikea",
          place: "Noida",
          scope: "Chiller plant manager and HVAC plant controls",
        },
        {
          name: "Foxconn",
          slug: "foxconn-bangalore",
          place: "Bengaluru",
          scope: "PLC control of AHUs and MAUs in 13 buildings",
        },
        {
          name: "CtrlS data centres",
          slug: "ctrls-mahape-mumbai",
          place: "Navi Mumbai and Hyderabad",
          scope: "IBMS, EPMS, VESDA, access control and CCTV",
        },
        {
          name: "ATC Tower",
          slug: "atc-tower-kolkata",
          place: "Kolkata",
          scope: "IBMS with the MEP package",
        },
        {
          name: "AIIMS",
          slug: "aiims-jammu",
          place: "Jammu",
          scope: "IBMS with the HVAC package",
        },
      ],
      also: {
        label: "Also delivered",
        items: [
          "Bose Institute, Kolkata",
          "Burari Hospital, New Delhi",
          "ASI, Greater Noida",
          "Sky Mansion, New Delhi",
        ],
      },
    },
    {
      kind: "showcase",
      id: "projects",
      nav: "Projects",
      eyebrow: "Projects",
      title: "Five projects in detail.",
      projects: [
        "bms-nalanda",
        "bms-bitsom",
        "bms-prestige",
        "bms-ikea",
        "bms-foxconn",
      ],
      tone: "soft",
    },
    {
      // Deck 09, slides 14, 15, 17, 18 and 19
      kind: "sheets",
      id: "scope-in-detail",
      nav: "Scope in detail",
      eyebrow: "Scope and delivery in detail",
      title: "The BITSoM campus and Prestige BKC 101.",
      layout: "top",
      sheets: [
        {
          label: "BITSoM: the system",
          title: "BMS at the BITSoM campus",
          lede: "Supply, installation, testing and commissioning of one integrated BMS for 21 blocks, on Honeywell WEBs with BACnet IP.",
          steps: [
            {
              label: "Field devices",
              text: "Sensors and switches on air, water, transformers and DG sets.",
            },
            {
              label: "DDC controllers",
              text: "IP controllers in panels in the electrical and hub rooms.",
            },
            {
              label: "Integrators",
              text: "Gateways that read third party plant over BACnet and Modbus.",
            },
            {
              label: "Campus network",
              text: "Network switches and racks in the blocks, linked on fibre.",
            },
            {
              label: "Supervisory",
              text: "Three supervisory controllers of 10,000 points each.",
            },
            {
              label: "Head end",
              text: "Server, three client licences and ten web clients.",
            },
          ],
          stats: [
            { value: "21", label: "Blocks on one BMS" },
            { value: "41", label: "DDC controllers" },
            { value: "78", label: "Integrators for third party plant" },
            {
              value: "About 34,000",
              label: "Points: 2,157 hardwired, 31,745 integrated",
            },
          ],
          groups: [
            {
              label: "What the BMS monitors and controls",
              style: "cards",
              items: [
                {
                  title: "Air conditioning",
                  text: "Air handling units with EC fans, ceiling suspended and fan coil units, heat recovery units, and VRF in the hostels.",
                },
                {
                  title: "Electrical",
                  text: "Energy meters and load managers in the blocks, UPS, transformer temperatures and DG sets.",
                },
                {
                  title: "Water",
                  text: "Fire, domestic and flushing tank levels on 57 transmitters, and the sewage and water treatment plants.",
                },
                {
                  title: "Lifts and fire alarm",
                  text: "Lifts in the blocks, and the fire alarm panels read over a BACnet interface.",
                },
                {
                  title: "Ventilation",
                  text: "Supply and exhaust fans, scrubbers in the dining hall, and 167 filter status switches.",
                },
                {
                  title: "Software",
                  text: "Operating logic for the whole HVAC system, alarms, trends and reports, with 20 percent spare points.",
                },
              ],
            },
          ],
          note: "Counts are from the IO point summary and bill of quantities in our offer and kick off documents.",
        },
        {
          label: "BITSoM: delivery",
          title: "How the BITSoM BMS was delivered",
          lede: "The kick off meeting was held on 7 May 2026 with the project documents prepared in advance. Site work followed in building waves.",
          steps: [
            {
              label: "Kick off",
              text: "7 May 2026, with the draft project documents tabled for review.",
            },
            {
              label: "Submittals",
              text: "97 datasheets, 67 drawings and 19 IO summaries taken through approval.",
            },
            {
              label: "Material",
              text: "First material received at site on 17 June 2026.",
            },
            {
              label: "Cabling",
              text: "Started on 18 June. About 16,700 m laid in the first four weeks.",
            },
            {
              label: "Panels and devices",
              text: "DDC panels, integrators, sensors and the campus network installed.",
            },
            {
              label: "Commissioning",
              text: "Graphics, logic, point by point testing, training and handover.",
            },
          ],
          groups: [
            {
              label: "In the kick off pack",
              style: "cards",
              items: [
                {
                  title: "Stakeholder register and RACI",
                  text: "30 stakeholders, and more than 60 activities each with one accountable owner",
                },
                {
                  title: "Escalation matrix",
                  text: "Four levels, from same day at site to the Managing Director",
                },
                {
                  title: "Schedule at three levels",
                  text: "10 phases, 26 work packages and 133 activities with a critical path",
                },
                {
                  title: "TDS and procurement tracker",
                  text: "Every bill item with its submittal, order and delivery status",
                },
                {
                  title: "Drawing submittal register",
                  text: "Every drawing with target and actual submission and approval dates",
                },
                {
                  title: "Quality plan and inspection and test plan",
                  text: "28 checks and 7 hold points, from material receipt to handover",
                },
              ],
            },
            {
              label: "On the project",
              style: "timings",
              items: [
                {
                  title: "6 weeks",
                  text: "From the kick off meeting to the first cable on site",
                },
                {
                  title: "25 to 30",
                  text: "People planned at peak, on site and at head office",
                },
                {
                  title: "3 years",
                  text: "Defect liability period after handover",
                },
              ],
            },
          ],
          note: "Also in the pack: a manpower mobilisation plan in five phases, a risk register of 20 risks, the method statement, HSE plan and site logistics plan.",
        },
        {
          label: "Prestige: BMS",
          title: "BMS at Prestige BKC 101",
          lede: "Design, supply, installation, testing and commissioning of the building management system for the office tower and the hotel, on one architecture.",
          steps: [
            {
              label: "Field devices",
              text: "Sensors for temperature, humidity, CO2, pressure and level.",
            },
            {
              label: "Controllers",
              text: "DDC controllers in lockable panels, on BACnet IP.",
            },
            {
              label: "Integration",
              text: "Plant with its own controls, read over BACnet and Modbus gateways.",
            },
            {
              label: "Network",
              text: "Fibre backbone, with BMS switches and racks in the ELV rooms.",
            },
            {
              label: "Head end",
              text: "Servers with hot standby, graphics, alarms, trends and web access.",
            },
            {
              label: "Reports",
              text: "Tenant energy bills and energy analysis from the same data.",
            },
          ],
          stats: [
            { value: "193", label: "DDC controllers: 131 office, 62 hotel" },
            { value: "10", label: "Third party systems integrated" },
            {
              value: "912",
              label: "Chilled and condenser water temperature sensors",
            },
            {
              value: "1 year",
              label: "Operation and maintenance after handover",
            },
          ],
          groups: [
            {
              label: "What the BMS controls and monitors",
              style: "cards",
              items: [
                {
                  title: "Chiller plant",
                  text: "Five water cooled chillers, cooling towers and variable speed pumps, through the plant optimiser.",
                },
                {
                  title: "Air side",
                  text: "Air handling, fresh air and fan coil units on every floor, with VAV and VRF units in the hotel.",
                },
                {
                  title: "Ventilation and smoke control",
                  text: "Basement jet fans, exhaust fans, and staircase and lift lobby pressurisation fans.",
                },
                {
                  title: "Water and electrical",
                  text: "Pumps, tank levels and the municipal water meter. LT panels on every floor, UPS and DG sets.",
                },
                {
                  title: "Tenant metering",
                  text: "Chilled water BTU meters and electricity meters for each tenant, with bills raised from the BMS.",
                },
                {
                  title: "Lifts, fire and parking",
                  text: "Lifts, fire alarm, car park ventilation and parking management read on the same head end.",
                },
              ],
            },
          ],
          note: "Quantities are from the contract bills of quantities and are confirmed in the approved shop drawings.",
        },
        {
          label: "Prestige: fire alarm",
          title: "Fire alarm at Prestige BKC 101",
          lede: "Addressable fire alarm and voice evacuation for the office tower and the hotel, with every life safety interface proved as one sequence.",
          steps: [
            {
              label: "Detect",
              text: "Addressable detectors in every room, ceiling void and plant space.",
            },
            {
              label: "Confirm",
              text: "One detector alerts. A second detector or a timeout raises the alarm.",
            },
            {
              label: "Evacuate",
              text: "Voice messages zone by zone, with live paging from the control room.",
            },
            {
              label: "Control",
              text: "Lifts recalled, pressurisation fans started, dampers and doors released.",
            },
            {
              label: "Report",
              text: "Status to the repeater panels, and to the BMS over a tested BACnet gateway.",
            },
          ],
          stats: [
            { value: "About 6,000", label: "Addressable detectors" },
            { value: "About 2,800", label: "Voice evacuation speakers" },
            { value: "312", label: "Cause and effect mappings" },
            {
              value: "6",
              label: "Networked fire alarm panels, with 5 repeaters",
            },
          ],
          groups: [
            {
              label: "What we supply, install and prove",
              style: "cards",
              items: [
                {
                  title: "Panels and network",
                  text: "Six networked fire alarm panels and five repeater panels, linked between the buildings on fibre.",
                },
                {
                  title: "Detection",
                  text: "Smoke, heat, multi criteria and carbon monoxide detectors, with beam and gas detection.",
                },
                {
                  title: "Alarm devices",
                  text: "About 280 manual call points and 700 sounders and strobes, with fire fighter telephone points.",
                },
                {
                  title: "Voice evacuation",
                  text: "Digital amplifiers, zone paging, and ceiling, wall and horn speakers in both buildings.",
                },
                {
                  title: "Interfaces",
                  text: "About 1,750 control, monitor and relay modules to lifts, fans, dampers, doors and DG sets.",
                },
                {
                  title: "Testing",
                  text: "Gateway tested at the works, four phases of site testing, then a witnessed demonstration to the fire authority.",
                },
              ],
            },
          ],
          note: "System to UL 864 and NFPA 72. Quantities are from the contract bills of quantities and are confirmed in the approved shop drawings.",
        },
        {
          label: "Prestige: ELV and security",
          title: "ELV and security at Prestige BKC 101",
          lede: "Security, network and communication systems for the office tower, from containment and cabling to head end and commissioning.",
          steps: [
            {
              label: "Site entry",
              text: "Boom barriers, road barriers and long range vehicle tag readers at the gates.",
            },
            {
              label: "Lobby",
              text: "Baggage scanners, walk through metal detectors and visitor management.",
            },
            {
              label: "Lift lobby",
              text: "Flap barriers with card readers, linked to the lift destination control.",
            },
            {
              label: "Office floors",
              text: "Access controlled doors, CCTV, Wi Fi and data points on every floor.",
            },
            {
              label: "Control room",
              text: "Video, access and intruder alarm software, with a display wall.",
            },
          ],
          stats: [
            { value: "888", label: "IP cameras" },
            { value: "125", label: "Access controllers, four doors each" },
            { value: "300", label: "Wi Fi 6 access points" },
            { value: "About 1,400", label: "CAT6 data points" },
          ],
          groups: [
            {
              label: "What we supply, install and commission",
              style: "cards",
              items: [
                {
                  title: "CCTV",
                  text: "Dome and bullet cameras, with video management, recording servers, storage and monitoring workstations.",
                },
                {
                  title: "Access control",
                  text: "About 450 readers and 420 electromagnetic locks, with duress alarms, intruder alarm and time and attendance.",
                },
                {
                  title: "Physical security",
                  text: "9 boom barriers, 4 road barriers, 12 flap barrier lanes, 5 baggage scanners and 5 metal detector gates.",
                },
                {
                  title: "Structured cabling",
                  text: "CAT6 to every point and a fibre backbone with primary and backup routes, racks and patching.",
                },
                {
                  title: "Network and Wi Fi",
                  text: "Core and PoE switches, wireless controllers, and wireless links to the lift cars.",
                },
                {
                  title: "Tenant and landlord services",
                  text: "Tenant fibre risers, DTH, telephone exchange, digital signage, and server, ISP and mobile signal rooms.",
                },
              ],
            },
          ],
          note: "Hotel ELV is by others. Quantities are from the contract bill of quantities and are confirmed in the approved shop drawings.",
        },
      ],
    },
    {
      // Deck 09, slide 23
      kind: "process",
      id: "intelligent-buildings",
      nav: "Intelligent buildings",
      eyebrow: "Intelligent building solutions",
      title: "What is about to fail, and where money is being lost.",
      lede: "A BMS shows what is happening now. The cloud and AI layer we add shows what is about to fail and where money is being lost.",
      variant: "auto",
      steps: [
        {
          label: "Connect",
          text: "BMS, meters and plant data from the building sent to a cloud platform.",
          image: P + "network.jpg",
        },
        {
          label: "Monitor",
          text: "Every building on one dashboard, on any device, watched by our service desk.",
          image: P + "cloud.jpg",
        },
        {
          label: "Predict",
          text: "AI models learn normal behaviour and flag drift and faults before failure.",
          image: P + "pump-sensor.jpg",
        },
        {
          label: "Optimise",
          text: "Wasted energy found and costed, with the action that fixes it.",
          image: P + "meters.jpg",
        },
      ],
      aside: [
        {
          label: "Our role",
          style: "cards",
          items: [
            {
              title: "Implement",
              text: "We survey the building, connect the BMS and plant, and configure the platform.",
            },
            {
              title: "Maintain",
              text: "Our engineers keep the BMS, the sensors and the platform working under AMC.",
            },
            {
              title: "Improve",
              text: "Insights are reviewed with you every quarter, with actions and savings.",
            },
          ],
        },
      ],
      tone: "soft",
    },
    {
      // Deck 09, slide 24
      kind: "cards",
      id: "solutions",
      eyebrow: "Solutions we offer",
      title: "Cloud and AI solutions we implement and maintain.",
      lede: "They sit above the BMS and work across one building or a portfolio.",
      columns: 4,
      items: [
        {
          meta: "Maintenance",
          title: "Predictive maintenance",
          text: "Analytics and equipment models show asset availability and performance problems across a portfolio, and track each service case to closure.",
        },
        {
          meta: "Sustainability",
          title: "Carbon and energy",
          text: "Energy data brought together to monitor, control and optimise consumption and scope 1 and 2 emissions, with reports for ESG disclosure.",
        },
        {
          meta: "Operations",
          title: "One interface",
          text: "Building software, systems and devices managed through a single interface, on any device.",
        },
        {
          meta: "Automation",
          title: "AI agents",
          text: "AI agents for facility operations: managing alarms, predicting equipment issues and finding energy savings.",
        },
      ],
      more: {
        label: "What we do",
        items: [
          {
            title: "Assess",
            text: "Which solutions fit your building, its BMS and its metering.",
          },
          {
            title: "Implement",
            text: "Connect the site, map the points, and set up dashboards, rules and users.",
          },
          {
            title: "Operate",
            text: "Watch the alerts, act on service cases and maintain the system under AMC.",
          },
        ],
      },
      note: "Your BMS, meters and plant feed a cloud platform, which returns dashboards, service cases and reports.",
    },
    {
      // Deck 09, slides 25 to 28
      kind: "sheets",
      id: "cloud-and-ai",
      nav: "Cloud and AI",
      eyebrow: "Cloud and AI services",
      title: "Predict, monitor, find the waste, and stay accountable.",
      layout: "top",
      sheets: [
        {
          label: "AI predictive maintenance",
          title: "AI predictive maintenance",
          lede: "Faults are found from the data while the equipment is still running, so repairs are planned and not emergencies.",
          image: P + "pump-sensor.jpg",
          steps: [
            {
              label: "Baseline",
              text: "Models learn how each chiller, pump and AHU behaves when healthy.",
            },
            {
              label: "Detect",
              text: "Drift in temperature, power, vibration or valve response is flagged early.",
            },
            {
              label: "Diagnose",
              text: "Each fault is ranked by cost and risk, with its likely cause.",
            },
            {
              label: "Act",
              text: "A service case is raised and our engineer attends with the right part.",
            },
            {
              label: "Verify",
              text: "The trend is checked after the fix and the case is closed.",
            },
          ],
          groups: [
            {
              label: "What you get",
              style: "cards",
              items: [
                {
                  title: "Asset health dashboard",
                  text: "Every monitored asset with its condition and trend",
                },
                {
                  title: "Ranked fault list",
                  text: "What to fix first, and what waiting will cost",
                },
                {
                  title: "Service case tracking",
                  text: "Each case from alert to closure, with evidence",
                },
              ],
            },
            {
              label: "What is tracked",
              style: "chips",
              items: [
                { title: "Asset availability", text: "" },
                { title: "Zone comfort", text: "" },
                { title: "Energy consumption", text: "" },
                { title: "Service case performance", text: "" },
              ],
            },
          ],
        },
        {
          label: "Cloud monitoring",
          title: "Cloud monitoring",
          lede: "Every building on one dashboard, watched by our service desk and visible to you on any device.",
          image: P + "cloud.jpg",
          groups: [
            {
              label: "What it gives you",
              style: "cards",
              items: [
                {
                  title: "Portfolio view",
                  text: "Comfort, energy, alarms and asset status for all your buildings in one place.",
                },
                {
                  title: "Alarm handling",
                  text: "Alarms prioritised and sent to our service desk, not left on a screen in the plant room.",
                },
                {
                  title: "Remote diagnostics",
                  text: "Schedules, setpoints and minor logic changed remotely, without a site visit.",
                },
                {
                  title: "Reports and backups",
                  text: "Asset health and energy reports every quarter, with controller configurations and trend logs backed up.",
                },
              ],
            },
            {
              label: "What is watched",
              style: "chips",
              items: [
                { title: "Comfort", text: "" },
                { title: "Energy", text: "" },
                { title: "Alarms", text: "" },
                { title: "Asset health", text: "" },
                { title: "Schedules", text: "" },
                { title: "Controllers and network", text: "" },
              ],
            },
          ],
        },
        {
          label: "AI insights",
          title: "AI insights",
          lede: "A pilot audit on a net zero university campus. AI agents read the BMS trend logs, found the faults and the waste, and put a rupee value on each fix.",
          stats: [
            {
              value: "7",
              label: "Plant areas audited",
              note: "Plant rooms and air handling units across the campus",
            },
            {
              value: "19",
              label: "Trend log files",
              note: "Temperature, power, valve feedback and equipment status",
            },
            {
              value: "15",
              label: "Sensor faults found",
              note: "Seven of them critical to billing or control",
            },
            {
              value: "₹8.14 lakh",
              label: "A year from one schedule change",
              note: "No capital, and payback inside one month",
            },
          ],
          groups: [
            {
              label: "What the data showed",
              style: "cards",
              items: [
                {
                  title: "Storage charged at peak tariff",
                  text: "The thermal storage tank was being charged in the morning peak. Moving it to 22:00 to 06:00 saves ₹8.14 lakh a year.",
                },
                {
                  title: "Chilled water returning unused",
                  text: "Delta T of 0.77°C against a design of 5.5 to 7°C, traced to a valve stuck open in one building.",
                },
                {
                  title: "Sensors that could not be trusted",
                  text: "Open circuits, frozen readings and impossible values, found from the data before any site visit.",
                },
                {
                  title: "Units running through the night",
                  text: "An empty hall held at 19.5°C at 3 am. A night schedule and a higher setpoint fix it at no cost.",
                },
              ],
            },
            {
              label: "Measured against design",
              style: "timings",
              items: [
                { title: "5.5°C", text: "Chilled water delta T, design" },
                { title: "0.77°C", text: "Chilled water delta T, measured" },
                {
                  title: "₹7.50",
                  text: "Peak tariff a unit, against ₹4.50 off peak",
                },
              ],
            },
          ],
          note: "Pilot audit, March 2026. Savings are annual estimates from measured power and the site tariff, each checked independently before it was reported. A further ₹2.50 lakh a year was verified for drives on the chilled water pumps.",
        },
        {
          label: "Implement and maintain",
          title: "Implement and maintain",
          lede: "We put the platform in, keep the BMS under it healthy, and stay accountable for the results under a comprehensive AMC.",
          steps: [
            {
              label: "Audit",
              text: "Existing BMS, sensors and sequences checked; faults listed and costed.",
            },
            {
              label: "Connect",
              text: "BMS, meters and plant data connected to the cloud platform.",
            },
            {
              label: "Configure",
              text: "Points mapped, dashboards built, alarms and rules set with your team.",
            },
            {
              label: "Operate",
              text: "Our service desk watches alarms and asset health, and attends site.",
            },
            {
              label: "Review",
              text: "Faults closed, energy saved and next actions reviewed every quarter.",
            },
          ],
          groups: [
            {
              label: "Comprehensive AMC",
              style: "cards",
              items: [
                {
                  title: "Preventive maintenance",
                  text: "Health checks, firmware updates, backups and calibration",
                },
                {
                  title: "Corrective maintenance",
                  text: "On site support for faults and breakdowns",
                },
                {
                  title: "Remote support",
                  text: "Alarm and schedule optimisation, remote diagnostics",
                },
                {
                  title: "Reporting",
                  text: "Quarterly reports with asset health and recommendations",
                },
                {
                  title: "Spares",
                  text: "Faulty BMS components replaced under the contract",
                },
                {
                  title: "Records",
                  text: "Controller configurations and trend logs backed up",
                },
              ],
            },
            {
              label: "Visits and term",
              style: "timings",
              items: [
                {
                  title: "Q1 and Q2",
                  text: "Full system audit, then sensor calibration",
                },
                {
                  title: "Q3 and Q4",
                  text: "Network diagnostics, then the year end review and backup",
                },
                {
                  title: "10 years",
                  text: "Comprehensive AMC term offered, renewable",
                },
              ],
            },
          ],
          note: "Seven client sites are on AMC and O&M with our service team today.",
        },
      ],
      tone: "soft",
    },
    deliveryBlock("bms", { tone: "plain" }),
    {
      // Deck 09, slide 39
      kind: "lists",
      id: "method-library",
      eyebrow: "Method statement library",
      title: "A controlled library for ELV and BMS work.",
      lede: "The core set is issued for every package, with the extension that matches the facility.",
      stats: [
        { value: "28", label: "Method statements" },
        { value: "16", label: "Core methods" },
        { value: "12", label: "Industry extensions" },
        { value: "196", label: "Controlled pages" },
      ],
      columns: 4,
      groups: [
        {
          title: "Controls and automation",
          items: [
            "Panel manufacture and factory testing",
            "Field device installation and calibration",
            "Point to point verification",
            "Sequence and cause and effect testing",
            "Third party integration and data ownership",
            "Alarm philosophy and escalation",
            "Energy metering and reporting",
            "Graphics, trends and operator handover",
          ],
        },
        {
          title: "ELV systems and integrated testing",
          items: [
            "Containment, routing and segregation",
            "Structured cabling and certification",
            "Video surveillance commissioning",
            "Access control and egress interface",
            "Public address and voice alarm",
            "Fire detection interface",
            "Network segmentation and access control",
            "Integrated ELV and BMS systems testing",
          ],
        },
        {
          title: "Cleanroom and industrial",
          items: [
            "Cleanroom pressure cascade control",
            "Particle and contamination monitoring",
            "Facility monitoring and process utilities",
            "SCADA, PLC and historian architecture",
            "MCC and drive integration",
            "Hazardous area ELV and shutdown interface",
          ],
        },
        {
          title: "Pharmaceutical and real estate",
          items: [
            "GxP environmental monitoring",
            "Computerised system validation",
            "Cold chain and chamber monitoring",
            "In residence automation",
            "Security for gated developments",
            "Tenant sub metering",
          ],
        },
      ],
      tone: "soft",
    },
    {
      kind: "related",
      id: "case-studies",
      eyebrow: "Case studies",
      title: "From the project archive.",
    },
  ],
};

/* ------------------------------------------------------------------
   Operations and maintenance
   ------------------------------------------------------------------ */
const om: ServiceCap = {
  stats: [
    {
      value: "7",
      label: "Client sites on AMC and O&M",
      note: "Served by our field engineers and technicians",
    },
    {
      value: "36 months",
      label: "On site operation after STPI Mohali",
      note: "Comprehensive maintenance under the CPWD agreement",
    },
    {
      value: "10 years",
      label: "Comprehensive AMC term offered",
      note: "For BMS and controls, renewable",
    },
    {
      value: "8",
      label: "Amity campuses and schools",
      note: "FY17 to date, with lifecycle O&M",
    },
  ],
  blocks: [
    {
      kind: "cards",
      id: "what-we-deliver",
      nav: "What we deliver",
      eyebrow: "After handover",
      title: "Support through the defects liability period and beyond.",
      lede: "AMC and O&M from our service team, on seven client sites today.",
      columns: 3,
      numbered: true,
      items: [
        {
          title: "Defects liability period",
          text: "Service engineers attend defects through the defects liability period.",
        },
        {
          title: "AMC and O&M",
          text: "AMC and O&M service across seven client sites with a field team of engineers and technicians.",
        },
        {
          title: "Preventive and predictive maintenance",
          text: "Preventive and predictive maintenance and rapid response teams, including continuous HVAC operation for NCR hospitals in the pandemic.",
        },
        {
          title: "Trained operating team",
          text: "Your operating team trained on the installed systems, with a complete handover record.",
        },
        {
          title: "Remote monitoring",
          text: "Every building on one dashboard, watched by our service desk and visible to you on any device.",
        },
        {
          title: "Operating data kept for analysis",
          text: "BMS audit, alarm rationalisation, anomaly detection and lifecycle insight from operating data on O&M and Intelligent Solutions sites.",
        },
      ],
    },
    {
      kind: "cards",
      id: "by-industry",
      nav: "On our projects",
      eyebrow: "On our projects",
      title: "Systems we built and then kept running.",
      columns: 4,
      items: [
        {
          meta: "STPI Incubation Centre, Mohali",
          title: "36 months of operation",
          text: "Data centre grade cooling and controls delivered and then operated for three years inside a government contracting framework.",
        },
        {
          meta: "Nalanda University",
          title: "Annual maintenance",
          text: "Annual maintenance by our service team, with the operating data kept for analysis.",
        },
        {
          meta: "Amity Group",
          title: "Lifecycle O&M",
          text: "Eight campuses and schools since FY17: universities and schools with lifecycle O&M.",
        },
        {
          meta: "Prestige BKC 101",
          title: "One year after handover",
          text: "Operation and maintenance of the building management system for one year after handover.",
        },
      ],
      tone: "soft",
    },
    {
      // Deck 09, slide 28
      kind: "sheets",
      id: "amc",
      nav: "Comprehensive AMC",
      eyebrow: "Comprehensive AMC",
      title: "Keep the systems healthy, and stay accountable for the results.",
      sheets: [
        {
          label: "Comprehensive AMC",
          title: "Implement and maintain",
          lede: "For BMS and controls: we keep the system healthy and stay accountable for the results under a comprehensive AMC.",
          steps: [
            {
              label: "Audit",
              text: "Existing BMS, sensors and sequences checked; faults listed and costed.",
            },
            {
              label: "Connect",
              text: "BMS, meters and plant data connected to the cloud platform.",
            },
            {
              label: "Configure",
              text: "Points mapped, dashboards built, alarms and rules set with your team.",
            },
            {
              label: "Operate",
              text: "Our service desk watches alarms and asset health, and attends site.",
            },
            {
              label: "Review",
              text: "Faults closed, energy saved and next actions reviewed every quarter.",
            },
          ],
          groups: [
            {
              label: "What it covers",
              style: "cards",
              items: [
                {
                  title: "Preventive maintenance",
                  text: "Health checks, firmware updates, backups and calibration",
                },
                {
                  title: "Corrective maintenance",
                  text: "On site support for faults and breakdowns",
                },
                {
                  title: "Remote support",
                  text: "Alarm and schedule optimisation, remote diagnostics",
                },
                {
                  title: "Reporting",
                  text: "Quarterly reports with asset health and recommendations",
                },
                {
                  title: "Spares",
                  text: "Faulty BMS components replaced under the contract",
                },
                {
                  title: "Records",
                  text: "Controller configurations and trend logs backed up",
                },
              ],
            },
            {
              label: "Visits and term",
              style: "timings",
              items: [
                {
                  title: "Q1 and Q2",
                  text: "Full system audit, then sensor calibration",
                },
                {
                  title: "Q3 and Q4",
                  text: "Network diagnostics, then the year end review and backup",
                },
                {
                  title: "10 years",
                  text: "Comprehensive AMC term offered, renewable",
                },
              ],
            },
          ],
        },
      ],
    },
    ...tail(),
  ],
};

export const SERVICE_PAGES: Record<string, ServiceCap> = {
  "hvac-company-in-gurgaon": hvac,
  "electrical-contractors-in-gurgaon": electrical,
  "fire-fighting-contractors-in-gurgaon": fire,
  "plumbing-services-in-gurgaon": plumbing,
  ibms: bms,
  "civil-interior-contractors-in-gurgaon": civil,
  "solar-epc-contractors-in-gurgaon": solar,
  "precision-process-engineering": process,
  "operations-maintenance": om,
};

export function getServicePage(slug: string): ServiceCap | null {
  return SERVICE_PAGES[slug] ?? null;
}
