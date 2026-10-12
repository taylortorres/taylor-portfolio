"use client";

import Image, { type StaticImageData } from "next/image";
import { useEffect, useRef, useState } from "react";

type Props = {
  /** YouTube video id, e.g. "6sqgu1OjVuU". */
  id: string;
  /** Descriptive name: the button reads "Play video: {title}" and the iframe uses it as its title. */
  title: string;
  /** Local poster image (in the case study folder), shown until the click. */
  poster: StaticImageData;
  /** Mono caption above the video, inside the panel. */
  caption?: string;
};

// A YouTube video as a standalone player (Treeats Reflections, Figma
// 2691:71382): a gray panel with a caption over a 16:9 frame (10px corners,
// border, soft shadow). Until someone clicks, it is only a local poster and
// a play button, so nothing loads from YouTube. The click swaps in a
// youtube-nocookie.com iframe that starts playing with sound and controls,
// and moves focus into it. Not zoomable; fullscreen is allowed.
export default function YouTubeEmbed({ id, title, poster, caption }: Props) {
  const [playing, setPlaying] = useState(false);
  const frameRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (playing) frameRef.current?.focus(); // keep keyboard focus where the button was
  }, [playing]);

  const src = `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1&playsinline=1`;

  return (
    <figure data-video className="rounded-callout border border-figure-border bg-figure-bg px-4 py-video-panel-y md:px-0">
      {caption && (
        <figcaption className="text-center font-mono text-choice-label font-semibold text-figure-ink uppercase">{caption}</figcaption>
      )}
      <div className="relative mx-auto mt-3.25 aspect-video w-full overflow-hidden rounded-chart border border-figure-border shadow-card md:w-video-w">
        {playing ? (
          <iframe
            ref={frameRef}
            src={src}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            className="absolute inset-0 size-full"
          />
        ) : (
          <button
            type="button"
            aria-label={`Play video: ${title}`}
            onClick={() => setPlaying(true)}
            className="absolute inset-0 block size-full focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-paper"
          >
            <Image src={poster} alt="" fill sizes="(min-width: 1280px) 660px, 90vw" className="object-cover" />
            <span
              aria-hidden="true"
              className="absolute top-1/2 left-1/2 flex size-play -translate-1/2 items-center justify-center rounded-full bg-scrim text-paper"
            >
              <svg viewBox="0 0 24 24" className="ml-1 size-7 fill-current">
                <path d="M7 4.5v15l12.5-7.5z" />
              </svg>
            </span>
          </button>
        )}
      </div>
    </figure>
  );
}
