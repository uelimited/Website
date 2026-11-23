import { InnerHero, TextLink } from "@/components/site/inner-page";
export default function NotFound() {
  return (
    <>
      <InnerHero
        eyebrow="Page not found"
        title="Let’s get you back on track."
        description="This page may have moved, or the address may be incomplete."
      />
      <div
        className="ue-container"
        style={{ paddingBottom: 96, display: "flex", gap: 28 }}
      >
        <TextLink href="/">Go to the homepage</TextLink>
        <TextLink href="/projects">Explore our projects</TextLink>
      </div>
    </>
  );
}
