import type { StaticImageData } from "next/image";
import FramedImage from "./FramedImage";

type Panel = {
  src: StaticImageData;
  alt: string;
  /** Panel proportions from Figma, e.g. [768, 472]. */
  aspect: [number, number];
  /** Image width in % of the panel. */
  w: number;
  /** Mono caption under the image, inside the panel. */
  caption?: string;
};

// Gray panels with a framed, zoomable image centered in each (Treeats
// Ideation, Figma 2691:71078, 2691:71088, 2691:71096): one panel spans the
// column, two sit side by side from md (stacked on phones). A caption sits
// under its image and the two are centered together.
export default function FramedPanels({ panels }: { panels: Panel[] }) {
  const pair = panels.length > 1;
  return (
    <div className={`grid gap-6 ${pair ? "md:grid-cols-2 md:gap-panel-pair-gap" : ""}`}>
      {panels.map(({ src, alt, aspect, w, caption }) => (
        <figure
          key={alt}
          style={{ aspectRatio: `${aspect[0]} / ${aspect[1]}` }}
          className="flex flex-col items-center justify-center rounded-stat border border-figure-border bg-figure-bg"
        >
          <FramedImage src={src} alt={alt} width={w} sizes={pair ? "(min-width: 768px) 340px, 90vw" : "(min-width: 1280px) 680px, 90vw"} />
          {caption && (
            <figcaption className="mt-panel-caption-gap font-mono text-panel-label font-medium text-figure-ink uppercase">
              {caption}
            </figcaption>
          )}
        </figure>
      ))}
    </div>
  );
}
