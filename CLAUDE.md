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
| `section-active` | `#5354b7` | active and hovered sidebar section, current and hovered nav link |
| `section-idle` | `rgba(88,88,88,0.84)` | other sidebar sections (Figma 0.64, darkened for AA) |
| `scrim` | `rgba(0,0,0,0.5)` | zoom viewer backdrop (with a background blur) |
| `case-ink` | `#242424` | case study hero title |
| `impact` / `impact-border` / `impact-label` | `#494ab3` / `rgba(141,148,199,0.3)` / `#c7cbec` | Impact stat callouts (fill, 1px border, label) |
| `next-bg` / `next-text` / `next-ring` / `next-ink` | `#484aa6` / `#d4d6f8` / `rgba(153,144,121,0.32)` / `#4a4cb0` | "Next up" block (fill, small text, 1px ring, READ NEXT text) |
| `figure-bg` / `figure-border` | `#f9f9fa` / `#eaebed` | gray panel behind charts and diagrams |
| `chart-card-border` / `chart-grid` | `#e5e5e5` / `#e6e6e6` | white chart card border, dashed guide lines (at 40% opacity) |
| `chart-up` / `chart-base` | `#dc1a1a` / `#0467d1` | ATSB quit chart: red line, +21% and red notes (Figma notes at 0.8 opacity); baseline (Figma 0.6 opacity). Made solid for AA. "MORE QUITS THAN BASELINE" uses `muted`. |
| `figure-ink` / `figure-arrow` | `#6b7480` / `#98a3ae` | text on the gray panel: TL;DR, BEFORE / AFTER, demo labels, phone captions and notes (Figma #878f98, #98a3ae, #78899b darkened for AA); decorative arrow between panels |
| `choice-bg` / `choice-border` / `choice-ink` | `#e2f7cb` / `#77dd05` / `#43770d` | the chosen option in a design decision: green panel, its label, "✓ ..." and the bar beside the note (Figma ink #64ad14 darkened for AA) |
| `crit-teal` / `crit-teal-text` / `crit-purple` | `#127a8a` / `#eff8f9` / `#7e69b9` | Design Crit takeaway cards, with `grain` (Figma teal #168b9d darkened so its 13px text meets AA) |
| `plan-bg` / `status-bg` / `status-border` / `effort-empty` | `rgba(249,249,250,0.5)` / `rgba(224,227,231,0.25)` / `rgba(224,227,231,0.5)` / `rgba(152,163,174,0.3)` | The Plan panel, "Next, if needed" / "Later" pills, unfilled effort bar (filled bars and text use `choice-ink` / `figure-ink` for AA) |
| `wide-demo-bg` | `#e1e7e9` | building hub demo panel: the recording's own background, so there's no seam |
| `photo-shadow` | `rgba(147,147,147,0.25)` | under the intern photos (`shadow-photo`: 0 4px 8px) |
| `pick-border` | `rgba(157,169,182,0.2)` | "ENG'S PICK" pill outline |
| `callout` | `#2e8550` | "How might we" block (Figma #3b9d5c darkened so the 14px label meets AA) |
| `principle` | `#5758b9` | Treeats CLARITY / ENGAGEMENT / INCENTIVE cards (white text ≈6:1) |
| `choice-note` / `fail-ink` | `#5f6873` / `#c33e35` | Treeats Design Evolution: gray caption on the green AFTER panel (Figma #7e8286 darkened for AA, 4.95:1), "Failed" under the BEFORE screen (Figma value, 4.9:1) |
| `link` | `#5658ac` | inline links in case study text (`ExternalLink`; Figma value, 6.2:1) |
| `nda-bg` / `nda-border` / `nda-ink` | `rgba(97,105,122,0.04)` / `rgba(97,105,122,0.1)` / `#61697a` | Props "under NDA" box: fill, border, text (5.2:1) |
| `caution-ink` | `#946800` | Treeats "COULD BE IMPROVED" (Figma #e9ab10 darkened for AA, 4.95:1); "WORKS GREAT!" uses `choice-ink` |

The purple case study blocks (`impact`, `next-bg`) also get Figma's noise via the `grain` utility (`public/case-study/grain.svg`).

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
| `text-case-title` / `text-case-title-sm` | 40 / 44, 30 / 34 below `md` | case study hero title (Source Serif 4) |
| `text-detail` | 15 / 23 | hero ROLE / TIMELINE / TEAM / SKILLS labels and values, IMPACT label |
| `text-stat` | 30 / 31 | Impact numbers (Source Serif 4) |
| `text-stat-label` | 13 / 20 / 0.52px | Impact labels (Geist Mono medium, uppercase) |
| `text-next-label` | 14 / 21 / 0.84px | "NEXT UP" |
| `text-next-title` | 26 / 29 | next case study title |
| `text-next-desc` | 14 / 19 | next case study description |
| `text-next-button` | 13 / 13 / 0.65px | "READ NEXT →" |
| `text-section-title` / `text-section-title-sm` | 32 / 38 / −0.64px, 26 / 31 / −0.52px below `md` | section headline (Source Serif 4) |
| `text-case-body` | 16 / 23 | section body copy (Geist; bold is semibold) |
| `text-chart-label` / `text-chart-note` | 11 / 12, 14 / 16 / −0.64px | chart axis, legend and title (Geist Mono); chart annotations (Geist semibold) |
| `text-panel-label` / `text-panel-note` | 11 / 15, 11 / 14 | BEFORE / AFTER, demo labels and phone captions (Geist Mono); sentence under a demo phone (Geist) |
| `text-pair-title` | 20 / 28 / −0.64px | title beside a pair of phones (Source Serif 4) |
| `text-crit-card-title` / `text-crit-card` | 22 / 31, 13 / 20 | Design Crit card title (Source Serif 4) and text (Geist medium; Figma Inter) |
| `text-insight-label` / `text-insight` | 16 / 15, 21 / 32 / −0.424px | KEY INSIGHT (Geist Mono semibold) and its quote (Source Serif 4) |
| `text-decision-eyebrow` / `text-decision-question` | 12 / 15, 24 / 24 / −0.64px | SHUFFLE DEMO over a decision, its question (Source Serif 4) |
| `text-choice-label` / `text-verdict` / `text-verdict-note` | 12 / 15, 14 / 15, 15 / 23 | label on a video panel, "✓ ALTOGETHER", its reason (Geist medium) |
| `text-option-title` / `text-option-pick` / `text-option-desc` / `text-scale-label` | 15 / 23, 12 / 13, 14 / 21 (Figma 12 / 18, enlarged for reading), 14 / 15 | Converging option title, pick pill, description, LEAST / MOST MOTION |
| `text-phase-title` / `text-phase` / `text-effort` / `text-phase-step` | 14 / 20, 13 / 20, 14 / 20, 12 / 12 | The Plan: phase title (Geist Mono semibold), description and status pill (Geist), EFFORT (Geist Mono), step number |
| `text-lesson-title` / `text-lesson` | 24 / 32 / −0.424px, 15 / 23 | "What I learned" titles (Source Serif 4) and text |
| `text-nda-title` | 25 / 38 / −0.64px | "This case study is under NDA" (Source Serif 4 semibold) |
| `text-callout-label` / `text-callout-question` | 14 / 18, 24 / 26 | "HOW MIGHT WE..." (Geist Mono), its question (Source Serif 4, italic for emphasis) |
| `text-compare-item` | 14 / 23 | Treeats BEFORE / AFTER bullet points |
| `text-principle-title` / `text-principle-body` | 20 / 24, 18 / 22 | principle card title (Geist Mono medium) and text (Geist medium; Figma Figtree). Not `text-principle`: that name resolves to the `principle` color |
| `text-feature-title` / `text-feature` | 25 / 28 / −0.64px, 17 / 22 | Treeats feature title beside a phone (Source Serif 4) and its description |

Source Serif 4 is loaded with its `opsz` axis, so optical size follows the font size (closest match to Figma's Source Serif Pro).

### Spacing and layout
| Token | Value | Use |
|---|---|---|
| `nav-h` | 64px | nav height (from sm; two rows, 108px, on phones). The `--nav-offset` CSS variable (not a token) is how much of the sticky nav covers the screen, border included: 65px from sm, 109px on phones, 0 while the phone nav is hidden |
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
| `case-content-max` | 768px | case study column |
| `case-content-x` | 180px | sidebar to column from `xl` (column at x=486 at 1440); centered beside the sidebar below `xl` |
| `case-top` | 42px | nav to the hero tags, from `lg` (aligned with the sidebar HOME chip; Figma has 64 for ATSB, 40 for Treeats) |
| `case-gap` | 64px | between hero, Impact and sections |
| `case-title-gap` / `case-media-gap` | 14px / 36px | tags to title, title to hero image |
| `details-top` / `details-gap` / `detail-label-gap` | 55px / 48px / 8px | hero details row: top, column gap, label to values |
| `impact-label-gap` | 21px | IMPACT label to the callouts |
| `next-top` / `case-bottom` | 91px / 162px | last section to "Next up", "Next up" to the footer (shared by every case study; Treeats' Figma has about 70, kept at 91 so they match) |
| `case-label-gap` / `case-headline-gap` | 20px / 22px | section label (OVERVIEW) to headline, headline to body |
| `case-para` / `case-block` | 23px / 45px | between paragraphs, text to a figure (two figures in a row: `case-gap`) |
| `figure-label-gap` | 13px | figure label (STORIES FLOW) to its media |
| `chart-card-max` | 687px | white chart card inside the gray panel |
| `compare-h` / `compare-screen` / `compare-inset` | 250px / 206px / 64px | BEFORE / AFTER panel height, its screen width, least space beside the screen in narrow panels |
| `pair-panel` / `pair-title` | 442px / 289px | gray panel with two phones, the title beside it (from `xl`) |
| `crit-board` / `crit-cards` / `crit-gap` / `crit-card-gap` | 420px / 299px / 49px / 25px | Design Crit board (420 × 422), cards beside it, gap between them, gap between cards (also KEY INSIGHT to the line after it) |
| `insight-gap` | 11px | KEY INSIGHT label to its quote |
| `decision-gap` / `decision-head` / `verdict-gap` | 105px / 18px / 28px | between design decisions, question to its panels, panels to the verdict |
| `choice-h` / `choice-phone` / `choice-pair-gap` / `choice-trio-gap` | 438px / 165px / 40px / 18px | decision video panel, the phone in it, gaps for two and three panels |
| `option-gap` | 35px | between the three Converging options |
| `plan-h` / `plan-x` / `plan-step` / `effort-bar` / `effort-bar-h` | 237px / 36px / 25px / 32px / 13px | The Plan panel (from md), its left padding inside the border, step circle, effort bar |
| `lessons-gap` / `photos-top` / `photo-gap` | 24px / 50px / 18px | between lessons, lessons to the photos, between photos |
| `dark-demo-h` / `dark-demo-phone` / `wide-demo-h` | 446px / 183px / 451px | dark mode demo panel and its phone, building hub demo |
| `demo-phone` / `demo-note` | 161px / 220px | phone frame in a motion demo, max width of its note |
| `lightbox-pad` / `lightbox-pad-sm` | 40px / 16px | space around zoomed media (below `sm`: 16px) |
| `post-panel-h` / `post-w` / `sigh-x` / `sigh-y` | 191px / 339px / 103px / 46px | Treeats Challenge: gray panel behind the Fizz post, the post's width, the "sigh" doodle's offset left of and below the post's top |
| `solution-gap` / `solution-head` | 39px / 16px | Treeats Solution: between the BEFORE and AFTER columns, panels to their labels |
| `principles-gap` / `principle-gap` / `principle-h` | 39px / 17px / 245px | intro line to the principle cards, between cards, least card height (from md) |
| `feature-phone` / `feature-widget` / `feature-text` | 255px / 267px / 324px | feature recording width, home screen widget width, feature text column |
| `case-tight` | 30px | Treeats Research: text right after the Fizz collage and after the site rows |
| `site-gap` / `site-head` / `site-rows` / `site-notes` | 32px / 12px / 37px / 28px | Treeats site rows: panel to notes, title to panel, between rows, WORKS GREAT! group to COULD BE IMPROVED group |
| `body-label-top` / `body-label-gap` | 32px / 12px | paragraph to a `BodyLabel`, the label to its list |
| `direction-top` | 10px | extra space above the Design Direction cards (padding, since a margin would collapse into the body's 22px) |
| `panel-pair-gap` / `panel-caption-gap` | 37px / 15px | Treeats Ideation: between two `FramedPanels`, framed image to its caption |
| `headline-sm-gap` | 32px | small `SectionPart` headline to its body |
| `takeaways-top` / `takeaways-gap` / `takeaway-h` / `takeaway-icon` | 20px / 15px / 290px / 37px | concept validation cards: intro to cards, between cards, least height (from md), icon row |
| `step-head` / `step-notes` | 15px / 20px | Design Evolution step title to panels, panels to FEEDBACK / ✓ CHANGE (steps are 45px apart) |
| `preview-img` / `preview-text` | 460px / 273px | Props preview row: blurred panel (60% of the column, at most 460) and text column (at most 273) |
| `nda-x` / `nda-y` / `nda-text` | 64px / 80px / 614px | "under NDA" box padding (from md) and paragraph width |
| `video-panel-y` / `video-w` / `play` | 27px / 85.5% / 68px | Treeats Reflections video panel: top and bottom padding, the video's width in it (from md), play button |
| `video-top` / `video-bottom` | 29px / 41px | paragraph to the video panel, panel to the next paragraph |
| `feature-gap` / `feature-pad` / `feature-first` / `feature-widget-top` / `feature-widget-bottom` / `feature-text-gap` | 84px / 60px / 40px / 100px / 120px / 20px | phone to text (from xl), row padding and gap between rows, first row's top and bottom padding, widget row's padding, title to description |
| `cursor-halo` | 40px | soft halo behind the cursor dot over links and buttons (`halo-accent` / `halo-paper` utilities) |

Tags have a 6px radius (`rounded-tag`) and a 1px `tag` border. Thumbnails have square corners. Sidebar chips have a 4px radius (`rounded-chip`), sidebar section links 8px (`rounded-section`). Case study hero media and the "Next up" block have 16px (`rounded-media`), Impact callouts and figure panels 8px (`rounded-stat`), chart cards 10px (`rounded-chart`), the "How might we" block 12px (`rounded-callout`), demo phone frames 18px (`rounded-phone`), intern photos 12px (`rounded-photo`), effort bars 4px (`rounded-effort`), decision recordings 12px (`rounded-screen`), Converging option frames 6px (`rounded-option-frame`) the tap nudge clip 13px (`rounded-option-video`) Treeats feature phones 15px (`rounded-feature`) and Treeats Fizz posts and site screenshots 6px (`rounded-screenshot`). Shadows: `shadow-post` (Fizz post, four layers), `shadow-feature` (feature phones, 0 5px 40px at 25%) `shadow-site` (site screenshots, 0 2px 9px at 8%) and `shadow-card` (unframed Design Evolution cards, 0 4px 12px gray at 12%).

## Responsive
- Desktop (1440) is the primary design. The site must also look intentional on **phones (~390px)** and **tablets**.
- Use Tailwind's default breakpoints only: `sm` 640, `md` 768, `lg` 1024, `xl` 1280, `2xl` 1536.
- Write mobile-first classes, with the desktop layout matching Figma from `lg`/`xl` up.
- Project grid: 1 column below `md`, 2 columns from `md` up.
- Scale the hero headline down on smaller screens and let it wrap naturally.
- Keep a 16px minimum side gutter on phones. There must be no horizontal scroll at any width.
- Footer artwork may crop or shift on small screens, but the text and links must stay readable and tappable.
- Check 390, 768, 1024 and 1440 before calling a section done. Headless Chrome won't render a window narrower than about 500px (the page looks clipped on the right), so check 390 by loading the page in a 390px-wide iframe.

## Rules
- **Accessibility:** use semantic landmarks (`header`, `nav`, `main`, `footer`) and a correct heading order. Every link and button must be keyboard-reachable with a visible focus style. Text must meet WCAG AA contrast. Decorative art gets `alt=""` and `aria-hidden`. Content images get real alt text. Tap targets are at least 44px.
- **Images:** always use `next/image` with explicit `width`/`height` or `fill` + `sizes`. Add `priority` only to above-the-fold images. In MDX, `img` is mapped to `next/image` via `src/mdx-components.tsx`.
- **Motion:** every animation and transition must respect `prefers-reduced-motion`. Use Tailwind `motion-safe:`/`motion-reduce:` or a CSS media query. With reduced motion, show the static final state.
- **Sticky nav:** `<Nav>` is rendered once in the root layout inside `SiteHeader` (sticky, z-40, solid paper with the 1px hairline), outside the page template, so it mounts once per full page load and stays put on in-site navigation. Pages don't render `<Nav>` themselves. On a full load it slides down 20px and fades in over 400ms (`animate-nav-enter`), and the signature starts drawing as it lands (`NAV_IN` in `Signature.tsx`); in-site navigation never replays either. Below sm the nav hides while scrolling down and comes back on any scroll up, near the top, on a page change, or when focus enters it; bigger single jumps (a #hash on load) don't toggle it. Anything positioned under the nav uses `--nav-offset`: the case study sidebar (sticky under it, height `100dvh - offset`), the phone section bar, the phone section menu's height, and section / `#work` scroll margins. Before a scripted jump to a target below, call `hideNavForJump(target)` (`src/lib/nav.ts`) so the phone nav hides first and the jump lands right under the section bar; in-page anchor clicks do this automatically. The zoom viewer and custom cursor are in the top layer, above the nav.
- **Nav links:** `NavLinks.tsx` (client) marks the current page in `section-active` purple (6.3:1 on white) with `aria-current`: WORK is "page" on the home page and "true" on every /work/ page, FUN and ABOUT (when shown) on their own pages, RESUME never (it opens the résumé, `RESUME_URL` in `src/lib/links.ts`, in a new tab with rel="noopener noreferrer" and an "(opens in a new tab)" label). FUN and ABOUT are hidden until their pages exist (`hidden: true` in the `links` list in `NavLinks.tsx`; delete the flag to restore one, no other code changes). Nothing else links to /fun or /about, and the sitemap leaves them out. It reads `usePathname`, so the server HTML is already right (no flash) and it follows client navigation and Back. Hovering a nav link (mouse only) softens the logo and the other links (blur and opacity) while the hovered link turns purple; the current page's link turns gray meanwhile, so only one link reads as highlighted. Keyboard focus does the same, lighter, plus the focus ring; reduced motion drops the blur and transition (opacity only); touch shows only the active state. From sm each link's hit area reaches the middle of the 32px gap, so moving between links never flickers. Items opt in with `data-nav-item` / `data-nav-link` inside `[data-nav]`; the values are the `--nav-soft-*` variables in `globals.css`. Only text and the logo soften, never the bar, and the signature's draw never restarts.
- **Home intro:** on the first load of the home page in a session, an inline script (`INTRO_SCRIPT` in `src/lib/intro.ts`, first thing in `<body>`) sets `html.intro` and `html.intro-wait` before the first paint. `intro-wait` holds every animated element paused and hidden until the headline fonts and hero images are ready (600ms at most); then, after a 150ms hold, three beats play: the two headline lines, the nav (`intro-nav`, the signature starting as it lands via `--nav-delay` / `--nav-in`) with the subline, then the project cards row by row (`--intro-i`). Cards below the fold wait (`data-intro-wait`) and play once when scrolled to (`IntroCards.tsx`). Elements opt in with `data-intro="line-1" | "line-2" | "sub" | "card"`. Opacity, transform and filter only; 8px blur on phones, 14px from sm. The intro replaces the template's page blur-in (`[data-page]`); leaving the home page ends intro mode, so returning uses the normal transition. Without JavaScript nothing is added; reduced motion skips it. Every timing value is a named `--intro-*` variable in one block of `globals.css`. Dev only: `/?intro=1` replays it on that load (production builds don't contain the check).
- **Smooth scrolling:** in-page anchors and sidebar jumps scroll smoothly (`motion-safe:scroll-smooth` on `<html>`; instant with reduced motion). `data-scroll-behavior="smooth"` lets Next jump instantly to the top on page changes. No smooth-scroll library (Lenis): it would need hooks into the zoom viewer's scroll lock, scroll-driven videos, scroll-spy and the hiding nav, and can feel wrong on trackpads and phones.
- **Not-found page:** `src/app/not-found.tsx` is the site's own 404 (unknown URLs and `notFound()`, e.g. DuoRooms' /work/duorooms): nav, a short message, a BACK HOME chip and the footer, titled "Page not found · Taylor Torres". Don't remove it: Next's built-in 404 adds an inline `<style>` that turns `body` black in dark mode, and that style stays in the document after a client-side navigation away, so the next page (e.g. home) renders on black until a reload.
- **Components:** keep them small, typed and server components by default. Add `"use client"` only when a component needs interactivity.

## Site URL and metadata
- The public address is `SITE_URL` (`https://taylortorres.me`) in `src/lib/site.ts`; never hardcode a domain (no `.vercel.app`). The root layout sets `metadataBase` from it, so relative metadata URLs become absolute.
- Every page sets its own canonical link and Open Graph / Twitter tags with `pageMetadata({ path, title, description, type })` from `src/lib/site.ts` (Next replaces `openGraph` wholesale per page). The home page is `website`, case studies `article`. Titles: "Taylor Torres" on the home page, "<case study title> · Taylor Torres" on case studies. The home page description is `SITE_DESCRIPTION`, case studies use `meta.description`.
- Share image: `public/og-image.png` (1200 × 630 PNG, about 150 KB, scaled from the 6000 × 3150 `design-assets/og-image.png`) is the og:image and twitter:image (`summary_large_image`) on every page, with alt text (`DEFAULT_SHARE_IMAGE` in `src/lib/site.ts`; the root layout uses it too, so not-found pages have it). A case study can use its own with optional `meta.shareImage: { image: "./share.png", alt: "..." }` (1200 × 630, in its folder).
- `src/app/sitemap.ts` lists the home page, `/about` and every case study page (not link-out projects or `/dev`); `src/app/robots.ts` disallows `/dev/` and points to the sitemap. New case studies appear in the sitemap automatically.

## About page
- `/about` (Figma 2748:5479): one column, no sidebar. Copy, captions, photos and experience rows live in `content/about/index.ts` (typed; edit there, not in the components). Photos are Figma's own fills (no raw originals; kept as `design-assets/about/*-figma-export.png`), cropped to Figma's frames and saved at about 3x their CSS width as JPEG in `content/about/`. Company logos are in `public/about/` (each SVG merges Figma's two layers: the 1px outline and the mark). Nothing on the page is zoomable.
- Components: `AboutPortrait`, `AboutSnapshots`, `AboutBigOn`, `AboutExperience`, `AboutHeading`, `Polaroid` (the off-white frame, border and shadow in CSS around a bare photo). Section headings start with a decorative kaomoji (`aria-hidden`); the intro lede is the page's `h1`.
- Every timing is in `src/lib/about-motion.ts`; the page sets them as CSS variables on `<main>` and the interaction CSS sits in one "About page interactions" block at the end of `globals.css`. Reduced motion turns every transition off and shows final states.
- Portrait: tilted −3.14°; hover or keyboard focus straightens it and scales 1.05 (Figma's straight frame, 2824:12270) while the pink character (`content/about/pink-character.png`, 336px wide, its 21.44° tilt baked in; raw file `design-assets/about/pink-character.png`) rises from 10px behind the top edge to 85px above it, centered 78.4% across (the `--character-*` values in `globals.css`). Touch screens play it once at 60% in view and stay straight.
- Snapshots: the overlapping, tilted layout (Figma's positions, in `AboutSnapshots`) only with a mouse from xl (the `stage` variant). The hovered or focused photo straightens, scales 1.1, comes to the front and types its caption (grapheme by grapheme, so emoji stay whole; the typed copy is `aria-hidden`, the full caption is a screen-reader-only figcaption). Elsewhere they sit straight in a grid (1 / 2 from sm / 4 from lg) with captions showing.
- "Big on": from lg, the four photos start as Figma's pile (Paris on top) while the row is still below the screen, then fan out once at 50% in view and each text blurs in after its photo lands; cursor captions (lowercase, `CursorCaption keepCase`) work only after that. Below lg (2 columns from sm, 1 below) and with reduced motion it's always the final layout.
- Experience: logo, company, role 242px from the row start, dates right-aligned (from md); stacked below md. Roles and dates use `about-faint` (Figma 0.5 darkened for AA).

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
- Optional card fields: `cursorLabel` (text in the cursor pill over the card, default "view case study"; e.g. "view overview", "view slides") and `externalUrl` (a full https:// link). With `externalUrl`, the card and any "Next up" block pointing to it open that link in a new tab (`rel="noopener noreferrer"`, an aria-label ending "(opens in a new tab)", and a ↗ in the cursor pill), and no /work/<slug> page is built (it shows the not-found page). It can't be combined with `hero`. `externalTag` (needs `externalUrl`) adds a visible tag in the card's tag style, e.g. "Slides" → SLIDES ↗, so the link-out shows on touch screens and for keyboard users too. Current values: ATSB and Treeats "view case study", Props "view overview", DuoRooms "view slides" plus its Figma deck and `externalTag: "Slides"`.
- A full case study adds `meta.hero` (all fields required when present): `title` (Title Case, shown in the hero; `meta.title` stays the card title), `tags`, `image` (`"./..."`), `imageAlt`, and `role`, `timeline`, `team`, `skills` as arrays of lines. Optional `zoomable: false` keeps the hero image out of the zoom viewer (Props). Without `hero` and sections the page renders as a plain placeholder. A self-closing `<Section id="..." title="..." />` is a placeholder section: the sidebar lists it and the page shows only its label until its batch fills it in (Treeats was built this way, batch 0 through Reflections, and is now complete). Add `labelHidden` to keep a section's label for screen readers and the sidebar jump without showing it (Props' Reach Out!, whose Figma has no label). Add `top` to make it a sidebar-only entry that renders nothing (Treeats `<Section id="overview" title="Overview" top />`, since its Figma has no OVERVIEW label): the sidebar still lists it first, and when the first section has no element on the page, clicking it scrolls to the top (instantly with reduced motion), focuses the hero `h1` and clears the hash.
- `/work/[slug]` renders the hero from `meta.hero`, then the MDX body (`<Impact stats={[{ value, label }]} />` first, then the sections), then the shared "Next up" block, which links to the next case study by `order` and wraps from the last to the first. Its button reads READ NEXT → for a case study page, or the next project's `cursorLabel` with ↗ when that project links out.
- Wrap each part of the body in `<Section id="kebab-case-id" title="Title" headline="Big serif line">` (headline optional, `*word*` for italic). Add `label="🚀 Shipped"` when the page should show Figma's label instead of the sidebar title; screen readers get the title. The title renders as the mono label (OVERVIEW); a Markdown `###` inside is a sub-headline in the same serif style, 22px above its text; write the body as Markdown inside, with blank lines after the opening tag and before the closing one. The sidebar is generated from these tags (`getSections` in `src/lib/sections.ts`); a missing, duplicate or non-string id/title fails the build.
- Components available in MDX without an import: `Section`, `Impact`, `CaseImage` (`zoomable`, optional `full`), `CaseVideo` (`zoomable`, optional `fullSrc`), `SyncedVideos` (`clips`: two or more videos with posters that play in sync), `CursorCaption` (`caption`), `Figure` (`label` above the media), `Callout` (`label`; children are the question, `*word*` for italic), `BeforeAfter` (`before` / `after` screens, zoomable), `PhonePair` (`title` plus `left` / `right` zoomable phone stills with captions), `MotionDemos` (`demos`: label, note and a looping video in a phone frame each), `CritBoard` (board with a zoomable phone, stickies placed in % of the board, and takeaway `cards`), `Insight` (`label` plus a serif quote; `*word*` italic, `***words***` semibold italic), `Decision` (`eyebrow`, `question`, two or three synced zoomable video `options` with one `chosen`, and a `verdict`), `MotionOptions` (three options on a least-to-most-motion scale, each a still or a cropped clip) and `PhasePlan` (`phases`: title, description, effort out of 3, status, `done`), `DemoVideo` (`variant` "phone" or "wide", labeled looping zoomable video), `SectionPart` (a second label, headline and body inside one sidebar section; `size="sm"` for a 24px headline 32px above its body), `Lessons` (three titled paragraphs; `variant="direction"` for two columns with 21px titles, Treeats Design Direction), `CaptionedPhotos` (photos with lowercase-capable cursor captions, not zoomable), `QuitRateChart` (ATSB only), `PostPanel` (`src`, `alt`, optional `sigh` doodle from `sm`: a social post centered on a gray panel, zoomable), `SolutionCompare` (Treeats only: BEFORE panel with two tilted screenshots, AFTER panel with one, the shared `CompareArrow` between them from `md`, then a label, title and bullet `points` under each; screens take an optional upright `full` for the zoom viewer), `PrincipleCards` (`intro` plus purple `cards` with a decorative icon, title and text; `variant="takeaways"` for the taller concept validation cards), `PostCollage` (`posts`: screenshots placed by center `x` / `y` and width `w` in % of a 768 × 472 gray panel, tilted by `rotate`, each zoomable and opening upright; later posts on top), `SiteReviews` (`sites`: a serif title over a framed, zoomable screenshot on a gray panel, beside WORKS GREAT! / COULD BE IMPROVED bullet lists; screenshots are sized to fit 89.7% × 92.8% of the panel), `BodyLabel` (a mono label inside a section body, `**bold**` semibold, e.g. over a list), `FramedPanels` (`panels`: one or two gray panels with Figma's `aspect`, a framed zoomable image `w`% wide and an optional mono `caption`), `PreviewRows` (`rows`: a blurred panel image beside a title and line; Props), `NdaNote` (`email`: the "under NDA" box with a mailto link; Props), `YouTubeEmbed` (`id`, `title`, local `poster`, optional `caption`: a click-to-load YouTube player in a gray panel, see below), `ExternalLink` (`href`: an inline purple semibold link that opens in a new tab with "(opens in a new tab)" for screen readers), `EvolutionStep` (`n`, `title`, `before` / `after` screens with `w`, optional `y`, `frame` and `caption`, and `feedback` / `change` as a line or a list: a gray BEFORE panel and green AFTER panel with the arrow, notes below; 45px between steps) and `FeatureRows` (`features`: title, text and a phone recording, phone still or `widget` image, in rows alternating text-left and phone-left; stacked text-first on phones).
- A callout right after a paragraph sits `case-gap` (64px) below it (Treeats Figma); after a figure it keeps the usual spacing.
- Markdown lists in a section body are bulleted (16 / 23, 25px indent); `Lessons` lists are excluded. Treeats Research and Digging Deeper spacing follows their Figma through narrow rules in `SECTION_BODY`: text 30px after a `[data-tight]` block (`PostCollage`, `SiteReviews`), `SiteReviews` 64px after text, a `BodyLabel` 32px after text with its list 12px below, and 45px from a list to a `Callout` and from a `Callout` to an `Insight`.
- Screenshots exported with Figma's border and shadow baked in (Treeats `r&d bigger.png`, `stanfood bigger.png`) are cropped just inside the border (about 5px at export scale) with the corners recut, and the border, corners and shadow are added in CSS, so the zoom viewer shows the bare screenshot. Framed images use `FramedImage` (`frame`: "border", "border-shadow" or "shadow"), which draws the frame in CSS around the cropped image. Treeats Research posts come from Figma's own fills (no raw originals; kept as `design-assets/treeats/research-fizz-XX-figma-export.png`); posts 02 and 03 are one thread, stacked into one image.
- Tilted screenshots exported with a baked-in tilt and shadow open upright in the zoom viewer: pass the upright copy as `full` (`CaseImage`, or a screen's `full` in `SolutionCompare`). Crop the upright file to the card's opaque rectangle and recut its rounded corners with a clean anti-aliased mask slightly inside the source curve, filling partly transparent corner pixels with the card color, so no shadow or dark fringe shows on the scrim. With a different `full`, the viewer skips the inline placeholder, so the tilted copy never shows under or around it. Treeats: `solution-rde-site.png` / `solution-stanfood.png` on the page (from `r&d small.png` / `stanfood tiny screenshot.png`), `solution-*-upright.png` in the viewer (from `untilted r&de tiny.png` / `untilted stanfood tiny.png`). The tilted images are placed by their whole image box in % of the panel, so a re-export with a different size or angle needs new placements.
- `CursorCaption` takes `keepCase` to show the caption as written (not uppercase), in the cursor pill and the touch label. The cursor's caption pill slides sideways to stay 8px inside the window.
- The project card cursor pill is live: grain tile (`public/cursor/pill-grain.svg`), the panda (`public/cursor/panda.svg`, both cut from Figma's pill) and the card's `cursorLabel` in Geist Mono medium 13px uppercase. It's as wide as its label (172px for "view case study"); the label swaps whenever the card under the pointer changes. Cards pass it as `data-cursor-pill` (and `data-cursor-external`).
- Cursor pills (caption and project card) crossfade with the dot: opacity plus a 0.9 → 1 scale over 120ms, never a resize. Leaving a pill, its text fades first (70ms), then the pill. The pill has no follow lag: the position snaps to the pointer on enter and leave. Zones end at the element's visible rounded edge, so trim any exported margin from images and add corners and shadow in CSS.
- Synced videos (`SyncedVideos`, `Decision`, via `useSyncedVideos`) work for two or more clips: they start together once all have loaded, play once, hold the shorter ones on their last frame until the longest ends, then restart together. They load about 400px before the screen, play only while on it, pause while one is open in the zoom viewer, and have a pause button (WCAG 2.2.2). Every side-by-side row in Design Decisions is one group, including the three-video row.
- Scroll reveals (`useRevealOnce`) run once. Reduced motion, or already on screen at load, shows the final state.
  - Crit stickies: at 50% in view they fade in 90ms apart, drifting up 12px and settling from a slight tilt to Figma's 0°.
  - Quit-rate chart: at 60% in view the red line (path from `design-assets/story_beats/quit rate line.svg`) draws left to right over 1.6s (ease-in-out). The dash is measured in screen px, because the plot stretches and the stroke doesn't scale. "quits spike at launch" fades in as the line reaches the spike, and "gap narrows as learners adapt" at 85%. Grid, blue baseline and the +21% header stay still.
- Video encoding: H.264 CRF 26, 30fps, no audio, faststart. Trim to the clip's last real frame (some raw files pad up to 0.6s), and use posters at most 480px wide. Crop baked-in edge artifacts too (the hub demo had 1–2px black and gray lines on every edge) and give a full-bleed recording a panel in its own background color. Cropped clips (Converging) keep the card window's exact proportions and pad with white instead of cutting off the widest frame. Check frames across the whole clip, not just the first. Check what a clip shows, not its file name: `before.mp4` / `after shuffle.mp4` were named the opposite of their panels.
- GIF recordings (Treeats features) become MP4s: crop baked-in edge lines (the Treeats GIFs had 2px dark lines on the bottom and right), scale to 720px wide, H.264 CRF 30 `-tune animation` at the GIF's own frame rate (12.5fps; converting to 30 only duplicates frames), no audio, faststart, first-frame poster at 480px. To hold the final success frame before looping, pad it with ffmpeg `tpad=stop_mode=clone:stop_duration=1`. About 154 MB of GIFs became 5.3 MB of MP4. Higher quality at 886px (CRF 26) was up to 9.6 MB per clip with no visible gain, since the GIF dithering is what costs the bits.
- `CaseVideo` opt-ins for single looping clips longer than 5s: `playEarly` (buffers once within one screen height of the viewport, plays once at least a quarter is visible so it is already moving when it arrives, pauses and rewinds once fully off it; Treeats feature recordings, which are trimmed to open about 0.3s before their first action, with posters showing an interaction) and `pausable` (its own "Pause video" button, hidden with reduced motion). Without them it behaves as below (ATSB).
- Props is an overview of confidential work: nothing on the page is zoomable (hero included). Its preview panels have the blur baked in by design and ship at 920px wide at most (2x the 460px panel); `next/image` never serves more than the source, so no sharper copy can be requested. The full-size originals stay in `design-assets/props/`. Don't sharpen them or ship larger versions.
- YouTube videos (`YouTubeEmbed`) are standalone players with sound, never silent loops. Until the click it is only a local poster (in the case study folder, never hotlinked from YouTube) and a real `<button>` labeled "Play video: {title}", so nothing loads from YouTube. The click swaps in a `youtube-nocookie.com/embed/{id}?autoplay=1&rel=0&modestbranding=1&playsinline=1` iframe with the same `title`, fullscreen allowed, and focus moves into it. It is not zoomable. `modestbranding` no longer does anything (YouTube dropped it in 2023) and `rel=0` only limits end-screen suggestions to the same channel. After the click the iframe loads from youtube-nocookie.com, www.google.com and jnn-pa.googleapis.com (anti-abuse), googlevideo.com (stream), i.ytimg.com, yt3.ggpht.com, gstatic.com and fonts.gstatic.com; no cookies were set in testing. The panel has 12px corners and the 16:9 video 10px with a border and `shadow-card`. Treeats' promo video ("DESIGN 11 DP3 Vid" on YouTube, labeled "StanFork promo video") has burned-in subtitles plus YouTube's auto-generated English captions only; the poster is Figma's still, and the YouTube thumbnail is kept in `design-assets/treeats/`.
- Videos (`CaseVideo`, `MotionDemos`) use `preload="none"`: nothing downloads until the video scrolls into view, it plays only while on screen and pauses when scrolled off. Import images from the case study folder and pass them as `src`.

## Assets
| What | Where | Notes |
|---|---|---|
| Raw exports from Figma (PNG, MP4, ZIP, …) | `design-assets/<case-study>/`, e.g. `design-assets/story_beats/` for ATSB | Gitignored originals. Never put them in `content/`. |
| Optimized images | `content/case-studies/<slug>/` | JPEG or PNG at most 3840px wide (the largest size `next/image` serves), kebab-case names. Import them in the MDX. `next/image` makes the compressed in-page versions, and the zoom viewer loads the large one. |
| Videos | `public/videos/` | Compressed MP4, kebab-case names. Posters go in `public/videos/posters/`. |

- **Only images go in a case study folder.** The loader imports images from a path with a variable in it (`content/case-studies/${slug}/${file}`), so the bundler processes every file in those folders. A video, ZIP or other non-image there breaks `next dev` with "Unknown module type". Files in `public/` are served as-is, so videos are safe there.
- When there's no raw original for a Figma image, use the image fill from `get_design_context` and keep that export in `design-assets/<case-study>/` (the Treeats hero is Figma's 1536 × 862 fill, saved as `hero-figma-export.png`).

- Footer contacts: Twitter is hidden (`hidden: true` in `contacts` in `Footer.tsx`) until it has a URL; delete the flag to restore it.

## Workflow
- Work in small steps: one section at a time (Nav → Hero → Projects grid → Footer → case study pages).
- After each section: run `npm run lint` and `npm run build`, compare with Figma at desktop width, and check phone/tablet.
- Show me the section and **commit only after I confirm it looks right**. Use one commit per section with a clear message.
- Don't commit unrelated changes or bundle several sections into one commit.
