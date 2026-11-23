/**
 * Blocks shared by every capability page.
 *
 * Source: 06_UEL_High_End_Mixed_Use_Capability.pptx, sections 04
 * (Why Unique Engineers, slides 26 to 31) and 05 (How we deliver,
 * slides 33 to 42), and 09_UEL_BMS_and_ELV_Capability.pptx section 05
 * for the BMS and ELV variant. Wording follows the slides. Names of
 * individual department heads are left off the public site.
 */
import type { CapBlock, CapItem, CapSheet, CapStat, CapStep } from "./types";
import { WHY_PAGES } from "@/data/why-unique";

const P = "/capability/process/";

/* ------------------------------------------------------------------
   04 Why Unique Engineers
   ------------------------------------------------------------------ */

/**
 * Deck 06, slide 26. The first card is replaced per industry.
 * A card with `href` opens the page that tells that point in full
 * (src/data/capability/value.ts), so each is written in one place only.
 */
export const WHY_VALUE_ADDITIONS: CapItem[] = [
  ...WHY_PAGES.map((p) => ({
    title: p.name,
    text: p.text,
    href: `/why-unique/${p.slug}`,
  })),
  {
    title: "In house design and BIM",
    text: "50 design engineers, BIM coordinators and modellers produce coordinated shop drawings for every project.",
  },
  {
    title: "One contract",
    text: "MEPF, BMS, solar and civil works from one organisation, with a single point of accountability.",
  },
  {
    title: "Head office procurement",
    text: "Every order placed at head office on a rate library and annual rate contracts, with standing OEM relationships.",
  },
];

export function whyBlock(opts?: {
  lede?: string;
  first?: CapItem;
  tone?: "plain" | "soft";
}): CapBlock {
  const items = opts?.first
    ? [opts.first, ...WHY_VALUE_ADDITIONS.slice(0, 7)]
    : WHY_VALUE_ADDITIONS;
  return {
    kind: "cards",
    id: "why",
    nav: "Why Unique",
    eyebrow: "Why Unique Engineers",
    title: "Value we add beyond installing the specification.",
    lede:
      opts?.lede ??
      "Eight things clients get from us in addition to the installation itself. The first five each have a page of their own.",
    items,
    columns: 4,
    numbered: true,
    tone: opts?.tone ?? "soft",
  };
}

/** Deck 06, slide 27. */
export const DFMA_STEPS: CapStep[] = [
  {
    label: "Receiving and storage",
    text: "Approved material matched to the submittal, inspected, tagged and protected.",
    image: P + "receiving.jpg",
  },
  {
    label: "Fabrication bays",
    text: "Cut, groove, thread, weld and drill on calibrated machines to released lengths.",
    image: P + "fabrication.jpg",
  },
  {
    label: "Module assembly",
    text: "Built on jigs to frozen dimensions, with fixed datums and repeatable joints.",
    image: P + "module.jpg",
  },
  {
    label: "QA and dispatch",
    text: "Tested, recorded and packed with caps, covers and a traceable module ID.",
    image: P + "pressure-test.jpg",
  },
  {
    label: "Site integration",
    text: "Lifted to the released landing zone, aligned and interconnected.",
    image: P + "module-lift.jpg",
  },
];

/** Deck 06, slide 27, and deck 08, slide 13. */
export const DFMA_GATES: CapItem[] = [
  {
    meta: "G1",
    title: "Material and certificates",
    text: "Incoming material checked against the approved submittal and certificate of conformity.",
  },
  {
    meta: "G2",
    title: "BIM and dimensions",
    text: "Module checked against the frozen model: lengths, datums and connection points.",
  },
  {
    meta: "G3",
    title: "Weld, groove and torque",
    text: "Joints inspected for weld quality, groove profile and bolt torque.",
  },
  {
    meta: "G4",
    title: "Pressure, IR and function",
    text: "Pressure tests on piping, insulation resistance on electrical, functional checks on skids.",
  },
  {
    meta: "G5",
    title: "Dossier and dispatch",
    text: "Records closed; module tagged, protected and released for transport.",
  },
];

export function dfmaBlock(opts?: {
  lede?: string;
  note?: string;
  tone?: "plain" | "soft";
}): CapBlock {
  return {
    kind: "process",
    id: "dfma",
    nav: "Prefabrication",
    eyebrow: "DfMA and modular MEP",
    title: "Built and tested off site. Lifted in when the workfront is ready.",
    lede:
      opts?.lede ??
      "Assemblies are built and tested off site, then lifted in when the workfront is ready. No module leaves the workshop until its quality gates are closed.",
    variant: "auto",
    steps: DFMA_STEPS,
    aside: [
      { label: "Five gates before dispatch", style: "rail", items: DFMA_GATES },
    ],
    note:
      opts?.note ??
      "On our projects: AdaniConneX HYD 22 and HYD 23, Hyderabad, with fire protection and HVAC assemblies prefabricated off site.",
    tone: opts?.tone ?? "plain",
  };
}

/** Deck 06, slide 28. */
export function yardBlock(opts?: { tone?: "plain" | "soft" }): CapBlock {
  return {
    kind: "process",
    id: "yard",
    eyebrow: "Prefabrication yard at Bhondsi",
    title:
      "Made from the frozen model. Delivered in the order the site installs it.",
    lede: "Our own land, store and workshop at Bhondsi, Gurugram. Every assembly is made from the frozen model, tested, tagged and delivered in the order the site installs it.",
    variant: "pinned",
    steps: [
      {
        label: "Model frozen",
        text: "Coordinated model approved and frozen before fabrication.",
        image: P + "bim-model.jpg",
      },
      {
        label: "Spool and cut list",
        text: "Spool drawings and cut lists taken from the model.",
        image: P + "spool-drawings.jpg",
      },
      {
        label: "Produce and test",
        text: "Cut, grooved, threaded and assembled; every spool tested.",
        image: P + "fabrication.jpg",
      },
      {
        label: "Tag",
        text: "QR label from the model record fixed to every assembly.",
        image: P + "tagged-spools.jpg",
      },
      {
        label: "Kit",
        text: "Packed by floor and zone with hangers and consumables.",
        image: P + "kit-wagon.jpg",
      },
      {
        label: "Booked slot",
        text: "Dispatched to a booked gate slot on the delivery plan.",
        image: P + "truck.jpg",
      },
      {
        label: "Hoist to the floor",
        text: "Scanned at the gate and again at the hoist landing.",
        image: P + "hoist.jpg",
      },
      {
        label: "Install and scan",
        text: "Scanned at installation; the tag record becomes the as built.",
        image: P + "scan.jpg",
      },
    ],
    aside: [
      {
        label: "Material flow",
        style: "cards",
        items: [
          {
            meta: "Tier 1",
            title: "Factory",
            text: "Pipe, valves, supports and plant made and tested by approved makers, with certificates.",
          },
          {
            meta: "Tier 2",
            title: "Bhondsi yard",
            text: "Spools, riser sets, branch trees, valve stations, support frames and kits prefabricated, tested and tagged.",
          },
          {
            meta: "Tier 3",
            title: "Site",
            text: "Coupled, pressed and bolted in place. Nothing cut, threaded or welded at height.",
          },
        ],
      },
    ],
    note: "One QR tag follows each assembly from the cut list to the as built record.",
    tone: opts?.tone ?? "soft",
  };
}

/** Deck 06, slide 29. */
export function floorKitBlocks(opts?: { tone?: "plain" | "soft" }): CapBlock[] {
  return [
    {
      kind: "process",
      id: "floor-kits",
      eyebrow: "Floor kits for repeating floors",
      title: "Engineered once. One kit per floor. One fix.",
      lede: "The typical floor is engineered once and built at Bhondsi as one kit per floor, so installation on site is quick, direct and done in one fix.",
      variant: "auto",
      steps: [
        {
          label: "Design once",
          text: "One typical floor is modelled, coordinated and frozen. The same design serves every repeating floor.",
          image: P + "floors.jpg",
        },
        {
          label: "Build the kit",
          text: "Riser set, spools, branch trees, supports and consumables for one floor, tested and tagged at the yard.",
          image: P + "kit-wagon.jpg",
        },
        {
          label: "Deliver by floor",
          text: "One kit per floor, sent in installation order to a booked slot and hoisted to the floor.",
          image: P + "truck.jpg",
        },
        {
          label: "One fix",
          text: "Coupled, pressed and bolted in a single visit. Nothing cut, threaded or welded at height.",
          image: P + "soffit.jpg",
        },
      ],
      tone: opts?.tone ?? "plain",
    },
    {
      kind: "compare",
      id: "floor-kits-compare",
      aLabel: "Conventional",
      bLabel: "Floor kit",
      rows: [
        {
          label: "Cutting and jointing",
          a: "On the floor, at height",
          b: "At the yard, on benches and jigs",
        },
        {
          label: "Material",
          a: "Loose, delivered trade by trade",
          b: "One tagged kit for each floor",
        },
        {
          label: "Checks",
          a: "After installation",
          b: "Tested at the yard, scanned at installation",
        },
      ],
      note: "Proposed for towers with repeating floors. The kit travels with its manifest, so the floor receives everything it needs in one delivery.",
      tone: opts?.tone ?? "plain",
    },
  ];
}

/** Deck 06, slide 30. */
export function aiBlock(opts?: { tone?: "plain" | "soft" }): CapBlock {
  return {
    kind: "cards",
    id: "ai",
    nav: "AI workflows",
    eyebrow: "AI native workflows",
    title: "Becoming AI native, workflow by workflow.",
    lede: "The ambition is practical: better decisions, faster synthesis and stronger traceability around human accountability.",
    numbered: true,
    columns: 4,
    items: [
      {
        title: "Data foundation",
        text: "Project registers, order book, HR data, method statement library and document standards kept as structured data so that trustworthy context is reusable across every workflow.",
      },
      {
        title: "AI copilots",
        text: "Tender and BOQ extraction, technical data sheet generation, method statement drafting, contract review and meeting synthesis, reviewed and signed by the accountable engineer.",
      },
      {
        title: "Delivery intelligence",
        text: "Schedule what if analysis, resource levelling, earned value signals, live PMO dashboards and risk summaries, so variance is seen while options remain.",
      },
      {
        title: "Asset intelligence",
        text: "BMS audit, alarm rationalisation, anomaly detection and lifecycle insight from operating data on O&M and Intelligent Solutions sites.",
      },
    ],
    more: {
      label: "In practice",
      items: [
        {
          title: "Method statement library",
          text: "76 controlled method statements built and maintained with AI assistance under engineer review: 19 for data centres, 29 for HVAC, 28 for ELV and BMS.",
        },
        {
          title: "Tender desk",
          text: "Specification and BOQ extraction into structured registers within hours of receipt, feeding estimation, compliance matrices and clarification logs.",
        },
        {
          title: "Programme generation",
          text: "MEPF programmes generated from the method library and issued to Primavera P6, so every baseline carries the same logic and durations.",
        },
        {
          title: "Head office leverage",
          text: "Growth without proportional overhead: a head office of about 100 supports every site team, and revenue per head office employee rises as projects scale.",
        },
      ],
    },
    note: "Building toward, human accountable, source traceable. Every AI generated document is reviewed and signed by the accountable engineer before it leaves the company.",
    tone: opts?.tone ?? "soft",
  };
}

/** Deck 06, slide 31. */
export function intelligentBuildingsBlock(opts?: {
  tone?: "plain" | "soft";
}): CapBlock {
  return {
    kind: "process",
    id: "intelligent-buildings",
    eyebrow: "Intelligent buildings",
    title: "AI embedded in the building controls.",
    lede: "It flags failures before they happen and shows where energy and money are being lost.",
    variant: "auto",
    steps: [
      {
        label: "Sense",
        text: "Meters, sensors and equipment data from every plant room and floor.",
        image: P + "sensors.jpg",
      },
      {
        label: "Learn",
        text: "AI models learn how each system behaves in normal operation.",
        image: P + "network.jpg",
      },
      {
        label: "Predict",
        text: "Drift and faults flagged early, so repairs are planned and not emergencies.",
        image: P + "workstation.jpg",
      },
      {
        label: "Save",
        text: "Wasted energy found and costed every month, with the action that fixes it.",
        image: P + "meters.jpg",
      },
    ],
    aside: [
      {
        label: "What the division delivers",
        style: "chips",
        items: [
          { title: "BMS and plant controls", text: "" },
          { title: "Energy metering and monitoring", text: "" },
          { title: "Alarm rationalisation", text: "" },
          { title: "Anomaly detection", text: "" },
          { title: "Analytics and lifecycle data", text: "" },
        ],
      },
    ],
    note: "Delivered in house by the Intelligent Solutions division, a team of eight.",
    tone: opts?.tone ?? "plain",
  };
}

/* ------------------------------------------------------------------
   05 How we deliver
   ------------------------------------------------------------------ */

const HSE_STATS: CapStat[] = [
  { value: "Zero", label: "Fatalities in five years" },
  { value: "5M+", label: "Safe man hours in FY25" },
  { value: "50 : 1", label: "Workers per steward" },
  { value: "ISO 9001", label: "Plus ISO 14001 and 45001" },
  { value: "2 months", label: "Internal audit cycle" },
  { value: "25", label: "In the quality team" },
];

const HSE_SHEET: CapSheet = {
  label: "HSE and quality",
  tag: "Throughout",
  title: "HSE and quality",
  lede: "Zero incidents and zero defects are project objectives, held by teams that are on every site every day.",
  steps: [
    {
      label: "Plan",
      text: "Site HSE plan, quality plan and inspection and test plans approved before work starts.",
    },
    {
      label: "Method",
      text: "QA/QC writes the method statement and HSE adds the risk assessment.",
    },
    {
      label: "Brief",
      text: "Every worker inducted; a toolbox talk at the start of every shift.",
    },
    {
      label: "Control",
      text: "A permit for every high risk task and an inspection at every hold point.",
    },
    {
      label: "Verify",
      text: "Daily HSE inspection, audits every two months, and every NCR closed.",
    },
  ],
  stats: HSE_STATS,
  groups: [
    {
      label: "How it is held",
      style: "cards",
      items: [
        {
          title: "HSE",
          text: "No work front opens without an HSE person present. Every worker has a medical examination and an induction before entry, and incidents are reported at once.",
        },
        {
          title: "Quality",
          text: "Site QC engineers report to the Head of Quality at head office, not to the site they inspect. Work starts only after the quality plan and test plans are approved.",
        },
      ],
    },
    {
      label: "What you get",
      style: "chips",
      items: [
        { title: "Site HSE plan", text: "" },
        { title: "Quality plan and ITPs", text: "" },
        { title: "Method statements with risk assessment", text: "" },
        { title: "Inspection requests", text: "" },
        { title: "NCR log", text: "" },
        { title: "Monthly HSE and quality reports", text: "" },
      ],
    },
  ],
};

/** Deck 06, slides 33 to 42. */
const GENERAL_SHEETS: CapSheet[] = [
  {
    label: "Kick off",
    tag: "Part 1 of 7",
    title: "Kick off",
    lede: "Within 24 hours of the kick off meeting you receive one pack that sets out scope, people, dates and how we will report.",
    steps: [
      {
        label: "Award handover",
        text: "Sales hands the award to the project team within 24 hours, in one folder.",
      },
      {
        label: "Project plan",
        text: "Programme, manpower, procurement and drawing plans, approved before anything is released.",
      },
      {
        label: "Kick off meeting",
        text: "Your team and ours agree scope, interfaces, dates and reporting.",
      },
      {
        label: "Kick off pack",
        text: "Sent to you within 24 hours of the meeting.",
      },
      {
        label: "Weekly targets",
        text: "Issued to every team each week from then on.",
      },
    ],
    groups: [
      {
        label: "What you get in the kick off pack",
        style: "cards",
        items: [
          {
            title: "Scope and interface matrix",
            text: "Who does what at every boundary with other contractors",
          },
          {
            title: "Baseline programme",
            text: "Milestones tied to your handover sequence",
          },
          {
            title: "TDS and procurement tracker",
            text: "Every submittal and order against its need date",
          },
          {
            title: "Drawing tracker",
            text: "Every sheet with its submission and approval status",
          },
          {
            title: "Communication and escalation matrix",
            text: "Named contacts, and who to call when something is stuck",
          },
          {
            title: "Organogram and manpower plan",
            text: "The site team by name, and labour by trade and month",
          },
        ],
      },
      {
        label: "When",
        style: "timings",
        items: [
          { title: "24 hours", text: "From award to handover inside our team" },
          { title: "2 to 3 days", text: "To prepare the project plan" },
          {
            title: "24 hours",
            text: "From the kick off meeting to the pack reaching you",
          },
        ],
      },
    ],
    note: "Also in the pack: risk register, HSE plan, quality plan with inspection and test plans, document register, and the bank guarantee and insurance tracker.",
  },
  {
    label: "Design and drawings",
    tag: "Part 2 of 7",
    title: "Design and drawings",
    lede: "An in house team of 50 design engineers, BIM coordinators and modellers turns the tender design into coordinated drawings the site can build from.",
    steps: [
      {
        label: "Analyse",
        text: "Tender drawings, specification and BOQ studied; gaps raised as RFIs.",
      },
      {
        label: "Service drawings",
        text: "A drawing file prepared for each service.",
      },
      {
        label: "Coordinate",
        text: "All services combined in one model and clashes resolved.",
      },
      {
        label: "Check",
        text: "Internal QA/QC of every drawing before it is submitted.",
      },
      {
        label: "Issue",
        text: "Submitted for approval, then issued to site as good for construction.",
      },
    ],
    groups: [
      {
        label: "What you get",
        style: "cards",
        items: [
          {
            title: "Drawing tracker",
            text: "Every sheet: planned, submitted, approved and issued",
          },
          {
            title: "Coordinated shop drawings",
            text: "Every service coordinated on one set",
          },
          {
            title: "BIM model and clash reports",
            text: "A coordinated model for every model led project",
          },
          {
            title: "RFI log",
            text: "Every query with its date raised and date answered",
          },
          {
            title: "Fabrication drawings",
            text: "Spool drawings and cut lists for prefabricated work",
          },
          {
            title: "As built drawings",
            text: "Updated from site records and compiled at handover",
          },
        ],
      },
      {
        label: "When",
        style: "timings",
        items: [
          { title: "Weekly", text: "Drawing targets set and reviewed" },
          {
            title: "Same day",
            text: "RFIs logged and sent, and replies distributed",
          },
        ],
      },
    ],
  },
  {
    label: "Procurement",
    tag: "Part 3 of 7",
    title: "Procurement",
    lede: "Procurement is 60 to 70 percent of project cost, so every order is placed from head office and tracked against the date the site needs it.",
    steps: [
      {
        label: "Submittal",
        text: "Technical data sheet format agreed within 3 days; submittals follow the weekly target.",
      },
      {
        label: "Approval",
        text: "Your approval tracked item by item, with samples where specified.",
      },
      {
        label: "Order",
        text: "Placed at head office against a rate library and annual rate contracts.",
      },
      {
        label: "Expedite",
        text: "Deliveries chased every week; factory tests witnessed on critical packages.",
      },
      {
        label: "Receive",
        text: "Inspected on delivery; only accepted material is issued to work.",
      },
    ],
    groups: [
      {
        label: "What you get",
        style: "cards",
        items: [
          {
            title: "TDS tracker",
            text: "Every submittal with make, status and approval date",
          },
          {
            title: "Procurement tracker",
            text: "Every item with order date and delivery against need date",
          },
          {
            title: "Factory acceptance tests",
            text: "Before dispatch of chillers, switchgear, UPS and pumps",
          },
          {
            title: "Material inspection requests",
            text: "Raised for every delivery, with test certificates",
          },
          {
            title: "Approved makes",
            text: "Standing relationships with the makes consultants specify",
          },
          {
            title: "Expediting",
            text: "Dispatch chasing from a dedicated expediting desk",
          },
        ],
      },
      {
        label: "Purchase order released in",
        style: "timings",
        items: [
          { title: "1 week", text: "Bulk items" },
          { title: "2 to 4 weeks", text: "Mid lead items" },
          { title: "1 to 2 months", text: "Equipment" },
        ],
      },
    ],
    note: "A team of 35 in purchase, procurement and stores.",
  },
  {
    label: "Mobilisation",
    tag: "Part 4 of 7",
    title: "Mobilisation",
    lede: "Site office, supervision and the first workforce within three days in the National Capital Region and ten days anywhere in India.",
    steps: [
      {
        label: "Site team",
        text: "Staff transferred or hired within 2 weeks; key staff put to you for approval.",
      },
      {
        label: "Site set up",
        text: "Site taken over; site office and stores set up.",
      },
      {
        label: "Compliance",
        text: "Insurance, registrations and labour compliance before anyone enters.",
      },
      {
        label: "Tools and plant",
        text: "Tools, tackles and machinery mobilised and inspected.",
      },
      {
        label: "Induction",
        text: "Every worker inducted and issued PPE before the first day of work.",
      },
    ],
    groups: [
      {
        label: "What you get",
        style: "cards",
        items: [
          {
            title: "Organogram",
            text: "The site team by name, with key staff for your approval",
          },
          {
            title: "Manpower histogram",
            text: "Planned labour by trade and month",
          },
          {
            title: "Mobilisation checklist",
            text: "Office, stores, tools and plant confirmed before work starts",
          },
          {
            title: "Insurance and guarantee tracker",
            text: "Policies and bank guarantees with their expiry dates",
          },
          {
            title: "Site HSE plan",
            text: "Site specific, prepared by the HSE officer",
          },
          {
            title: "Labour compliance",
            text: "Registrations and records in place before workers enter",
          },
        ],
      },
      {
        label: "When",
        style: "timings",
        items: [
          {
            title: "3 days",
            text: "Site office, supervision and first workforce in the National Capital Region",
          },
          { title: "10 days", text: "The same anywhere in India" },
          { title: "2 weeks", text: "Site staff deployed, or it is escalated" },
        ],
      },
    ],
    note: "Four delivery clusters: North, West, South and East.",
  },
  {
    label: "Site execution",
    tag: "Part 5 of 7",
    title: "Site execution",
    lede: "Work starts on a front only when everything it needs is in place, and each stage is inspected and recorded before the next.",
    steps: [
      {
        label: "Look ahead",
        text: "Weekly plan of fronts, labour and material.",
      },
      {
        label: "Work front",
        text: "Front taken over; a blocked front is reported within 24 hours.",
      },
      {
        label: "Readiness check",
        text: "Six things confirmed before the activity starts.",
      },
      {
        label: "Install",
        text: "Our own engineers and supervisors on every front.",
      },
      {
        label: "Inspect",
        text: "Internal check first, then an inspection request to you.",
      },
      {
        label: "Record",
        text: "Progress recorded daily; joint measurement for billing.",
      },
    ],
    groups: [
      {
        label: "No activity starts without",
        style: "cards",
        items: [
          {
            title: "Good for construction drawing",
            text: "Approved and issued through document control",
          },
          {
            title: "Accepted material",
            text: "Inspected and accepted on delivery",
          },
          {
            title: "Method statement and risk assessment",
            text: "Approved for the activity and briefed to the crew",
          },
          { title: "Manpower", text: "An inducted crew with its supervisor" },
          { title: "Tools and plant", text: "Inspected every month" },
          { title: "Permit to work", text: "Raised before work starts" },
        ],
      },
      {
        label: "When",
        style: "timings",
        items: [
          { title: "Every shift", text: "Toolbox talk before work begins" },
          { title: "Daily", text: "HSE inspection and progress record" },
          {
            title: "Weekly",
            text: "Look ahead plan issued to site and vendors",
          },
        ],
      },
    ],
    note: "170 engineers, supervisors and foremen in site execution, with more than 2,500 labour on roll and through vendors.",
  },
  {
    label: "Testing and commissioning",
    tag: "Part 6 of 7",
    title: "Testing and commissioning",
    lede: "Five levels, each signed off and witnessed by you where required before the next begins.",
    steps: [
      {
        label: "L1 Component verification",
        text: "Datasheet, serial and tag check, physical integrity and receipt inspection.",
      },
      {
        label: "L2 Static completion",
        text: "Insulation resistance, pressure and leak tests, flushing and cleanliness.",
      },
      {
        label: "L3 System start up",
        text: "Powered tests of pumps, fans, VRF, AHUs, DG sets and panels against design.",
      },
      {
        label: "L4 Functional performance",
        text: "End to end with BMS: changeover, alarms, interlocks and balancing.",
      },
      {
        label: "L5 Integrated testing",
        text: "Fire mode cause and effect, grid failure and DG takeover.",
      },
    ],
    groups: [
      {
        label: "What you get",
        style: "cards",
        items: [
          {
            title: "Commissioning plan",
            text: "Sequence and witness points agreed before the first test",
          },
          {
            title: "Test scripts",
            text: "Baseline, failure injection, recovery and evidence",
          },
          {
            title: "Calibrated instruments",
            text: "NABL calibrated, with certificates on record",
          },
          {
            title: "Balancing reports",
            text: "To ASHRAE, AABC and NEBB procedures",
          },
          {
            title: "Witnessed test packs",
            text: "Levels 1 to 5, each signed off before the next begins",
          },
          { title: "Snag list", text: "Closed against dates agreed with you" },
        ],
      },
      {
        label: "Team",
        style: "timings",
        items: [
          {
            title: "30",
            text: "Commissioning engineers and technicians in mobile teams",
          },
          { title: "8 to 10", text: "Projects taken to handover in a year" },
        ],
      },
    ],
  },
  {
    label: "Handover",
    tag: "Part 7 of 7",
    title: "Handover",
    lede: "A complete record, a trained operating team and support through the defects liability period.",
    steps: [
      {
        label: "Close snags",
        text: "Joint inspection, and a snag list closed against agreed dates.",
      },
      {
        label: "As built",
        text: "Drawings and model updated from site records.",
      },
      {
        label: "Dossier",
        text: "Compiled by document control from engineering, procurement and quality.",
      },
      {
        label: "Train",
        text: "Your operating team trained on the installed systems.",
      },
      {
        label: "Completion",
        text: "Completion recorded and the defects liability period begins.",
      },
    ],
    groups: [
      {
        label: "Handover dossier",
        style: "cards",
        items: [
          {
            title: "As built drawings and BIM model",
            text: "The federated model with the final drawings",
          },
          {
            title: "Equipment datasheets",
            text: "With serial numbers for your asset register",
          },
          {
            title: "O&M manuals",
            text: "Installation, operation and maintenance manuals",
          },
          {
            title: "Commissioning records",
            text: "Test packs, balancing reports and calibration certificates",
          },
          {
            title: "Warranties and spares",
            text: "Vendor warranties and spare part lists",
          },
          {
            title: "Training and approvals",
            text: "Operator training records, fire authority approvals and NOC",
          },
        ],
      },
      {
        label: "After handover",
        style: "timings",
        items: [
          {
            title: "DLP",
            text: "Service engineers attend defects through the defects liability period",
          },
          {
            title: "O&M",
            text: "AMC and O&M from our service team, on seven client sites today",
          },
        ],
      },
    ],
  },
  {
    label: "Project controls and monitoring",
    tag: "Throughout",
    title: "Project controls and monitoring",
    lede: "Progress and cost are measured by a head office team, not self reported by the site, and reported to you on a fixed rhythm.",
    steps: [
      {
        label: "Baseline",
        text: "One resource loaded Primavera P6 programme, locked and tied to your milestones.",
      },
      {
        label: "Look ahead",
        text: "A three week rolling look ahead drives labour, material and permits.",
      },
      {
        label: "Measure",
        text: "Progress and cost measured by head office project control.",
      },
      {
        label: "Review",
        text: "Weekly review with the Chief Projects Officer on one dashboard.",
      },
      {
        label: "Recover",
        text: "Variance is seen while options remain, and a recovery plan follows.",
      },
    ],
    groups: [
      {
        label: "What you get",
        style: "cards",
        items: [
          {
            title: "Daily progress report",
            text: "Work done and manpower on site, every day",
          },
          {
            title: "Weekly progress report",
            text: "Planned against actual, with the look ahead",
          },
          {
            title: "Three week look ahead",
            text: "Work fronts, labour, material and permits needed",
          },
          {
            title: "Monthly review",
            text: "Progress, variance and change tracking",
          },
          {
            title: "Minutes and action tracker",
            text: "Every action with an owner and a date",
          },
          {
            title: "Live dashboard",
            text: "One view of progress for your PMO",
          },
        ],
      },
      {
        label: "When",
        style: "timings",
        items: [
          { title: "Daily", text: "Progress report from site" },
          {
            title: "Weekly",
            text: "Progress report, look ahead and review meeting",
          },
          {
            title: "Monthly",
            text: "Variance and changes, with HSE and quality reports",
          },
        ],
      },
    ],
    note: "A team of 30 in planning, scheduling and project controls.",
  },
  HSE_SHEET,
];

/** Deck 09, slides 30 to 40. Parts that differ for a BMS and ELV package. */
const BMS_SHEETS: CapSheet[] = [
  {
    ...GENERAL_SHEETS[0],
    groups: [
      {
        label: "What you get in the kick off pack",
        style: "cards",
        items: [
          {
            title: "Scope and interface matrix",
            text: "Who does what at every boundary with the other trades",
          },
          {
            title: "Baseline programme",
            text: "Three levels, from milestones to daily activities with a critical path",
          },
          {
            title: "TDS and procurement tracker",
            text: "Every submittal and order against its need date",
          },
          {
            title: "Drawing submittal register",
            text: "Every drawing and IO summary with its submission and approval status",
          },
          {
            title: "Communication and escalation matrix",
            text: "Named contacts, RACI, and who to call when something is stuck",
          },
          {
            title: "Organogram and manpower plan",
            text: "The site team by name, and the crew by trade and week",
          },
        ],
      },
      GENERAL_SHEETS[0].groups![1],
    ],
    note: "Also in the pack: risk register, HSE plan, quality plan with inspection and test plan, method statement and site logistics plan.",
  },
  {
    label: "Design and drawings",
    tag: "Part 2 of 7",
    title: "Design and drawings",
    lede: "The system is designed on paper before anything is bought. Every point, panel, cable and sequence is drawn, checked and approved.",
    steps: [
      {
        label: "Survey",
        text: "Site and plant surveyed; drawings, specification and BOQ studied; gaps raised as RFIs.",
      },
      {
        label: "IO summary",
        text: "Every point listed by plant, by controller and by signal type.",
      },
      {
        label: "Drawings",
        text: "Architecture, network, panel and cable drawings prepared.",
      },
      {
        label: "Check",
        text: "Internal QA/QC of every drawing before it is submitted.",
      },
      {
        label: "Issue",
        text: "Submitted for approval, then issued to site as good for construction.",
      },
    ],
    groups: [
      {
        label: "What you get",
        style: "cards",
        items: [
          {
            title: "IO point schedule",
            text: "The master list of every hardwired and integrated point",
          },
          {
            title: "Architecture and network drawings",
            text: "System block diagram, network topology and controller layout",
          },
          {
            title: "Panel and wiring drawings",
            text: "General arrangement, wiring and terminations for every panel",
          },
          {
            title: "Cable schedule and layouts",
            text: "Every cable run, floor by floor, with its containment",
          },
          {
            title: "Sequence of operation",
            text: "Control sequences and cause and effect, written before programming",
          },
          {
            title: "Graphics and interface specification",
            text: "Operator screens and the list of third party integrations",
          },
        ],
      },
      {
        label: "When",
        style: "timings",
        items: [
          { title: "Weekly", text: "Drawing targets set and reviewed" },
          {
            title: "Same day",
            text: "RFIs logged and sent, and replies distributed",
          },
          {
            title: "7 steps",
            text: "From preparation and internal check to approval and as built",
          },
        ],
      },
    ],
    note: "BMS and ELV design sits in the Intelligent Solutions division, backed by the company design and BIM team of 50.",
  },
  {
    label: "Procurement",
    tag: "Part 3 of 7",
    title: "Procurement",
    lede: "Nothing is ordered before its datasheet is approved, and every order is tracked against the date the site needs it.",
    steps: [
      {
        label: "Submittal",
        text: "Technical data sheet format agreed within 3 days; submittals follow the weekly target.",
      },
      {
        label: "Approval",
        text: "Your approval tracked item by item against the approved make list.",
      },
      {
        label: "Order",
        text: "Placed at head office, with long lead items released first.",
      },
      {
        label: "Bench test",
        text: "Control panels, integrators and sensors tested before dispatch to site.",
      },
      {
        label: "Receive",
        text: "Every delivery inspected against its approved datasheet before issue.",
      },
    ],
    groups: [
      {
        label: "What you get",
        style: "cards",
        items: [
          {
            title: "TDS tracker",
            text: "Every submittal with make, status and approval date",
          },
          {
            title: "Procurement tracker",
            text: "Every item with order date and delivery against need date",
          },
          {
            title: "Factory and bench test reports",
            text: "For control panels, integrators and sensors",
          },
          {
            title: "Material inspection requests",
            text: "Raised for every delivery, with test and calibration certificates",
          },
          {
            title: "Approved makes",
            text: "Supplied from your approved make list, with no deviation unless you approve it",
          },
          {
            title: "Expediting",
            text: "Deliveries chased every week from a dedicated expediting desk",
          },
        ],
      },
      {
        label: "Purchase order released in",
        style: "timings",
        items: [
          { title: "1 week", text: "Bulk items" },
          { title: "2 to 4 weeks", text: "Mid lead items" },
          { title: "1 to 2 months", text: "Equipment" },
        ],
      },
    ],
    note: "A team of 35 in purchase, procurement and stores.",
  },
  {
    ...GENERAL_SHEETS[3],
    steps: [
      GENERAL_SHEETS[3].steps![0],
      GENERAL_SHEETS[3].steps![1],
      GENERAL_SHEETS[3].steps![2],
      {
        label: "Tools and instruments",
        text: "Tools and test instruments mobilised, with valid calibration certificates.",
      },
      GENERAL_SHEETS[3].steps![4],
    ],
    groups: [
      {
        label: "What you get",
        style: "cards",
        items: [
          {
            title: "Organogram",
            text: "The site team by name, with key staff for your approval",
          },
          {
            title: "Manpower histogram",
            text: "Planned crew by trade and week, wave by wave",
          },
          {
            title: "Mobilisation checklist",
            text: "Office, stores, tools and instruments confirmed before work starts",
          },
          {
            title: "Insurance and guarantee tracker",
            text: "Policies and bank guarantees with their expiry dates",
          },
          {
            title: "Site HSE plan",
            text: "Site specific, prepared by the HSE officer",
          },
          {
            title: "Labour compliance",
            text: "Registrations and records in place before workers enter",
          },
        ],
      },
      GENERAL_SHEETS[3].groups![1],
    ],
  },
  {
    label: "Installation",
    tag: "Part 5 of 7",
    title: "Installation",
    lede: "Work starts on a front only when everything it needs is in place, and each stage is inspected and recorded before the next.",
    steps: [
      {
        label: "Containment",
        text: "Conduit and tray installed and inspected before any cable is pulled.",
      },
      {
        label: "Cabling",
        text: "Cables laid clear of power cables, then tested and tagged.",
      },
      {
        label: "Panels",
        text: "Control panels mounted, earthed and inspected before they are energised.",
      },
      {
        label: "Field devices",
        text: "Sensors and actuators mounted to drawing and wired with correct polarity.",
      },
      {
        label: "Network",
        text: "Switches, racks and fibre links installed and tested.",
      },
      {
        label: "Terminate",
        text: "Cores ferruled and terminated to the approved wiring drawing.",
      },
    ],
    groups: [
      {
        label: "No activity starts without",
        style: "cards",
        items: [
          {
            title: "Good for construction drawing",
            text: "Approved and issued through document control",
          },
          {
            title: "Accepted material",
            text: "Inspected and accepted on delivery",
          },
          {
            title: "Method statement and risk assessment",
            text: "Approved for the activity and briefed to the crew",
          },
          { title: "Manpower", text: "An inducted crew with its supervisor" },
          {
            title: "Tools and instruments",
            text: "Inspected, with calibration in date",
          },
          { title: "Permit to work", text: "Raised before work starts" },
        ],
      },
      {
        label: "When",
        style: "timings",
        items: [
          { title: "Every shift", text: "Toolbox talk before work begins" },
          { title: "Daily", text: "HSE inspection and progress record" },
          {
            title: "Weekly",
            text: "Look ahead plan issued to site and vendors",
          },
        ],
      },
    ],
    note: "Hold points on a BMS package: first material at site, conduit complete, panel mounting, cable tests, first third party communication, testing complete and the final walkthrough.",
  },
  {
    label: "Testing and commissioning",
    tag: "Part 6 of 7",
    title: "Testing and commissioning",
    lede: "Six stages of proof. Each is recorded and signed off before the next begins.",
    steps: [
      {
        label: "Factory test",
        text: "Panels inspected and tested at the works before dispatch.",
      },
      {
        label: "Cable tests",
        text: "Insulation resistance and continuity on every cable; earthing verified.",
      },
      {
        label: "Point to point",
        text: "Each physical point verified from the field device to the controller.",
      },
      {
        label: "Loop check",
        text: "Sensors calibrated with NABL calibrated instruments, and loops proved.",
      },
      {
        label: "Sequences",
        text: "Control sequences and cause and effect proved with fire and plant interfaces.",
      },
      {
        label: "Integrated test",
        text: "Cross system scenarios with failure injection, recovery and evidence.",
      },
    ],
    groups: [
      {
        label: "What you get",
        style: "cards",
        items: [
          { title: "Factory test records", text: "For every control panel" },
          {
            title: "Cable test records",
            text: "Insulation resistance and continuity",
          },
          {
            title: "Calibration certificates",
            text: "For every instrument used, NABL calibrated",
          },
          { title: "Loop check report", text: "Every point, signed off" },
          { title: "Cause and effect record", text: "Witnessed by your team" },
          {
            title: "Operator training",
            text: "On the screens, alarms and trends they will use",
          },
        ],
      },
      {
        label: "On our projects",
        style: "timings",
        items: [
          {
            title: "312",
            text: "Cause and effect mappings on Prestige BKC 101",
          },
          { title: "3,220", text: "Sensors and meters in one Foxconn package" },
          {
            title: "19",
            text: "IO summaries approved for the BITSoM campus",
          },
        ],
      },
    ],
  },
  {
    label: "Handover",
    tag: "Part 7 of 7",
    title: "Handover",
    lede: "A complete record, a trained operating team and support through the defects liability period.",
    steps: [
      {
        label: "Close snags",
        text: "Joint walkthrough of the full system, and a snag list closed against agreed dates.",
      },
      {
        label: "As built",
        text: "Drawings and point lists updated to the installed condition.",
      },
      {
        label: "Back up",
        text: "Controller programs, databases and graphics backed up and handed over.",
      },
      {
        label: "Train",
        text: "Your operators trained on the screens, alarms and trends they will use.",
      },
      {
        label: "Completion",
        text: "Completion recorded and the defects liability period begins.",
      },
    ],
    groups: [
      {
        label: "Handover dossier",
        style: "cards",
        items: [
          {
            title: "As built drawings and IO lists",
            text: "Every drawing and point list in its installed condition",
          },
          {
            title: "O&M manuals",
            text: "System block diagram, equipment manuals and maintenance schedules",
          },
          {
            title: "Commissioning records",
            text: "Point to point, loop check, sequence and integrated test records",
          },
          {
            title: "Calibration certificates",
            text: "For sensors, and for every test instrument used",
          },
          {
            title: "Software and licences",
            text: "Backups of programs, databases and graphics, with licences and passwords",
          },
          {
            title: "Training records",
            text: "Attendance and topics for every operator trained",
          },
        ],
      },
      {
        label: "After handover",
        style: "timings",
        items: [
          {
            title: "DLP",
            text: "Service engineers attend defects through the defects liability period",
          },
          {
            title: "AMC",
            text: "Quarterly preventive visits, calibration, backups and remote support",
          },
          {
            title: "O&M",
            text: "AMC and O&M from our service team, on seven client sites today",
          },
        ],
      },
    ],
  },
  {
    ...GENERAL_SHEETS[7],
    steps: [
      {
        label: "Baseline",
        text: "One resource loaded programme, locked and tied to your milestones.",
      },
      ...GENERAL_SHEETS[7].steps!.slice(1),
    ],
    groups: [
      {
        label: "What you get",
        style: "cards",
        items: [
          {
            title: "Daily progress report",
            text: "Work done and manpower on site, building by building",
          },
          ...GENERAL_SHEETS[7].groups![0].items.slice(1),
        ],
      },
      GENERAL_SHEETS[7].groups![1],
    ],
  },
  {
    ...HSE_SHEET,
  },
];

const DELIVERY_BANDS: CapItem[] = [
  {
    title: "Project controls and monitoring",
    text: "Baseline programme, daily and weekly reports, three week look ahead and monthly review, measured by head office",
  },
  {
    title: "HSE and quality",
    text: "Method statement and risk assessment before every activity, inspection at every stage, audits every two months",
  },
];

/** Deck 06, slide 33, or deck 09, slide 30 for `bms`. */
export function deliveryBlock(
  variant: "general" | "bms" = "general",
  opts?: { tone?: "plain" | "soft" },
): CapBlock {
  const bms = variant === "bms";
  return {
    kind: "sheets",
    id: "how-we-deliver",
    nav: "How we deliver",
    eyebrow: "How we deliver",
    title: "One method on every project, from kick off to handover.",
    lede: "Seven parts from award to handover, with project controls and HSE and quality running through all of them.",
    layout: "side",
    stats: [
      {
        value: "24 hours",
        label: "Kick off pack",
        note: "From the kick off meeting to the pack reaching you",
      },
      {
        value: "3 weeks",
        label: "Rolling look ahead",
        note: "Work fronts, labour, material and permits",
      },
      {
        value: "10 days",
        label: "Mobilisation",
        note: "Anywhere in India, and 3 days in the National Capital Region",
      },
      bms
        ? {
            value: "100%",
            label: "Points proved",
            note: "Every point tested from the field device to the operator screen",
          }
        : {
            value: "L1 to L5",
            label: "Commissioning levels",
            note: "Each signed off before the next begins",
          },
    ],
    bands: bms
      ? [
          DELIVERY_BANDS[0],
          {
            title: "HSE and quality",
            text: "Method statement and risk assessment before every activity, inspection at every hold point, audits every two months",
          },
        ]
      : DELIVERY_BANDS,
    sheets: bms ? BMS_SHEETS : GENERAL_SHEETS,
    tone: opts?.tone ?? "soft",
  };
}

/**
 * DfMA in detail: engineering workflow, module families and the AdaniConneX
 * campus. Shown on the DfMA and modular MEP page.
 */
export function dfmaDetailBlock(): CapBlock {
  return {
    // Deck 08, slides 11 to 17, and deck 02, slide 43
    kind: "sheets",
    id: "dfma-detail",
    layout: "top",
    tone: "plain",
    sheets: [
      {
        label: "Engineering workflow",
        title: "The model is frozen before fabrication.",
        lede: "Every module passes five gates before it can leave the workshop.",
        steps: [
          {
            label: "Coordinate",
            text: "Routes, access, maintainability and interfaces frozen in the federated model at LOD 400.",
          },
          {
            label: "Standardise",
            text: "Module families, joints and lift limits defined so repeated halls and floors use the same assemblies.",
          },
          {
            label: "Release",
            text: "GA and spool drawings, bill of materials, weld map, QA plan, tags and lifting data issued as one pack.",
          },
          {
            label: "Fabricate and close",
            text: "Built on jigs to frozen dimensions at a near site hub, inspected, tested, recorded and protected before dispatch.",
          },
        ],
        groups: [
          {
            label: "Factory to site",
            style: "cards",
            items: [
              {
                title: "Dispatch",
                text: "Modules sequenced to the installation window.",
              },
              {
                title: "Lift plan",
                text: "Route, rigging, crane and landing zone confirmed before dispatch.",
              },
              {
                title: "Install",
                text: "Lift to the released landing zone, set datums, connect and inspect.",
              },
            ],
          },
        ],
        note: "Hold point: no module leaves the workshop until its quality gates are closed, and none is lifted until the workfront and lift plan are released.",
      },
      {
        label: "Suitability by service",
        title: "DfMA suitability by service",
        lede: "Start with repeatable geometry, stable vendor data and accessible connections; keep variable interfaces flexible.",
        groups: [
          {
            label: "Fit and typical modules",
            style: "cards",
            items: [
              {
                title: "Mechanical, high fit",
                text: "Chilled water spools and headers, pump and CDU skids, valve stations and CRAH connection sets.",
              },
              {
                title: "Electrical, high fit",
                text: "Multi tier cable containment, busway sections, power skids and earthing assemblies.",
              },
              {
                title: "Fire protection, high fit",
                text: "Sprinkler mains and risers, pre action valve sets, and pump and header skids.",
              },
              {
                title: "Plumbing, medium fit",
                text: "Condensate and drainage headers and booster sets, where falls can be controlled.",
              },
              {
                title: "Controls and ELV, medium to high fit",
                text: "Control panels built and function tested off site, skid wiring, containment and junction boxes.",
              },
              {
                title: "Kept site built",
                text: "Final branches, live tie ins, vendor sensitive tails and oversize modules that transport limits would undo.",
              },
            ],
          },
        ],
        note: "Validate by module family and compare total installed cost, not shop cost alone.",
      },
      {
        label: "Against traditional SITC",
        title: "DfMA against traditional SITC",
        lede: "DfMA moves complexity off site; traditional SITC carries it into the workfront.",
        stats: [
          {
            value: "Parallel",
            label: "Fabricate while civil progresses",
          },
          {
            value: "Repeatable",
            label: "Standard jigs and instructions",
          },
          { value: "Ready", label: "Released workfronts only" },
          { value: "Traceable", label: "Module level records" },
        ],
        groups: [
          {
            label: "Traditional and DfMA",
            style: "cards",
            items: [
              {
                title: "Design",
                text: "Traditional: late releases trade by trade. DfMA: the model and interfaces frozen together.",
              },
              {
                title: "Production",
                text: "Traditional: cut and fit on site. DfMA: a controlled assembly line.",
              },
              {
                title: "Logistics",
                text: "Traditional: loose materials. DfMA: tagged, lift ready modules.",
              },
              {
                title: "QA and testing",
                text: "Traditional: checks after installation. DfMA: factory gates, then site integration.",
              },
            ],
          },
        ],
      },
      {
        label: "Why DfMA",
        title: "Why DfMA",
        lede: "Value comes from control, not from an assumed saving. Dense, repeated and critical systems gain the most.",
        groups: [
          {
            label: "Where it gains most",
            style: "cards",
            items: [
              {
                title: "Dense MEPF zones",
                text: "Risers, corridors and plantrooms carry more services per lift and per release.",
              },
              {
                title: "Repeated blocks",
                text: "Halls, floors and skids repeat, so standard modules improve with every set.",
              },
              {
                title: "Factory QA",
                text: "Defects close in the workshop before dispatch, not in a congested workfront.",
              },
              {
                title: "Compressed workfronts",
                text: "Fabrication runs while civil work progresses, so site windows stay focused on installation.",
              },
              {
                title: "Less double handling",
                text: "Modules arrive tagged and lift ready and move once, to the released workfront.",
              },
              {
                title: "Less rework",
                text: "Dimensional, weld and pressure checks happen before transport, not after installation.",
              },
              {
                title: "Fewer site stations",
                text: "Less temporary works, hot work and cutting at height on site.",
              },
              {
                title: "Better material use",
                text: "Planned cuts from the frozen model reduce waste and offcuts.",
              },
            ],
          },
        ],
      },
      {
        label: "At AdaniConneX",
        title: "Split DfMA delivery at AdaniConneX",
        lede: "HYD 22 and HYD 23 in Hyderabad combine DfMA and site built scopes: repeatable assemblies are prefabricated while site work completes the system.",
        steps: [
          {
            label: "BIM LOD 400 and 500",
            text: "Coordinated shop model and as built model for both blocks.",
          },
          {
            label: "Materials and supports",
            text: "Approved supply delivered into the DfMA setup.",
          },
          {
            label: "Service prefabrication",
            text: "Fire protection and HVAC spools and assemblies built off site.",
          },
          {
            label: "Factory QA",
            text: "Inspection, testing and release records for every module.",
          },
          {
            label: "Site integration",
            text: "Lift, interconnect, test and hand over.",
          },
        ],
        groups: [
          {
            label: "On the campus",
            style: "cards",
            items: [
              {
                title: "HYD 22 and HYD 23",
                text: "HYD 22: fire protection low side, 80 MW block. HYD 23: HVAC low side, 30 MW block. Modules travel about 40 km from the DfMA setup.",
              },
              {
                title: "Responsibility",
                text: "Unique Engineers designs, supplies and prefabricates the MEP services and tests and commissions them; the DfMA agency builds frames, assembles, transports and installs the modules.",
              },
            ],
          },
        ],
      },
    ],
  };
}
