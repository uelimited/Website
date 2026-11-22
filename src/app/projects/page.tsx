import { pageMetadata } from "@/lib/page-metadata";
import { getWorkHubData } from "@/lib/cms";
import { WorkHub } from "@/components/site/work-hub";
import { InnerCTA } from "@/components/site/inner-page";

export const metadata = pageMetadata(
  "Projects",
  "Explore project photographs, engineering scopes and our historical project record across India.",
  "/projects",
);

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  await searchParams;
  const data = getWorkHubData();

  return (
    <>
      <WorkHub {...data} />
      <InnerCTA />
    </>
  );
}
