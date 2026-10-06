/**
 * Unique Engineers — careers / culture content
 *
 * Powers the /careers ("Why join us") page. Everything here is grounded
 * in verifiable facts already on the site (in-house delivery, safety
 * record, marquee projects, new verticals) — recruits can check it.
 *
 * EMPLOYEE_VOICES are PLACEHOLDERS. Replace the quotes, names, roles and
 * photo paths with real team members before publishing (see note there).
 */

export const CAREERS_HERO = {
  eyebrow: "Careers · Life at Unique Engineers",
  title: "Become the engineer you want to be.",
  lead: "The best engineers rarely leave for better problems — they leave for better rooms. Here you'll build India's most demanding projects alongside people who are invested in your growth, not just your output.",
  image: "/firm/team-on-site.jpg",
  imageAlt: "Unique Engineers site team reviewing drawings on a project floor",
};

/**
 * The pitch — names the three reasons good engineers stall (siloed teams,
 * toxic culture, no ceiling) and answers each. This is the emotional core.
 */
export const CAREERS_PITCH = {
  eyebrow: "Why join us",
  title: "Ambition needs the right room.",
  body: [
    "Talented engineers usually stall for the same three reasons: teams that don't talk to each other, cultures that reward politics over work, and roles with no ceiling to push against.",
    "Three decades have gone into building the opposite — an in-house practice where engineers design and build side by side, where credit is shared, and where your growth is written into the plan. Align your goals with the firm's, and it becomes the fastest way to get where you're going.",
  ],
};

/**
 * The four culture pillars — the heart of the page. Each directly answers
 * a pain point: growth, collaboration, breadth, and pride in the work.
 */
export const CULTURE_PILLARS = [
  {
    num: "01",
    title: "Your growth is the plan, not an afterthought.",
    body: "Your goals are aligned with the firm's from day one — structured mentorship under engineers with decades on the tools, real ownership early, and a clear line from where you are to where you want to be. The firm grows when you do, so your growth stays a priority, not an afterthought.",
  },
  {
    num: "02",
    title: "A room worth being in.",
    body: "In-house teams that design and build together — no brokered work, no blame games, no silos. The engineer who stamps the drawing is on site when it goes in. Collaboration isn't a poster on the wall here; it's how the work actually gets done.",
  },
  {
    num: "03",
    title: "Range that compounds.",
    body: "Nine sectors, twenty-three states, eight disciplines. Move from a data centre in Mumbai to a hospital in Delhi to a semiconductor fab in Gujarat. The breadth you build here makes you the engineer every project wants — and it's yours to keep.",
  },
  {
    num: "04",
    title: "Your work becomes landmarks.",
    body: "Foxconn. IKEA. Mopa Airport. AIIMS. Nalanda — India's first net-zero campus. You won't be buried in a sub-package nobody sees. You'll point at buildings on the skyline and know you built the systems inside them.",
  },
];

/** Tangible, honest offers — how the firm actually works, not invented perks. */
export const CAREERS_OFFERS = [
  {
    title: "Mentorship that's real",
    body: "Work directly under engineers with 15+ years on the tools. Design and BIM upskilling, honest technical reviews, and seniors who make the time.",
  },
  {
    title: "Delivery is rewarded",
    body: "Perform and it shows — merit-based growth and delivery bonuses. When the Foxconn team beat their deadline, the reward was shared with the people who earned it.",
  },
  {
    title: "Ownership, early",
    body: "Real packages go to people who are ready, not people who've simply waited long enough. Show the firm you can lead, and you will.",
  },
  {
    title: "The country as your classroom",
    body: "Six regional offices, live projects across 23 states and three neighbouring countries. Cross-discipline, cross-country exposure most engineers wait a whole career for.",
  },
];

/** Growth signal — a firm on the rise means room to rise with it. */
export const CAREERS_GROWTH = {
  eyebrow: "Room to rise",
  title: "A firm on the way up — with room for you on it.",
  body: "The firm entered the data-centre vertical in 2023 and semiconductors in 2024, and now handles mandates up to ₹1,000 Cr. New fronts open every year — and the people who open them are the ones already here.",
  stats: [
    { n: "2,500+", l: "People on the team" },
    { n: "275+", l: "Managers & engineers" },
    { n: "9", l: "Industries you can work across" },
    { n: "23", l: "States, plus 3 countries" },
  ],
};

/** Photo strip — real environment. All assets exist under /public. */
export const CAREERS_LIFE_IMAGES = [
  {
    src: "/firm/team-on-site.jpg",
    alt: "Engineers collaborating on a live project floor",
  },
  {
    src: "/firm/execution-excellence.jpg",
    alt: "On-site execution and quality inspection",
  },
  {
    src: "/services/electrical-hands.jpg",
    alt: "Hands-on electrical systems work",
  },
  {
    src: "/projects/foxconn-cleanroom.jpg",
    alt: "Cleanroom MEPF at the Foxconn facility",
  },
  {
    src: "/services/scaffold-silhouettes.jpg",
    alt: "Site team at work against the skyline",
  },
  { src: "/firm/india-presence.jpg", alt: "Pan-India project presence" },
];

/**
 * Areas you can grow into — mirrors the eight disciplines, framed for a
 * candidate ("where you'd fit") rather than a client ("what we sell").
 */
export const CAREERS_PATHS = [
  "Design & BIM engineering",
  "Site execution & project management",
  "Testing & commissioning",
  "QA / QC engineering",
  "Health, safety & environment (HSE)",
  "Operations & maintenance",
];

