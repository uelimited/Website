/**
 * Project library for the capability pages.
 *
 * DECK_PROJECTS (projects.deck.ts) holds the project, scope split and
 * scope of work slides of decks 02, 04, 06 and 07. The entries below are
 * written by hand from slides whose layout differs: the BITSoM slide
 * in deck 07 and the five BMS and ELV project slides in deck 09.
 */
import { DECK_PROJECTS } from "./projects.deck";
import type { CapProject } from "./types";

const A = "/project-archive/";

const HAND: Record<string, CapProject> = {
  // Deck 07, slide 21. Status follows deck 09, slide 13, which is newer.
  "bitsom-campus": {
    id: "bitsom-campus",
    name: "BITSoM campus, Kalyan",
    short: "BITSoM campus",
    href: "/projects/bitsom-mumbai",
    image: A + "bitsom-mumbai/hero.jpg",
    imageAlt: "BITSoM campus, Kalyan",
    facts: [
      {
        label: "Client",
        value: "BITS School of Management",
        note: "Direct contracts",
      },
      { label: "Location", value: "Kalyan, Mumbai Metropolitan Region" },
      {
        label: "Status",
        value: "IBMS completed, 2026",
        note: "Heat pump hot water active to March 2027",
      },
      {
        label: "Packages",
        value: "2 packages",
        note: "IBMS, heat pump hot water",
      },
      {
        label: "Facility",
        value: "Education campus",
        note: "Academic blocks and five hostels",
      },
      {
        label: "Programme",
        value: "October 2026 to March 2027",
        note: "Hostel programme",
      },
    ],
    scope:
      "Integrated building management for the campus, and a turnkey heat pump hot water system for student hostels 01 to 05.",
    highlights: [
      {
        title: "IBMS",
        text: "Campus wide integrated building management on a Honeywell platform, from design and panels to field devices, commissioning and operator training.",
      },
      {
        title: "Heat pumps",
        text: "Air source heat pumps with SS 316L mixing tanks of 5,000 litres each, sized at 45 litres per person per day.",
      },
      {
        title: "Delivery",
        text: "Hostel by hostel cutovers in low occupancy windows, so hot water is never lost across the campus.",
      },
    ],
    note: "Design, supply, installation, testing and commissioning, with data sheets, P&ID and control logic approved before manufacture.",
  },

  /* ---------------- Deck 09: BMS and ELV projects ---------------- */

  // Deck 09, slide 12
  "bms-nalanda": {
    id: "bms-nalanda",
    name: "Nalanda University",
    short: "Nalanda University",
    lede: "IBMS for a net zero university campus in Rajgir, Bihar.",
    href: "/projects/nalanda-university",
    image: A + "nalanda-university/hero.jpg",
    imageAlt: "Nalanda University",
    facts: [
      { label: "Client", value: "Nalanda University" },
      { label: "Location", value: "Rajgir, Bihar" },
      { label: "Status", value: "Completed" },
    ],
    scope:
      "IBMS and plant monitoring for a net zero campus, delivered with the HVAC, thermal storage and geothermal systems, and maintained by our service team after handover.",
    stats: [
      { value: "7", label: "Plant areas on the BMS" },
      { value: "6", label: "Chillers in the central plant" },
      { value: "AMC", label: "After handover" },
    ],
    highlights: [
      {
        title: "Plant control",
        text: "Brine and screw chillers, thermal storage, pumps and heat exchangers monitored on one system.",
      },
      {
        title: "Energy records",
        text: "Energy meters and trend logs across the plant rooms, with weekly and monthly consumption logs.",
      },
      {
        title: "After handover",
        text: "Annual maintenance by our service team, with the operating data kept for analysis.",
      },
    ],
  },
  // Deck 09, slide 13
  "bms-bitsom": {
    id: "bms-bitsom",
    name: "BITSoM campus, Kalyan",
    short: "BITSoM campus",
    lede: "Integrated BMS for the BITS Pilani campus at Kalyan, Mumbai, as a standalone contract.",
    href: "/projects/bitsom-mumbai",
    image: A + "bitsom-mumbai/hero.jpg",
    imageAlt: "BITSoM campus, Kalyan",
    facts: [
      { label: "Client", value: "BITS Pilani" },
      { label: "Location", value: "Kalyan, Mumbai" },
      { label: "Status", value: "Completed, 2026" },
    ],
    scope:
      "One BMS across all 21 blocks of the campus: academic blocks, hostels, housing, dining, sports and utilities, on Honeywell WEBs. Every block, plant room and alarm is reached from one campus screen.",
    stats: [
      { value: "21", label: "Blocks on one BMS" },
      { value: "30,000", label: "Point capacity on three controllers" },
      { value: "700+", label: "Graphic and trend screens" },
    ],
    highlights: [
      {
        title: "Four layers",
        text: "Field devices, DDC controllers, supervisory controllers and head end software on BACnet IP.",
      },
      {
        title: "Third party integration",
        text: "Chiller plant, DG sets, transformers, LT panels, solar, energy meters, pumps, fire alarm and lifts on one head end.",
      },
      {
        title: "Submittals",
        text: "97 datasheets, 67 drawings and 19 IO summaries taken through approval.",
      },
    ],
  },
  // Deck 09, slide 16
  "bms-prestige": {
    id: "bms-prestige",
    name: "Prestige BKC 101",
    short: "Prestige BKC 101",
    lede: "Full ELV and BMS inside our MEP contract for an office tower and hotel at BKC, Mumbai.",
    href: "/projects/prestige-bkc-101",
    image: A + "prestige-bkc-101/hero.jpg",
    imageAlt: "Prestige BKC 101",
    facts: [
      { label: "Client", value: "Prestige Group" },
      { label: "Location", value: "BKC, Mumbai" },
      { label: "Status", value: "Active" },
    ],
    scope:
      "Design, supply, installation, testing and commissioning of three packages. BMS and fire alarm with voice evacuation cover the office tower and the 182 key hotel. ELV and security cover the office tower.",
    stats: [
      { value: "3", label: "Packages: BMS, fire alarm, ELV and security" },
      { value: "2", label: "Buildings: office tower and hotel" },
      { value: "2.25 M", label: "Sq ft, 4 basements, ground and 19 floors" },
    ],
    highlights: [
      {
        title: "BMS",
        text: "Office tower and hotel. 193 controllers, ten third party systems and tenant energy billing on one architecture.",
      },
      {
        title: "Fire alarm and voice evacuation",
        text: "Office tower and hotel. About 6,000 detectors, 2,800 speakers and 312 cause and effect mappings.",
      },
      {
        title: "ELV and security",
        text: "Office tower. 888 cameras, 125 access controllers, 300 Wi Fi access points and about 1,400 data points.",
      },
    ],
  },
  // Deck 09, slide 20
  "bms-ikea": {
    id: "bms-ikea",
    name: "IKEA, INGKA Centre, Noida",
    short: "IKEA, INGKA Centre",
    lede: "Chiller plant manager and HVAC plant controls inside our MEPF package.",
    href: "/projects/ingka-centre-ikea",
    image: A + "ingka-centre-ikea/hero.jpg",
    imageAlt: "IKEA, INGKA Centre, Noida",
    facts: [
      { label: "Client", value: "INGKA Centres" },
      { label: "Location", value: "Noida, Uttar Pradesh" },
      { label: "Status", value: "Active" },
    ],
    scope:
      "The chiller plant manager for the mixed use centre, with a chiller optimiser, sensors and software on open protocols, delivered with the HVAC plant we are installing.",
    stats: [
      {
        value: "1,000 TR",
        label: "Centrifugal chillers under the plant manager",
      },
      { value: "₹410 cr", label: "MEPF package, August 2026 order book" },
    ],
    highlights: [
      {
        title: "Chiller plant manager",
        text: "Central control stations and software that sequence the chillers and optimise the plant.",
      },
      {
        title: "Drives and pumps",
        text: "Pump and cooling tower drives integrated over IP, with data in both directions.",
      },
      {
        title: "Energy meters",
        text: "Chillers, pumps and cooling towers metered and reported through the plant manager.",
      },
    ],
  },
  // Deck 09, slide 21
  "bms-foxconn": {
    id: "bms-foxconn",
    name: "Foxconn, Bengaluru",
    short: "Foxconn",
    lede: "PLC based control of air handling and make up air units, as a standalone order.",
    href: "/projects/foxconn-bangalore",
    image: A + "foxconn-bangalore/hero.jpg",
    imageAlt: "Foxconn, Bengaluru",
    facts: [
      { label: "Client", value: "Foxconn, through Cinda" },
      { label: "Location", value: "Devanahalli, Bengaluru" },
      { label: "Status", value: "Active" },
    ],
    scope:
      "Supply, installation, testing and commissioning of the AHU and MAU control system across 13 buildings and 36 floors of the manufacturing campus.",
    stats: [
      { value: "121", label: "PLC panels" },
      { value: "3,220", label: "Sensors and meters" },
      { value: "205 km", label: "Control cable" },
      { value: "₹26.4 cr", label: "Work order value" },
    ],
    highlights: [
      {
        title: "Distributed control",
        text: "A master PLC with a touchscreen in each building, and remote I/O panels on the upper floors.",
      },
      {
        title: "Cleanroom monitoring",
        text: "101 particle counters with temperature, humidity and pressure sensing.",
      },
      {
        title: "Fast programme",
        text: "Ten weeks on a double shift, with NABL calibrated instruments and loop check records.",
      },
    ],
  },
};

export const CAP_PROJECTS: Record<string, CapProject> = {
  ...DECK_PROJECTS,
  // Deck 06, slide 18 has no scope of work slide. The package is HVAC
  // only, so its scope line stands as the HVAC column.
  "m3m-mansion": {
    ...DECK_PROJECTS["m3m-mansion"],
    split: [
      {
        service: "hvac",
        share: "VRV air conditioning and air purification",
        text: DECK_PROJECTS["m3m-mansion"].scope,
      },
    ],
  },
  ...HAND,
};

/**
 * The deck notes list every service, including those with no share
 * ("Electrical 0%, PHE 0% and FF 0%"). On the page only the services
 * that carry a share are named. The figures themselves are unchanged.
 */
function trimSplitNote(note: string): string {
  const m = note.match(/^(MEP totals \d+%): ([^.]+)\.(.*)$/);
  if (!m) return note;
  const parts = m[2]
    .split(/,\s*|\s+and\s+/)
    .map((x) => x.trim())
    .filter((x) => x && !/\b0%$/.test(x));
  if (parts.length < 2) {
    const only = (parts[0] ?? "").replace(/\s*\d+%$/, "");
    return `${m[1]}, all of it ${only}.${m[3]}`;
  }
  const list = `${parts.slice(0, -1).join(", ")} and ${parts[parts.length - 1]}`;
  return `${m[1]}: ${list}.${m[3]}`;
}

export function getCapProject(id: string): CapProject {
  const p = CAP_PROJECTS[id];
  if (!p) throw new Error(`Unknown capability project: ${id}`);
  return p.splitNote ? { ...p, splitNote: trimSplitNote(p.splitNote) } : p;
}
