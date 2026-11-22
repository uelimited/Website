import { execFileSync } from "node:child_process";
import { mkdir, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";

const siteRoot = path.resolve(import.meta.dirname, "..");
const sourceRoot = path.resolve(
  siteRoot,
  "../uel_projects_photographs_and_videos",
);
const workbookPath = path.join(sourceRoot, "UEL_Project Details.xlsx");
const outputDataPath = path.join(
  siteRoot,
  "src/data/cms/landmark_projects.json",
);
const publicRoot = path.join(siteRoot, "public/project-archive");

const artifactModules = process.env.ARTIFACT_TOOL_MODULES;
if (!artifactModules) {
  throw new Error(
    "Set ARTIFACT_TOOL_MODULES to the bundled workspace node_modules path.",
  );
}

const artifactTool = await import(
  pathToFileURL(
    path.join(artifactModules, "@oai/artifact-tool/dist/artifact_tool.mjs"),
  ).href
);
const { FileBlob, SpreadsheetFile } = artifactTool;

const definitions = [
  {
    row: "INGKA Centre | IKEA",
    slug: "ingka-centre-ikea",
    name: "INGKA Centre | IKEA",
    folders: ["INGKA_Centre_IKEA"],
    sectorIds: ["sec-corporate-retail", "sec-hospitality"],
  },
  {
    row: "Foxconn | Apple",
    slug: "foxconn-bangalore",
    name: "Foxconn | Apple Manufacturing Campus",
    folders: ["FoxconnApple"],
    sectorIds: ["sec-semiconductor", "sec-industrial"],
  },
  {
    row: "JSW EV PROJECT",
    slug: "jsw-ev-manufacturing",
    name: "JSW EV Manufacturing Facility",
    folders: ["JSW_EV_Project"],
    sectorIds: ["sec-industrial"],
  },
  {
    row: "CTRLS Data Centre",
    slug: "ctrls-mahape-mumbai",
    name: "CtrlS Data Centre, Mumbai",
    folders: ["Ctrls-data-centre-mumbai"],
    sectorIds: ["sec-data-centre"],
  },
  {
    row: "Tata Electronics Semiconductor Foundry , Assembly &Testing",
    slug: "tata-electronics-dholera",
    name: "Tata Electronics Semiconductor Programme",
    folders: ["Tata-Electronics-Semiconductor"],
    sectorIds: ["sec-semiconductor", "sec-industrial"],
  },
  {
    row: "World Trade Center Gurugram",
    slug: "world-trade-center-gurugram",
    name: "World Trade Center Gurugram",
    folders: ["World-Trade-Center-Gurugram"],
    sectorIds: ["sec-corporate-retail"],
  },
  {
    row: "Prestige BKC 101",
    slug: "prestige-bkc-101",
    name: "Prestige BKC 101",
    folders: ["Prestige_BKC_101"],
    sectorIds: ["sec-corporate-retail"],
  },
  {
    row: "Common Central Secretariat & Executive Enclave",
    slug: "common-central-secretariat",
    name: "Common Central Secretariat & Executive Enclave",
    folders: [
      "Common-Central-Secretariat-Executive-Enclave-web",
      "Executive-enclave-Delhi-project",
    ],
    sectorIds: ["sec-corporate-retail"],
  },
  {
    row: "Mopa Airport",
    slug: "mopa-international-airport",
    name: "Mopa International Airport",
    folders: ["Mopa-airport"],
    sectorIds: ["sec-airport"],
  },
  {
    row: "Nalanda University",
    slug: "nalanda-university",
    name: "Nalanda University",
    folders: ["Nalanda-University-bihar"],
    sectorIds: ["sec-education"],
  },
  {
    row: "Digital Edge Data Center",
    slug: "digital-edge-bom01",
    name: "Digital Edge Data Center",
    folders: ["Digital_Edge_Data_Center"],
    sectorIds: ["sec-data-centre"],
  },
  {
    row: "M3M Mansion-113",
    slug: "m3m-mansion-113",
    name: "M3M Mansion 113",
    folders: ["M3M Mansion-113"],
    sectorIds: ["sec-residential"],
  },
  {
    row: "Indira Gandhi Hospital",
    slug: "indira-gandhi-hospital",
    name: "Indira Gandhi Hospital",
    folders: ["Indira_Gandhi_Hospital"],
    sectorIds: ["sec-healthcare"],
  },
  {
    row: "Sky Mansion",
    slug: "sky-mansion",
    name: "Sky Mansion",
    folders: ["Sky-Mension"],
    sectorIds: ["sec-residential"],
    valueConflict: true,
  },
  {
    row: "Bharti Airtel Aerocity Mahipalpur",
    slug: "bharti-airtel-aerocity",
    name: "Bharti Airtel Aerocity",
    folders: ["Bharti_Airtel_Aerocity_Mahipalpur"],
    sectorIds: ["sec-corporate-retail"],
  },
  {
    row: "VATIKA ONE ON ONE",
    slug: "vatika-one-on-one",
    name: "Vatika One On One",
    folders: ["Vatika-One-On-One"],
    sectorIds: ["sec-corporate-retail"],
  },
  {
    row: "AIIMS JAMMU",
    slug: "aiims-jammu",
    name: "AIIMS Jammu",
    folders: ["Jammu-aiims"],
    sectorIds: ["sec-healthcare"],
  },
  {
    row: "SCB CUTTACK",
    slug: "scb-medical-college-cuttack",
    name: "SCB Medical College, Cuttack",
    folders: ["SCB-CUTTACK-web"],
    sectorIds: ["sec-healthcare"],
  },
  {
    row: "BITSOM MUMBAI",
    slug: "bitsom-mumbai",
    name: "BITSOM Mumbai",
    folders: ["BITSOM-Mumbai"],
    sectorIds: ["sec-education"],
  },
  {
    row: "ATC TOWER KOLKATA",
    slug: "atc-tower-kolkata",
    name: "ATC Tower Kolkata",
    folders: ["ATC-tower-kolkata"],
    sectorIds: ["sec-airport"],
  },
  {
    row: "AIIMS REWARI",
    slug: "aiims-rewari",
    name: "AIIMS Rewari",
    folders: ["AIIMS Rewari"],
    sectorIds: ["sec-healthcare"],
  },
  {
    row: "AMITY MOHALI",
    slug: "amity-mohali",
    name: "Amity Mohali",
    folders: ["AMITY-MOHALI-web"],
    sectorIds: ["sec-education"],
  },
  {
    row: "STT DATA CENTRE MUMBAI",
    slug: "stt-gdc-mumbai",
    name: "STT Data Centre Mumbai",
    folders: ["STT_GDC_Data-Centre"],
    sectorIds: ["sec-data-centre"],
  },
  {
    row: "SSH WARRANGEL",
    slug: "ssh-warangal",
    name: "Super Speciality Hospital Warangal",
    folders: ["SSH-WARRANGL"],
    sectorIds: ["sec-healthcare"],
  },
  {
    row: "IIT PALAKKAD",
    slug: "iit-palakkad",
    name: "IIT Palakkad",
    folders: ["IIT-Palakkad"],
    sectorIds: ["sec-education"],
  },
  {
    row: "ICON MUMBAI",
    slug: "icon-mumbai",
    name: "ICON Mumbai",
    folders: ["icon_mumbai"],
    sectorIds: ["sec-corporate-retail"],
  },
  {
    row: "IPC GHAZIABAD",
    slug: "ipc-ghaziabad",
    name: "IPC Ghaziabad",
    folders: ["IPC-GHAZIABAD"],
    sectorIds: ["sec-corporate-retail"],
  },
  {
    row: "AMB Selfie Squire",
    slug: "amb-selfie-square",
    name: "AMB Selfie Square",
    folders: ["AMB"],
    sectorIds: ["sec-corporate-retail"],
  },
  {
    row: "KLJ Squire",
    slug: "klj-square",
    name: "KLJ Square",
    folders: ["KLJ_Gurugram"],
    sectorIds: ["sec-corporate-retail"],
  },
  {
    row: "ELAN Miracal",
    slug: "elan-miracle",
    name: "Elan Miracle",
    folders: ["ELAN Gurugram"],
    sectorIds: ["sec-corporate-retail"],
  },
  {
    row: "SEC 92 (SMARR City Centre - 92)",
    slug: "smarr-city-centre-92",
    name: "SMARR City Centre 92",
    folders: ["SMARR-City-Centre-92"],
    sectorIds: ["sec-corporate-retail"],
  },
  {
    row: "AMITY RANCHI (O&M)",
    slug: "amity-ranchi-operations-maintenance",
    name: "Amity Ranchi — Operations & Maintenance",
    folders: ["Amity Ranchi"],
    sectorIds: ["sec-education"],
    serviceIds: ["svc-om"],
  },
  {
    row: "AMITY KOLKATA (O&M)",
    slug: "amity-kolkata-operations-maintenance",
    name: "Amity Kolkata — Operations & Maintenance",
    folders: ["Amity-Kolkata"],
    sectorIds: ["sec-education"],
    serviceIds: ["svc-om"],
  },
  {
    row: "Anant Raj Cloud Data Centre",
    slug: "anant-raj-cloud-data-centre",
    name: "Anant Raj Cloud Data Centre",
    folders: ["Anant Raj"],
    sectorIds: ["sec-data-centre"],
  },
  {
    row: "STPI Incubation Centre",
    slug: "stpi-incubation-centre",
    name: "STPI Incubation Centre",
    folders: ["STPI_Incubation_Centre"],
    sectorIds: ["sec-data-centre"],
  },
  {
    row: "L&T Chennai Airport T3 Phase-II",
    slug: "chennai-airport-t3-phase-2",
    name: "Chennai Airport T3 — Phase II",
    folders: ["L&T-Chennai-Airport-T3-Phase-II"],
    sectorIds: ["sec-airport"],
  },
  {
    row: "DLF Camellias, Gurugram",
    slug: "dlf-camellias-gurugram",
    name: "DLF Camellias, Gurugram",
    folders: ["DLF_Camellias_Gurugram"],
    sectorIds: ["sec-residential"],
  },
  {
    row: "ESIC Medical College & Hospital",
    slug: "esic-medical-college-hospital",
    name: "ESIC Medical College & Hospital",
    folders: ["ESIC-Medical-College-Hospital"],
    sectorIds: ["sec-healthcare"],
  },
  {
    row: "Safdarjung Hospital",
    slug: "safdarjung-hospital",
    name: "Safdarjung Hospital",
    folders: ["Safdarjung-Hospital"],
    sectorIds: ["sec-healthcare"],
  },
  {
    row: "ASI  Greater Noida",
    slug: "asi-greater-noida",
    name: "ASI Greater Noida",
    folders: ["ASI-Greater-Noida"],
    sectorIds: ["sec-corporate-retail"],
    projectTypeFallback: "Institutional",
  },
  {
    row: "Bose Institute",
    slug: "bose-institute-kolkata",
    name: "Bose Institute, Kolkata",
    folders: ["Bose-Institute-Kolkata"],
    sectorIds: ["sec-education"],
  },
  {
    row: "CBI HQ",
    slug: "cbi-headquarters-new-delhi",
    name: "CBI Headquarters, New Delhi",
    folders: ["CBI-hq_new_delhi"],
    sectorIds: ["sec-corporate-retail"],
  },
  {
    row: "High Speed Rail",
    slug: "high-speed-rail-ahmedabad",
    name: "High Speed Rail, Ahmedabad",
    folders: ["High-Speed-Rail-Ahmedabad-Gujarat"],
    sectorIds: ["sec-airport"],
  },
  {
    row: "M3M Golf Estate",
    slug: "m3m-golf-estate",
    name: "M3M Golf Estate",
    folders: ["M3M_Golf_Estate_Gurugram"],
    sectorIds: ["sec-residential"],
  },
  {
    row: "M3M Merlin",
    slug: "m3m-merlin",
    name: "M3M Merlin",
    folders: ["M3M_Merlin_Gurugram"],
    sectorIds: ["sec-residential"],
  },
  {
    row: "Burari Hospital",
    slug: "burari-hospital",
    name: "Burari Hospital",
    folders: ["Burari-Hospital"],
    sectorIds: ["sec-healthcare"],
  },
  {
    row: "Microsoft Noida",
    slug: "microsoft-noida",
    name: "Microsoft Noida",
    folders: ["Microsoft-noida-project"],
    sectorIds: ["sec-corporate-retail"],
  },
  {
    slug: "amity-hyderabad",
    name: "Amity Hyderabad",
    folders: ["Amity Hyderabad"],
    sectorIds: ["sec-education"],
    projectTypeFallback: "Education & Research",
    locationFallback: "Hyderabad, Telangana",
  },
  {
    slug: "bhondsi-factory-solar",
    name: "Bhondsi Factory Solar",
    folders: ["Bhondsi Factory Solar (In House Company Project)"],
    sectorIds: ["sec-industrial"],
    serviceIds: ["svc-solar"],
    projectTypeFallback: "In-house Solar",
    locationFallback: "Bhondsi, Haryana",
    clientFallback: "Unique Engineers Limited",
  },
  {
    slug: "vinta-realty",
    name: "Vinta Realty",
    folders: ["Vinta-realty"],
    sectorIds: [],
    projectTypeFallback: "To be confirmed",
    locationFallback: "To be confirmed",
    clientFallback: "To be confirmed",
  },
];

const imageExtensions = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);
const videoExtensions = new Set([".mp4", ".mov", ".m4v"]);

function clean(value) {
  return typeof value === "string" ? value.trim().replace(/\s+/g, " ") : value;
}

function normalize(value) {
  return String(value ?? "")
    .normalize("NFKD")
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function statusFrom(value) {
  const status = normalize(value);
  if (status === "active") return "active";
  if (status === "completed") return "completed";
  return "planning";
}

function parseValue(value, conflict) {
  if (conflict || value == null || clean(value) === "") {
    return { value_display: "To be confirmed" };
  }
  const numeric = Number(String(value).replace(/[^0-9.]/g, ""));
  if (!Number.isFinite(numeric)) return { value_display: "To be confirmed" };
  return {
    value_cr: numeric,
    value_display: `₹${numeric.toLocaleString("en-IN", { maximumFractionDigits: 2 })} Cr`,
  };
}

function parseLocation(raw, fallback) {
  const value = clean(raw) || fallback || "To be confirmed";
  if (value === "To be confirmed") {
    return { location_city: value, location_country: "India" };
  }
  const parts = value
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean);
  if (normalize(parts.at(-1)) === "india") parts.pop();
  const city = parts.shift() || "To be confirmed";
  const cityStates = {
    noida: "Uttar Pradesh",
    bangalore: "Karnataka",
    mumbai: "Maharashtra",
    gurugram: "Haryana",
    "new delhi": "Delhi",
    "mahipalpur newdelhi": "Delhi",
    "chhatarpur delhi": "Delhi",
    "delhi ncr": "Delhi NCR",
    goa: "Goa",
    jammu: "Jammu & Kashmir",
    cuttack: "Odisha",
    kolkata: "West Bengal",
    "aiims majra rewari": "Haryana",
    warrangel: "Telangana",
    "palakkad kerala": "Kerala",
    "chennai tamil nadu": "Tamil Nadu",
    "manesar haryana": "Haryana",
    ahmedabad: "Gujarat",
    "greater noida": "Uttar Pradesh",
    hyderabad: "Telangana",
    bhondsi: "Haryana",
  };
  let state = parts.join(", ") || cityStates[normalize(city)] || undefined;
  if (normalize(city) === "ranchi") state = "Jharkhand";
  return {
    location_city: city,
    location_state: state,
    location_country: "India",
  };
}

function scopeTags(raw) {
  const value = clean(raw);
  if (!value) return ["Scope to be confirmed"];
  return [
    ...new Set(
      value
        .replace(/\n/g, " · ")
        .split(/\s*[·,.]\s*/)
        .map((item) => item.trim())
        .filter(Boolean),
    ),
  ];
}

function serviceIdsFrom(tags, explicit = []) {
  const joined = normalize(tags.join(" "));
  const services = new Set(explicit);
  if (
    joined.includes("hvac") ||
    joined.includes("ventilation") ||
    joined.includes("vrv") ||
    joined.includes("vrf")
  )
    services.add("svc-hvac");
  if (joined.includes("fire")) services.add("svc-firefighting");
  if (
    joined.includes("plumbing") ||
    joined.includes("phe") ||
    joined.includes("public health") ||
    joined.includes("pipeline") ||
    joined.includes("piping")
  )
    services.add("svc-plumbing");
  if (
    joined.includes("electrical") ||
    joined.includes("lighting") ||
    joined.includes("elv")
  )
    services.add("svc-electrical");
  if (
    joined.includes("bms") ||
    joined.includes("ibms") ||
    joined.includes("epms") ||
    joined.includes("vesda")
  )
    services.add("svc-bms");
  if (joined.includes("solar")) services.add("svc-solar");
  if (joined.includes("civil") || joined.includes("interior"))
    services.add("svc-civil");
  if (joined.includes("o and m") || joined.includes("operations maintenance"))
    services.add("svc-om");
  if (joined.includes("mep")) {
    services.add("svc-hvac");
    services.add("svc-firefighting");
    services.add("svc-plumbing");
    services.add("svc-electrical");
  }
  return [...services];
}

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...(await walk(full)));
    else files.push(full);
  }
  return files;
}

function imageDimensions(files) {
  if (!files.length) return new Map();
  const output = execFileSync(
    "sips",
    ["-g", "pixelWidth", "-g", "pixelHeight", ...files],
    { encoding: "utf8", maxBuffer: 20 * 1024 * 1024 },
  );
  const dimensions = new Map();
  let current;
  for (const line of output.split("\n")) {
    if (line.endsWith(":")) {
      current = line.slice(0, -1);
      dimensions.set(current, {});
    } else if (current && line.includes("pixelWidth:")) {
      dimensions.get(current).width = Number(line.split(":").at(-1).trim());
    } else if (current && line.includes("pixelHeight:")) {
      dimensions.get(current).height = Number(line.split(":").at(-1).trim());
    }
  }
  return dimensions;
}

function chooseImages(files) {
  const dimensions = imageDimensions(files);
  const ranked = files
    .map((file) => {
      const { width = 0, height = 0 } = dimensions.get(file) ?? {};
      const ratio = height ? width / height : 0;
      const normalizedPath = normalize(file);
      const webReady =
        normalizedPath.includes(" web ") ||
        path.extname(file).toLowerCase() === ".webp";
      const score =
        (ratio >= 1.25 ? 1_000_000_000 : 0) +
        (webReady ? 500_000_000 : 0) +
        width * height;
      return { file, width, height, ratio, score };
    })
    .sort((a, b) => b.score - a.score);
  const hero = ranked[0];
  const gallery = ranked.filter((item) => item.file !== hero?.file).slice(0, 5);
  return { hero, gallery };
}

function exportImage(source, destination, width) {
  const targetWidth = Math.max(1, Math.min(width || 1600, 1600));
  execFileSync(
    "sips",
    [
      "-s",
      "format",
      "jpeg",
      "-s",
      "formatOptions",
      "78",
      "--resampleWidth",
      String(targetWidth),
      source,
      "--out",
      destination,
    ],
    { stdio: "ignore" },
  );
}

function exportVideo(source, destination) {
  execFileSync(
    "ffmpeg",
    [
      "-y",
      "-loglevel",
      "error",
      "-i",
      source,
      "-vf",
      "scale=min(1280\\,iw):-2",
      "-c:v",
      "libx264",
      "-preset",
      "medium",
      "-crf",
      "29",
      "-movflags",
      "+faststart",
      "-c:a",
      "aac",
      "-b:a",
      "96k",
      destination,
    ],
    { stdio: "ignore", timeout: 180_000 },
  );
}

async function readWorkbookRows() {
  const workbook = await SpreadsheetFile.importXlsx(
    await FileBlob.load(workbookPath),
  );
  const sheets = await workbook.inspect({ kind: "sheet", include: "id,name" });
  const firstSheet = JSON.parse(sheets.ndjson.split("\n")[0]);
  const worksheet = workbook.resolve(firstSheet.id);
  const values = worksheet.getRange("A1:L48").values;
  const headers = values[0];
  return values
    .slice(1)
    .map((row) =>
      Object.fromEntries(
        headers.map((header, index) => [header, row[index] ?? null]),
      ),
    );
}

const rows = await readWorkbookRows();
const rowsByName = new Map(
  rows.map((row) => [normalize(row["Project Name"]), row]),
);
const projects = [];

for (const [index, definition] of definitions.entries()) {
  const row = definition.row
    ? rowsByName.get(normalize(definition.row))
    : undefined;
  if (definition.row && !row)
    throw new Error(`No workbook row found for ${definition.row}`);

  const mediaFiles = (
    await Promise.all(
      definition.folders.map((folder) => walk(path.join(sourceRoot, folder))),
    )
  ).flat();
  const imageFiles = mediaFiles.filter((file) =>
    imageExtensions.has(path.extname(file).toLowerCase()),
  );
  const videoFiles = mediaFiles
    .filter((file) => videoExtensions.has(path.extname(file).toLowerCase()))
    .sort();
  const { hero, gallery } = chooseImages(imageFiles);
  const assetDirectory = path.join(publicRoot, definition.slug);
  await mkdir(assetDirectory, { recursive: true });

  let heroUrl;
  if (hero) {
    exportImage(hero.file, path.join(assetDirectory, "hero.jpg"), hero.width);
    heroUrl = `/project-archive/${definition.slug}/hero.jpg`;
  }

  const galleryItems = [];
  for (const [galleryIndex, item] of gallery.entries()) {
    const filename = `gallery-${String(galleryIndex + 1).padStart(2, "0")}.jpg`;
    exportImage(item.file, path.join(assetDirectory, filename), item.width);
    galleryItems.push({
      src: `/project-archive/${definition.slug}/${filename}`,
      alt: `${definition.name} project execution photograph ${galleryIndex + 1}`,
    });
  }

  let videoUrl;
  if (videoFiles[0]) {
    const videoDestination = path.join(assetDirectory, "project-video.mp4");
    try {
      exportVideo(videoFiles[0], videoDestination);
      videoUrl = `/project-archive/${definition.slug}/project-video.mp4`;
    } catch (error) {
      console.warn(`Video skipped for ${definition.name}: ${error.message}`);
    }
  }

  const description = clean(row?.Description);
  const sourceStatus = row ? "project_sheet" : "placeholder";
  const tags = scopeTags(row?.Scope);
  const projectType =
    clean(row?.["Project Type"]) ||
    definition.projectTypeFallback ||
    "To be confirmed";
  const client =
    clean(row?.Clients) || definition.clientFallback || "To be confirmed";
  const timeline = clean(row?.Timeline) || "To be confirmed";
  const location = parseLocation(row?.Location, definition.locationFallback);
  const value = parseValue(row?.["Project value"], definition.valueConflict);
  const missingFields = [
    !row?.Clients && !definition.clientFallback && "client",
    !row?.["Project Type"] && !definition.projectTypeFallback && "project type",
    !clean(row?.Location) && !definition.locationFallback && "location",
    !clean(row?.Timeline) && "timeline",
    (!row?.["Project value"] || definition.valueConflict) && "project value",
    !row?.Scope && "scope",
    !description && "project narrative",
  ].filter(Boolean);
  const placeholderNarrative =
    "Detailed project information is being consolidated. The media on this page is drawn from UEL's project archive; outstanding commercial and technical fields are clearly marked for confirmation.";

  projects.push({
    id: `prj-landmark-${definition.slug}`,
    slug: definition.slug,
    name: definition.name,
    client_name_display: client,
    ...location,
    project_type: projectType,
    timeline_text: timeline,
    ...value,
    summary: description || placeholderNarrative,
    narrative: description
      ? description.split(/\n+/).map(clean).filter(Boolean)
      : [placeholderNarrative],
    scope_tags: tags,
    status: statusFrom(row?.Status),
    featured: true,
    landmark_order: index + 1,
    hero_image_url: heroUrl,
    hero_image_alt: `${definition.name} project execution`,
    accent: ["blocks", "fan", "current", "droplets", "pulse", "sun", "graph"][
      index % 7
    ],
    gallery: galleryItems,
    video_url: videoUrl,
    information_status: sourceStatus,
    missing_fields: missingFields,
    source_folders: definition.folders,
    sector_ids: definition.sectorIds,
    service_ids: serviceIdsFrom(tags, definition.serviceIds),
    seo_title: `${definition.name} project | Unique Engineers`,
    seo_description:
      description ||
      `Project archive for ${definition.name}, with details to be confirmed.`,
    published: true,
  });
}

await writeFile(
  outputDataPath,
  `${JSON.stringify(
    {
      meta: {
        source_workbook:
          "../uel_projects_photographs_and_videos/UEL_Project Details.xlsx",
        source_media_directory: "../uel_projects_photographs_and_videos",
        generated_at: new Date().toISOString(),
        note: "Project facts come from the internal project workbook. Missing or disputed fields remain explicit placeholders and are not inferred.",
      },
      projects,
    },
    null,
    2,
  )}\n`,
);

console.log(`Imported ${projects.length} landmark projects.`);
