import Image from "next/image";
import Link from "next/link";
import NavLinks from "./NavLinks";
import Signature from "./Signature";

const focusRing =
  "rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

// The bar's sticky shell, background and border come from SiteHeader (root
// layout), so the nav is rendered once and stays in place between pages.
// [data-nav] scopes the hover softening (globals.css): hovering or focusing a
// link softens the logo and the other links.
export default function Nav() {
  return (
    <nav
      aria-label="Primary"
      data-nav
      className="flex flex-col px-4 sm:h-nav-h sm:flex-row sm:items-center sm:justify-between sm:pl-nav-start sm:pr-nav-end"
    >
      <Link href="/" aria-label="Taylor Torres, home" data-nav-item className={`relative block w-fit ${focusRing}`}>
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
      <NavLinks />
    </nav>
  );
}
