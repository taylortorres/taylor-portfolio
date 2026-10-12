import Image, { type StaticImageData } from "next/image";
import Zoomable from "./Zoomable";

type Props = {
  src: StaticImageData;
  alt: string;
  /** Rendered width hint for the inline image. */
  sizes?: string;
  /** Opens in the zoom viewer when clicked. */
  zoomable?: boolean;
  /** Different image for the viewer (e.g. an upright copy of a tilted
   * screenshot); defaults to `src` at full resolution. */
  full?: StaticImageData;
  /** Above the fold: load early. */
  preload?: boolean;
  /** Extra classes for the inline image (e.g. rounded corners). */
  className?: string;
};

const INLINE_SIZES = "(min-width: 1280px) 768px, (min-width: 1024px) calc(100vw - 386px), 100vw";

// Case study image. With `zoomable`, the viewer shows the inline copy (already
// loaded) at once and the full-resolution image over it, which is only
// requested when the viewer opens. A different `full` image skips the inline
// copy, so it can't show around or under it (a tilted screenshot behind its
// upright version).
export default function CaseImage({
  src,
  alt,
  sizes = INLINE_SIZES,
  zoomable = false,
  full = src,
  preload = false,
  className = "",
}: Props) {
  const inline = <Image src={src} alt={alt} sizes={sizes} preload={preload} className={`block h-auto w-full ${className}`} />;
  if (!zoomable) return inline;

  return (
    <Zoomable
      label={alt}
      width={full.width}
      height={full.height}
      full={
        <>
          {full === src && <Image src={src} alt="" sizes={sizes} fill className={`object-contain ${className}`} />}
          <Image
            src={full}
            alt={alt}
            sizes="(min-width: 640px) calc(100vw - 80px), 100vw"
            fill
            className={`object-contain ${className}`}
          />
        </>
      }
    >
      {inline}
    </Zoomable>
  );
}
