/**
 * Unique Engineers — long-form blog content per discipline.
 *
 * Drives the service detail page (/services/[slug]) blog body and
 * its "related projects" row. Keyed on discipline slug from firm.ts
 * so the detail page can look up content cheaply.
 *
 * Content is organised as:
 *   intro      — 2 opening paragraphs under an "Overview" banner
 *   subServices— one entry per sub-discipline (name, one-line
 *                summary, 2 body paragraphs, 3 technical specs)
 *   projects   — 3 dummy related-project cards shown at the top.
 *                Replace with real case-studies when the client
 *                supplies them; the shape mirrors ue-proj cards.
 */

export type SubService = {
  name: string;
  summary: string;
  body: string[];
  specs: { k: string; v: string }[];
};

export type ServiceProject = {
  code: string;
  name: string;
  location: string;
  typology: string;
  meta: string[];
};

export type ServiceContent = {
  intro: string[];
  subServices: SubService[];
  projects: ServiceProject[];
};

export const SERVICE_CONTENT: Record<string, ServiceContent> = {
  "civil-interior-contractors-in-gurgaon": {
    intro: [
      "Civil and interior work is where every other discipline lands. Foundations absorb the loads, façades meet the weather, finishes carry the tenant fit-out — and all of it must hold the MEPF systems that move through it. The discipline is unforgiving of shortcuts: a misaligned pour or a slack slab finish costs months to correct once downstream trades arrive.",
      "Our civil desk runs the full arc — from soil investigation through structural shell, façade envelope, and end-user finish. Work is scheduled against the MEPF programme so openings, sleeves, cut-outs and penetrations are cast-in, not chipped-in. Handover is against a stamped bill of quantities with a full as-built set.",
    ],
    subServices: [
      {
        name: "Heavy civil foundations",
        summary:
          "Raft, pile and combined foundations engineered against soil investigation, load take-down and seismic zone.",
        body: [
          "Every foundation begins with a geotechnical report and ends with an instrumented pour. In between, our structural team models the superstructure load take-down, sizes the reinforcement cage, and coordinates the pour with MEP cast-in openings so penetrations are not cut retrospectively.",
          "Pile caps and rafts are delivered with continuous third-party inspection — cube tests at prescribed ages, rebound hammer and ultrasonic readings on key pours, and protocols for crack monitoring during backfill. Deep excavations are shored with design-specific retention systems rather than generic steel sheet piles.",
        ],
        specs: [
          { k: "Design basis", v: "IS 456 · IS 875 · IS 1893" },
          { k: "Concrete grade", v: "M25 – M60" },
          { k: "Monitoring", v: "Continuous + 28-day" },
        ],
      },
      {
        name: "High-end corporate interiors",
        summary:
          "Tenant fit-out delivered to the developer's warm-shell handover — ceilings, partitions, joinery, flooring and finishes.",
        body: [
          "Corporate interiors sit at the intersection of three trades — ceiling and partition systems, MEP services feeding them, and the bespoke joinery that reads as the client's brand. We detail all three against a single reflected ceiling plan so grid, diffuser and light fitting lines agree.",
          "Finishes are sample-approved before production, mocked up on a pilot bay, and sealed against the as-built drawing. Snag-list resolution is tracked on a floor-by-floor register and signed off before the client commissioning walk.",
        ],
        specs: [
          { k: "Typical fit-out", v: "40 – 180 K sq.ft" },
          { k: "Ceiling grade", v: "T-bar · Gypsum · Metal" },
          { k: "Finish review", v: "Mock-up + sample" },
        ],
      },
      {
        name: "Industrial flooring",
        summary:
          "Trimix, vacuum-dewatered and epoxy-resin floors designed for point loads, abrasion and chemical exposure.",
        body: [
          "An industrial floor is a structural element, not a finish. Our floor specification picks slab thickness, joint spacing, reinforcement type and surface treatment against the expected wheel load, turning radius and chemical contact — not off a generic manufacturer cut-sheet.",
          "Pours are laser-screeded in continuous strips to minimise cold joints. Surface hardeners are broadcast wet-on-wet; post-cure, joints are saw-cut on schedule and filled with semi-rigid joint filler so pallet trucks do not spall the arrises.",
        ],
        specs: [
          { k: "Flatness class", v: "FF 35 / FL 25" },
          { k: "Thickness", v: "150 – 300 mm" },
          { k: "Abrasion", v: "AR1 per BS 8204-2" },
        ],
      },
      {
        name: "Façade works",
        summary:
          "Unitised and stick-system curtain walls, ACP cladding and structural glazing sealed against the building envelope.",
        body: [
          "Façades are engineered for wind load, seismic drift, thermal movement and water tightness in that order. Our façade desk works from the architect's elevation, runs a wind-tunnel-backed pressure grid, and sizes the mullion-transom rhythm accordingly.",
          "Every panel is factory-glazed where possible. Site joints are backer-rod-and-sealant details, water-tested in mock-up before mass production, and inspected in lift-by-lift hose-test batches. Anchorage is to a shear-connector bracket, never direct to the slab edge.",
        ],
        specs: [
          { k: "System types", v: "Unitised · Stick · SSG" },
          { k: "Wind test", v: "AAMA 501 + site hose" },
          { k: "Thermal class", v: "U ≤ 1.8 W/m²K" },
        ],
      },
      {
        name: "Structural finishing",
        summary:
          "Plaster, waterproofing, flooring and screeding — the finishes that seal the shell before MEP services arrive.",
        body: [
          "Structural finishes are what hold the shell weather-tight while services are pulled. Waterproofing of wet areas, terraces and basements is membrane-plus-protection, applied in detailed bays with ponding tests before the next trade starts.",
          "Plaster is proportion-batched, gauged for shrinkage, and checked against straight-edge and plumb at the end of every wall. The finish coat precedes the painting trade only after moisture content is tested and accepted on a grid basis.",
        ],
        specs: [
          { k: "Waterproofing", v: "APP + EPDM + cementitious" },
          { k: "Plaster", v: "12 – 20 mm in 2 coats" },
          { k: "Acceptance", v: "Moisture-meter verified" },
        ],
      },
      {
        name: "Retrofitting",
        summary:
          "Structural strengthening, seismic upgrades and live-building interventions for operating assets.",
        body: [
          "Retrofit work is constrained by what cannot be stopped — tenants, production lines, critical services. Our retrofit methodology begins with a non-destructive assessment (covermeter, core extraction, rebound hammer) and builds a phased intervention plan around live-operation windows.",
          "Typical interventions include column jacketing, carbon-fibre wrap, epoxy crack injection, and seismic upgrade of steel portal frames. Each is sequenced against an evacuation and dust-control plan that treats the occupier as the primary stakeholder.",
        ],
        specs: [
          { k: "Assessment", v: "NDT + visual + core" },
          { k: "Strengthening", v: "Jacketing · CFRP · micro-pile" },
          { k: "Downtime", v: "Phased, zero-shutdown" },
        ],
      },
    ],
    projects: [
      {
        code: "UE-CIV-0812",
        name: "Commercial tower shell + fit-out",
        location: "Gurugram, Haryana",
        typology: "Commercial",
        meta: ["Civil + Interior", "220K sq.ft", "Delivered"],
      },
      {
        code: "UE-CIV-0904",
        name: "Industrial shed package",
        location: "Manesar, Haryana",
        typology: "Industrial",
        meta: ["Civil + MEP", "64K sq.ft", "Active"],
      },
      {
        code: "UE-CIV-1017",
        name: "Pharma shell retrofit",
        location: "Baddi, Himachal Pradesh",
        typology: "Pharma",
        meta: ["Retrofit", "42K sq.ft", "Delivered"],
      },
    ],
  },

  "hvac-company-in-gurgaon": {
    intro: [
      "HVAC is the largest single-discipline spend on most commercial mandates and the one most visible in a building's running cost. A plant sized by rule-of-thumb runs 30% over-capacity for its life. A plant sized off hourly simulation runs within ±5% and recovers its engineering fee inside a year.",
      "Our HVAC desk is simulation-led. Load profiles come from DesignBuilder or IES, equipment selection from manufacturer performance data (not catalogue headline), and commissioning from an independent TAB authority. Every project ships with a stamped air- and water-balance report.",
    ],
    subServices: [
      {
        name: "Central chiller plants",
        summary:
          "Water- and air-cooled chiller plants with primary-secondary decoupled loops and variable-flow staging.",
        body: [
          "Chiller plant design is a sizing problem and a staging problem — in that order. Our plants are modelled against an 8,760-hour weather file so part-load performance, not peak capacity, drives the machine count. That typically lands us at three unequal-sized chillers rather than two same-size sets.",
          "Piping is designed for low differential pressure, with variable-speed primary and secondary pumps on independent loops. Cooling towers are picked for approach, not tonnage — a 3°C approach at site wet-bulb is the target, verified by third-party TAB at commissioning.",
        ],
        specs: [
          { k: "Capacity range", v: "200 – 16,000 TR" },
          { k: "Plant IKW", v: "≤ 0.52 kW / TR" },
          { k: "Validation", v: "IPLV + seasonal TAB" },
        ],
      },
      {
        name: "VRF / VRV systems",
        summary:
          "Variable refrigerant flow systems for multi-tenant and multi-occupancy premises with heat-recovery options.",
        body: [
          "VRF is the right answer when loads are diverse and metering is per-tenant. We specify heat-recovery VRF for mixed-occupancy plates where one zone calls for cooling while another calls for heat — the system moves that energy around the plate instead of rejecting it.",
          "Refrigerant pipe sizing is by actual equivalent length, not nominal. Pressure testing is nitrogen-at-40-bar for 24 hours before commissioning, and outdoor units are positioned for clear discharge with ambient correction applied to the load model.",
        ],
        specs: [
          { k: "Config", v: "2-pipe · 3-pipe HR" },
          { k: "Capacity", v: "5 – 54 HP per circuit" },
          { k: "Test pressure", v: "40 bar · 24 hr" },
        ],
      },
      {
        name: "Precision cooling (PAC)",
        summary:
          "Close-control units for data halls, labs and critical rooms — with tight temperature, humidity and filtration tolerances.",
        body: [
          "Precision cooling is air-handling under a stricter tolerance band. Data halls, laboratories and network rooms need ±1°C and ±5% RH held against unpredictable load spikes — a tolerance a conventional AHU cannot meet.",
          "Our PAC deployments use hot-aisle / cold-aisle separation, in-row or perimeter units, and economiser-cycle water-side or air-side free cooling where local climate permits. EC fans and dual-coil cross-over designs support concurrent-maintainable operation without tenant disruption.",
        ],
        specs: [
          { k: "Tolerance", v: "±1 °C · ±5 % RH" },
          { k: "Unit types", v: "DX · CHW · In-row · Rear-door" },
          { k: "Resilience", v: "N+1 / 2N ready" },
        ],
      },
      {
        name: "Ventilation",
        summary:
          "Fresh-air, exhaust and pressure-balance systems designed against ASHRAE 62.1 and the NBC.",
        body: [
          "Ventilation is the one HVAC discipline where indoor air quality, code compliance and energy use all pull in different directions. Our ventilation design uses CO₂-led demand control, heat recovery on exhaust streams, and pressure-mapped zoning so cooking, toilet and generator exhausts never back-feed into occupied space.",
          "Duct layouts are pressure-class-specified (low / medium / high) and leak-tested per SMACNA. Fans are selected for actual system effect, not cataloguing curve, and commissioning includes a Pitot-traverse measurement at every supply and return grille.",
        ],
        specs: [
          { k: "Rate basis", v: "ASHRAE 62.1 · NBC-2016" },
          { k: "Leakage", v: "SMACNA Class 3" },
          { k: "Verification", v: "Pitot traverse at grille" },
        ],
      },
      {
        name: "Thermal storage",
        summary:
          "Ice-bank and chilled-water thermal storage to shift peak demand into off-peak tariff windows.",
        body: [
          "Thermal storage trades capital for a lifetime of tariff arbitrage. A well-sized ice bank runs the chiller plant at night when COP is high and tariff is low, then discharges through the peak-hour cooling demand the next day.",
          "We model the storage volume against the tariff curve and the building's 24-hour load profile, then integrate the storage controls into the BMS so mode changes — charge, discharge, ice-priority — happen without operator intervention. Typical payback sits at 4–6 years on a tariff-driven commercial asset.",
        ],
        specs: [
          { k: "Storage medium", v: "Ice · Eutectic · CHW" },
          { k: "Shift capacity", v: "500 – 10,000 TR-hr" },
          { k: "Payback", v: "4 – 6 years" },
        ],
      },
      {
        name: "Geothermal",
        summary:
          "Ground-source heat-pump systems — vertical borehole fields and horizontal-loop installations.",
        body: [
          "Geothermal works when the site allows a borehole field and the client accepts the upfront drilling spend against the lifetime running cost. Earth at 10 metres sits at a stable annual average; that stability gives a heat-pump COP that air-source systems cannot match.",
          "We design borehole fields with thermal-response testing so loop length tracks actual conductivity, not assumed values. The system is paired with VRF or chilled-water distribution and metered for verified performance against the model at year-one.",
        ],
        specs: [
          { k: "Loop type", v: "Vertical bore · Horizontal slinky" },
          { k: "Depth", v: "80 – 150 m per bore" },
          { k: "COP basis", v: "Thermal response test" },
        ],
      },
    ],
    projects: [
      {
        code: "UE-HVAC-0711",
        name: "Mixed-use chiller plant",
        location: "Noida, Uttar Pradesh",
        typology: "Commercial",
        meta: ["16,000 TR", "IGBC Gold", "Delivered"],
      },
      {
        code: "UE-HVAC-0825",
        name: "Semiconductor clean-room HVAC",
        location: "Bangalore, Karnataka",
        typology: "Semiconductor",
        meta: ["PAC + AHU", "ISO-7", "Active"],
      },
      {
        code: "UE-HVAC-0933",
        name: "Net-zero campus geothermal VRV",
        location: "Rajgir, Bihar",
        typology: "Institutional",
        meta: ["Geothermal", "2-pipe HR", "Delivered"],
      },
    ],
  },

  "electrical-contractors-in-gurgaon": {
    intro: [
      "Electrical is the discipline that fails quietly until it doesn't. A substation that was sized for the original tenant mix will run for years, and then one retrofit adds 300 kW of IT load and the transformer runs hot for a summer before anyone notices. Our approach is to design for the 20-year load, not the day-one load, with metered sub-circuits so changes are visible.",
      "Every electrical package we deliver is documented as a single-line diagram, a cable schedule, a protection study and a commissioning log. The protection study is run in ETAP with actual utility fault levels, so downstream breakers coordinate rather than trip in sympathy.",
    ],
    subServices: [
      {
        name: "HT / LT distribution",
        summary:
          "High- and low-tension distribution from incoming supply to final sub-distribution board, fully metered.",
        body: [
          "HT/LT distribution is an exercise in coordination — cable sizing against fault level, ampacity against installed load, voltage drop against circuit length, and protection grading across every tier. Our network designs run a full short-circuit and arc-flash study before cable is ordered.",
          "Cabling follows colour-coded ladder trays with maintained clearances to other services. Jointing kits are pre-moulded resin where possible, heat-shrink where the installation geometry demands it, and every joint is megger- and hipot-tested before commissioning.",
        ],
        specs: [
          { k: "Voltage range", v: "33 kV – 415 V" },
          { k: "Fault study", v: "ETAP short-circuit + AF" },
          { k: "Cable class", v: "XLPE · FRLS · FR-LSZH" },
        ],
      },
      {
        name: "Substations & transformers",
        summary:
          "Indoor and outdoor substations with dry-type and oil-filled transformers — to utility specifications.",
        body: [
          "Substation engineering starts with the utility approval drawing and ends with a commissioning clearance. In between, we engineer the bay, specify the switchgear, earth the structure, and hand over a tested SCADA link back to the utility's distribution control.",
          "Transformer selection is by loss-evaluated capitalised cost, not sticker price — a marginally more expensive transformer with lower no-load loss pays back inside five years on a 24×7 asset. Retrofits default to cast-resin dry-type transformers for fire and maintenance reasons.",
        ],
        specs: [
          { k: "Transformer", v: "Dry · Oil · Cast resin" },
          { k: "Rating", v: "500 kVA – 10 MVA" },
          { k: "Approval", v: "CEA / DISCOM sign-off" },
        ],
      },
      {
        name: "DG sets",
        summary:
          "Standby and prime diesel-generator sets with synchronised parallel operation and AMF control.",
        body: [
          "A DG set is insurance — you size it for the essential load, but you pay for it every hour it idles. Our specifications use variable-load paralleling controls so a three-unit set runs one machine at partial load for small outages and all three for major events.",
          "Exhaust stacks are routed to CPCB norms with silencer and AMC-compliant chimney height. Fuel polishing, day-tank vent routing, sound enclosure and vibration isolation are all specified rather than defaulted.",
        ],
        specs: [
          { k: "Capacity", v: "250 kVA – 3,000 kVA" },
          { k: "Emission", v: "CPCB-IV+ compliant" },
          { k: "Control", v: "AMF + sync paralleling" },
        ],
      },
      {
        name: "Critical power systems",
        summary:
          "Uninterruptible-power, static-transfer and isolated-ground systems for data, healthcare and trading floors.",
        body: [
          "Critical power is about bounded failure modes. A single UPS cannot protect a tier-3 asset; redundancy, transfer latency and bypass topology all matter. We engineer 2N and N+1 topologies with static-transfer switches sized for the largest single fault current.",
          "Isolated ground systems for medical and laboratory space are designed against IEC 60364 with line-isolation monitoring. Transfer times are validated on a real load, not simulated, at commissioning.",
        ],
        specs: [
          { k: "Topology", v: "N+1 · 2N · 2(N+1)" },
          { k: "Transfer", v: "< 4 ms static" },
          { k: "Runtime", v: "10 – 30 min battery" },
        ],
      },
      {
        name: "UPS",
        summary:
          "Online double-conversion UPS with battery- and flywheel-based ride-through for critical loads.",
        body: [
          "We specify online double-conversion UPS for any load that cannot tolerate a cycle of voltage disturbance — IT, medical imaging, lab control. Modular UPS with hot-swappable power modules is the default for new builds; scalable from 25 kW to 1 MW without stranded capital.",
          "Battery sizing is against actual discharge curves at 25 °C ambient, not manufacturer-headline nominal. Flywheel UPS is specified where short outages are common but the site already has a DG — a 15-second ride-through is enough to bridge DG start.",
        ],
        specs: [
          { k: "Type", v: "Online · Modular · Flywheel" },
          { k: "Capacity", v: "10 kW – 1.2 MW" },
          { k: "Efficiency", v: "≥ 96 % @ 50 % load" },
        ],
      },
      {
        name: "Bus trunking",
        summary:
          "Aluminium and copper bus-trunking systems for main-riser distribution and high-ampacity feeders.",
        body: [
          "Bus trunking beats cable for any feeder above ~800 A. Lower impedance, lower voltage drop, a fraction of the installation time, and a plug-in tap-off every few metres that can add circuits mid-life without re-pulling cable.",
          "Our bus-trunking installations are sandwich-type for compact risers, type-tested under IEC 61439-6 for short-circuit withstand, and earthed through an integral bar rather than a separate conductor.",
        ],
        specs: [
          { k: "Current rating", v: "630 – 6,300 A" },
          { k: "Conductor", v: "Copper · Aluminium" },
          { k: "Standard", v: "IEC 61439-6" },
        ],
      },
      {
        name: "Clean-room lighting",
        summary:
          "IP-rated sealed luminaires and clean-room-grade controls for semiconductor, pharma and healthcare zones.",
        body: [
          "Clean-room lighting is a sealing problem as much as a lighting one. We deploy IP65 flush-mounted LED panels with gasketted frames, flush to the ceiling grid, with access from above so maintenance never breaks the clean envelope.",
          "Lux levels are designed against ISO 14644 and the client's process specification — not a generic office figure. Emergency lighting is on a separate UPS circuit with a monthly self-test log published to the BMS.",
        ],
        specs: [
          { k: "IP class", v: "IP65 sealed flush" },
          { k: "Illuminance", v: "500 – 1,500 lux" },
          { k: "Compliance", v: "ISO 14644 classes 5–8" },
        ],
      },
    ],
    projects: [
      {
        code: "UE-ELEC-0611",
        name: "Data-centre HT distribution + UPS",
        location: "Mumbai, Maharashtra",
        typology: "Data Centre",
        meta: ["12 MW", "2N UPS", "Active"],
      },
      {
        code: "UE-ELEC-0728",
        name: "IT campus substation package",
        location: "Pune, Maharashtra",
        typology: "Commercial",
        meta: ["33/11 kV", "6× 2 MVA", "Delivered"],
      },
      {
        code: "UE-ELEC-0854",
        name: "Hospital critical-power upgrade",
        location: "New Delhi",
        typology: "Healthcare",
        meta: ["Isolated ground", "320 beds", "Delivered"],
      },
    ],
  },

  "plumbing-services-in-gurgaon": {
    intro: [
      "Plumbing is invisible until it fails loudly. A slab-cast pipe that was never pressure-tested, a trap seal that dries out in a vacant unit, a pump that short-cycles — any of these turns a ₹50 Cr building into a claims case. Our public-health engineering desk specifies, installs and commissions against a pressure- and leak-test protocol that is documented, not assumed.",
      "Water treatment and reuse are increasingly non-negotiable under state norms. Every project we build sizes its STP for worst-case tenant density, treats the effluent to reuse-grade for flushing and irrigation, and instruments the output for online BOD/COD monitoring.",
    ],
    subServices: [
      {
        name: "WTP / STP / ETP plants",
        summary:
          "Water, sewage and effluent-treatment plants sized for building occupancy and process load.",
        body: [
          "Treatment plant sizing is driven by occupancy, not building area. We calculate the inflow from first principles — typical lpcd per user type, peak factor, storm allowance — and size the plant to an appropriate process: MBBR for packaged tenancy, SBR for larger campuses, MBR where reuse quality is paramount.",
          "Every plant is commissioned with a third-party performance test — 72 hours of verified inlet-to-outlet metrics — before it is signed over to the O&M team. Online monitoring is routed to the BMS for alarm and trend.",
        ],
        specs: [
          { k: "Process", v: "MBBR · SBR · MBR" },
          { k: "Capacity", v: "50 – 5,000 KLD" },
          { k: "Output", v: "BOD ≤ 10 mg/L (reuse)" },
        ],
      },
      {
        name: "Industrial piping",
        summary:
          "Process and utility piping in stainless, mild steel, copper and CPVC — welded, tested and stamped.",
        body: [
          "Industrial piping is a welding discipline, not a plumbing one. Our pipefitters work to ASME B31.3 where the process warrants it, with each weld logged against a welder identifier, reviewed by radiography, and hydrotested at 1.5× design pressure.",
          "Material selection is by fluid, temperature and pressure — not by default. A chilled-water loop in galvanised iron is a false economy; the same loop in carbon steel with a corrosion-resistant coating runs 20 years without a pin-hole.",
        ],
        specs: [
          { k: "Standard", v: "ASME B31.3 · API 570" },
          { k: "Materials", v: "SS 304/316 · CS · Cu · CPVC" },
          { k: "Test", v: "Hydrotest 1.5× + radiography" },
        ],
      },
      {
        name: "Hydropneumatic systems",
        summary:
          "Pressure-boosting systems with variable-frequency drives to hold a stable tap-pressure across the riser.",
        body: [
          "Hydropneumatic is how multi-storey residential and commercial buildings deliver even tap-pressure without a rooftop tank. Our systems use variable-speed pumps with a pressure vessel sized against the expected simultaneous-demand curve so the pumps modulate instead of cycling.",
          "Pump-set duty is lead/lag/standby across three or four units — never a single pump — with automatic rotation to equalise wear. The pressure vessel is bladder-type, stainless-steel lined, and sized to allow 6–12 starts per hour under peak demand.",
        ],
        specs: [
          { k: "Duty", v: "Lead · Lag · Standby" },
          { k: "Control", v: "VFD + pressure transducer" },
          { k: "Flow range", v: "30 – 2,000 LPM" },
        ],
      },
      {
        name: "Steam boilers",
        summary:
          "Packaged and shell-type steam boilers for kitchen, laundry and process use — with economiser and blow-down.",
        body: [
          "Steam generation is a safety discipline first and an efficiency discipline second. Boilers are IBR-approved, with pressure parts certified at manufacture and a second inspection at site before fill-and-fire. Burners are modulating-type for part-load efficiency.",
          "Flue-gas economisers pre-heat feed water, raising seasonal efficiency into the mid-90s. Blow-down and water treatment are on a timed programme tied to the BMS so scaling and corrosion never catch up with the tubes.",
        ],
        specs: [
          { k: "Pressure", v: "7 – 20 bar" },
          { k: "Capacity", v: "300 – 12,000 kg/h" },
          { k: "Standard", v: "IBR + IS 10496" },
        ],
      },
      {
        name: "Rainwater harvesting",
        summary:
          "Roof and surface rainwater collection with first-flush diverters and recharge-well infiltration.",
        body: [
          "Rainwater harvesting is a combination of a catchment calculation and a geotechnical one. We compute the annual harvestable volume from local rainfall records, route it through a first-flush diverter to a sediment tank, then either store for reuse or recharge via a bore well.",
          "Every recharge installation is preceded by a percolation test — a recharge well sunk without it is an expensive hole. Our systems include a metered overflow so the water utility credits the percolation for compliance.",
        ],
        specs: [
          { k: "Catchment", v: "Roof + hardscape" },
          { k: "First flush", v: "1 mm diverter" },
          { k: "Infiltration", v: "Percolation-tested well" },
        ],
      },
      {
        name: "Sanitary fixtures",
        summary:
          "Low-flow WCs, flush valves, faucets, urinals and accessories sourced against the tender schedule.",
        body: [
          "Fixture selection is the most visible part of the plumbing package. We specify to the client's brand schedule — the usual suspects (Kohler, Grohe, Toto, Jaquar) — with flush volumes capped at the code minimum to help the project's IGBC water credit.",
          "Installation is rough-in-then-cut, not cut-then-install — the slab cut-outs are set against a rough-in drawing before any concrete is poured. Fixtures themselves go in during handover finishes, protected under film until the client walk.",
        ],
        specs: [
          { k: "WC flush", v: "Dual 3/6 L" },
          { k: "Tap flow", v: "≤ 6 LPM aerated" },
          { k: "IGBC credit", v: "WE 1 + WE 2" },
        ],
      },
    ],
    projects: [
      {
        code: "UE-PH-0422",
        name: "Campus WTP + STP package",
        location: "Rajgir, Bihar",
        typology: "Institutional",
        meta: ["MBR", "1,200 KLD", "Delivered"],
      },
      {
        code: "UE-PH-0518",
        name: "Mixed-use plumbing + hydropneumatic",
        location: "Noida, Uttar Pradesh",
        typology: "Commercial",
        meta: ["Plumbing", "G+28", "Active"],
      },
      {
        code: "UE-PH-0603",
        name: "Airport public-health package",
        location: "Goa",
        typology: "Airport",
        meta: ["PH + Drainage", "24 gates", "Delivered"],
      },
    ],
  },

  "fire-fighting-contractors-in-gurgaon": {
    intro: [
      "A fire system is never exercised on the day it is installed — only when it is needed. Between install and use sits a protocol of weekly inspections, monthly flow tests, quarterly detector walks and annual pump-run certifications. We build that protocol into the handover because, without it, a sprinkler head is an ornament.",
      "Every fire package we deliver is engineered against the National Building Code and, where the occupancy demands it, NFPA. The hydraulic calculation is done first; the pipe routing follows from it; and the whole system is flow-tested against the hydraulic model before commissioning sign-off.",
    ],
    subServices: [
      {
        name: "Fire hydrant systems",
        summary:
          "Wet-riser and landing-valve hydrant networks with jockey, main and standby pumps.",
        body: [
          "Hydrant systems are sized by simultaneous-jet demand at the most hydraulically remote outlet — not by total number of hydrants. A jockey pump maintains standby pressure, a main pump handles the design demand, and a diesel standby covers utility-power failure.",
          "Pumps are on auto-start through pressure switches with a start-but-no-stop logic, so a fire event never causes a pump to oscillate. Pipework is welded carbon steel, hydrotested at 1.5× working pressure, and buried pipework is cathodic-protected.",
        ],
        specs: [
          { k: "Design code", v: "NBC-2016 Part IV · NFPA 14" },
          { k: "Pump set", v: "Jockey + Main + Diesel" },
          { k: "Capacity", v: "2,280 – 4,560 LPM" },
        ],
      },
      {
        name: "Sprinklers",
        summary:
          "Wet-, dry- and pre-action sprinkler systems for ordinary, high-hazard and water-sensitive occupancies.",
        body: [
          "Sprinkler density and area of operation are occupancy-specific — light hazard, ordinary, extra. We design every system to the appropriate NFPA 13 schedule, run a hydraulic calculation, and size the feed main against the hydraulically-remote four sprinklers, not the whole zone.",
          "Pre-action sprinklers are specified where accidental discharge would be expensive — data halls, archives, libraries. The system is kept dry with supervised air and discharges only on simultaneous detector activation and sprinkler fusion.",
        ],
        specs: [
          { k: "System type", v: "Wet · Dry · Pre-action" },
          { k: "Head rating", v: "68 – 141 °C" },
          { k: "Density", v: "0.10 – 0.30 gpm/sq ft" },
        ],
      },
      {
        name: "Gas suppression",
        summary:
          "FM-200, Novec-1230 and inert-gas total-flooding suppression for rooms where water is the wrong answer.",
        body: [
          "Gas suppression is for rooms where a sprinkler would cause more damage than the fire — data halls, switchgear rooms, archive stacks. We design against the manufacturer's concentration curve and the room's actual leak-rate (measured, not assumed) with a 20% safety margin.",
          "Every installation includes a door-fan leak test to verify hold time. Nozzles are sized and positioned against the room geometry for even discharge, and the alarm sequence is interlocked with the HVAC to isolate the room during discharge.",
        ],
        specs: [
          { k: "Agents", v: "FM-200 · Novec-1230 · IG-541" },
          { k: "Discharge", v: "≤ 10 s" },
          { k: "Hold time", v: "≥ 10 min (door-fan verified)" },
        ],
      },
      {
        name: "Smoke detection",
        summary:
          "Addressable analogue detection — smoke, heat, flame — integrated with the fire alarm control panel.",
        body: [
          "Addressable detection means every device has an identity and a state, reported back to the panel every few seconds. An alarm traces to a point, not a zone — the response team walks directly to the fault.",
          "Detector type is environment-specific: photoelectric for smouldering fires, ionisation for fast-flaming, aspirating for early-warning in data halls, beam detectors for atriums. Every loop is verified for ground-fault and short-circuit integrity at commissioning.",
        ],
        specs: [
          { k: "Protocol", v: "Addressable analogue" },
          { k: "Types", v: "Photo · Iono · Beam · Aspirating" },
          { k: "Integration", v: "BMS + PAVA" },
        ],
      },
      {
        name: "NBC compliance",
        summary:
          "Statutory fire-compliance support — layout approvals, CFO certification and third-party audit.",
        body: [
          "Most fire failures on handover are administrative, not technical. The system works; the paperwork doesn't. Our compliance desk runs the plan through DGFS / state-fire-service approval before concrete is cast, so the rejected-drawing cycle doesn't hit the critical path.",
          "Commissioning includes a third-party certification package — pump curves, hydrant flow tests, detector calibration, panel-to-device inventory — that goes in a single bound volume to the client and a copy to the fire service.",
        ],
        specs: [
          { k: "Scope", v: "Plan + CFO + Audit" },
          { k: "Standards", v: "NBC · IS 15105 · NFPA" },
          { k: "Deliverable", v: "Certification dossier" },
        ],
      },
    ],
    projects: [
      {
        code: "UE-FFS-0311",
        name: "Healthcare fire-fighting upgrade",
        location: "New Delhi",
        typology: "Healthcare",
        meta: ["Hydrant + Sprinkler", "320 beds", "Delivered"],
      },
      {
        code: "UE-FFS-0427",
        name: "Data-centre pre-action + FM-200",
        location: "Mumbai, Maharashtra",
        typology: "Data Centre",
        meta: ["Pre-action", "12 halls", "Active"],
      },
      {
        code: "UE-FFS-0541",
        name: "Airport total fire package",
        location: "Goa",
        typology: "Airport",
        meta: ["Full fire", "24 gates", "Delivered"],
      },
    ],
  },

  "solar-epc-contractors-in-gurgaon": {
    intro: [
      "Solar is the clearest-return capital item on a building. A rooftop array sized to the connected load pays back in 4–5 years, runs 25, and turns a consumer into a prosumer. The hardware is commodified; the craft is the installation — how the modules are mounted, how the cabling is dressed, how the system is commissioned against a performance guarantee.",
      "Our solar desk is an in-house EPC — we design the plant, procure modules and inverters against tested reference curves, and build to IEC 62446 with a documented commissioning protocol. Every plant ships with a performance-ratio test and an online monitoring feed.",
    ],
    subServices: [
      {
        name: "Rooftop & ground-mounted solar",
        summary:
          "Grid-tied, captive and group-captive photovoltaic plants on rooftop and ground sites.",
        body: [
          "Rooftop plant design starts with a shadow study — a plant that is 10% over-shaded pays back 15% later. We model the roof with Helios or PVSyst, pick module orientation for annual yield rather than peak, and size the inverter at a realistic DC/AC ratio.",
          "Mounting is pre-engineered galvanised steel with ballast-only options where roof penetration is not allowed. Cable runs are laid in DC-rated conduit, never cable-tied to the structure, and inverter positioning is for thermal derating and ease of service.",
        ],
        specs: [
          { k: "Capacity", v: "50 kWp – 20 MWp" },
          { k: "DC/AC ratio", v: "1.20 – 1.35" },
          { k: "Standard", v: "IEC 62446 + BIS" },
        ],
      },
      {
        name: "Net metering",
        summary:
          "Bi-directional metering and DISCOM-approval support for grid-export of surplus generation.",
        body: [
          "Net metering regulations vary state-to-state, and the approval cycle is where most plants lose time. Our liaison team runs the DISCOM feasibility study, submits the technical drawings, and handles the Central Electricity Authority registration in parallel with civil works.",
          "Bi-directional meters are calibrated at an NABL-accredited lab before installation, and the first-month export reading is validated against our energy model to catch any metering errors early.",
        ],
        specs: [
          { k: "Approval", v: "DISCOM + CEA + SLDC" },
          { k: "Meter class", v: "0.5S bi-directional" },
          { k: "Commissioning", v: "Net-metering witness test" },
        ],
      },
      {
        name: "Green energy integration",
        summary:
          "Hybrid solar-plus-storage-plus-DG systems with seamless source switching and load prioritisation.",
        body: [
          "Solar on its own is intermittent; solar plus a battery plus a DG covers the full 24-hour load with source-of-supply hierarchy. Our hybrid installations put solar at the top of the stack, battery second for evening peaks, DG last for extended outages.",
          "A grid-interactive inverter with black-start capability means the plant can operate as an island in a grid outage — the BMS routes non-critical loads off during islanding and restores them when the grid or DG comes back.",
        ],
        specs: [
          { k: "Storage", v: "Li-ion · LFP · VRFB" },
          { k: "Inverter", v: "Grid-tied · Hybrid · Off-grid" },
          { k: "Ride-through", v: "Black-start capable" },
        ],
      },
      {
        name: "LEED / IGBC compliance",
        summary:
          "Credit-path management for LEED and IGBC green-building ratings — from pre-design to certification.",
        body: [
          "Green-building certification is a point-chasing exercise — you do not retrofit LEED credits, you design into them. Our sustainability desk maps every project's target rating early and reserves the credit path across disciplines so the certification is a documentation step, not a redesign.",
          "Daylight, ventilation, water and material credits are tracked against the design model, and the certification submission is compiled, signed and filed in-house rather than outsourced to a consultant.",
        ],
        specs: [
          { k: "Ratings", v: "LEED · IGBC · GRIHA" },
          { k: "Levels", v: "Silver → Platinum" },
          { k: "Delivery", v: "Pre-design to final cert." },
        ],
      },
      {
        name: "Energy audits",
        summary:
          "BEE-accredited energy audits with measurement, analysis and verified savings recommendations.",
        body: [
          "An energy audit is only useful if the recommendations are instrumented. We install temporary metering across the identified end-uses, run a 7–14 day trace, analyse it against billing data, and publish a report that ranks interventions by simple payback, not by ideology.",
          "Our audits are BEE-accredited, which means the client can claim the audit against PAT-cycle compliance if they are in a designated-consumer sector. Savings verified through a post-implementation re-measurement, not just modelled.",
        ],
        specs: [
          { k: "Accreditation", v: "BEE Certified Energy Auditor" },
          { k: "Scope", v: "Electrical · Thermal · HVAC" },
          { k: "Reporting", v: "ISO 50002 format" },
        ],
      },
    ],
    projects: [
      {
        code: "UE-SOL-0124",
        name: "Commercial rooftop array",
        location: "Noida, Uttar Pradesh",
        typology: "Commercial",
        meta: ["1.2 MWp", "IGBC Gold", "Delivered"],
      },
      {
        code: "UE-SOL-0231",
        name: "Mixed-use solar + PNG",
        location: "Noida, Uttar Pradesh",
        typology: "Mixed Use",
        meta: ["Rooftop", "IKEA", "Active"],
      },
      {
        code: "UE-SOL-0342",
        name: "Campus hybrid solar + storage",
        location: "Rajgir, Bihar",
        typology: "Institutional",
        meta: ["Hybrid", "800 kWp", "Delivered"],
      },
    ],
  },

  ibms: {
    intro: [
      "A building management system is the part of the building that tells you what the rest of the building is doing. Badly integrated, it is a dashboard nobody opens; well integrated, it is how you find the 18-hour overheating bay in the chiller plant before it becomes a breakdown.",
      "Our IBMS work starts from the sensor list, not the software. Every metered point on every piece of connected equipment is listed — fan status, valve position, temperature, kWh, air pressure — and the software is selected against the point count and protocol, not the other way around.",
    ],
    subServices: [
      {
        name: "Fire alarm & PA systems",
        summary:
          "Addressable fire-alarm panels integrated with voice-alarm, public-address and evacuation control.",
        body: [
          "A fire alarm that shouts 'Alarm!' in a 50-floor office is useless — the occupants don't know which floor, which stair, which direction. Our installations use pre-recorded voice-alarm PAVA messages with phased evacuation, so floor N evacuates first, N±1 hold, then the floors release in sequence.",
          "Panel and loop hardware is EN 54-2 / EN 54-4 listed. Voice messages are recorded in all operating languages of the asset and the PA system is segregated into zone amplifiers so a music channel in a lobby never crosses with a fire message in a stair.",
        ],
        specs: [
          { k: "Panel spec", v: "EN 54-2 / 54-4" },
          { k: "PAVA", v: "EN 54-16 / 54-24" },
          { k: "Zoning", v: "Phased evacuation" },
        ],
      },
      {
        name: "CCTV",
        summary:
          "IP-based surveillance with ONVIF cameras, central VMS and analytic overlays.",
        body: [
          "Modern CCTV is not about recording; it is about retrieval. A 400-camera system with no analytics is 400 hours of footage to search per incident. We design with analytics at the camera — motion, intrusion, queue, loitering — so the VMS only surfaces the events that matter.",
          "Storage is sized against retention policy and resolution — 30-day, 24×7, 4K retention at H.265 is a very different number to 7-day at 1080p. RAID 6 storage, dual controllers, and scheduled back-up to object storage for long-retention footage.",
        ],
        specs: [
          { k: "Protocol", v: "ONVIF Profile S/T" },
          { k: "Resolution", v: "2 MP – 12 MP · 4K" },
          { k: "Storage", v: "30 – 90 day RAID 6" },
        ],
      },
      {
        name: "Access control",
        summary:
          "Card, mobile and biometric access control with anti-pass-back, mantraps and visitor-management.",
        body: [
          "Access control is a door-and-people problem, not a reader-and-card one. We design the system around the evacuation plan and the security zoning — which doors revert-to-open on fire, which revert-to-closed, which require two-person verification.",
          "Credentials are multi-factor where the zone demands it — card plus PIN, card plus biometric. Visitor management is integrated into the same database so a pre-registered visitor's card prints on arrival, not at the front desk after 10 minutes of typing.",
        ],
        specs: [
          { k: "Credential", v: "Card · Mobile · Biometric" },
          { k: "Topology", v: "OSDP · IP · PoE" },
          { k: "Integration", v: "Visitor · HR · BMS" },
        ],
      },
      {
        name: "DDC",
        summary:
          "Direct digital control of HVAC plant — chillers, AHUs, VFDs, valves — with open protocols.",
        body: [
          "DDC is the control layer beneath the BMS dashboard. Every valve, damper and pump has a controller, a schedule, and a sequence of operation — all written to an open protocol (BACnet, Modbus, LonWorks) so the hardware is never locked to one vendor.",
          "Sequence-of-operation documents are delivered against a physical wiring diagram and are live-demoed at commissioning. Change-of-sequence requests post-handover are handled via a controlled logic library, not ad-hoc overwrites.",
        ],
        specs: [
          { k: "Protocol", v: "BACnet · Modbus · LON" },
          { k: "Points", v: "Up to 50,000" },
          { k: "Sequence", v: "Documented + version-controlled" },
        ],
      },
      {
        name: "Energy management",
        summary:
          "Sub-metering, analytics and automated demand response to expose and reduce operational energy.",
        body: [
          "Energy management begins with sub-metering. A campus that meters only at the main incoming has no idea which tenant, which floor, which chiller is drifting — the only signal is the monthly bill. We specify sub-meters at the transformer, DB, panel and tenant level, all reporting to the same EMS.",
          "Analytics layers on top of the metering — anomaly detection, regression against weather, benchmarking against peer assets. Automated demand response cuts non-critical loads during tariff peaks without operator intervention.",
        ],
        specs: [
          { k: "Meter class", v: "0.5S · ABT-compliant" },
          { k: "Analytics", v: "Regression + anomaly" },
          { k: "Standards", v: "ISO 50001 · IPMVP" },
        ],
      },
      {
        name: "Security control",
        summary:
          "Integrated security platform — intrusion, perimeter, panic and guard-tour tied into a single operations view.",
        body: [
          "A guard in a control room watches CCTV, answers a radio, handles the access panel, and logs events into a spreadsheet. Integrated security platforms collapse that stack — one pane of glass correlates alarms from every subsystem and walks the operator through a SOP.",
          "Intrusion detection is zoned by perimeter, façade and interior. Panic alarms tie into CCTV for automatic camera tasking. Guard-tour verification uses NFC checkpoints so the log is automatic, not manual.",
        ],
        specs: [
          { k: "Subsystems", v: "Intrusion · CCTV · Access · Panic" },
          { k: "Platform", v: "Single-pane PSIM" },
          { k: "SOP", v: "Integrated action flow" },
        ],
      },
      {
        name: "SCADA integration",
        summary:
          "Supervisory control and data acquisition for utility-scale plant rooms and industrial assets.",
        body: [
          "SCADA is BMS for infrastructure — substations, water plants, solar farms, industrial process. The design principle is identical: a central supervisor reads instrumented field devices, presents them in a single HMI, and logs every operator action.",
          "We specify ICS/SCADA with cybersecurity as a design parameter — segmented OT network, hardened HMIs, logged privilege escalation, and an air-gapped engineering workstation for firmware updates. Integration with the upstream BMS is via a protocol gateway, not a shared VLAN.",
        ],
        specs: [
          { k: "Platform", v: "Wonderware · iFIX · Ignition" },
          { k: "Protocol", v: "Modbus TCP · IEC 61850 · OPC UA" },
          { k: "Cybersecurity", v: "IEC 62443 baseline" },
        ],
      },
    ],
    projects: [
      {
        code: "UE-BMS-0238",
        name: "IT park IBMS retrofit",
        location: "Noida, Uttar Pradesh",
        typology: "Commercial",
        meta: ["IBMS retrofit", "6 blocks", "Active"],
      },
      {
        code: "UE-BMS-0319",
        name: "Mixed-use PSIM + BMS integration",
        location: "Noida, Uttar Pradesh",
        typology: "Mixed Use",
        meta: ["IBMS", "12,000 pts", "Delivered"],
      },
      {
        code: "UE-BMS-0427",
        name: "Data-centre SCADA + BMS",
        location: "Mumbai, Maharashtra",
        typology: "Data Centre",
        meta: ["SCADA", "12 MW", "Active"],
      },
    ],
  },
};
