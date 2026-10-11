import Image from "next/image";

// Site footer from Figma (node 2606:49180), shared by every page.
// From lg up it is Figma's 1440 × 580 frame: text at Figma's positions and the
// stamp artwork anchored to the bottom from x=309, at full size from xl and
// scaled to the remaining width between lg and xl. Below lg the text stacks
// and the artwork becomes a full-width band that scales with the screen.

type ContactLink = { label: string; href: string };

// Placeholder: Twitter has no URL yet.
const contacts: ContactLink[] = [
  { label: "Email", href: "mailto:tjulest@stanford.edu" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/taylor-jtorres/" },
  { label: "Twitter", href: "#" },
];

// Artwork, positioned in % so the band can scale on mobile. Boxes are
// unrotated sizes centered where Figma has them; `rotate` is Figma's angle.
// `frame` pieces sit inside Figma's clipped artwork frame (x 362–1238 of the
// footer); `stamps` are relative to the whole artwork region (x 309–1276,
// y 27–580), using each stamp's export bounds (shadow included).
type Piece = { src: string; w: number; h: number; left: number; top: number; width: number; height: number; rotate?: number };

const frame: Piece[] = [
  { src: "/footer/paper.png", w: 977, h: 1024, left: 3.914, top: 7.695, width: 92.172, height: 152.984, rotate: -4.84 },
  { src: "/footer/panda-train.svg", w: 349, h: 234, left: 41.79, top: 14.643, width: 39.877, height: 42.346, rotate: 3 },
];
// Stamp 1's SVG includes its shadow, so it overflows its box by Figma's insets.
const musicStamp = { left: 15.734, top: 7.53, width: 15.339, height: 24.358, rotate: -27.79 };

const stamps: Piece[] = [
  { src: "/footer/stamp-ink-pad.svg", w: 255, h: 256, left: 73.733, top: 46.112, width: 26.27, height: 46.293 },
  { src: "/footer/stamp-laptop.svg", w: 174, h: 178, left: 0, top: 38.212, width: 17.96, height: 32.174 },
  { src: "/footer/stamp-hike.svg", w: 153, h: 152, left: 76.424, top: 15.618, width: 15.803, height: 27.427 },
];

const place = ({ left, top, width, height, rotate }: Omit<Piece, "src" | "w" | "h">) => ({
  left: `${left}%`,
  top: `${top}%`,
  width: `${width}%`,
  height: `${height}%`,
  rotate: rotate ? `${rotate}deg` : undefined,
});

function ArtImage({ piece, sizes }: { piece: Piece; sizes: string }) {
  return (
    <Image
      src={piece.src}
      alt=""
      width={piece.w}
      height={piece.h}
      sizes={sizes}
      className="absolute max-w-none"
      style={place(piece)}
    />
  );
}

const focusRing = "rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-paper";

function Contact({ label, href }: ContactLink) {
  const isPlaceholder = href === "#";
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      {...(external && { target: "_blank", rel: "noopener noreferrer" })}
      className={`inline-flex min-h-11 items-center lg:-my-1.25 lg:min-h-0 lg:py-1.25 ${focusRing}`}
    >
      <span className={isPlaceholder ? "" : "underline decoration-from-font [text-underline-position:from-font]"}>
        {label}
      </span>
      <span aria-hidden="true">&nbsp;↗</span>
      {external && <span className="sr-only"> (opens in a new tab)</span>}
    </a>
  );
}

export default function Footer() {
  return (
    <footer className="relative mt-section-gap overflow-hidden text-paper">
      <Image src="/footer/background.jpg" alt="" fill sizes="100vw" className="object-cover" />

      <div className="relative mx-auto max-w-footer-max lg:h-footer-h">
        <div className="px-4 pt-12 sm:px-8 lg:absolute lg:top-footer-top lg:left-footer-x lg:p-0">
          <p className="font-display text-footer-title font-medium">
            Made with lots of
            <br />
            dirty matchas and <span aria-hidden="true">&lt;3</span>
            <span className="sr-only">love</span>
          </p>
          <p className="font-mono text-footer-meta font-medium">Taylor Torres ~ © 2026</p>
        </div>

        <div className="px-4 pt-8 sm:px-8 lg:absolute lg:top-footer-contact lg:left-footer-x lg:p-0">
          <h2 className="font-mono text-footer-label font-medium text-footer-highlight uppercase">
            Say hi!!<span aria-hidden="true"> ⸜(｡˃ ᵕ ˂ )⸝♡</span>
          </h2>
          <ul className="mt-footer-link-gap flex flex-col gap-footer-link-gap font-mono text-footer-link font-medium text-footer-text uppercase">
            {contacts.map((contact) => (
              <li key={contact.label} className="flex min-h-11 items-center lg:h-footer-row lg:min-h-0">
                <Contact {...contact} />
              </li>
            ))}
          </ul>
        </div>

        <div
          aria-hidden="true"
          className="relative mx-auto mt-8 aspect-[967/553] w-full max-w-footer-art-w overflow-hidden lg:absolute lg:right-4 lg:bottom-0 lg:left-footer-art-x lg:mt-0 lg:w-auto xl:right-auto xl:w-footer-art-w"
        >
          <div className="absolute inset-y-0 left-[5.481%] w-[90.542%] overflow-hidden">
            {frame.map((piece) => (
              <ArtImage key={piece.src} piece={piece} sizes="(min-width: 1280px) 807px, 70vw" />
            ))}
            <div className="absolute" style={place(musicStamp)}>
              <Image
                src="/footer/stamp-music.svg"
                alt=""
                width={164}
                height={165}
                className="absolute top-[-3.55%] left-[-16.93%] h-[122.34%] w-[122.4%] max-w-none"
              />
            </div>
          </div>
          {stamps.map((piece) => (
            <ArtImage key={piece.src} piece={piece} sizes="(min-width: 1280px) 255px, 25vw" />
          ))}
        </div>
      </div>
    </footer>
  );
}
