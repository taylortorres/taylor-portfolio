import Image from "next/image";
import Link from "next/link";
import Signature from "./Signature";

const links = [
  { label: "Work", href: "/#work" },
  { label: "Fun", href: "/fun" },
  { label: "About", href: "/about" },
  { label: "Resume", href: "/resume.pdf" },
];

const focusRing =
  "rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

// The bar's sticky shell, background and border come from SiteHeader (root
// layout), so the nav is rendered once and stays in place between pages.
export default function Nav() {
  return (
    <nav
      aria-label="Primary"
      className="flex flex-col px-4 sm:h-nav-h sm:flex-row sm:items-center sm:justify-between sm:pl-nav-start sm:pr-nav-end"
    >
      <Link href="/" aria-label="Taylor Torres, home" className={`relative block w-fit ${focusRing}`}>
        <Signature className="block" />
        <Image
          src="/nav/brand-emblem.svg"
          alt=""
          aria-hidden="true"
          width={64}
          height={64}
          preload
          className="absolute top-0 left-0"
        />
      </Link>
      <ul className="flex items-center justify-between sm:justify-start sm:gap-nav-link-gap">
        {links.map(({ label, href }) => (
          <li key={label}>
            <Link
              href={href}
              className={`-mx-2.5 flex h-11 items-center px-2.5 font-mono text-nav text-muted uppercase hover:text-heading motion-safe:transition-colors ${focusRing}`}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
