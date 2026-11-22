import { InnerCTA } from "@/components/site/inner-page";
import { CapabilityPage } from "@/components/capability/capability-page";
import { VALUE_INDEX } from "@/data/capability/value";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata = pageMetadata(
  "Why Unique Engineers",
  VALUE_INDEX.description,
  "/why-unique",
  VALUE_INDEX.image,
);

/** The eight value additions. Five open a page of their own. */
export default function WhyUniquePage() {
  return (
    <>
      <CapabilityPage
        page={VALUE_INDEX}
        parent={{ label: "About", href: "/about" }}
      />
      <InnerCTA topic="Unique Engineers" />
    </>
  );
}
