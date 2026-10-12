import CaseVideo from "./CaseVideo";

type Demo = {
  /** Mono label at the top left, e.g. "Shuffle demo, V1". */
  label: string;
  /** Sentence under the phone. */
  note: string;
  src: string;
  poster: string;
  /** Describes what the video shows. */
  alt: string;
  width: number;
  height: number;
};

// Motion prototypes side by side (Figma 2682:69435): each a gray panel with a
// label, a looping video in a phone frame (plays only while on screen, loads
// only then, zoomable) and a short note. Each loops on its own. Stacked on
// phones. The frame's 1px border is drawn over the video, as in Figma.
export default function MotionDemos({ demos }: { demos: Demo[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 sm:gap-12">
      {demos.map(({ label, note, src, poster, alt, width, height }) => (
        <figure key={src} className="rounded-stat border border-figure-border bg-figure-bg px-4.75 pt-4.75 pb-6.75">
          <p className="font-mono text-panel-label font-semibold text-figure-ink uppercase">{label}</p>
          <div className="mx-auto mt-3 w-demo-phone rounded-phone outline -outline-offset-1 outline-chart-card-border">
            <CaseVideo src={src} poster={poster} label={alt} width={width} height={height} zoomable className="rounded-phone" />
          </div>
          <figcaption className="mx-auto mt-4.25 max-w-demo-note text-center font-sans text-panel-note text-balance text-figure-ink">
            {note}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
