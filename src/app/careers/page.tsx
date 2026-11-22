import { InnerHero, TextLink } from "@/components/site/inner-page";
import { CompanySubnav } from "@/components/site/company-subnav";
import { SITE } from "@/data/site-content";
import { Button } from "@/components/ui/button";
import { pageMetadata } from "@/lib/page-metadata";
export const metadata = pageMetadata(
  "Careers",
  "Build your career in MEP engineering, project management and site delivery with Unique Engineers.",
  "/careers",
);
export default function CareersPage() {
  return (
    <>
      <InnerHero
        eyebrow="Careers"
        title="Build systems. Build your career."
        description="Work on the engineering and delivery of buildings, industry and infrastructure across India."
      />
      <CompanySubnav current="/careers" />
      <section className="ue-section">
        <div className="ue-container ue-inner-split">
          <div>
            <p className="ue-eyebrow">Working at Unique</p>
            <h2 className="ue-h2">
              Practical experience. Shared responsibility.
            </h2>
          </div>
          <div className="ue-inner-copy">
            <p>
              Our teams bring together MEP engineering, project management,
              procurement, quality, safety and site execution. Roles may be
              based at our Gurugram office or project locations.
            </p>
            <p>
              Send your CV with your area of expertise, experience and preferred
              location. We will consider your profile for relevant
              opportunities.
            </p>
            <Button asChild className="rounded-full px-6 h-12">
              <a href={`mailto:${SITE.email}?subject=Career%20enquiry`}>
                Email your CV
              </a>
            </Button>
            <p style={{ fontSize: 14, marginTop: 20 }}>
              Email: <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
            </p>
            <TextLink href="/approach">See how our teams work</TextLink>
          </div>
        </div>
      </section>
    </>
  );
}
