import { notFound } from "next/navigation";
import { InnerCTA } from "@/components/site/inner-page";
import { CapabilityPage } from "@/components/capability/capability-page";
import { VALUE_PAGES, getValuePage } from "@/data/capability/value";
import { pageMetadata } from "@/lib/page-metadata";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return VALUE_PAGES.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props) {
  const page = getValuePage((await params).slug);
  return page
    ? pageMetadata(
        page.name,
        page.description,
        `/why-unique/${page.slug}`,
        page.image,
      )
    : {};
}

/**
 * One value addition in full: DfMA, the Bhondsi yard, floor kits, AI
 * workflows or intelligent buildings. Industry and service pages link
 * here from their Why Unique cards. Content: src/data/capability/value.ts.
 */
export default async function ValuePage({ params }: Props) {
  const page = getValuePage((await params).slug);
  if (!page) notFound();
  return (
    <>
      <CapabilityPage
        page={page}
        parent={{ label: "Why Unique", href: "/why-unique" }}
      />
      <InnerCTA topic={page.name} />
    </>
  );
}
