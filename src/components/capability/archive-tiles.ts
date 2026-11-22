import type { Project } from "@/data/cms/types";
import type { CapTile } from "@/data/capability/types";
import { plain } from "@/data/capability/plain";

const known = (v?: string) =>
  v && !/confirm|pending|placeholder/i.test(v) ? v : undefined;

/** Place names as the archive spells them, and how these pages show them. */
const CITY_FIXES: Record<string, string> = {
  "Chh.Shambhaji Nagar": "Chhatrapati Sambhajinagar",
  "MahipalPur NewDelhi": "Mahipalpur, New Delhi",
  "AIIMS Majra Rewari": "Rewari",
  Warrangel: "Warangal",
  "PALAKKAD Kerala": "Palakkad, Kerala",
  "Manesar Haryana": "Manesar",
  "Chennai Tamil Nadu": "Chennai",
  Bangalore: "Bengaluru",
};

/** Records whose city field holds only the state. */
const PLACE_BY_SLUG: Record<string, string> = {
  "nalanda-university": "Rajgir, Bihar",
};

/** "City, State" from an archive record, without repeats. */
export function placeOf(city?: string, state?: string, slug?: string): string {
  if (slug && PLACE_BY_SLUG[slug]) return PLACE_BY_SLUG[slug];
  let c = known(city)?.trim();
  const s = known(state)?.trim();
  if (c && CITY_FIXES[c]) c = CITY_FIXES[c];
  if (!c) return s ?? "";
  if (!s || c.includes(",")) return c;
  const same = c.toLowerCase() === s.toLowerCase();
  if (same) return s;
  // "New Delhi, Delhi" reads better as "New Delhi".
  if (c.toLowerCase().endsWith(s.toLowerCase())) return c;
  return `${c}, ${s}`;
}

/** Case study tiles from project archive records. */
export function archiveTiles(projects: Project[]): CapTile[] {
  return projects
    .filter((p) => !!p.hero_image_url)
    .map((p) => ({
      name: plain(p.name),
      place: placeOf(p.location_city, p.location_state, p.slug) || undefined,
      scope:
        plain(p.scope_tags.filter((t) => known(t)).join(", ")) || undefined,
      image: p.hero_image_url,
      href: `/projects/${p.slug}`,
    }));
}
