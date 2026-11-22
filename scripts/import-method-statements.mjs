import { readdir, writeFile } from "node:fs/promises";
import path from "node:path";

const siteRoot = path.resolve(import.meta.dirname, "..");
const sourceRoot = path.resolve(
  siteRoot,
  "../../Capability PPTs/02_Method_Statement_Libraries/Libraries",
);
const outputPath = path.join(siteRoot, "src/data/cms/method_statements.json");

const libraryDefinitions = {
  Civil_Method_Statements: {
    id: "civil",
    name: "Civil & Interior",
    description:
      "Substructure, frames, envelopes, infrastructure, specialist civil works and handover.",
    href: "/services/civil-interior-contractors-in-gurgaon",
  },
  Data_Centre_Method_Statements: {
    id: "data-centre",
    name: "Data Centre",
    description:
      "Mission-critical cooling, power, controls, monitoring and fire-life-safety execution.",
    href: "/sectors/data-centre",
  },
  ELV_BMS_Method_Statements: {
    id: "elv-bms",
    name: "ELV & BMS",
    description:
      "Controls, automation, networks, monitoring, validation and integrated testing.",
    href: "/services/ibms",
  },
  Electrical_Method_Statements: {
    id: "electrical",
    name: "Electrical",
    description:
      "Power distribution, protection, earthing, containment, resilience and commissioning.",
    href: "/services/electrical-contractors-in-gurgaon",
  },
  HVAC_Method_Statements: {
    id: "hvac",
    name: "HVAC",
    description:
      "Hydronic and air systems, cleanrooms, process cooling, validation and occupied-space comfort.",
    href: "/services/hvac-company-in-gurgaon",
  },
  MEP_Cross_Trade_Method_Statements: {
    id: "integrated-mepf",
    name: "Integrated MEPF",
    description:
      "Cross-trade DfMA, modular assembly, seismic restraint and coordinated installation.",
    href: "/services",
  },
  PHE_Method_Statements: {
    id: "public-health",
    name: "Plumbing & Public Health",
    description:
      "Water, drainage, treatment, pumping, specialist utilities and public-health commissioning.",
    href: "/services/plumbing-services-in-gurgaon",
  },
};

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...(await walk(fullPath)));
    else files.push(fullPath);
  }
  return files;
}

function humanise(value) {
  return value
    .replace(/^\d+_/, "")
    .replace(/_/g, " ")
    .replace(/\bAnd\b/g, "&")
    .replace(/\bOr\b/g, "or")
    .replace(/\bOf\b/g, "of")
    .replace(/\bIn\b/g, "in")
    .replace(/\bTo\b/g, "to")
    .trim();
}

function parseFile(filePath, library) {
  const stem = path.basename(filePath, path.extname(filePath));
  const match = stem.match(/^([A-Z]+)_MS_(\d+)_(.+)$/);
  if (!match) return null;
  const [, prefix, number, titleStem] = match;
  const relative = path.relative(sourceRoot, filePath);
  const sectionFolder = relative.split(path.sep).at(-2) ?? "General";
  const code = `${prefix}-MS-${number}`;
  const title = humanise(titleStem);
  return {
    id: `${library.id}-${number}-${titleStem.toLowerCase()}`,
    code,
    title,
    library_id: library.id,
    library_name: library.name,
    section: humanise(sectionFolder),
    href: library.href,
    availability: "Available for technical review on request",
    source_file: relative,
    search_text: `${code} ${title} ${library.name} ${humanise(sectionFolder)}`,
  };
}

const statements = [];
const libraries = [];

for (const [folder, definition] of Object.entries(libraryDefinitions)) {
  const files = (await walk(path.join(sourceRoot, folder))).filter((file) =>
    file.toLowerCase().endsWith(".docx"),
  );
  const records = files
    .map((file) => parseFile(file, definition))
    .filter(Boolean)
    .sort((a, b) => a.code.localeCompare(b.code, undefined, { numeric: true }));
  statements.push(...records);
  libraries.push({ ...definition, count: records.length });
}

await writeFile(
  outputPath,
  `${JSON.stringify(
    {
      meta: {
        source_directory:
          "Marketing/Capability PPTs/02_Method_Statement_Libraries/Libraries",
        generated_at: new Date().toISOString(),
        publication_policy:
          "Website exposes the controlled capability index only. Source method statements remain internal and are shared through an approved technical-review process.",
      },
      libraries,
      statements,
    },
    null,
    2,
  )}\n`,
);

console.log(
  `Imported ${statements.length} method statements across ${libraries.length} libraries.`,
);
