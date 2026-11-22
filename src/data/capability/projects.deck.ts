// Project facts, scope splits and scope of work, taken slide by slide from
// the capability decks (November 2026). The source slide is noted on each
// project. When a deck changes, change the matching entry here by hand.
// `href` is the project's page. Where the project archive has no record
// (CtrlS HYD 141, AdaniConneX, Jagiroad) the page is built from this entry.
import type { CapProject } from "./types";

export const DECK_PROJECTS: Record<string, CapProject> = {
  // Deck 02, slide 13
  "ctrls-dc6-7": {
    id: "ctrls-dc6-7",
    name: "CtrlS DC6 and 7, Navi Mumbai",
    short: "CtrlS DC6 and 7",
    href: "/projects/ctrls-mahape-mumbai",
    image: "/project-archive/ctrls-mahape-mumbai/hero.jpg",
    imageAlt: "CtrlS DC6 and 7, Navi Mumbai",
    facts: [
      {
        label: "Client",
        value: "CtrlS Datacenters Limited",
        note: "Rated 4 hyperscale operator",
      },
      { label: "Location", value: "Mahape, Navi Mumbai" },
      {
        label: "Status",
        value: "3 active projects",
        note: "Featured packages: DC6 and DC7",
      },
      {
        label: "Work order value",
        value: "₹100+ cr",
        note: "Across 3 active projects",
      },
      {
        label: "Facility",
        value: "20 MW",
        note: "Floors 6 to 9 of a live colocation facility",
      },
      { label: "Programme", value: "8 months" },
    ],
    scope:
      "Civil and interiors: fire rated partitions, epoxy and PU flooring, two hour fire doors, C strut ceiling grid, fire stopping. Electrical: HT from the floor tapping to floor HT panels and CSS, LT from CSS to rack sockets, with the free issue CSS, DG, HT and LT panels, UPS and PDUs installed and commissioned. HVAC: air cooling and liquid cooling chilled water rings, ventilation, VRF, hot aisle containment, DX dehumidifiers. IBMS and ELV: BMS, MaxCool, EPMS, VESDA, water leak detection, fire alarm, access control, PA, CCTV. Fire and PHE: double interlock pre action sprinklers, extinguishers, floor drainage.",
    highlights: [
      {
        title: "Live facility fit out",
        text: "Four floors executed inside an operating facility under change control and methods of procedure, without interrupting the live IT load on the floors below.",
      },
      {
        title: "Liquid cooling ready",
        text: "On floors 8 and 9 the liquid cooling chilled water ring is sized for about 90 percent of IT load and the air cooling ring for about 40 percent, with tap offs to CDU interfaces.",
      },
      {
        title: "Integrated systems testing",
        text: "A dedicated IST package: a 90 day commissioning team, witnessing L2 and L3, leading L4 and L5, 275 rack load banks of 19 kW, power quality and thermography, relay and CT testing.",
      },
    ],
    note: "Three active projects in Navi Mumbai, supported by repeat work in Hyderabad.",
    split: [
      {
        service: "hvac",
        share: "32% illustrative",
        pct: 32,
        text: "Chilled water rings for PAHUs, fan walls and liquid cooling CDU interfaces. Ventilation for battery, transformer and CSS rooms. VRF for support areas, hot aisle containment, DX dehumidifiers and modular supports.",
      },
      {
        service: "electrical",
        share: "25% illustrative",
        pct: 25,
        text: "HT floor distribution and CSS connections. LT feeders, submains and rack power. Installation of free issue switchgear, DG, UPS, batteries and PDUs. Lighting, earthing, bonding and cable containment.",
      },
      {
        service: "phe",
        share: "3% illustrative",
        pct: 3,
        text: "Water supply and drainage for toilets. Floor drainage for data halls and technical rooms. Sanitary connections within the floor fit out.",
      },
      {
        service: "fire",
        share: "5% illustrative",
        pct: 5,
        text: "Double interlock pre action sprinklers, cabinets, pipework, valves and heads. Portable fire extinguishers and coordinated fire system interfaces.",
      },
      {
        service: "bms",
        share: "20% illustrative",
        pct: 20,
        text: "DDC controls and MaxCool PLC integration. VESDA, water leak detection, fire alarm, access control, PA and CCTV. EPMS communications and ELV networks.",
      },
      {
        service: "civil",
        share: "15% illustrative",
        pct: 15,
        text: "Fire rated partitions, doors and ceilings. Epoxy and PU flooring, plaster and paint. Support grids, fire stopping, sanitary fit out and making good.",
      },
    ],
    splitNote:
      "MEP totals 65%: HVAC 32%, Electrical 25%, PHE 3% and FF 5%. ELV & BMS is 20% and Civil is 15%. The split illustrates scope; it does not measure contract value, quantities or progress.",
  },
  // Deck 02, slide 16
  "ctrls-hyd-141": {
    id: "ctrls-hyd-141",
    name: "CtrlS HYD 141, Hyderabad",
    short: "CtrlS HYD 141",
    href: "/projects/ctrls-hyd-141",
    image: "/capability/projects/ctrls-hyd-141.jpg",
    imageAlt: "Repeat award from CtrlS after the Navi Mumbai floors",
    facts: [
      {
        label: "Client",
        value: "CtrlS Datacenters Limited",
        note: "Repeat client",
      },
      { label: "Location", value: "Chandanvelly, Hyderabad" },
      {
        label: "Status",
        value: "2 active projects",
        note: "Commenced 1 September 2026",
      },
      {
        label: "Work order value",
        value: "₹100+ cr",
        note: "Across 2 active projects",
      },
      {
        label: "Facility",
        value: "700+ MW campus",
        note: "Chandanvelly, scalable to 1.4 GW",
      },
      { label: "Programme", value: "8 months", note: "Handover 30 April 2027" },
    ],
    scope:
      "Electrical, HVAC, IBMS, BMS and MaxCool, CCTV and ELV, fire protection and PHE for the ground floor, covering COLP 1, COLP 2, the lower ground floor, common services and base build interfaces, from supply and lifting through installation, L1 to L5 testing, commissioning and handover.",
    highlights: [
      {
        title: "Power to the rack",
        text: "22 kV HT tie and CSS cables, LT feeders to 16 line ups, PDUs, UPS, fan wall units, PAHUs and CDUs, distribution boards, earthing, and rack whips and sockets on five tiers of wire mesh containment.",
      },
      {
        title: "Cooling and liquid cooling interfaces",
        text: "Chilled water floor and header piping with valves, insulation and cladding, connections to the CDUs, and 22 industrial DX dehumidifiers with standby units for both halls.",
      },
      {
        title: "Detection, control and testing",
        text: "VESDA, water leak detection, fire alarm devices, BMS, MaxCool, EPMS connectivity, access control and CCTV, with the interface coordination role and integrated systems testing manpower.",
      },
    ],
    note: "Chilled water headers, valve stations, pump skids, pre action valve sets and containment planned for DfMA delivery from a near site hub.",
    split: [
      {
        service: "hvac",
        share: "38% illustrative",
        pct: 38,
        text: "Chilled water floor and header piping with valves, supports, insulation and cladding. CDU connections for liquid cooling. Industrial DX dehumidifiers for COLP 1 and COLP 2.",
      },
      {
        service: "electrical",
        share: "31% illustrative",
        pct: 31,
        text: "HT tie and CSS cables; LT power distribution to UPS, PDUs, cooling equipment and racks. Free issue panel installation. Lighting, DBs, earthing and multilevel cable containment.",
      },
      {
        service: "phe",
        share: "3% illustrative",
        pct: 3,
        text: "Floor drainage for halls, panel and battery rooms. Toilet water supply and drainage, with traps, supports and insulation.",
      },
      {
        service: "fire",
        share: "6% illustrative",
        pct: 6,
        text: "Double interlock pre action sprinklers, cabinets, pipework and valves. Wet sprinklers in lower ground stores. Portable extinguishers and signage.",
      },
      {
        service: "bms",
        share: "22% illustrative",
        pct: 22,
        text: "BMS controllers, field devices and MaxCool interfaces. VESDA, water leak detection and fire alarm. Access control, PA, CCTV, ELV racks and switches, and EPMS links.",
      },
    ],
    splitNote:
      "MEP totals 78%: HVAC 38%, Electrical 31%, PHE 3% and FF 6%. ELV & BMS is 22%. The split illustrates scope; it does not measure contract value, quantities or progress.",
  },
  // Deck 02, slide 19
  "digital-edge-bom131": {
    id: "digital-edge-bom131",
    name: "Digital Edge BOM131, Navi Mumbai",
    short: "Digital Edge BOM131",
    href: "/projects/digital-edge-bom01",
    image: "/project-archive/digital-edge-bom01/hero.jpg",
    imageAlt: "Digital Edge BOM131, Navi Mumbai",
    facts: [
      {
        label: "Client",
        value: "Tata Projects Limited",
        note: "For Digital Edge",
      },
      { label: "Location", value: "Navi Mumbai" },
      {
        label: "Status",
        value: "Active",
        note: "Notice to proceed February 2026",
      },
      {
        label: "Work order value",
        value: "₹50.62 cr",
        note: "Including GST, order book of August 2026",
      },
      { label: "Facility", value: "48 MW", note: "Hyperscale, high density" },
      { label: "Programme", value: "8 months" },
    ],
    scope:
      "HVAC package: engineering, procurement, fabrication, supply, installation, testing, commissioning and handover of the treated fresh air and ventilation plant, chilled water distribution, thermal storage and pump installation, air distribution, VRF comfort cooling, insulation, drawings and handover documents.",
    highlights: [
      {
        title: "Cooling distribution",
        text: "About 13,500 metres of chilled water pipe from 25 to 450 mm with actuated valves, balancing and instruments, plus installation and commissioning of 26 client supplied thermal storage tanks of 21 cubic metres, sized for 315 seconds of ride through, and 26 split case pumps.",
      },
      {
        title: "Air and ventilation",
        text: "Seven treated fresh air units, 55 explosion proof battery room ventilation units, 15 desiccant dehumidifiers, 20 jet fans, smoke extract and make up fans and two hour fire rated duct.",
      },
      {
        title: "VRF",
        text: "45 outdoor units from 8 to 60 HP, 198 indoor units and about 17,200 metres of refrigerant pipe, with a central controller on BACnet and Modbus.",
      },
    ],
    note: "The complete HVAC package of a hyperscale facility, engineered and fabricated by Unique Engineers and awarded through Tata Projects.",
    split: [
      {
        service: "hvac",
        share: "94% illustrative",
        pct: 94,
        text: "About 13.5 km of chilled water piping. Installation of 26 client supplied thermal storage tanks and 26 split case pumps. Fresh air, smoke extraction, dehumidification, ventilation, ductwork and VRF systems.",
      },
      {
        service: "electrical",
        share: "No separate package",
        included: false,
        text: "No separate package in this scope.",
      },
      {
        service: "phe",
        share: "No separate package",
        included: false,
        text: "No separate package in this scope.",
      },
      {
        service: "fire",
        share: "No separate package",
        included: false,
        text: "No separate package in this scope.",
      },
      {
        service: "bms",
        share: "6% illustrative",
        pct: 6,
        text: "HVAC valve actuators, temperature and pressure sensing, and equipment interfaces. Central VRF controls with BACnet and Modbus connectivity to the receiving BMS.",
      },
    ],
    splitNote:
      "MEP totals 94%: HVAC 94%, Electrical 0%, PHE 0% and FF 0%. ELV & BMS is 6%. The split illustrates scope; it does not measure contract value, quantities or progress.",
  },
  // Deck 02, slide 22
  "adaniconnex-hyd": {
    id: "adaniconnex-hyd",
    name: "AdaniConneX HYD 22 and 23, Hyderabad",
    short: "AdaniConneX HYD 22 and 23",
    href: "/projects/adaniconnex-hyd-22-23",
    image: "/capability/projects/adaniconnex-hyd.jpg",
    imageAlt: "Two letters of intent from Larsen and Toubro, August 2026",
    facts: [
      { label: "Client", value: "Larsen and Toubro", note: "For AdaniConneX" },
      { label: "Location", value: "Hyderabad" },
      {
        label: "Status",
        value: "Active",
        note: "Two LOIs of 4 August 2026, mobilising",
      },
      {
        label: "Work order value",
        value: "₹65+ cr",
        note: "HVAC and fire protection",
      },
      {
        label: "Facility",
        value: "600 MW",
        note: "Potential IT load of the Hyderabad campus",
      },
      { label: "Programme", value: "Approx. 18 months" },
    ],
    scope:
      "HYD22: fire protection low side works. HYD23: HVAC low side works for a 30 MW build. Both as supply, installation, testing and commissioning, with LOD 400 and LOD 500 shop drawings and as builts, method statements, temporary works, statutory approvals and a 24 month defect liability period.",
    highlights: [
      {
        title: "Fire protection",
        text: "Double interlock pre action sprinklers with nitrogen generation, internal and external hydrants with monitors, high pressure water mist on stainless steel tube, electric, diesel, jockey and booster fire pumps, and extinguishers.",
      },
      {
        title: "HVAC low side",
        text: "Data hall recirculation and pressurisation units, VRF, ventilation and smoke control, chilled water distribution with motorised valves and BTU meters, ductwork on seismic Zone III supports, ten stratified thermal storage tanks, and installation of 22 free issue chillers, 60 fan wall units and 72 precision AHUs.",
      },
      {
        title: "Delivery method",
        text: "Parallel DfMA and non DfMA rates, modular supports and sway bracing with seismic calculations, factory fabrication and commissioning at levels 1 to 5.",
      },
    ],
    note: "Fire protection method statements, modular support details and DfMA pricing prepared for this campus now form part of the standard data centre library.",
    split: [
      {
        service: "hvac",
        share: "64% illustrative",
        pct: 64,
        text: "HYD23 chilled water distribution, AHUs, fresh air, pressurisation, VRF and ventilation. Installation of free issue chillers, fan walls and precision AHUs. Thermal storage, ductwork, insulation and seismic supports.",
      },
      {
        service: "electrical",
        share: "3% illustrative",
        pct: 3,
        text: "Equipment feeder cabling and motor connections within the HYD23 HVAC package. This allocation covers HVAC electrical works.",
      },
      {
        service: "phe",
        share: "No separate package",
        included: false,
        text: "No separate package in this scope.",
      },
      {
        service: "fire",
        share: "28% illustrative",
        pct: 28,
        text: "HYD22 pre action sprinklers, hydrants, ring mains, risers, hose reels and monitors. Water mist system, fire pumps, portable extinguishers and specified foam suppression.",
      },
      {
        service: "bms",
        share: "5% illustrative",
        pct: 5,
        text: "Motorised valves, BTU meters and HVAC field devices. Cooling equipment signals and fire system interfaces to the receiving BMS and specialist controls.",
      },
    ],
    splitNote:
      "MEP totals 95%: HVAC 64%, Electrical 3%, PHE 0% and FF 28%. ELV & BMS is 5%. The split illustrates scope; it does not measure contract value, quantities or progress.",
  },
  // Deck 02, slide 25
  "anant-raj": {
    id: "anant-raj",
    name: "Anant Raj Cloud Data Centre, Manesar",
    short: "Anant Raj Cloud",
    href: "/projects/anant-raj-cloud-data-centre",
    image: "/project-archive/anant-raj-cloud-data-centre/hero.jpg",
    imageAlt: "Anant Raj Cloud Data Centre, Manesar",
    facts: [
      { label: "Client", value: "Anant Raj Cloud Private Limited" },
      { label: "Location", value: "Manesar, Haryana" },
      { label: "Status", value: "Active" },
      {
        label: "Work order value",
        value: "₹28.80 cr",
        note: "Including GST, order book of August 2026",
      },
      {
        label: "Facility",
        value: "21 MW campus",
        note: "Tier III, about 450,000 sq ft of IT space",
      },
      { label: "Programme", value: "Approx. 18 months" },
    ],
    scope:
      "HVAC low side: air handling and ventilation equipment, chilled water distribution and drainage, air distribution, insulation and HVAC electrical. HVAC high side: the data centre chilled water plant and a separate comfort cooling plant for both towers. Firefighting: the wet sprinkler network on all floors of Towers D and E.",
    highlights: [
      {
        title: "Plant to rack",
        text: "Primary pump sets on inertia bases, five working and one standby per tower, variable speed secondary pumping with VFDs and redundant controllers, expansion tanks, air separators and MCCs, feeding double skin AHUs and treated fresh air units with EC fans.",
      },
      {
        title: "Low side detail",
        text: "Heavy class MS chilled water piping with PICVs, strainers and purge valves, UL 555 Class 1 motorised smoke and fire dampers, perforated raised floor grilles, closed cell insulation with cladding, and fan panels, XLPE cabling and IS 3043 earthing.",
      },
      {
        title: "Fire",
        text: "Wet sprinkler network from 25 to 150 mm with welded, threaded and grooved joints, UL and FM listed quick response heads, stainless braided flexible drops and electric flow switches.",
      },
    ],
    note: "Data hall and comfort cooling kept as separate hydraulic duties so the mission critical circuit can be operated and expanded without disturbance.",
    split: [
      {
        service: "hvac",
        share: "79% illustrative",
        pct: 79,
        text: "High side and low side HVAC for Towers D and E. Chiller connections, primary and secondary pumps, chilled water networks, AHUs, fresh air, ventilation, ducts, air terminals and insulation.",
      },
      {
        service: "electrical",
        share: "5% illustrative",
        pct: 5,
        text: "HVAC fan panels and MCCs, power cables and trays. Chiller terminations, double earthing and bonding. Electrical scope is associated with the HVAC package.",
      },
      {
        service: "phe",
        share: "No separate package",
        included: false,
        text: "No separate package in this scope.",
      },
      {
        service: "fire",
        share: "8% illustrative",
        pct: 8,
        text: "Wet sprinkler networks in MS and GI pipe. Quick response sprinkler heads and flexible drops. Supports, sleeves, firestop sealants and water flow switches.",
      },
      {
        service: "bms",
        share: "8% illustrative",
        pct: 8,
        text: "Variable speed pumping and differential pressure controls. Sensors, actuated valves and AHU interfaces. Plant monitoring, communications and fire signal interlocks.",
      },
    ],
    splitNote:
      "MEP totals 92%: HVAC 79%, Electrical 5%, PHE 0% and FF 8%. ELV & BMS is 8%. The split illustrates scope; it does not measure contract value, quantities or progress.",
  },
  // Deck 02, slide 28
  "stt-nmdc01": {
    id: "stt-nmdc01",
    name: "STT GDC NMDC01, Navi Mumbai",
    short: "STT GDC NMDC01",
    href: "/projects/stt-gdc-mumbai",
    image: "/project-archive/stt-gdc-mumbai/hero.jpg",
    imageAlt: "STT GDC NMDC01, Navi Mumbai",
    facts: [
      {
        label: "Client",
        value: "STT GDC India",
        note: "ST Telemedia Global Data Centres",
      },
      { label: "Location", value: "MIDC Mahape, Navi Mumbai" },
      { label: "Status", value: "Completed" },
      {
        label: "Value",
        value: "₹30 cr",
        note: "Project register billed value",
      },
      {
        label: "Facility",
        value: "28.4 MW campus",
        note: "11 acres, Tier III",
      },
      {
        label: "Programme",
        value: "1 year",
        note: "Ground and first floor package in 3 months",
      },
    ],
    scope:
      "HVAC supply, installation, testing and commissioning for the ground and first floors: the chilled water low side from the building headers, precision cooling installation, air side distribution and ventilation, supports and insulation, and performance verification.",
    highlights: [
      {
        title: "Fast track in a live facility",
        text: "The ground and first floor package delivered in three months inside an operating data centre under the operator's methods of procedure, hot work permits and controlled shutdowns.",
      },
      {
        title: "Precision",
        text: "Temperature to ±1 °C and humidity to ±5% RH, with leak tested joints and validated containment around live IT equipment.",
      },
      {
        title: "Acceptance",
        text: "Testing to the operator's protocol with NABL calibrated instruments and witnessed records, to ASHRAE thermal guidelines and SMACNA duct standards.",
      },
    ],
    note: "Zero downtime on existing infrastructure through the programme, the first of three mission critical awards in Navi Mumbai.",
    split: [
      {
        service: "hvac",
        share: "92% illustrative",
        pct: 92,
        text: "Chilled water distribution and CRAH, PAC, AHU and FCU connections. Valves, ductwork, insulation and air terminals. Ventilation for electrical, UPS and battery rooms, with precision cooling interfaces.",
      },
      {
        service: "electrical",
        share: "3% illustrative",
        pct: 3,
        text: "Power terminations to HVAC and precision cooling equipment at the agreed supply boundary.",
      },
      {
        service: "phe",
        share: "No separate package",
        included: false,
        text: "No separate package in this scope.",
      },
      {
        service: "fire",
        share: "No separate package",
        included: false,
        text: "No separate package in this scope.",
      },
      {
        service: "bms",
        share: "5% illustrative",
        pct: 5,
        text: "Cooling unit and AHU status, alarms and control signals. Damper and fire signal interfaces with the receiving control system.",
      },
    ],
    splitNote:
      "MEP totals 95%: HVAC 92%, Electrical 3%, PHE 0% and FF 0%. ELV & BMS is 5%. The split illustrates scope; it does not measure contract value, quantities or progress.",
  },
  // Deck 02, slide 31
  "stpi-mohali": {
    id: "stpi-mohali",
    name: "STPI Incubation Centre, Mohali",
    short: "STPI Mohali",
    href: "/projects/stpi-incubation-centre",
    image: "/project-archive/stpi-incubation-centre/hero.jpg",
    imageAlt: "STPI Incubation Centre, Mohali",
    facts: [
      {
        label: "Client",
        value: "CPWD",
        note: "For Software Technology Parks of India",
      },
      { label: "Location", value: "Mohali, Punjab" },
      {
        label: "Status",
        value: "Completed",
        note: "Followed by 36 months of operation and maintenance",
      },
      {
        label: "Value",
        value: "₹10 cr",
        note: "Project register billed value",
      },
      { label: "Facility", value: "Server rooms and incubation space" },
      { label: "Programme", value: "5 months", note: "June to November 2015" },
    ],
    scope:
      "HVAC including precision cooling for the data centre and a building management system, with 36 months of on site operation and comprehensive maintenance, under CPWD agreement 21/CCED/2015 to 16.",
    highlights: [
      {
        title: "Central plant",
        text: "Three 300 TR water cooled variable speed screw chillers with N+1 redundancy, three twin cell cooling towers, condenser and primary pumps with standby and variable speed secondary pumping.",
      },
      {
        title: "Data hall cooling",
        text: "In row precision cooling of 180 TR for six rack rows, 150 TR working and 30 TR standby, with cold aisle containment, and two 12 TR high sensible units for the UPS room in a 1+1 arrangement.",
      },
      {
        title: "Controls and operation",
        text: "BMS head end with open protocol integration of the chillers, fire alarm, 28 VAV boxes and DG and UPS monitoring, DDC controllers and BTU metering, then three years of on site operation and maintenance.",
      },
    ],
    note: "Data centre grade cooling and controls delivered and then operated for three years inside a government contracting framework.",
    split: [
      {
        service: "hvac",
        share: "78% illustrative",
        pct: 78,
        text: "Three 300 TR chillers, cooling towers and pumping. Chilled, hot and condenser water networks. AHUs, FCUs, VAVs and ventilation. In row precision cooling, UPS room cooling and cold aisle containment.",
      },
      {
        service: "electrical",
        share: "7% illustrative",
        pct: 7,
        text: "415 V HVAC panels, variable frequency drives, armoured cabling, cable trays and GI earthing. Motor shutdown interfaces to fire signals.",
      },
      {
        service: "phe",
        share: "No separate package",
        included: false,
        text: "No separate package in this scope.",
      },
      {
        service: "fire",
        share: "No separate package",
        included: false,
        text: "No separate package in this scope.",
      },
      {
        service: "bms",
        share: "15% illustrative",
        pct: 15,
        text: "BMS workstation, graphics, trends and alarms. DDC controllers, sensors and BTU meters. Integration of chillers, VAVs, fire alarm signals and scheduled DG, UPS and metering points.",
      },
    ],
    splitNote:
      "MEP totals 85%: HVAC 78%, Electrical 7%, PHE 0% and FF 0%. ELV & BMS is 15%. The split illustrates scope; it does not measure contract value, quantities or progress.",
  },
  // Deck 04, slide 12
  foxconn: {
    id: "foxconn",
    name: "Foxconn, Bengaluru",
    short: "Foxconn",
    href: "/projects/foxconn-bangalore",
    image: "/project-archive/foxconn-bangalore/hero.jpg",
    imageAlt: "Foxconn, Bengaluru",
    facts: [
      { label: "Client", value: "Foxconn", note: "Through Cinda Engineering" },
      { label: "Location", value: "Devanahalli, Bengaluru" },
      { label: "Status", value: "Active", note: "Campus work packages" },
      {
        label: "Work order value",
        value: "₹611 cr",
        note: "August 2026 order book",
      },
      {
        label: "Facility",
        value: "Electronics plant",
        note: "Manufacturing and support",
      },
      { label: "Programme", value: "Package specific" },
    ],
    scope:
      "Multiple campus packages spanning MEPF, cleanroom and process utilities, civil works and industrial automation.",
    highlights: [
      { title: "MEP", text: "MEPF, cleanroom and process utilities." },
      { title: "BMS", text: "Industrial BMS and AHU/MAU PLC." },
      { title: "Civil", text: "Civil and package enabling works." },
    ],
    note: "Package inspections, system test records, utility commissioning and phased area release.",
    split: [
      {
        service: "hvac",
        share: "33% illustrative",
        pct: 33,
        text: "HVAC, air handling and ventilation for manufacturing and support buildings. Cleanroom mechanical services and coordinated equipment connections within the awarded campus packages.",
      },
      {
        service: "electrical",
        share: "19% illustrative",
        pct: 19,
        text: "Electrical distribution and equipment connections across the awarded work orders. Power, cabling and energisation interfaces for manufacturing and support areas.",
      },
      {
        service: "phe",
        share: "10% illustrative",
        pct: 10,
        text: "Water and process utility piping. Compressed dry air, nitrogen, vacuum and precision utility connections.",
      },
      {
        service: "fire",
        share: "10% illustrative",
        pct: 10,
        text: "Firefighting networks, equipment and building interfaces within the campus MEPF work orders.",
      },
      {
        service: "bms",
        share: "13% illustrative",
        pct: 13,
        text: "PLC panels, HMI and automatic controls. Temperature, humidity and differential pressure monitoring, leak detection and particle counters. Field instrumentation, wiring and networks.",
      },
      {
        service: "civil",
        share: "15% illustrative",
        pct: 15,
        text: "Civil works within the campus packages. Cleanroom envelope interfaces, service openings, equipment access and local making good within the assigned packages.",
      },
    ],
    splitNote:
      "MEP totals 72%: HVAC 33%, Electrical 19%, PHE 10% and FF 10%. ELV & BMS is 13% and Civil is 15%. The split illustrates scope; it does not measure contract value, quantities or progress.",
  },
  // Deck 04, slide 15
  "tata-dholera": {
    id: "tata-dholera",
    name: "Tata Electronics, Dholera",
    short: "Tata Electronics, Dholera",
    href: "/projects/tata-electronics-dholera",
    image: "/capability/projects/tata-dholera-trestle.jpg",
    imageAlt: "Trestle piping at the Tata Dholera site",
    facts: [
      {
        label: "Client",
        value: "Tata Electronics",
        note: "Through Tata Projects / L&T",
      },
      { label: "Location", value: "Dholera, Gujarat" },
      { label: "Status", value: "Active", note: "Piping and precision piping" },
      {
        label: "Work order value",
        value: "Contract packages",
        note: "Piping, civil and duct banks",
      },
      {
        label: "Facility",
        value: "Semiconductor fab",
        note: "Underground and trestle",
      },
      { label: "Programme", value: "Package specific" },
    ],
    scope:
      "Underground and trestle utility piping, including chilled water, precision/process air, water and firefighting networks, with civil and duct bank works in the assigned TPL packages.",
    highlights: [
      {
        title: "Trestle piping",
        text: "Chilled water, process/precision air, warm water and water distribution.",
      },
      {
        title: "Underground utilities",
        text: "Fire water lines, hydrants, drainage, water and electrical ducts.",
      },
      {
        title: "Civil and duct banks",
        text: "Excavation, concrete works, chambers and conduits within TPL packages.",
      },
    ],
    note: "Coordinated piping delivery across plant areas and utility corridors.",
    split: [
      {
        service: "hvac",
        share: "Chilled water piping",
        text: "Chilled water and medium temperature chilled water lines on trestles, with valves, insulation, cladding and pipe supports. The package covers piping and connections.",
      },
      {
        service: "electrical",
        share: "Duct bank piping",
        text: "HDPE conduits and duct pipes for underground electrical routes. Coordinate duct banks and supports with the assigned civil works. No separate power distribution percentage is established.",
      },
      {
        service: "phe",
        share: "Water and process piping",
        text: "Domestic, industrial and reclaim water networks, drainage and effluent lines. Precision/process utilities include CDA, instrument air, breathing air and warm water piping.",
      },
      {
        service: "fire",
        share: "Fire water networks",
        text: "Underground and aboveground fire lines, hydrants, valves and accessories. The L&T and TPL underground BOQs carry separate firefighting allocations.",
      },
      {
        service: "bms",
        share: "No separate package",
        included: false,
        text: "No separate ELV or BMS package in this scope.",
      },
      {
        service: "civil",
        share: "TPL package scope",
        text: "Excavation, bedding, thrust blocks and duct bank concrete/chambers within TPL packages. L&T underground civil activities remain in L&T scope. Separate duct bank rates are unavailable.",
      },
    ],
    splitNote:
      "Package specific scope across the Tata Projects and L&T work fronts.",
  },
  // Deck 04, slide 20
  "tata-jagiroad": {
    id: "tata-jagiroad",
    name: "Tata Electronics, Jagiroad",
    short: "Tata Electronics, Jagiroad",
    href: "/projects/tata-electronics-jagiroad",
    image: "/capability/projects/tata-jagiroad.jpg",
    imageAlt: "Tata Electronics, Jagiroad",
    facts: [
      {
        label: "Client",
        value: "Tata Electronics",
        note: "Through Larsen & Toubro",
      },
      { label: "Location", value: "Jagiroad, Assam" },
      { label: "Status", value: "Active", note: "HVAC works" },
      {
        label: "BOQ value before GST",
        value: "₹30.95 cr",
        note: "R03 final offer, December 2025",
      },
      {
        label: "Facility",
        value: "Assembly and test",
        note: "Non plant buildings",
      },
      { label: "Programme", value: "Package specific" },
    ],
    scope:
      "HVAC works for the Jagiroad facility, covering air conditioning equipment, chilled water piping, ductwork and ventilation, with associated HVAC electrical work and controls.",
    highlights: [
      {
        title: "Air conditioning",
        text: "AHUs, fan coil and scheduled DX/VRF equipment for the assigned buildings.",
      },
      {
        title: "Air and water distribution",
        text: "Ducts, fans, chilled water networks, insulation and supports.",
      },
      {
        title: "HVAC electrical and controls",
        text: "Starter panels, power/control wiring and field interfaces.",
      },
    ],
    note: "HVAC delivery across nine non plant buildings in the R03 BOQ.",
    split: [
      {
        service: "hvac",
        share: "96.7% of BOQ value",
        pct: 96.7,
        text: "Air conditioning equipment, AHUs, FCUs and scheduled DX/VRF units. Chilled water piping, ductwork, ventilation, insulation, controls and seismic supports.",
      },
      {
        service: "electrical",
        share: "3.3% of BOQ value",
        pct: 3.3,
        text: "HVAC starter panels, VFDs, power/control wiring and associated earthing and cable trays in the separately identified electrical sections.",
      },
      {
        service: "phe",
        share: "No separate package",
        included: false,
        text: "Condensate drainage and chilled water piping form part of HVAC. No separate general plumbing or process piping allocation in this BOQ split.",
      },
      {
        service: "fire",
        share: "No separate package",
        included: false,
        text: "Fire and smoke dampers form part of HVAC air distribution. No separate fire water, sprinkler or hydrant package in this scope.",
      },
      {
        service: "bms",
        share: "Included HVAC controls",
        text: "Field controls, sensors and BMS compatible interfaces remain within HVAC. No separately priced standalone BMS package identified.",
      },
    ],
    splitNote:
      "Shares of the HVAC package BOQ value, before GST. HVAC controls and condensate drainage remain within HVAC.",
  },
  // Deck 04, slide 23
  "jsw-motors": {
    id: "jsw-motors",
    name: "JSW Motors, Sambhajinagar",
    short: "JSW Motors",
    href: "/projects/jsw-ev-manufacturing",
    image: "/project-archive/jsw-ev-manufacturing/hero.jpg",
    imageAlt: "JSW Motors, Sambhajinagar",
    facts: [
      {
        label: "Client",
        value: "JSW Motors",
        note: "Automotive manufacturing",
      },
      { label: "Location", value: "Sambhajinagar" },
      { label: "Status", value: "Active", note: "Fire, utilities, electrical" },
      {
        label: "Work order value",
        value: "₹103 cr",
        note: "August 2026 order book",
      },
      {
        label: "Facility",
        value: "Automotive plant",
        note: "Utility and building systems",
      },
      { label: "Programme", value: "Package specific" },
    ],
    scope:
      "Firefighting, internal and external utility pipelines and electrical works, with fire alarm, PA and fire stopping items in the consolidated BOQ.",
    highlights: [
      {
        title: "Utilities",
        text: "Metallic/non metallic piping, pumps and associated supports.",
      },
      {
        title: "Fire protection",
        text: "Hydrants, sprinklers, suppression and fire stopping, with fire alarm and PA.",
      },
      {
        title: "Electrical",
        text: "Distribution equipment, cables, earthing and scheduled connections.",
      },
    ],
    note: "Hydrotests, flushing, electrical tests, fire system acceptance and utility handover packs.",
    split: [
      {
        service: "hvac",
        share: "No separate package",
        included: false,
        text: "No separate HVAC package in this scope.",
      },
      {
        service: "electrical",
        share: "10.4% of BOQ value",
        pct: 10.4,
        text: "Transformers, HT/LT panels, scheduled cables and terminations, cable trays, earthing and equipment connections within the electrical package.",
      },
      {
        service: "phe",
        share: "40.7% of BOQ value",
        pct: 40.7,
        text: "Internal and external metallic/non metallic utility and process lines. Water networks, pumps, valves and associated pipe supports/steel.",
      },
      {
        service: "fire",
        share: "40.8% of BOQ value",
        pct: 40.8,
        text: "Fire pumps, hydrants, sprinklers, extinguishers and gas suppression. Fire stopping, signage and the associated fire package charges.",
      },
      {
        service: "bms",
        share: "8.1% of BOQ value",
        pct: 8.1,
        text: "Fire alarm and IP based PA systems, with panels, devices and cabling. BMS compatible interfaces do not constitute a standalone BMS package.",
      },
    ],
    splitNote:
      "Electrical 10.4%, PHE/utility piping 40.7%, fire protection 40.8% and ELV 8.1%. Fire stopping forms part of fire protection. No separate HVAC or civil package in this scope.",
  },
  // Deck 06, slide 10
  "ikea-noida": {
    id: "ikea-noida",
    name: "IKEA / INGKA Centre, Noida",
    short: "IKEA / INGKA Centre",
    lede: "Mixed use campus for INGKA Centres in Noida, Uttar Pradesh.",
    href: "/projects/ingka-centre-ikea",
    image: "/project-archive/ingka-centre-ikea/hero.jpg",
    imageAlt: "IKEA / INGKA Centre, Noida",
    facts: [
      {
        label: "Client",
        value: "INGKA Centres",
        note: "IKEA mixed use development",
      },
      { label: "Location", value: "Noida, Uttar Pradesh" },
      { label: "Status", value: "Active", note: "Package 2A" },
      {
        label: "Work order value",
        value: "₹410 cr",
        note: "August 2026 order book",
      },
      {
        label: "Facility",
        value: "Mixed use campus",
        note: "Retail and common areas",
      },
      { label: "Programme", value: "Package specific" },
    ],
    scope:
      "Integrated MEPF and PV solar works under Package 2A, including PNG services and coordinated delivery across the mixed use development.",
    highlights: [
      { title: "MEP", text: "MEPF, PV solar and PNG." },
      { title: "BMS", text: "HVAC controls and integration interfaces." },
      { title: "Civil", text: "Builders’ work coordination." },
    ],
    note: "Coordinated shop drawings, system inspections, TAB, integrated testing and phased handover.",
    split: [
      {
        service: "hvac",
        share: "40% illustrative",
        pct: 40,
        text: "Chiller installation, pumps and chilled water distribution. AHUs, FCUs, fresh air, ventilation, smoke control, ducts, valves and insulation. Equipment supply follows the signed package.",
      },
      {
        service: "electrical",
        share: "32% illustrative",
        pct: 32,
        text: "Electrical distribution, lighting, cabling, earthing and equipment connections. Scheduled PV solar works across the basement, retail and common areas.",
      },
      {
        service: "phe",
        share: "14% illustrative",
        pct: 14,
        text: "Plumbing pumps, water supply, drainage and sanitary services. Scheduled PNG system and building utility connections.",
      },
      {
        service: "fire",
        share: "10% illustrative",
        pct: 10,
        text: "Fire pumps, sprinkler and hydrant distribution, with the required equipment and control interfaces.",
      },
      {
        service: "bms",
        share: "4% illustrative",
        pct: 4,
        text: "HVAC plant controls, instruments and communications interfaces. Point schedules and equipment integration with the chiller and BMS specialists.",
      },
    ],
    splitNote:
      "MEP totals 96%: HVAC 40%, Electrical 32%, PHE 14% and FF 10%. ELV & BMS is 4%. The split illustrates scope; it does not measure contract value, quantities or progress.",
  },
  // Deck 06, slide 13
  "prestige-bkc-101": {
    id: "prestige-bkc-101",
    name: "Prestige BKC 101, Plot Y",
    short: "Prestige BKC 101",
    lede: "Office and hotel for Prestige Group at BKC, Mumbai.",
    href: "/projects/prestige-bkc-101",
    image: "/project-archive/prestige-bkc-101/hero.jpg",
    imageAlt: "Prestige BKC 101, Plot Y",
    facts: [
      { label: "Client", value: "Prestige Group", note: "Direct MEP contract" },
      { label: "Location", value: "BKC, Mumbai" },
      { label: "Status", value: "Active", note: "Plot Y office and hotel" },
      {
        label: "Work order value",
        value: "₹220 cr",
        note: "August 2026 order book",
      },
      {
        label: "Facility",
        value: "Office and hotel",
        note: "Base build MEP systems",
      },
      { label: "Programme", value: "Package specific" },
    ],
    scope:
      "Direct MEP contractor for the office and hotel base build, with BMS, fire alarm, office ELV/security and fire stopping packages.",
    highlights: [
      { title: "MEP", text: "HVAC, electrical, fire and PHE." },
      { title: "BMS", text: "BMS, FAPA and office ELV/security." },
      { title: "Civil", text: "MEP fire stopping." },
    ],
    note: "Trade test packs, TAB, coordinated commissioning and office/hotel handover dossiers.",
    split: [
      {
        service: "hvac",
        share: "29% illustrative",
        pct: 29,
        text: "Chilled water systems, air handling, ventilation and distribution for office and hotel areas. Connections and installation of identified client supplied plant.",
      },
      {
        service: "electrical",
        share: "26% illustrative",
        pct: 26,
        text: "Power distribution, cabling, lighting, earthing and bonding. Installation and connection of identified client supplied electrical equipment.",
      },
      {
        service: "phe",
        share: "12% illustrative",
        pct: 12,
        text: "Domestic and flushing water supply, soil and waste drainage, pumps and tanks. Sewage treatment plant and hotel hot water systems.",
      },
      {
        service: "fire",
        share: "10% illustrative",
        pct: 10,
        text: "Fire pumps, wet risers, hydrants, sprinklers, water curtains and hose reels.",
      },
      {
        service: "bms",
        share: "18% illustrative",
        pct: 18,
        text: "BMS head end, DDC controls and field devices. Fire alarm and PA/voice alarm. CCTV, access control, data, Wi Fi, telephone, mobile booster and DTH within the office award.",
      },
      {
        service: "civil",
        share: "5% illustrative",
        pct: 5,
        text: "Specified fire stopping package for MEP penetrations through rated walls and slabs. Coordinate sleeves and openings with the general contractor and record completed seals.",
      },
    ],
    splitNote:
      "MEP totals 77%: HVAC 29%, Electrical 26%, PHE 12% and FF 10%. ELV & BMS is 18% and Civil is 5%. The split illustrates scope; it does not measure contract value, quantities or progress.",
  },
  // Deck 06, slide 16
  "wtc-gurugram": {
    id: "wtc-gurugram",
    name: "World Trade Centre, Gurugram",
    short: "World Trade Centre",
    lede: "Commercial towers for TCG Real Estate in Gurugram, Haryana.",
    href: "/projects/world-trade-center-gurugram",
    image: "/project-archive/world-trade-center-gurugram/hero.jpg",
    imageAlt: "World Trade Centre, Gurugram",
    facts: [
      {
        label: "Client",
        value: "TCG Real Estate",
        note: "Direct MEPF contract",
      },
      { label: "Location", value: "Gurugram, Haryana" },
      { label: "Status", value: "Active", note: "Site kick off May 2026" },
      {
        label: "Work order value",
        value: "₹76.9 cr",
        note: "Basic contract value, excluding GST",
      },
      {
        label: "Facility",
        value: "Commercial towers",
        note: "Office development",
      },
      { label: "Programme", value: "13 month procurement plan" },
    ],
    scope:
      "Supply, installation, testing and commissioning of HVAC, electrical, fire fighting and plumbing services for a landmark commercial development.",
    highlights: [
      {
        title: "HVAC",
        text: "Chilled water pumps, cooling towers, AHUs, FCUs, ducting and controls.",
      },
      {
        title: "Electrical",
        text: "LT cables, cable trays, point wiring, earthing and lightning protection.",
      },
      {
        title: "Fire and PHE",
        text: "Hydrant and sprinkler systems, drainage, water supply and rainwater harvesting.",
      },
    ],
    note: "Coordinated BIM models and clash analysis, with low side materials ordered in the first month of the procurement plan.",
    split: [
      {
        service: "hvac",
        share: "40% of basic contract value",
        pct: 40,
        text: "Chilled water and condenser pumps, cooling towers, AHUs, FCUs and HRUs, GI ducting, chilled water piping, valves, insulation, VSDs and controls.",
      },
      {
        service: "electrical",
        share: "31% of basic contract value",
        pct: 31,
        text: "LT cables, cable trays and raceways, point wiring in conduit, earthing and lightning protection, statutory approvals.",
      },
      {
        service: "fire",
        share: "16% of basic contract value",
        pct: 16,
        text: "MS fire fighting pipes and fittings, internal and external hydrants, sprinklers, valves and installation valves.",
      },
      {
        service: "phe",
        share: "13% of basic contract value",
        pct: 13,
        text: "Soil, waste and rainwater drainage, water supply pipes and valves, external storm and sewerage, rainwater harvesting, pumps and water treatment.",
      },
    ],
    splitNote:
      "Share of the basic contract value by service, from the priced BOQ.",
  },
  // Deck 06, slide 18
  "m3m-mansion": {
    id: "m3m-mansion",
    name: "M3M Mansion, Sector 113",
    short: "M3M Mansion",
    lede: "Residential towers for M3M India in Gurugram, Haryana.",
    href: "/projects/m3m-mansion-113",
    image: "/project-archive/m3m-mansion-113/hero.jpg",
    imageAlt: "M3M Mansion, Sector 113",
    facts: [
      {
        label: "Client",
        value: "M3M India",
        note: "Orders through Union Buildmart",
      },
      { label: "Location", value: "Gurugram, Haryana" },
      { label: "Status", value: "Active", note: "Orders of February 2026" },
      {
        label: "Work order value",
        value: "₹82 cr",
        note: "August 2026 order book",
      },
      {
        label: "Facility",
        value: "Residential towers",
        note: "Apartment air conditioning",
      },
      { label: "Programme", value: "To March 2029" },
    ],
    scope:
      "Supply, installation, testing and commissioning of VRV air conditioning and air purification for the residences, under separate high side and low side orders.",
    highlights: [
      { title: "High side", text: "VRV equipment supply, ₹47 cr." },
      { title: "Low side", text: "Installation works, ₹35 cr." },
      { title: "Air purification", text: "Included in both orders." },
    ],
    note: "Testing and commissioning apartment by apartment before handover.",
  },
  // Deck 07, slide 12
  "central-secretariat": {
    id: "central-secretariat",
    name: "Central Secretariat and Executive Enclave",
    short: "Central Secretariat",
    href: "/projects/common-central-secretariat",
    image: "/project-archive/common-central-secretariat/hero.jpg",
    imageAlt: "Central Secretariat and Executive Enclave",
    facts: [
      {
        label: "Client",
        value: "Government of India",
        note: "Through EPC partners",
      },
      { label: "Location", value: "New Delhi" },
      { label: "Status", value: "Active", note: "CCS and Executive Enclave" },
      {
        label: "Work order value",
        value: "₹298 cr",
        note: "August 2026 order book",
      },
      {
        label: "Facility",
        value: "Public infrastructure",
        note: "HVAC and firefighting",
      },
      { label: "Programme", value: "Package specific" },
    ],
    scope:
      "HVAC and firefighting delivery for the Common Central Secretariat and Executive Enclave.",
    highlights: [
      { title: "MEP", text: "HVAC and firefighting." },
      { title: "BMS", text: "Controls interfaces with the building systems." },
      { title: "Civil", text: "Civil contractor interfaces." },
    ],
    note: "Trade inspections, system testing and commissioning records for the assigned packages.",
    split: [
      {
        service: "hvac",
        share: "70% illustrative",
        pct: 70,
        text: "Air conditioning, cooling distribution and ventilation for the Common Central Secretariat and Executive Enclave, within the awarded HVAC packages.",
      },
      {
        service: "electrical",
        share: "No separate package",
        included: false,
        text: "No separate package in this scope.",
      },
      {
        service: "phe",
        share: "No separate package",
        included: false,
        text: "No separate package in this scope.",
      },
      {
        service: "fire",
        share: "25% illustrative",
        pct: 25,
        text: "Fire water distribution and firefighting systems within the assigned fire packages.",
      },
      {
        service: "bms",
        share: "5% illustrative",
        pct: 5,
        text: "Interfaces: HVAC status, alarms and control points, plus fire signals to the receiving systems.",
      },
    ],
    splitNote:
      "MEP totals 95%: HVAC 70%, Electrical 0%, PHE 0% and FF 25%. ELV & BMS is 5%. The split illustrates scope; it does not measure contract value, quantities or progress.",
  },
  // Deck 07, slide 15
  "mopa-airport": {
    id: "mopa-airport",
    name: "Mopa International Airport",
    short: "Mopa Airport",
    href: "/projects/mopa-international-airport",
    image: "/project-archive/mopa-international-airport/hero.jpg",
    imageAlt: "Mopa International Airport",
    facts: [
      { label: "Client", value: "Mopa Airport", note: "Completed reference" },
      { label: "Location", value: "Goa" },
      { label: "Status", value: "Completed", note: "Airport MEPF delivery" },
      {
        label: "Work order value",
        value: "₹130 cr",
        note: "Billed project register value",
      },
      {
        label: "Facility",
        value: "International airport",
        note: "Assigned MEPF services",
      },
      { label: "Programme", value: "Completed" },
    ],
    scope: "Integrated MEPF delivery for a greenfield airport.",
    highlights: [
      { title: "MEP", text: "Integrated MEPF delivery." },
      { title: "BMS", text: "Controls interfaces with the building systems." },
      { title: "Civil", text: "Airport civil work interfaces." },
    ],
    note: "System inspections, trade tests and coordinated handover documentation.",
    split: [
      {
        service: "hvac",
        share: "40% illustrative",
        pct: 40,
        text: "HVAC and central chiller plant work in the completed airport reference. Mechanical services coordinated with terminal systems and operational handover.",
      },
      {
        service: "electrical",
        share: "30% illustrative",
        pct: 30,
        text: "Electrical works within the completed airport MEPF package, with equipment and building system connections.",
      },
      {
        service: "phe",
        share: "15% illustrative",
        pct: 15,
        text: "Plumbing, water and drainage services within the completed MEPF package.",
      },
      {
        service: "fire",
        share: "10% illustrative",
        pct: 10,
        text: "Fire protection systems within the airport MEPF package and associated building interfaces.",
      },
      {
        service: "bms",
        share: "5% illustrative",
        pct: 5,
        text: "Interfaces: HVAC and electrical monitoring connections, with agreed fire and plant shutdown interfaces to the receiving systems.",
      },
    ],
    splitNote:
      "MEP totals 95%: HVAC 40%, Electrical 30%, PHE 15% and FF 10%. ELV & BMS is 5%. The split illustrates scope; it does not measure contract value, quantities or progress.",
  },
  // Deck 07, slide 18
  "nalanda-university": {
    id: "nalanda-university",
    name: "Nalanda University",
    short: "Nalanda University",
    href: "/projects/nalanda-university",
    image: "/project-archive/nalanda-university/hero.jpg",
    imageAlt: "Nalanda University",
    facts: [
      {
        label: "Client",
        value: "Nalanda University",
        note: "Completed reference",
      },
      { label: "Location", value: "Rajgir, Bihar" },
      { label: "Status", value: "Completed", note: "HVAC and IBMS reference" },
      {
        label: "Work order value",
        value: "₹60 cr",
        note: "Billed project register value",
      },
      {
        label: "Facility",
        value: "University campus",
        note: "Cooling and energy systems",
      },
      { label: "Programme", value: "Completed" },
    ],
    scope:
      "HVAC, intelligent building management, thermal storage and geothermal systems, with continuing operating experience reflected in the site records.",
    highlights: [
      { title: "MEP", text: "HVAC, thermal storage and geothermal." },
      { title: "BMS", text: "IBMS and plant monitoring." },
      { title: "Civil", text: "Campus building interfaces." },
    ],
    note: "Plant operating records, maintenance information and coordinated handover of the delivered systems.",
    split: [
      {
        service: "hvac",
        share: "80% illustrative",
        pct: 80,
        text: "Campus HVAC and cooling plant, thermal storage systems and geothermal mechanical interfaces. Installed plant and campus distribution within the completed reference.",
      },
      {
        service: "electrical",
        share: "No separate package",
        included: false,
        text: "No separate package in this scope.",
      },
      {
        service: "phe",
        share: "No separate package",
        included: false,
        text: "No separate package in this scope.",
      },
      {
        service: "fire",
        share: "No separate package",
        included: false,
        text: "No separate package in this scope.",
      },
      {
        service: "bms",
        share: "20% illustrative",
        pct: 20,
        text: "Intelligent building management and plant monitoring. Equipment status, temperatures, trends and energy consumption logs for campus supervision and ongoing service.",
      },
    ],
    splitNote:
      "MEP totals 80%: HVAC 80%, Electrical 0%, PHE 0% and FF 0%. ELV & BMS is 20%. The split illustrates scope; it does not measure contract value, quantities or progress.",
  },
};
