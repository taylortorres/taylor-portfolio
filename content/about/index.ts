// About page copy (Figma 2748:5479). Edit the text here; the components in
// src/components/About*.tsx only lay it out. Photos are cropped to Figma's
// frames (from design-assets/about/*-figma-export.png) and live next to this file.
//
// Snapshots and "big on" each have exactly four photos: their layout (the
// overlapping snapshot positions, the pile) is tuned to four.

import type { StaticImageData } from "next/image";
import bigOnConcert from "./big-on-concert.jpg";
import bigOnFood from "./big-on-food.jpg";
import bigOnMetro from "./big-on-metro.jpg";
import bigOnParis from "./big-on-paris.jpg";
import pinkCharacter from "./pink-character.png";
import portrait from "./portrait.jpg";
import snapshotDesignathon from "./snapshot-designathon.jpg";
import snapshotDuolingo from "./snapshot-duolingo.jpg";
import snapshotSwidBoard from "./snapshot-swid-board.jpg";
import snapshotSwidcon from "./snapshot-swidcon.jpg";

export type Photo = { src: StaticImageData; alt: string };
/** A section heading: `mark` is a decorative kaomoji or symbol (hidden from screen readers). */
export type Heading = { mark: string; text: string; markItalic?: boolean };

export const about = {
  title: "About · Taylor Torres",
  description:
    "Taylor Torres is a product designer and storyteller, endlessly curious about how people learn, connect, and make sense of the world.",

  portrait: {
    photo: { src: portrait, alt: "Taylor smiling, in a blue t-shirt, against a dark backdrop" } satisfies Photo,
    caption: ["hiii, welcome!!!", "so glad you found me (˶˃ ᵕ ˂˶)"],
    // Peeks over the polaroid on hover (transparent PNG, its 21.44° tilt baked in;
    // raw file: design-assets/about/pink-character.png).
    character: pinkCharacter as StaticImageData | undefined,
  },

  intro: {
    lede: "I’m Taylor, a product designer and storyteller, endlessly curious about how people learn, connect, and make sense of the world.",
    paragraphs: [
      "At the heart of my work is a fascination with people: what makes us tick, what brings us together, and the little things that shape our everyday experiences. I believe thoughtful design begins with asking good questions, paying attention, and being willing to rethink what we thought we knew.",
      "I love untangling big, messy problems and finding ways to make them feel clear, approachable, and (ofc!) delightful. Whether through design, data viz, writing, video, or whatever medium I'm learning next, figuring out how best to tell a story is half the fun!",
    ],
    beliefsLabel: "A FEW THINGS I BELIEVE IN...",
    beliefs: [
      { lead: "[01] follow your curiosity", rest: "you never know where it might take you!" },
      { lead: "[02] think in systems", rest: "nothing exists in isolation. zoom out and see the bigger picture." },
      { lead: "[03] test early and often", rest: "get your ideas out into the world and don’t be afraid to kill your darlings." },
    ],
  },

  snapshots: {
    heading: { mark: "[°◉]", text: "snapshots of my life as a designer" } satisfies Heading,
    // In order, left to right (later photos overlap earlier ones).
    photos: [
      {
        src: snapshotSwidcon,
        alt: "Taylor and two friends holding cutouts of a dumpling, a paint palette and boba under a SWIDCON “Design for d.light” slide",
        caption: "hosting Yiying, the creator of the 🥟 and 🧋 emojis, @ SWIDCON!!",
      },
      {
        src: snapshotSwidBoard,
        alt: "A big group of Stanford Women in Design members posing together in a dim room with string lights",
        caption: "celebrating Special D with our new Stanford Women in Design (SWID) Executive Board!!",
      },
      {
        src: snapshotDuolingo,
        alt: "Taylor and fellow interns making peace signs under a “welcome to duolingo HQ” screen, one holding a Duo plush overhead",
        caption: "designing immersive (and fun!) learning experiences @ Duolingo",
      },
      {
        src: snapshotDesignathon,
        alt: "The Designathon team posing in a row in front of a “the stanford designathon” slide",
        caption: "leading the brand design behind Stanford’s first-ever Designathon!",
      },
    ],
  },

  bigOn: {
    heading: { mark: "(๑'ᵕ'๑)⸝*", text: "taylor is big on...", markItalic: true } satisfies Heading,
    // Left to right. The first one is on top of the pile.
    items: [
      {
        photo: { src: bigOnParis, alt: "Taylor smiling by the Seine, with the Eiffel Tower in the background" },
        cursorCaption: "#takemeback :,)",
        title: "exploring the world",
        text: "Sometimes all you really need is to #bookthattrip. 10 countries down, and an ever-growing list of places I want to explore!",
        funFact: "I've studied abroad twice! First in Taipei, Taiwan, and most recently in Madrid, Spain.",
      },
      {
        photo: { src: bigOnMetro, alt: "The red Metro sign at Madrid’s Ópera station entrance on a sunny day" },
        cursorCaption: "i <3 the madrid metro",
        title: "taking public transit",
        text: "Growing up in LA, where the nearest grocery store was a 2-hr walk away, I’ve become a huge advocate for safe, affordable, and accessible public transit. My ideal utopia would be a walkable world.",
        funFact: "I once took a 35-hour Amtrak ride from LA → Seattle!",
      },
      {
        photo: { src: bigOnConcert, alt: "Taylor and two friends holding up concert photo cards in a crowded venue lobby" },
        cursorCaption: "#riizeandrealize",
        title: "fangirling at concertsss",
        text: "There’s truly nothing quite like the collective serotonin boost of screaming your lungs out at a concert with your favorite people.",
        funFact: "I braved the BTS ticket war 3x!",
      },
      {
        photo: { src: bigOnFood, alt: "Taylor leaning in to taste a spoonful from a plate of food" },
        cursorCaption: "nom nom nom",
        title: "devouring yummy food",
        text: "As a self-proclaimed foodie and coffee enthusiast, I take great joy in scouring the internet for the best eats and drinks in every city I visit.",
        funFact: "I am an avid beli enjoyer and I have ranked 280 spots (and counting!) this year (ᵕˆヮˆ)",
        // Plain text for now: Beli's profile URL format isn't confirmed.
        ps: "p.s. follow me on beli @tayjules :D",
      },
    ],
  },

  experience: {
    heading: { mark: "✎", text: "experience", markItalic: true } satisfies Heading,
    // `logo` is a file in public/about/. "tile" logos get a rounded, bordered square (Stanford Health).
    rows: [
      { company: "Duolingo", role: "Product Design Intern", dates: "Summer 2025 & Summer 2026", logo: "/about/logo-duolingo.svg" },
      { company: "Figma", role: "Campus Leader", dates: "September 2025 - Present", logo: "/about/logo-figma.svg" },
      { company: "Stanford Health", role: "Service Designer & Researcher", dates: "September 2026 - Present", logo: "/about/logo-stanford-health.png", tile: true },
      { company: "Pika AI Labs", role: "Product Designer & Researcher", dates: "February - May 2026", logo: "/about/logo-pika.svg" },
      { company: "Struggly", role: "Product Designer & Researcher", dates: "September - December 2025", logo: "/about/logo-struggly.svg" },
    ],
  },
};
