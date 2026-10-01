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
} from "@/data/cms/types";
import { serviceParamFromId, type FeaturedCard } from "@/lib/ledger-filters";

import servicesJson from "@/data/cms/services.json";
import serviceCategoriesJson from "@/data/cms/service_categories.json";
import sectorsJson from "@/data/cms/sectors.json";
import projectsJson from "@/data/cms/projects.json";
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

// -----------------------------------------------------------------
// Type-safe casts of the raw JSON imports
// -----------------------------------------------------------------

const SERVICES = servicesJson as Service[];
const SERVICE_CATEGORIES = serviceCategoriesJson as ServiceCategory[];
const SECTORS = sectorsJson as Sector[];
const PROJECTS = projectsJson as Project[];
const CLIENTS = clientsJson as Client[];
const PROJECT_SERVICES = projectServicesJson as ProjectService[];
const PROJECT_SERVICE_CATEGORIES =
  projectServiceCategoriesJson as ProjectServiceCategory[];
const PROJECT_SECTORS = projectSectorsJson as ProjectSector[];
const LEADERSHIP = leadershipJson as Leader[];
const JOURNEY = journeyJson as JourneyMilestone[];
const TESTIMONIALS = testimonialsJson as Testimonial[];
const CERTIFICATIONS = certificationsJson as Certification[];
const OFFICES = officesJson as Office[];
const PROJECT_LEDGER = projectLedgerJson as LedgerEntry[];

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
  return PROJECTS.filter((p) => p.published)
    .slice()
    .sort(byValueDesc);
}

export function getProjectBySlug(slug: string): Project | null {
  return PROJECTS.find((p) => p.slug === slug && p.published) ?? null;
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

export function getProjectHeroImage(project: Project): string | null {
  if (project.hero_image_url) return project.hero_image_url;
  return getSectorsForProject(project.id)[0]?.sector.hero_image_url ?? null;
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
// Project ledger — the full 10-year order book (consolidated)
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
// Work hub — ledger ↔ case-study linking + the /work page payload
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
  const publishedSlugs = new Set(
    PROJECTS.filter((p) => p.published).map((p) => p.slug),
  );
  const out: Record<string, string> = {};
  for (const [ledgerId, slug] of Object.entries(CASE_STUDY_SLUG_BY_LEDGER_ID)) {
    if (publishedSlugs.has(slug)) out[ledgerId] = `/projects/${slug}`;
  }
  return out;
}

/** sector id → sector slug, for building `/work?sector=<slug>` links. */
export function getSectorSlugById(): Record<string, string> {
  return Object.fromEntries(
    SECTORS.filter((s) => s.published).map((s) => [s.id, s.slug]),
  );
}

/** Distinct, sorted non-empty states across the ledger (for the state filter). */
export function getLedgerStates(): string[] {
  return Array.from(
    new Set(PROJECT_LEDGER.map((e) => e.state).filter(Boolean)),
  ).sort((a, b) => a.localeCompare(b));
}

/** Number of distinct industries (sectors) represented in the ledger. */
export function getLedgerIndustryCount(): number {
  return new Set(PROJECT_LEDGER.map((e) => e.sector_id)).size;
}

/**
 * Complete payload for the `/work` hub. Featured case studies are
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
  const usedServiceIds = new Set(ledger.flatMap((e) => e.service_ids));

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

  const featured: FeaturedCard[] = projects.map((p) => {
    const secs = getSectorsForProject(p.id);
    const svcs = getServicesForProject(p.id);
    const primary = secs.find((s) => s.is_primary) ?? secs[0];
    const heroImageUrl = getProjectHeroImage(p);
    return {
      slug: p.slug,
      name: p.name,
      city: p.location_city,
      state: p.location_state ?? "",
      value_display: p.value_display ?? "",
      value_cr: p.value_cr ?? 0,
      primarySectorName: primary?.sector.name ?? p.project_type,
      sectorIds: secs.map((s) => s.sector.id),
      serviceIds: svcs.map((s) => s.service.id),
      scopeTags: p.scope_tags.slice(0, 4),
      heroImageUrl,
      isRepresentativeImage: !p.hero_image_url && Boolean(heroImageUrl),
      projectType: p.project_type,
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
