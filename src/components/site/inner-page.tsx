import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Breadcrumb } from "@/components/site/breadcrumb";
export function InnerHero({
  eyebrow,
  title,
  description,
  image,
  back,
}: {
  eyebrow: string;
  title: string;
  description: string;
  image?: string;
  back?: { label: string; href: string };
}) {
  return (
    <>
      <section
        className={
          image
            ? "ue-inner-hero ue-inner-hero--image"
            : "ue-section ue-inner-hero"
        }
      >
        {image && (
          <>
            <Image src={image} alt="" fill priority sizes="100vw" />
            <div className="ue-inner-shade" />
          </>
        )}
        <div className="ue-container">
          <p className="ue-eyebrow">{eyebrow}</p>
          <h1 className="ue-h1">{title}</h1>
          <p className="ue-lead">{description}</p>
        </div>
      </section>
      {back && (
        <div className="ue-inner-breadcrumb">
          <div className="ue-container">
            <Breadcrumb items={[back, { label: title.replace(/\.$/, "") }]} />
          </div>
        </div>
      )}
    </>
  );
}
export function InnerCTA({ topic }: { topic?: string }) {
  return (
    <section className="ue-section ue-inner-cta">
      <div className="ue-container">
        <div>
          <p className="ue-eyebrow">Start a conversation</p>
          <h2 className="ue-h2">Let’s discuss your project.</h2>
        </div>
        <Button asChild className="rounded-full h-12 px-7">
          <Link
            href={
              topic ? `/contact?topic=${encodeURIComponent(topic)}` : "/contact"
            }
          >
            Get in touch <ArrowRight className="size-4 ml-2" aria-hidden />
          </Link>
        </Button>
      </div>
    </section>
  );
}
export function TextLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link className="ue-inner-link" href={href}>
      {children}
      <ArrowRight size={16} aria-hidden />
    </Link>
  );
}
