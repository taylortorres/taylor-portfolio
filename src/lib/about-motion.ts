import type { CSSProperties } from "react";

// Every About page timing, in one place. The page sets these as CSS
// variables on its <main> (aboutMotionVars), so the CSS in globals.css and
// the components' JavaScript (typing speed, fan-out end) read the same values.
// Reduced motion turns every transition off (globals.css) and shows final states.
export const ABOUT_MOTION = {
  // Intro text on page load. The headline reuses the home headline's values
  // (--intro-hold, --intro-line-dur, --intro-ease, --intro-blur, --intro-rise
  // in globals.css); the text under it fades in once the headline has mostly settled.
  introTextStartMs: 500, // after the headline starts (it takes 700ms)
  introTextStaggerMs: 100,
  introTextMs: 500,
  introTextRisePx: 8,

  // Section headings ("snapshots of my life...", "taylor is big on...", "experience"): typed
  // once, when the whole heading is inside the top 65% of the screen (the bottom 35% is ignored).
  headingRootMargin: "0px 0px -35% 0px",
  headingThreshold: 0.99, // the whole heading (0.99 allows for subpixel rounding)
  headingTypeMsPerChar: 35,
  // After a heading finishes typing, its content enters this much later: the snapshots and
  // experience rows blur in (the intro headline's values), the "big on" pile fans out.
  afterHeadingMs: 150,
  snapshotRevealStaggerMs: 100,
  experienceRevealStaggerMs: 80, // per row, top to bottom

  // Portrait polaroid: straightens and grows on hover or focus.
  portraitMs: 380,
  portraitScale: 1.05, // Figma's straight frame (2824:12270) is the polaroid at 1.05
  portraitEase: "cubic-bezier(0.34, 1.25, 0.64, 1)", // gentle spring, small overshoot
  // Pink character: rises from behind the polaroid with an overshoot, slides back on leave.
  characterInMs: 460,
  characterInDelayMs: 60,
  characterInEase: "cubic-bezier(0.34, 1.56, 0.64, 1)",
  characterOutMs: 260,
  characterOutEase: "cubic-bezier(0.4, 0, 1, 1)",
  // The portrait's load blur-in reuses the headline's values and start (--intro-* in globals.css).
  // Touch screens: play once when this much of the portrait is in view, after a short pause
  // (and never before the blur-in has ended).
  touchThreshold: 0.6,
  touchDelayMs: 300,

  // Snapshots: the hovered or focused photo straightens, grows and types its caption.
  snapshotMs: 320,
  snapshotScale: 1.1,
  snapshotEase: "cubic-bezier(0.22, 1, 0.36, 1)",
  typeMsPerChar: 30,

  // "Taylor is big on": the pile fans out into the row once, then the texts blur in.
  fanThreshold: 0.5,
  fanMs: 820,
  fanStaggerMs: 90,
  fanEase: "cubic-bezier(0.22, 1, 0.36, 1)",
  textMs: 520,
  textBlurPx: 8,
  textRisePx: 8,

  // "Big on" photos after the fan-out: hover or focus tilts one 2° (alternating left, right) and shrinks it a little.
  bigOnHoverMs: 250,
  bigOnHoverTiltDeg: 2,
  bigOnHoverScale: 0.97,
  bigOnHoverEase: "cubic-bezier(0.33, 1, 0.68, 1)",
} as const;

/** The timings as CSS variables, for the page's root element. */
export function aboutMotionVars(): CSSProperties {
  const m = ABOUT_MOTION;
  return {
    "--after-heading": `${m.afterHeadingMs}ms`,
    "--snapshot-reveal-stagger": `${m.snapshotRevealStaggerMs}ms`,
    "--experience-reveal-stagger": `${m.experienceRevealStaggerMs}ms`,
    "--about-text-start": `${m.introTextStartMs}ms`,
    "--about-text-stagger": `${m.introTextStaggerMs}ms`,
    "--about-text-ms": `${m.introTextMs}ms`,
    "--about-text-rise": `${m.introTextRisePx}px`,
    "--big-on-hover-ms": `${m.bigOnHoverMs}ms`,
    "--big-on-hover-tilt": `${m.bigOnHoverTiltDeg}deg`,
    "--big-on-hover-scale": m.bigOnHoverScale,
    "--big-on-hover-ease": m.bigOnHoverEase,
    "--portrait-ms": `${m.portraitMs}ms`,
    "--portrait-scale": m.portraitScale,
    "--portrait-ease": m.portraitEase,
    "--character-in-ms": `${m.characterInMs}ms`,
    "--character-in-delay": `${m.characterInDelayMs}ms`,
    "--character-in-ease": m.characterInEase,
    "--character-out-ms": `${m.characterOutMs}ms`,
    "--character-out-ease": m.characterOutEase,
    "--snapshot-ms": `${m.snapshotMs}ms`,
    "--snapshot-scale": m.snapshotScale,
    "--snapshot-ease": m.snapshotEase,
    "--fan-ms": `${m.fanMs}ms`,
    "--fan-stagger": `${m.fanStaggerMs}ms`,
    "--fan-ease": m.fanEase,
    "--fan-text-ms": `${m.textMs}ms`,
    "--fan-text-blur": `${m.textBlurPx}px`,
    "--fan-text-rise": `${m.textRisePx}px`,
  } as CSSProperties;
}

/** How long the whole fan-out takes, last text included (hover captions wait for it). */
export const FAN_TOTAL_MS =
  3 * ABOUT_MOTION.fanStaggerMs + ABOUT_MOTION.fanMs + ABOUT_MOTION.textMs;
