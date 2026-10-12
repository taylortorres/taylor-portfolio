import Image, { type StaticImageData } from "next/image";
import Zoomable from "./Zoomable";

type Props = {
  src: StaticImageData;
  alt: string;
  /** Rendered width hint for the inline image. */
  sizes?: string;
  /** Opens in the zoom viewer when clicked. */
  zoomable?: boolean;
  /** Bigger version for the viewer; defaults to `src` at full resolution. */
  full?: StaticImageData;
};

const INLINE_SIZES = "(min-width: 1024px) 720px, 100vw";

// Case study image. With `zoomable`, the viewer shows the inline copy (already
// loaded) at once and the full-resolution image over it, which is only
// requested when the viewer opens.
export default function CaseImage({ src, alt, sizes = INLINE_SIZES, zoomable = false, full = src }: Props) {
  const inline = <Image src={src} alt={alt} sizes={sizes} className="block h-auto w-full" />;
  if (!zoomable) return inline;

  return (
    <Zoomable
      label={alt}
      width={full.width}
      height={full.height}
      full={
        <>
          <Image src={src} alt="" sizes={sizes} fill className="object-contain" />
          <Image src={full} alt={alt} sizes="(min-width: 640px) calc(100vw - 80px), 100vw" fill className="object-contain" />
        </>
      }
    >
      {inline}
    </Zoomable>
  );
}
