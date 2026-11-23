import Link from "next/link";
const LINKS = [
  ["Our story", "/about"],
  ["Leadership", "/leadership"],
  ["How we deliver", "/approach"],
  ["Careers", "/careers"],
];
export function CompanySubnav({ current }: { current: string }) {
  return (
    <nav className="ue-company-subnav" aria-label="About Unique">
      <div className="ue-container">
        {LINKS.map(([label, href]) => (
          <Link
            key={href}
            href={href}
            aria-current={current === href ? "page" : undefined}
          >
            {label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
