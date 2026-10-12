import CaseVideo from "./CaseVideo";

type Props = {
  /** Mono label above, e.g. "↪ Dark mode demo". */
  label: string;
  src: string;
  poster: string;
  /** Describes what the video shows. */
  alt: string;
  width: number;
  height: number;
  /** "phone": a phone recording centered on a gray panel; "wide": a full-width screen recording. */
  variant: "phone" | "wide";
};

// A labeled demo recording (Figma 2682:69742, 2682:69759): loops while on
// screen, loads only near it, zoomable. Label 13px above, like <Figure>.
export default function DemoVideo({ label, variant, ...video }: Props) {
  const player = (
    <CaseVideo
      src={video.src}
      poster={video.poster}
      label={video.alt}
      width={video.width}
      height={video.height}
      zoomable
      className={variant === "phone" ? "rounded-screen" : ""}
    />
  );
  return (
    <figure>
      <figcaption className="mb-figure-label-gap font-mono text-detail font-medium text-muted uppercase">{label}</figcaption>
      {variant === "phone" ? (
        <div className="flex items-center justify-center rounded-stat border border-figure-border bg-figure-bg px-4 py-6 md:h-dark-demo-h md:py-0">
          <div className="w-dark-demo-phone rounded-screen outline -outline-offset-1 outline-chart-card-border">{player}</div>
        </div>
      ) : (
        // Figma's 768 × 451 panel (8px corners, light border) in the recording's own
        // background color, the video fitted inside (contain): no seam, nothing cropped.
        <div className="flex aspect-[768/451] items-center overflow-hidden rounded-stat border border-chart-card-border bg-wide-demo-bg">
          <div className="w-full">{player}</div>
        </div>
      )}
    </figure>
  );
}
