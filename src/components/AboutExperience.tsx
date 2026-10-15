import Image from "next/image";
import type { CSSProperties } from "react";

type Row = { company: string; role: string; dates: string; logo: string; tile?: boolean };

// About experience list (Figma 2824:12250). From md, each row is logo and
// company, the role 242px from the row start, and the dates against the
// right edge (Figma's last three rows end 2px short of it; aligned here).
// Below md the role and dates stack under the company. Logos are
// decorative: the company name is right beside each one. Each row blurs in
// after the heading types (data-reveal-item, CSS in globals.css), top to bottom.
export default function AboutExperience({ rows }: { rows: Row[] }) {
  return (
    <ul className="flex flex-col gap-6 md:gap-experience-row" style={{ "--reveal-stagger": "var(--experience-reveal-stagger)" } as CSSProperties}>
      {rows.map((row, i) => (
        <li
          key={row.company}
          data-reveal-item
          style={{ "--reveal-i": i } as CSSProperties}
          className="grid grid-cols-[auto_1fr] items-center gap-x-logo-gap text-experience md:grid-cols-[var(--spacing-logo)_calc(var(--spacing-experience-role)-var(--spacing-logo)-2*var(--spacing-logo-gap))_1fr_auto]"
        >
          <span className="relative row-span-3 size-logo self-start md:row-span-1 md:self-center">
            {row.tile ? (
              <span className="block size-full overflow-hidden rounded-logo border border-logo-border">
                <Image src={row.logo} alt="" aria-hidden="true" width={40} height={39} className="block size-full object-cover" />
              </span>
            ) : (
              // The SVG includes Figma's 1px outline around its 40px tile (2.5% on each side), so it overhangs the tile by that much.
              <Image src={row.logo} alt="" aria-hidden="true" width={42} height={42} className="absolute -top-[2.5%] -left-[2.5%] size-[105%] max-w-none" />
            )}
          </span>
          <span className="col-start-2 font-medium text-about-ink md:col-start-auto">{row.company}</span>
          <span className="col-start-2 text-big-on text-about-faint md:col-start-auto md:text-experience">{row.role}</span>
          <span className="col-start-2 text-big-on text-about-faint md:col-start-auto md:text-right md:text-experience">
            {row.dates}
          </span>
        </li>
      ))}
    </ul>
  );
}
