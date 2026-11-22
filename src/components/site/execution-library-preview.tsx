import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { getMethodStatementRegistry } from "@/lib/cms";

const CONTROL_STEPS = [
  "Plan and coordinate",
  "Approve materials and method",
  "Install with hold points",
  "Inspect, test and record",
  "Commission and hand over",
];

export function ExecutionLibraryPreview() {
  const registry = getMethodStatementRegistry();

  return (
    <section className="ue-method-preview" id="execution-intelligence">
      <div className="ue-container">
        <div className="ue-method-preview__grid">
          <div className="ue-method-preview__copy">
            <p className="ue-eyebrow">Execution intelligence</p>
            <h2 className="ue-h2">The method behind the installation.</h2>
            <p className="ue-lead">
              A controlled library of {registry.statements.length} execution
              methods translates engineering intent into site sequence,
              inspection gates, testing records and handover evidence.
            </p>
            <Link href="/execution-library" className="ue-text-link">
              Explore the execution library <ArrowRight aria-hidden />
            </Link>
          </div>
          <div className="ue-method-preview__panel">
            <div className="ue-method-preview__count">
              <span>{registry.statements.length}</span>
              <p>controlled methods</p>
            </div>
            <ol>
              {CONTROL_STEPS.map((step, index) => (
                <li key={step}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <p>{step}</p>
                  <CheckCircle2 aria-hidden />
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
