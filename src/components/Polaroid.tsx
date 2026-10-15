import Image, { type StaticImageData } from "next/image";

type Props = {
  src: StaticImageData;
  alt: string;
  sizes: string;
  className?: string;
};

// A photo in a polaroid frame (About page snapshots and "big on"): off-white
// fill, 1px border and soft shadow drawn in CSS around the bare photo, so it
// stays sharp at any scale. Tilt and size come from the parent.
export default function Polaroid({ src, alt, sizes, className = "" }: Props) {
  return (
    <div className={`border border-polaroid-border bg-polaroid p-polaroid-pad shadow-polaroid ${className}`}>
      <Image src={src} alt={alt} sizes={sizes} className="block h-auto w-full" />
    </div>
  );
}
