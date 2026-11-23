import type { Metadata } from "next";
import { SITE } from "@/data/site-content";
export function pageMetadata(
  title: string,
  description: string,
  path: string,
  image?: string,
): Metadata {
  return {
    title: `${title} — Unique Engineers`,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: `${title} — Unique Engineers`,
      description,
      url: path,
      siteName: SITE.name,
      type: "website",
      images: image ? [{ url: image }] : [],
    },
    twitter: {
      card: image ? "summary_large_image" : "summary",
      title: `${title} — Unique Engineers`,
      description,
      images: image ? [image] : [],
    },
  };
}
