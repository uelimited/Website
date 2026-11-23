import type { MetadataRoute } from "next";
import { SITE } from "@/data/site-content";
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE.origin}/sitemap.xml`,
  };
}
