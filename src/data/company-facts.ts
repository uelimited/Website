import registerJson from "@/data/cms/company_facts_public.json";

export type VerificationStatus =
  | "verified"
  | "derived"
  | "needs_confirmation"
  | "conflicting"
  | "needs_current_source";

export type FactVisibility = "public" | "confidential" | "internal";

export type CompanyFact = {
  id: string;
  category: string;
  label: string;
  value: string | number | boolean;
  unit: string;
  display: string;
  stat_value: string;
  stat_unit: string;
  period: string;
  as_of: string | null;
  verification_status: VerificationStatus;
  visibility: FactVisibility;
  website_enabled: boolean;
  owner: string;
  source: {
    file: string;
    detail: string;
  };
  notes: string;
};

type CompanyFactsRegister = {
  schema_version: number;
  last_reviewed: string;
  review_guidance: string;
  company: {
    legal_name: string;
    brand_name: string;
    operational_founded_year: number;
    incorporated_year: number;
    website: string;
    linkedin: string;
    contact_email: string;
    office_hours: string;
    headquarters: {
      label: string;
      address_lines: string[];
      phone: string;
    };
  };
  facts: CompanyFact[];
};

export const COMPANY_FACTS = registerJson as CompanyFactsRegister;
export const COMPANY = COMPANY_FACTS.company;

const FACT_BY_ID = new Map(COMPANY_FACTS.facts.map((fact) => [fact.id, fact]));

if (FACT_BY_ID.size !== COMPANY_FACTS.facts.length) {
  throw new Error("Duplicate ids found in company_facts.json");
}

for (const fact of COMPANY_FACTS.facts) {
  if (fact.website_enabled && fact.visibility !== "public") {
    throw new Error(
      `Non-public company fact cannot be website-enabled: ${fact.id}`,
    );
  }
}

export function getCompanyFact(id: string): CompanyFact {
  const fact = FACT_BY_ID.get(id);
  if (!fact) throw new Error(`Unknown company fact: ${id}`);
  return fact;
}

export function getCompanyFactDisplay(id: string): string {
  return getCompanyFact(id).display;
}

export function getCompanyFactStat(
  id: string,
  label?: string,
): { n: string; unit?: string; l: string } {
  const fact = getCompanyFact(id);
  return {
    n: fact.stat_value,
    unit: fact.stat_unit || undefined,
    l: label ?? fact.label,
  };
}

export function getPublicWebsiteFacts(category?: string): CompanyFact[] {
  return COMPANY_FACTS.facts.filter(
    (fact) =>
      fact.visibility === "public" &&
      fact.website_enabled &&
      (!category || fact.category === category),
  );
}
