import { getMethodStatementRegistry } from "@/lib/cms";
import { ExecutionLibrary } from "@/components/site/execution-library";
import { InnerHero, InnerCTA, TextLink } from "@/components/site/inner-page";
import { pageMetadata } from "@/lib/page-metadata";
export const metadata = pageMetadata(
  "Execution library",
  "Explore our execution methods by discipline, work package or activity.",
  "/execution-library",
);
export default async function LibraryPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const q = await searchParams;
  const registry = getMethodStatementRegistry();
  const library =
    typeof q.library === "string" &&
    registry.libraries.some((l) => l.id === q.library)
      ? q.library
      : "all";
  const query = typeof q.q === "string" ? q.q : "";
  const statements = registry.statements.map(({ source_file, ...s }) => {
    void source_file;
    return s;
  });
  return (
    <>
      <InnerHero
        eyebrow="Execution library"
        title="The method behind the work."
        description="Search our execution methods by discipline, work package or activity. Detailed documents are shared after a review of your project requirements."
      />
      <section
        className="ue-section"
        id="controlled-index"
        style={{ paddingTop: 0 }}
      >
        <div className="ue-container">
          <ExecutionLibrary
            key={`${library}:${query}`}
            libraries={registry.libraries}
            statements={statements}
            initialLibrary={library}
            initialQuery={query}
          />
          <div style={{ marginTop: 32 }}>
            <TextLink href="/approach">How we deliver</TextLink>
          </div>
        </div>
      </section>
      <InnerCTA topic="Execution method enquiry" />
    </>
  );
}
