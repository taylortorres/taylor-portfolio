type Props = {
  paused: boolean;
  onToggle: () => void;
  /** Screen reader name; "Pause video" for a single clip. */
  label?: string;
};

// Corner button that pauses a group of synced videos (WCAG 2.2.2: moving
// content longer than 5s needs a way to stop it).
export default function PauseButton({ paused, onToggle, label = "Pause videos" }: Props) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={paused}
      className="absolute right-2 bottom-2 flex size-11 items-center justify-center rounded-full text-chip-text focus-visible:outline-2 focus-visible:outline-accent"
    >
      <span className="flex size-7 items-center justify-center rounded-full bg-chip">
        <span className="sr-only">{label}</span>
        <svg viewBox="0 0 12 12" aria-hidden="true" className="size-3 fill-current">
          {paused ? <path d="M3 1.5v9l7.5-4.5z" /> : <path d="M2.5 1.5h2.5v9H2.5zM7 1.5h2.5v9H7z" />}
        </svg>
      </span>
    </button>
  );
}
