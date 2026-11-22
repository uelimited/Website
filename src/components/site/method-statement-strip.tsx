import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { MethodStatement } from "@/data/cms/types";

export function MethodStatementStrip({
  serviceName,
  methods,
  libraryHref,
}: {
  serviceName: string;
  methods: MethodStatement[];
  libraryHref: string;
}) {
  if (!methods.length) return null;

  return (
    <section className="ue-service-methods">
      <div className="ue-container">
        <header className="ue-service-methods__head">
          <div>
            <p className="ue-eyebrow">Method of working</p>
            <h2 className="ue-h2">How the work is controlled on site.</h2>
          </div>
          <div>
            <p>
              {methods.length} controlled methods connect {serviceName} design
              intent to work sequence, inspection, testing and handover.
            </p>
            <Link href={libraryHref}>
              Review the full method index <ArrowRight aria-hidden />
            </Link>
          </div>
        </header>
        <div className="ue-service-methods__grid">
          {methods.slice(0, 6).map((method) => (
            <article key={method.id}>
              <div>
                <span>{method.code}</span>
                <span>{method.library_name}</span>
              </div>
              <h3>{method.title}</h3>
              <p>{method.section}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
