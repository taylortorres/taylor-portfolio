# Taylor Torres — Portfolio

@AGENTS.md

## Stack
- Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, MDX via `@next/mdx`.
- Read the guide in `node_modules/next/dist/docs/` before using any Next.js API. This version differs from older Next.js.
- **Ask before adding any dependency.** That includes UI kits, animation libraries, markdown/MDX plugins (remark/rehype, frontmatter parsers) and icon packs. Use what's already installed: `next/font`, `next/image`, `@next/mdx`, CSS.

## Project structure
- `src/app/` holds routes, layouts and `globals.css`.
- `src/components/` holds every reusable component, one file per component, named in PascalCase (`ProjectCard.tsx`). Section-level pieces live here too (`Nav`, `Hero`, `ProjectGrid`, `Footer`).
- `src/mdx-components.tsx` holds global MDX element styling. It is required by `@next/mdx`.
- `content/case-studies/` holds the case studies (see below).
- `public/` holds static images and media exported from Figma.

## Design source of truth
- Figma file: https://www.figma.com/design/y4nW8bGpZtiHERzqK2hEBF/Taylor-s-Portfolio-Website
- Desktop home page: node `2606:48270` ("🐼 FINALLL", 1440 × 2671)
- **Desktop must match the Figma desktop frames exactly**: layout, spacing, type and colors. Check against a Figma screenshot before calling a section done.
- Use only the design tokens in `src/app/globals.css`. Don't hard-code hex values or sizes in components. If a value is missing, add a token and tell me.
- Round fractional Figma values to the nearest whole pixel (e.g. 13.5 → 14, 7.2 → 7). Don't snap values to a 4/8 grid. Letter-spacing keeps its exact Figma value.
- Use one monospace font everywhere: Geist Mono. Figma sometimes uses IBM Plex Mono; treat those spots as Geist Mono.

## Design tokens (defined in `globals.css`)
### Colors
| Token | Value | Use |
|---|---|---|
| `paper` | `#ffffff` | page background, nav, tag fill |
| `grid-line` | `#ececec` | hero grid lines |
| `hairline` | `#ebeced` | nav bottom border |
| `ink` | `#291e1e` | hero headline |
| `accent` | `#2e31ba` | "threads" accent |
| `accent-deep` | `#070cb9` | hero subline |
| `heading` | `#32404f` | project titles |
| `muted` | `rgba(50,64,79,0.71)` | nav, eyebrows, descriptions (Figma 0.58, darkened for AA) |
| `tag` | `#6c6ebe` | tag border and text (Figma #7c7fda, darkened for AA) |
| `footer-highlight` | `#dadbff` | footer "SAY HI!!" (Figma #cecfff, lightened for AA on the grain) |
| `footer-text` | `rgba(255,255,255,0.9)` | footer links |
| `chip` / `chip-text` | `#e7e7e7` / `#3d3d3d` | case study HOME and BACK TO TOP chips |
| `section-active` | `#5354b7` | active and hovered sidebar section |
| `section-idle` | `rgba(88,88,88,0.84)` | other sidebar sections (Figma 0.64, darkened for AA) |
| `scrim` | `rgba(0,0,0,0.5)` | zoom viewer backdrop (with a background blur) |

The footer background is an image, not a color.

### Fonts (loaded with `next/font/google` in `src/app/layout.tsx`)
| Token | Family | Use |
|---|---|---|
| `font-display` | Newsreader | hero and footer headlines |
| `font-serif` | Source Serif 4 | project titles |
| `font-sans` | Geist | body and descriptions |
| `font-mono` | Geist Mono | nav, hero subline, eyebrows, tags, footer mono text |

### Type scale (size / line height / letter spacing)
| Token | Values | Use |
|---|---|---|
| `text-hero` | 60 / 70 / −2.4px | hero headline |
| `text-footer-title` | 36 / 41 / −1.44px | footer headline |
| `text-title` | 20 / 26 / −0.34px | project titles |
| `text-subline` | 20 / 23 | hero subline |
| `text-body` | 16 / 19 | descriptions |
| `text-nav` | 15 / 23 | nav links |
| `text-eyebrow` | 13 / 23 | eyebrows (the ✦ is 10px) |
| `text-tag` | 12 / 13 | tags (`text-tag` resolves to the tag *color*; set the size with `text-(length:--text-tag)`) |
| `text-sidebar` | 16 / 24 | case study sidebar sections |
| `text-chip-label` | 14 / 20 | HOME and BACK TO TOP (Geist Mono medium, uppercase) |

### Spacing and layout
| Token | Value | Use |
|---|---|---|
| `nav-h` | 64px | nav height |
| `hero-h` | 445px | hero height (desktop) |
| `content-max` | 1275px | projects grid max width |
| `gutter` | 14px | gap between columns and grid edge padding |
| `stack` | 24px | gap between cards in a column |
| `card-gap` | 9px | gap between image and text |
| `meta-gap` | 4px | gap within the card's text block |
| `tag-gap` | 8px | gap between tags |
| `section-gap` | 95px | gap between projects and footer |
| `grid-cell` | 46px | hero grid square |
| `tag-x` / `tag-y` | 7px / 5px | tag padding |
| `sidebar-w` | 306px | case study sidebar column (from `lg`) |
| `sidebar-pad` | 40px | sidebar padding |
| `sidebar-list-w` | 219px | sidebar section list |
| `section-bar` | 56px | sticky section bar below `lg` |
| `case-content-max` | 720px | case study text column (**provisional** until the content frame is in Figma) |
| `lightbox-pad` / `lightbox-pad-sm` | 40px / 16px | space around zoomed media (below `sm`: 16px) |
| `cursor-halo` | 40px | soft halo behind the cursor dot over links and buttons (`halo-accent` / `halo-paper` utilities) |

Tags have a 6px radius (`rounded-tag`) and a 1px `tag` border. Thumbnails have square corners. Sidebar chips have a 4px radius (`rounded-chip`), sidebar section links 8px (`rounded-section`).

## Responsive
- Desktop (1440) is the primary design. The site must also look intentional on **phones (~390px)** and **tablets**.
- Use Tailwind's default breakpoints only: `sm` 640, `md` 768, `lg` 1024, `xl` 1280, `2xl` 1536.
- Write mobile-first classes, with the desktop layout matching Figma from `lg`/`xl` up.
- Project grid: 1 column below `md`, 2 columns from `md` up.
- Scale the hero headline down on smaller screens and let it wrap naturally.
- Keep a 16px minimum side gutter on phones. There must be no horizontal scroll at any width.
- Footer artwork may crop or shift on small screens, but the text and links must stay readable and tappable.
- Check 390, 768, 1024 and 1440 before calling a section done.

## Rules
- **Accessibility:** use semantic landmarks (`header`, `nav`, `main`, `footer`) and a correct heading order. Every link and button must be keyboard-reachable with a visible focus style. Text must meet WCAG AA contrast. Decorative art gets `alt=""` and `aria-hidden`. Content images get real alt text. Tap targets are at least 44px.
- **Images:** always use `next/image` with explicit `width`/`height` or `fill` + `sizes`. Add `priority` only to above-the-fold images. In MDX, `img` is mapped to `next/image` via `src/mdx-components.tsx`.
- **Motion:** every animation and transition must respect `prefers-reduced-motion`. Use Tailwind `motion-safe:`/`motion-reduce:` or a CSS media query. With reduced motion, show the static final state.
- **Components:** keep them small, typed and server components by default. Add `"use client"` only when a component needs interactivity.

## Case studies (MDX)
- Each case study is a folder: `content/case-studies/<slug>/`, holding `index.mdx` and its images.
- `@next/mdx` doesn't support YAML frontmatter, so put card data in an exported `meta` object at the top of `index.mdx`:
  ```mdx
  export const meta = {
    title: "Making drag intuitive in Duolingo Stories",
    eyebrow: "Duolingo ✦ Shipped 2026",
    description: "Reduced total story quit rate by 2.44% across 1.7M+ daily active users.",
    highlights: ["2.44%", "1.7M+ daily active users"], // phrases bolded in the description
    tags: ["Internship", "AI Prototyping", "Motion Design"],
    thumbnail: "./thumbnail.png",
    video: "/videos/story-beats.mp4", // optional: hover preview in public/videos/
    order: 1,
  }

  ## Overview
  The case study body is written in MDX below the export…
  ```
- The home grid and `/work/[slug]` pages are generated from these folders. **Adding a case study must not require any code changes.**
- Sort by `order`. Any field missing from `meta` should fail the build with a clear error message.
- Wrap each part of the body in `<Section id="kebab-case-id" title="Title">`. The sidebar is generated from these tags (`getSections` in `src/lib/sections.ts`); a missing, duplicate or non-string id/title fails the build.
- Components available in MDX without an import: `Section`, `CaseImage` (`zoomable`, optional `full`), `CaseVideo` (`zoomable`, optional `fullSrc`), `VideoPair` (`left`/`right` clips with posters) and `CursorCaption` (`caption`). Import images from the case study folder and pass them as `src`.

## Workflow
- Work in small steps: one section at a time (Nav → Hero → Projects grid → Footer → case study pages).
- After each section: run `npm run lint` and `npm run build`, compare with Figma at desktop width, and check phone/tablet.
- Show me the section and **commit only after I confirm it looks right**. Use one commit per section with a clear message.
- Don't commit unrelated changes or bundle several sections into one commit.
