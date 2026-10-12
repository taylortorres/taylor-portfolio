import type { StaticImageData } from "next/image";
import CaseImage from "./CaseImage";
import CaseVideo from "./CaseVideo";

type Media =
  | { image: StaticImageData; alt: string }
  | {
      video: string;
      poster: string;
      alt: string;
      width: number;
      height: number;
      /** Where the clip sits in the white frame, in % of the frame (Figma's crop window). */
      left: number;
      top: number;
      size: number;
      rounded?: boolean;
    };

type Option = {
  title: string;
  /** Pill beside the title, e.g. "Eng's pick". */
  pick?: string;
  description: string;
  media: Media;
};

function Frame({ media }: { media: Media }) {
  // The still is Figma's export of the whole white frame (border included).
  if ("image" in media) {
    return <CaseImage src={media.image} alt={media.alt} sizes="(min-width: 640px) 193px, 80vw" zoomable />;
  }
  return (
    <div className="relative aspect-[192.5/179.5] overflow-hidden rounded-option-frame border border-chart-card-border bg-paper">
      <div className="absolute" style={{ left: `${media.left}%`, top: `${media.top}%`, width: `${media.size}%` }}>
        <CaseVideo
          src={media.video}
          poster={media.poster}
          label={media.alt}
          width={media.width}
          height={media.height}
          zoomable
          className={media.rounded ? "rounded-option-video" : ""}
        />
      </div>
    </div>
  );
}

function Arrowhead({ flip = false }: { flip?: boolean }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 5.2 9.2"
      className={`h-2.25 w-1.25 shrink-0 fill-none stroke-figure-arrow stroke-[1.25] ${flip ? "-scale-x-100" : ""}`}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4.6.6 .6 4.6l4 4" />
    </svg>
  );
}

// Converging (Figma 2682:69599): a LEAST MOTION ↔ MOST MOTION scale over three
// options, each a gray card with a white frame holding a zoomable still or a
// cropped looping clip (plays only while on screen), a title, an optional
// "pick" pill and a line of description. Three equal columns from sm.
export default function MotionOptions({ options }: { options: Option[] }) {
  return (
    <div>
      <div className="flex items-center font-mono text-scale-label font-semibold text-figure-ink uppercase">
        <span className="shrink-0 pr-1.5">Least motion</span>
        <span aria-hidden="true" className="flex flex-1 items-center">
          <Arrowhead />
          <span className="-mx-1.25 h-[1.25px] flex-1 bg-figure-arrow" />
          <Arrowhead flip />
        </span>
        <span className="shrink-0 pl-1.5 text-right">Most motion</span>
      </div>
      {/* From sm, each card spans three subgrid rows (frame, title, description), so the
          titles and descriptions line up across the cards even when a title wraps. */}
      <ul className="mt-6 grid gap-8 sm:grid-cols-3 sm:gap-x-option-gap sm:gap-y-0">
        {options.map((o) => (
          <li key={o.title} className="sm:row-span-3 sm:grid sm:grid-rows-subgrid">
            <div className="aspect-[232/234] rounded-stat border border-chart-card-border bg-figure-bg px-[8.2%] pt-[11.1%]">
              <Frame media={o.media} />
            </div>
            <div className="mt-4 flex flex-wrap items-start justify-between gap-x-2 gap-y-1.5">
              <h4 className="font-mono text-option-title font-semibold text-figure-ink uppercase">{o.title}</h4>
              {o.pick && (
                <span className="shrink-0 rounded-stat border border-pick-border bg-figure-bg px-1.75 py-1.25 font-mono text-option-pick font-semibold text-figure-ink uppercase">
                  {o.pick}
                </span>
              )}
            </div>
            <p className="mt-2.5 font-sans text-option-desc font-medium text-figure-ink">{o.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
