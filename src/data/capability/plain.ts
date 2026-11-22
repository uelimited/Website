/**
 * The capability pages are written without dashes or hyphens. Text that
 * comes from older records (project archive, sub service blurbs) is passed
 * through these helpers so it reads the same way. The records themselves
 * are left as they are.
 */

const HYPHEN = /([A-Za-z])-(?=[A-Za-z0-9])/g;

/** A name or a list of tags: a dash or bar becomes a comma. */
export function plain(text: string): string {
  return text
    .replace(/\s*[—–|]\s*/g, ", ")
    .replace(HYPHEN, "$1 ")
    .trim();
}

/**
 * A sentence: a pair of dashes becomes a pair of commas, and a single
 * dash becomes a colon.
 */
export function plainSentence(text: string): string {
  return text
    .replace(/\s+[—–]\s+([^—–]+?)\s+[—–]\s+/g, ", $1, ")
    .replace(/\s+[—–]\s+/g, ": ")
    .replace(HYPHEN, "$1 ")
    .trim();
}
