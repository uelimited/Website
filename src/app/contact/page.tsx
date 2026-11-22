import { InnerHero } from "@/components/site/inner-page";
import { EmailContact } from "@/components/site/email-contact";
import { SITE } from "@/data/site-content";
import { pageMetadata } from "@/lib/page-metadata";
export const metadata = pageMetadata(
  "Contact",
  "Contact Unique Engineers in Gurugram to discuss MEPF engineering, project requirements or partnerships.",
  "/contact",
);
export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const topic =
    typeof params.topic === "string"
      ? params.topic.replace(/[\r\n]/g, " ").slice(0, 160)
      : "Project enquiry";
  return (
    <>
      <InnerHero
        eyebrow="Contact"
        title="Let’s talk about your project."
        description="For project enquiries, partnerships or a general question, reach our team by email or phone."
      />
      <section className="ue-section" style={{ paddingTop: 0 }}>
        <div className="ue-container grid md:grid-cols-[1.4fr_1fr] gap-8 md:gap-16">
          <EmailContact topic={topic} />
          <div className="ue-inner-contact">
            <p className="ue-eyebrow">Head office</p>
            <h2>Gurugram.</h2>
            <address>{SITE.address}</address>
            <p>
              <a href={SITE.phoneHref}>{SITE.phone}</a>
            </p>
            <p>
              Monday–Friday
              <br />
              09:30–18:30 IST
            </p>
            <a
              className="ue-inner-link"
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(SITE.address)}`}
              target="_blank"
              rel="noreferrer"
            >
              View location ↗
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
