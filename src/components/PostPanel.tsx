import Image, { type StaticImageData } from "next/image";
import CaseImage from "./CaseImage";

type Props = {
  src: StaticImageData;
  alt: string;
  /** Figma's hand-drawn "sigh" marks to the left of the post. */
  sigh?: boolean;
};

// One social post centered on a gray panel (Treeats Challenge, Figma
// 2691:70789): 339px wide with 8px corners and a soft shadow, zoomable. The
// decorative "sigh" doodle sits 103px to its left and shows from sm up, where
// there's room beside the post.
export default function PostPanel({ src, alt, sigh = false }: Props) {
  return (
    <div className="flex items-center justify-center rounded-stat border border-figure-border bg-figure-bg px-4 py-6 sm:h-post-panel-h sm:py-0">
      <div className="relative w-full max-w-post-w">
        {sigh && (
          <Image
            src="/case-study/treeats/sigh.svg"
            alt=""
            aria-hidden="true"
            width={32}
            height={35}
            className="absolute top-sigh-y -left-sigh-x hidden sm:block"
          />
        )}
        <div className="rounded-stat shadow-post">
          <CaseImage src={src} alt={alt} zoomable sizes="339px" className="rounded-stat" />
        </div>
      </div>
    </div>
  );
}
