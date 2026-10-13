import Image, { getImageProps } from "next/image";
import HeroGrid from "./HeroGrid";

// Hero from Figma (node 2673:5445). Layers, bottom to top: faded grid and glow,
// headline and subline at full contrast, faded paper texture.

function Emblem({ preload = false }: { preload?: boolean }) {
  return (
    <Image
      src="/hero/emblem.svg"
      alt=""
      aria-hidden="true"
      width={121}
      height={121}
      preload={preload}
      className="absolute top-1/2 left-1/2 size-hero-emblem max-w-none -translate-x-1/2 -translate-y-1/2 -rotate-11"
    />
  );
}

// The texture is cropped per breakpoint: from lg up the 445px hero only ever
// shows a central band, so desktop gets that band instead of the full image.
function PaperTexture() {
  const common = { alt: "", sizes: "100vw" };
  const {
    props: { srcSet: desktop },
  } = getImageProps({ ...common, src: "/hero/paper-texture-desktop.png", width: 2458, height: 1072 });
  const {
    props: { srcSet: mobile, ...rest },
  } = getImageProps({ ...common, src: "/hero/paper-texture-mobile.png", width: 1229, height: 1843 });
  return (
    <picture>
      <source media="(min-width: 1024px)" srcSet={desktop} />
      <source srcSet={mobile} />
      <img {...rest} alt="" className="absolute inset-0 size-full object-cover" />
    </picture>
  );
}

export default function Hero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative overflow-hidden px-4 py-16 sm:py-20 lg:h-hero-h lg:pt-hero-top lg:pb-0"
    >
      <div aria-hidden="true" className="mask-hero-fade absolute inset-0">
        <HeroGrid />
        <Image
          src="/hero/glow.svg"
          alt=""
          width={1463}
          height={656}
          className="absolute top-hero-glow-top left-1/2 max-w-none -translate-x-1/2 mix-blend-hard-light"
        />
      </div>

      <div className="relative flex flex-col items-center gap-hero-sub-gap text-center">
        <h1
          id="hero-heading"
          className="font-display text-hero-sm text-ink opsz-hero sm:text-hero-md lg:text-hero"
        >
          <span data-intro="line-1" className="block">
            Taylor
            <span className="relative whitespace-pre">
              {"         "}
              {/* Figma stacks two identical copies of the emblem. */}
              <Emblem preload />
              <Emblem />
            </span>
            designs the <em className="font-medium text-accent">threads</em> that
          </span>
          <span data-intro="line-2" className="block lg:mt-hero-line-gap">tie people, ideas, and systems together.</span>
        </h1>
        <p data-intro="sub" className="font-mono text-subline-sm text-accent-deep uppercase text-balance word-tight-mono sm:text-subline">
          <span aria-hidden="true">⌯⌲ </span>
          currently @ <span className="font-medium whitespace-nowrap">stanford d.school</span>
          <span aria-hidden="true" className="whitespace-pre">{"  ⊹ ࣪ ˖  "}</span>
          <span className="sr-only">, </span>
          prev @ <span className="font-medium">duolingo</span>
        </p>
      </div>

      <div aria-hidden="true" className="mask-hero-fade pointer-events-none absolute inset-0 opacity-60">
        <PaperTexture />
      </div>
    </section>
  );
}
