/**
 * Unique Engineers — CMS type definitions
 *
 * These types mirror the schema we'll eventually push to a real CMS
 * (Supabase / Sanity / etc). For now they back JSON files in this
 * directory, read via the typed loader at /lib/cms.ts.
 *
 * Migrating to a database later means swapping the loader, not the
 * types — pages and components stay identical.
 */

// -----------------------------------------------------------------
// Shared primitives
// -----------------------------------------------------------------

export type Spec = { k: string; v: string };

export type Image = {
  src: string;
  alt: string;
  caption?: string;
  credit?: string;
};

export type Accent =
  "blocks" | "fan" | "current" | "droplets" | "pulse" | "sun" | "graph";

// -----------------------------------------------------------------
// services — the 8 top-level disciplines
// -----------------------------------------------------------------

export type Service = {
  id: string;
  slug: string; // e.g. "hvac-company-in-gurgaon"
  num: string; // "01"–"08"
  name: string; // "HVAC"
  short_name?: string; // optional shorter form for nav
  blurb: string; // one-liner for nav menus
  tagline?: string; // human one-liner ("Air you never have to think about.")
  scope_unit: string; // "TR · CFM"
  intro_paragraphs: string[]; // landing-page overview
  approach_paragraphs: string[]; // how UEL approaches this discipline (technical)
  approach_plain?: string[]; // plain-language version shown first
  stats?: Spec[]; // headline service figures
  hero_scale?: string; // curated ceiling figure, e.g. "up to 30,000 TR"
  hero_image_url?: string;
  hero_image_alt?: string;
  seo_title?: string;
  seo_description?: string;
  sort_order: number;
  published: boolean;
};

// -----------------------------------------------------------------
// service_categories — the sub-disciplines under each service
// -----------------------------------------------------------------

export type CategoryType = "system_layer" | "application" | "specialised";

export type ServiceCategorySystem = {
  name: string;
  description: string;
  specs?: Spec[];
};

export type ServiceCategory = {
  id: string;
  service_id: string; // FK → services.id
  slug: string; // unique within service, e.g. "data-center-cooling"
  num: string; // "01"–"06"
  name: string; // "Data Center Cooling"
  category_type: CategoryType;
  short_blurb: string; // for the landing card
  intro_paragraphs: string[]; // overview section on the detail page
  approach_paragraphs: string[]; // how-we-approach-it
  systems: ServiceCategorySystem[]; // grid of key systems on detail page
  specs?: Spec[]; // optional headline tiles
  related_category_ids?: string[]; // cross-links — within or across services
  hero_image_url?: string;
  hero_image_alt?: string;
  seo_title?: string;
  seo_description?: string;
  sort_order: number;
  published: boolean;
};

// -----------------------------------------------------------------
// sectors — the 8 verticals
// -----------------------------------------------------------------

export type Sector = {
  id: string;
  slug: string;
  name: string;
  short_description: string;
  long_description: string;
  projects_count_override?: string; // display string (e.g. "75+")
  revenue_cr_override?: string; // display string (e.g. "₹800+ Cr")
  hero_image_url?: string;
  hero_image_alt?: string;
  icon_url?: string;
  // sections for deep sector pages; lite sectors leave these empty
  sections?: SectorSection[];
  // featured client ids to show in the sector logo wall
  featured_client_ids?: string[];
  deep_page: boolean; // true = render full content layout
  sort_order: number;
  published: boolean;
};

export type SectorSection = {
  heading: string;
  body: string[]; // paragraphs
  tiles?: Spec[]; // optional spec grid
  systems?: ServiceCategorySystem[];
};

// -----------------------------------------------------------------
// clients — for logo walls and project attribution
// -----------------------------------------------------------------

export type Client = {
  id: string;
  name: string;
  logo_url?: string;
  hero_image_url?: string;
  primary_sector_id?: string;
  website?: string;
  featured_on_home: boolean;
  sort_order: number;
};

// -----------------------------------------------------------------
// projects — the case studies
// -----------------------------------------------------------------

export type ProjectStatus = "planning" | "active" | "completed" | "on_hold";

export type ExecutionSnapshot = {
  title: string;
  body: string[]; // paragraphs
  image_url?: string;
  image_alt?: string;
};

export type Project = {
  id: string;
  slug: string;
  code?: string; // internal e.g. "UE-MEP-0142"
  name: string;
  client_id?: string; // FK → clients
  client_name_display?: string; // when client isn't in clients table
  location_city: string;
  location_state?: string;
  location_country: string;
  project_type: string; // "Semiconductor", "Mixed Use", "Airport"
  timeline_text?: string; // "1 year", "3 years"
  value_cr?: number; // numeric for sort/sum
  value_display?: string; // "₹411 Cr"
  summary: string; // card description
  narrative: string[]; // long-form paragraphs
  scope_tags: string[]; // ["HVAC", "Firefighting", "Plumbing"]
  status: ProjectStatus;
  featured: boolean; // home page eligible
  landmark_order?: number; // explicit ordering in landmark grid (1-5)
  hero_image_url?: string;
  hero_image_alt?: string;
  accent: Accent;
  key_metrics?: Spec[]; // [{label, value}]
  execution_snapshots?: ExecutionSnapshot[];
  certifications?: string[]; // ["IGBC Gold"]
  gallery?: Image[];
  video_url?: string;
  information_status?: "project_sheet" | "placeholder";
  missing_fields?: string[];
  source_folders?: string[];
  seo_title?: string;
  seo_description?: string;
  published: boolean;
};

// -----------------------------------------------------------------
// project_ledger — the full 10-year project record, consolidated
//
// Distinct from `projects` (the curated case studies). Every entry is
// a real facility/site delivered over the last decade, categorised by
// sector and (where evidenced) service. Compiled from the historic project register;
// repeat purchase orders are consolidated per site, tiny sub-contracts
// (< ₹0.5 Cr) are excluded. Sector/service ids match the tables above.
// -----------------------------------------------------------------

export type LedgerEntry = {
  id: string;
  name: string;
  client: string;
  city: string;
  state: string;
  sector_id: string; // FK → sectors.id
  service_ids: string[]; // FK → services.id (may be empty)
  value_cr: number; // aggregated contract value, exact
  value_display: string; // "₹347 Cr" / "₹6.5 Cr" / "₹80 L"
  year_start: number | null;
  year_end: number | null;
  year_display: string; // "2018–2024" / "2023" / ""
  order_count: number; // purchase-order line items consolidated
};

// -----------------------------------------------------------------
// joins — many-to-many relationships
// -----------------------------------------------------------------

export type ProjectService = {
  project_id: string;
  service_id: string;
  scope_note?: string; // "HVAC + Cleanroom MEPF"
  is_primary?: boolean;
};

export type ProjectServiceCategory = {
  project_id: string;
  service_category_id: string;
  scope_note?: string;
  is_primary?: boolean;
};

export type ProjectSector = {
  project_id: string;
  sector_id: string;
  is_primary?: boolean;
};

// -----------------------------------------------------------------
// firm ancillaries
// -----------------------------------------------------------------

export type Leader = {
  id: string;
  name: string;
  role: string;
  credential: string;
  experience: string;
  bio?: string;
  responsibilities?: string[];
  portrait_url?: string;
  group?: "founder_directors" | "directors" | "executive_leadership";
  profile_status?: "confirmed" | "awaiting_profile";
  function?: string;
  sort_order: number;
};

export type JourneyMilestone = {
  id: string;
  year: string; // "1990" or "2012–2018"
  title: string; // "Foundation"
  description: string;
  icon_url?: string;
  sort_order: number;
};

export type Testimonial = {
  id: string;
  quote: string;
  author_name: string;
  author_role: string;
  author_company: string;
  project_id?: string;
  sort_order: number;
};

export type Certification = {
  id: string;
  name: string;
  category: string; // "Quality", "Environment", "Safety", "Empanelment", "Membership"
  logo_url?: string;
  sort_order: number;
};

export type Office = {
  id: string;
  name: string; // "Headquarters" or "Mumbai"
  address: string;
  city: string;
  state?: string;
  phone?: string;
  email?: string;
  lat?: number;
  lng?: number;
  is_hq: boolean;
  sort_order: number;
};

// -----------------------------------------------------------------
// method_statements — controlled public capability index
// -----------------------------------------------------------------

export type MethodLibrary = {
  id: string;
  name: string;
  description: string;
  href: string;
  count: number;
};

export type MethodStatement = {
  id: string;
  code: string;
  title: string;
  library_id: string;
  library_name: string;
  section: string;
  href: string;
  availability: string;
  source_file: string;
  search_text: string;
};

export type MethodStatementRegistry = {
  meta: {
    source_directory: string;
    generated_at: string;
    publication_policy: string;
  };
  libraries: MethodLibrary[];
  statements: MethodStatement[];
};

export type OrganisationRegistry = {
  meta: {
    last_reviewed: string;
    publication_rule: string;
  };
  functions: Array<{
    id: string;
    name: string;
    description: string;
    count: number | null;
    count_label: string;
    owner: string;
    status: "awaiting_validation" | "confirmed";
  }>;
  culture: {
    principles: Array<{ title: string; body: string }>;
    photo_slots: string[];
  };
  workforce: {
    model_layers: Array<{ title: string; body: string }>;
    continuity_controls: string[];
    metrics: Array<{
      label: string;
      value: number | null;
      display: string;
      owner: string;
    }>;
  };
  innovation: {
    principles: string[];
    use_cases: Array<{ title: string; body: string; status: string }>;
  };
  corporate_snapshot: {
    review_tracks: Array<{ title: string; body: string; status: string }>;
  };
};
