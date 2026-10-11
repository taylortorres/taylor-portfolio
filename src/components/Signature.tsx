// Handwritten "Taylor Torres" wordmark from Figma (node 2606:49828).
// Coordinates are in Figma nav-frame space so they can be checked against the
// design. Each ink vector is revealed by an animated stroke mask that traces it.
// Strokes keep Figma's easing and in-word overlap, but play in order: "Taylor"
// finishes before "Torres" starts (0.1s gap). The whole signature takes 2.4s.

const FLOURISH_STROKE =
  "M18.315 20.0655C8.415 21.0555 10.395 10.1655 14.355 10.1655C22.275 9.17553 15.345 21.0555 8.415 20.0655C-0.495 19.0755 2.475 6.20553 13.365 3.23553C27.225 -0.724469 36.135 12.1455 50.985 10.1655C54.945 10.1655 56.925 9.17553 58.905 8.18553L37.125 9.17553C22.275 15.1155 27.225 26.0055 17.325 31.9455C9.405 36.8955 5.445 27.9855 10.395 26.9955C14.355 26.9955 10.395 35.9055 5.445 32.9355C3.465 31.9455 2.475 29.9655 2.475 28.9755";

const FIRST_WORD_STROKE =
  "M11.9827 12.0169C9.01274 7.06687 0.102737 18.9469 3.07274 20.9269C7.03274 22.9069 11.9827 13.0069 13.9627 12.0169C11.9827 15.9769 10.9927 19.9369 11.9827 19.9369C13.9627 19.9369 16.9327 13.9969 18.9127 13.0069C18.9127 15.9769 14.9527 19.9369 17.9227 19.9369C20.8927 19.9369 24.8527 12.0169 26.8327 13.0069C25.8427 16.9669 21.8827 30.8269 14.9527 31.8169C9.01274 32.8069 9.01274 26.8669 14.9527 23.8969C18.9127 21.9169 25.8427 19.9369 30.7927 17.9569C38.7127 13.9969 43.6627 6.07687 41.6827 3.10687C36.7327 0.136872 29.8027 8.05687 28.8127 17.9569C26.8327 25.8769 34.7527 17.9569 38.7127 16.9669C41.6827 14.9869 40.6927 21.9169 42.6727 19.9369C44.6527 18.9469 48.6127 13.9969 44.6527 13.9969C41.6827 13.0069 41.6827 16.9669 45.6427 16.9669C48.6127 16.9669 51.5827 13.0069 52.5727 13.9969C52.5727 15.9769 47.6227 20.9269 48.6127 20.9269C53.5627 14.9869 57.5227 14.9869 60.4927 16.9669C62.4727 17.9569 64.4527 16.9669 65.4427 15.9769";

const FINISHING_WORD_STROKE =
  "M4.56595 7.2765C2.48695 9.3555 1.44745 12.474 4.56595 12.474C7.68445 12.474 11.8424 8.316 11.8424 6.237C10.8029 3.1185 5.60545 3.1185 5.60545 6.237C5.60545 9.3555 11.8424 8.316 17.0399 4.158C18.0794 3.1185 14.9609 10.395 14.9609 11.4345C16.0004 7.2765 20.1584 6.237 21.1979 6.237C24.3164 8.316 26.3954 7.2765 27.4349 5.1975C28.4744 4.158 24.3164 10.395 24.3164 11.4345C23.2769 9.3555 30.5534 3.1185 33.6719 6.237C36.7904 9.3555 38.8694 7.2765 40.9484 5.1975C40.9484 1.0395 36.7904 3.1185 35.7509 7.2765C34.7114 12.474 44.0669 7.2765 48.2249 4.158C50.3039 2.079 47.1854 2.079 47.1854 4.158C47.1854 6.237 50.3039 8.316 50.3039 9.3555C50.3039 12.474 43.0274 12.474 46.1459 9.3555C49.2644 7.2765 59.6594 11.4345 66.9359 5.1975";

type Stroke = {
  id: string;
  ink: { src: string; x: number; y: number; width: number; height: number };
  mask: { d: string; x: number; y: number; strokeWidth: number };
  // Milliseconds from page load.
  timing: { delay: number; duration: number };
};

const strokes: Stroke[] = [
  {
    id: "signature-opening-flourish",
    ink: { src: "/nav/signature-opening-flourish.svg", x: 92.801, y: 13.801, width: 57.2002, height: 32.5127 },
    mask: { d: FLOURISH_STROKE, x: 90.266, y: 11.269, strokeWidth: 4.95 },
    timing: { delay: 150, duration: 600 },
  },
  {
    id: "signature-first-word",
    ink: { src: "/nav/signature-first-word.svg", x: 117.404, y: 23.562, width: 63.9484, height: 30.4129 },
    mask: { d: FIRST_WORD_STROKE, x: 114.813, y: 21.001, strokeWidth: 4.95 },
    timing: { delay: 660, duration: 860 },
  },
  {
    id: "signature-second-flourish",
    ink: { src: "/nav/signature-second-flourish.svg", x: 186.301, y: 13.803, width: 57.3026, height: 32.6119 },
    mask: { d: FLOURISH_STROKE, x: 183.516, y: 11.269, strokeWidth: 4.95 },
    timing: { delay: 1620, duration: 340 },
  },
  {
    id: "signature-finishing-word",
    ink: { src: "/nav/signature-finishing-word.svg", x: 210.09, y: 33.59, width: 66.027, height: 10.9477 },
    mask: { d: FINISHING_WORD_STROKE, x: 207.165, y: 30.895, strokeWidth: 5.1975 },
    timing: { delay: 1910, duration: 490 },
  },
];

export default function Signature({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width={246}
      height={64}
      viewBox="31 0 246 64"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        {strokes.map(({ id, mask, timing }) => (
          <mask key={id} id={`${id}-mask`}>
            <path
              className="motion-safe:animate-write-stroke"
              style={{
                animationDelay: `${timing.delay}ms`,
                animationDuration: `${timing.duration}ms`,
              }}
              d={mask.d}
              transform={`translate(${mask.x} ${mask.y})`}
              pathLength={1}
              stroke="white"
              strokeWidth={mask.strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="1 2"
            />
          </mask>
        ))}
      </defs>
      {strokes.map(({ id, ink }) => (
        <g key={id} mask={`url(#${id}-mask)`}>
          <image
            href={ink.src}
            x={ink.x}
            y={ink.y}
            width={ink.width}
            height={ink.height}
            preserveAspectRatio="none"
          />
        </g>
      ))}
    </svg>
  );
}
