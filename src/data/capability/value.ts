/**
 * Why Unique Engineers: one page for each value addition that has more to
 * say than a card can hold. The industry pages show the cards
 * (WHY_VALUE_ADDITIONS in shared.ts) and link here, so each subject is
 * written once.
 *
 * Four of the pages open with a 3D model that the reader scrolls through,
 * like the buildings on the industry pages. The wording of each stop is the
 * deck's: deck 06, slides 26 to 31; deck 08, slides 11 to 17.
 */
import type { CapBlock, CapChapter, CapPage } from "./types";
import {
  WHY_VALUE_ADDITIONS,
  aiBlock,
  dfmaBlock,
  dfmaDetailBlock,
  floorKitBlocks,
} from "./shared";

const EYEBROW = "Why Unique Engineers";
const STILLS = "/capability/building/";

const card = (slug: string) => {
  const c = WHY_VALUE_ADDITIONS.find((x) => x.href === `/why-unique/${slug}`);
  if (!c) throw new Error(`No value card for ${slug}`);
  return c;
};

/** The other pages of this set, as cards at the foot of a page. */
const others = (slug: string): CapBlock => ({
  kind: "cards",
  id: "more",
  nav: "More",
  eyebrow: EYEBROW,
  title: "More of what we add.",
  items: WHY_VALUE_ADDITIONS.filter(
    (x) => x.href && x.href !== `/why-unique/${slug}`,
  ),
  columns: 4,
});

const page = (o: {
  slug: string;
  name: string;
  blocks: CapBlock[];
}): CapPage => ({
  slug: o.slug,
  name: o.name,
  eyebrow: EYEBROW,
  title: `${o.name}.`,
  description: card(o.slug).text,
  blocks: [...o.blocks, others(o.slug)],
});

/** Stops of a 3D model, with the still picture of each view filled in. */
const stops = (name: string, list: Omit<CapChapter, "image">[]): CapChapter[] =>
  list.map((c) => ({ ...c, image: `${STILLS}${name}-${c.key}.jpg` }));

/* ------------------------------------------------------------------
   DfMA and modular MEP: one module, taken apart service by service
   ------------------------------------------------------------------ */
const FIT = "DfMA suitability by service";

const dfmaDemo: CapBlock = {
  // Deck 08, slides 11 and 12 (engineering workflow, suitability by
  // service) and slide 17 (AdaniConneX). Deck 06, slide 27 (gates).
  kind: "building",
  model: "module",
  subject: "a multi service module",
  id: "demo",
  nav: "The module",
  eyebrow: "DfMA and modular MEP",
  title: "One module, built and tested off site.",
  lede: "Start with repeatable geometry, stable vendor data and accessible connections; keep variable interfaces flexible.",
  hint: "Scroll to take the module apart",
  image: `${STILLS}module-intro.jpg`,
  chapters: stops("module", [
    {
      key: "frame",
      label: "Frame",
      eyebrow: "Standardise",
      title: "Module frame",
      text: "Module families, joints and lift limits defined so repeated halls and floors use the same assemblies. Built on jigs to frozen dimensions, with fixed datums and repeatable joints.",
      labels: [
        { anchor: "lugs", text: "Lifting points" },
        { anchor: "jig", text: "Jig bed" },
        { anchor: "datum", text: "Fixed datums" },
      ],
    },
    {
      key: "mechanical",
      label: "Mechanical",
      eyebrow: FIT,
      title: "Mechanical, high fit",
      text: "Chilled water spools and headers, pump and CDU skids, valve stations and CRAH connection sets.",
      labels: [
        { anchor: "headers", text: "Chilled water headers" },
        { anchor: "valves", text: "Valve station" },
        { anchor: "pumps", text: "Pump skid" },
      ],
    },
    {
      key: "electrical",
      label: "Electrical",
      eyebrow: FIT,
      title: "Electrical, high fit",
      text: "Multi tier cable containment, busway sections, power skids and earthing assemblies.",
      labels: [
        { anchor: "trays", text: "Cable containment" },
        { anchor: "busway", text: "Busway section" },
        { anchor: "powerskid", text: "Power skid" },
      ],
    },
    {
      key: "fire",
      label: "Fire protection",
      eyebrow: FIT,
      title: "Fire protection, high fit",
      text: "Sprinkler mains and risers, pre action valve sets, and pump and header skids.",
      labels: [
        { anchor: "firemain", text: "Sprinkler main" },
        { anchor: "preaction", text: "Pre action valve set" },
      ],
    },
    {
      key: "plumbing",
      label: "Plumbing",
      eyebrow: FIT,
      title: "Plumbing, medium fit",
      text: "Condensate and drainage headers and booster sets, where falls can be controlled.",
      labels: [
        { anchor: "drain", text: "Drainage header" },
        { anchor: "booster", text: "Booster set" },
      ],
    },
    {
      key: "controls",
      label: "Controls and ELV",
      eyebrow: FIT,
      title: "Controls and ELV, medium to high fit",
      text: "Control panels built and function tested off site, skid wiring, containment and junction boxes.",
      labels: [
        { anchor: "panel", text: "Control panel" },
        { anchor: "jbox", text: "Junction boxes" },
        { anchor: "instruments", text: "Instruments" },
      ],
    },
    {
      key: "gates",
      label: "Factory QA",
      eyebrow: "Five gates before dispatch",
      title: "QA and dispatch",
      text: "Tested, recorded and packed with caps, covers and a traceable module ID. Pressure tests on piping, insulation resistance on electrical, functional checks on skids.",
      labels: [
        { anchor: "testrig", text: "Pressure test" },
        { anchor: "caps", text: "Caps and covers" },
        { anchor: "tag", text: "Module ID" },
      ],
    },
    {
      key: "site",
      label: "Site integration",
      eyebrow: "Factory to site",
      title: "Site integration",
      text: "Lifted to the released landing zone, aligned and interconnected.",
      labels: [
        { anchor: "landing", text: "Released landing zone" },
        { anchor: "joint", text: "Interconnection" },
      ],
      proof: {
        project: "AdaniConneX HYD 22 and HYD 23, Hyderabad",
        text: "Fire protection and HVAC spools and assemblies built off site. Modules travel about 40 km from the DfMA setup.",
      },
    },
  ]),
};

/* ------------------------------------------------------------------
   Prefabrication at Bhondsi: the yard, from frozen model to the floor
   ------------------------------------------------------------------ */
const yardDemo: CapBlock = {
  // Deck 06, slide 28. The eight stops are the eight steps on the slide.
  kind: "building",
  model: "yard",
  subject: "the prefabrication yard",
  id: "demo",
  nav: "The yard",
  eyebrow: "Prefabrication yard at Bhondsi",
  title:
    "Made from the frozen model. Delivered in the order the site installs it.",
  lede: "Our own land, store and workshop at Bhondsi, Gurugram. Every assembly is made from the frozen model, tested, tagged and delivered in the order the site installs it.",
  hint: "Scroll to follow an assembly through the yard",
  image: `${STILLS}yard-intro.jpg`,
  chapters: stops("yard", [
    {
      key: "model",
      label: "Model frozen",
      eyebrow: "Step 1",
      title: "Model frozen",
      text: "Coordinated model approved and frozen before fabrication.",
      labels: [{ anchor: "office", text: "Design and BIM office" }],
    },
    {
      key: "cutlist",
      label: "Spool and cut list",
      eyebrow: "Step 2",
      title: "Spool and cut list",
      text: "Spool drawings and cut lists taken from the model.",
      labels: [
        { anchor: "store", text: "Store" },
        { anchor: "saw", text: "Cutting line" },
      ],
    },
    {
      key: "produce",
      label: "Produce and test",
      eyebrow: "Step 3",
      title: "Produce and test",
      text: "Cut, grooved, threaded and assembled; every spool tested.",
      labels: [
        { anchor: "bays", text: "Fabrication bays" },
        { anchor: "assembly", text: "Assembly" },
        { anchor: "test", text: "Pressure test" },
      ],
    },
    {
      key: "tag",
      label: "Tag",
      eyebrow: "Step 4",
      title: "Tag",
      text: "QR label from the model record fixed to every assembly.",
      labels: [{ anchor: "tags", text: "QR tags" }],
    },
    {
      key: "kit",
      label: "Kit",
      eyebrow: "Step 5",
      title: "Kit",
      text: "Packed by floor and zone with hangers and consumables.",
      labels: [{ anchor: "kits", text: "Kit wagons" }],
    },
    {
      key: "slot",
      label: "Booked slot",
      eyebrow: "Step 6",
      title: "Booked slot",
      text: "Dispatched to a booked gate slot on the delivery plan.",
      labels: [
        { anchor: "trucks", text: "Dispatch" },
        { anchor: "gate", text: "Gate" },
      ],
    },
    {
      key: "hoist",
      label: "Hoist to the floor",
      eyebrow: "Step 7",
      title: "Hoist to the floor",
      text: "Scanned at the gate and again at the hoist landing.",
      labels: [
        { anchor: "sitegate", text: "Site gate scan" },
        { anchor: "hoist", text: "Hoist landing scan" },
      ],
    },
    {
      key: "install",
      label: "Install and scan",
      eyebrow: "Step 8",
      title: "Install and scan",
      text: "Scanned at installation; the tag record becomes the as built.",
      labels: [{ anchor: "installed", text: "Installed and scanned" }],
    },
  ]),
};

/* ------------------------------------------------------------------
   Floor kits: one kit per repeating floor
   ------------------------------------------------------------------ */
const kitsDemo: CapBlock = {
  // Deck 06, slide 29. The four stops are the four steps on the slide.
  kind: "building",
  model: "floor-kits",
  subject: "a tower with repeating floors",
  id: "demo",
  nav: "How it works",
  eyebrow: "Floor kits for repeating floors",
  title: "Engineered once. One kit per floor. One fix.",
  lede: "The typical floor is engineered once and built at Bhondsi as one kit per floor, so installation on site is quick, direct and done in one fix.",
  hint: "Scroll to follow a kit to its floor",
  image: `${STILLS}floor-kits-intro.jpg`,
  chapters: stops("floor-kits", [
    {
      key: "design",
      label: "Design once",
      eyebrow: "Step 1",
      title: "Design once",
      text: "One typical floor is modelled, coordinated and frozen. The same design serves every repeating floor.",
      labels: [
        { anchor: "riserset", text: "Riser set" },
        { anchor: "spool", text: "Spools" },
        { anchor: "branch", text: "Branch trees" },
      ],
    },
    {
      key: "kit",
      label: "Build the kit",
      eyebrow: "Step 2",
      title: "Build the kit",
      text: "Riser set, spools, branch trees, supports and consumables for one floor, tested and tagged at the yard.",
      labels: [
        { anchor: "wagon", text: "One kit, one floor" },
        { anchor: "consumables", text: "Supports and consumables" },
      ],
    },
    {
      key: "deliver",
      label: "Deliver by floor",
      eyebrow: "Step 3",
      title: "Deliver by floor",
      text: "One kit per floor, sent in installation order to a booked slot and hoisted to the floor.",
      labels: [
        { anchor: "truck", text: "Booked slot" },
        { anchor: "mast", text: "Hoist" },
      ],
    },
    {
      key: "fix",
      label: "One fix",
      eyebrow: "Step 4",
      title: "One fix",
      text: "Coupled, pressed and bolted in a single visit. Nothing cut, threaded or welded at height.",
      labels: [{ anchor: "fixed", text: "Installed in one fix" }],
    },
  ]),
};

/* ------------------------------------------------------------------
   Intelligent buildings: AI in the building controls
   ------------------------------------------------------------------ */
const smartDemo: CapBlock = {
  // Deck 06, slide 31. The four stops are the four steps on the slide.
  kind: "building",
  model: "smart-building",
  subject: "a building with its controls",
  id: "demo",
  nav: "How it works",
  eyebrow: "Intelligent buildings",
  title: "AI embedded in the building controls.",
  lede: "It flags failures before they happen and shows where energy and money are being lost.",
  image: `${STILLS}smart-building-intro.jpg`,
  chapters: stops("smart-building", [
    {
      key: "sense",
      label: "Sense",
      eyebrow: "Step 1",
      title: "Sense",
      text: "Meters, sensors and equipment data from every plant room and floor.",
      labels: [
        { anchor: "ddc", text: "Floor sensors" },
        { anchor: "chillers", text: "Plant data" },
        { anchor: "lt", text: "Meters" },
      ],
    },
    {
      key: "learn",
      label: "Learn",
      eyebrow: "Step 2",
      title: "Learn",
      text: "AI models learn how each system behaves in normal operation.",
      labels: [{ anchor: "bmsroom", text: "BMS head end" }],
    },
    {
      key: "predict",
      label: "Predict",
      eyebrow: "Step 3",
      title: "Predict",
      text: "Drift and faults flagged early, so repairs are planned and not emergencies.",
      labels: [
        { anchor: "chillers", text: "Chillers" },
        { anchor: "towers", text: "Cooling towers" },
      ],
    },
    {
      key: "save",
      label: "Save",
      eyebrow: "Step 4",
      title: "Save",
      text: "Wasted energy found and costed every month, with the action that fixes it.",
      labels: [
        { anchor: "lt", text: "Energy metering" },
        { anchor: "solar", text: "PV solar" },
        { anchor: "substation", text: "Substation" },
      ],
    },
  ]),
};

export const VALUE_PAGES: CapPage[] = [
  page({
    slug: "dfma-modular-mep",
    name: "DfMA and modular MEP",
    blocks: [
      dfmaDemo,
      { ...dfmaBlock(), nav: "In the workshop" },
      dfmaDetailBlock(),
    ],
  }),
  page({
    slug: "prefabrication-yard",
    name: "Prefabrication at Bhondsi",
    blocks: [
      yardDemo,
      {
        // Deck 06, slide 28: the material flow strip under the steps.
        kind: "cards",
        id: "flow",
        nav: "Material flow",
        eyebrow: "Material flow",
        title: "Where each part of the work is done.",
        columns: 3,
        numbered: true,
        items: [
          {
            title: "Factory",
            text: "Pipe, valves, supports and plant made and tested by approved makers, with certificates.",
          },
          {
            title: "Bhondsi yard",
            text: "Spools, riser sets, branch trees, valve stations, support frames and kits prefabricated, tested and tagged.",
          },
          {
            title: "Site",
            text: "Coupled, pressed and bolted in place. Nothing cut, threaded or welded at height.",
          },
        ],
        note: "One QR tag follows each assembly from the cut list to the as built record.",
      },
    ],
  }),
  page({
    slug: "floor-kits",
    name: "Floor kits",
    // The steps are told by the model. The comparison under them stays.
    blocks: [kitsDemo, ...floorKitBlocks().slice(1)],
  }),
  page({
    slug: "ai-workflows",
    name: "AI native workflows",
    blocks: [{ ...aiBlock(), nav: "Workflows" }],
  }),
  page({
    slug: "intelligent-buildings",
    name: "Intelligent buildings",
    blocks: [
      smartDemo,
      {
        // Deck 06, slide 31: the list beside the steps.
        kind: "tiles",
        id: "division",
        nav: "The division",
        eyebrow: "Intelligent Solutions division",
        title: "Delivered in house, by a team of eight.",
        items: [],
        also: {
          label: "What the division delivers",
          items: [
            "BMS and plant controls",
            "Energy metering and monitoring",
            "Alarm rationalisation",
            "Anomaly detection",
            "Analytics and lifecycle data",
          ],
        },
      },
      {
        kind: "cards",
        id: "bms-service",
        eyebrow: "BMS, ELV and intelligent buildings",
        title: "Delivered by our own controls team.",
        columns: 2,
        items: [
          {
            title: "BMS, ELV and intelligent buildings",
            text: "Scope, projects, operator graphics and delivery method for building management and extra low voltage systems.",
            href: "/services/ibms",
          },
        ],
      },
    ],
  }),
];

export function getValuePage(slug: string): CapPage | undefined {
  return VALUE_PAGES.find((p) => p.slug === slug);
}

/** The index page: all eight value additions. */
export const VALUE_INDEX: CapPage = {
  slug: "why-unique",
  name: "Why Unique",
  eyebrow: "About Unique Engineers",
  title: "Why Unique Engineers.",
  description: "Value we add beyond installing the specification.",
  blocks: [
    {
      kind: "cards",
      id: "value",
      eyebrow: "Eight value additions",
      title: "What clients get in addition to the installation itself.",
      lede: "The first five each have a page of their own.",
      items: WHY_VALUE_ADDITIONS,
      columns: 4,
      numbered: true,
    },
  ],
};
