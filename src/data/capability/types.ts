/**
 * Capability pages: the industry and service pages built from the
 * capability decks in Marketing/Capability PPTs/01_Capability_Decks.
 *
 * A page is a hero plus an ordered list of blocks. Each block maps to
 * one component in src/components/capability. Content lives in the
 * sibling files (projects.ts, shared.ts, industries.ts, services.ts);
 * nothing here is specific to one page.
 */

/** A headline figure. `value` is shown exactly as written. */
export type CapStat = { value: string; label: string; note?: string };

/** A titled paragraph. Used for cards, deliverables and timings. */
export type CapItem = {
  title: string;
  text: string;
  meta?: string;
  /** Page that tells this point in full. The card then opens it. */
  href?: string;
};

/** One step of a process. `image` is optional. */
export type CapStep = { label: string; text: string; image?: string };

/** The service columns used on the scope of work slides. */
export type ServiceKey =
  "hvac" | "electrical" | "phe" | "fire" | "bms" | "civil";

export const SERVICE_LABEL: Record<ServiceKey, string> = {
  hvac: "HVAC",
  electrical: "Electrical",
  phe: "PHE",
  fire: "FF",
  bms: "ELV & BMS",
  civil: "Civil",
};

export const SERVICE_LONG_LABEL: Record<ServiceKey, string> = {
  hvac: "HVAC",
  electrical: "Electrical",
  phe: "Plumbing and public health",
  fire: "Firefighting",
  bms: "ELV and BMS",
  civil: "Civil",
};

/** One service column of a project's scope of work. */
export type CapScope = {
  service: ServiceKey;
  /** Share label exactly as on the slide, e.g. "40% illustrative". */
  share: string;
  /** Numeric share for the bar. Omit when the slide gives none. */
  pct?: number;
  text: string;
  /** False when the slide says "No separate package". */
  included?: boolean;
};

export type CapFact = { label: string; value: string; note?: string };

export type CapProject = {
  id: string;
  name: string;
  /** Short name for tabs. */
  short?: string;
  lede?: string;
  /** Case study page on this site, when one exists. */
  href?: string;
  image?: string;
  imageAlt?: string;
  facts: CapFact[];
  scope: string;
  highlights: CapItem[];
  /** Headline figures for the project, where the deck gives them. */
  stats?: CapStat[];
  note?: string;
  split?: CapScope[];
  /** The sentence under the scope split chart. */
  splitNote?: string;
};

/** A slide's worth of structured content: steps, figures and groups. */
export type CapSheet = {
  /** Tab label. */
  label: string;
  /** Small tag beside the label, e.g. "Part 1 of 7" or "Throughout". */
  tag?: string;
  title: string;
  lede?: string;
  image?: string;
  steps?: CapStep[];
  stats?: CapStat[];
  groups?: {
    label: string;
    style?: "cards" | "timings" | "chips" | "list";
    items: CapItem[];
  }[];
  note?: string;
};

export type CapTile = {
  name: string;
  /**
   * Slug of a project in the site's project archive. When set, the
   * photograph, link, city and scope default to the archive record.
   */
  slug?: string;
  place?: string;
  scope?: string;
  tag?: string;
  value?: string;
  image?: string;
  href?: string;
};

/** One stop of the building model: a service, shown in place. */
export type CapChapter = {
  /** Picks the camera view of the model. */
  key: string;
  /** Short name for the chapter index. */
  label: string;
  /** Service family, shown above the title. */
  eyebrow: string;
  title: string;
  text: string;
  /** Callouts pinned to named points of the model. */
  labels?: { anchor: string; text: string }[];
  /** One figure from a project. */
  stat?: CapStat;
  /** Or one scope line from a project, where no single figure tells it. */
  proof?: { project: string; text: string };
  /** Still picture of this view, for readers without the 3D model. */
  image?: string;
};

type BlockBase = {
  /** Anchor id. Also used by the section nav when `nav` is set. */
  id: string;
  /** Section nav label. Omit to leave the block out of the nav. */
  nav?: string;
  eyebrow?: string;
  title?: string;
  lede?: string;
  /** Set by the page, which alternates the two backgrounds. */
  tone?: "plain" | "soft";
  /** Set by the page for a block with no heading: it continues the block above. */
  flush?: boolean;
  note?: string;
};

export type CapBlock =
  | (BlockBase & { kind: "stats"; items: CapStat[] })
  | (BlockBase & {
      kind: "cards";
      items: CapItem[];
      /** Label above the first row, when a second row follows. */
      label?: string;
      columns?: 2 | 3 | 4 | 5;
      numbered?: boolean;
      /** A second, labelled row of cards under the first. */
      more?: { label: string; items: CapItem[] };
    })
  | (BlockBase & {
      kind: "showcase";
      projects: string[];
      /** Preselect this service in the scope of work bar. */
      focus?: ServiceKey;
    })
  | (BlockBase & {
      kind: "process";
      steps: CapStep[];
      /** pinned: scroll driven. auto: plays through, click to jump. rail: all steps visible. */
      variant: "pinned" | "auto" | "rail";
      /** Supporting rows under the steps. */
      aside?: {
        label: string;
        style?: "cards" | "chips" | "rail" | "list";
        items: CapItem[];
      }[];
    })
  | (BlockBase & {
      kind: "sheets";
      sheets: CapSheet[];
      /** side: vertical list beside the panel. top: tabs above it. */
      layout?: "side" | "top";
      stats?: CapStat[];
      /** Two running bands shown under the overview, as on the deck. */
      bands?: CapItem[];
    })
  | (BlockBase & {
      /**
       * Our experience. `projects` are shown as cards that open the
       * project's own page, where its overview and scope of work live.
       * `more` lists further projects as smaller tiles.
       */
      kind: "experience";
      /** Ids from the project library (projects.ts). */
      projects?: string[];
      /** Short points shown before the projects. */
      items?: CapItem[];
      more?: { label: string; items: CapTile[] }[];
      also?: { label: string; items: string[] };
    })
  | (BlockBase & {
      kind: "tiles";
      items: CapTile[];
      columns?: 3 | 4;
      also?: { label: string; items: string[] };
    })
  | (BlockBase & {
      kind: "table";
      columns: string[];
      rows: string[][];
      /** Row index before which a group label is shown. */
      groups?: { before: number; label: string }[];
    })
  | (BlockBase & {
      kind: "gallery";
      items: { src: string; title: string; place: string }[];
    })
  | (BlockBase & {
      kind: "lists";
      stats?: CapStat[];
      groups: { title: string; items: string[] }[];
      columns?: 2 | 3 | 4;
      numbered?: boolean;
    })
  | (BlockBase & {
      kind: "compare";
      aLabel: string;
      bLabel: string;
      rows: { label: string; a: string; b: string }[];
    })
  | (BlockBase & {
      kind: "ledger";
      /** The service whose scope is listed across projects. */
      service: ServiceKey;
      groups: { label: string; projects: string[] }[];
    })
  /** Service pages only: the existing sub discipline accordion. */
  | (BlockBase & {
      /**
       * A 3D model of the facility that stays in view while the reader
       * scrolls. The camera moves through it and one chapter lights up at
       * a time. `title` and `lede` head the opening view.
       */
      kind: "building";
      /** Which model to show. The model defines the views and label points. */
      model:
        | "data-centre"
        | "fab"
        | "factory"
        | "terminal"
        | "campus"
        | "hospital"
        | "mixed-use"
        | "hotel"
        | "residential"
        | "module"
        | "yard"
        | "floor-kits"
        | "smart-building";
      /** The line that invites the reader to scroll, where "building" does not fit. */
      hint?: string;
      /** What the model shows, for picture descriptions: "a data centre". */
      subject?: string;
      /** Still picture of the opening view, for readers without the 3D model. */
      image?: string;
      chapters: CapChapter[];
    })
  | (BlockBase & { kind: "subservices" })
  /** Service pages only: controlled methods from the execution library. */
  | (BlockBase & { kind: "methods" })
  /** Case studies from the project archive for this industry or service. */
  | (BlockBase & { kind: "related" });

export type CapPage = {
  slug: string;
  /** Name used in the section nav. */
  name: string;
  eyebrow: string;
  title: string;
  description: string;
  image?: string;
  stats?: CapStat[];
  blocks: CapBlock[];
};
