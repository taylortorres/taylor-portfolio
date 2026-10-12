import fs from "node:fs";
import path from "node:path";

// Sidebar links come straight from a case study's MDX source: every
// <Section id="..." title="..."> becomes one link, in order. Adding, renaming or
// reordering sections needs no code changes. Bad sections fail the build.
// A file with no sections returns [] (placeholder case studies).

export type SectionLink = { id: string; title: string };

const TAG = /<Section\b([^>]*)>/g;
const ATTR = /(\w+)\s*=\s*(?:"([^"]*)"|'([^']*)'|\{)/g;
const ID = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function getSections(file: string): SectionLink[] {
  const where = path.relative(process.cwd(), file);
  const source = fs.readFileSync(file, "utf8");
  const sections: SectionLink[] = [];

  for (const [tag, attrs] of source.matchAll(TAG)) {
    const values: Record<string, string | null> = {};
    for (const [, name, double, single] of attrs.matchAll(ATTR)) {
      values[name] = double ?? single ?? null; // null: a {expression}, not a string
    }
    const { id, title } = values;
    if (typeof id !== "string" || typeof title !== "string") {
      throw new Error(`${where}: ${tag} needs id="..." and title="..." as plain quoted strings.`);
    }
    if (!ID.test(id)) {
      throw new Error(`${where}: section id "${id}" must be lowercase words joined by hyphens, like "early-explorations".`);
    }
    if (title.trim() === "") throw new Error(`${where}: section "${id}" has an empty title.`);
    if (sections.some((s) => s.id === id)) throw new Error(`${where}: section id "${id}" is used twice.`);
    sections.push({ id, title: title.trim() });
  }

  return sections; // empty for placeholder case studies: they render without the sidebar
}
