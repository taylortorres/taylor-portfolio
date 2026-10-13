import fs from "node:fs";
import path from "node:path";
import type { StaticImageData } from "next/image";
import type { MDXContent } from "mdx/types";
import { getSections, type SectionLink } from "./sections";

// Case studies live in content/case-studies/<slug>/index.mdx, each exporting a
// `meta` object. Adding a folder adds a card and a /work/<slug> page; no code
// changes needed. A missing or malformed field fails the build.
//
// `meta.cursorLabel` (text in the cursor pill over the card, default "view
// case study") and `meta.externalUrl` (the card and "Next up" open this in a
// new tab instead of /work/<slug>, and no page is built) are optional, as is
// `meta.externalTag` (a visible "Slides ↗" style tag on that card).
//
// `meta.hero` is optional (placeholder case studies don't have one yet); when
// present, every field in it is required except `zoomable` (default true;
// false keeps the hero image out of the zoom viewer, e.g. Props).
//
// `meta.shareImage` is optional: `{ image: "./share.png", alt: "..." }`, a
// 1200 × 630 image in the case study folder used as the page's og:image and
// twitter:image instead of the site default (public/og-image.png).

const DIR = path.join(process.cwd(), "content", "case-studies");
export const DEFAULT_CURSOR_LABEL = "view case study";

export type CaseStudyHero = {
  /** Page title as set in the hero (Title Case in Figma); `meta.title` stays the card title. */
  title: string;
  tags: string[];
  image: StaticImageData;
  imageAlt: string;
  role: string[];
  timeline: string[];
  team: string[];
  skills: string[];
  zoomable: boolean;
};

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
  /** Cursor pill text over the card, e.g. "view slides". */
  cursorLabel: string;
  /** Opens here in a new tab instead of /work/<slug>; no page is built. */
  externalUrl?: string;
  /** Visible tag for an external link, e.g. "Slides" (shown as SLIDES ↗ on the card). */
  externalTag?: string;
  hero?: CaseStudyHero;
  /** The page's own share image (og:image / twitter:image); the site default when absent. */
  shareImage?: { image: StaticImageData; alt: string };
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
  if (meta.cursorLabel !== undefined && !isString(meta.cursorLabel)) {
    fail(slug, 'meta.cursorLabel must be a non-empty string like "view slides", or left out (defaults to "view case study").');
  }
  if (meta.externalUrl !== undefined && !(isString(meta.externalUrl) && /^https:\/\//.test(meta.externalUrl))) {
    fail(slug, 'meta.externalUrl must be a full https:// link, or left out.');
  }
  if (meta.externalTag !== undefined && !(isString(meta.externalTag) && meta.externalUrl !== undefined)) {
    fail(slug, 'meta.externalTag must be a non-empty string like "Slides", and needs meta.externalUrl.');
  }
  if (meta.externalUrl !== undefined && meta.hero !== undefined) {
    fail(slug, "meta.externalUrl and meta.hero can't both be set: an external project has no page.");
  }
  if (meta.hero !== undefined) validateHero(slug, meta.hero);
  if (meta.shareImage !== undefined) validateShareImage(slug, meta.shareImage);
}

function validateShareImage(slug: string, share: unknown) {
  const s = (share && typeof share === "object" ? share : {}) as RawMeta;
  const image = s.image;
  if (!isString(image) || !image.startsWith("./") || !fs.existsSync(path.join(DIR, slug, image)) || !isString(s.alt)) {
    fail(slug, 'meta.shareImage must be { image: "./<file>", alt: "..." } with the image in the case study folder, or left out.');
  }
}

const HERO_LISTS = ["tags", "role", "timeline", "team", "skills"] as const;

function validateHero(slug: string, hero: unknown) {
  if (!hero || typeof hero !== "object") fail(slug, "meta.hero must be an object, or left out.");
  const h = hero as RawMeta;
  for (const key of ["title", "image", "imageAlt"] as const) {
    if (!isString(h[key])) fail(slug, `meta.hero.${key} is missing or not a non-empty string.`);
  }
  for (const key of HERO_LISTS) {
    if (!isStringArray(h[key]) || (h[key] as string[]).length === 0) {
      fail(slug, `meta.hero.${key} must be a non-empty array of strings (one per line or tag).`);
    }
  }
  if (h.zoomable !== undefined && typeof h.zoomable !== "boolean") fail(slug, "meta.hero.zoomable must be true or false, or left out.");
  const image = h.image as string;
  if (!image.startsWith("./") || !fs.existsSync(path.join(DIR, slug, image))) {
    fail(slug, `meta.hero.image "${image}" must be a "./" path to an image in the case study folder.`);
  }
}

async function importImage(slug: string, file: string): Promise<StaticImageData> {
  const { default: image }: { default: StaticImageData } = await import(
    `../../content/case-studies/${slug}/${file.slice(2)}`
  );
  return image;
}

async function load(slug: string): Promise<CaseStudy> {
  const mod: { default: MDXContent; meta?: RawMeta } = await import(
    `../../content/case-studies/${slug}/index.mdx`
  );
  validate(slug, mod.meta);
  const meta = mod.meta as RawMeta;
  const thumbnail = await importImage(slug, meta.thumbnail as string);
  const rawHero = meta.hero as RawMeta | undefined;
  const hero: CaseStudyHero | undefined = rawHero && {
    title: rawHero.title as string,
    tags: rawHero.tags as string[],
    image: await importImage(slug, rawHero.image as string),
    imageAlt: rawHero.imageAlt as string,
    role: rawHero.role as string[],
    timeline: rawHero.timeline as string[],
    team: rawHero.team as string[],
    skills: rawHero.skills as string[],
    zoomable: rawHero.zoomable !== false,
  };
  const rawShare = meta.shareImage as RawMeta | undefined;
  const shareImage = rawShare && {
    image: await importImage(slug, rawShare.image as string),
    alt: rawShare.alt as string,
  };
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
    cursorLabel: (meta.cursorLabel as string | undefined) ?? DEFAULT_CURSOR_LABEL,
    externalUrl: meta.externalUrl as string | undefined,
    externalTag: meta.externalTag as string | undefined,
    hero,
    shareImage,
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

/** Where a card or "Next up" block goes: the external link, or the case study page. */
export function studyHref(study: Pick<CaseStudy, "slug" | "externalUrl">) {
  return study.externalUrl ?? `/work/${study.slug}`;
}

/** Sidebar links for a case study, from its <Section> tags (may be empty). */
export function getCaseStudySections(slug: string): SectionLink[] {
  return getSections(path.join(DIR, slug, "index.mdx"));
}
