import type { StaticImageData } from "next/image";
import CaseImage from "./CaseImage";
import CaseVideo from "./CaseVideo";

type Media =
  /** Phone recording (a converted GIF): loops, pausable, zoomable. */
  | { video: string; poster: string; width: number; height: number; alt: string }
  /** Phone still, or the square home screen widget (`widget`). */
  | { image: StaticImageData; alt: string; widget?: boolean };

type Feature = {
  title: string;
  text: string;
  media: Media;
};

// Treeats product features (Figma 2691:70880): rows alternating text-left and
// phone-left, each phone 255px wide with 15px corners and a soft shadow, the
// last a 267px home screen widget. From md, rows are 60px apart with 60px
// padding (the first has 40, the widget row 100 / 120). On
// phones each row stacks, text then the phone centered, 64px apart.
// Recordings load near the screen, play once half is on it, rewind when
// they leave and have a pause button (all longer than 5s).

function Phone({ media }: { media: Media }) {
  if ("video" in media) {
    return (
      <div className="w-feature-phone max-w-full rounded-feature shadow-feature">
        <CaseVideo
          src={media.video}
          poster={media.poster}
          label={media.alt}
          width={media.width}
          height={media.height}
          zoomable
          playAtHalf
          pausable
          className="rounded-feature"
        />
      </div>
    );
  }
  if (media.widget) {
    return (
      <div className="w-feature-widget max-w-full">
        <CaseImage src={media.image} alt={media.alt} zoomable sizes="267px" />
      </div>
    );
  }
  return (
    <div className="w-feature-phone max-w-full rounded-feature shadow-feature">
      <CaseImage src={media.image} alt={media.alt} zoomable sizes="255px" className="rounded-feature" />
    </div>
  );
}

export default function FeatureRows({ features }: { features: Feature[] }) {
  return (
    <div className="flex flex-col gap-16 md:gap-feature-pad">
      {features.map(({ title, text, media }, i) => {
        const phoneFirst = i % 2 === 1;
        const widget = "image" in media && media.widget;
        const pad = widget
          ? "md:pt-feature-widget-top md:pb-feature-widget-bottom"
          : i === 0
            ? "md:py-feature-first"
            : "md:py-feature-pad";
        return (
          <div
            key={title}
            className={`flex flex-col items-center gap-8 md:flex-row md:gap-10 xl:gap-feature-gap xl:px-feature-pad ${pad}`}
          >
            <div className={`w-full md:max-w-feature-text md:flex-1 ${phoneFirst ? "md:order-2" : ""}`}>
              <h4 className="font-serif text-feature-title text-heading">{title}</h4>
              <p className="mt-feature-text-gap font-sans text-feature text-muted">{text}</p>
            </div>
            <div className="flex shrink-0 justify-center">
              <Phone media={media} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
