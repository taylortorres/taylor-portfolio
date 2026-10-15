"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { RESUME_URL } from "@/lib/links";

// `external` links open in a new tab and are never the current page.
// `hidden` links aren't rendered anywhere; delete the flag to bring one back.
type NavLink = { label: string; href: string; external?: boolean; hidden?: boolean };
const links: NavLink[] = [
  { label: "Work", href: "/#work" },
  { label: "Fun", href: "/fun", hidden: true }, // no /fun page yet
  { label: "About", href: "/about" },
  { label: "Resume", href: RESUME_URL, external: true },
];

const focusRing =
  "rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

// aria-current for a nav link: WORK is the current page on the home page and
// "true" (part of the current section) on every /work/... page; FUN (when
// shown) and ABOUT on their own pages. External links (the résumé) never are.
// usePathname is correct during server rendering too, so the right link is
// purple in the HTML (no flash) and follows client navigation and Back.
function current(href: string, pathname: string): "page" | "true" | undefined {
  if (href === "/#work") return pathname === "/" ? "page" : pathname.startsWith("/work/") ? "true" : undefined;
  return pathname === href ? "page" : undefined;
}

// The nav's links. Each is a [data-nav-item] for the hover softening in
// globals.css; from sm their hit areas meet in the middle of the 32px gaps,
// so moving between links never passes over a dead zone.
export default function NavLinks() {
  const pathname = usePathname();
  return (
    <ul className="flex items-center justify-between sm:justify-start sm:gap-nav-link-gap">
      {links.filter((link) => !link.hidden).map(({ label, href, external }) => {
        const state = external ? undefined : current(href, pathname);
        const className = `-mx-2.5 flex h-11 items-center px-2.5 font-mono text-nav uppercase hover:text-section-active focus-visible:text-section-active sm:-mx-4 sm:px-4 ${state ? "text-section-active" : "text-muted"} ${focusRing}`;
        return (
          <li key={label}>
            {external ? (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${label} (opens in a new tab)`}
                data-nav-item
                data-nav-link
                className={className}
              >
                {label}
              </a>
            ) : (
              <Link href={href} aria-current={state} data-nav-item data-nav-link className={className}>
                {label}
              </Link>
            )}
          </li>
        );
      })}
    </ul>
  );
}
