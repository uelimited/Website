import "server-only";
/**
 * Unique Engineers — CMS query layer
 *
 * Single, typed access point for all content. Backs JSON files today;
 * swappable to Supabase / Sanity / any other backend tomorrow without
 * touching page or component code.
 *
 * All helpers are server-only — they read from disk via JSON imports.
 * Next.js will tree-shake unused queries out of client bundles.
 */

import type {
  Service,
  ServiceCategory,
  Sector,
  Project,
  Client,
  Leader,
  JourneyMilestone,
  Testimonial,
  Certification,
  Office,
  ProjectService,
  ProjectServiceCategory,
  ProjectSector,
  LedgerEntry,
  MethodStatementRegistry,
  OrganisationRegistry,
} from "@/data/cms/types";
import { serviceParamFromId, type FeaturedCard } from "@/lib/ledger-filters";

import servicesJson from "@/data/cms/services.json";
import serviceCategoriesJson from "@/data/cms/service_categories.json";
import sectorsJson from "@/data/cms/sectors.json";
import projectsJson from "@/data/cms/projects.json";
import landmarkProjectsJson from "@/data/cms/landmark_projects.json";
import clientsJson from "@/data/cms/clients.json";
import projectServicesJson from "@/data/cms/project_services.json";
import projectServiceCategoriesJson from "@/data/cms/project_service_categories.json";
import projectSectorsJson from "@/data/cms/project_sectors.json";
import leadershipJson from "@/data/cms/leadership.json";
import journeyJson from "@/data/cms/journey.json";
import testimonialsJson from "@/data/cms/testimonials.json";
import certificationsJson from "@/data/cms/certifications.json";
import officesJson from "@/data/cms/offices.json";
import projectLedgerJson from "@/data/cms/project_ledger.json";
import methodStatementsJson from "@/data/cms/method_statements.json";
import organisationJson from "@/data/cms/organisation.json";

// -----------------------------------------------------------------
// Type-safe casts of the raw JSON imports
// -----------------------------------------------------------------

const SERVICES = servicesJson as Service[];
const SERVICE_CATEGORIES = serviceCategoriesJson as ServiceCategory[];
const SECTORS = sectorsJson as Sector[];
type LandmarkProjectRecord = Project & {
  sector_ids: string[];
  service_ids: string[];
};

const LANDMARK_PROJECTS = (
  landmarkProjectsJson as { projects: LandmarkProjectRecord[] }
).projects;
const LEGACY_PROJECTS = projectsJson as Project[];
const PROJECTS: Project[] = [
  ...LANDMARK_PROJECTS.map((landmark) => {
    const existing = LEGACY_PROJECTS.find((p) => p.slug === landmark.slug);
    if (!existing) return landmark;
    const hasPlaceholderNarrative =
      landmark.missing_fields?.includes("project narrative");
    return {
      ...existing,
      ...landmark,
      id: existing.id,
      summary: hasPlaceholderNarrative ? existing.summary : landmark.summary,
      narrative: existing.narrative.length
        ? existing.narrative
        : landmark.narrative,
      key_metrics: existing.key_metrics,
      execution_snapshots: existing.execution_snapshots,
      certifications: existing.certifications,
    };
  }),
  ...LEGACY_PROJECTS.filter(
    (project) =>
      !LANDMARK_PROJECTS.some((landmark) => landmark.slug === project.slug),
  ),
];
const CLIENTS = clientsJson as Client[];
const PROJECT_SERVICES: ProjectService[] = [
  ...(projectServicesJson as ProjectService[]),
  ...LANDMARK_PROJECTS.flatMap((landmark) => {
    const project = PROJECTS.find((item) => item.slug === landmark.slug);
    return landmark.service_ids.map((serviceId, index) => ({
      project_id: project?.id ?? landmark.id,
      service_id: serviceId,
      is_primary: index === 0,
    }));
  }),
].filter(
  (join, index, joins) =>
    joins.findIndex(
      (candidate) =>
        candidate.project_id === join.project_id &&
        candidate.service_id === join.service_id,
    ) === index,
);
const PROJECT_SERVICE_CATEGORIES =
  projectServiceCategoriesJson as ProjectServiceCategory[];
const PROJECT_SECTORS: ProjectSector[] = [
  ...(projectSectorsJson as ProjectSector[]),
  ...LANDMARK_PROJECTS.flatMap((landmark) => {
    const project = PROJECTS.find((item) => item.slug === landmark.slug);
    return landmark.sector_ids.map((sectorId, index) => ({
      project_id: project?.id ?? landmark.id,
      sector_id: sectorId,
      is_primary: index === 0,
    }));
  }),
].filter(
  (join, index, joins) =>
    joins.findIndex(
      (candidate) =>
        candidate.project_id === join.project_id &&
        candidate.sector_id === join.sector_id,
    ) === index,
);
const LEADERSHIP = leadershipJson as Leader[];
const JOURNEY = journeyJson as JourneyMilestone[];
const TESTIMONIALS = testimonialsJson as Testimonial[];
const CERTIFICATIONS = certificationsJson as Certification[];
const OFFICES = officesJson as Office[];
const PROJECT_LEDGER = projectLedgerJson as LedgerEntry[];
const METHOD_STATEMENTS = methodStatementsJson as MethodStatementRegistry;
const ORGANISATION = organisationJson as OrganisationRegistry;

// -----------------------------------------------------------------
// Simple comparators
// -----------------------------------------------------------------

const bySortOrder = <T extends { sort_order: number }>(a: T, b: T) =>
  a.sort_order - b.sort_order;

const byNum = <T extends { num: string }>(a: T, b: T) =>
  Number(a.num) - Number(b.num);

const byValueDesc = (a: Project, b: Project) =>
  (b.value_cr ?? 0) - (a.value_cr ?? 0);

const byLandmarkOrder = (a: Project, b: Project) =>
  (a.landmark_order ?? Infinity) - (b.landmark_order ?? Infinity);

// -----------------------------------------------------------------
// Services
// -----------------------------------------------------------------

export function getAllServices(): Service[] {
  return SERVICES.filter((s) => s.published)
    .slice()
    .sort(bySortOrder);
}

export function getServiceBySlug(slug: string): Service | null {
  return SERVICES.find((s) => s.slug === slug && s.published) ?? null;
}

export function getServiceById(id: string): Service | null {
  return SERVICES.find((s) => s.id === id) ?? null;
}

// -----------------------------------------------------------------
// Service categories (sub-disciplines)
// -----------------------------------------------------------------

export function getCategoriesForService(serviceId: string): ServiceCategory[] {
  return SERVICE_CATEGORIES.filter(
    (c) => c.service_id === serviceId && c.published,
  )
    .slice()
    .sort(byNum);
}

export function getServiceCategoryBySlug(
  serviceSlug: string,
  categorySlug: string,
): ServiceCategory | null {
  const service = getServiceBySlug(serviceSlug);
  if (!service) return null;
  return (
    SERVICE_CATEGORIES.find(
      (c) =>
        c.service_id === service.id && c.slug === categorySlug && c.published,
    ) ?? null
  );
}

export function getServiceCategoryById(id: string): ServiceCategory | null {
  return SERVICE_CATEGORIES.find((c) => c.id === id) ?? null;
}

export function getRelatedServiceCategories(
  category: ServiceCategory,
): ServiceCategory[] {
  if (!category.related_category_ids?.length) return [];
  return category.related_category_ids
    .map((id) => SERVICE_CATEGORIES.find((c) => c.id === id))
    .filter((c): c is ServiceCategory => Boolean(c && c.published));
}

// -----------------------------------------------------------------
// Sectors
// -----------------------------------------------------------------

export function getAllSectors(): Sector[] {
  return SECTORS.filter((s) => s.published)
    .slice()
    .sort(bySortOrder);
}

export function getSectorBySlug(slug: string): Sector | null {
  return SECTORS.find((s) => s.slug === slug && s.published) ?? null;
}

export function getSectorById(id: string): Sector | null {
  return SECTORS.find((s) => s.id === id) ?? null;
}

// -----------------------------------------------------------------
// Projects
// -----------------------------------------------------------------

export function getAllProjects(): Project[] {
  return PROJECTS.filter(
    (p) =>
      p.published &&
      p.information_status !== "placeholder" &&
      p.scope_tags.some((tag) => !/confirm|placeholder/i.test(tag)),
  )
    .slice()
    .sort(byValueDesc);
}

export function getProjectBySlug(slug: string): Project | null {
  return getAllProjects().find((p) => p.slug === slug) ?? null;
}

export function getFeaturedProjects(): Project[] {
  return PROJECTS.filter((p) => p.published && p.featured)
    .slice()
    .sort(byLandmarkOrder);
}

export function getLandmarkProjects(): Project[] {
  // featured + has a landmark_order assigned, in order
  return PROJECTS.filter(
    (p) => p.published && p.featured && p.landmark_order != null,
  )
    .slice()
    .sort(byLandmarkOrder);
}

export function getProjectsByService(
  serviceId: string,
  opts: { limit?: number; primaryOnly?: boolean } = {},
): Project[] {
  const projectIds = PROJECT_SERVICES.filter(
    (j) => j.service_id === serviceId && (!opts.primaryOnly || j.is_primary),
  ).map((j) => j.project_id);

  const projects = PROJECTS.filter(
    (p) => p.published && projectIds.includes(p.id),
  )
    .slice()
    .sort(byValueDesc);

  return opts.limit ? projects.slice(0, opts.limit) : projects;
}

export function getProjectsByServiceCategory(
  categoryId: string,
  opts: { limit?: number; primaryOnly?: boolean } = {},
): Project[] {
  const projectIds = PROJECT_SERVICE_CATEGORIES.filter(
    (j) =>
      j.service_category_id === categoryId &&
      (!opts.primaryOnly || j.is_primary),
  ).map((j) => j.project_id);

  const projects = PROJECTS.filter(
    (p) => p.published && projectIds.includes(p.id),
  )
    .slice()
    .sort(byValueDesc);

  return opts.limit ? projects.slice(0, opts.limit) : projects;
}

export function getProjectsBySector(
  sectorId: string,
  opts: { limit?: number } = {},
): Project[] {
  const projectIds = PROJECT_SECTORS.filter(
    (j) => j.sector_id === sectorId,
  ).map((j) => j.project_id);

  const projects = PROJECTS.filter(
    (p) => p.published && projectIds.includes(p.id),
  )
    .slice()
    .sort(byValueDesc);

  return opts.limit ? projects.slice(0, opts.limit) : projects;
}

export function getServicesForProject(projectId: string): {
  service: Service;
  scope_note?: string;
  is_primary?: boolean;
}[] {
  const joins = PROJECT_SERVICES.filter((j) => j.project_id === projectId);
  return joins
    .map((j) => {
      const service = SERVICES.find((s) => s.id === j.service_id);
      if (!service) return null;
      return {
        service,
        scope_note: j.scope_note,
        is_primary: j.is_primary,
      };
    })
    .filter((x): x is NonNullable<typeof x> => x !== null)
    .sort(
      (a, b) => Number(b.is_primary ?? false) - Number(a.is_primary ?? false),
    );
}

export function getSectorsForProject(projectId: string): {
  sector: Sector;
  is_primary?: boolean;
}[] {
  const joins = PROJECT_SECTORS.filter((j) => j.project_id === projectId);
  return joins
    .map((j) => {
      const sector = SECTORS.find((s) => s.id === j.sector_id);
      if (!sector) return null;
      return { sector, is_primary: j.is_primary };
    })
    .filter((x): x is NonNullable<typeof x> => x !== null)
    .sort(
      (a, b) => Number(b.is_primary ?? false) - Number(a.is_primary ?? false),
    );
}

// -----------------------------------------------------------------
// Clients
// -----------------------------------------------------------------

export function getAllClients(): Client[] {
  return CLIENTS.slice().sort(bySortOrder);
}

export function getClientById(id: string): Client | null {
  return CLIENTS.find((c) => c.id === id) ?? null;
}

export function getFeaturedClients(): Client[] {
  return CLIENTS.filter((c) => c.featured_on_home)
    .slice()
    .sort(bySortOrder);
}

// -----------------------------------------------------------------
// Firm ancillaries
// -----------------------------------------------------------------

export function getLeadership(): Leader[] {
  return LEADERSHIP.slice().sort(bySortOrder);
}

export function getJourney(): JourneyMilestone[] {
  return JOURNEY.slice().sort(bySortOrder);
}

export function getTestimonials(): Testimonial[] {
  return TESTIMONIALS.slice().sort(bySortOrder);
}

export function getCertifications(): Certification[] {
  return CERTIFICATIONS.slice().sort(bySortOrder);
}

export function getOffices(): Office[] {
  return OFFICES.slice().sort(bySortOrder);
}

export function getHeadquarters(): Office | null {
  return OFFICES.find((o) => o.is_hq) ?? null;
}

// -----------------------------------------------------------------
// Convenience composites
// -----------------------------------------------------------------

/**
 * Service landing page payload — the service plus its sub-categories
 * plus a row of related projects (by primary service join).
 */
export function getServiceWithCategoriesAndProjects(slug: string): {
  service: Service;
  categories: ServiceCategory[];
  projects: Project[];
} | null {
  const service = getServiceBySlug(slug);
  if (!service) return null;
  return {
    service,
    categories: getCategoriesForService(service.id),
    projects: getProjectsByService(service.id, { primaryOnly: true, limit: 4 }),
  };
}

/**
 * Sub-discipline detail page payload — the category plus its parent
 * service, related categories, and projects.
 */
export function getCategoryWithContextAndProjects(
  serviceSlug: string,
  categorySlug: string,
): {
  service: Service;
  category: ServiceCategory;
  related: ServiceCategory[];
  projects: Project[];
} | null {
  const service = getServiceBySlug(serviceSlug);
  if (!service) return null;
  const category = SERVICE_CATEGORIES.find(
    (c) =>
      c.service_id === service.id && c.slug === categorySlug && c.published,
  );
  if (!category) return null;
  return {
    service,
    category,
    related: getRelatedServiceCategories(category),
    projects: getProjectsByServiceCategory(category.id, { limit: 4 }),
  };
}

/**
 * Sector detail page payload — the sector plus a row of projects.
 */
export function getSectorWithProjects(slug: string): {
  sector: Sector;
  projects: Project[];
  clients: Client[];
} | null {
  const sector = getSectorBySlug(slug);
  if (!sector) return null;
  const projects = getProjectsBySector(sector.id);
  const clients = (sector.featured_client_ids ?? [])
    .map((id) => CLIENTS.find((c) => c.id === id))
    .filter((c): c is Client => Boolean(c));
  return { sector, projects, clients };
}

// -----------------------------------------------------------------
// Project ledger — the full 10-year project record (consolidated)
// -----------------------------------------------------------------

const byLedgerValueDesc = (a: LedgerEntry, b: LedgerEntry) =>
  b.value_cr - a.value_cr;

export type LedgerStats = {
  count: number;
  total_cr: number;
  total_display: string;
};

/** Format a crore figure the way the ledger displays values. */
function formatCr(cr: number): string {
  if (cr >= 10) return `₹${Math.round(cr).toLocaleString("en-IN")} Cr`;
  if (cr >= 1) return `₹${cr.toFixed(1)} Cr`;
  return `₹${Math.round(cr * 100)} L`;
}

function statsFor(entries: LedgerEntry[]): LedgerStats {
  const total = entries.reduce((sum, e) => sum + e.value_cr, 0);
  return {
    count: entries.length,
    total_cr: total,
    total_display: formatCr(total),
  };
}

/** Every ledger project, highest value first. */
export function getProjectLedger(): LedgerEntry[] {
  return PROJECT_LEDGER.slice().sort(byLedgerValueDesc);
}

/** Ledger projects in one sector (industry), highest value first. */
export function getLedgerBySector(sectorId: string): LedgerEntry[] {
  return PROJECT_LEDGER.filter((e) => e.sector_id === sectorId)
    .slice()
    .sort(byLedgerValueDesc);
}

/** Ledger projects with a given service in scope, highest value first. */
export function getLedgerByService(serviceId: string): LedgerEntry[] {
  return PROJECT_LEDGER.filter((e) => e.service_ids.includes(serviceId))
    .slice()
    .sort(byLedgerValueDesc);
}

/** Headline count + cumulative value across the whole ledger. */
export function getLedgerStats(): LedgerStats {
  return statsFor(PROJECT_LEDGER);
}

/** Headline count + cumulative value for one sector's ledger. */
export function getLedgerStatsForSector(sectorId: string): LedgerStats {
  return statsFor(PROJECT_LEDGER.filter((e) => e.sector_id === sectorId));
}

/** Headline count + cumulative value for one service's ledger. */
export function getLedgerStatsForService(serviceId: string): LedgerStats {
  return statsFor(
    PROJECT_LEDGER.filter((e) => e.service_ids.includes(serviceId)),
  );
}

/**
 * Project detail page payload — project plus all linked services,
 * sectors, and a row of related projects (sharing the primary sector).
 */
export function getProjectWithContext(slug: string): {
  project: Project;
  services: ReturnType<typeof getServicesForProject>;
  sectors: ReturnType<typeof getSectorsForProject>;
  client: Client | null;
  related: Project[];
} | null {
  const project = getProjectBySlug(slug);
  if (!project) return null;
  const services = getServicesForProject(project.id);
  const sectors = getSectorsForProject(project.id);
  const client = project.client_id ? getClientById(project.client_id) : null;
  const primarySectorId = sectors.find((s) => s.is_primary)?.sector.id;
  const related = primarySectorId
    ? getProjectsBySector(primarySectorId)
        .filter((p) => p.id !== project.id)
        .slice(0, 3)
    : [];
  return { project, services, sectors, client, related };
}

// -----------------------------------------------------------------
// Project hub — ledger ↔ case-study linking + the /projects page payload
// -----------------------------------------------------------------

/**
 * Ledger rows (project_ledger.json ids) that correspond to a rich case
 * study (projects.json slug). Curated, high-confidence matches only —
 * a wrong link is worse than a sector-fallback link. Every Foxconn
 * building maps to the Foxconn engagement; the three STT rows map to
 * the STT GDC study; the rest are clean singletons.
 */
export const CASE_STUDY_SLUG_BY_LEDGER_ID: Record<string, string> = {
  "ingka-sector-51-noida": "ingka-centre-ikea",
  "common-central-secretariat": "common-central-secretariat",
  "executive-enclave": "common-central-secretariat",
  "mopa-airport": "mopa-international-airport",
  "nalanda-university": "nalanda-university",
  "tata-semiconductor-dholera": "tata-electronics-dholera",
  "jswml-ev-project": "jsw-ev-manufacturing",
  "stt-data-centre": "stt-gdc-mumbai",
  "stt-data-centre-navi-mumbai": "stt-gdc-mumbai",
  "stt-global-data-centre": "stt-gdc-mumbai",
  "tata-semiconductor-morigaon-assam": "tata-electronics-dholera",
  "m3m-mansion-sec-113": "m3m-mansion-113",
  "igh-dwarka": "indira-gandhi-hospital",
  "sky-mansion": "sky-mansion",
  "bharti-aerocity": "bharti-airtel-aerocity",
  "vatika-one-on-one": "vatika-one-on-one",
  "aiims-jammu": "aiims-jammu",
  "scb-medical-college-cuttack": "scb-medical-college-cuttack",
  bitsom: "bitsom-mumbai",
  "kolkata-atc-tower": "atc-tower-kolkata",
  "ssh-warangal": "ssh-warangal",
  "iit-palakkad": "iit-palakkad",
  "selfie-square": "amb-selfie-square",
  "klj-square": "klj-square",
  "elan-miracle": "elan-miracle",
  "amity-university-ranchi": "amity-ranchi-operations-maintenance",
  "amity-university-kolkata": "amity-kolkata-operations-maintenance",
  "anant-raj-cloud": "anant-raj-cloud-data-centre",
  "chennai-airport": "chennai-airport-t3-phase-2",
  "safdarjung-hospital": "safdarjung-hospital",
  "asi-noida": "asi-greater-noida",
  "bose-institute-kolkata": "bose-institute-kolkata",
  "sabarmati-hsr-terminal": "high-speed-rail-ahmedabad",
  "200-bedded-hospital-burari": "burari-hospital",
  "microsoft-noida": "microsoft-noida",
  "amity-university-hyderabad": "amity-hyderabad",
  "foxconn-a1-building": "foxconn-bangalore",
  "foxconn-a2-building": "foxconn-bangalore",
  "foxconn-a3-building": "foxconn-bangalore",
  "foxconn-a5-building": "foxconn-bangalore",
  "foxconn-a41-building": "foxconn-bangalore",
  "foxconn-a4t-building": "foxconn-bangalore",
  "foxconn-b1-building": "foxconn-bangalore",
  "foxconn-b2-building": "foxconn-bangalore",
  "foxconn-b11-building": "foxconn-bangalore",
  "foxconn-b21-building": "foxconn-bangalore",
  "foxconn-bangalore-misc": "foxconn-bangalore",
};

/** ledger id → `/projects/<slug>`, only for rows whose case study is published. */
export function getCaseStudyHrefsByLedgerId(): Record<string, string> {
  const publishedSlugs = new Set(getAllProjects().map((p) => p.slug));
  const out: Record<string, string> = {};
  for (const [ledgerId, slug] of Object.entries(CASE_STUDY_SLUG_BY_LEDGER_ID)) {
    if (publishedSlugs.has(slug)) out[ledgerId] = `/projects/${slug}`;
  }
  return out;
}

/** sector id → sector slug, for building `/projects?sector=<slug>` links. */
export function getSectorSlugById(): Record<string, string> {
  return Object.fromEntries(
    SECTORS.filter((s) => s.published).map((s) => [s.id, s.slug]),
  );
}

/** Distinct, sorted non-empty states across the ledger (for the state filter). */
export function getLedgerStates(): string[] {
  return Array.from(
    new Set(
      [
        ...PROJECT_LEDGER.map((e) => e.state),
        ...PROJECTS.map((project) => project.location_state ?? ""),
      ].filter(Boolean),
    ),
  ).sort((a, b) => a.localeCompare(b));
}

/** Number of distinct industries (sectors) represented in the ledger. */
export function getLedgerIndustryCount(): number {
  return new Set(PROJECT_LEDGER.map((e) => e.sector_id)).size;
}

/**
 * Complete payload for the `/projects` hub. Featured case studies are
 * pre-flattened with their sector/service ids so the client can filter
 * them against the same axes as the ledger without importing joins.
 */
export function getWorkHubData(): {
  ledger: LedgerEntry[];
  stats: LedgerStats;
  sectorOptions: { id: string; name: string; param: string }[];
  serviceOptions: { id: string; name: string; param: string }[];
  sectorLabels: Record<string, string>;
  serviceLabels: Record<string, string>;
  featured: FeaturedCard[];
  states: string[];
  industries: number;
  caseStudyHrefs: Record<string, string>;
  sectorSlugById: Record<string, string>;
} {
  const ledger = getProjectLedger();
  const stats = getLedgerStats();
  const sectors = getAllSectors();
  const services = getAllServices();
  const projects = getAllProjects();

  const sectorLabels = Object.fromEntries(sectors.map((s) => [s.id, s.name]));
  const serviceLabels = Object.fromEntries(
    services.map((s) => [s.id, s.short_name ?? s.name]),
  );

  // Only offer chips for sectors / services that actually appear in the ledger.
  const usedSectorIds = new Set(ledger.map((e) => e.sector_id));
  const usedServiceIds = new Set([
    ...ledger.flatMap((e) => e.service_ids),
    ...projects.flatMap((p) =>
      getServicesForProject(p.id).map((s) => s.service.id),
    ),
  ]);

  const sectorOptions = sectors
    .filter((s) => usedSectorIds.has(s.id))
    .map((s) => ({ id: s.id, name: s.name, param: s.slug }));
  const serviceOptions = services
    .filter((s) => usedServiceIds.has(s.id))
    .map((s) => ({
      id: s.id,
      name: s.short_name ?? s.name,
      param: serviceParamFromId(s.id),
    }));

  const featured: FeaturedCard[] = projects
    .filter((p) => p.hero_image_url)
    .map((p) => {
      const secs = getSectorsForProject(p.id);
      const svcs = getServicesForProject(p.id);
      const primary = secs.find((s) => s.is_primary) ?? secs[0];
      return {
        slug: p.slug,
        name: p.name,
        city: /confirm|pending/i.test(p.location_city) ? "" : p.location_city,
        state: /confirm|pending/i.test(p.location_state ?? "")
          ? ""
          : (p.location_state ?? ""),
        value_display: p.value_display ?? "",
        value_cr: p.value_cr ?? 0,
        primarySectorName: primary?.sector.name ?? p.project_type,
        sectorIds: secs.map((s) => s.sector.id),
        serviceIds: svcs.map((s) => s.service.id),
        scopeTags: p.scope_tags.slice(0, 4),
        heroImageUrl: p.hero_image_url ?? null,
        projectType: p.project_type,
        clientName: p.client_name_display ?? "",
        status: p.status,
      };
    });

  return {
    ledger,
    stats,
    sectorOptions,
    serviceOptions,
    sectorLabels,
    serviceLabels,
    featured,
    states: getLedgerStates(),
    industries: usedSectorIds.size,
    caseStudyHrefs: getCaseStudyHrefsByLedgerId(),
    sectorSlugById: getSectorSlugById(),
  };
}

// -----------------------------------------------------------------
// Controlled execution-method library
// -----------------------------------------------------------------

export function getMethodStatementRegistry(): MethodStatementRegistry {
  return METHOD_STATEMENTS;
}

export function getOrganisationRegistry(): OrganisationRegistry {
  return ORGANISATION;
}

export function getMethodStatementsForService(serviceId: string) {
  const libraryByService: Record<string, string> = {
    "svc-civil": "civil",
    "svc-hvac": "hvac",
    "svc-electrical": "electrical",
    "svc-plumbing": "public-health",
    "svc-bms": "elv-bms",
  };
  const libraryId = libraryByService[serviceId];
  if (libraryId) {
    return METHOD_STATEMENTS.statements.filter(
      (statement) => statement.library_id === libraryId,
    );
  }

  const patternByService: Record<string, RegExp> = {
    "svc-firefighting": /fire|smoke|suppression|sprinkler|hydrant/i,
    "svc-solar": /solar|photovoltaic|inverter|energy/i,
    "svc-om": /maintenance|inspection|testing|commissioning|handover/i,
  };
  const pattern = patternByService[serviceId];
  return pattern
    ? METHOD_STATEMENTS.statements.filter((statement) =>
        pattern.test(statement.search_text),
      )
    : [];
}
