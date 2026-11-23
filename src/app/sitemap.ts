import type { MetadataRoute } from "next";
import { SITE, SERVICES } from "@/data/site-content";
import {
  getAllServices,
  getAllSectors,
  getAllProjects,
  getCategoriesForService,
} from "@/lib/cms";
import { VALUE_PAGES } from "@/data/capability/value";
import { CAP_PROJECTS } from "@/data/capability/projects";
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "/",
    "/services",
    "/sectors",
    "/projects",
    "/about",
    "/leadership",
    "/approach",
    "/careers",
    "/contact",
    "/execution-library",
    "/privacy",
    "/terms",
    ...SERVICES.map((s) => `/services/${s.slug}`),
    "/services/operations-maintenance",
    ...getAllServices().flatMap((s) =>
      getCategoriesForService(s.id).map((c) => `/services/${s.slug}/${c.slug}`),
    ),
    ...getAllSectors().map((s) => `/sectors/${s.slug}`),
    ...getAllProjects().map((p) => `/projects/${p.slug}`),
    // Deck projects with a page of their own (the Set below drops repeats).
    ...Object.values(CAP_PROJECTS)
      .map((p) => p.href)
      .filter((h): h is string => !!h),
    "/why-unique",
    ...VALUE_PAGES.map((p) => `/why-unique/${p.slug}`),
  ];
  return [...new Set(paths)].map((path) => ({ url: `${SITE.origin}${path}` }));
}
