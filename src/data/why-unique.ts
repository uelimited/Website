/**
 * The value additions that have a page of their own (/why-unique/...).
 * One list feeds the site menu and the Why Unique cards, so a name or a
 * line changes in one place. Deck 06, slide 26.
 */
export const WHY_PAGES = [
  {
    slug: "dfma-modular-mep",
    name: "DfMA and modular MEP",
    text: "Spools, riser sets, valve stations and pump skids built and tested off site, then lifted in when the workfront is ready.",
  },
  {
    slug: "prefabrication-yard",
    name: "Prefabrication at Bhondsi",
    text: "Our own yard in Gurugram cuts, joins, tests and tags assemblies before they reach site.",
  },
  {
    slug: "floor-kits",
    name: "Floor kits",
    text: "Each repeating floor arrives as one tagged kit and is installed in one fix, with nothing cut at height.",
  },
  {
    slug: "ai-workflows",
    name: "AI native workflows",
    text: "AI copilots for tender extraction, method statements, contract review and meeting synthesis, signed off by the accountable engineer.",
  },
  {
    slug: "intelligent-buildings",
    name: "Intelligent buildings",
    text: "BMS and controls delivered in house, with AI for predictive maintenance and energy savings after handover.",
  },
] as const;
