import type { StaticImageData } from "next/image";
import CaseImage from "./CaseImage";

export type Frame = "border" | "border-shadow" | "shadow";

type Props = {
  src: StaticImageData;
  alt: string;
  /** "border": 1px border and 6px corners; "border-shadow": plus a soft
   * shadow; "shadow": a square card with only a shadow. */
  frame?: Frame;
  /** Width in % of the parent; the height follows the image. */
  width: number;
  sizes: string;
};

const FRAME: Record<Frame, string> = {
  border: "overflow-hidden rounded-screenshot border border-figure-border",
  "border-shadow": "overflow-hidden rounded-screenshot border border-figure-border shadow-site",
  shadow: "shadow-card",
};

// A zoomable screenshot or sketch whose Figma frame is drawn in CSS, so the
// exported image is cropped to its content and the zoom viewer shows it bare.
export default function FramedImage({ src, alt, frame = "border-shadow", width, sizes }: Props) {
  return (
    <div style={{ width: `${width}%`, aspectRatio: `${src.width} / ${src.height}` }} className={`shrink-0 ${FRAME[frame]}`}>
      <CaseImage src={src} alt={alt} zoomable sizes={sizes} />
    </div>
  );
}
