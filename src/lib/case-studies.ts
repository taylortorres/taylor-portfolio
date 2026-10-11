import fs from "node:fs";
import path from "node:path";
import type { StaticImageData } from "next/image";
import type { MDXContent } from "mdx/types";

// Case studies live in content/case-studies/<slug>/index.mdx, each exporting a
// `meta` object. Adding a folder adds a card and a /work/<slug> page; no code
// changes needed. A missing or malformed field fails the build.

const DIR = path.join(process.cwd(), "content", "case-studies");

export type CaseStudy = {
  slug: string;
  title: string;
  eyebrow: string;
  description: string;
  highlights: string[];
  tags: string[];
  thumbnail: StaticImageData;
  video?: string;
  order: number;
  Content: MDXContent;
};

type RawMeta = Record<string, unknown>;

const isString = (v: unknown): v is string => typeof v === "string" && v.trim() !== "";
const isStringArray = (v: unknown): v is string[] => Array.isArray(v) && v.every((s) => typeof s === "string");

function fail(slug: string, message: string): never {
  throw new Error(`content/case-studies/${slug}/index.mdx: ${message}`);
}

function validate(slug: string, meta: RawMeta | undefined) {
  if (!meta || typeof meta !== "object") {
    fail(slug, "missing `export const meta = { ... }` at the top of the file.");
  }
  for (const key of ["title", "eyebrow", "description", "thumbnail"] as const) {
    if (!isString(meta[key])) fail(slug, `meta.${key} is missing or not a non-empty string.`);
  }
  for (const key of ["highlights", "tags"] as const) {
    if (!isStringArray(meta[key])) fail(slug, `meta.${key} is missing or not an array of strings (use [] for none).`);
  }
  if (typeof meta.order !== "number" || !Number.isFinite(meta.order)) {
    fail(slug, "meta.order is missing or not a number.");
  }
  if (meta.video !== undefined && !(isString(meta.video) && meta.video.startsWith("/videos/"))) {
    fail(slug, 'meta.video must be a path like "/videos/<file>.mp4", or left out.');
  }
  const description = meta.description as string;
  for (const phrase of meta.highlights as string[]) {
    if (!description.includes(phrase)) fail(slug, `meta.highlights "${phrase}" does not appear in meta.description.`);
  }
  const thumbnail = meta.thumbnail as string;
  if (!thumbnail.startsWith("./") || !fs.existsSync(path.join(DIR, slug, thumbnail))) {
    fail(slug, `meta.thumbnail "${thumbnail}" must be a "./" path to an image in the case study folder.`);
  }
  if (meta.video && !fs.existsSync(path.join(process.cwd(), "public", meta.video as string))) {
    fail(slug, `meta.video "${meta.video}" was not found in public/.`);
  }
}

async function load(slug: string): Promise<CaseStudy> {
  const mod: { default: MDXContent; meta?: RawMeta } = await import(
    `../../content/case-studies/${slug}/index.mdx`
  );
  validate(slug, mod.meta);
  const meta = mod.meta as RawMeta;
  const file = (meta.thumbnail as string).slice(2);
  const { default: thumbnail }: { default: StaticImageData } = await import(
    `../../content/case-studies/${slug}/${file}`
  );
  return {
    slug,
    title: meta.title as string,
    eyebrow: meta.eyebrow as string,
    description: meta.description as string,
    highlights: meta.highlights as string[],
    tags: meta.tags as string[],
    thumbnail,
    video: meta.video as string | undefined,
    order: meta.order as number,
    Content: mod.default,
  };
}

export async function getCaseStudies(): Promise<CaseStudy[]> {
  const slugs = fs
    .readdirSync(DIR, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name);
  const studies = await Promise.all(slugs.map(load));
  return studies.sort((a, b) => a.order - b.order);
}
