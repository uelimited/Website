import type { Metadata } from "next";
import { getWorkHubData } from "@/lib/cms";
import { WorkHub } from "@/components/site/work-hub";
import { ContactCTA } from "@/components/site/contact-cta";

export const metadata: Metadata = {
  title: "Work — Every project, by sector and system | Unique Engineers",
  description:
    "Every project Unique Engineers has delivered over the last decade — 170+ mandates across nine industries. Filter the featured case studies and the full order book by sector, service, contract value and location.",
};

/**
 * The unified project-discovery hub. Featured case studies float on top;
 * the full 170-row order book sits below — both in ONE filter context,
 * URL-synced (`/work?sector=data-centre&service=hvac`).
 *
 * Awaiting `searchParams` opts the route into dynamic rendering, so the
 * client hub's `useSearchParams()` resolves during SSR: deep-linked and
 * filtered views render server-side (no blank frames, works without JS)
 * and no `Suspense` CSR-bailout boundary is required.
 */
export default async function WorkPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  await searchParams;
  const data = getWorkHubData();

  return (
    <>
      <WorkHub {...data} />
      <ContactCTA />
    </>
  );
}
