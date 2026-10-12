import type { StaticImageData } from "next/image";
import CaseImage from "./CaseImage";

type Post = {
  src: StaticImageData;
  alt: string;
  /** Center of the post, in % of the panel's width (x) and height (y). */
  x: number;
  y: number;
  /** Width in % of the panel. The height follows the image. */
  w: number;
  /** Tilt in degrees (Figma's rotation; positive is clockwise). */
  rotate?: number;
};

// Scattered screenshots on a gray panel (Treeats Research, Figma 2691:70939):
// each post is placed by its center, tilted with CSS and zoomable, so the
// viewer opens it upright. Later posts sit on top. The panel keeps Figma's
// 768 × 472 proportions at every width, so on phones the posts shrink and
// are read by zooming.
export default function PostCollage({ posts }: { posts: Post[] }) {
  return (
    <div data-tight className="relative aspect-[768/472] rounded-stat border border-figure-border bg-figure-bg">
      <div className="absolute inset-0 overflow-hidden rounded-stat">
        {posts.map(({ src, alt, x, y, w, rotate = 0 }) => (
          <div
            key={alt}
            className="absolute"
            style={{ left: `${x}%`, top: `${y}%`, width: `${w}%`, transform: `translate(-50%, -50%) rotate(${rotate}deg)` }}
          >
            <CaseImage src={src} alt={alt} zoomable sizes="(min-width: 768px) 220px, 30vw" className="rounded-screenshot" />
          </div>
        ))}
      </div>
    </div>
  );
}
