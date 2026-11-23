/** Public website content, aligned to UEL Information Pack, September 2026.
 * Financial, payroll and internal diligence records must never be imported here. */
export const SITE = {
  name: "Unique Engineers",
  legalName: "Unique Engineers Limited",
  founded: 1992,
  origin: "https://unique-engineers-website.vercel.app",
  email: "info@uelimited.com",
  phone: "+91 124 419 2527",
  phoneHref: "tel:+911244192527",
  address:
    "332, 3rd Floor, A-Block, Spaze IT Park, Sohna Road, Sector 49, Gurugram, Haryana 122001",
  linkedin: "https://www.linkedin.com/company/uniqueengineers",
};
export const MAIN_NAV = [
  { href: "/services", label: "Services" },
  { href: "/sectors", label: "Industries" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About Unique" },
];
export const SERVICES = [
  {
    id: "svc-hvac",
    slug: "hvac-company-in-gurgaon",
    name: "HVAC & Mechanical",
    description:
      "Cooling, heating and ventilation for buildings, cleanrooms and industrial processes.",
    image: "/project-archive/nalanda-university/gallery-04.jpg",
    scope: [
      "Chilled-water plants and hydronics",
      "Air handling and ventilation",
      "Cleanroom and precision HVAC",
      "Process cooling",
      "VRF / VRV systems",
      "Testing, balancing and commissioning",
    ],
  },
  {
    id: "svc-electrical",
    slug: "electrical-contractors-in-gurgaon",
    name: "Electrical & Critical Power",
    description:
      "Power distribution and resilient electrical systems, from substations to final circuits.",
    image: "/services/electrical-hero.jpg",
    scope: [
      "HT / LT distribution and substations",
      "Transformers, DG and UPS",
      "Panels, bus ducts and cabling",
      "Lighting and lighting controls",
      "Earthing and lightning protection",
      "Testing and energisation",
    ],
  },
  {
    id: "svc-firefighting",
    slug: "fire-fighting-contractors-in-gurgaon",
    name: "Fire & Life Safety",
    description:
      "Detection, suppression and fire protection coordinated with the building and its operations.",
    image: "/services/firefighting-hero.jpg",
    scope: [
      "Fire detection and alarm",
      "Hydrants and sprinklers",
      "Fire pumps and water storage",
      "Clean-agent suppression",
      "Public address and evacuation interfaces",
      "Testing and statutory readiness",
    ],
  },
  {
    id: "svc-plumbing",
    slug: "plumbing-services-in-gurgaon",
    name: "Plumbing & Public Health",
    description:
      "Water supply, drainage, treatment and reuse systems for reliable everyday operation.",
    image: "/services/plumbing-hero.jpg",
    scope: [
      "Potable and domestic water",
      "Soil, waste and stormwater systems",
      "STP, ETP and WTP",
      "Water reuse and pumping",
      "External wet utilities",
      "PNG and gas plumbing interfaces",
    ],
  },
  {
    id: "svc-bms",
    slug: "ibms",
    name: "BMS, ELV & Intelligent Buildings",
    description:
      "Connected controls, monitoring and security that bring building systems together.",
    image: "/services/bms-hero.jpg",
    scope: [
      "BMS / IBMS",
      "EPMS and DCIM interfaces",
      "SCADA / PLC integration",
      "CCTV and access control",
      "Structured cabling",
      "Energy monitoring and digital handover",
    ],
  },
  {
    id: "svc-civil",
    slug: "civil-interior-contractors-in-gurgaon",
    name: "Civil & Structural",
    description:
      "Civil works, foundations and interiors built around the requirements of integrated services.",
    image: "/project-archive/foxconn-bangalore/gallery-04.jpg",
    scope: [
      "Equipment and machine foundations",
      "Precision grouting",
      "Trenches and utility corridors",
      "Structural enabling works",
      "Interiors and finishes",
      "Roads, drainage and specialist civil works",
    ],
  },
  {
    id: "svc-solar",
    slug: "solar-epc-contractors-in-gurgaon",
    name: "Solar & Renewables",
    description:
      "Solar PV and electrical integration within a coordinated energy strategy.",
    image: "/services/solar-hero.jpg",
    scope: [
      "Rooftop and ground-mounted solar PV",
      "Inverter integration",
      "DC / AC cabling",
      "Protection and earthing",
      "Generation monitoring",
      "Grid synchronisation",
    ],
  },
  {
    id: "svc-process",
    slug: "precision-process-engineering",
    name: "Precision & Process Engineering",
    description:
      "Specialist utilities and high-integrity piping for advanced manufacturing and cleanrooms.",
    image: "/project-archive/ctrls-mahape-mumbai/gallery-05.jpg",
    scope: [
      "Compressed dry air and nitrogen",
      "Vacuum systems",
      "Process cooling water",
      "High-integrity piping",
      "Cleanroom utilities",
      "Specialty welding, inspection and testing",
    ],
  },
];
export const HISTORY = [
  {
    year: "1992",
    title: "Our beginnings in HVAC",
    text: "Pradeep Sharma, Manmohan Jindal and the late Rajeev Gupta establish Unique Engineers in Gurugram.",
  },
  {
    year: "1992–2000",
    title: "Industrial foundations",
    text: "HVAC engineering and contracting for industrial clients including NTPC, BHEL and Rolls-Royce Power Engineering.",
  },
  {
    year: "2000–2010",
    title: "A national practice",
    text: "Expansion beyond north India, with AHU manufacturing and work for stadiums, hotels and Commonwealth Games infrastructure.",
  },
  {
    year: "2010–2020",
    title: "Integrated MEPF and BMS",
    text: "The service offering grows across industrial plants, AIIMS and PMSSY healthcare campuses, and Mopa International Airport.",
  },
  {
    year: "2020 onwards",
    title: "Advanced industry",
    text: "MEPF, building controls and process utilities for Foxconn, Tata Electronics, and data centres for STT, CtrlS and AdaniConneX.",
  },
];
export const DIRECTORS = [
  {
    name: "Pradeep Sharma",
    role: "Founder & Managing Director",
    remit:
      "Enterprise direction, project coordination and senior client relationships.",
    image: "/firm/pradeep-sharma.jpg",
  },
  {
    name: "Manmohan Jindal",
    role: "Founder & Director",
    remit: "Operations, site execution, mobilisation and technical handover.",
    image: "/firm/manmohan-jindal.jpg",
  },
  {
    name: "Prakhar Pradeep",
    role: "Director",
    remit: "Growth, intelligent building solutions and digital practices.",
    image: "",
  },
];
export const LEADERS = [
  { name: "Krishan Bhushan Pandey", role: "Chief Projects Officer" },
  { name: "Neeraj Sharma", role: "Chief Operating Officer" },
  { name: "Kumar Abhijeet", role: "Chief Technology Officer" },
  { name: "Brajesh Kumar Gupta", role: "Chief Financial Officer" },
  { name: "Sanjeev Kumar", role: "Chief Human Resources Officer" },
  { name: "Madhur Malik", role: "Head of Sales & Estimation" },
];
