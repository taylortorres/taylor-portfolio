// Decorative hero grid from Figma (node 2606:48433): 46px squares with 1px
// borders that overlap, so lines repeat every 45px. Where four squares round
// their touching corners (22px radius), the lines open into a ✦ sparkle.
// The SVG is centered on the hero, so at 1440 its lines land on Figma's
// columns, and wider screens just see more grid.

const PITCH = 45;
const ARC = 21.5; // corner radius measured to the 1px stroke's center
const COLUMNS = 80;
const ROWS = 20;
const WIDTH = COLUMNS * PITCH;
const HEIGHT = ROWS * PITCH;
// Figma's column 0 sits at the left edge of a 1440 frame, 16 columns left of
// center. This grid is centered, so Figma column j is line j + COLUMN_OFFSET.
const COLUMN_OFFSET = COLUMNS / 2 - 16;

// Sparkles as [Figma column line, row line], counted from the hero's top-left.
const sparkles: [number, number][] = [
  [5, 3], [14, 3], [23, 3],
  [21, 6],
  [9, 7], [29, 7],
  [5, 9], [14, 9], [22, 9],
];

const points = sparkles.map(([col, row]) => ({
  x: (col + COLUMN_OFFSET) * PITCH + 0.5,
  y: row * PITCH + 0.5,
}));

// Straight segments along one line, skipping ARC on either side of each sparkle.
function segments(length: number, gaps: number[]) {
  const sorted = [...gaps].sort((a, b) => a - b);
  const out: [number, number][] = [];
  let start = 0;
  for (const gap of sorted) {
    out.push([start, gap - ARC]);
    start = gap + ARC;
  }
  out.push([start, length]);
  return out;
}

function gridPath() {
  const d: string[] = [];
  for (let i = 0; i <= COLUMNS; i++) {
    const x = i * PITCH + 0.5;
    const gaps = points.filter((p) => p.x === x).map((p) => p.y);
    for (const [a, b] of segments(HEIGHT, gaps)) d.push(`M${x} ${a}V${b}`);
  }
  for (let i = 0; i <= ROWS; i++) {
    const y = i * PITCH + 0.5;
    const gaps = points.filter((p) => p.y === y).map((p) => p.x);
    for (const [a, b] of segments(WIDTH, gaps)) d.push(`M${a} ${y}H${b}`);
  }
  // Each sparkle: four quarter arcs, one per rounded square corner.
  for (const { x, y } of points) {
    const arc = `A${ARC} ${ARC} 0 0 0`;
    d.push(
      `M${x} ${y - ARC}${arc} ${x + ARC} ${y}${arc} ${x} ${y + ARC}${arc} ${x - ARC} ${y}${arc} ${x} ${y - ARC}`,
    );
  }
  return d.join("");
}

const path = gridPath();

export default function HeroGrid() {
  return (
    <svg
      className="absolute top-0 left-1/2 max-w-none -translate-x-1/2"
      width={WIDTH}
      height={HEIGHT}
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path d={path} className="stroke-grid-line" strokeWidth={1} />
    </svg>
  );
}
