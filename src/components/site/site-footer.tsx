import Link from "next/link";
import { FIRM, DISCIPLINES } from "@/data/firm";
import { Wordmark } from "./wordmark";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="ue-footer">
      <div className="inner">
        <div>
          <div className="wmbig"><Wordmark /></div>
          <div className="wmsub">Design-build MEPF · since {FIRM.foundedYear}</div>
          <p
            className="text-[color:var(--ink-500)] m-0"
            style={{ maxWidth: "38ch", fontSize: 14, lineHeight: 1.55 }}
          >
            Mechanical, electrical, plumbing, firefighting, building management
            and civil contracting. Executed to specification.
          </p>
        </div>
        <div>
          <h6>Services</h6>
          <ul>
            {DISCIPLINES.slice(0, 5).map((d) => (
              <li key={d.slug}>
                <Link href={`/services/${d.slug}`}>{d.name}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h6>Firm</h6>
          <ul>
            <li><Link href="/firm">The firm</Link></li>
            <li><Link href="/careers">Why join us</Link></li>
            <li><Link href="/projects">Projects</Link></li>
            <li><Link href="/track-record">Track record</Link></li>
            <li><Link href="/services">Capabilities</Link></li>
            <li><Link href="/contact">Contact</Link></li>
            <li>
              <a href={FIRM.linkedIn} target="_blank" rel="noreferrer">
                LinkedIn
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h6>Office</h6>
          <ul>
            <li className="whitespace-pre-line">{FIRM.headquarters.address}</li>
            <li>{FIRM.headquarters.phone}</li>
          </ul>
        </div>
      </div>
      <div className="bottom">
        <span>© {year} {FIRM.legalName} · Since {FIRM.foundedYear}</span>
        <span>Privacy · Terms · Grievance</span>
      </div>
    </footer>
  );
}
