import { SITE } from "@/data/site-content";
import { pageMetadata } from "@/lib/page-metadata";
export const metadata = pageMetadata(
  "Website terms",
  "Information about using the Unique Engineers website and its project material.",
  "/terms",
);
export default function TermsPage() {
  return (
    <section className="ue-section">
      <div className="ue-container ue-inner-legal">
        <p className="ue-eyebrow">Website information</p>
        <h1 className="ue-h1">Website terms.</h1>
        <p>Last updated: 11 September 2026</p>
        <h2>About this website</h2>
        <p>
          This website introduces Unique Engineers Limited, its services and
          selected project experience. It is general business information.
          Project scope, specifications, price and delivery commitments are
          agreed separately in the relevant contract.
        </p>
        <h2>Project information</h2>
        <p>
          Project descriptions refer to the work undertaken by Unique Engineers
          and do not imply that every service shown on this website was
          delivered on every project. Historical contract figures relate to the
          period and scope recorded. Images may include site photographs and
          architectural visualisations.
        </p>
        <h2>Technical material</h2>
        <p>
          Service descriptions and the execution-method index provide an
          overview of capability. They are not instructions for construction.
          Detailed methods and technical requirements must be reviewed for the
          specific project.
        </p>
        <h2>Content and external links</h2>
        <p>
          Text, designs, photographs, trademarks and other materials belong to
          their respective owners. Contact us before reusing website materials.
          External links lead to independently operated websites.
        </p>
        <h2>Questions or corrections</h2>
        <p>
          To raise a question about this website or report an error, email{" "}
          <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
        </p>
      </div>
    </section>
  );
}
