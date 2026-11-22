import { SITE } from "@/data/site-content";
import { pageMetadata } from "@/lib/page-metadata";
export const metadata = pageMetadata(
  "Privacy",
  "How this website handles information and how to contact Unique Engineers about privacy.",
  "/privacy",
);
export default function PrivacyPage() {
  return (
    <section className="ue-section">
      <div className="ue-container ue-inner-legal">
        <p className="ue-eyebrow">Website information</p>
        <h1 className="ue-h1">Privacy.</h1>
        <p>Last updated: 11 September 2026</p>
        <h2>Information you share</h2>
        <p>
          This website provides email and phone links. It does not submit an
          enquiry on your behalf. If you contact Unique Engineers Limited, the
          information you choose to send is used to respond to your enquiry and
          handle the resulting business correspondence.
        </p>
        <h2>Website operation</h2>
        <p>
          The site is hosted on Vercel. Technical information associated with a
          visit, such as an IP address, requested page and browser details, may
          be processed by the hosting service to deliver and secure the website.
          This website does not include advertising trackers or a marketing
          analytics integration.
        </p>
        <h2>External services</h2>
        <p>
          Email, map and LinkedIn links open external services. Their own
          privacy policies apply when you use them. Project images and videos
          are served as website assets.
        </p>
        <h2>Contact</h2>
        <p>
          For questions about information you have shared, or to request access,
          correction or deletion, contact{" "}
          <a href={`mailto:${SITE.email}?subject=Privacy%20enquiry`}>
            {SITE.email}
          </a>
          . Include enough context to identify your correspondence without
          sending unnecessary sensitive information.
        </p>
        <p>
          {SITE.legalName}
          <br />
          {SITE.address}
        </p>
      </div>
    </section>
  );
}
