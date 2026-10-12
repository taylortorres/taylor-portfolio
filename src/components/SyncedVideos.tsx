"use client";

import PauseButton from "./PauseButton";
import { useSyncedVideos } from "@/lib/use-synced-videos";

export type Clip = {
  src: string;
  poster: string;
  /** Describes what the video shows. */
  label: string;
  width: number;
  height: number;
};

// Two or more videos side by side that run as one (see useSyncedVideos), in
// equal columns. In MDX: <SyncedVideos clips={[{ src, poster, label, width, height }, …]} />
export default function SyncedVideos({ clips }: { clips: Clip[] }) {
  const { wrapRef, videoRef, reduced, paused, setPaused } = useSyncedVideos(clips.length);

  return (
    <div ref={wrapRef} className="relative">
      <div className="grid items-start gap-gutter" style={{ gridTemplateColumns: `repeat(${clips.length}, minmax(0, 1fr))` }}>
        {clips.map((clip, i) => (
          <video
            key={clip.src}
            ref={videoRef(i)}
            src={reduced ? undefined : clip.src}
            poster={clip.poster}
            width={clip.width}
            height={clip.height}
            aria-label={clip.label}
            muted
            playsInline
            preload="none"
            className="block h-auto w-full"
          />
        ))}
      </div>
      {!reduced && <PauseButton paused={paused} onToggle={() => setPaused((p) => !p)} />}
    </div>
  );
}
