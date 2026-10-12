import Image, { type StaticImageData } from "next/image";
import CursorCaption from "./CursorCaption";

type Photo = {
  src: StaticImageData;
  alt: string;
  /** Rides on the cursor (with a mouse) or sits on the photo (touch), as written. */
  caption: string;
};

// Photos with cursor captions (Figma 2682:69788): rounded, with a soft shadow,
// side by side from sm. Not zoomable: the caption is their interaction.
// Right after <Lessons> they sit 50px below (beats the 64px figure gap).
export default function CaptionedPhotos({ photos }: { photos: Photo[] }) {
  return (
    <div className="grid gap-photo-gap sm:grid-cols-2 [[data-lessons]+&]:mt-photos-top">
      {photos.map((p) => (
        <CursorCaption key={p.caption} caption={p.caption} keepCase className="overflow-hidden rounded-photo shadow-photo">
          <Image src={p.src} alt={p.alt} sizes="(min-width: 1280px) 375px, (min-width: 640px) 50vw, 100vw" className="block h-auto w-full" />
        </CursorCaption>
      ))}
    </div>
  );
}
